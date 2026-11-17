import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { notesData } from '../data/notes';

const NotesPage = ({ onNext }) => {
  // All 5 notes can be unlocked, and user can tap emojis to highlight or toggle
  const [unlockedNotes, setUnlockedNotes] = useState([1, 2, 3, 4, 5]);
  const [activeNoteId, setActiveNoteId] = useState(null);

  const toggleNote = (id) => {
    setActiveNoteId(activeNoteId === id ? null : id);
  };

  return (
    <motion.div
      key="notes-screen"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6 }}
      className="romance-card"
      style={{
        maxWidth: '560px',
        padding: '36px 24px'
      }}
    >
      {/* Heading matching Screenshot 2026-11-17 110905.png */}
      <h2
        className="font-script text-glow"
        style={{
          fontSize: 'clamp(2.4rem, 5.5vw, 3.2rem)',
          fontWeight: 700,
          color: '#FFFFFF',
          marginBottom: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px'
        }}
      >
        <span>Little Notes</span>
        <span style={{ fontSize: '0.9em' }}>💌</span>
      </h2>

      {/* Counter */}
      <p
        style={{
          color: '#E8A5C4',
          fontSize: '0.95rem',
          fontWeight: 400,
          marginBottom: '16px'
        }}
      >
        5 / 5 notes unlocked
      </p>

      {/* Row of selectable romantic emojis */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '14px'
        }}
      >
        {notesData.map((note) => (
          <motion.button
            key={note.id}
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleNote(note.id)}
            style={{
              background: activeNoteId === note.id ? 'rgba(242, 56, 135, 0.4)' : 'transparent',
              border: activeNoteId === note.id ? '1.5px solid #F23887' : '1px solid transparent',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              cursor: 'pointer',
              boxShadow: activeNoteId === note.id ? '0 0 15px rgba(242, 56, 135, 0.6)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            {note.emoji}
          </motion.button>
        ))}
      </div>

      {/* Subtext */}
      <p
        className="font-script"
        style={{
          color: '#FFB8D2',
          fontSize: '1.15rem',
          fontStyle: 'italic',
          marginBottom: '20px'
        }}
      >
        All sweet notes unfolded! 🌸
      </p>

      {/* Scrollable list of notes */}
      <div
        style={{
          width: '100%',
          maxHeight: '320px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          paddingRight: '6px',
          marginBottom: '26px'
        }}
      >
        {notesData.map((note, index) => {
          const isSelected = activeNoteId === note.id;
          return (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              onClick={() => toggleNote(note.id)}
              style={{
                backgroundColor: isSelected ? 'rgba(48, 9, 31, 0.85)' : 'rgba(27, 6, 20, 0.75)',
                border: isSelected ? '1.5px solid #F23887' : '1px solid rgba(242, 56, 135, 0.28)',
                borderRadius: '16px',
                padding: '16px 20px',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                cursor: 'pointer',
                boxShadow: isSelected
                  ? '0 0 20px rgba(242, 56, 135, 0.35)'
                  : '0 4px 15px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.25s ease'
              }}
            >
              <span style={{ fontSize: '20px', lineHeight: 1.4, flexShrink: 0 }}>
                {note.emoji}
              </span>
              <p
                style={{
                  color: '#FFF0F6',
                  fontSize: '0.96rem',
                  lineHeight: 1.6,
                  fontWeight: 400,
                  margin: 0
                }}
              >
                {note.text}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Button: NEXT 💍 */}
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
        NEXT 💍
      </motion.button>
    </motion.div>
  );
};

export default NotesPage;

