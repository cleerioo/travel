import { useState } from 'react';
import DayCard from './DayCard';
import TravelTips from './TravelTips';
import GettingThere from './GettingThere';
import WeatherInfo from './WeatherInfo';
import NearbyPlaces from './NearbyPlaces';
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
    <section className="itinerary-section" id="itinerary-content">
      <div className="container">
        <button className="back-link no-print" onClick={onNewTrip}>
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

        {/* Weather Info */}
        {itinerary.weather && (
          <div style={{ marginTop: '32px' }}>
            <WeatherInfo data={itinerary.weather} />
          </div>
        )}

        {/* Getting There */}
        {itinerary.gettingThere && (
          <GettingThere data={itinerary.gettingThere} />
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

        {/* Nearby Places */}
        {itinerary.nearbyPlaces && itinerary.nearbyPlaces.length > 0 && (
          <NearbyPlaces places={itinerary.nearbyPlaces} />
        )}

        {/* Travel Tips & Emergency Info */}
        <div style={{ display: 'grid', gap: '32px', gridTemplateColumns: '1fr', marginTop: '48px' }}>
          {itinerary.travelTips && (
            <TravelTips tips={itinerary.travelTips} />
          )}

          {itinerary.emergencyInfo && (
            <div style={{ padding: '24px', background: 'rgba(244, 63, 94, 0.05)', border: '1px solid rgba(244, 63, 94, 0.2)', borderRadius: 'var(--radius-lg)' }}>
              <h3 style={{ color: '#f43f5e', fontSize: '1.2rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>🚨</span> Emergency Contacts
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                {itinerary.emergencyInfo.police && (
                  <div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Police</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{itinerary.emergencyInfo.police}</div>
                  </div>
                )}
                {itinerary.emergencyInfo.ambulance && (
                  <div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Ambulance/Medical</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{itinerary.emergencyInfo.ambulance}</div>
                  </div>
                )}
                {itinerary.emergencyInfo.touristHelpline && (
                  <div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Tourist Helpline</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{itinerary.emergencyInfo.touristHelpline}</div>
                  </div>
                )}
                {itinerary.emergencyInfo.nearestHospital && (
                  <div style={{ gridColumn: '1 / -1' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Nearest Major Hospital</div>
                    <div style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>{itinerary.emergencyInfo.nearestHospital}</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Rating Section */}
        <div className="no-print" style={{ marginTop: '48px', padding: '32px', background: 'var(--gradient-card)', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '1px solid var(--border-subtle)' }}>
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
        <div className="actions-bar no-print">
          <button className="btn-action primary" onClick={onNewTrip}>
            ✨ Plan New Trip
          </button>
          <button
            className="btn-action"
            onClick={() => {
              window.print();
            }}
          >
            🖨️ Print / Save PDF
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
            💾 Export JSON
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
