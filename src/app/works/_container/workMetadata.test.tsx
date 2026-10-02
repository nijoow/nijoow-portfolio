import { describe, expect, it } from 'vitest';
import { createWorkMetadata } from './workMetadata';

describe('createWorkMetadata', () => {
  it('제한 공개 프로젝트 metadata에는 실제 화면 이미지를 넣지 않는다', () => {
    const metadata = createWorkMetadata('digital-asset-management');

    expect(metadata.openGraph).toHaveProperty('images', [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'nijoow | portfolio',
      },
    ]);
    expect(metadata.twitter).toMatchObject({ images: ['/opengraph-image'] });
  });

  it('일반 공개 프로젝트에는 기존 미리보기 이미지를 유지한다', () => {
    const metadata = createWorkMetadata('fromyou');

    expect(metadata.openGraph).toHaveProperty('images');
    expect(metadata.twitter).toMatchObject({
      card: 'summary_large_image',
    });
  });
});
