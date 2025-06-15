export interface CheckersGame {
  id: string;
  board: number[][];
  current_turn: 'white' | 'black';
  player_white?: string;
  player_black?: string;
  status: 'waiting' | 'playing' | 'finished';
  winner?: 'white' | 'black' | 'draw';
  white_captured: number;
  black_captured: number;
  created_at: string;
  updated_at: string;
}

export interface CheckersMove {
  from_row: number;
  from_col: number;
  to_row: number;
  to_col: number;
  player: 'white' | 'black';
}

export interface CreateGameRequest {
  player_name?: string;
}

export interface JoinGameRequest {
  player_name?: string;
}

export type MoveRequest = CheckersMove;

export interface CheckersGameState {
  game: CheckersGame;
  moves: CheckersMove[];
  can_move: boolean;
  is_player_turn: boolean;
}

export const EMPTY = 0;
export const WHITE = 1;
export const BLACK = 2;
export const WHITE_KING = 3;
export const BLACK_KING = 4;

export function createInitialBoard(): number[][] {
  const board = Array(8).fill(null).map(() => Array(8).fill(EMPTY));
  
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 8; col++) {
      if ((row + col) % 2 === 1) {
        board[row][col] = BLACK;
      }
    }
  }
  
  for (let row = 5; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if ((row + col) % 2 === 1) {
        board[row][col] = WHITE;
      }
    }
  }
  
  return board;
}

export function isValidMove(
  board: number[][],
  fromRow: number,
  fromCol: number,
  toRow: number,
  toCol: number,
  currentTurn: 'white' | 'black'
): boolean {
  if (toRow < 0 || toRow >= 8 || toCol < 0 || toCol >= 8) return false;
  if (board[toRow][toCol] !== EMPTY) return false;
  
  const piece = board[fromRow][fromCol];
  if (piece === EMPTY) return false;
  
  const isWhitePiece = piece === WHITE || piece === WHITE_KING;
  const isBlackPiece = piece === BLACK || piece === BLACK_KING;
  
  if (currentTurn === 'white' && !isWhitePiece) return false;
  if (currentTurn === 'black' && !isBlackPiece) return false;
  
  const rowDiff = toRow - fromRow;
  const colDiff = Math.abs(toCol - fromCol);
  
  if (colDiff !== Math.abs(rowDiff)) return false;
  
  if (piece === WHITE && rowDiff > 0) return false;
  if (piece === BLACK && rowDiff < 0) return false;
  
  if (Math.abs(rowDiff) === 1) return true;
  
  if (Math.abs(rowDiff) === 2) {
    const midRow = fromRow + rowDiff / 2;
    const midCol = fromCol + (toCol - fromCol) / 2;
    const midPiece = board[midRow][midCol];
    
    if (isWhitePiece && (midPiece === BLACK || midPiece === BLACK_KING)) return true;
    if (isBlackPiece && (midPiece === WHITE || midPiece === WHITE_KING)) return true;
  }
  
  return false;
}

export function applyMove(
  board: number[][],
  move: CheckersMove
): { board: number[][]; captured: boolean; whiteCaptured: number; blackCaptured: number } {
  const newBoard = board.map(row => [...row]);
  const piece = newBoard[move.from_row][move.from_col];
  
  newBoard[move.from_row][move.from_col] = EMPTY;
  newBoard[move.to_row][move.to_col] = piece;
  
  let captured = false;
  let whiteCaptured = 0;
  let blackCaptured = 0;
  
  if (Math.abs(move.to_row - move.from_row) === 2) {
    const midRow = move.from_row + (move.to_row - move.from_row) / 2;
    const midCol = move.from_col + (move.to_col - move.from_col) / 2;
    const capturedPiece = newBoard[midRow][midCol];
    
    if (capturedPiece === WHITE || capturedPiece === WHITE_KING) {
      whiteCaptured = 1;
    } else if (capturedPiece === BLACK || capturedPiece === BLACK_KING) {
      blackCaptured = 1;
    }
    
    newBoard[midRow][midCol] = EMPTY;
    captured = true;
  }
  
  if (piece === WHITE && move.to_row === 0) {
    newBoard[move.to_row][move.to_col] = WHITE_KING;
  } else if (piece === BLACK && move.to_row === 7) {
    newBoard[move.to_row][move.to_col] = BLACK_KING;
  }
  
  return { board: newBoard, captured, whiteCaptured, blackCaptured };
}

export function checkWinner(board: number[][]): 'white' | 'black' | 'draw' | null {
  let whitePieces = 0;
  let blackPieces = 0;
  
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece === WHITE || piece === WHITE_KING) whitePieces++;
      if (piece === BLACK || piece === BLACK_KING) blackPieces++;
    }
  }
  
  if (whitePieces === 0) return 'black';
  if (blackPieces === 0) return 'white';
  
  return null;
}