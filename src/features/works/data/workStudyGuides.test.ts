import { describe, expect, it } from 'vitest';
import { publicWorks } from './worksData';
import { workStudyGuides } from './workStudyGuides';

describe('published project case-study contract', () => {
  it('covers every public route without requiring empty sections', () => {
    for (const work of publicWorks) {
      const guide = workStudyGuides[work.pageName];
      expect(guide, work.pageName).toBeDefined();
      if (!guide) throw new Error(`Missing case study: ${work.pageName}`);
      expect(guide.stacks.length, work.pageName).toBeGreaterThan(0);
      if (guide.sections.diagram) {
        if (!guide.diagram)
          throw new Error(`Missing diagram: ${work.pageName}`);
        expect(guide.diagram.nodes.length, work.pageName).toBeGreaterThan(1);
      }
      if (guide.result) expect(guide.result.trim()).not.toBe('');
    }
  });
  it('keeps each detailed technical case complete', () => {
    for (const guide of Object.values(workStudyGuides)) {
      for (const item of guide.cases ?? []) {
        expect(item.problem.length).toBeGreaterThan(0);
        expect(item.approach.length).toBeGreaterThan(0);
      }
    }
  });
});
