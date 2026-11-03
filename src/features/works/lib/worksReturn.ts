const KEY = 'nijoow-works-return-v1';

type Saved = {
  slug: string;
  search: string;
  y: number;
  offset?: number;
  savedAt: number;
};
function read(): Saved | null {
  try {
    const value: unknown = JSON.parse(sessionStorage.getItem(KEY) ?? 'null');
    if (!value || typeof value !== 'object') return null;
    const data = value as Partial<Saved>;
    if (
      typeof data.slug !== 'string' ||
      !/^[a-z0-9-]+$/.test(data.slug) ||
      typeof data.search !== 'string' ||
      typeof data.y !== 'number' ||
      !Number.isFinite(data.y) ||
      data.y < 0 ||
      typeof data.savedAt !== 'number' ||
      Date.now() - data.savedAt > 3600000 ||
      data.savedAt > Date.now()
    )
      return null;
    return data as Saved;
  } catch {
    return null;
  }
}
export function rememberWorksReturn(slug: string) {
  try {
    const params = new URLSearchParams(window.location.search);
    params.delete('featured');
    params.delete('return');
    if (
      !params.has('tag') &&
      (!params.has('type') || params.get('type') === 'all')
    ) {
      sessionStorage.removeItem(KEY);
      return;
    }
    sessionStorage.setItem(
      KEY,
      JSON.stringify({
        slug,
        search: params.toString(),
        y: window.scrollY,
        offset: document
          .querySelector<HTMLElement>(`[data-work-card="${slug}"]`)
          ?.getBoundingClientRect().top,
        savedAt: Date.now(),
      }),
    );
  } catch {}
}
export function getWorksReturn(slug: string): string | null {
  const data = read();
  if (!data || data.slug !== slug) return null;
  const params = new URLSearchParams(data.search);
  params.set('return', '1');
  return `/works?${params.toString()}`;
}
export function restoreWorksReturn() {
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('return') !== '1') return;
    const data = read();
    params.delete('return');
    const query = params.size ? '?' + params.toString() : '';
    let consumed = false;
    const consume = () => {
      if (consumed) return;
      consumed = true;
      window.history.replaceState(
        window.history.state,
        '',
        `/works${query}${window.location.hash}`,
      );
      sessionStorage.removeItem(KEY);
    };
    // Effect restarts can cancel a frame, so consume the visit only when it runs.
    if (data && params.toString() === data.search)
      return restorePosition(data, consume);
    consume();
  } catch {}
}

function restorePosition(data: Saved, consume: () => void) {
  let cancelled = false;
  const timers: ReturnType<typeof setTimeout>[] = [];
  let frame = 0;
  const stop = () => {
    cancelled = true;
    timers.forEach(clearTimeout);
    cancelAnimationFrame(frame);
    window.removeEventListener('wheel', stopForUser);
    window.removeEventListener('touchstart', stopForUser);
    window.removeEventListener('pointerdown', stopForUser);
    window.removeEventListener('keydown', stopForUser);
    window.removeEventListener('resize', adjust);
    document.removeEventListener('load', adjust, true);
  };
  const stopForUser = () => {
    consume();
    stop();
  };
  const adjust = () => {
    if (cancelled) return;
    consume();
    const card = document.querySelector<HTMLElement>(
      `[data-work-card="${data.slug}"]`,
    );
    if (
      !card ||
      typeof data.offset !== 'number' ||
      !Number.isFinite(data.offset)
    ) {
      window.scrollTo({ top: data.y, behavior: 'instant' });
      return;
    }
    const rect = card.getBoundingClientRect();
    const offset = Math.max(
      -Math.min(rect.height - 44, window.innerHeight / 2),
      Math.min(data.offset, window.innerHeight - 80),
    );
    window.scrollTo({
      top: window.scrollY + rect.top - offset,
      behavior: 'instant',
    });
  };
  window.addEventListener('wheel', stopForUser, { once: true, passive: true });
  window.addEventListener('touchstart', stopForUser, {
    once: true,
    passive: true,
  });
  window.addEventListener('pointerdown', stopForUser, {
    once: true,
    passive: true,
  });
  window.addEventListener('keydown', stopForUser, { once: true });
  window.addEventListener('resize', adjust);
  document.addEventListener('load', adjust, true);
  frame = requestAnimationFrame(() => {
    frame = requestAnimationFrame(adjust);
  });
  timers.push(
    setTimeout(adjust, 400),
    setTimeout(adjust, 1000),
    setTimeout(stop, 2000),
  );
  return stop;
}
