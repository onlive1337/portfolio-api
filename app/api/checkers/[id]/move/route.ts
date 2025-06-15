import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';
import { isValidMove, applyMove, checkWinner } from '../../../../types/checkers';
import type { MoveRequest } from '../../../../types/checkers';

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
    const move = (await req.json()) as MoveRequest;
    
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

    if (gameData.status !== 'playing') {
      return NextResponse.json(
        { error: 'Game is not in playing state' },
        { status: 400, headers: corsHeaders }
      );
    }

    if (gameData.current_turn !== move.player) {
      return NextResponse.json(
        { error: 'Not your turn' },
        { status: 400, headers: corsHeaders }
      );
    }

    const board = gameData.board as number[][];
    
    if (!isValidMove(board, move.from_row, move.from_col, move.to_row, move.to_col, move.player)) {
      return NextResponse.json(
        { error: 'Invalid move' },
        { status: 400, headers: corsHeaders }
      );
    }

    const moveResult = applyMove(board, move);
    const newBoard = moveResult.board;
    
    const newWhiteCaptured = gameData.white_captured + moveResult.whiteCaptured;
    const newBlackCaptured = gameData.black_captured + moveResult.blackCaptured;
    
    const winner = checkWinner(newBoard);
    const nextTurn = move.player === 'white' ? 'black' : 'white';
    const gameStatus = winner ? 'finished' : 'playing';

    const { data: updatedGame, error: updateError } = await supabase
      .from('checkers_games')
      .update({
        board: newBoard,
        current_turn: gameStatus === 'finished' ? gameData.current_turn : nextTurn,
        status: gameStatus,
        winner: winner,
        white_captured: newWhiteCaptured,
        black_captured: newBlackCaptured,
        updated_at: new Date().toISOString()
      })
      .eq('id', params.id)
      .select()
      .single();

    if (updateError) throw updateError;

    const { error: moveError } = await supabase
      .from('checkers_moves')
      .insert([{
        game_id: params.id,
        from_row: move.from_row,
        from_col: move.from_col,
        to_row: move.to_row,
        to_col: move.to_col,
        player: move.player
      }]);

    if (moveError) throw moveError;

    return NextResponse.json({
      game: updatedGame,
      move_result: {
        captured: moveResult.captured,
        winner: winner,
        next_turn: gameStatus === 'finished' ? null : nextTurn
      }
    }, {
      headers: corsHeaders,
    });
  } catch (error) {
    console.error('Failed to make move:', error);
    return NextResponse.json(
      { error: 'Failed to make move' },
      { status: 500, headers: corsHeaders }
    );
  }
}