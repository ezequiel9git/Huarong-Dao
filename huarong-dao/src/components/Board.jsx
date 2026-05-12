import React, { useRef, useState, useEffect, useCallback } from 'react';
import Piece from './Piece';
import { canMovePiece } from '../hooks/useGame';

const CELL = 80;
const GAP = 5;
const DRAG_THRESHOLD = 28;

export default function Board({ pieces, movePiece, won }) {
  const [selectedId, setSelectedId] = useState(null);
  const boardRef = useRef(null);
  const dragRef = useRef(null);
  const [exitPulse, setExitPulse] = useState(false);

  // Exit pulse animation when Cao Cao is near
  useEffect(() => {
    const cc = pieces.find((p) => p.id === 'caocao');
    if (cc && cc.row >= 2) setExitPulse(true);
    else setExitPulse(false);
  }, [pieces]);

  // Keyboard movement
  useEffect(() => {
    const handleKey = (e) => {
      if (!selectedId) return;
      const dirMap = {
        ArrowUp: 'up', ArrowDown: 'down',
        ArrowLeft: 'left', ArrowRight: 'right',
        w: 'up', s: 'down', a: 'left', d: 'right',
      };
      const dir = dirMap[e.key];
      if (dir) {
        e.preventDefault();
        movePiece(selectedId, dir);
      }
      if (e.key === 'Escape') setSelectedId(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedId, movePiece]);

  // Deselect on board background click
  const handleBoardClick = (e) => {
    if (e.target === boardRef.current || e.target.dataset.bg) {
      setSelectedId(null);
    }
  };

  // --- Mouse drag ---
  const handlePieceMouseDown = useCallback((e, pieceId) => {
    e.preventDefault();
    setSelectedId(pieceId);
    dragRef.current = { pieceId, startX: e.clientX, startY: e.clientY, fired: false };
  }, []);

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!dragRef.current || dragRef.current.fired) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      if (Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) return;
      const dir = Math.abs(dx) > Math.abs(dy)
        ? (dx > 0 ? 'right' : 'left')
        : (dy > 0 ? 'down' : 'up');
      movePiece(dragRef.current.pieceId, dir);
      dragRef.current.fired = true;
    };
    const onMouseUp = () => { dragRef.current = null; };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [movePiece]);

  // --- Touch drag ---
  const handlePieceTouchStart = useCallback((e, pieceId) => {
    const t = e.touches[0];
    setSelectedId(pieceId);
    dragRef.current = { pieceId, startX: t.clientX, startY: t.clientY, fired: false };
  }, []);

  useEffect(() => {
    const onTouchMove = (e) => {
      if (!dragRef.current || dragRef.current.fired) return;
      const t = e.touches[0];
      const dx = t.clientX - dragRef.current.startX;
      const dy = t.clientY - dragRef.current.startY;
      if (Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) return;
      const dir = Math.abs(dx) > Math.abs(dy)
        ? (dx > 0 ? 'right' : 'left')
        : (dy > 0 ? 'down' : 'up');
      movePiece(dragRef.current.pieceId, dir);
      dragRef.current.fired = true;
    };
    const onTouchEnd = () => { dragRef.current = null; };
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [movePiece]);

  const boardW = 4 * CELL;
  const boardH = 5 * CELL;

  // Show available moves for selected piece as arrows
  const selectedPiece = pieces.find((p) => p.id === selectedId);
  const availableDirs = selectedPiece
    ? ['up','down','left','right'].filter((d) => canMovePiece(selectedPiece, d, pieces))
    : [];

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* Board */}
      <div
        ref={boardRef}
        onClick={handleBoardClick}
        data-bg="true"
        style={{
          width: boardW,
          height: boardH,
          position: 'relative',
          background: 'linear-gradient(145deg, #2c1810 0%, #1a0e08 100%)',
          borderRadius: 12,
          border: '3px solid #8b6914',
          boxShadow: '0 8px 40px rgba(0,0,0,0.8), inset 0 0 60px rgba(0,0,0,0.4)',
          overflow: 'visible',
          cursor: 'default',
          userSelect: 'none',
        }}
      >
        {/* Grid lines */}
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
          viewBox={`0 0 ${boardW} ${boardH}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Vertical lines */}
          {[1, 2, 3].map((c) => (
            <line key={`v${c}`} x1={c * CELL} y1={0} x2={c * CELL} y2={boardH}
              stroke="rgba(200,160,60,0.2)" strokeWidth="1" />
          ))}
          {/* Horizontal lines */}
          {[1, 2, 3, 4].map((r) => (
            <line key={`h${r}`} x1={0} y1={r * CELL} x2={boardW} y2={r * CELL}
              stroke="rgba(200,160,60,0.2)" strokeWidth="1" />
          ))}
          {/* Corner decoration */}
          {[[0,0],[boardW,0],[0,boardH],[boardW,boardH]].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={6} fill="none"
              stroke="rgba(200,160,60,0.5)" strokeWidth="1.5" />
          ))}
        </svg>

        {/* Board inner wood texture overlay */}
        <div data-bg="true" style={{
          position: 'absolute', inset: 0, borderRadius: 9, pointerEvents: 'none',
          background: 'repeating-linear-gradient(92deg, transparent 0px, rgba(255,255,255,0.015) 1px, transparent 2px, transparent 40px)',
        }} />

        {/* Exit gate at bottom */}
        <div style={{
          position: 'absolute',
          bottom: -14,
          left: CELL,
          width: 2 * CELL,
          height: 18,
          zIndex: 20,
          pointerEvents: 'none',
        }}>
          {/* Gate opening */}
          <div style={{
            width: '100%', height: '100%',
            background: exitPulse
              ? 'linear-gradient(180deg, #f7d94c 0%, #e8a800 100%)'
              : 'linear-gradient(180deg, #8b6914 0%, #5a4010 100%)',
            borderRadius: '0 0 8px 8px',
            boxShadow: exitPulse ? '0 0 20px rgba(232,168,0,0.8)' : 'none',
            transition: 'all 0.5s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{
              fontFamily: '"Ma Shan Zheng", serif',
              fontSize: '0.6rem',
              color: exitPulse ? '#3a2000' : '#c9a84c',
              letterSpacing: '0.1em',
            }}>出口</span>
          </div>
          {/* Left pillar */}
          <div style={{
            position: 'absolute', top: 0, left: -8, width: 8, height: '100%',
            background: 'linear-gradient(90deg, #5a3a10, #8b6914)',
            borderRadius: '4px 0 0 4px',
          }} />
          {/* Right pillar */}
          <div style={{
            position: 'absolute', top: 0, right: -8, width: 8, height: '100%',
            background: 'linear-gradient(90deg, #8b6914, #5a3a10)',
            borderRadius: '0 4px 4px 0',
          }} />
        </div>

        {/* Direction arrows for selected piece */}
        {selectedPiece && availableDirs.map((dir) => {
          const arrowPos = {
            up:    { left: selectedPiece.col * CELL + selectedPiece.w * CELL / 2 - 12, top: selectedPiece.row * CELL - 22, rotate: '0deg' },
            down:  { left: selectedPiece.col * CELL + selectedPiece.w * CELL / 2 - 12, top: (selectedPiece.row + selectedPiece.h) * CELL + 6, rotate: '180deg' },
            left:  { left: selectedPiece.col * CELL - 22, top: selectedPiece.row * CELL + selectedPiece.h * CELL / 2 - 12, rotate: '270deg' },
            right: { left: (selectedPiece.col + selectedPiece.w) * CELL + 6, top: selectedPiece.row * CELL + selectedPiece.h * CELL / 2 - 12, rotate: '90deg' },
          }[dir];
          return (
            <div
              key={dir}
              onClick={() => movePiece(selectedId, dir)}
              style={{
                position: 'absolute',
                left: arrowPos.left,
                top: arrowPos.top,
                width: 24,
                height: 24,
                zIndex: 50,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'arrowPulse 0.8s ease-in-out infinite alternate',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20"
                style={{ transform: `rotate(${arrowPos.rotate})`, filter: 'drop-shadow(0 0 4px rgba(255,220,80,0.8))' }}>
                <polygon points="10,2 18,16 2,16" fill="#f7d94c" stroke="#a07a00" strokeWidth="1" />
              </svg>
            </div>
          );
        })}

        {/* Pieces */}
        {pieces.map((piece) => (
          <Piece
            key={piece.id}
            piece={piece}
            isSelected={piece.id === selectedId}
            cellSize={CELL}
            gap={GAP}
            onMouseDown={(e) => handlePieceMouseDown(e, piece.id)}
            onTouchStart={(e) => handlePieceTouchStart(e, piece.id)}
          />
        ))}
      </div>

      {/* Left/Right board decoration pillars */}
      {[{ side: 'left', x: -18 }, { side: 'right', x: boardW + 6 }].map(({ side, x }) => (
        <div key={side} style={{
          position: 'absolute', top: 0, left: x, width: 12, height: boardH,
          background: 'linear-gradient(180deg, #6b4a14 0%, #3a2a08 50%, #6b4a14 100%)',
          borderRadius: side === 'left' ? '6px 0 0 6px' : '0 6px 6px 0',
          boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
        }}>
          {[0.2, 0.5, 0.8].map((p) => (
            <div key={p} style={{
              position: 'absolute', top: `${p * 100}%`, left: 1, right: 1,
              height: 3, background: 'rgba(200,160,60,0.4)', borderRadius: 2,
            }} />
          ))}
        </div>
      ))}
    </div>
  );
}
