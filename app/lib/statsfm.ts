const STATSFM_USERNAME = process.env.STATSFM_USERNAME || 'onlive';

export async function getCurrentTrack() {
  const url = `https://api.stats.fm/api/v1/users/${STATSFM_USERNAME}/streams/current`;
  console.log('Attempting to fetch from:', url);

  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json'
      },
      cache: 'no-store',
      next: { revalidate: 0 }
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error response:', errorText);
      throw new Error(`Failed to fetch Stats.fm data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Received data structure:', JSON.stringify(data, null, 2));

    if (!data.item) {
      console.log('No current track data');
      return null;
    }

    const { track } = data.item;

    return {
      name: track.name,
      artists: track.artists.map((artist: { name: string }) => artist.name).join(', '),
      album: track.albums?.[0]?.name || 'Unknown',
      albumImageUrl: track.albums?.[0]?.image || '',
      url: `https://stats.fm/track/${track.id}`,
      isPlaying: data.item.isPlaying,
      progressMs: data.item.progressMs,
      platform: data.item.platform,
      spotifyPopularity: track.spotifyPopularity || 0,
      explicit: track.explicit || false,
      durationMs: track.durationMs || 0,
      date: data.item.date || null
    };
  } catch (error) {
    console.error('Error fetching Stats.fm data:', error);
    return null;
  }
}