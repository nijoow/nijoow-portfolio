'use client';

import { submitContact } from '@/features/contact/api/submitContact';
import {
  contactFormSchema,
  type ContactFormData,
  type ContactFormInput,
} from '@/features/contact/schemas/contactSchema';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { m } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { AlertCircle, CheckCircle2, LoaderCircle, Send } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { FieldError } from 'react-hook-form';

type SubmissionState =
  | { status: 'idle' }
  | { status: 'submitting'; message: string }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string };

const BUTTON_HOVER = { y: -2 };
const BUTTON_TAP = { scale: 0.98 };

function fieldClass(hasError: boolean) {
  return cn(
    'w-full rounded-xl border bg-black/20 p-3.5 text-base text-white transition-colors outline-none placeholder:text-ink-muted focus:ring-2',
    hasError
      ? 'border-status-danger/70 focus:border-status-danger focus:ring-status-danger/30'
      : 'focus:border-brand-lavender/45 focus:ring-brand-lavender/20 border-white/10',
  );
}

function FieldErrorMessage({ id, error }: { id: string; error?: FieldError }) {
  if (!error) return null;

  return (
    <p id={id} className="text-status-danger text-xs">
      {error.message}
    </p>
  );
}

interface BannerStyle {
  icon: LucideIcon;
  role: 'alert' | 'status';
  className: string;
  iconClassName?: string;
}

const BANNER_STYLES: Record<
  Exclude<SubmissionState['status'], 'idle'>,
  BannerStyle
> = {
  submitting: {
    icon: LoaderCircle,
    role: 'status',
    className:
      'border-brand-lavender/20 bg-brand-deep/20 text-brand-lavender/80',
    iconClassName: 'animate-spin',
  },
  success: {
    icon: CheckCircle2,
    role: 'status',
    className:
      'border-status-success/20 bg-status-success/10 text-status-success',
  },
  error: {
    icon: AlertCircle,
    role: 'alert',
    className: 'border-status-danger/20 bg-status-danger/10 text-status-danger',
  },
};

function SubmissionBanner({ state }: { state: SubmissionState }) {
  if (state.status === 'idle') return null;

  const {
    icon: Icon,
    role,
    className,
    iconClassName,
  } = BANNER_STYLES[state.status];

  return (
    <div
      role={role}
      className={cn(
        'flex items-start gap-2 rounded-xl border px-3.5 py-3 text-sm leading-relaxed',
        className,
      )}
    >
      <Icon
        className={cn('mt-0.5 shrink-0', iconClassName)}
        size={16}
        aria-hidden
      />
      <span>
        {state.message}
        {state.status === 'error' ? (
          <>
            {' '}
            <a
              href="mailto:nijoow1127@gmail.com"
              className="font-bold underline underline-offset-2"
            >
              이메일로 직접 연락하기
            </a>
          </>
        ) : null}
      </span>
    </div>
  );
}

function SubmitButton({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <m.button
      whileHover={isSubmitting ? undefined : BUTTON_HOVER}
      whileTap={isSubmitting ? undefined : BUTTON_TAP}
      type="submit"
      disabled={isSubmitting}
      className={cn(
        'focus-visible:ring-brand-lavender flex w-full items-center justify-center gap-2 rounded-xl border py-3.5 font-bold text-white backdrop-blur-xl transition-colors focus-visible:ring-2 focus-visible:outline-none',
        isSubmitting
          ? 'text-ink-faint cursor-not-allowed border-white/10 bg-white/5'
          : 'border-brand-lavender/30 bg-brand-deep/60 hover:bg-brand-deep/80',
      )}
    >
      {isSubmitting ? (
        <LoaderCircle className="animate-spin" size={17} aria-hidden />
      ) : (
        <Send size={17} aria-hidden />
      )}
      {isSubmitting ? '보내는 중...' : '문의 보내기'}
    </m.button>
  );
}

export function ContactForm() {
  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    status: 'idle',
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput, unknown, ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { website: '' },
  });

  async function handleContactSubmit(data: ContactFormData) {
    setSubmissionState({
      status: 'submitting',
      message: '문의를 보내고 있습니다.',
    });

    try {
      const message = await submitContact(data);
      reset();
      setSubmissionState({ status: 'success', message });
    } catch (error) {
      setSubmissionState({
        status: 'error',
        message:
          error instanceof Error
            ? error.message
            : '문의를 전송하지 못했습니다. 이메일로 직접 연락해 주세요.',
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleContactSubmit)}
      className="flex flex-col gap-4"
      noValidate
      aria-busy={isSubmitting}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="text-ink-secondary text-sm font-bold"
          >
            이름 <span className="text-brand-lavender">*</span>
          </label>
          <input
            {...register('name')}
            suppressHydrationWarning
            type="text"
            id="name"
            required
            autoComplete="name"
            maxLength={50}
            placeholder="이름을 입력해 주세요"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={fieldClass(Boolean(errors.name))}
          />
          <FieldErrorMessage id="name-error" error={errors.name} />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-ink-secondary text-sm font-bold"
          >
            이메일 <span className="text-brand-lavender">*</span>
          </label>
          <input
            {...register('email')}
            suppressHydrationWarning
            type="email"
            id="email"
            required
            inputMode="email"
            autoComplete="email"
            maxLength={100}
            placeholder="example@email.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={fieldClass(Boolean(errors.email))}
          />
          <FieldErrorMessage id="email-error" error={errors.email} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="subject"
          className="text-ink-secondary text-sm font-bold"
        >
          제목 <span className="text-brand-lavender">*</span>
        </label>
        <input
          {...register('subject')}
          suppressHydrationWarning
          type="text"
          id="subject"
          required
          maxLength={100}
          placeholder="어떤 이야기인지 간단히 알려주세요"
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
          className={fieldClass(Boolean(errors.subject))}
        />
        <FieldErrorMessage id="subject-error" error={errors.subject} />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          <label
            htmlFor="message"
            className="text-ink-secondary text-sm font-bold"
          >
            내용 <span className="text-brand-lavender">*</span>
          </label>
          <span className="text-ink-muted text-xs">최대 1000자</span>
        </div>
        <textarea
          {...register('message')}
          suppressHydrationWarning
          id="message"
          required
          rows={6}
          maxLength={1000}
          placeholder="프로젝트나 협업에 관해 편하게 남겨주세요"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={cn(fieldClass(Boolean(errors.message)), 'resize-y')}
        />
        <FieldErrorMessage id="message-error" error={errors.message} />
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">웹사이트</label>
        <input
          {...register('website')}
          suppressHydrationWarning
          type="text"
          id="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div aria-live="polite" aria-atomic="true" className="min-h-11">
        <SubmissionBanner state={submissionState} />
      </div>

      <SubmitButton isSubmitting={isSubmitting} />
    </form>
  );
}
