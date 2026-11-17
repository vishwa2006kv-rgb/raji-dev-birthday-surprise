import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { lettersData } from '../data/letters';

const LettersPage = ({ onPrev, onFinish }) => {
  const [activeTab, setActiveTab] = useState(1);

  const activeLetter = lettersData.find((l) => l.id === activeTab) || lettersData[0];

  const handlePrev = () => {
    if (activeTab > 1) {
      setActiveTab(activeTab - 1);
    } else {
      onPrev();
    }
  };

  return (
    <motion.div
      key="letters-screen"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6 }}
      className="romance-card"
      style={{
        maxWidth: '580px',
        padding: '34px 22px'
      }}
    >
      {/* 3 Tabs Header matching Screenshot 2026-11-17 124028.png */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '22px'
        }}
      >
        {lettersData.map((l) => {
          const isActive = activeTab === l.id;
          return (
            <motion.button
              key={l.id}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveTab(l.id)}
              style={{
                background: isActive
                  ? 'linear-gradient(135deg, #F23887 0%, #F52F68 100%)'
                  : 'rgba(38, 9, 28, 0.85)',
                color: isActive ? '#FFFFFF' : '#E8A5C4',
                border: isActive
                  ? '1px solid #FF94BA'
                  : '1px solid rgba(242, 56, 135, 0.35)',
                borderRadius: '9999px',
                padding: '8px 22px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: isActive ? '0 0 18px rgba(242, 56, 135, 0.6)' : 'none',
                transition: 'all 0.25s ease'
              }}
            >
              {l.title}
            </motion.button>
          );
        })}
      </div>

      {/* Cream-Coloured Paper Card */}
      <div
        className="letter-paper"
        style={{
          width: '100%',
          height: '350px',
          overflowY: 'auto',
          padding: '30px 24px',
          textAlign: 'left',
          marginBottom: '26px'
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLetter.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            {activeLetter.paragraphs.map((p, index) => (
              <p
                key={index}
                style={{
                  fontSize: 'clamp(0.96rem, 2.5vw, 1.05rem)',
                  lineHeight: 1.8,
                  fontWeight: 500,
                  marginBottom: '18px',
                  color: '#28131B'
                }}
              >
                {p}
              </p>
            ))}

            {activeLetter.signoff && (
              <div
                style={{
                  marginTop: '24px',
                  paddingTop: '14px',
                  borderTop: '1px dashed rgba(160, 100, 120, 0.3)',
                  fontWeight: 600,
                  fontSize: '1.05rem',
                  lineHeight: 1.6,
                  color: '#4A1528',
                  whiteSpace: 'pre-line'
                }}
              >
                {activeLetter.signoff}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Buttons: PREV and FINISH ✨ matching Screenshot 2026-11-17 124028.png */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.35fr',
          gap: '14px',
          width: '100%'
        }}
      >
        <button
          onClick={handlePrev}
          className="btn-secondary"
          style={{
            padding: '14px 20px',
            fontSize: '14px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}
        >
          PREV
        </button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onFinish}
          className="btn-primary-glow"
          style={{
            padding: '14px 24px',
            fontSize: '15px'
          }}
        >
          FINISH ✨
        </motion.button>
      </div>
    </motion.div>
  );
};

export default LettersPage;
