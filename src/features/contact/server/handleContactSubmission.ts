import { contactFormSchema } from '@/features/contact/schemas/contactSchema';
import { createApiError, createApiSuccess } from '@/lib/api';
import { createHash } from 'node:crypto';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { z } from 'zod';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const DUPLICATE_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 3;
const MAX_TRACKED_RECORDS = 500;
const REQUEST_TIMEOUT_MS = 10_000;

interface RateLimitRecord {
  count: number;
  expiresAt: number;
}

const rateLimitRecords = new Map<string, RateLimitRecord>();
const recentSubmissions = new Map<string, number>();
const pendingSubmissions = new Set<string>();

const contactEnvSchema = z.object({
  WEB3FORMS_ACCESS_KEY: z.string().min(1).optional(),
});

const web3FormsResponseSchema = z
  .object({
    success: z.boolean(),
    message: z.string().optional(),
    body: z
      .object({
        message: z.string().optional(),
      })
      .optional(),
  })
  .passthrough();

function errorResponse(
  status: number,
  code: string,
  message: string,
  details?: unknown,
) {
  return NextResponse.json(createApiError(code, message, details), { status });
}

function successResponse(message: string) {
  return NextResponse.json(createApiSuccess({ message }));
}

function getAccessKey(): string | null {
  const parsed = contactEnvSchema.safeParse(process.env);

  return parsed.success ? (parsed.data.WEB3FORMS_ACCESS_KEY ?? null) : null;
}

function getClientAddress(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const firstForwardedAddress = forwardedFor?.split(',')[0]?.trim();

  return firstForwardedAddress ?? request.headers.get('x-real-ip') ?? 'unknown';
}

function createIdentifier(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}

function trimOldestRecords<T>(records: Map<string, T>) {
  while (records.size >= MAX_TRACKED_RECORDS) {
    const oldestKey = records.keys().next().value;
    if (oldestKey === undefined) return;
    records.delete(oldestKey);
  }
}

function pruneExpiredRecords(now: number) {
  for (const [key, record] of rateLimitRecords) {
    if (record.expiresAt <= now) rateLimitRecords.delete(key);
  }

  for (const [key, expiresAt] of recentSubmissions) {
    if (expiresAt <= now) recentSubmissions.delete(key);
  }
}

function isRateLimited(keys: readonly string[], now: number): boolean {
  const newKeyCount = keys.filter((key) => !rateLimitRecords.has(key)).length;
  if (
    rateLimitRecords.size + newKeyCount > MAX_TRACKED_RECORDS ||
    keys.some(
      (key) =>
        (rateLimitRecords.get(key)?.count ?? 0) >= MAX_REQUESTS_PER_WINDOW,
    )
  ) {
    return true;
  }

  for (const key of keys) {
    const record = rateLimitRecords.get(key);
    rateLimitRecords.set(key, {
      count: (record?.count ?? 0) + 1,
      expiresAt: record?.expiresAt ?? now + RATE_LIMIT_WINDOW_MS,
    });
  }
  return false;
}

function isDuplicateSubmission(key: string, now: number) {
  return pendingSubmissions.has(key) || (recentSubmissions.get(key) ?? 0) > now;
}

export async function handleContactSubmission(request: NextRequest) {
  let requestBody: unknown;

  try {
    requestBody = await request.json();
  } catch {
    return errorResponse(
      400,
      'VALIDATION_CONTACT_BODY',
      '문의 내용을 다시 확인해 주세요.',
    );
  }

  const parsedContact = contactFormSchema.safeParse(requestBody);

  if (!parsedContact.success) {
    return errorResponse(
      400,
      'VALIDATION_CONTACT_FIELDS',
      '입력한 내용을 확인해 주세요.',
      parsedContact.error.flatten().fieldErrors,
    );
  }

  const contact = parsedContact.data;

  if (contact.website.length > 0) {
    return successResponse('문의가 접수되었습니다.');
  }

  const now = Date.now();
  const clientAddress = getClientAddress(request);
  const normalizedEmail = contact.email.toLowerCase();
  const rateLimitKeys = [
    createIdentifier(`ip:${clientAddress}`),
    createIdentifier(`email:${normalizedEmail}`),
  ];
  const duplicateKey = createIdentifier(
    JSON.stringify([normalizedEmail, contact.subject, contact.message]),
  );

  pruneExpiredRecords(now);

  if (isDuplicateSubmission(duplicateKey, now)) {
    return errorResponse(
      409,
      'BIZ_CONTACT_DUPLICATE',
      '같은 내용을 전송 중이거나 이미 전송했습니다.',
    );
  }

  const accessKey = getAccessKey();

  if (!accessKey) {
    return errorResponse(
      503,
      'INTERNAL_CONTACT_UNAVAILABLE',
      '현재 문의 폼을 사용할 수 없습니다. 이메일로 직접 연락해 주세요.',
    );
  }

  if (isRateLimited(rateLimitKeys, now)) {
    return errorResponse(
      429,
      'BIZ_CONTACT_RATE_LIMITED',
      '짧은 시간에 여러 번 요청되었습니다. 잠시 후 다시 시도해 주세요.',
    );
  }

  pendingSubmissions.add(duplicateKey);
  try {
    const providerResponse = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: contact.name,
        email: contact.email,
        subject: `[nijoow portfolio] ${contact.subject}`,
        message: contact.message,
        from_name: 'nijoow portfolio',
        botcheck: false,
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    const providerBody: unknown = await providerResponse.json();
    const parsedProvider = web3FormsResponseSchema.safeParse(providerBody);

    if (
      !providerResponse.ok ||
      !parsedProvider.success ||
      !parsedProvider.data.success
    ) {
      const isProviderRateLimited = providerResponse.status === 429;

      return errorResponse(
        isProviderRateLimited ? 429 : 502,
        isProviderRateLimited
          ? 'BIZ_CONTACT_RATE_LIMITED'
          : 'INTERNAL_CONTACT_PROVIDER',
        isProviderRateLimited
          ? '잠시 후 다시 시도해 주세요.'
          : '문의를 전송하지 못했습니다. 이메일로 직접 연락해 주세요.',
      );
    }

    trimOldestRecords(recentSubmissions);
    recentSubmissions.set(duplicateKey, Date.now() + DUPLICATE_WINDOW_MS);
    return successResponse('문의가 전송되었습니다. 확인 후 답장드릴게요.');
  } catch {
    return errorResponse(
      502,
      'INTERNAL_CONTACT_PROVIDER',
      '문의를 전송하지 못했습니다. 이메일로 직접 연락해 주세요.',
    );
  } finally {
    pendingSubmissions.delete(duplicateKey);
  }
}
