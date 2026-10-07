import { SELECTED_WORK_PAGE_NAMES } from '@/features/home/data/homeContent';
import { getWork, publicWorks, works } from '@/features/works/data/worksData';
import { existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('worksData', () => {
  it('제한 공개 프로젝트에는 실제 화면과 외부 링크를 노출하지 않는다', () => {
    const limitedWorks = works.filter((work) => work.disclosure === 'limited');

    expect(limitedWorks).toHaveLength(2);
    limitedWorks.forEach((work) => {
      expect(work.imgSrc).toBeUndefined();
      expect(work.liveUrl).toBeUndefined();
      expect(work.repoUrl).toBeUndefined();
      expect(work.status).toBe('published');
    });
  });

  it('일반 공개 프로젝트에는 카드에 사용할 이미지가 있다', () => {
    const fullyDisclosedWorks = works.filter(
      (work) => work.status !== 'draft' && work.disclosure !== 'limited',
    );

    fullyDisclosedWorks.forEach((work) => {
      expect(work.imgSrc).toBeTruthy();
    });
  });

  it('캡처한 프로젝트와 기존 스티커 작업을 지정한 순서로 공개한다', () => {
    const publicPageNames = publicWorks.map((work) => work.pageName);

    for (const pageName of [
      'doodin-calendar',
      'ios-keyboard',
      'nijoow-shopping-mall',
      'fromis9-stickers',
    ]) {
      expect(publicPageNames).toContain(pageName);
      expect(getWork(pageName)?.status).toBe('published');
    }

    expect(getWork('doodin-calendar')?.imgSrc).toBe(
      'doodin-calendar/home-overview.webp',
    );
    expect(getWork('ios-keyboard')?.imgSrc).toBe(
      'keyboard/keyboard-settings-and-theme-selection.webp',
    );
    expect(getWork('nijoow-shopping-mall')).toMatchObject({
      name: '3D Shopping Mall',
      imgSrc: 'nijoow-shopping-mall/01-shopping-mall-home.png',
    });
    expect(getWork('fromis9-stickers')?.imgSrc).toBe('fromis9-stickers.webp');

    const displayedOrder = [...publicWorks]
      .reverse()
      .map((work) => work.pageName);
    expect(displayedOrder.slice(0, 7)).toEqual([
      'digital-asset-management',
      'lessor-panda-village',
      'doodin-calendar',
      'ios-keyboard',
      'nijoow-shopping-mall',
      'launchpad',
      'fromis9-stickers',
    ]);
  });

  it('홈 선택 프로젝트 네 개가 모두 공개된 작업으로 연결된다', () => {
    expect(SELECTED_WORK_PAGE_NAMES).toHaveLength(4);
    expect(SELECTED_WORK_PAGE_NAMES).toContain('doodin-calendar');
    expect(SELECTED_WORK_PAGE_NAMES).not.toContain('atop-dms');

    SELECTED_WORK_PAGE_NAMES.forEach((pageName) => {
      expect(getWork(pageName)?.status).toBe('published');
    });
  });

  it('공개 Works 카드의 모든 이미지 경로가 실제 파일과 일치한다', () => {
    publicWorks.forEach((work) => {
      if (!work.imgSrc) return;

      expect(
        existsSync(resolve(process.cwd(), 'public/images/works', work.imgSrc)),
        `${work.pageName}: ${work.imgSrc}`,
      ).toBe(true);
    });
  });

  it('두딘 상세 갤러리에 공개용 WebP 9장을 제공하고 PNG 원본은 공개하지 않는다', () => {
    const imageDirectory = resolve(
      process.cwd(),
      'public/images/works/doodin-calendar',
    );
    const files = readdirSync(imageDirectory);

    expect(files.filter((file) => file.endsWith('.webp'))).toHaveLength(9);
    expect(files.some((file) => file.endsWith('.png'))).toBe(false);
    expect(existsSync(resolve(imageDirectory, 'home-overview.webp'))).toBe(
      true,
    );
  });
});
