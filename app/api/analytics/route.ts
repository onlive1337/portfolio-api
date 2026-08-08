import { NextResponse } from 'next/server';
import { supabase } from '../../lib/supabase';
import { nextJsonResponse, nextErrorResponse, corsHeaders } from '../../lib/response';
import { rateLimiter, getClientIP } from '../../lib/rate-limit';

export const runtime = 'edge';

interface TrackVisitResult {
  views: number;
  unique_visitors: number;
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(req: Request) {
  try {
    const ip = getClientIP(req);

    const rateLimit = rateLimiter.check(`analytics:${ip}`, 1, 60 * 1000);
    if (!rateLimit.allowed) {
      const { data } = await supabase
          .from('analytics')
          .select('*')
          .eq('id', 1)
          .single();

      return nextJsonResponse({
        views: data?.views || 0,
        unique_visitors: data?.unique_visitors || 0,
      });
    }

    const { data: analytics, error: analyticsError } = await supabase
        .rpc('track_visit', { visitor_ip: ip })
        .single<TrackVisitResult>();

    if (analyticsError) throw analyticsError;

    return nextJsonResponse({
      views: analytics.views,
      unique_visitors: analytics.unique_visitors,
    });
  } catch (error) {
    console.error('Failed to update analytics:', error);
    return nextErrorResponse('Failed to update analytics', 500);
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
        .from('analytics')
        .select('*')
        .eq('id', 1)
        .single();

    if (error) throw error;

    return nextJsonResponse({
      views: data.views,
      unique_visitors: data.unique_visitors,
    });
  } catch (error) {
    console.error('Failed to get analytics:', error);
    return nextErrorResponse('Failed to get analytics', 500);
  }
}