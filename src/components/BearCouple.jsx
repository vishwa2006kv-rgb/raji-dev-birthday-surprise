import React from 'react';
import { motion } from 'framer-motion';

const BearCouple = () => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, type: 'spring' }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '18px 0',
        position: 'relative'
      }}
    >
      <motion.svg
        width="110"
        height="95"
        viewBox="0 0 160 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
        style={{ filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))' }}
      >
        {/* Left White Bear Body */}
        <circle cx="55" cy="78" r="38" fill="#FFFFFF" stroke="#331522" strokeWidth="3" />
        {/* Left Bear Ears */}
        <circle cx="28" cy="46" r="14" fill="#FFFFFF" stroke="#331522" strokeWidth="3" />
        <circle cx="28" cy="46" r="7" fill="#FFB8D2" />
        <circle cx="76" cy="46" r="14" fill="#FFFFFF" stroke="#331522" strokeWidth="3" />
        <circle cx="76" cy="46" r="7" fill="#FFB8D2" />

        {/* Right Brown Bear Body */}
        <circle cx="105" cy="78" r="38" fill="#C49A6C" stroke="#331522" strokeWidth="3" />
        {/* Right Bear Ears */}
        <circle cx="84" cy="46" r="14" fill="#C49A6C" stroke="#331522" strokeWidth="3" />
        <circle cx="84" cy="46" r="7" fill="#8F6235" />
        <circle cx="132" cy="46" r="14" fill="#C49A6C" stroke="#331522" strokeWidth="3" />
        <circle cx="132" cy="46" r="7" fill="#8F6235" />

        {/* Re-render White Bear face for overlapping layering */}
        <circle cx="55" cy="78" r="38" fill="#FFFFFF" stroke="#331522" strokeWidth="3" />
        <circle cx="28" cy="46" r="14" fill="#FFFFFF" stroke="#331522" strokeWidth="3" />
        <circle cx="28" cy="46" r="7" fill="#FFB8D2" />

        {/* White Bear Eyes and Nose */}
        <circle cx="45" cy="72" r="3.5" fill="#331522" />
        <circle cx="65" cy="72" r="3.5" fill="#331522" />
        <ellipse cx="55" cy="78" rx="4" ry="3" fill="#331522" />
        {/* White Bear Blush */}
        <ellipse cx="38" cy="80" rx="5" ry="3" fill="#FFA6C9" opacity="0.8" />
        <ellipse cx="72" cy="80" rx="5" ry="3" fill="#FFA6C9" opacity="0.8" />

        {/* Right Brown Bear Face Features */}
        <circle cx="95" cy="72" r="3.5" fill="#331522" />
        <circle cx="115" cy="72" r="3.5" fill="#331522" />
        <ellipse cx="105" cy="78" rx="4" ry="3" fill="#331522" />
        {/* Brown Bear Blush */}
        <ellipse cx="88" cy="80" rx="5" ry="3" fill="#F48FB1" opacity="0.8" />
        <ellipse cx="122" cy="80" rx="5" ry="3" fill="#F48FB1" opacity="0.8" />

        {/* Shared Flower Bouquet Held in Front */}
        <g transform="translate(80, 102)">
          {/* Flower bunch petals */}
          <circle cx="-12" cy="-6" r="8" fill="#FF2E93" />
          <circle cx="12" cy="-6" r="8" fill="#FF2E93" />
          <circle cx="0" cy="-14" r="9" fill="#FF5277" />
          <circle cx="0" cy="-2" r="10" fill="#FF1775" />
          <circle cx="0" cy="-4" r="5" fill="#FFD1E3" />
          
          {/* Bear Paws */}
          <ellipse cx="-16" cy="4" rx="6" ry="5" fill="#FFFFFF" stroke="#331522" strokeWidth="2" />
          <ellipse cx="16" cy="4" rx="6" ry="5" fill="#C49A6C" stroke="#331522" strokeWidth="2" />
        </g>
      </motion.svg>
    </motion.div>
  );
};

export default BearCouple;

