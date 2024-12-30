import { type NextRequest } from 'next/server';
import { getNowPlaying } from '../../lib/spotify';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const response = await getNowPlaying();

    if (response.status === 401) {
      return new Response(
        JSON.stringify({ isPlaying: false }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://onlive.is-a.dev',
          },
        }
      );
    }

    const song = await response.json();

    return new Response(
      JSON.stringify({
        isPlaying: song.is_playing,
        title: song.item?.name,
        artist: song.item?.artists.map((artist: any) => artist.name).join(', '),
        album: song.item?.album?.name,
        albumImageUrl: song.item?.album?.images[0]?.url,
        songUrl: song.item?.external_urls?.spotify,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://onlive.is-a.dev',
        },
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ isPlaying: false }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://onlive.is-a.dev',
        },
      }
    );
  }
}