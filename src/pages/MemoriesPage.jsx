import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { momentsData } from '../data/moments';

const MemoriesPage = ({ onNext }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  const openLightbox = (index) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const nextPhoto = (e) => {
    e.stopPropagation();
    setSelectedPhotoIndex((prev) => (prev + 1) % momentsData.length);
  };

  const prevPhoto = (e) => {
    e.stopPropagation();
    setSelectedPhotoIndex((prev) => (prev - 1 + momentsData.length) % momentsData.length);
  };

  return (
    <motion.div
      key="memories-screen"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6 }}
      className="romance-card"
      style={{
        maxWidth: '620px',
        padding: '36px 20px'
      }}
    >
      {/* Sub-header matching Screenshot 2026-11-17 111749.png */}
      <span
        style={{
          color: '#F23887',
          fontSize: '0.85rem',
          letterSpacing: '3px',
          fontWeight: 600,
          textTransform: 'uppercase',
          marginBottom: '6px'
        }}
      >
        PRECIOUS KEEPSAKES
      </span>

      {/* Main Heading */}
      <h2
        className="font-script text-glow"
        style={{
          fontSize: 'clamp(2.3rem, 5.5vw, 3.1rem)',
          fontWeight: 700,
          color: '#FFFFFF',
          marginBottom: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px'
        }}
      >
        <span>Our Moments</span>
        <span style={{ fontSize: '0.85em' }}>📸 💗</span>
      </h2>

      {/* Subtitle */}
      <p
        style={{
          color: '#FFB8D2',
          fontSize: '0.92rem',
          marginBottom: '26px'
        }}
      >
        Tap any Polaroid to view full picture ✨
      </p>

      {/* 2-Column Responsive Polaroid Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'clamp(12px, 3vw, 22px)',
          width: '100%',
          marginBottom: '32px'
        }}
      >
        {momentsData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.12, duration: 0.5 }}
            whileHover={{ scale: 1.04 }}
            onClick={() => openLightbox(index)}
            className="polaroid-item"
            style={{
              transform: `rotate(${item.rotation}deg)`
            }}
          >
            <div className="polaroid-img-wrapper">
              <img
                src={item.image || item.fallbackUrl}
                alt={item.caption}
                loading="eager"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = item.fallbackUrl;
                }}
              />
            </div>
            <div className="polaroid-caption">
              {item.caption}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Button: READ MY LETTERS 💌 */}
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
        READ MY LETTERS 💌
      </motion.button>

      {/* Lightbox Modal for Full-Screen View */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(15, 2, 10, 0.94)',
              backdropFilter: 'blur(12px)',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            {/* Close Button */}
            <button
              className="lightbox-close-btn"
              onClick={closeLightbox}
              aria-label="Close photo"
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(242, 56, 135, 0.5)',
                border: '1.5px solid rgba(242, 56, 135, 0.7)',
                color: '#FFFFFF',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 1020,
                boxShadow: '0 0 15px rgba(0,0,0,0.5)'
              }}
            >
              <X size={24} />
            </button>

            {/* Left Nav Arrow */}
            <button
              onClick={prevPhoto}
              style={{
                position: 'absolute',
                left: '20px',
                background: 'rgba(242, 56, 135, 0.25)',
                border: '1px solid rgba(242, 56, 135, 0.4)',
                color: '#FFFFFF',
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 1010
              }}
            >
              <ChevronLeft size={28} />
            </button>

            {/* Right Nav Arrow */}
            <button
              onClick={nextPhoto}
              style={{
                position: 'absolute',
                right: '20px',
                background: 'rgba(242, 56, 135, 0.25)',
                border: '1px solid rgba(242, 56, 135, 0.4)',
                color: '#FFFFFF',
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 1010
              }}
            >
              <ChevronRight size={28} />
            </button>

            {/* Polarized Image Presentation */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#FFFFFF',
                padding: '16px 16px 24px 16px',
                borderRadius: '8px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 0 35px rgba(242, 56, 135, 0.4)',
                maxWidth: '92vw',
                maxHeight: '82vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <img
                src={momentsData[selectedPhotoIndex].image || momentsData[selectedPhotoIndex].fallbackUrl}
                alt={momentsData[selectedPhotoIndex].caption}
                style={{
                  maxWidth: '100%',
                  maxHeight: '62vh',
                  objectFit: 'contain',
                  borderRadius: '4px',
                  display: 'block'
                }}
              />
              <div
                className="font-script"
                style={{
                  color: '#2B1810',
                  fontSize: 'clamp(1.5rem, 4vw, 2.1rem)',
                  fontWeight: 600,
                  marginTop: '12px'
                }}
              >
                {momentsData[selectedPhotoIndex].caption}
              </div>
              <div
                style={{
                  fontSize: '0.85rem',
                  color: '#705461',
                  fontFamily: 'var(--font-sans)',
                  marginTop: '2px'
                }}
              >
                {momentsData[selectedPhotoIndex].date}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MemoriesPage;
