import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import BearCouple from '../components/BearCouple';
import { startCelebrationConfetti } from '../components/ConfettiHelper';

const CongratulationsPage = ({ onNext }) => {
  useEffect(() => {
    // Shower celebratory confetti on mount
    const stopConfetti = startCelebrationConfetti(4500);
    return () => {
      if (stopConfetti) stopConfetti();
    };
  }, []);

  return (
    <motion.div
      key="congrats-screen"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6 }}
      className="romance-card"
      style={{
        maxWidth: '560px',
        padding: '40px 24px'
      }}
    >
      {/* Top Party Popper */}
      <motion.div
        animate={{ rotate: [-8, 8, -8], scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        style={{ fontSize: '38px', marginBottom: '8px' }}
      >
        🎉
      </motion.div>

      {/* Heading matching Screenshot 2026-11-17 111523.png */}
      <h1
        className="font-script text-glow"
        style={{
          fontSize: 'clamp(2.4rem, 5.8vw, 3.2rem)',
          fontWeight: 700,
          color: '#FFFFFF',
          marginBottom: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px'
        }}
      >
        <span>Congratulations!</span>
        <span style={{ fontSize: '0.85em' }}>💐</span>
      </h1>

      {/* Cute Animated Bear Couple Illustration */}
      <BearCouple />

      {/* Romantic winning message */}
      <p
        className="font-script"
        style={{
          color: '#FFB8D2',
          fontSize: 'clamp(1.4rem, 3.8vw, 1.85rem)',
          fontWeight: 600,
          margin: '14px 0 28px 0',
          textShadow: '0 0 12px rgba(242, 56, 135, 0.5)'
        }}
      >
        You won my heart forever 💕
      </p>

      {/* Button: 📸 OUR MEMORIES */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onNext}
        className="btn-primary-glow"
        style={{
          width: '100%',
          padding: '16px',
          fontSize: '15px'
        }}
      >
        📸 OUR MEMORIES
      </motion.button>
    </motion.div>
  );
};

export default CongratulationsPage;
