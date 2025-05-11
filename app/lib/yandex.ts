const YANDEX_API_TOKEN = process.env.YANDEX_API_TOKEN;
const API_BASE_URL = 'https://api.mipoh.ru';

interface YandexTrackResponse {
  track: {
    track_id: string;
    title: string;
    artist: string | string[];
    album: string;
    img: string;
    duration: number;
    download_link?: string;
  };
  progress_ms: number;
}

export async function getCurrentYandexTrack() {
  try {
    const response = await fetch(`${API_BASE_URL}/get_current_track_beta`, {
      headers: {
        "accept": "application/json",
        "ya-token": YANDEX_API_TOKEN || ''
      },
      cache: 'no-store',
      next: { revalidate: 0 }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Yandex Music data: ${response.status}`);
    }

    const data = await response.json() as YandexTrackResponse;
    
    if (!data.track) {
      return null;
    }

    let artists = '';
    if (typeof data.track.artist === 'string') {
      artists = data.track.artist;
    } else if (Array.isArray(data.track.artist)) {
      artists = data.track.artist.join(', ');
    }

    return {
      name: data.track.title || '',
      artists: artists,
      album: data.track.album || '',
      albumImageUrl: data.track.img || '',
      url: `https://music.yandex.ru/track/${data.track.track_id}`,
      isPlaying: true,
      progressMs: data.progress_ms || 0,
      durationMs: data.track.duration * 1000 || 0,
      explicit: false,
      platform: 'YANDEX'
    };
  } catch (error) {
    console.error('Error fetching Yandex Music data:', error);
    return null;
  }
}