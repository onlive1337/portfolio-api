const YANDEX_API_TOKEN = process.env.YANDEX_API_TOKEN;

interface YandexArtist {
  id: number;
  name: string;
}

interface YandexAlbum {
  id: number;
  title: string;
}

interface YandexTrackProgress {
  duration: number;
  position: number;
  loaded: number;
}

interface YandexTrackResponse {
  ok: boolean;
  track: {
    title: string;
    artists: YandexArtist[];
    albums: YandexAlbum[];
    albumArt: string;
    status: string;
    durationMs: number;
    progress: YandexTrackProgress;
    realId: string;
  };
}

export async function getCurrentYandexTrack() {
  try {
    const response = await fetch("https://ru-node-1.pulsesync.dev/api/v1/track/status", {
      headers: {
        "accept": "*/*",
        "authorization": `Bearer ${YANDEX_API_TOKEN}`
      },
      cache: 'no-store',
      next: { revalidate: 0 }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Yandex Music data: ${response.status}`);
    }

    const data = await response.json() as YandexTrackResponse;
    
    if (!data.ok || !data.track) {
      return null;
    }

    return {
      name: data.track.title || '',
      artists: data.track.artists?.map((artist: YandexArtist) => artist.name).join(', ') || '',
      album: data.track.albums?.[0]?.title || '',
      albumImageUrl: data.track.albumArt || '',
      url: `https://music.yandex.ru/album/${data.track.albums?.[0]?.id}/track/${data.track.realId}`,
      isPlaying: data.track.status === 'playing',
      progressMs: Math.round(data.track.progress?.position * 1000) || 0,
      durationMs: data.track.durationMs || 0,
      explicit: false,
      platform: 'YANDEX'
    };
  } catch (error) {
    console.error('Error fetching Yandex Music data:', error);
    return null;
  }
}