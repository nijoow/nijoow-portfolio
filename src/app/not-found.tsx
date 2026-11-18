import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col items-start gap-5 px-4 py-20">
      <p className="text-brand-lavender text-sm">404</p>
      <h1 className="text-3xl font-bold break-keep">
        페이지를 찾을 수 없습니다.
      </h1>
      <p className="text-ink-secondary break-keep">
        주소를 확인하거나 작업 목록에서 다시 찾아보세요.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/works"
          className="bg-brand-lavender text-surface-ink focus-visible:ring-brand-lavender inline-flex min-h-11 items-center rounded-full px-5 font-bold outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          작업 목록 보기
        </Link>
        <Link
          href="/"
          className="focus-visible:ring-brand-lavender inline-flex min-h-11 items-center rounded-full border border-white/20 px-5 outline-none focus-visible:ring-2"
        >
          홈으로
        </Link>
      </div>
    </section>
  );
}
