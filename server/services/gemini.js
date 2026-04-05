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

function getCurrencyInfo(destination) {
  const dest = destination.toLowerCase();
  if (dest.includes('india') || dest.includes('delhi') || dest.includes('mumbai') || dest.includes('jaipur')) {
    return { symbol: '₹', mult: 85 };
  } else if (dest.includes('japan') || dest.includes('tokyo') || dest.includes('kyoto') || dest.includes('osaka')) {
    return { symbol: '¥', mult: 150 };
  } else if (dest.includes('china') || dest.includes('beijing') || dest.includes('shanghai')) {
    return { symbol: '¥', mult: 7 };
  } else if (dest.includes('uk') || dest.includes('london') || dest.includes('england')) {
    return { symbol: '£', mult: 0.8 };
  } else if (dest.includes('europe') || dest.includes('paris') || dest.includes('france') || dest.includes('italy') || dest.includes('spain') || dest.includes('germany') || dest.includes('rome') || dest.includes('barcelona')) {
    return { symbol: '€', mult: 0.9 };
  } else if (dest.includes('dubai') || dest.includes('uae')) {
    return { symbol: 'AED ', mult: 3.67 };
  } else if (dest.includes('thailand') || dest.includes('bangkok')) {
    return { symbol: '฿', mult: 36 };
  } else if (dest.includes('indonesia') || dest.includes('bali')) {
    return { symbol: 'Rp', mult: 16000 };
  }
  return { symbol: '$', mult: 1 };
}

function getDemoItinerary(tripDetails) {
  const { destination, startDate, endDate, budget, interests } = tripDetails;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1);

  const dest = destination || 'Tokyo, Japan';
  
  const curInfo = getCurrencyInfo(dest);
  const sym = curInfo.symbol;
  const m = curInfo.mult;

  function fmt(val) {
    const total = Math.round(val * m);
    return `${sym}${total.toLocaleString()}`;
  }

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
              estimatedCost: budget === 'luxury' ? fmt(35) : budget === 'mid-range' ? fmt(15) : fmt(8),
              location: 'City Center'
            },
            {
              time: '09:30',
              name: `${dest} Historic Quarter Tour`,
              description: `Explore the historic heart of ${dest}. Wander through centuries-old streets, admire stunning architecture, and learn about the rich history that shaped this incredible destination.`,
              category: 'culture',
              duration: '2.5 hours',
              estimatedCost: budget === 'luxury' ? fmt(45) : budget === 'mid-range' ? fmt(20) : fmt(10),
              location: 'Old Town District'
            },
            {
              time: '12:30',
              name: 'Authentic Local Lunch',
              description: `Enjoy a sit-down lunch at a highly-rated local restaurant. Sample traditional dishes prepared with fresh, locally-sourced ingredients. Don't miss the house specialties!`,
              category: 'food',
              duration: '1.5 hours',
              estimatedCost: budget === 'luxury' ? fmt(55) : budget === 'mid-range' ? fmt(25) : fmt(12),
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
              estimatedCost: budget === 'luxury' ? fmt(30) : budget === 'mid-range' ? fmt(15) : fmt(5),
              location: i % 2 === 0 ? 'Cultural Quarter' : 'Central Park Area'
            },
            {
              time: '17:00',
              name: 'Sunset Viewpoint & Evening Stroll',
              description: `Head to the best sunset viewpoint in ${dest} for breathtaking panoramic views. As the city lights begin to twinkle, take an evening stroll through the vibrant streets.`,
              category: 'nature',
              duration: '1.5 hours',
              estimatedCost: fmt(0),
              location: 'Observation Point'
            },
            {
              time: '19:00',
              name: 'Dinner & Evening Entertainment',
              description: `Cap off the day with an incredible dinner at a renowned restaurant, followed by local evening entertainment. Experience the nightlife that makes ${dest} truly special.`,
              category: 'food',
              duration: '2.5 hours',
              estimatedCost: budget === 'luxury' ? fmt(85) : budget === 'mid-range' ? fmt(40) : fmt(18),
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
        accommodation: budget === 'luxury' ? `${fmt(200)} - ${fmt(500)}/night` : budget === 'mid-range' ? `${fmt(80)} - ${fmt(180)}/night` : `${fmt(30)} - ${fmt(70)}/night`,
        food: budget === 'luxury' ? `${fmt(100)} - ${fmt(200)}/day` : budget === 'mid-range' ? `${fmt(40)} - ${fmt(80)}/day` : `${fmt(15)} - ${fmt(35)}/day`,
        activities: budget === 'luxury' ? `${fmt(80)} - ${fmt(150)}/day` : budget === 'mid-range' ? `${fmt(30)} - ${fmt(60)}/day` : `${fmt(10)} - ${fmt(25)}/day`,
        transport: budget === 'luxury' ? `${fmt(50)} - ${fmt(100)}/day` : budget === 'mid-range' ? `${fmt(15)} - ${fmt(30)}/day` : `${fmt(5)} - ${fmt(15)}/day`,
        total: budget === 'luxury'
          ? `${fmt(days * 430)} - ${fmt(days * 950)}`
          : budget === 'mid-range'
            ? `${fmt(days * 165)} - ${fmt(days * 350)}`
            : `${fmt(days * 60)} - ${fmt(days * 145)}`
      }
    }
  };

  return demoDestinations.default;
}

module.exports = { generateItinerary };
