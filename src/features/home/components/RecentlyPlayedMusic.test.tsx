import type * as Motion from 'framer-motion';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { MusicActivity } from '../schemas/spotifySchemas';
import { RecentlyPlayedMusic } from './RecentlyPlayedMusic';

const query = vi.hoisted(() => ({
  data: undefined as MusicActivity | undefined,
  isPending: false,
  isError: true,
  isFetching: false,
  dataUpdatedAt: 1730000000000,
  refetch: vi.fn(),
}));
vi.mock('../hooks/useNowPlaying', () => ({ useNowPlaying: () => query }));
vi.mock('framer-motion', async (importOriginal) => ({
  ...(await importOriginal<typeof Motion>()),
  useInView: () => false,
  useReducedMotion: () => true,
}));

describe('music request recovery', () => {
  it('allows retry after an initial failure', () => {
    render(<RecentlyPlayedMusic />);
    fireEvent.click(screen.getByRole('button', { name: '다시 불러오기' }));
    expect(query.refetch).toHaveBeenCalledOnce();
  });
  it('does not label cached playback as live after an update fails', () => {
    query.data = {
      current: {
        title: 'Track',
        artist: 'Artist',
        songUrl: 'https://open.spotify.com/track/example',
        albumImageUrl: 'https://i.scdn.co/image/example',
        playedAt: null,
      },
      recent: [],
      isPlaying: true,
    };
    render(<RecentlyPlayedMusic />);
    expect(screen.queryByText('지금 듣는 중')).not.toBeInTheDocument();
    expect(screen.getByText('마지막으로 확인한 음악')).toBeInTheDocument();
  });
});
