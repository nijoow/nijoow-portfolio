import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

function WorkImage({ url, imgSrc }: { url?: string; imgSrc: string }) {
  return (
    <div className="group relative h-0 w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 pb-[56.25%] shadow-md">
      {!imgSrc ? (
        <div>이미지가 없습니다</div>
      ) : (
        <Image
          src={`/images/works/${imgSrc}`}
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          alt={`${imgSrc.replace(/\.\w+$/, '')} 작업 스크린샷`}
          fetchPriority="high"
          loading="eager"
          className="object-contain transition-transform duration-300 group-hover:scale-105"
        />
      )}
      {url && (
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="프로젝트 사이트 새 창에서 열기"
          className="focus-visible:ring-brand-lavender absolute inset-0 flex h-full w-full items-center justify-center bg-black/60 opacity-0 backdrop-blur-xs transition-all duration-300 outline-none group-hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-inset"
        >
          <span className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-base font-bold text-white backdrop-blur-md">
            사이트 바로가기 <ExternalLink size={16} />
          </span>
        </Link>
      )}
    </div>
  );
}
export default WorkImage;
