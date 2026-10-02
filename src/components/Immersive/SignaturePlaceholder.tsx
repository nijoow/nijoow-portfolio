import { Logo } from '@/components/Logo/Logo';
import Eyebrow from '@/components/ui/Eyebrow';

export default function SignaturePlaceholder() {
  return (
    <section
      aria-label="nijoow 시그니처 로고"
      className="relative mb-10 h-[240px] w-full overflow-hidden rounded-3xl border border-white/10 bg-black sm:h-[400px]"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          aria-hidden
          className="bg-brand-lavender/12 absolute size-56 rounded-full blur-3xl"
        />
        <Logo
          width={240}
          height={135}
          className="text-brand-lavender relative opacity-90 drop-shadow-2xl"
        />
      </div>
      <div className="absolute bottom-4 left-5 flex flex-col gap-0.5 sm:bottom-6 sm:left-7">
        <Eyebrow>Frontend Developer</Eyebrow>
        <span className="text-lg font-bold text-white sm:text-2xl">
          이우진 <span className="text-ink-faint">·</span>{' '}
          <span className="text-brand-lavender">nijoow</span>
        </span>
      </div>
    </section>
  );
}
