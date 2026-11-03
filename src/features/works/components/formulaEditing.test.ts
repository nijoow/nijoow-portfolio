import { describe, expect, it } from 'vitest';
import {
  deleteAt,
  moveAcrossToken,
  reconcileEdit,
  replaceWholeTokens,
  tokensIn,
} from './formulaEditing';

const formula = '1 + {_값_} × {_수량_}';
const [first, second] = tokensIn(formula);
if (!first || !second) throw new Error('Expected sample tokens');

describe('formula token editing', () => {
  it('inserts variables over selected text and expands partial token selections', () => {
    expect(replaceWholeTokens(formula, 0, 1, '{_가격_}').value).toBe(
      '{_가격_} + {_값_} × {_수량_}',
    );
    expect(
      replaceWholeTokens(formula, first.start + 1, first.end - 1, '3').value,
    ).toBe('1 + 3 × {_수량_}');
  });
  it('deletes whole variables in both directions and across a mixed selection', () => {
    expect(deleteAt(formula, first.end, first.end, -1).value).toBe(
      '1 +  × {_수량_}',
    );
    expect(deleteAt(formula, second.start, second.start, 1).value).toBe(
      '1 + {_값_} × ',
    );
    expect(deleteAt(formula, first.start + 1, second.start + 1, -1).value).toBe(
      '1 + ',
    );
  });
  it('moves across token boundaries while leaving ordinary arrows to the browser', () => {
    expect(moveAcrossToken(formula, first.start, 1)).toBe(first.end);
    expect(moveAcrossToken(formula, first.end, -1)).toBe(first.start);
    expect(moveAcrossToken(formula, 0, 1)).toBeNull();
  });
  it('normalizes edits that would split a token and preserves ordinary edits', () => {
    expect(reconcileEdit(formula, formula.replace('값', '가격')).value).toBe(
      '1 + 가격 × {_수량_}',
    );
    expect(reconcileEdit('1 + 2', '1 + 23')).toEqual({
      value: '1 + 23',
      caret: 6,
    });
  });
});
