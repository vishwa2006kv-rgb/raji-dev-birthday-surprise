import confetti from 'canvas-confetti';

// Romantic Heart Explosion
export const triggerHeartExplosion = () => {
  const count = 60;
  const defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  // Pink, red, white, gold heart particles
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#F23887', '#F52F68', '#FFFFFF', '#FFB8D2'],
    shapes: ['circle']
  });

  fire(0.2, {
    spread: 60,
    colors: ['#FF2E93', '#FF6B9D', '#FFE4EC', '#F23887']
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.9,
    colors: ['#F23887', '#F52F68', '#FF94BA', '#FFFFFF']
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    colors: ['#FF2E93', '#FFB8D2', '#FFFFFF'],
    shapes: ['circle']
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ['#F23887', '#FFD1E3']
  });
};

// Continuous romantic celebratory confetti
export const startCelebrationConfetti = (durationMs = 5000) => {
  const animationEnd = Date.now() + durationMs;
  const colors = ['#F23887', '#F52F68', '#FF94BA', '#FFF0F6', '#FFB8D2', '#FFE4EC'];

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 25;
    
    // Left burst
    confetti({
      particleCount,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.65 },
      colors
    });
    
    // Right burst
    confetti({
      particleCount,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.65 },
      colors
    });
  }, 350);

  return () => clearInterval(interval);
};

