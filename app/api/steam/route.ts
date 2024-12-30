import { type NextRequest } from 'next/server';
import { getCurrentGame } from '../../lib/steam';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const game = await getCurrentGame();
    
    return new Response(
      JSON.stringify(game),
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
      JSON.stringify(null),
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