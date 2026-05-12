import React from 'react';

function IconBtn({ onClick, disabled, title, children, variant = 'default' }) {
  const bg = variant === 'danger'
    ? 'rgba(200,24,24,0.15)'
    : 'rgba(255,255,255,0.06)';
  const border = variant === 'danger'
    ? '1px solid rgba(200,24,24,0.3)'
    : '1px solid rgba(200,160,60,0.2)';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      style={{
        background: bg, border, borderRadius: 8,
        color: disabled ? 'rgba(255,255,255,0.2)' : '#f5e6c8',
        cursor: disabled ? 'not-allowed' : 'pointer',
        padding: '8px 14px',
        fontFamily: '"Cinzel", serif',
        fontSize: '0.7rem',
        letterSpacing: '0.05em',
        display: 'flex', alignItems: 'center', gap: 6,
        transition: 'all 0.15s ease',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = bg; }}
    >
      {children}
    </button>
  );
}

function StatBox({ label, value, highlight }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(200,160,60,0.15)',
      borderRadius: 8, padding: '10px 16px',
      textAlign: 'center', minWidth: 72,
    }}>
      <div style={{
        fontFamily: '"Cinzel", serif',
        fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
        color: highlight ? '#f7d94c' : '#f5e6c8',
        fontWeight: 700, lineHeight: 1,
        textShadow: highlight ? '0 0 12px rgba(247,217,76,0.4)' : 'none',
      }}>{value}</div>
      <div style={{
        fontFamily: '"Cinzel", serif',
        fontSize: '0.55rem', letterSpacing: '0.1em',
        color: 'rgba(255,255,255,0.35)', marginTop: 4, textTransform: 'uppercase',
      }}>{label}</div>
    </div>
  );
}

export default function GameUI({
  levelName, levelSubtitle, levelNum, totalLevels,
  moves, minMoves, formattedTime,
  canUndo, canRedo,
  onUndo, onRedo, onReset, onMenu,
}) {
  const efficiency = moves > 0 ? Math.min(100, Math.round((minMoves / moves) * 100)) : 100;

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 20,
      maxWidth: 280, width: '100%',
    }}>
      {/* Level header */}
      <div style={{
        background: 'linear-gradient(145deg, rgba(44,24,16,0.8), rgba(26,14,8,0.8))',
        border: '1px solid rgba(139,105,20,0.4)',
        borderRadius: 12, padding: '16px 20px',
      }}>
        <div style={{
          fontFamily: '"Cinzel", serif', fontSize: '0.6rem', letterSpacing: '0.2em',
          color: 'rgba(255,255,255,0.3)', marginBottom: 6,
        }}>NIVEL {levelNum} / {totalLevels}</div>
        <div style={{
          fontFamily: '"Ma Shan Zheng", serif', fontSize: '1.8rem',
          color: '#f7d94c', lineHeight: 1, marginBottom: 2,
        }}>{levelName}</div>
        <div style={{
          fontFamily: '"Cinzel", serif', fontSize: '0.65rem', letterSpacing: '0.1em',
          color: 'rgba(255,255,255,0.35)',
        }}>{levelSubtitle}</div>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 10 }}>
        <StatBox label="Movs." value={moves} highlight={moves > 0} />
        <StatBox label="Tiempo" value={formattedTime} />
        <StatBox label="Mín." value={`~${minMoves}`} />
      </div>

      {/* Efficiency bar */}
      <div style={{ padding: '0 2px' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6,
        }}>
          <span style={{ fontFamily: '"Cinzel", serif', fontSize: '0.6rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em' }}>
            EFICIENCIA
          </span>
          <span style={{ fontFamily: '"Cinzel", serif', fontSize: '0.7rem', color: '#c9a84c' }}>
            {efficiency}%
          </span>
        </div>
        <div style={{ height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${efficiency}%`,
            background: efficiency >= 80 ? 'linear-gradient(90deg, #f7d94c, #e8a800)' : efficiency >= 50 ? 'linear-gradient(90deg, #2ecc8a, #1a9460)' : 'linear-gradient(90deg, #e84040, #c01818)',
            borderRadius: 2,
            transition: 'width 0.5s ease',
          }} />
        </div>
      </div>

      {/* Control buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <IconBtn onClick={onUndo} disabled={!canUndo} title="Deshacer (Ctrl+Z)">
            ↩ Deshacer
          </IconBtn>
          <IconBtn onClick={onRedo} disabled={!canRedo} title="Rehacer (Ctrl+Y)">
            Rehacer ↪
          </IconBtn>
        </div>
        <IconBtn onClick={onReset} title="Reiniciar nivel">
          ↺ Reiniciar nivel
        </IconBtn>
        <IconBtn onClick={onMenu} title="Volver al menú" variant="danger">
          ☰ Menú de niveles
        </IconBtn>
      </div>

      {/* Legend */}
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(200,160,60,0.1)',
        borderRadius: 10, padding: '14px 16px',
      }}>
        <div style={{
          fontFamily: '"Cinzel", serif', fontSize: '0.55rem', letterSpacing: '0.15em',
          color: 'rgba(255,255,255,0.25)', marginBottom: 10, textTransform: 'uppercase',
        }}>Leyenda de piezas</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {[
            { color: '#e8a800', label: '曹操 Cao Cao (2×2)', sub: 'La pieza a rescatar' },
            { color: '#c01818', label: 'Generales (1×2)', sub: 'Posición vertical' },
            { color: '#1a9460', label: 'Guan Yu 关羽 (2×1)', sub: 'Posición horizontal' },
            { color: '#9a6c28', label: '兵 Soldados (1×1)', sub: 'Piezas menores' },
          ].map(({ color, label, sub }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: color, flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: '"Ma Shan Zheng", serif', fontSize: '0.75rem', color: '#f5e6c8' }}>{label}</div>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Keyboard hint */}
      <div style={{
        fontFamily: 'Georgia, serif', fontSize: '0.7rem',
        color: 'rgba(255,255,255,0.25)', textAlign: 'center', lineHeight: 1.6,
      }}>
        Clic para seleccionar<br/>
        Arrastra o usa las teclas de dirección
      </div>
    </div>
  );
}
