const STATSFM_USERNAME = process.env.STATSFM_USERNAME;

export async function getCurrentTrack() {
  const url = `https://api.stats.fm/api/v1/users/${STATSFM_USERNAME}/streams/current`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch Stats.fm data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.item || !data.item.track) {
      return null;
    }

    const track = data.item.track;

    return {
      name: track.name || 'Unknown',
      artists: track.artists.map((artist: { name: string }) => artist.name).join(', ') || 'Unknown',
      album: track.albums[0]?.name || 'Unknown',
      albumImageUrl: track.albums[0]?.image || '',
      url: `https://stats.fm/track/${track.id}`,
      isPlaying: data.item.isPlaying,
      progressMs: data.item.progressMs,
      platform: data.item.platform,
      spotifyPopularity: track.spotifyPopularity || 0,
      explicit: track.explicit || false,
      durationMs: track.durationMs || 0,
      date: data.item.date || null,
    };
  } catch (error) {
    console.error('Error fetching Stats.fm data:', error);
    return null;
  }
}