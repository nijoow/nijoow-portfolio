'use client';

import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import { Dialog } from 'radix-ui';
import { type KeyboardEvent, useCallback, useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { A11y } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

const NAV_BUTTON_CLASSES =
  'focus-visible:ring-brand-lavender absolute top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/25 text-brand-muted outline-none transition-colors hover:bg-black/45 focus-visible:ring-2';

interface WorkCarouselProps {
  imgSrcList: string[];
  imageLabels?: readonly string[];
  eager?: boolean;
  background?: 'light' | 'dark';
  aspectRatio?: 'video' | 'square';
}

function CarouselNavigationButton({ direction }: { direction: -1 | 1 }) {
  const swiper = useSwiper();
  const isPrevious = direction === -1;

  return (
    <button
      type="button"
      aria-label={isPrevious ? '이전 이미지' : '다음 이미지'}
      className={cn(NAV_BUTTON_CLASSES, isPrevious ? 'left-1.5' : 'right-1.5')}
      onClick={() => {
        if (isPrevious) swiper.slidePrev();
        else swiper.slideNext();
      }}
    >
      {isPrevious ? (
        <ChevronLeft aria-hidden className="size-7" />
      ) : (
        <ChevronRight aria-hidden className="size-7" />
      )}
    </button>
  );
}

export function WorkCarousel({
  imgSrcList,
  imageLabels,
  eager = true,
  background = 'light',
  aspectRatio = 'video',
}: WorkCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const imageButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const images = imgSrcList.map((src, index) => ({
    src,
    index,
    alt:
      imageLabels?.[index] ??
      `${src.replace(/\.\w+$/, '')} 작업 이미지 ${index + 1}`,
  }));
  const selectedImage =
    selectedIndex === null ? null : (images[selectedIndex] ?? null);
  const isModalOpen = selectedImage !== null;

  const closeModal = useCallback(() => setSelectedIndex(null), []);

  const moveSelection = useCallback(
    (direction: -1 | 1) => {
      if (selectedIndex === null || imgSrcList.length === 0) return;

      const nextIndex =
        (selectedIndex + direction + imgSrcList.length) % imgSrcList.length;
      setSelectedIndex(nextIndex);
      swiper?.slideToLoop(nextIndex);
    },
    [selectedIndex, imgSrcList.length, swiper],
  );

  function handleModalKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowLeft' && imgSrcList.length > 1) {
      event.preventDefault();
      moveSelection(-1);
      return;
    }

    if (event.key === 'ArrowRight' && imgSrcList.length > 1) {
      event.preventDefault();
      moveSelection(1);
    }
  }

  if (imgSrcList.length === 0) {
    return (
      <div className="text-ink-muted flex aspect-video w-full items-center justify-center rounded-2xl border border-white/10 bg-black/30 text-sm">
        표시할 이미지가 없습니다.
      </div>
    );
  }

  return (
    <Dialog.Root
      open={isModalOpen}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) closeModal();
      }}
    >
      <Swiper
        onSwiper={setSwiper}
        onSlideChange={(instance) => setActiveIndex(instance.realIndex)}
        modules={[A11y]}
        a11y={{
          containerMessage: '프로젝트 작업 이미지',
          itemRoleDescriptionMessage: '슬라이드',
          slideLabelMessage: '{{slidesLength}}장 중 {{index}}번째 이미지',
        }}
        loop={imgSrcList.length > 1}
        className={cn(
          'relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 shadow-md',
          aspectRatio === 'video' ? 'aspect-video' : 'aspect-square',
        )}
      >
        {images.map(({ src, alt, index }) => (
          <SwiperSlide
            key={src}
            className={cn(
              'group relative h-full w-full',
              background === 'dark' ? 'bg-black' : 'bg-white',
            )}
          >
            {({ isActive }) => (
              <>
                <Image
                  src={`/images/works/${src}`}
                  alt={alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-contain"
                  loading={eager && index === 0 ? 'eager' : 'lazy'}
                  fetchPriority={eager && index === 0 ? 'high' : 'auto'}
                />
                <button
                  ref={(node) => {
                    imageButtonRefs.current[index] = node;
                  }}
                  type="button"
                  aria-label={`${index + 1}번 이미지 크게 보기`}
                  aria-hidden={!isActive}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => {
                    setSelectedIndex(index);
                  }}
                  className="focus-visible:ring-brand-lavender absolute inset-0 z-10 cursor-zoom-in outline-none focus-visible:ring-2 focus-visible:ring-inset"
                />
              </>
            )}
          </SwiperSlide>
        ))}

        {imgSrcList.length > 1 ? (
          <>
            <CarouselNavigationButton direction={-1} />
            <CarouselNavigationButton direction={1} />
          </>
        ) : null}
      </Swiper>

      <div className="flex w-full flex-wrap items-center justify-center gap-x-3">
        {imgSrcList.length > 1 ? (
          <div
            role="group"
            aria-label="이미지 선택"
            className="flex flex-wrap justify-center"
          >
            {imgSrcList.map((imgSrc, index) => (
              <button
                key={imgSrc}
                type="button"
                aria-label={`${index + 1}번 이미지 보기`}
                aria-current={activeIndex === index ? 'true' : undefined}
                onClick={() => swiper?.slideToLoop(index)}
                className="focus-visible:ring-brand-lavender flex size-11 items-center justify-center rounded-full outline-none focus-visible:ring-2"
              >
                <span
                  aria-hidden
                  className={cn(
                    'size-2 rounded-full',
                    activeIndex === index ? 'bg-brand-lavender' : 'bg-white/30',
                  )}
                />
              </button>
            ))}
          </div>
        ) : null}
        <p role="status" className="text-ink-muted text-xs">
          {imageLabels?.[activeIndex] ? `${imageLabels[activeIndex]} · ` : ''}
          이미지 {activeIndex + 1} / {imgSrcList.length}
        </p>
      </div>

      {selectedImage ? (
        <Dialog.Portal>
          <Dialog.Overlay className="work-dialog-overlay fixed inset-0 z-100 cursor-zoom-out bg-black/75 backdrop-blur-sm" />
          <Dialog.Content
            onKeyDown={handleModalKeyDown}
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              imageButtonRefs.current[swiper?.realIndex ?? activeIndex]?.focus({
                preventScroll: true,
              });
            }}
            className="work-dialog-content bg-surface-elevated/80 fixed top-1/2 left-1/2 z-101 flex h-full w-full overflow-hidden rounded-2xl outline-none md:max-h-[90vh] md:max-w-[86vw]"
          >
            <Dialog.Title className="sr-only">{selectedImage.alt}</Dialog.Title>
            <Dialog.Description className="sr-only">
              {imgSrcList.length}장 중 {selectedImage.index + 1}번째 이미지.
              좌우 방향키로 이동하고 Escape로 닫을 수 있습니다.
            </Dialog.Description>

            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="확대 이미지 닫기"
                className="focus-visible:ring-brand-lavender text-ink-secondary absolute top-4 right-4 z-50 flex size-11 items-center justify-center rounded-full bg-black/35 transition-colors outline-none hover:text-white focus-visible:ring-2"
              >
                <X aria-hidden size={24} />
              </button>
            </Dialog.Close>

            <div className="relative m-auto h-full w-full md:h-[96%] md:w-[84%]">
              <Image
                src={`/images/works/${selectedImage.src}`}
                alt={selectedImage.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>

            {imgSrcList.length > 1 ? (
              <>
                <button
                  type="button"
                  aria-label="이전 확대 이미지"
                  className="focus-visible:ring-brand-lavender text-ink-secondary absolute top-1/2 left-2 z-50 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 shadow-lg transition-colors outline-none hover:bg-white/20 hover:text-white focus-visible:ring-2 md:left-6"
                  onClick={() => moveSelection(-1)}
                >
                  <ChevronLeft aria-hidden className="size-8" />
                </button>
                <button
                  type="button"
                  aria-label="다음 확대 이미지"
                  className="focus-visible:ring-brand-lavender text-ink-secondary absolute top-1/2 right-2 z-50 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 shadow-lg transition-colors outline-none hover:bg-white/20 hover:text-white focus-visible:ring-2 md:right-6"
                  onClick={() => moveSelection(1)}
                >
                  <ChevronRight aria-hidden className="size-8" />
                </button>
              </>
            ) : null}
          </Dialog.Content>
        </Dialog.Portal>
      ) : null}
    </Dialog.Root>
  );
}

export default WorkCarousel;
