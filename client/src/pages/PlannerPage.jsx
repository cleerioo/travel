import { useState } from 'react';
import Header from '../components/Header';
import TripForm from '../components/TripForm';
import LoadingAnimation from '../components/LoadingAnimation';
import ItineraryView from '../components/ItineraryView';
import Footer from '../components/Footer';
import { generateItinerary } from '../utils/api';

export default function PlannerPage() {
  const [state, setState] = useState('form'); // form | loading | result | error
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (formData) => {
    setState('loading');
    setError('');

    try {
      const data = await generateItinerary(formData);
      setResult(data);
      setState('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err.message || 'Failed to generate itinerary. Please try again.');
      setState('form');
    }
  };

  const handleNewTrip = () => {
    setState('form');
    setResult(null);
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Header />
      <div className="planner-page">
        {state === 'loading' && <LoadingAnimation />}

        {error && (
          <div className="container" style={{ paddingTop: '32px' }}>
            <div className="error-banner">
              ⚠️ {error}
            </div>
          </div>
        )}

        {state === 'form' && (
          <TripForm onSubmit={handleSubmit} isLoading={false} />
        )}

        {state === 'result' && result && (
          <ItineraryView
            data={result}
            image={result.image}
            mode={result.mode}
            onNewTrip={handleNewTrip}
          />
        )}
      </div>
      <Footer />
    </>
  );
}
