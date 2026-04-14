import { useState } from 'react';

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

export default function DayCard({ day, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="day-card">
      <div className="day-marker">{day.day}</div>
      <div className="day-content">
        <div className="day-header" onClick={() => setIsOpen(!isOpen)}>
          <div className="day-header-left">
            <div className="day-title">
              Day {day.day}: {day.theme}
            </div>
            <div className="day-date">
              {formatDate(day.date)} · {day.activities?.length || 0} Activities
            </div>
          </div>
          <span className={`day-toggle ${isOpen ? 'expanded' : ''}`}>▼</span>
        </div>

        {isOpen && (
          <div className="day-activities">
            {day.activities?.map((activity, j) => (
              <div className="activity-card" key={j}>
                <div className="activity-time">
                  <div className="activity-time-value">{activity.time}</div>
                  <div className="activity-time-duration">{activity.duration}</div>
                </div>
                <div className={`activity-icon ${activity.category}`}>
                  {CATEGORY_ICONS[activity.category] || '📌'}
                </div>
                <div className="activity-details">
                  <div className="activity-name" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    {activity.name}
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.location ? `${activity.name}, ${activity.location}` : activity.name)}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="no-print"
                      style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', textDecoration: 'none', background: 'rgba(249, 115, 22, 0.1)', padding: '4px 10px', borderRadius: '12px', border: '1px solid rgba(249, 115, 22, 0.2)', transition: 'var(--transition-fast)' }}
                    >
                      📍 View Map
                    </a>
                  </div>
                  <div className="activity-desc">{activity.description}</div>
                  <div className="activity-meta">
                    <span className="activity-tag">
                      📍 {activity.location}
                    </span>
                    <span className="activity-tag activity-cost">
                      {activity.estimatedCost}
                    </span>
                    <span className="activity-tag">
                      ⏱️ {activity.duration}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
