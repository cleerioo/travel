const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export async function generateItinerary(tripDetails) {
  const response = await fetch(`${API_BASE}/generate-itinerary`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tripDetails),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Network error' }));
    throw new Error(error.error || 'Failed to generate itinerary');
  }

  return response.json();
}

export async function getDestinationImage(query) {
  const response = await fetch(`${API_BASE}/destination-image/${encodeURIComponent(query)}`);
  if (!response.ok) return { url: '', source: 'none' };
  return response.json();
}

export async function fetchStats() {
  const response = await fetch(`${API_BASE}/stats`);
  if (!response.ok) throw new Error('Failed to fetch stats');
  return response.json();
}

export async function submitRating(score) {
  const response = await fetch(`${API_BASE}/rate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ score }),
  });
  if (!response.ok) throw new Error('Failed to submit rating');
  return response.json();
}
