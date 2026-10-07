import { SELECTED_WORK_PAGE_NAMES } from '@/features/home/data/homeContent';
import { getWork, publicWorks, works } from '@/features/works/data/worksData';
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
      'doodin-calendar/saved-notes.webp',
    );
    expect(getWork('ios-keyboard')?.imgSrc).toBe(
      'keyboard/keyboard-settings-and-theme-selection.webp',
    );
    expect(getWork('nijoow-shopping-mall')).toMatchObject({
      name: '3D Shopping Mall',
      imgSrc: 'nijoow-shopping-mall/01-shopping-mall-home.webp',
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

    SELECTED_WORK_PAGE_NAMES.forEach((pageName) => {
      expect(getWork(pageName)?.status).toBe('published');
    });
  });
});
