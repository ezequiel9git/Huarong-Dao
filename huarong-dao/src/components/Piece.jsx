import React from 'react';

const TYPE_STYLES = {
  caocao: {
    bg: 'linear-gradient(145deg, #f7d94c 0%, #e8a800 40%, #c8860a 100%)',
    border: '#7a5200',
    shadow: '0 4px 24px rgba(232,168,0,0.5), inset 0 1px 0 rgba(255,240,150,0.6)',
    textColor: '#3a2000',
    textSize: '2rem',
  },
  vgeneral: {
    bg: 'linear-gradient(145deg, #e84040 0%, #c01818 40%, #8b0000 100%)',
    border: '#5a0000',
    shadow: '0 4px 16px rgba(192,24,24,0.45), inset 0 1px 0 rgba(255,120,120,0.4)',
    textColor: '#ffe0e0',
    textSize: '1.3rem',
  },
  hgeneral: {
    bg: 'linear-gradient(145deg, #2ecc8a 0%, #1a9460 40%, #0d6040 100%)',
    border: '#083a28',
    shadow: '0 4px 16px rgba(26,148,96,0.45), inset 0 1px 0 rgba(100,255,180,0.3)',
    textColor: '#d0ffe8',
    textSize: '1.3rem',
  },
  soldier: {
    bg: 'linear-gradient(145deg, #c4954a 0%, #9a6c28 40%, #6b4810 100%)',
    border: '#3a2800',
    shadow: '0 3px 10px rgba(100,70,16,0.5), inset 0 1px 0 rgba(220,170,80,0.3)',
    textColor: '#ffe8c0',
    textSize: '1.5rem',
  },
};

export default function Piece({ piece, isSelected, cellSize, gap, onMouseDown, onTouchStart }) {
  const { col, row, w, h, name, sub, type } = piece;
  const style = TYPE_STYLES[type] || TYPE_STYLES.soldier;

  const left   = col * cellSize + gap;
  const top    = row * cellSize + gap;
  const width  = w * cellSize - gap * 2;
  const height = h * cellSize - gap * 2;

  const selectionRing = isSelected
    ? '0 0 0 3px #fff, 0 0 20px 6px rgba(255,220,80,0.9)'
    : '';

  return (
    <div
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      style={{
        position: 'absolute',
        left,
        top,
        width,
        height,
        background: style.bg,
        border: `2px solid ${style.border}`,
        borderRadius: type === 'caocao' ? 10 : 7,
        boxShadow: [style.shadow, selectionRing].filter(Boolean).join(', '),
        cursor: 'grab',
        userSelect: 'none',
        transition: 'left 0.12s ease, top 0.12s ease, box-shadow 0.15s ease',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: isSelected ? 10 : 1,
        overflow: 'hidden',
      }}
    >
      {/* Decorative top highlight */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '35%',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, transparent 100%)',
        borderRadius: '7px 7px 0 0',
        pointerEvents: 'none',
      }} />

      {/* Chinese character */}
      <span style={{
        fontFamily: '"Ma Shan Zheng", "ZCOOL XiaoWei", serif',
        fontSize: type === 'caocao' ? (w > 1 ? '2.4rem' : '1.4rem') : (w > 1 && h === 1 ? '1.4rem' : style.textSize),
        color: style.textColor,
        lineHeight: 1,
        textShadow: type === 'caocao'
          ? '0 1px 3px rgba(0,0,0,0.5)'
          : '0 1px 3px rgba(0,0,0,0.6)',
        letterSpacing: type === 'caocao' && w === 2 ? '0.2em' : '0',
        fontWeight: '700',
        position: 'relative',
        zIndex: 1,
      }}>
        {name}
      </span>

      {/* Sub-label for generals and Cao Cao */}
      {type !== 'soldier' && (
        <span style={{
          fontFamily: '"Cinzel", serif',
          fontSize: type === 'caocao' ? '0.55rem' : '0.42rem',
          color: style.textColor,
          opacity: 0.7,
          letterSpacing: '0.05em',
          marginTop: 2,
          position: 'relative',
          zIndex: 1,
          textTransform: 'uppercase',
        }}>
          {sub}
        </span>
      )}

      {/* Selected indicator sparkle corners */}
      {isSelected && (
        <>
          {['tl','tr','bl','br'].map((pos) => (
            <div key={pos} style={{
              position: 'absolute',
              width: 6, height: 6,
              ...(pos.includes('t') ? { top: 3 } : { bottom: 3 }),
              ...(pos.includes('l') ? { left: 3 } : { right: 3 }),
              background: '#fff',
              borderRadius: '50%',
              opacity: 0.9,
              pointerEvents: 'none',
            }} />
          ))}
        </>
      )}
    </div>
  );
}
