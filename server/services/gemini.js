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
  if (!process.env.GEMINI_API_KEY) {
    return getDemoItinerary(tripDetails);
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
  const prompt = buildItineraryPrompt(tripDetails);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Gemini API Error Response:', data);
      return getDemoItinerary(tripDetails);
    }

    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      let text = data.candidates[0].content.parts[0].text;
      // Clean up response - remove markdown code blocks if present
      text = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
      const itinerary = JSON.parse(text);
      return itinerary;
    } else {
      return getDemoItinerary(tripDetails);
    }
  } catch (error) {
    console.error('Gemini API fetch error:', error);
    return getDemoItinerary(tripDetails);
  }
}

function getCurrencyInfo(destination) {
  const dest = destination.toLowerCase();

  // Comprehensive Indian cities/states/regions
  const indianPlaces = [
    'india', 'delhi', 'mumbai', 'jaipur', 'ranchi', 'goa', 'bangalore', 'bengaluru',
    'chennai', 'kolkata', 'kerala', 'hyderabad', 'pune', 'varanasi', 'agra', 'lucknow',
    'ahmedabad', 'surat', 'kanpur', 'nagpur', 'indore', 'bhopal', 'patna', 'vadodara',
    'ludhiana', 'amritsar', 'chandigarh', 'jodhpur', 'udaipur', 'shimla', 'manali',
    'darjeeling', 'mysore', 'mysuru', 'coimbatore', 'madurai', 'kochi', 'cochin',
    'trivandrum', 'thiruvananthapuram', 'vizag', 'visakhapatnam', 'bhubaneswar',
    'guwahati', 'shillong', 'gangtok', 'srinagar', 'leh', 'ladakh', 'rishikesh',
    'haridwar', 'dehradun', 'mussoorie', 'nainital', 'jaisalmer', 'pushkar', 'mount abu',
    'ooty', 'kodaikanal', 'pondicherry', 'puducherry', 'hampi', 'alleppey', 'munnar',
    'wayanad', 'coorg', 'andaman', 'lakshadweep', 'kashmir', 'rajasthan', 'tamil nadu',
    'karnataka', 'maharashtra', 'gujarat', 'punjab', 'haryana', 'uttarakhand',
    'himachal', 'jharkhand', 'bihar', 'odisha', 'assam', 'meghalaya', 'sikkim',
    'nagaland', 'manipur', 'tripura', 'mizoram', 'arunachal', 'chhattisgarh',
    'madhya pradesh', 'uttar pradesh', 'west bengal', 'andhra pradesh', 'telangana'
  ];

  if (indianPlaces.some(place => dest.includes(place))) {
    return { symbol: '₹', mult: 85 };
  } else if (dest.includes('japan') || dest.includes('tokyo') || dest.includes('kyoto') || dest.includes('osaka') || dest.includes('hiroshima') || dest.includes('nara') || dest.includes('sapporo') || dest.includes('fukuoka')) {
    return { symbol: '¥', mult: 150 };
  } else if (dest.includes('china') || dest.includes('beijing') || dest.includes('shanghai') || dest.includes('guangzhou') || dest.includes('shenzhen') || dest.includes('chengdu') || dest.includes('hangzhou')) {
    return { symbol: '¥', mult: 7 };
  } else if (dest.includes('uk') || dest.includes('london') || dest.includes('england') || dest.includes('scotland') || dest.includes('edinburgh') || dest.includes('manchester') || dest.includes('wales') || dest.includes('britain')) {
    return { symbol: '£', mult: 0.8 };
  } else if (dest.includes('europe') || dest.includes('paris') || dest.includes('france') || dest.includes('italy') || dest.includes('spain') || dest.includes('germany') || dest.includes('rome') || dest.includes('barcelona') || dest.includes('amsterdam') || dest.includes('vienna') || dest.includes('prague') || dest.includes('berlin') || dest.includes('munich') || dest.includes('milan') || dest.includes('florence') || dest.includes('venice') || dest.includes('madrid') || dest.includes('lisbon') || dest.includes('athens') || dest.includes('greece') || dest.includes('portugal') || dest.includes('netherlands') || dest.includes('belgium') || dest.includes('brussels') || dest.includes('switzerland') || dest.includes('zurich') || dest.includes('austria') || dest.includes('ireland') || dest.includes('dublin')) {
    return { symbol: '€', mult: 0.9 };
  } else if (dest.includes('dubai') || dest.includes('uae') || dest.includes('abu dhabi') || dest.includes('sharjah')) {
    return { symbol: 'AED ', mult: 3.67 };
  } else if (dest.includes('thailand') || dest.includes('bangkok') || dest.includes('phuket') || dest.includes('chiang mai') || dest.includes('pattaya') || dest.includes('krabi')) {
    return { symbol: '฿', mult: 36 };
  } else if (dest.includes('indonesia') || dest.includes('bali') || dest.includes('jakarta') || dest.includes('yogyakarta')) {
    return { symbol: 'Rp', mult: 16000 };
  } else if (dest.includes('malaysia') || dest.includes('kuala lumpur') || dest.includes('penang') || dest.includes('langkawi')) {
    return { symbol: 'RM', mult: 4.7 };
  } else if (dest.includes('singapore')) {
    return { symbol: 'S$', mult: 1.35 };
  } else if (dest.includes('korea') || dest.includes('seoul') || dest.includes('busan') || dest.includes('jeju')) {
    return { symbol: '₩', mult: 1350 };
  } else if (dest.includes('australia') || dest.includes('sydney') || dest.includes('melbourne') || dest.includes('brisbane')) {
    return { symbol: 'A$', mult: 1.55 };
  } else if (dest.includes('canada') || dest.includes('toronto') || dest.includes('vancouver') || dest.includes('montreal')) {
    return { symbol: 'C$', mult: 1.37 };
  } else if (dest.includes('nepal') || dest.includes('kathmandu') || dest.includes('pokhara')) {
    return { symbol: 'NPR ', mult: 133 };
  } else if (dest.includes('sri lanka') || dest.includes('colombo') || dest.includes('kandy')) {
    return { symbol: 'LKR ', mult: 320 };
  } else if (dest.includes('vietnam') || dest.includes('hanoi') || dest.includes('ho chi minh') || dest.includes('saigon')) {
    return { symbol: '₫', mult: 25000 };
  } else if (dest.includes('turkey') || dest.includes('istanbul') || dest.includes('cappadocia') || dest.includes('ankara') || dest.includes('antalya')) {
    return { symbol: '₺', mult: 32 };
  } else if (dest.includes('egypt') || dest.includes('cairo') || dest.includes('luxor') || dest.includes('alexandria')) {
    return { symbol: 'EGP ', mult: 50 };
  } else if (dest.includes('usa') || dest.includes('united states') || dest.includes('new york') || dest.includes('los angeles') || dest.includes('san francisco') || dest.includes('las vegas') || dest.includes('miami') || dest.includes('chicago') || dest.includes('hawaii') || dest.includes('washington') || dest.includes('boston') || dest.includes('seattle') || dest.includes('america')) {
    return { symbol: '$', mult: 1 };
  }
  // Default to INR for Indian user base
  return { symbol: '₹', mult: 85 };
}

