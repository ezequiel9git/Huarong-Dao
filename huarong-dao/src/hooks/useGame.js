import { useReducer, useCallback } from 'react';
import { COLS, ROWS, WIN_COL, WIN_ROW } from '../data/levels';

function buildGrid(pieces) {
  const grid = Array(ROWS).fill(null).map(() => Array(COLS).fill(null));
  pieces.forEach((p) => {
    for (let r = p.row; r < p.row + p.h; r++) {
      for (let c = p.col; c < p.col + p.w; c++) {
        if (r >= 0 && r < ROWS && c >= 0 && c < COLS) grid[r][c] = p.id;
      }
    }
  });
  return grid;
}

export function canMovePiece(piece, dir, pieces) {
  const grid = buildGrid(pieces);
  const { col, row, w, h } = piece;
  if (dir === 'up') {
    if (row <= 0) return false;
    for (let c = col; c < col + w; c++) if (grid[row - 1][c]) return false;
    return true;
  }
  if (dir === 'down') {
    if (row + h >= ROWS) return false;
    for (let c = col; c < col + w; c++) if (grid[row + h][c]) return false;
    return true;
  }
  if (dir === 'left') {
    if (col <= 0) return false;
    for (let r = row; r < row + h; r++) if (grid[r][col - 1]) return false;
    return true;
  }
  if (dir === 'right') {
    if (col + w >= COLS) return false;
    for (let r = row; r < row + h; r++) if (grid[r][col + w]) return false;
    return true;
  }
  return false;
}

function checkWin(pieces) {
  const cc = pieces.find((p) => p.id === 'caocao');
  return cc && cc.col === WIN_COL && cc.row === WIN_ROW;
}

const DELTA = {
  up:    { row: -1, col:  0 },
  down:  { row:  1, col:  0 },
  left:  { row:  0, col: -1 },
  right: { row:  0, col:  1 },
};

function reducer(state, action) {
  switch (action.type) {
    case 'MOVE': {
      const { pieceId, dir } = action;
      const piece = state.pieces.find((p) => p.id === pieceId);
      if (!piece || !canMovePiece(piece, dir, state.pieces)) return state;
      const d = DELTA[dir];
      const newPieces = state.pieces.map((p) =>
        p.id === pieceId ? { ...p, row: p.row + d.row, col: p.col + d.col } : p
      );
      const won = checkWin(newPieces);
      const newHistory = state.history.slice(0, state.hIdx + 1).concat([newPieces]);
      return { ...state, pieces: newPieces, moves: state.moves + 1, history: newHistory, hIdx: state.hIdx + 1, won };
    }
    case 'UNDO': {
      if (state.hIdx <= 0) return state;
      const idx = state.hIdx - 1;
      return { ...state, pieces: state.history[idx], hIdx: idx, moves: state.moves - 1, won: false };
    }
    case 'REDO': {
      if (state.hIdx >= state.history.length - 1) return state;
      const idx = state.hIdx + 1;
      return { ...state, pieces: state.history[idx], hIdx: idx, moves: state.moves + 1, won: checkWin(state.history[idx]) };
    }
    case 'RESET': {
      const p = action.pieces;
      return { pieces: p, moves: 0, history: [p], hIdx: 0, won: false };
    }
    default:
      return state;
  }
}

export function useGame(initialPieces) {
  const [state, dispatch] = useReducer(reducer, {
    pieces: initialPieces,
    moves: 0,
    history: [initialPieces],
    hIdx: 0,
    won: false,
  });

  const movePiece = useCallback((id, dir) => dispatch({ type: 'MOVE', pieceId: id, dir }), []);
  const undo = useCallback(() => dispatch({ type: 'UNDO' }), []);
  const redo = useCallback(() => dispatch({ type: 'REDO' }), []);
  const reset = useCallback((pieces) => dispatch({ type: 'RESET', pieces }), []);

  return {
    pieces: state.pieces,
    moves: state.moves,
    won: state.won,
    canUndo: state.hIdx > 0,
    canRedo: state.hIdx < state.history.length - 1,
    movePiece,
    undo,
    redo,
    reset,
  };
}
