import React, { useEffect, useRef } from 'react';

function getRank(moves, minMoves) {
  const ratio = moves / minMoves;
  if (ratio <= 1.2) return { label: '完美', sub: 'Perfecto', color: '#f7d94c', stars: 3 };
  if (ratio <= 1.6) return { label: '优秀', sub: 'Excelente', color: '#e84040', stars: 2 };
  return { label: '通关', sub: 'Completado', color: '#2ecc8a', stars: 1 };
}

function Particle({ style }) {
  return <div style={style} />;
}

export default function VictoryModal({ moves, time, levelName, levelSubtitle, minMoves, onNext, onReplay, onMenu }) {
  const rank = getRank(moves, minMoves);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = Array.from({ length: 120 }, () => ({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.8) * 10,
      size: Math.random() * 8 + 3,
      color: ['#f7d94c','#e84040','#2ecc8a','#fff','#ff9900'][Math.floor(Math.random() * 5)],
      alpha: 1,
      decay: Math.random() * 0.015 + 0.01,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 8,
      shape: Math.random() > 0.5 ? 'circle' : 'rect',
    }));

    let frame;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.18;
        p.alpha -= p.decay;
        p.rotation += p.rotSpeed;
        if (p.alpha <= 0) return;
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.5);
        }
        ctx.restore();
      });
      if (particles.some((p) => p.alpha > 0)) {
        frame = requestAnimationFrame(animate);
      }
    };
    const timeout = setTimeout(() => { frame = requestAnimationFrame(animate); }, 300);
    return () => { clearTimeout(timeout); cancelAnimationFrame(frame); };
  }, []);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(5,3,1,0.85)',
      backdropFilter: 'blur(6px)',
      animation: 'fadeIn 0.4s ease',
    }}>
      {/* Confetti canvas */}
      <canvas ref={canvasRef} style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative',
        background: 'linear-gradient(145deg, #1a0e08 0%, #2c1810 100%)',
        border: '2px solid #8b6914',
        borderRadius: 20,
        padding: '40px 48px',
        maxWidth: 420,
        width: '90%',
        textAlign: 'center',
        boxShadow: '0 20px 80px rgba(0,0,0,0.9), 0 0 60px rgba(200,160,60,0.2)',
        animation: 'slideUp 0.5s cubic-bezier(0.34,1.56,0.64,1)',
      }}>
        {/* Decorative top border */}
        <div style={{
          position: 'absolute', top: -1, left: '15%', right: '15%', height: 3,
          background: 'linear-gradient(90deg, transparent, #f7d94c, transparent)',
          borderRadius: 2,
        }} />

        <div style={{ fontFamily: '"Ma Shan Zheng", serif', fontSize: '1.1rem', color: '#c9a84c', letterSpacing: '0.3em', marginBottom: 8 }}>
          华容道
        </div>

        <div style={{ fontFamily: '"Ma Shan Zheng", serif', fontSize: '4rem', color: rank.color, lineHeight: 1, marginBottom: 4 }}>
          {rank.label}
        </div>
        <div style={{ fontFamily: '"Cinzel", serif', fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.2em', marginBottom: 24 }}>
          {rank.sub}
        </div>

        {/* Stars */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 28 }}>
          {[1, 2, 3].map((s) => (
            <span key={s} style={{
              fontSize: '2.2rem',
              filter: s <= rank.stars ? `drop-shadow(0 0 8px ${rank.color})` : 'grayscale(1) opacity(0.3)',
              animation: s <= rank.stars ? `starPop ${0.2 + s * 0.15}s ease backwards` : 'none',
            }}>⭐</span>
          ))}
        </div>

        {/* Level info */}
        <div style={{
          background: 'rgba(255,255,255,0.05)', borderRadius: 10,
          padding: '12px 20px', marginBottom: 20,
        }}>
          <div style={{ fontFamily: '"Ma Shan Zheng", serif', color: '#c9a84c', fontSize: '1.2rem' }}>{levelName}</div>
          <div style={{ fontFamily: '"Cinzel", serif', color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', letterSpacing: '0.1em' }}>{levelSubtitle}</div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {[
            { label: 'Movimientos', value: moves, icon: '♟' },
            { label: 'Tiempo', value: time, icon: '⏱' },
            { label: 'Mínimo', value: `~${minMoves}`, icon: '🏆' },
            { label: 'Eficiencia', value: `${Math.round((minMoves / moves) * 100)}%`, icon: '📊' },
          ].map(({ label, value, icon }) => (
            <div key={label} style={{
              background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: '10px 12px',
              border: '1px solid rgba(200,160,60,0.15)',
            }}>
              <div style={{ fontSize: '1.1rem', marginBottom: 2 }}>{icon}</div>
              <div style={{ fontFamily: '"Cinzel", serif', color: '#f5e6c8', fontSize: '1.1rem', fontWeight: 700 }}>{value}</div>
              <div style={{ fontFamily: '"Cinzel", serif', color: 'rgba(255,255,255,0.4)', fontSize: '0.6rem', letterSpacing: '0.05em' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {onNext && (
            <button onClick={onNext} style={{
              fontFamily: '"Cinzel", serif', fontSize: '0.85rem', letterSpacing: '0.15em',
              background: 'linear-gradient(145deg, #f7d94c, #e8a800)',
              color: '#3a2000', border: 'none', borderRadius: 8, padding: '12px 24px',
              cursor: 'pointer', fontWeight: 700,
              boxShadow: '0 4px 20px rgba(232,168,0,0.4)',
            }}>
              SIGUIENTE NIVEL →
            </button>
          )}
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={onReplay} style={{
              flex: 1, fontFamily: '"Cinzel", serif', fontSize: '0.75rem', letterSpacing: '0.1em',
              background: 'rgba(255,255,255,0.08)', color: '#f5e6c8',
              border: '1px solid rgba(200,160,60,0.3)', borderRadius: 8, padding: '10px',
              cursor: 'pointer',
            }}>
              ↺ REINTENTAR
            </button>
            <button onClick={onMenu} style={{
              flex: 1, fontFamily: '"Cinzel", serif', fontSize: '0.75rem', letterSpacing: '0.1em',
              background: 'rgba(255,255,255,0.08)', color: '#f5e6c8',
              border: '1px solid rgba(200,160,60,0.3)', borderRadius: 8, padding: '10px',
              cursor: 'pointer',
            }}>
              ☰ MENÚ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
