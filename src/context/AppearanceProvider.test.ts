import { describe, expect, it } from 'vitest';
import { parseAppearance } from './AppearanceProvider';

describe('saved appearance settings', () => {
  it('uses the final darker background while preserving motion and material', () => {
    expect(
      parseAppearance(
        '{"material":"ink","background":"darker","motion":false}',
      ),
    ).toEqual({ material: 'ink', background: 'darker', motion: false });
    for (const background of ['original', 'sparser']) {
      expect(parseAppearance(JSON.stringify({ background })).background).toBe(
        'darker',
      );
    }
  });
  it('migrates old atmosphere settings to the default background while retaining motion', () => {
    expect(parseAppearance('{"atmosphere":"reading","motion":false}')).toEqual({
      material: 'elastic',
      background: 'darker',
      motion: false,
    });
  });
  it('falls back safely for damaged or unknown settings', () => {
    expect(parseAppearance('not json')).toEqual(parseAppearance(null));
    expect(
      parseAppearance('{"material":"unknown","background":"unknown"}'),
    ).toEqual({ material: 'elastic', background: 'darker', motion: true });
  });
});
