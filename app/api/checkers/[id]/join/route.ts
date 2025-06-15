import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';
import type { JoinGameRequest } from '../../../../types/checkers';

export const runtime = 'edge';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const body = (await req.json()) as JoinGameRequest;
    
    const { data: gameData, error: fetchError } = await supabase
      .from('checkers_games')
      .select('*')
      .eq('id', params.id)
      .single();

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Game not found' },
          { status: 404, headers: corsHeaders }
        );
      }
      throw fetchError;
    }

    if (gameData.status !== 'waiting') {
      return NextResponse.json(
        { error: 'Game is not available for joining' },
        { status: 400, headers: corsHeaders }
      );
    }

    if (gameData.player_black) {
      return NextResponse.json(
        { error: 'Game is already full' },
        { status: 400, headers: corsHeaders }
      );
    }

    const { data, error } = await supabase
      .from('checkers_games')
      .update({
        player_black: body.player_name || null,
        status: 'playing',
        updated_at: new Date().toISOString()
      })
      .eq('id', params.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, {
      headers: corsHeaders,
    });
  } catch (error) {
    console.error('Failed to join game:', error);
    return NextResponse.json(
      { error: 'Failed to join game' },
      { status: 500, headers: corsHeaders }
    );
  }
}