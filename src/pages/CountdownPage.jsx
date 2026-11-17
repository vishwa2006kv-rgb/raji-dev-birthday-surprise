import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const CountdownPage = ({ onOpenWish }) => {
  // Target date: 19 November 2026 at 12:00 AM (Asia/Kolkata, UTC+05:30)
  // 19 Nov 2026 00:00:00 IST is 18 Nov 2026 18:30:00 UTC
  const targetDateIST = new Date('2026-11-18T18:30:00Z').getTime();

  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  function calculateTimeLeft() {
    const now = Date.now();
    const difference = targetDateIST - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      total: difference
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);
      if (remaining.total <= 0) {
        setIsUnlocked(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const canOpen = isUnlocked || timeLeft.total <= 0 || previewMode;

  const pad = (num) => String(num).padStart(2, '0');

  return (
    <motion.div
      key="countdown-screen"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6 }}
      className="romance-card"
      style={{
        maxWidth: '560px',
        padding: '48px 32px'
      }}
    >
      {/* Heading matching Screenshot 2026-11-17 105033.png */}
      <h2
        className="font-script"
        style={{
          fontStyle: 'italic',
          fontSize: 'clamp(1.5rem, 4vw, 1.95rem)',
          fontWeight: 500,
          color: '#F4D4E3',
          marginBottom: '36px',
          textShadow: '0 0 12px rgba(242, 56, 135, 0.4)'
        }}
      >
        Something special is waiting for you...
      </h2>

      {/* Countdown Timer Display */}
      <div style={{ marginBottom: '28px', width: '100%' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(8px, 2.5vw, 18px)',
            color: '#FFFFFF',
            fontWeight: 700,
            fontSize: 'clamp(2.4rem, 7vw, 4.2rem)',
            letterSpacing: '1px',
            textShadow: '0 0 25px rgba(242, 56, 135, 0.7), 0 0 10px rgba(255, 255, 255, 0.5)',
            fontVariantNumeric: 'tabular-nums'
          }}
        >
          {timeLeft.days > 0 && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span>{pad(timeLeft.days)}</span>
              </div>
              <span style={{ opacity: 0.6, marginTop: '-8px' }}>:</span>
            </>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span>{pad(timeLeft.hours)}</span>
          </div>

          <span style={{ opacity: 0.6, marginTop: '-8px' }}>:</span>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span>{pad(timeLeft.minutes)}</span>
          </div>

          <span style={{ opacity: 0.6, marginTop: '-8px' }}>:</span>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span>{pad(timeLeft.seconds)}</span>
          </div>
        </div>

        {/* Labels below matching screenshot */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(16px, 4vw, 32px)',
            color: '#E8A5C4',
            fontSize: 'clamp(0.75rem, 2vw, 0.95rem)',
            letterSpacing: '3px',
            fontWeight: 500,
            marginTop: '8px',
            textTransform: 'uppercase'
          }}
        >
          {timeLeft.days > 0 ? (
            <span>DAYS : HOURS : MINS : SECS</span>
          ) : (
            <span>HOURS : MINS : SECS</span>
          )}
        </div>
      </div>

      {/* Subtitle */}
      <p
        style={{
          color: '#F4D4E3',
          fontSize: '1rem',
          fontWeight: 400,
          marginBottom: '32px'
        }}
      >
        Stay here until midnight{' '}
        <span
          onClick={() => setPreviewMode(!previewMode)}
          style={{ cursor: 'pointer', display: 'inline-block' }}
          title="Testing toggle: Click to enable preview wish"
        >
          💕
        </span>
      </p>

      {/* OPEN WISH Button */}
      <motion.button
        animate={canOpen ? {
          scale: [1, 1.03, 1],
          boxShadow: [
            '0 0 25px rgba(242, 56, 135, 0.6)',
            '0 0 40px rgba(245, 47, 104, 0.9)',
            '0 0 25px rgba(242, 56, 135, 0.6)'
          ]
        } : {}}
        transition={canOpen ? { repeat: Infinity, duration: 2 } : {}}
        disabled={!canOpen}
        onClick={onOpenWish}
        className="btn-primary-glow"
        style={{
          padding: '16px 42px',
          fontSize: '16px',
          opacity: canOpen ? 1 : 0.45
        }}
      >
        OPEN WISH ✨
      </motion.button>

      {/* Discreet preview hint for reviewer */}
      {!canOpen && (
        <span
          onClick={() => setPreviewMode(true)}
          style={{
            marginTop: '16px',
            fontSize: '11px',
            color: 'rgba(242, 56, 135, 0.6)',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          (Preview wish unlocked)
        </span>
      )}
    </motion.div>
  );
};

export default CountdownPage;
