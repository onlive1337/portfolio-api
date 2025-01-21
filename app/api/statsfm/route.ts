import { getCurrentTrack } from '../../lib/statsfm';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const track = await getCurrentTrack();
    
    return new Response(
      JSON.stringify(track),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS'
        }
      }
    );
  } catch (err) {
    const error = err as Error;
    console.error('Route error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error?.message || 'An unknown error occurred' 
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
}