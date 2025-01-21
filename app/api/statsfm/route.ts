import { getCurrentTrack } from '../../lib/statsfm';
import type { StatsFmTrack } from '../../types';

export const runtime = 'edge';

export async function GET() {
  try {
    const track: StatsFmTrack | null = await getCurrentTrack();

    return new Response(
      JSON.stringify({ track }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching Stats.fm data:', error);
    return new Response(
      JSON.stringify({ track: null }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}