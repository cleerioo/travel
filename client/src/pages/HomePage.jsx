import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import Features from '../components/Features';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <Features />
        
        {/* How It Works Section */}
        <section className="features" id="how-it-works" style={{ paddingTop: '40px' }}>
          <div className="container">
            <div className="section-header">
              <div className="section-badge">🚀 How It Works</div>
              <h2 className="section-title">Three Steps to Your Dream Trip</h2>
              <p className="section-subtitle">
                From idea to itinerary in under a minute. No sign-ups, no hassle.
              </p>
            </div>

            <div className="features-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              <div className="feature-card" style={{ textAlign: 'center' }}>
                <div className="feature-icon orange" style={{ margin: '0 auto 20px', fontSize: '2rem', width: '64px', height: '64px' }}>
                  1️⃣
                </div>
                <h3 className="feature-title">Tell Us Your Preferences</h3>
                <p className="feature-desc">
                  Enter your destination, travel dates, budget level, and interests. The more you share, the better your plan.
                </p>
              </div>
              <div className="feature-card" style={{ textAlign: 'center' }}>
                <div className="feature-icon cyan" style={{ margin: '0 auto 20px', fontSize: '2rem', width: '64px', height: '64px' }}>
                  2️⃣
                </div>
                <h3 className="feature-title">AI Creates Your Itinerary</h3>
                <p className="feature-desc">
                  Our AI analyzes thousands of data points to craft a personalized day-by-day plan with activities, dining, and costs.
                </p>
              </div>
              <div className="feature-card" style={{ textAlign: 'center' }}>
                <div className="feature-icon emerald" style={{ margin: '0 auto 20px', fontSize: '2rem', width: '64px', height: '64px' }}>
                  3️⃣
                </div>
                <h3 className="feature-title">Explore & Enjoy</h3>
                <p className="feature-desc">
                  Save your itinerary, share it with friends, and head out to explore with confidence. Adventure awaits!
                </p>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '48px' }}>
              <a href="/planner" className="btn-primary" style={{ fontSize: '1.1rem', padding: '16px 40px' }}>
                ✨ Start Planning Now
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
