// @vitest-environment node

import { NextRequest } from 'next/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { handleContactSubmission } from './handleContactSubmission';

const fetchMock = vi.fn<typeof fetch>();
let submit: typeof handleContactSubmission;

function request({
  ip = '192.0.2.1',
  email = 'review@example.com',
  message = '외부 전송 없이 문의 동작을 검증합니다.',
} = {}) {
  return new NextRequest('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': ip },
    body: JSON.stringify({
      name: '검토용',
      email,
      subject: '문의 처리 검증',
      message,
      website: '',
    }),
  });
}

function providerSuccess() {
  return Response.json({ success: true });
}

beforeEach(async () => {
  vi.resetModules();
  vi.stubEnv('WEB3FORMS_ACCESS_KEY', 'mock-contact-key');
  vi.stubGlobal('fetch', fetchMock);
  fetchMock.mockReset().mockImplementation(async () => providerSuccess());
  ({ handleContactSubmission: submit } = await import(
    './handleContactSubmission'
  ));
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe('handleContactSubmission', () => {
  it('같은 IP에서 이메일을 바꿔도 네 번째 요청을 차단한다', async () => {
    const statuses = [];
    for (let index = 0; index < 5; index++) {
      statuses.push(
        (await submit(request({ email: `review${index}@example.com` }))).status,
      );
    }
    expect(statuses).toEqual([200, 200, 200, 429, 429]);
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it('IP가 바뀌어도 동일 이메일의 요청 제한을 유지한다', async () => {
    const statuses = [];
    for (let index = 0; index < 4; index++) {
      statuses.push(
        (
          await submit(
            request({
              ip: `192.0.2.${index + 1}`,
              message: `서로 다른 문의 내용으로 검증합니다. ${index}`,
            }),
          )
        ).status,
      );
    }
    expect(statuses).toEqual([200, 200, 200, 429]);
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it('처리 중인 동일 문의는 IP가 달라도 전달하지 않는다', async () => {
    let finish: (response: Response) => void = () => {};
    fetchMock.mockImplementationOnce(
      () =>
        new Promise<Response>((resolve) => {
          finish = resolve;
        }),
    );
    const first = submit(request());
    await vi.waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

    expect((await submit(request({ ip: '192.0.2.2' }))).status).toBe(409);
    finish(providerSuccess());
    expect((await first).status).toBe(200);
    expect((await submit(request())).status).toBe(409);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('전달 실패 뒤에는 같은 내용을 다시 전송할 수 있다', async () => {
    fetchMock.mockRejectedValueOnce(new Error('provider unavailable'));
    expect((await submit(request())).status).toBe(502);
    expect((await submit(request())).status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('서비스가 실패 응답을 보낸 경우에도 처리 중 잠금을 해제한다', async () => {
    fetchMock.mockResolvedValueOnce(
      Response.json({ success: false }, { status: 502 }),
    );
    expect((await submit(request())).status).toBe(502);
    expect((await submit(request())).status).toBe(200);
  });

  it('전송 제한 시간이 지나면 다시 요청할 수 있다', async () => {
    const now = Date.now();
    const clock = vi.spyOn(Date, 'now').mockReturnValue(now);
    for (let index = 0; index < 3; index++) {
      expect(
        (await submit(request({ email: `review${index}@example.com` }))).status,
      ).toBe(200);
    }
    expect((await submit(request({ email: 'next@example.com' }))).status).toBe(
      429,
    );
    clock.mockReturnValue(now + 10 * 60 * 1000 + 1);
    expect((await submit(request({ email: 'next@example.com' }))).status).toBe(
      200,
    );
  });
});
