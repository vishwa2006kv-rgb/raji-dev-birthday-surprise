import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Heart, MapPin, Sparkles } from 'lucide-react';

const FlightPage = ({ onNext }) => {
  const [flightProgress, setFlightProgress] = useState(0);
  const [hasLanded, setHasLanded] = useState(false);

  useEffect(() => {
    // Flight takes 4.5 seconds to travel from Pondicherry to Dubai
    const startTime = Date.now();
    const duration = 4500;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setFlightProgress(progress);

      if (progress >= 1) {
        clearInterval(interval);
        setHasLanded(true);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // Compute position along curved arc
  // Start: (40, 160), End: (360, 60), Control: (200, 20)
  const getCoordinates = (t) => {
    const p0 = { x: 40, y: 160 };
    const p1 = { x: 200, y: 30 };
    const p2 = { x: 360, y: 70 };

    // Quadratic Bezier Formula: (1-t)^2 * p0 + 2(1-t)t * p1 + t^2 * p2
    const x = Math.pow(1 - t, 2) * p0.x + 2 * (1 - t) * t * p1.x + Math.pow(t, 2) * p2.x;
    const y = Math.pow(1 - t, 2) * p0.y + 2 * (1 - t) * t * p1.y + Math.pow(t, 2) * p2.y;

    // Derivative to get tangent angle
    const dx = 2 * (1 - t) * (p1.x - p0.x) + 2 * t * (p2.x - p1.x);
    const dy = 2 * (1 - t) * (p1.y - p0.y) + 2 * t * (p2.y - p1.y);
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

    return { x, y, angle };
  };

  const currentPos = getCoordinates(flightProgress);

  return (
    <motion.div
      key="flight-screen"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6 }}
      className="romance-card"
      style={{ overflow: 'hidden' }}
    >
      {/* Little tag */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          color: '#FF94BA',
          fontSize: '0.85rem',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          marginBottom: '8px'
        }}
      >
        <Sparkles size={14} /> Two Hearts Across Oceans <Sparkles size={14} />
      </div>

      {/* Heading */}
      <h2
        className="font-script text-glow"
        style={{
          fontSize: 'clamp(1.8rem, 4.5vw, 2.4rem)',
          fontWeight: 700,
          color: '#FFFFFF',
          marginBottom: '20px'
        }}
      >
        Pondicherry ✈ Dubai
      </h2>

      {/* Flight Canvas Box */}
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          height: '220px',
          position: 'relative',
          background: 'rgba(21, 4, 16, 0.7)',
          borderRadius: '20px',
          border: '1px solid rgba(242, 56, 135, 0.25)',
          boxShadow: 'inset 0 0 25px rgba(0, 0, 0, 0.6)',
          margin: '0 auto 20px auto',
          overflow: 'hidden'
        }}
      >
        {/* Soft Background Stars / Twinkles */}
        <div style={{ position: 'absolute', top: '20px', left: '60px', color: '#ffb8d2', fontSize: '12px' }}>✨</div>
        <div style={{ position: 'absolute', top: '70px', left: '170px', color: '#ff85b3', fontSize: '10px' }}>⭐</div>
        <div style={{ position: 'absolute', top: '35px', right: '80px', color: '#ffffff', fontSize: '14px' }}>✨</div>
        <div style={{ position: 'absolute', bottom: '30px', left: '130px', color: '#ffb8d2', fontSize: '12px' }}>💖</div>
        <div style={{ position: 'absolute', top: '90px', right: '40px', color: '#ff94ba', fontSize: '10px' }}>☁️</div>
        <div style={{ position: 'absolute', bottom: '40px', left: '30px', color: '#ffffff', opacity: 0.6, fontSize: '12px' }}>☁️</div>

        {/* Flight SVG Flight Arc */}
        <svg
          viewBox="0 0 400 200"
          style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
        >
          {/* Background subtle guide path */}
          <path
            d="M 40,160 Q 200,30 360,70"
            fill="none"
            stroke="rgba(242, 56, 135, 0.2)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Glowing Animated dashed flight trajectory */}
          <path
            d="M 40,160 Q 200,30 360,70"
            fill="none"
            stroke="url(#flightGrad)"
            strokeWidth="3.5"
            strokeDasharray="6 4"
            className="flight-dash-line"
            strokeLinecap="round"
          />

          <defs>
            <linearGradient id="flightGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F23887" />
              <stop offset="50%" stopColor="#FF94BA" />
              <stop offset="100%" stopColor="#F52F68" />
            </linearGradient>
          </defs>
        </svg>

        {/* Departure City: Pondicherry */}
        <div
          style={{
            position: 'absolute',
            left: '20px',
            bottom: '18px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 3
          }}
        >
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: '#F23887',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px #F23887'
            }}
          >
            <MapPin size={16} color="#FFFFFF" />
          </div>
          <span
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#FFF0F6',
              marginTop: '4px',
              textShadow: '0 2px 4px rgba(0,0,0,0.8)'
            }}
          >
            Pondicherry 📍
          </span>
          <span style={{ fontSize: '10px', color: '#FFB8D2' }}>My Heart</span>
        </div>

        {/* Destination City: Dubai */}
        <div
          style={{
            position: 'absolute',
            right: '20px',
            top: '38px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 3
          }}
        >
          <motion.div
            animate={hasLanded ? { scale: [1, 1.25, 1], boxShadow: ['0 0 10px #F52F68', '0 0 25px #F23887', '0 0 10px #F52F68'] } : {}}
            transition={{ repeat: Infinity, duration: 1.5 }}
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: hasLanded ? '#F23887' : '#4A1132',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1.5px solid #FF94BA',
              boxShadow: '0 0 15px rgba(242, 56, 135, 0.5)'
            }}
          >
            <Heart size={16} color="#FFFFFF" fill={hasLanded ? '#FFFFFF' : 'none'} />
          </motion.div>
          <span
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#FFF0F6',
              marginTop: '4px',
              textShadow: '0 2px 4px rgba(0,0,0,0.8)'
            }}
          >
            Dubai 📍
          </span>
          <span style={{ fontSize: '10px', color: '#FFB8D2' }}>Dev's World</span>
        </div>

        {/* Animated Flying Airplane */}
        <div
          style={{
            position: 'absolute',
            left: `${(currentPos.x / 400) * 100}%`,
            top: `${(currentPos.y / 200) * 100}%`,
            transform: `translate(-50%, -50%) rotate(${currentPos.angle}deg)`,
            zIndex: 10,
            pointerEvents: 'none'
          }}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #FFFFFF 0%, #FFD1E3 100%)',
              color: '#230817',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px #FF94BA, 0 0 35px rgba(242, 56, 135, 0.8)'
            }}
          >
            <Plane size={18} fill="#230817" />
          </div>
        </div>
      </div>

      {/* Romantic Arrival Message */}
      <AnimatePresence>
        {hasLanded && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: '24px' }}
          >
            <p
              className="font-script"
              style={{
                fontSize: 'clamp(1.3rem, 3.8vw, 1.7rem)',
                color: '#FFE4EE',
                lineHeight: 1.4,
                textShadow: '0 0 15px rgba(242, 56, 135, 0.4)'
              }}
            >
              "Distance means nothing when hearts are connected. ❤️"
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next Button */}
      {hasLanded ? (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onNext}
          className="btn-primary-glow"
        >
          NEXT 💕
        </motion.button>
      ) : (
        <div style={{ height: '52px', display: 'flex', alignItems: 'center', color: '#FFB8D2', fontSize: '0.9rem' }}>
          Flying straight to your heart... ✈️💕
        </div>
      )}
    </motion.div>
  );
};

export default FlightPage;
