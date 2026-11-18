import {
  musicActivitySchema,
  type MusicActivity,
} from '@/features/home/schemas/spotifySchemas';
import { fetchApiData } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

const fetchMusicActivity = (): Promise<MusicActivity> =>
  fetchApiData({
    input: '/api/spotify/activity',
    dataSchema: musicActivitySchema,
    invalidResponseMessage: '재생 정보를 확인할 수 없습니다.',
  });

const SPOTIFY_ACTIVITY_QUERY_KEY = ['spotify', 'activity'] as const;

export function useNowPlaying() {
  return useQuery({
    queryKey: SPOTIFY_ACTIVITY_QUERY_KEY,
    queryFn: fetchMusicActivity,
    staleTime: 30 * 1000,
    refetchInterval: 30 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}
