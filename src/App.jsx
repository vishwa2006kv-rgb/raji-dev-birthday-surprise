import React, { useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import FloatingHearts from './components/FloatingHearts';
import MusicPlayer from './components/MusicPlayer';
import PasswordPage from './pages/PasswordPage';
import FlightPage from './pages/FlightPage';
import CountdownPage from './pages/CountdownPage';
import BirthdayPage from './pages/BirthdayPage';
import NotesPage from './pages/NotesPage';
import ProposalPage from './pages/ProposalPage';
import CongratulationsPage from './pages/CongratulationsPage';
import MemoriesPage from './pages/MemoriesPage';
import LettersPage from './pages/LettersPage';
import FinalPage from './pages/FinalPage';

function App() {
  const [currentPage, setCurrentPage] = useState('password');
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.75);
  const audioRef = useRef(null);

  // Requirement: Start playing audio when visitor clicks the first Unlock button
  const startBackgroundMusic = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.volume = volume;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.log('Autoplay handled, waiting for interaction:', err);
      });
    }
  };

  const goToPage = (pageName) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(pageName);
  };

  const handleUnlock = () => {
    startBackgroundMusic();
    goToPage('flight');
  };

  const handleLoveLoop = () => {
    // Return smoothly to password screen without restarting or pausing music
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage('password');
  };

  return (
    <div className="app-container">
      {/* Ambient Floating Hearts & Petals */}
      <FloatingHearts />

      {/* Persistent Background Music Player with Control & Volume */}
      <MusicPlayer
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        volume={volume}
        setVolume={setVolume}
      />

      {/* Smooth Page Transitions */}
      <AnimatePresence mode="wait">
        {currentPage === 'password' && (
          <PasswordPage
            key="page-password"
            onUnlock={handleUnlock}
          />
        )}

        {currentPage === 'flight' && (
          <FlightPage
            key="page-flight"
            onNext={() => goToPage('countdown')}
          />
        )}

        {currentPage === 'countdown' && (
          <CountdownPage
            key="page-countdown"
            onOpenWish={() => goToPage('birthday')}
          />
        )}

        {currentPage === 'birthday' && (
          <BirthdayPage
            key="page-birthday"
            onNext={() => goToPage('notes')}
          />
        )}

        {currentPage === 'notes' && (
          <NotesPage
            key="page-notes"
            onNext={() => goToPage('proposal')}
          />
        )}

        {currentPage === 'proposal' && (
          <ProposalPage
            key="page-proposal"
            onYes={() => goToPage('congrats')}
          />
        )}

        {currentPage === 'congrats' && (
          <CongratulationsPage
            key="page-congrats"
            onNext={() => goToPage('memories')}
          />
        )}

        {currentPage === 'memories' && (
          <MemoriesPage
            key="page-memories"
            onNext={() => goToPage('letters')}
          />
        )}

        {currentPage === 'letters' && (
          <LettersPage
            key="page-letters"
            onPrev={() => goToPage('memories')}
            onFinish={() => goToPage('final')}
          />
        )}

        {currentPage === 'final' && (
          <FinalPage
            key="page-final"
            onLoveLoop={handleLoveLoop}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
