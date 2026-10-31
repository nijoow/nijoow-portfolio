import { publicWorks } from '@/features/works/data/worksData';
import { describe, expect, it } from 'vitest';
import { filterWorks } from './filterWorks';

describe('Works intersection filters', () => {
  it('defaults to all 22 public projects without a featured restriction', () => {
    expect(
      filterWorks(publicWorks, { type: 'all', tag: null, featured: false }),
    ).toHaveLength(22);
  });
  it('intersects business, field and author selection without changing order', () => {
    const result = filterWorks(publicWorks, {
      type: 'business',
      tag: 'Frontend',
      featured: true,
    });
    expect(result.map((work) => work.pageName)).toEqual([
      'process-safety-management',
      'atop-dms',
      'fromyou',
      'digital-asset-management',
    ]);
  });
  it('keeps the selected field when switching project type', () => {
    expect(
      filterWorks(publicWorks, {
        type: 'business',
        tag: 'iOS',
        featured: false,
      }),
    ).toHaveLength(0);
    expect(
      filterWorks(publicWorks, {
        type: 'side',
        tag: 'iOS',
        featured: false,
      }).map((work) => work.pageName),
    ).toContain('ios-keyboard');
  });
  it('featured only includes the six selected home projects', () => {
    expect(
      filterWorks(publicWorks, { type: 'all', tag: null, featured: true }),
    ).toHaveLength(6);
  });
});
