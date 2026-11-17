import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Sparkles, Heart } from 'lucide-react';

const PasswordPage = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [shake, setShake] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === '1911') {
      setError(false);
      setIsUnlocking(true);
      setTimeout(() => {
        onUnlock();
      }, 1000);
    } else {
      setError(true);
      setShake((prev) => prev + 1);
    }
  };

  return (
    <motion.div
      key="password-screen"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6 }}
      className="romance-card"
    >
      {/* Animated Heart Lock */}
      <motion.div
        animate={isUnlocking ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] } : { y: [0, -6, 0] }}
        transition={isUnlocking ? { duration: 0.8 } : { repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        style={{
          width: '84px',
          height: '84px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(242, 56, 135, 0.25) 0%, rgba(245, 47, 104, 0.1) 100%)',
          border: '1.5px solid rgba(242, 56, 135, 0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 25px rgba(242, 56, 135, 0.3)',
          marginBottom: '20px',
          position: 'relative'
        }}
      >
        <AnimatePresence mode="wait">
          {isUnlocking ? (
            <motion.div
              key="unlocked"
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              style={{ color: '#FF94BA' }}
            >
              <Unlock size={38} />
            </motion.div>
          ) : (
            <motion.div
              key="locked"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{ color: '#F23887' }}
            >
              <Lock size={38} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Little decorative hearts around lock */}
        <span style={{ position: 'absolute', top: '-4px', right: '-4px', fontSize: '18px' }}>💖</span>
      </motion.div>

      {/* Heading */}
      <h1
        className="font-script text-glow"
        style={{
          fontSize: 'clamp(2rem, 5vw, 2.75rem)',
          fontWeight: 700,
          color: '#ffffff',
          marginBottom: '8px',
          lineHeight: 1.2
        }}
      >
        A Little Surprise Awaits You ❤️
      </h1>

      {/* Subtitle */}
      <p
        style={{
          color: '#E2B2C9',
          fontSize: '0.98rem',
          fontWeight: 400,
          marginBottom: '28px'
        }}
      >
        Only someone special can unlock this.
      </p>

      {/* Password Form with shake animation on error */}
      <motion.form
        onSubmit={handleSubmit}
        animate={shake ? { x: [-12, 12, -8, 8, -4, 4, 0] } : {}}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: '340px', display: 'flex', flexDirection: 'column', gap: '16px' }}
      >
        <div style={{ position: 'relative', width: '100%' }}>
          <input
            type="password"
            maxLength={8}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError(false);
            }}
            placeholder="Enter passcode..."
            autoFocus
            style={{
              width: '100%',
              padding: '14px 20px',
              fontSize: '18px',
              textAlign: 'center',
              letterSpacing: '5px',
              backgroundColor: 'rgba(25, 5, 19, 0.75)',
              border: error ? '1.5px solid #FF3B70' : '1.5px solid rgba(242, 56, 135, 0.4)',
              borderRadius: '9999px',
              color: '#FFF0F6',
              outline: 'none',
              boxShadow: error 
                ? '0 0 15px rgba(255, 59, 112, 0.4)' 
                : '0 0 20px rgba(242, 56, 135, 0.15)',
              transition: 'all 0.25s ease'
            }}
          />
        </div>

        {/* Cute error message */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              style={{
                color: '#FF6B95',
                fontSize: '0.9rem',
                margin: '0',
                fontWeight: 500
              }}
            >
              Oops! Try again, my love 🥺
            </motion.p>
          )}
        </AnimatePresence>

        {/* Unlock Button */}
        <button
          type="submit"
          disabled={!password.trim() || isUnlocking}
          className="btn-primary-glow"
          style={{ width: '100%', marginTop: '6px' }}
        >
          {isUnlocking ? (
            <>Unlocking Romance... 💖</>
          ) : (
            <>UNLOCK ❤️</>
          )}
        </button>
      </motion.form>
    </motion.div>
  );
};

export default PasswordPage;

