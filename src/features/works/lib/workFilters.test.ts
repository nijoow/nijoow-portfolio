import { describe, expect, it } from 'vitest';
import {
  WORK_FILTER_TAGS,
  workFilterParser,
  workTypeParser,
  featuredParser,
} from './workFilters';

describe('Works URL state', () => {
  it('keeps project type and technical fields separate', () => {
    expect(workFilterParser.parse('iOS')).toBe('iOS');
    expect(workFilterParser.parse('Business Project')).toBeNull();
    expect(workFilterParser.parse('AI 활용 개발')).toBeNull();
    expect(WORK_FILTER_TAGS).not.toContain('AI 활용 개발');
    expect(workTypeParser.parse('business')).toBe('business');
    expect(workTypeParser.parse('ai')).toBeNull();
  });
  it('has unrestricted defaults for a fresh visit or invalid URL values', () => {
    expect(workTypeParser.defaultValue).toBe('all');
    expect(featuredParser.defaultValue).toBe(false);
    expect(workFilterParser.parse('Backend')).toBeNull();
  });
});