function getDemoItinerary(tripDetails) {
  const { destination, origin, startDate, endDate, budget, interests } = tripDetails;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1);

  const dest = destination || 'Delhi, India';
  
  const curInfo = getCurrencyInfo(dest);
  const sym = curInfo.symbol;

  // Import destination data
  const { getDestinationData, getCostTier } = require('../data/destinationData');
  const destData = getDestinationData(dest);
  const costProfile = getCostTier(dest);

  // Budget index: 0 = luxury, 1 = mid-range, 2 = budget
  const budgetIdx = budget === 'luxury' ? 0 : budget === 'mid-range' ? 1 : 2;

  function fmtCost(amount) {
    return `${sym}${Math.round(amount).toLocaleString()}`;
  }

  // Pick activities for each day from the pool
  function buildDailyActivities(activityPool, dayIndex) {
    const activitiesPerDay = 6;
    const startIdx = (dayIndex * activitiesPerDay) % activityPool.length;
    const selected = [];
    for (let j = 0; j < activitiesPerDay; j++) {
      const activity = activityPool[(startIdx + j) % activityPool.length];
      const costVal = activity.cost[budgetIdx];
      selected.push({
        time: activity.time,
        name: activity.name,
        description: activity.description,
        category: activity.category,
        duration: activity.duration,
        estimatedCost: fmtCost(costVal * curInfo.mult),
        location: activity.location
      });
    }
    return selected;
  }

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

  // Default generic activities for destinations without curated data
  const defaultActivities = [
    { time: '08:00', name: `Morning Exploration in ${dest}`, description: `Start your day early and explore the heart of ${dest}. Visit the most popular landmarks and soak in the local atmosphere.`, category: 'culture', duration: '2.5 hours', location: 'City Center', cost: [20, 10, 5] },
    { time: '10:30', name: `${dest} Heritage Walk`, description: `Take a guided heritage walk through the historic quarters of ${dest}. Discover ancient architecture, local stories, and hidden courtyards.`, category: 'culture', duration: '2 hours', location: 'Old Town', cost: [15, 8, 3] },
    { time: '13:00', name: 'Local Cuisine Experience', description: `Sample the best local dishes at a popular restaurant in ${dest}. Ask for regional specialties and seasonal dishes.`, category: 'food', duration: '1.5 hours', location: 'Food District', cost: [30, 15, 8] },
    { time: '15:00', name: `${dest} Cultural Landmark`, description: `Visit one of the most celebrated cultural landmarks in ${dest}. Learn about its history and significance.`, category: 'culture', duration: '2 hours', location: 'Cultural Quarter', cost: [15, 8, 4] },
    { time: '17:30', name: 'Sunset Viewpoint', description: `Head to the best viewpoint in ${dest} for stunning sunset views. A perfect spot to reflect on the day.`, category: 'nature', duration: '1.5 hours', location: 'Scenic Viewpoint', cost: [0, 0, 0] },
    { time: '19:30', name: 'Dinner & Local Evening', description: `End the day with dinner at a renowned local restaurant in ${dest}, followed by an evening stroll through the lively streets.`, category: 'food', duration: '2 hours', location: 'Evening Market Area', cost: [40, 20, 10] }
  ];

  const activityPool = destData ? destData.activities : defaultActivities;
  const highlights = destData ? destData.highlights : [
    `Explore the iconic landmarks of ${dest}`,
    'Savor authentic local cuisine at top-rated spots',
    `Discover hidden neighborhoods off the tourist trail in ${dest}`,
    'Experience vibrant local culture and entertainment',
    'Visit world-class heritage sites and museums'
  ];
  const tips = destData ? destData.tips : {
    packing: ['Comfortable walking shoes', 'Weather-appropriate clothing', 'Sunscreen and hat', 'Reusable water bottle', 'Small daypack'],
    customs: ['Learn basic local greetings', 'Research tipping customs', 'Dress modestly at religious sites'],
    budget: ['Eat where locals eat', 'Use public transport', 'Book attractions online for discounts'],
    safety: ['Keep copies of documents separately', 'Use hotel safes for valuables', 'Stay aware in crowded areas'],
    transportation: ['Multi-day transit pass if available', 'Walk in city centers', 'Use ride-sharing apps'],
    bestTimeToVisit: 'Research the best season for your destination to avoid extreme weather and peak crowds.'
  };

  // Destination-aware cost calculations using tier profiles
  const accCosts = costProfile.accommodation;
  const foodCosts = costProfile.food;
  const actCosts = costProfile.activities;
  const transCosts = costProfile.transport;

  const demoItinerary = {
    destination: dest,
    summary: `An unforgettable ${days}-day journey through ${dest}. This carefully curated itinerary blends iconic landmarks with hidden gems, offering authentic experiences tailored to your interests.`,
    highlights,
    dailyItinerary: Array.from({ length: days }, (_, i) => {
      const date = new Date(start);
      date.setDate(date.getDate() + i);
      return {
        day: i + 1,
        date: date.toISOString().split('T')[0],
        theme: themes[i % themes.length],
        activities: buildDailyActivities(activityPool, i)
      };
    }),
    nearbyPlaces: destData ? destData.nearbyPlaces : [],
    weather: destData ? destData.weather : null,
    emergencyInfo: {
      police: '100',
      ambulance: '108',
      touristHelpline: '1800-111-363',
      nearestHospital: 'Contact your hotel for nearest hospital'
    },
    travelTips: tips,
    estimatedTotalCost: {
      accommodation: `${fmtCost(accCosts[budgetIdx])} - ${fmtCost(accCosts[budgetIdx] * 2.5)}/night`,
      food: `${fmtCost(foodCosts[budgetIdx])} - ${fmtCost(foodCosts[budgetIdx] * 2)}/day`,
      activities: `${fmtCost(actCosts[budgetIdx])} - ${fmtCost(actCosts[budgetIdx] * 2)}/day`,
      transport: `${fmtCost(transCosts[budgetIdx])} - ${fmtCost(transCosts[budgetIdx] * 2)}/day`,
      total: `${fmtCost(days * (accCosts[budgetIdx] + foodCosts[budgetIdx] + actCosts[budgetIdx] + transCosts[budgetIdx]))} - ${fmtCost(days * (accCosts[budgetIdx] * 2.5 + foodCosts[budgetIdx] * 2 + actCosts[budgetIdx] * 2 + transCosts[budgetIdx] * 2))}`
    }
  };

  // Add getting there info if origin is provided
  if (origin) {
    demoItinerary.gettingThere = {
      fromCity: origin,
      options: [
        { mode: 'Train', name: 'Check IRCTC for trains', duration: 'Varies', cost: `${sym}500 - ${sym}2,500` },
        { mode: 'Flight', name: 'IndiGo / SpiceJet / Air India', duration: '1-3 hours', cost: `${sym}3,000 - ${sym}8,000` },
        { mode: 'Bus', name: 'State transport / RedBus', duration: 'Varies', cost: `${sym}400 - ${sym}1,500` }
      ],
      recommended: 'Check Google Maps for best option based on distance'
    };
  }

  return demoItinerary;
}
}

