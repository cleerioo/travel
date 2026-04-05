import { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        <a href="/" className="logo">
          <div className="logo-icon">✈️</div>
          <div className="logo-text">
            Travel<span>AI</span>
          </div>
        </a>
        <nav className="header-nav">
          <a href="/#features">Features</a>
          <a href="/#how-it-works">How It Works</a>
          <a href="/planner" className="header-cta">Plan a Trip</a>
        </nav>
      </div>
    </header>
  );
}
