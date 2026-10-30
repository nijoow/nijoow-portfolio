import { describe, expect, it } from 'vitest';
import { WORK_FILTER_TAGS, workFilterParser } from './workFilters';

describe('workFilterParser', () => {
  it('공개 필터만 허용한다', () => {
    expect(workFilterParser.parse('Web')).toBe('Web');
    expect(workFilterParser.parse('AI 활용 개발')).toBe('AI 활용 개발');
    expect(workFilterParser.parse('iOS')).toBe('iOS');
    expect(workFilterParser.parse('Backend')).toBeNull();
  });

  it('Backend 필터를 노출하지 않는다', () => {
    expect(WORK_FILTER_TAGS).not.toContain('Backend');
  });
});
