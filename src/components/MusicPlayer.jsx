import React, { useState, useEffect } from 'react';
import { Volume2, Volume1, VolumeX, Music, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MusicPlayer = ({ audioRef, isPlaying, setIsPlaying, volume, setVolume }) => {
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume, audioRef]);

  const togglePlayPause = (e) => {
    e.stopPropagation();
    setHasInteracted(true);
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Playback error:', err);
      });
    }
  };

  const handleVolumeChange = (e) => {
    e.stopPropagation();
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
      if (newVol > 0 && !isPlaying) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

  const getVolumeIcon = () => {
    if (!isPlaying || volume === 0) return <VolumeX size={18} />;
    if (volume < 0.5) return <Volume1 size={18} />;
    return <Volume2 size={18} />;
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '16px',
        right: '16px',
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}
      onMouseEnter={() => setShowVolumeSlider(true)}
      onMouseLeave={() => setShowVolumeSlider(false)}
    >
      {/* Root audio element that persists across the whole app */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="/assets/audio/birthday-music.mp3"
      >
        <source src="/assets/audio/birthday-music.mp3" type="audio/mpeg" />
        <source src="/assets/audio/birthday-music.mp4" type="audio/mp4" />
        <source src="/assets/audio/birthday-music.m4a" type="audio/mp4" />
      </audio>

      {/* Expandable Volume Slider */}
      <AnimatePresence>
        {showVolumeSlider && (
          <motion.div
            initial={{ opacity: 0, x: 15, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 15, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            style={{
              background: 'rgba(38, 9, 28, 0.92)',
              border: '1px solid rgba(242, 56, 135, 0.35)',
              borderRadius: '9999px',
              padding: '6px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 8px 25px rgba(0,0,0,0.6)',
              backdropFilter: 'blur(12px)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <span style={{ fontSize: '11px', color: '#FFB8D2', fontWeight: 500, minWidth: '32px' }}>
              {Math.round(volume * 100)}%
            </span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              aria-label="Volume slider"
              style={{
                width: '75px',
                height: '4px',
                accentColor: '#F23887',
                cursor: 'pointer'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Music Control Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={togglePlayPause}
        aria-label={isPlaying ? 'Pause Birthday Music' : 'Play Birthday Music'}
        title={isPlaying ? 'Pause birthday music' : 'Play birthday music'}
        style={{
          background: isPlaying
            ? 'linear-gradient(135deg, #F23887 0%, #F52F68 100%)'
            : 'rgba(48, 9, 31, 0.82)',
          border: '1.5px solid rgba(242, 56, 135, 0.5)',
          borderRadius: '9999px',
          padding: '0 14px',
          height: '42px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          color: '#FFFFFF',
          boxShadow: isPlaying
            ? '0 0 20px rgba(242, 56, 135, 0.65), 0 4px 12px rgba(245, 47, 104, 0.4)'
            : '0 4px 15px rgba(0, 0, 0, 0.5)',
          transition: 'background 0.3s ease, box-shadow 0.3s ease',
          backdropFilter: 'blur(12px)',
          outline: 'none'
        }}
      >
        {/* Animated equalizer waves or music icon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '14px' }}>
          {isPlaying ? (
            <>
              <motion.span
                animate={{ height: ['4px', '14px', '6px', '12px', '4px'] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                style={{ width: '2.5px', background: '#FFFFFF', borderRadius: '2px', display: 'inline-block' }}
              />
              <motion.span
                animate={{ height: ['12px', '4px', '14px', '8px', '12px'] }}
                transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut' }}
                style={{ width: '2.5px', background: '#FFFFFF', borderRadius: '2px', display: 'inline-block' }}
              />
              <motion.span
                animate={{ height: ['6px', '14px', '5px', '14px', '6px'] }}
                transition={{ repeat: Infinity, duration: 1.3, ease: 'easeInOut' }}
                style={{ width: '2.5px', background: '#FFFFFF', borderRadius: '2px', display: 'inline-block' }}
              />
            </>
          ) : (
            <Music size={16} style={{ color: '#FFB8D2' }} />
          )}
        </div>

        {/* Play/Pause state icon */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {isPlaying ? <Pause size={14} fill="#FFFFFF" /> : <Play size={14} fill="#FFB8D2" color="#FFB8D2" />}
        </div>
      </motion.button>
    </div>
  );
};

export default MusicPlayer;
