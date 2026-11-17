import React, { useMemo } from 'react';

const FloatingHearts = () => {
  // Generate random particles once
  const particles = useMemo(() => {
    const items = [];
    const symbols = ['💖', '💕', '🌸', '✨', '💗', '❤️', '🌹'];
    const count = 24; // balanced for mobile performance

    for (let i = 0; i < count; i++) {
      items.push({
        id: i,
        symbol: symbols[i % symbols.length],
        left: Math.random() * 100, // percentage across screen
        size: Math.random() * 16 + 12, // 12px to 28px
        duration: Math.random() * 12 + 10, // 10s to 22s
        delay: Math.random() * 10,
        opacity: Math.random() * 0.35 + 0.15,
        rotationStart: Math.random() * 360,
        swayAmount: Math.random() * 60 - 30
      });
    }
    return items;
  }, []);

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 1
      }}
      aria-hidden="true"
    >
      <style>{`
        @keyframes floatUpParticle {
          0% {
            transform: translateY(105vh) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: var(--p-opacity);
          }
          90% {
            opacity: var(--p-opacity);
          }
          100% {
            transform: translateY(-10vh) translateX(var(--p-sway)) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>

      {particles.map((p) => (
        <span
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            bottom: '-40px',
            fontSize: `${p.size}px`,
            filter: 'drop-shadow(0 0 6px rgba(242, 56, 135, 0.4))',
            animation: `floatUpParticle ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
            '--p-opacity': p.opacity,
            '--p-sway': `${p.swayAmount}px`,
            willChange: 'transform, opacity'
          }}
        >
          {p.symbol}
        </span>
      ))}
    </div>
  );
};

export default React.memo(FloatingHearts);

