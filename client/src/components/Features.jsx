export default function Features() {
  const features = [
    {
      icon: '🤖',
      iconClass: 'orange',
      title: 'AI-Powered Itineraries',
      desc: 'Advanced AI generates personalized day-by-day travel plans with specific activities, timings, and costs.',
    },
    {
      icon: '🎯',
      iconClass: 'cyan',
      title: 'Interest-Based Planning',
      desc: 'Tell us what you love—culture, food, adventure, nature—and we\'ll craft the perfect trip around your passions.',
    },
    {
      icon: '💰',
      iconClass: 'emerald',
      title: 'Budget Optimization',
      desc: 'Whether you\'re backpacking or going luxury, get cost estimates and budget-smart recommendations.',
    },
    {
      icon: '📍',
      iconClass: 'purple',
      title: 'Local Insights',
      desc: 'From hidden gems to must-see landmarks, our AI recommends places that match your travel style.',
    },
    {
      icon: '📋',
      iconClass: 'rose',
      title: 'Travel Tips & Packing',
      desc: 'Get curated packing lists, local customs, safety tips, and transportation advice for every destination.',
    },
    {
      icon: '⚡',
      iconClass: 'amber',
      title: 'Instant Generation',
      desc: 'Get a complete travel plan in under 30 seconds. No more hours of manual research and planning.',
    },
  ];

  return (
    <section className="features" id="features">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">✨ Features</div>
          <h2 className="section-title">Everything You Need to Plan</h2>
          <p className="section-subtitle">
            From inspiration to itinerary, our AI handles it all so you can focus on enjoying the journey.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, i) => (
            <div className="feature-card" key={i}>
              <div className={`feature-icon ${feature.iconClass}`}>
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
