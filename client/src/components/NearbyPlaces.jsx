export default function NearbyPlaces({ places }) {
  if (!places || places.length === 0) return null;

  return (
    <div style={{ marginTop: '48px', marginBottom: '48px' }}>
      <div className="section-header" style={{ marginBottom: '24px' }}>
        <div className="section-badge">🗺️ Explore More</div>
        <h2 className="section-title">Nearby Places to Visit</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {places.map((place, i) => (
          <div key={i} style={{ padding: '20px', background: 'var(--bg-glass)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)', flex: 1 }}>{place.name}</h4>
              <span style={{ fontSize: '0.8rem', background: 'rgba(249, 115, 22, 0.1)', color: 'var(--accent-color)', padding: '4px 8px', borderRadius: '12px', fontWeight: 'bold', whiteSpace: 'nowrap', marginLeft: '12px' }}>{place.distance}</span>
            </div>
            <p style={{ margin: '0 0 16px 0', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {place.description}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <span style={{ marginRight: '6px' }}>⏱️</span> Suggested: {place.suggestedTime}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
