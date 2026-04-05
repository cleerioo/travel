export default function HeroSection() {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg-effects">
        <div className="hero-orb hero-orb-1"></div>
        <div className="hero-orb hero-orb-2"></div>
        <div className="hero-orb hero-orb-3"></div>
        <div className="hero-grid"></div>
      </div>

      <div className="floating-icons">
        <span className="floating-icon">🌍</span>
        <span className="floating-icon">🏔️</span>
        <span className="floating-icon">🏖️</span>
        <span className="floating-icon">🗼</span>
        <span className="floating-icon">🎒</span>
        <span className="floating-icon">🌸</span>
      </div>

      <div className="hero-content">
        <div className="hero-badge">
          <span className="hero-badge-dot"></span>
          Powered by Google Gemini AI
        </div>
        
        <h1 className="hero-title">
          Your AI-Powered<br />
          <span className="highlight">Travel Companion</span>
        </h1>
        
        <p className="hero-subtitle">
          Plan unforgettable trips in seconds. Our AI creates personalized day-by-day itineraries 
          tailored to your interests, budget, and travel style.
        </p>

        <div className="hero-cta-group">
          <a href="/planner" className="btn-primary">
            ✨ Start Planning
          </a>
          <a href="#features" className="btn-secondary">
            Learn More →
          </a>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-value">500+</div>
            <div className="hero-stat-label">Destinations</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">10K+</div>
            <div className="hero-stat-label">Trips Planned</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">4.9★</div>
            <div className="hero-stat-label">User Rating</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">&lt;30s</div>
            <div className="hero-stat-label">Generation Time</div>
          </div>
        </div>
      </div>
    </section>
  );
}
