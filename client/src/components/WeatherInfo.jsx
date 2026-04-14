export default function WeatherInfo({ data }) {
  if (!data) return null;

  return (
    <div style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(56, 189, 248, 0.2)', marginBottom: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <span style={{ fontSize: '2rem' }}>🌤️</span>
        <h3 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.2rem' }}>Expected Weather</h3>
      </div>
      {(data.expected || data.temperature) && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', marginBottom: '16px' }}>
          {data.temperature && (
            <div style={{ flex: '1', minWidth: '150px' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Temperature</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{data.temperature}</div>
            </div>
          )}
          {data.expected && (
            <div style={{ flex: '2', minWidth: '200px' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Forecast</div>
              <div style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>{data.expected}</div>
            </div>
          )}
        </div>
      )}
      {data.tip && (
        <div style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          💡 <strong>Style Tip:</strong> {data.tip}
        </div>
      )}
    </div>
  );
}
