import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';
import { createInitialBoard } from '../../../types/checkers';
import type { CreateGameRequest } from '../../../types/checkers';

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

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as CreateGameRequest;
    
    const initialBoard = createInitialBoard();
    
    const { data, error } = await supabase
      .from('checkers_games')
      .insert([{
        board: initialBoard,
        current_turn: 'white',
        player_white: body.player_name || null,
        status: 'waiting',
        white_captured: 0,
        black_captured: 0
      }])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    return NextResponse.json(data, {
      headers: corsHeaders,
    });
  } catch (error) {
    console.error('Failed to create game:', error);
    return NextResponse.json(
      { error: 'Failed to create game' },
      { status: 500, headers: corsHeaders }
    );
  }
}