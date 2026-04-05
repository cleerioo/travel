import { useState } from 'react';

const TIP_SECTIONS = [
  { key: 'packing', icon: '🧳', title: 'Packing List' },
  { key: 'customs', icon: '🤝', title: 'Local Customs & Etiquette' },
  { key: 'budget', icon: '💰', title: 'Budget Tips' },
  { key: 'safety', icon: '🛡️', title: 'Safety Recommendations' },
  { key: 'transportation', icon: '🚇', title: 'Getting Around' },
];

export default function TravelTips({ tips }) {
  const [openSections, setOpenSections] = useState({ packing: true });

  const toggle = (key) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="tips-section">
      <div className="section-header">
        <div className="section-badge">💡 Tips & Advice</div>
        <h2 className="section-title">Travel Tips</h2>
      </div>

      {/* Best Time to Visit */}
      {tips.bestTimeToVisit && (
        <div className="cost-summary" style={{ marginBottom: '24px' }}>
          <h3 className="cost-summary-title">🌤️ Best Time to Visit</h3>
          <p style={{ color: '#94a3b8', lineHeight: '1.7' }}>{tips.bestTimeToVisit}</p>
        </div>
      )}

      <div className="tips-grid">
        {TIP_SECTIONS.map(section => {
          const items = tips[section.key];
          if (!items || items.length === 0) return null;

          return (
            <div className="tip-card" key={section.key}>
              <div className="tip-header" onClick={() => toggle(section.key)}>
                <div className="tip-header-left">
                  <span className="tip-icon">{section.icon}</span>
                  <span className="tip-title">{section.title}</span>
                </div>
                <span className={`tip-toggle ${openSections[section.key] ? 'expanded' : ''}`}>▼</span>
              </div>
              {openSections[section.key] && (
                <div className="tip-content">
                  <ul className="tip-list">
                    {items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
