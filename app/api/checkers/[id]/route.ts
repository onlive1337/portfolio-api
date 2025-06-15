import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';
import type { CheckersGameState } from '../../../types/checkers';

export const runtime = 'edge';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    
    const { data: gameData, error: gameError } = await supabase
      .from('checkers_games')
      .select('*')
      .eq('id', params.id)
      .single();

    if (gameError) {
      if (gameError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Game not found' },
          { status: 404, headers: corsHeaders }
        );
      }
      throw gameError;
    }

    const { data: movesData, error: movesError } = await supabase
      .from('checkers_moves')
      .select('*')
      .eq('game_id', params.id)
      .order('created_at', { ascending: true });

    if (movesError) throw movesError;

    const response: CheckersGameState = {
      game: gameData,
      moves: movesData || [],
      can_move: gameData.status === 'playing',
      is_player_turn: true
    };

    return NextResponse.json(response, {
      headers: corsHeaders,
    });
  } catch (error) {
    console.error('Failed to get game:', error);
    return NextResponse.json(
      { error: 'Failed to get game' },
      { status: 500, headers: corsHeaders }
    );
  }
}