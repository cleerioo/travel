const { GoogleGenerativeAI } = require('@google/generative-ai');
const { buildItineraryPrompt } = require('../utils/prompts');

let genAI = null;

function getClient() {
  if (!process.env.GEMINI_API_KEY) return null;
  if (!genAI) {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  return genAI;
}

async function generateItinerary(tripDetails) {
  const client = getClient();

  if (!client) {
    // Return demo data
    return getDemoItinerary(tripDetails);
  }

  try {
    const model = client.getGenerativeModel({ model: 'gemini-2.5-flash-preview-04-17' });
    const prompt = buildItineraryPrompt(tripDetails);

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Clean up response - remove markdown code blocks if present
    text = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();

    const itinerary = JSON.parse(text);
    return itinerary;
  } catch (error) {
    console.error('Gemini API error:', error.message);
    // Fallback to demo data on error
    return getDemoItinerary(tripDetails);
  }
}

function getDemoItinerary(tripDetails) {
  const { destination, startDate, endDate, budget, interests } = tripDetails;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1);

  const dest = destination || 'Tokyo, Japan';

  // Generate demo data based on destination
  const demoDestinations = {
    default: {
      destination: dest,
      summary: `An unforgettable ${days}-day journey through ${dest}. This carefully curated itinerary blends iconic landmarks with hidden gems, offering authentic experiences tailored to your interests. From cultural immersions to culinary adventures, every moment is designed to create lasting memories.`,
      highlights: [
        'Explore iconic landmarks and historic sites',
        'Savor authentic local cuisine at top-rated restaurants',
        'Discover hidden neighborhoods off the tourist trail',
        'Experience vibrant nightlife and entertainment',
        'Visit world-class museums and art galleries'
      ],
      dailyItinerary: Array.from({ length: days }, (_, i) => {
        const date = new Date(start);
        date.setDate(date.getDate() + i);
        const themes = [
          'Arrival & City Orientation',
          'Cultural Deep Dive',
          'Culinary Adventure',
          'Nature & Outdoors',
          'Art & Architecture',
          'Local Markets & Shopping',
          'Day Trip & Exploration',
          'Hidden Gems & Farewell'
        ];
        return {
          day: i + 1,
          date: date.toISOString().split('T')[0],
          theme: themes[i % themes.length],
          activities: [
            {
              time: '08:00',
              name: i === 0 ? 'Hotel Check-in & Breakfast' : 'Morning Breakfast',
              description: `Start your day with a delicious breakfast at a popular local café. Try the regional specialties and fuel up for a day of exploration in ${dest}.`,
              category: 'food',
              duration: '1 hour',
              estimatedCost: budget === 'luxury' ? '$35' : budget === 'mid-range' ? '$15' : '$8',
              location: 'City Center'
            },
            {
              time: '09:30',
              name: `${dest} Historic Quarter Tour`,
              description: `Explore the historic heart of ${dest}. Wander through centuries-old streets, admire stunning architecture, and learn about the rich history that shaped this incredible destination.`,
              category: 'culture',
              duration: '2.5 hours',
              estimatedCost: budget === 'luxury' ? '$45' : budget === 'mid-range' ? '$20' : '$10',
              location: 'Old Town District'
            },
            {
              time: '12:30',
              name: 'Authentic Local Lunch',
              description: `Enjoy a sit-down lunch at a highly-rated local restaurant. Sample traditional dishes prepared with fresh, locally-sourced ingredients. Don't miss the house specialties!`,
              category: 'food',
              duration: '1.5 hours',
              estimatedCost: budget === 'luxury' ? '$55' : budget === 'mid-range' ? '$25' : '$12',
              location: 'Food District'
            },
            {
              time: '14:30',
              name: i % 2 === 0 ? 'Museum & Gallery Visit' : 'Scenic Park Walk',
              description: i % 2 === 0
                ? `Visit one of ${dest}'s premier museums featuring world-class collections. Take your time exploring the exhibits and don't miss the special seasonal displays.`
                : `Take a refreshing walk through one of ${dest}'s beautiful parks. Enjoy the lush greenery, scenic viewpoints, and maybe catch a street performance.`,
              category: i % 2 === 0 ? 'culture' : 'nature',
              duration: '2 hours',
              estimatedCost: budget === 'luxury' ? '$30' : budget === 'mid-range' ? '$15' : '$5',
              location: i % 2 === 0 ? 'Cultural Quarter' : 'Central Park Area'
            },
            {
              time: '17:00',
              name: 'Sunset Viewpoint & Evening Stroll',
              description: `Head to the best sunset viewpoint in ${dest} for breathtaking panoramic views. As the city lights begin to twinkle, take an evening stroll through the vibrant streets.`,
              category: 'nature',
              duration: '1.5 hours',
              estimatedCost: '$0',
              location: 'Observation Point'
            },
            {
              time: '19:00',
              name: 'Dinner & Evening Entertainment',
              description: `Cap off the day with an incredible dinner at a renowned restaurant, followed by local evening entertainment. Experience the nightlife that makes ${dest} truly special.`,
              category: 'food',
              duration: '2.5 hours',
              estimatedCost: budget === 'luxury' ? '$85' : budget === 'mid-range' ? '$40' : '$18',
              location: 'Entertainment District'
            }
          ]
        };
      }),
      travelTips: {
        packing: [
          'Comfortable walking shoes – you\'ll walk 10,000+ steps daily',
          'Universal power adapter for charging devices',
          'Light layers for varying weather conditions',
          'Reusable water bottle to stay hydrated',
          'Small daypack for daily essentials'
        ],
        customs: [
          'Learn basic greetings in the local language – locals appreciate the effort',
          'Research tipping customs as they vary by country',
          'Dress modestly when visiting religious or cultural sites'
        ],
        budget: [
          'Eat where locals eat for authentic and affordable meals',
          'Use public transportation instead of taxis to save significantly',
          'Book attractions online in advance for discounts and skip-the-line access'
        ],
        safety: [
          'Keep copies of important documents in a separate location',
          'Use hotel safes for valuables and extra cash',
          'Stay aware of your surroundings in crowded tourist areas'
        ],
        transportation: [
          'Purchase a multi-day transit pass for unlimited travel',
          'Walking is often the best way to explore city centers',
          'Use reputable ride-sharing apps for longer distances'
        ],
        bestTimeToVisit: 'Spring (March-May) and Autumn (September-November) typically offer the most pleasant weather with fewer crowds and better hotel rates.'
      },
      estimatedTotalCost: {
        accommodation: budget === 'luxury' ? '$200 - $500/night' : budget === 'mid-range' ? '$80 - $180/night' : '$30 - $70/night',
        food: budget === 'luxury' ? '$100 - $200/day' : budget === 'mid-range' ? '$40 - $80/day' : '$15 - $35/day',
        activities: budget === 'luxury' ? '$80 - $150/day' : budget === 'mid-range' ? '$30 - $60/day' : '$10 - $25/day',
        transport: budget === 'luxury' ? '$50 - $100/day' : budget === 'mid-range' ? '$15 - $30/day' : '$5 - $15/day',
        total: budget === 'luxury'
          ? `$${days * 430} - $${days * 950}`
          : budget === 'mid-range'
            ? `$${days * 165} - $${days * 350}`
            : `$${days * 60} - $${days * 145}`
      }
    }
  };

  return demoDestinations.default;
}

module.exports = { generateItinerary };
