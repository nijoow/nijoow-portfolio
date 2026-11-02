export const RETURN_KEY = 'nijoow-resume-return-v1';
const RETURN_TTL = 30 * 60 * 1000;

export function parseResumeReturn(value: string | null, now: number) {
  try {
    const parsed: unknown = JSON.parse(value ?? 'null');
    if (!parsed || typeof parsed !== 'object') return null;
    const entry = parsed as Record<string, unknown>;
    if (
      typeof entry.anchor !== 'string' ||
      !/^resume-project-[a-z0-9-]+$/.test(entry.anchor) ||
      typeof entry.scrollY !== 'number' ||
      !Number.isFinite(entry.scrollY) ||
      entry.scrollY < 0 ||
      typeof entry.savedAt !== 'number' ||
      !Number.isFinite(entry.savedAt) ||
      now < entry.savedAt ||
      now - entry.savedAt > RETURN_TTL
    )
      return null;
    return { anchor: entry.anchor, scrollY: entry.scrollY };
  } catch {
    return null;
  }
}
