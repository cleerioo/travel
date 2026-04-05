import { useState, useEffect } from 'react';

const MESSAGES = [
  '🌍 Researching your destination...',
  '✈️ Finding the best activities...',
  '🏨 Curating local recommendations...',
  '🍽️ Discovering hidden culinary gems...',
  '📸 Selecting must-see attractions...',
  '🗺️ Optimizing your daily routes...',
  '💡 Adding insider travel tips...',
  '✨ Finalizing your perfect itinerary...',
];

export default function LoadingAnimation() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % MESSAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="loading-globe">
          <div className="loading-globe-ring"></div>
          <div className="loading-globe-ring"></div>
          <div className="loading-globe-inner"></div>
        </div>
        <h3 className="loading-title">Crafting Your Journey</h3>
        <p className="loading-message">{MESSAGES[messageIndex]}</p>
        <div className="loading-progress">
          <div className="loading-progress-bar"></div>
        </div>
      </div>
    </div>
  );
}
