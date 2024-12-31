import { NextResponse } from 'next/server';
import { supabase } from '../../lib/supabase';

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';


    const { error: visitorError } = await supabase
      .from('visitors')
      .upsert({ ip_address: ip }, { onConflict: 'ip_address' });

    if (visitorError) throw visitorError;

    const { count: uniqueVisitors } = await supabase
      .from('visitors')
      .select('*', { count: 'exact' });

    const { data: analytics, error: analyticsError } = await supabase
      .rpc('increment_views', { 
        unique_visitors_count: uniqueVisitors || 0,
        last_visit: new Date().toISOString()
      });

    if (analyticsError) throw analyticsError;

    return NextResponse.json(analytics);
  } catch (error) {
    console.error('Failed to update analytics:', error);
    return NextResponse.json({ error: 'Failed to update analytics' }, { status: 500 });
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

    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to get analytics:', error);
    return NextResponse.json({ error: 'Failed to get analytics' }, { status: 500 });
  }
}