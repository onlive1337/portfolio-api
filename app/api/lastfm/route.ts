import { getRecentTracks } from '../../lib/lastfm';
import type { LastFmTrack } from '../../types';

export const runtime = 'edge';

export async function GET() {
  try {
    const data = await getRecentTracks();

    if (!data) {
      return new Response(
        JSON.stringify({ tracks: [] }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const tracks: LastFmTrack[] = data.recenttracks.track.map((track: {
      name: string;
      artist: { '#text': string };
      album: { '#text': string };
      image: { size: string; '#text': string }[];
      url: string;
      '@attr'?: { nowplaying: string };
      date?: { uts: string };
    }) => ({
      name: track.name,
      artist: track.artist['#text'],
      album: track.album['#text'],
      albumImageUrl: track.image.find(img => img.size === 'large')?.['#text'] || '',
      url: decodeURIComponent(track.url),
      isNowPlaying: track['@attr']?.nowplaying === 'true',
      timestamp: track.date?.uts,
    }));

    return new Response(
      JSON.stringify({ tracks }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching Last.fm data:', error);
    return new Response(
      JSON.stringify({ tracks: [] }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}