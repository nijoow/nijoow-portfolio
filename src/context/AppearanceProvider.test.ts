import { describe, expect, it } from 'vitest';
import { parseAppearance } from './AppearanceProvider';

describe('saved appearance settings', () => {
  it('restores valid settings across page visits', () => {
    expect(
      parseAppearance(
        '{"material":"ink","atmosphere":"reading","motion":false}',
      ),
    ).toEqual({ material: 'ink', atmosphere: 'reading', motion: false });
  });
  it('falls back safely for damaged storage', () => {
    expect(parseAppearance('not json')).toEqual(parseAppearance(null));
  });
  it('ignores unknown modes without losing valid preferences', () => {
    expect(
      parseAppearance('{"material":"unknown","atmosphere":"layered"}'),
    ).toEqual({ material: 'elastic', atmosphere: 'layered', motion: true });
  });
});
