import { publicWorks } from '@/features/works/data/worksData';
import { describe, expect, it } from 'vitest';
import { filterWorks } from './filterWorks';

describe('Works intersection filters', () => {
  it('defaults to all public projects without a featured restriction', () => {
    expect(filterWorks(publicWorks, { type: 'all', tag: null })).toHaveLength(
      publicWorks.length,
    );
  });
  it('intersects business and field without changing order', () => {
    const result = filterWorks(publicWorks, {
      type: 'business',
      tag: 'Frontend',
    });
    expect(
      result.every(
        (work) =>
          work.projectType === 'business' && work.tags.includes('Frontend'),
      ),
    ).toBe(true);
    expect(result.map((work) => work.pageName)).toEqual(
      publicWorks
        .filter(
          (work) =>
            work.projectType === 'business' && work.tags.includes('Frontend'),
        )
        .map((work) => work.pageName),
    );
  });
  it('keeps the selected field when switching project type', () => {
    expect(
      filterWorks(publicWorks, {
        type: 'business',
        tag: 'iOS',
      }),
    ).toHaveLength(0);
    expect(
      filterWorks(publicWorks, {
        type: 'side',
        tag: 'iOS',
      }).map((work) => work.pageName),
    ).toContain('ios-keyboard');
  });
});
