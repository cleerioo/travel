import { useState } from 'react';

const INTERESTS = [
  { id: 'culture', label: '🏛️ Culture & History' },
  { id: 'food', label: '🍽️ Food & Cuisine' },
  { id: 'adventure', label: '🏔️ Adventure' },
  { id: 'nature', label: '🌿 Nature' },
  { id: 'shopping', label: '🛍️ Shopping' },
  { id: 'nightlife', label: '🎉 Nightlife' },
  { id: 'relaxation', label: '🧘 Relaxation' },
  { id: 'photography', label: '📸 Photography' },
  { id: 'art', label: '🎨 Art & Museums' },
  { id: 'family', label: '👨‍👩‍👧‍👦 Family Fun' },
];

const POPULAR_DESTINATIONS = [
  'Tokyo, Japan',
  'Paris, France',
  'Bali, Indonesia',
  'Rome, Italy',
  'Barcelona, Spain',
  'Dubai, UAE',
  'New York, USA',
  'London, UK',
  'Sydney, Australia',
  'Santorini, Greece',
  'Bangkok, Thailand',
  'Istanbul, Turkey',
  'Goa, India',
  'Jaipur, India',
  'Kerala, India',
];

export default function TripForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    budget: 'mid-range',
    interests: [],
    travelStyle: 'solo',
    travelers: 1,
  });

  const [errors, setErrors] = useState({});
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = POPULAR_DESTINATIONS.filter(d =>
    d.toLowerCase().includes(formData.destination.toLowerCase()) && formData.destination.length > 0
  );

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const toggleInterest = (id) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(id)
        ? prev.interests.filter(i => i !== id)
        : [...prev.interests, id],
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.destination.trim()) newErrors.destination = 'Destination is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    if (formData.startDate && formData.endDate && formData.endDate < formData.startDate) {
      newErrors.endDate = 'End date must be after start date';
    }
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
      if (days > 14) newErrors.endDate = 'Maximum trip duration is 14 days';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  // Get tomorrow as minimum date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <section className="form-section" id="planner">
      <div className="container">
        <form className="trip-form-card" onSubmit={handleSubmit}>
          <h2 className="form-title">✨ Plan Your Dream Trip</h2>
          <p className="form-subtitle">Tell us about your ideal adventure and let AI create the perfect itinerary.</p>

          <div className="form-grid">
            {/* Destination */}
            <div className="form-group full-width" style={{ position: 'relative' }}>
              <label className="form-label">📍 Destination</label>
              <input
                id="destination-input"
                type="text"
                className="form-input"
                placeholder="Where do you want to go? (e.g., Tokyo, Japan)"
                value={formData.destination}
                onChange={(e) => {
                  handleChange('destination', e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                style={errors.destination ? { borderColor: '#f43f5e' } : {}}
              />
              {errors.destination && <span style={{ color: '#f43f5e', fontSize: '0.8rem' }}>{errors.destination}</span>}
              
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  background: '#1a2235',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  zIndex: 50,
                  overflow: 'hidden',
                  marginTop: '4px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                }}>
                  {filteredSuggestions.slice(0, 5).map((dest, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '12px 18px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        borderBottom: i < Math.min(filteredSuggestions.length, 5) - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                        transition: 'background 0.15s',
                      }}
                      onMouseDown={() => {
                        handleChange('destination', dest);
                        setShowSuggestions(false);
                      }}
                      onMouseEnter={(e) => e.target.style.background = 'rgba(249,115,22,0.1)'}
                      onMouseLeave={(e) => e.target.style.background = 'transparent'}
                    >
                      📍 {dest}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Dates */}
            <div className="form-group">
              <label className="form-label">📅 Start Date</label>
              <input
                id="start-date-input"
                type="date"
                className="form-input"
                value={formData.startDate}
                min={minDate}
                onChange={(e) => handleChange('startDate', e.target.value)}
                style={errors.startDate ? { borderColor: '#f43f5e' } : {}}
              />
              {errors.startDate && <span style={{ color: '#f43f5e', fontSize: '0.8rem' }}>{errors.startDate}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">📅 End Date</label>
              <input
                id="end-date-input"
                type="date"
                className="form-input"
                value={formData.endDate}
                min={formData.startDate || minDate}
                onChange={(e) => handleChange('endDate', e.target.value)}
                style={errors.endDate ? { borderColor: '#f43f5e' } : {}}
              />
              {errors.endDate && <span style={{ color: '#f43f5e', fontSize: '0.8rem' }}>{errors.endDate}</span>}
            </div>

            {/* Budget */}
            <div className="form-group">
              <label className="form-label">💰 Budget Level</label>
              <select
                id="budget-select"
                className="form-select"
                value={formData.budget}
                onChange={(e) => handleChange('budget', e.target.value)}
              >
                <option value="budget">🎒 Budget ($50-100/day)</option>
                <option value="mid-range">🏨 Mid-Range ($100-250/day)</option>
                <option value="luxury">💎 Luxury ($250+/day)</option>
              </select>
            </div>

            {/* Travel Style */}
            <div className="form-group">
              <label className="form-label">👤 Travel Style</label>
              <select
                id="travel-style-select"
                className="form-select"
                value={formData.travelStyle}
                onChange={(e) => handleChange('travelStyle', e.target.value)}
              >
                <option value="solo">🧑 Solo Traveler</option>
                <option value="couple">💑 Couple</option>
                <option value="family">👨‍👩‍👧 Family</option>
                <option value="group">👥 Group of Friends</option>
              </select>
            </div>

            {/* Number of Travelers */}
            <div className="form-group full-width">
              <label className="form-label">👥 Number of Travelers</label>
              <input
                id="travelers-input"
                type="number"
                className="form-input"
                min="1"
                max="20"
                value={formData.travelers}
                onChange={(e) => handleChange('travelers', parseInt(e.target.value) || 1)}
              />
            </div>

            {/* Interests */}
            <div className="form-group full-width">
              <label className="form-label">❤️ Interests (Select all that apply)</label>
              <div className="interests-grid">
                {INTERESTS.map(interest => (
                  <button
                    type="button"
                    key={interest.id}
                    className={`interest-chip ${formData.interests.includes(interest.id) ? 'active' : ''}`}
                    onClick={() => toggleInterest(interest.id)}
                  >
                    {interest.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="form-submit">
              <button
                id="generate-button"
                type="submit"
                className="btn-generate"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>⏳ Generating Your Itinerary...</>
                ) : (
                  <>✨ Generate AI Itinerary</>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
