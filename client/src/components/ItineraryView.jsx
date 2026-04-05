import { useState } from 'react';
import DayCard from './DayCard';
import TravelTips from './TravelTips';
import { submitRating } from '../utils/api';

const CATEGORY_ICONS = {
  culture: '🏛️',
  food: '🍽️',
  adventure: '🏔️',
  nature: '🌿',
  shopping: '🛍️',
  nightlife: '🎉',
  relaxation: '🧘',
  transport: '🚌',
};

export default function ItineraryView({ data, image, mode, onNewTrip }) {
  const { itinerary } = data;
  const [ratingHover, setRatingHover] = useState(0);
  const [hasRated, setHasRated] = useState(false);

  return (
    <section className="itinerary-section">
      <div className="container">
        <button className="back-link" onClick={onNewTrip}>
          ← Plan Another Trip
        </button>

        {/* Hero Image */}
        <div className="itinerary-hero">
          <img
            className="itinerary-hero-image"
            src={image?.url || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80'}
            alt={itinerary.destination}
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80';
            }}
          />
          <div className="itinerary-hero-overlay">
            <h1 className="itinerary-destination">{itinerary.destination}</h1>
            <p className="itinerary-summary">{itinerary.summary}</p>
            <div className="itinerary-meta">
              <div className="itinerary-meta-item">
                📅 {itinerary.dailyItinerary?.length || 0} Days
              </div>
              <div className="itinerary-meta-item">
                📍 {itinerary.dailyItinerary?.reduce((acc, day) => acc + (day.activities?.length || 0), 0) || 0} Activities
              </div>
              {mode === 'demo' && (
                <div className="demo-badge">🟡 Demo Mode</div>
              )}
            </div>
          </div>
        </div>

        {/* Highlights */}
        {itinerary.highlights && itinerary.highlights.length > 0 && (
          <div className="highlights-strip">
            {itinerary.highlights.map((highlight, i) => (
              <div className="highlight-pill" key={i}>
                ⭐ {highlight}
              </div>
            ))}
          </div>
        )}

        {/* Cost Summary */}
        {itinerary.estimatedTotalCost && (
          <div className="cost-summary">
            <h3 className="cost-summary-title">💰 Estimated Trip Cost</h3>
            <div className="cost-grid">
              {Object.entries(itinerary.estimatedTotalCost).map(([key, value]) => (
                <div className={`cost-item ${key === 'total' ? 'total' : ''}`} key={key}>
                  <div className="cost-item-label">
                    {key === 'total' ? '💎 Total Estimated' : key.charAt(0).toUpperCase() + key.slice(1)}
                  </div>
                  <div className="cost-item-value">{value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Daily Timeline */}
        <div className="section-header" style={{ marginTop: '48px' }}>
          <div className="section-badge">📋 Day by Day</div>
          <h2 className="section-title">Your Itinerary</h2>
        </div>

        <div className="timeline">
          {itinerary.dailyItinerary?.map((day, i) => (
            <DayCard
              key={i}
              day={day}
              defaultOpen={i === 0}
              categoryIcons={CATEGORY_ICONS}
            />
          ))}
        </div>

        {/* Travel Tips */}
        {itinerary.travelTips && (
          <TravelTips tips={itinerary.travelTips} />
        )}

        {/* Rating Section */}
        <div style={{ marginTop: '48px', padding: '32px', background: 'var(--gradient-card)', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '1px solid var(--border-subtle)' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', marginBottom: '16px' }}>
            {hasRated ? 'Thank you for your feedback! 💖' : 'How would you rate this itinerary?'}
          </h3>
          {!hasRated && (
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', fontSize: '2rem', cursor: 'pointer' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={async () => {
                    setRatingHover(star);
                    setHasRated(true);
                    try {
                      await submitRating(star);
                    } catch (e) {
                      console.error(e);
                    }
                  }}
                  onMouseEnter={() => setRatingHover(star)}
                  onMouseLeave={() => setRatingHover(0)}
                  style={{
                    color: star <= ratingHover ? '#f59e0b' : 'var(--text-muted)',
                    transition: 'var(--transition-fast)'
                  }}
                >
                  ★
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="actions-bar">
          <button className="btn-action primary" onClick={onNewTrip}>
            ✨ Plan New Trip
          </button>
          <button
            className="btn-action"
            onClick={() => {
              const json = JSON.stringify(itinerary, null, 2);
              const blob = new Blob([json], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `${itinerary.destination?.replace(/[^a-zA-Z0-9]/g, '_') || 'trip'}_itinerary.json`;
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            💾 Save Itinerary
          </button>
          <button
            className="btn-action"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `Trip to ${itinerary.destination}`,
                  text: itinerary.summary,
                });
              } else {
                navigator.clipboard.writeText(
                  `Check out my trip to ${itinerary.destination}!\n\n${itinerary.summary}`
                );
                alert('Trip details copied to clipboard!');
              }
            }}
          >
            📤 Share Trip
          </button>
        </div>
      </div>
    </section>
  );
}
