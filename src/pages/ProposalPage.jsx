import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { triggerHeartExplosion } from '../components/ConfettiHelper';

const ProposalPage = ({ onYes }) => {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [subtitle, setSubtitle] = useState('Try again chellame 🥺');
  const [isExploding, setIsExploding] = useState(false);

  const playfulMessages = [
    'Try again chellame 🥺',
    'Heyyy, you can only say YES! 😜',
    'Wrong button my love! 🥰',
    'Nope, not allowed! 💍',
    'You are stuck with me forever! 💖',
    'Click YES, silly! 😘'
  ];

  const moveNoButton = () => {
    // Generate playful random offset within container bounds
    const randomX = (Math.random() - 0.5) * 220;
    const randomY = (Math.random() - 0.5) * 140;
    setNoPosition({ x: randomX, y: randomY });

    const randomMsg = playfulMessages[Math.floor(Math.random() * playfulMessages.length)];
    setSubtitle(randomMsg);
  };

  const handleYes = () => {
    setIsExploding(true);
    triggerHeartExplosion();
    // Fire second burst after 300ms
    setTimeout(() => {
      triggerHeartExplosion();
    }, 350);

    setTimeout(() => {
      onYes();
    }, 1200);
  };

  return (
    <motion.div
      key="proposal-screen"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6 }}
      className="romance-card"
      style={{
        maxWidth: '560px',
        padding: '48px 28px',
        minHeight: '440px',
        justifyContent: 'center'
      }}
    >
      {/* Top Sparkly Heart */}
      <motion.div
        animate={{ scale: [1, 1.25, 1], y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        style={{ fontSize: '32px', marginBottom: '12px' }}
      >
        💖
      </motion.div>

      {/* Heading matching Screenshot 2026-11-17 111012.png */}
      <h1
        className="font-script text-glow"
        style={{
          fontSize: 'clamp(2.5rem, 6vw, 3.4rem)',
          fontWeight: 700,
          color: '#FFFFFF',
          lineHeight: 1.2,
          marginBottom: '10px'
        }}
      >
        Will you be my<br />
        forever? 💍 💖
      </h1>

      {/* Subtitle */}
      <motion.p
        key={subtitle}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          color: '#FFB8D2',
          fontSize: '1rem',
          fontWeight: 400,
          marginBottom: '44px'
        }}
      >
        {subtitle}
      </motion.p>

      {/* Buttons Container */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
          width: '100%',
          position: 'relative',
          minHeight: '70px'
        }}
      >
        {/* Main YES Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          animate={isExploding ? { scale: [1, 1.3, 1] } : {}}
          onClick={handleYes}
          className="btn-primary-glow"
          style={{
            padding: '16px 44px',
            fontSize: '16px',
            zIndex: 10
          }}
        >
          Yes 💕
        </motion.button>

        {/* Playful NO Button that jumps away */}
        <motion.button
          animate={{ x: noPosition.x, y: noPosition.y }}
          transition={{ type: 'spring', stiffness: 450, damping: 20 }}
          onMouseEnter={moveNoButton}
          onClick={moveNoButton}
          onTouchStart={moveNoButton}
          className="btn-secondary"
          style={{
            padding: '12px 28px',
            fontSize: '14px',
            cursor: 'pointer',
            userSelect: 'none',
            zIndex: 5
          }}
        >
          No 🙃
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProposalPage;

