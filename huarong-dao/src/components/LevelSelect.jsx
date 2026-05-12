import React from 'react';
import { LEVELS } from '../data/levels';

const DIFF_LABELS = { 1: '初级', 2: '中级', 3: '高级' };
const DIFF_COLORS = { 1: '#2ecc8a', 2: '#f7d94c', 3: '#e84040' };

function MiniBoard({ pieces }) {
  const MINI = 20;
  const TYPE_COLORS = {
    caocao: '#e8a800',
    vgeneral: '#c01818',
    hgeneral: '#1a9460',
    soldier: '#9a6c28',
  };
  return (
    <div style={{
      width: 4 * MINI, height: 5 * MINI,
      position: 'relative',
      background: '#1a0e08',
      border: '1px solid #8b6914',
      borderRadius: 4,
      flexShrink: 0,
    }}>
      {pieces.map((p) => (
        <div key={p.id} style={{
          position: 'absolute',
          left: p.col * MINI + 1,
          top: p.row * MINI + 1,
          width: p.w * MINI - 2,
          height: p.h * MINI - 2,
          background: TYPE_COLORS[p.type] || '#9a6c28',
          borderRadius: 2,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: 7, color: '#fff', fontFamily: '"Ma Shan Zheng", serif', lineHeight: 1 }}>
            {p.name}
          </span>
        </div>
      ))}
      {/* Exit marker */}
      <div style={{
        position: 'absolute', bottom: -3, left: MINI, width: 2 * MINI, height: 3,
        background: '#f7d94c', borderRadius: '0 0 2px 2px',
      }} />
    </div>
  );
}

export default function LevelSelect({ onSelect, bestScores }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '40px 20px',
    }}>
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{
          fontFamily: '"Ma Shan Zheng", serif',
          fontSize: 'clamp(3rem, 10vw, 5rem)',
          color: '#f7d94c',
          lineHeight: 1,
          textShadow: '0 0 40px rgba(247,217,76,0.4)',
          letterSpacing: '0.1em',
        }}>
          华容道
        </div>
        <div style={{
          fontFamily: '"Cinzel", serif',
          color: 'rgba(255,255,255,0.4)',
          fontSize: 'clamp(0.7rem, 2vw, 0.9rem)',
          letterSpacing: '0.4em',
          marginTop: 8,
          textTransform: 'uppercase',
        }}>
          Huarong Dao — El Desfiladero
        </div>
        <div style={{
          width: 120, height: 1,
          background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)',
          margin: '16px auto 0',
        }} />
      </div>

      {/* Story intro */}
      <div style={{
        maxWidth: 480, textAlign: 'center', marginBottom: 40,
        fontFamily: 'Georgia, serif', fontSize: '0.85rem',
        color: 'rgba(245,230,200,0.6)', lineHeight: 1.7, fontStyle: 'italic',
      }}>
        "Tras la Batalla del Río Rojo, Cao Cao huye por el estrecho desfiladero de Huarong. 
        Sus generales le rodean, protegiendo y bloqueando a la vez su escape..."
      </div>

      {/* Level cards */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 500,
      }}>
        {LEVELS.map((level, i) => {
          const best = bestScores?.[level.id];
          return (
            <button
              key={level.id}
              onClick={() => onSelect(level)}
              style={{
                background: 'linear-gradient(145deg, rgba(44,24,16,0.9), rgba(26,14,8,0.9))',
                border: '1px solid rgba(139,105,20,0.5)',
                borderRadius: 14,
                padding: '20px 24px',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex', alignItems: 'center', gap: 20,
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                animation: `slideUp ${0.3 + i * 0.1}s ease backwards`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = '1px solid rgba(247,217,76,0.5)';
                e.currentTarget.style.boxShadow = '0 8px 40px rgba(0,0,0,0.6), 0 0 20px rgba(247,217,76,0.1)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = '1px solid rgba(139,105,20,0.5)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <MiniBoard pieces={level.pieces} />

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <span style={{
                    fontFamily: '"Ma Shan Zheng", serif', fontSize: '1.4rem', color: '#f5e6c8',
                  }}>{level.name}</span>
                  <span style={{
                    fontFamily: '"Ma Shan Zheng", serif', fontSize: '0.7rem',
                    color: DIFF_COLORS[level.difficulty],
                    background: `${DIFF_COLORS[level.difficulty]}22`,
                    border: `1px solid ${DIFF_COLORS[level.difficulty]}44`,
                    borderRadius: 4, padding: '2px 8px',
                  }}>{DIFF_LABELS[level.difficulty]}</span>
                </div>
                <div style={{
                  fontFamily: '"Cinzel", serif', fontSize: '0.65rem',
                  color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', marginBottom: 8,
                }}>{level.subtitle}</div>
                <div style={{
                  fontFamily: 'Georgia, serif', fontSize: '0.75rem',
                  color: 'rgba(245,230,200,0.5)', lineHeight: 1.5,
                }}>{level.description}</div>

                {best && (
                  <div style={{
                    marginTop: 8, display: 'flex', gap: 16,
                    fontFamily: '"Cinzel", serif', fontSize: '0.65rem',
                    color: '#c9a84c',
                  }}>
                    <span>🏆 Mejor: {best.moves} mov.</span>
                    <span>⏱ {best.time}</span>
                  </div>
                )}
              </div>

              <div style={{ color: 'rgba(247,217,76,0.5)', fontSize: '1.2rem' }}>›</div>
            </button>
          );
        })}
      </div>

      {/* Instructions */}
      <div style={{
        marginTop: 40, maxWidth: 400, textAlign: 'center',
        padding: '16px 24px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(200,160,60,0.15)',
        borderRadius: 10,
      }}>
        <div style={{ fontFamily: '"Cinzel", serif', color: '#c9a84c', fontSize: '0.7rem', letterSpacing: '0.15em', marginBottom: 10 }}>
          CÓMO JUGAR
        </div>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: '0.75rem', color: 'rgba(245,230,200,0.5)', lineHeight: 1.7 }}>
          🖱 <strong style={{ color: 'rgba(245,230,200,0.7)' }}>Arrastra</strong> las piezas para moverlas<br/>
          🖱 <strong style={{ color: 'rgba(245,230,200,0.7)' }}>Clic</strong> para seleccionar + flechas del teclado<br/>
          🎯 Guía a <span style={{ color: '#f7d94c', fontFamily: '"Ma Shan Zheng", serif' }}>曹操</span> (Cao Cao) a la salida dorada
        </div>
      </div>
    </div>
  );
}
