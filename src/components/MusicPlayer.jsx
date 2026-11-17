import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    // Attempt playback on first user gesture anywhere
    const handleFirstInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setShowPrompt(false);
        }).catch(() => {
          // User policy prevented autoplay, wait for explicit click
        });
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [isPlaying]);

  const toggleMusic = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setShowPrompt(false);
      }).catch(err => console.log('Audio play error:', err));
    }
  };

  return (
    <div style={{ position: 'fixed', top: '16px', right: '16px', zIndex: 100 }}>
      <audio
        ref={audioRef}
        src="/assets/audio/romantic-bgm.mp4"
        loop
        preload="auto"
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <AnimatePresence>
          {showPrompt && !isPlaying && (
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              style={{
                fontSize: '12px',
                color: '#FF94BA',
                background: 'rgba(38, 9, 28, 0.85)',
                padding: '4px 10px',
                borderRadius: '12px',
                border: '1px solid rgba(242, 56, 135, 0.3)',
                backdropFilter: 'blur(8px)',
                pointerEvents: 'none',
                display: 'none' // keep clean or show on desktop
              }}
              className="music-prompt-tag"
            >
              Play Our Song 💕
            </motion.span>
          )}
        </AnimatePresence>

        <button
          onClick={toggleMusic}
          aria-label={isPlaying ? 'Mute Music' : 'Play Romantic Music'}
          style={{
            background: isPlaying 
              ? 'linear-gradient(135deg, #F23887 0%, #F52F68 100%)' 
              : 'rgba(48, 9, 31, 0.75)',
            border: '1px solid rgba(242, 56, 135, 0.45)',
            borderRadius: '9999px',
            width: '42px',
            height: '42px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#ffffff',
            boxShadow: isPlaying 
              ? '0 0 18px rgba(242, 56, 135, 0.6)' 
              : '0 4px 12px rgba(0, 0, 0, 0.4)',
            transition: 'all 0.25s ease',
            backdropFilter: 'blur(10px)',
            outline: 'none'
          }}
          title={isPlaying ? 'Pause romantic music' : 'Play romantic music'}
        >
          {isPlaying ? (
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Volume2 size={20} />
            </motion.div>
          ) : (
            <VolumeX size={18} style={{ opacity: 0.75 }} />
          )}
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
