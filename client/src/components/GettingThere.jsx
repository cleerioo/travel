export default function GettingThere({ data }) {
  if (!data || !data.options || data.options.length === 0) return null;

  return (
    <div style={{ marginTop: '32px' }}>
      <div className="section-header" style={{ marginBottom: '16px' }}>
        <div className="section-badge">🚄 Getting There</div>
        <h2 className="section-title">How to reach {data.fromCity ? `from ${data.fromCity}` : ''}</h2>
      </div>
      <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        {data.options.map((option, i) => (
          <div key={i} style={{ padding: '20px', background: 'var(--bg-glass)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', position: 'relative' }}>
            <h4 style={{ marginBottom: '8px', color: 'var(--primary-color)', fontSize: '1.1rem' }}>
              {option.mode === 'Train' ? '🚂' : option.mode === 'Flight' ? '✈️' : '🚌'} {option.mode}
            </h4>
            <div style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '8px', color: 'var(--text-primary)' }}>{option.name}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <span>⏱️ {option.duration}</span>
              <span style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>{option.cost}</span>
            </div>
            {data.recommended && data.recommended.toLowerCase().includes(option.mode.toLowerCase()) && (
              <div style={{ position: 'absolute', top: '-10px', right: '10px', background: 'var(--accent-color)', color: 'white', fontSize: '0.7rem', padding: '4px 8px', borderRadius: '12px', fontWeight: 'bold' }}>
                Recommended
              </div>
            )}
          </div>
        ))}
      </div>
      {data.recommended && (
        <p style={{ marginTop: '12px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          💡 <strong>Tip:</strong> {data.recommended}
        </p>
      )}
    </div>
  );
}
