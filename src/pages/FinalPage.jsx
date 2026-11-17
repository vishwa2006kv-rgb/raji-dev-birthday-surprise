import React, { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { RotateCw, Heart } from 'lucide-react';
import { startCelebrationConfetti } from '../components/ConfettiHelper';

const FinalPage = ({ onLoveLoop }) => {
  useEffect(() => {
    // Continuous celebratory confetti shower
    const stopConfetti = startCelebrationConfetti(10000);
    return () => {
      if (stopConfetti) stopConfetti();
    };
  }, []);

  // Ascending 3D hearts behind the button/center
  const risingHearts = useMemo(() => {
    return Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 260,
      size: Math.random() * 18 + 14,
      delay: Math.random() * 3,
      duration: Math.random() * 2.5 + 2.5,
      symbol: ['💖', '💕', '💗', '❤️', '💓'][i % 5]
    }));
  }, []);

  return (
    <motion.div
      key="final-screen"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6 }}
      className="romance-card"
      style={{
        maxWidth: '560px',
        padding: '52px 28px',
        minHeight: '440px',
        justifyContent: 'center',
        position: 'relative'
      }}
    >
      {/* Dynamic Rising 3D Heart Swarm */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '300px',
          height: '240px',
          pointerEvents: 'none',
          zIndex: 2
        }}
      >
        <style>{`
          @keyframes riseHeartBurst {
            0% {
              transform: translateY(40px) scale(0.6);
              opacity: 0;
            }
            20% {
              opacity: 0.9;
            }
            80% {
              opacity: 0.9;
            }
            100% {
              transform: translateY(-160px) scale(1.35);
              opacity: 0;
            }
          }
        `}</style>
        {risingHearts.map((h) => (
          <span
            key={h.id}
            style={{
              position: 'absolute',
              left: `calc(50% + ${h.x}px)`,
              bottom: '20px',
              fontSize: `${h.size}px`,
              filter: 'drop-shadow(0 0 10px rgba(242, 56, 135, 0.7))',
              animation: `riseHeartBurst ${h.duration}s infinite ease-out`,
              animationDelay: `${h.delay}s`,
              willChange: 'transform, opacity'
            }}
          >
            {h.symbol}
          </span>
        ))}
      </div>

      {/* Main Heading matching Screenshot 2026-11-17 124056.png */}
      <h1
        className="font-script text-glow"
        style={{
          fontSize: 'clamp(2.5rem, 6.2vw, 3.6rem)',
          fontWeight: 700,
          color: '#FFFFFF',
          lineHeight: 1.2,
          marginBottom: '54px',
          zIndex: 5,
          position: 'relative'
        }}
      >
        Once again happy<br />
        birthday my love 💗
      </h1>

      {/* LOVE LOOP Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onLoveLoop}
        className="btn-primary-glow"
        style={{
          padding: '16px 44px',
          fontSize: '16px',
          zIndex: 10,
          position: 'relative'
        }}
      >
        <span>LOVE LOOP</span>
        <RotateCw size={18} />
      </motion.button>
    </motion.div>
  );
};

export default FinalPage;
