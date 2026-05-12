import React, { useState, useEffect, useCallback } from 'react';
import { LEVELS } from './data/levels';
import { useGame } from './hooks/useGame';
import { useTimer } from './hooks/useTimer';
import Board from './components/Board';
import GameUI from './components/GameUI';
import VictoryModal from './components/VictoryModal';
import LevelSelect from './components/LevelSelect';

function deepClone(pieces) {
  return pieces.map((p) => ({ ...p }));
}

export default function App() {
  const [screen, setScreen] = useState('menu'); // 'menu' | 'game'
  const [currentLevel, setCurrentLevel] = useState(null);
  const [bestScores, setBestScores] = useState(() => {
    try { return JSON.parse(localStorage.getItem('huarong-best') || '{}'); }
    catch { return {}; }
  });

  const { pieces, moves, won, canUndo, canRedo, movePiece, undo, redo, reset } = useGame(
    currentLevel ? deepClone(currentLevel.pieces) : []
  );
  const { elapsed, formatted: formattedTime, reset: resetTimer } = useTimer(
    screen === 'game' && !won && moves > 0
  );

  // Save best score on win
  useEffect(() => {
    if (!won || !currentLevel) return;
    const prev = bestScores[currentLevel.id];
    if (!prev || moves < prev.moves) {
      const updated = { ...bestScores, [currentLevel.id]: { moves, time: formattedTime } };
      setBestScores(updated);
      localStorage.setItem('huarong-best', JSON.stringify(updated));
    }
  }, [won]); // eslint-disable-line

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      if (screen !== 'game') return;
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') { e.preventDefault(); undo(); }
      if ((e.ctrlKey || e.metaKey) && e.key === 'y') { e.preventDefault(); redo(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [screen, undo, redo]);

  const handleSelectLevel = (level) => {
    setCurrentLevel(level);
    reset(deepClone(level.pieces));
    resetTimer();
    setScreen('game');
  };

  const handleReplay = () => {
    reset(deepClone(currentLevel.pieces));
    resetTimer();
  };

  const handleNextLevel = () => {
    const idx = LEVELS.findIndex((l) => l.id === currentLevel.id);
    const next = LEVELS[idx + 1];
    if (next) handleSelectLevel(next);
    else setScreen('menu');
  };

  const handleMenu = () => {
    setScreen('menu');
    setCurrentLevel(null);
  };

  if (screen === 'menu') {
    return (
      <div className="min-h-screen">
        <LevelSelect onSelect={handleSelectLevel} bestScores={bestScores} />
      </div>
    );
  }

  const levelIdx = LEVELS.findIndex((l) => l.id === currentLevel.id);
  const hasNext = levelIdx < LEVELS.length - 1;

  return (
    <div className="min-h-screen" style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '20px',
    }}>
      {/* Story banner */}
      <div style={{
        maxWidth: 780, width: '100%', textAlign: 'center', marginBottom: 24,
        fontFamily: 'Georgia, serif', fontSize: '0.8rem', fontStyle: 'italic',
        color: 'rgba(245,230,200,0.4)', lineHeight: 1.5,
      }}>
        "{currentLevel.story}"
      </div>

      {/* Main game layout */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 40, alignItems: 'flex-start',
        flexWrap: 'wrap', justifyContent: 'center',
        maxWidth: 780, width: '100%',
      }}>
        {/* Board */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Cao Cao indicator */}
          <div style={{
            fontFamily: '"Ma Shan Zheng", serif',
            fontSize: '0.85rem', color: '#c9a84c',
            letterSpacing: '0.3em', marginBottom: 12,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{ color: '#f7d94c', fontSize: '1.2rem' }}>曹操</span>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem' }}>→ 出口</span>
          </div>
          <Board
            pieces={pieces}
            movePiece={movePiece}
            won={won}
          />
        </div>

        {/* UI Panel */}
        <GameUI
          levelName={currentLevel.name}
          levelSubtitle={currentLevel.subtitle}
          levelNum={levelIdx + 1}
          totalLevels={LEVELS.length}
          moves={moves}
          minMoves={currentLevel.minMoves}
          formattedTime={formattedTime}
          canUndo={canUndo}
          canRedo={canRedo}
          onUndo={undo}
          onRedo={redo}
          onReset={handleReplay}
          onMenu={handleMenu}
        />
      </div>

      {/* Victory modal */}
      {won && (
        <VictoryModal
          moves={moves}
          time={formattedTime}
          levelName={currentLevel.name}
          levelSubtitle={currentLevel.subtitle}
          minMoves={currentLevel.minMoves}
          onNext={hasNext ? handleNextLevel : null}
          onReplay={handleReplay}
          onMenu={handleMenu}
        />
      )}
    </div>
  );
}
