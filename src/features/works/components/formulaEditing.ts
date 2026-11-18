export interface Range {
  start: number;
  end: number;
}
export interface Token extends Range {
  name: string;
  raw: string;
}

export function tokensIn(value: string): Token[] {
  return Array.from(value.matchAll(/\{_([^{}\n]+?)_\}/g), (match) => ({
    start: match.index,
    end: match.index + match[0].length,
    name: match[1] ?? '',
    raw: match[0],
  }));
}

export function wholeTokenRange(
  value: string,
  start: number,
  end: number,
): Range {
  let from = start;
  let to = end;
  for (const token of tokensIn(value)) {
    if (from === to && from > token.start && from < token.end) {
      from = token.start;
      to = token.end;
    } else if (from < token.end && to > token.start) {
      from = Math.min(from, token.start);
      to = Math.max(to, token.end);
    }
  }
  return { start: from, end: to };
}

export function replaceWholeTokens(
  value: string,
  start: number,
  end: number,
  inserted: string,
) {
  const range = wholeTokenRange(value, start, end);
  return {
    value: value.slice(0, range.start) + inserted + value.slice(range.end),
    caret: range.start + inserted.length,
  };
}

export function deleteAt(
  value: string,
  start: number,
  end: number,
  direction: -1 | 1,
) {
  if (start !== end) return replaceWholeTokens(value, start, end, '');
  const token = tokensIn(value).find((item) =>
    direction < 0
      ? start > item.start && start <= item.end
      : start >= item.start && start < item.end,
  );
  if (token) return replaceWholeTokens(value, token.start, token.end, '');
  return replaceWholeTokens(
    value,
    Math.max(0, start + (direction < 0 ? -1 : 0)),
    Math.min(value.length, end + (direction > 0 ? 1 : 0)),
    '',
  );
}

export function moveAcrossToken(
  value: string,
  caret: number,
  direction: -1 | 1,
) {
  const token = tokensIn(value).find((item) =>
    direction < 0
      ? caret > item.start && caret <= item.end
      : caret >= item.start && caret < item.end,
  );
  if (!token) return null;
  return direction < 0 ? token.start : token.end;
}

export function reconcileEdit(previous: string, next: string) {
  let start = 0;
  while (
    start < previous.length &&
    start < next.length &&
    previous[start] === next[start]
  )
    start++;
  let oldEnd = previous.length;
  let newEnd = next.length;
  while (
    oldEnd > start &&
    newEnd > start &&
    previous[oldEnd - 1] === next[newEnd - 1]
  ) {
    oldEnd--;
    newEnd--;
  }
  return replaceWholeTokens(previous, start, oldEnd, next.slice(start, newEnd));
}
