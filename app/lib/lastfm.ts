const LASTFM_API_KEY = process.env.LASTFM_API_KEY;
const LASTFM_USERNAME = process.env.LASTFM_USERNAME;

export async function getRecentTracks() {
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch Last.fm data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching Last.fm data:', error);
    return null;
  }
}