const { CHATBOT_SYSTEM_PROMPT } = require('../utils/prompts');

async function chatWithAI(history, newMessage) {
  if (!process.env.GEMINI_API_KEY) {
    return { text: "Hello! I am TravelBot. Since the app is currently running in Demo Mode, my live AI brain is paused. Please add a Gemini API key to chat with me live!" };
  }

  // Gemini API strict rule: The conversation history MUST start with a 'user' message.
  let validHistory = history.map(msg => ({
    role: msg.role === 'ai' ? 'model' : 'user',
    parts: [{ text: msg.text }]
  }));

  while (validHistory.length > 0 && validHistory[0].role !== 'user') {
    validHistory.shift();
  }

  // Add the new message
  validHistory.push({
    role: 'user',
    parts: [{ text: newMessage }]
  });

  // Inject the system prompt into the very first message silently to completely avoid REST API field incompatibilities
  if (validHistory.length > 0 && !validHistory[0].parts[0].text.includes("TravelBot, an energetic")) {
    validHistory[0].parts[0].text = CHATBOT_SYSTEM_PROMPT + "\n\n" + validHistory[0].parts[0].text;
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: validHistory
      })
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 404) {
        // Fetch available models to debug the key
        try {
           const modelsRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
           const modelsData = await modelsRes.json();
           const names = modelsData.models ? modelsData.models.map(m => m.name).join(', ') : 'No models found at all';
           return { text: `API Error (404). But I checked your API key, and these are the only models you have access to: ${names}` };
        } catch(e) {
           return { text: `API Error: ${data.error?.message || response.statusText}. Could not list models.` };
        }
      }
      return { text: `API Error: ${data.error?.message || response.statusText}` };
    }

    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      return { text: data.candidates[0].content.parts[0].text };
    } else {
      return { text: "Sorry, I received an empty response from the AI." };
    }
  } catch (error) {
    console.error('Chat error:', error);
    return { text: "Error connecting to AI Model: " + error.message };
  }
}

module.exports = { generateItinerary, chatWithAI };
