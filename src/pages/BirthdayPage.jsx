import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

const BirthdayPage = ({ onNext }) => {
  return (
    <motion.div
      key="birthday-screen"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6 }}
      className="romance-card"
      style={{
        maxWidth: '560px',
        padding: '38px 28px'
      }}
    >
      {/* Heading matching Screenshot 2026-11-17 105123.png */}
      <div style={{ marginBottom: '24px' }}>
        <h1
          className="font-script text-glow"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 3.4rem)',
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1.15,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '8px'
          }}
        >
          <span>Happy Birthday</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            Chellame
            <motion.span
              animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{ display: 'inline-block', fontSize: '0.8em' }}
            >
              💖
            </motion.span>
          </span>
        </h1>
      </div>

      {/* Inner Dark Card with Message */}
      <div
        style={{
          width: '100%',
          backgroundColor: 'rgba(21, 4, 16, 0.75)',
          border: '1px solid rgba(242, 56, 135, 0.22)',
          borderRadius: '20px',
          padding: '28px 22px',
          marginBottom: '28px',
          textAlign: 'center',
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)'
        }}
      >
        <p
          style={{
            color: '#FCE7F1',
            fontSize: 'clamp(0.95rem, 2.6vw, 1.08rem)',
            lineHeight: 1.8,
            fontWeight: 400,
            marginBottom: '16px'
          }}
        >
          Today is not just another day,
        </p>

        <p
          style={{
            color: '#FCE7F1',
            fontSize: 'clamp(0.95rem, 2.6vw, 1.08rem)',
            lineHeight: 1.8,
            fontWeight: 400,
            marginBottom: '16px'
          }}
        >
          It's the day my favorite person was born.
        </p>

        <p
          style={{
            color: '#FCE7F1',
            fontSize: 'clamp(0.95rem, 2.6vw, 1.08rem)',
            lineHeight: 1.8,
            fontWeight: 400,
            marginBottom: '22px'
          }}
        >
          Thank you for filling my life with beautiful memories,<br />
          Endless smiles and unforgettable moments.
        </p>

        <p
          className="font-script"
          style={{
            color: '#FF85B3',
            fontSize: 'clamp(1.5rem, 4vw, 1.95rem)',
            fontWeight: 600,
            lineHeight: 1.3,
            textShadow: '0 0 10px rgba(242, 56, 135, 0.5)'
          }}
        >
          Happy birthday, my Chellame 💕
        </p>
      </div>

      {/* Full width Glowing Button: 💌 LITTLE NOTES */}
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
        <span style={{ fontSize: '18px' }}>💌</span> LITTLE NOTES
      </motion.button>
    </motion.div>
  );
};

export default BirthdayPage;
