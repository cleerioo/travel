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

  // Destination-specific activity pools with real places
  const destLower = dest.toLowerCase();

  const destinationActivities = {
    varanasi: {
      highlights: [
        'Witness the mesmerizing Ganga Aarti at Dashashwamedh Ghat',
        'Seek blessings at the sacred Kashi Vishwanath Temple',
        'Take a sunrise boat ride on the holy River Ganges',
        'Explore the ancient ruins at Sarnath where Buddha gave his first sermon',
        'Stroll through the narrow lanes of the old city and silk bazaars'
      ],
      activities: [
        { time: '05:00', name: 'Sunrise Boat Ride on the Ganges', description: 'Experience the magical sunrise over the ghats of Varanasi from a traditional wooden boat. Watch the ancient rituals unfold along the riverbank as devotees perform their morning prayers. This is the most iconic experience in Varanasi.', category: 'culture', duration: '1.5 hours', location: 'Dashashwamedh Ghat', cost: [20, 10, 5] },
        { time: '07:00', name: 'Breakfast at Kachori Gali', description: 'Head to the famous Kachori Gali near Dashashwamedh Ghat for a traditional Banarasi breakfast. Try the crispy kachori sabzi, jalebi, and a cup of special Banarasi chai from Ram Bhandar.', category: 'food', duration: '1 hour', location: 'Kachori Gali, Vishwanath Lane', cost: [15, 8, 3] },
        { time: '08:30', name: 'Kashi Vishwanath Temple Darshan', description: 'Visit the most sacred Hindu temple in Varanasi — the Kashi Vishwanath Temple, one of the twelve Jyotirlingas. The newly built Kashi Vishwanath Corridor connects the temple directly to the ghats. Arrive early to avoid long queues.', category: 'culture', duration: '2 hours', location: 'Kashi Vishwanath Temple, Lahori Tola', cost: [0, 0, 0] },
        { time: '11:00', name: 'Walk Through the Old City Lanes', description: 'Explore the narrow, winding alleys (galis) of old Varanasi. Discover hidden temples, ancient havelis, and the famous Banarasi silk weaving workshops. Visit the Alamgir Mosque and Manikarnika Ghat along the way.', category: 'culture', duration: '2 hours', location: 'Old City, Varanasi', cost: [10, 5, 0] },
        { time: '13:00', name: 'Lunch at Baati Chokha', description: 'Enjoy an authentic Bihari-Banarasi thali at the famous Baati Chokha restaurant. Try the signature litti chokha, baigan bharta, and sattu paratha in a rustic village-themed setting.', category: 'food', duration: '1.5 hours', location: 'Baati Chokha, Lanka', cost: [30, 15, 8] },
        { time: '15:00', name: 'Sarnath – Where Buddha Preached', description: 'Visit Sarnath (10 km from Varanasi), where Lord Buddha delivered his first sermon after enlightenment. Explore the Dhamek Stupa, Ashoka Pillar, Sarnath Museum, and the Mulagandha Kuti Vihar temple with beautiful Japanese paintings.', category: 'culture', duration: '3 hours', location: 'Sarnath, Varanasi', cost: [25, 12, 5] },
        { time: '18:30', name: 'Ganga Aarti at Dashashwamedh Ghat', description: 'Witness the world-famous Ganga Aarti ceremony — a spectacular ritual of fire, chanting, and devotion performed by priests on the banks of the Ganges every evening. Arrive early to get a front-row seat at the ghat steps.', category: 'culture', duration: '1 hour', location: 'Dashashwamedh Ghat', cost: [0, 0, 0] },
        { time: '20:00', name: 'Dinner at Blue Lassi & Street Food Walk', description: 'End the night with a famous Blue Lassi (thick flavored yogurt drink) from the legendary Blue Lassi shop, then explore the street food around Godowlia crossing — try tamatar chaat, paan, and malaiyo (winter special).', category: 'food', duration: '1.5 hours', location: 'Blue Lassi Shop, Kachori Gali', cost: [25, 12, 5] },
        { time: '09:00', name: 'Ramnagar Fort & Museum', description: 'Cross the Ganges to visit the 18th-century Ramnagar Fort, the ancestral home of the Maharaja of Varanasi. The museum houses vintage cars, royal costumes, ivory works, and ancient weaponry.', category: 'culture', duration: '2 hours', location: 'Ramnagar Fort, across the Ganges', cost: [15, 8, 3] },
        { time: '10:00', name: 'Assi Ghat Morning Walk', description: 'Start the morning with a peaceful walk along Assi Ghat, one of the most popular ghats in Varanasi. Watch yoga practitioners, join a meditation session, and soak in the spiritual atmosphere of this sacred confluence point.', category: 'relaxation', duration: '1.5 hours', location: 'Assi Ghat', cost: [0, 0, 0] },
        { time: '14:00', name: 'Banarasi Silk Saree Shopping', description: 'Visit the famous silk shops in Varanasi to see the intricate handloom Banarasi silk weaving. Watch artisans create beautiful brocade sarees on traditional looms. Popular shops are in Chowk and Peeli Kothi area.', category: 'shopping', duration: '2 hours', location: 'Chowk Market, Varanasi', cost: [0, 0, 0] },
        { time: '16:00', name: 'BHU Campus & Bharat Kala Bhavan Museum', description: 'Visit the sprawling Banaras Hindu University campus, one of the largest residential universities in Asia. Explore the Bharat Kala Bhavan museum with its priceless collection of miniature paintings, sculptures, and ancient artifacts.', category: 'culture', duration: '2 hours', location: 'BHU, Lanka', cost: [10, 5, 2] }
      ],
      tips: {
        packing: ['Comfortable walking shoes for cobblestoned lanes', 'Modest clothing for temple visits (cover shoulders and knees)', 'Sunscreen and hat for boat rides', 'Umbrella — Varanasi weather can be unpredictable', 'Small cash — many shops don\'t accept cards'],
        customs: ['Remove shoes before entering temples and ghats', 'Ask permission before photographing people or rituals', 'Dress conservatively especially near religious sites'],
        budget: ['Auto-rickshaws are the cheapest way to get around — negotiate before boarding', 'Street food is incredibly cheap and delicious — try chaat at Godowlia', 'Boat rides are cheaper if shared with other tourists'],
        safety: ['Be cautious of touts near ghats offering "special" puja ceremonies', 'Stick to well-lit areas at night in the old city', 'Don\'t carry too much cash in the crowded lanes'],
        transportation: ['Walk through the old city — lanes are too narrow for vehicles', 'Hire an auto-rickshaw for Sarnath and Ramnagar Fort trips', 'E-rickshaws are available for short distances around Lanka and BHU'],
        bestTimeToVisit: 'October to March is the best time to visit Varanasi, with pleasant weather ideal for exploring the ghats and temples. Avoid the extreme summer months (April-June). Dev Deepawali in November is a spectacular festival to witness.'
      }
    },
    delhi: {
      highlights: ['Visit the majestic Red Fort & Chandni Chowk', 'Explore Humayun\'s Tomb & Qutub Minar', 'Experience the vibrant street food at Paranthe Wali Gali', 'Pay respects at India Gate & Rajpath', 'Shop at Sarojini Nagar & Connaught Place'],
      activities: [
        { time: '08:00', name: 'Red Fort (Lal Qila)', description: 'Explore the iconic Red Fort, a UNESCO World Heritage Site and symbol of Mughal power. Walk through the Lahori Gate, Diwan-i-Am, Diwan-i-Khas, and the beautiful Rang Mahal.', category: 'culture', duration: '2.5 hours', location: 'Netaji Subhash Marg, Chandni Chowk', cost: [8, 8, 8] },
        { time: '10:30', name: 'Chandni Chowk & Paranthe Wali Gali', description: 'Dive into the chaos and charm of Old Delhi\'s Chandni Chowk. Walk through the bustling bazaars and eat at the legendary Paranthe Wali Gali — try the crispy stuffed paranthas at the 150-year-old shops.', category: 'food', duration: '2 hours', location: 'Chandni Chowk, Old Delhi', cost: [15, 8, 4] },
        { time: '13:00', name: 'Jama Masjid', description: 'Visit India\'s largest mosque, built by Shah Jahan in 1656. Climb the southern minaret for panoramic views of Old Delhi. The courtyard can hold 25,000 worshippers.', category: 'culture', duration: '1 hour', location: 'Jama Masjid, Old Delhi', cost: [5, 5, 0] },
        { time: '14:30', name: 'Humayun\'s Tomb', description: 'Marvel at this stunning Mughal-era tomb, a precursor to the Taj Mahal and a UNESCO World Heritage Site. The Persian-style gardens and red sandstone architecture are breathtaking.', category: 'culture', duration: '2 hours', location: 'Nizamuddin East', cost: [8, 8, 8] },
        { time: '17:00', name: 'India Gate & Kartavya Path', description: 'Visit the iconic India Gate war memorial at sunset. Take a leisurely walk along Kartavya Path (formerly Rajpath) and enjoy the illuminated monument in the evening.', category: 'culture', duration: '1.5 hours', location: 'India Gate, New Delhi', cost: [0, 0, 0] },
        { time: '19:00', name: 'Dinner at Karim\'s', description: 'Dine at the legendary Karim\'s restaurant near Jama Masjid, serving Mughlai cuisine since 1913. Try the mutton burra kebab, nihari, and butter naan — a true Old Delhi culinary experience.', category: 'food', duration: '1.5 hours', location: 'Karim\'s, Gali Kababian, Jama Masjid', cost: [40, 20, 10] },
        { time: '09:00', name: 'Qutub Minar Complex', description: 'Explore the Qutub Minar, India\'s tallest brick minaret at 73 meters. Don\'t miss the mysterious rust-free Iron Pillar and the intricate carvings of the surrounding ruins.', category: 'culture', duration: '2 hours', location: 'Mehrauli, South Delhi', cost: [8, 8, 8] },
        { time: '14:00', name: 'Lotus Temple', description: 'Visit the stunning Lotus Temple (Bahá\'í House of Worship), shaped like a giant lotus flower. Known for its Expressionist architecture, it welcomes people of all faiths for meditation.', category: 'culture', duration: '1.5 hours', location: 'Bahapur, New Delhi', cost: [0, 0, 0] },
        { time: '16:00', name: 'Connaught Place Shopping & Coffee', description: 'Explore the Georgian-style colonnaded buildings of Connaught Place. Shop at the underground Palika Bazaar or browse designer stores. Grab a coffee at the iconic Wenger\'s Bakery.', category: 'shopping', duration: '2 hours', location: 'Connaught Place, New Delhi', cost: [15, 10, 5] },
        { time: '11:00', name: 'Akshardham Temple', description: 'Visit the magnificent Akshardham Temple, a marvel of Indian architecture and spirituality. The intricate stone carvings, musical fountain show, and boat ride through 10,000 years of Indian culture are awe-inspiring.', category: 'culture', duration: '3 hours', location: 'Noida Mor, New Delhi', cost: [0, 0, 0] }
      ],
      tips: {
        packing: ['Comfortable walking shoes for exploring monuments', 'Light cotton clothes — Delhi can be very hot', 'Face mask for dusty areas and pollution days', 'Reusable water bottle', 'Power bank — you\'ll be out all day'],
        customs: ['Remove shoes at religious sites (temples, mosques, gurudwaras)', 'Cover your head at Sikh gurudwaras (scarves available)', 'Bargain at street markets — start at half the quoted price'],
        budget: ['Use Delhi Metro — it\'s clean, cheap, and covers all major tourist spots', 'Eat at dhabas (roadside eateries) for authentic cheap food', 'Visit monuments on Fridays — some offer free entry'],
        safety: ['Use metered taxis or Uber/Ola instead of prepaid auto-rickshaws', 'Be careful of pickpockets in crowded markets like Chandni Chowk', 'Carry a photocopy of your ID for monument entry'],
        transportation: ['Delhi Metro is the best way to navigate — buy a tourist smart card', 'Auto-rickshaws for short distances — always negotiate or use meter', 'Hop-on hop-off tourist buses are available from Connaught Place'],
        bestTimeToVisit: 'October to March is the best time to visit Delhi. Winters (Nov-Feb) are cool and pleasant for sightseeing. Avoid April-June when temperatures cross 45°C.'
      }
    },
    jaipur: {
      highlights: ['Marvel at the iconic Hawa Mahal (Palace of Winds)', 'Explore the grand Amber Fort via elephant ride', 'Discover the astronomical wonders of Jantar Mantar', 'Shop for gemstones and textiles at Johari Bazaar', 'Experience the vibrant pink-walled old city'],
      activities: [
        { time: '08:00', name: 'Amber Fort (Amer Fort)', description: 'Begin your day at the magnificent Amber Fort, perched on a hilltop overlooking Maota Lake. Explore the Sheesh Mahal (Mirror Palace), Diwan-i-Khas, and the Ganesh Pol gateway. You can reach the top via elephant ride or jeep.', category: 'culture', duration: '3 hours', location: 'Amber Fort, Amer', cost: [15, 8, 5] },
        { time: '11:30', name: 'Hawa Mahal (Palace of Winds)', description: 'Visit Jaipur\'s most iconic landmark — the stunning five-story pink sandstone Hawa Mahal with its 953 small windows (jharokhas) designed for royal women to observe street life without being seen.', category: 'culture', duration: '1 hour', location: 'Hawa Mahal Road, Badi Choupad', cost: [6, 6, 6] },
        { time: '13:00', name: 'Lunch at LMB (Laxmi Mishthan Bhandar)', description: 'Dine at the legendary LMB restaurant on Johari Bazaar, serving Rajasthani vegetarian cuisine since 1727. Try the famous dal baati churma, ghevar, and pyaaz kachori.', category: 'food', duration: '1.5 hours', location: 'Johari Bazaar, Jaipur', cost: [25, 15, 8] },
        { time: '14:30', name: 'City Palace & Museum', description: 'Explore the sprawling City Palace complex, still partially occupied by the royal family. The museum showcases royal costumes, manuscripts, weapons, and the famous oversized silver urns used to carry Ganges water to London.', category: 'culture', duration: '2 hours', location: 'City Palace, Jaleb Chowk', cost: [20, 12, 8] },
        { time: '17:00', name: 'Jantar Mantar Observatory', description: 'Visit the UNESCO World Heritage astronomical observation site built by Maharaja Jai Singh II in 1734. See the world\'s largest stone sundial and instruments that still accurately measure time, predict eclipses, and track celestial bodies.', category: 'culture', duration: '1.5 hours', location: 'Jantar Mantar, near City Palace', cost: [6, 6, 6] },
        { time: '19:00', name: 'Dinner at Chokhi Dhani', description: 'Experience Rajasthani village life at Chokhi Dhani — an ethnic village resort offering a lavish traditional thali, folk dances, puppet shows, camel rides, and magic shows. A complete cultural evening!', category: 'food', duration: '3 hours', location: 'Chokhi Dhani, Tonk Road', cost: [40, 25, 15] }
      ],
      tips: {
        packing: ['Sunscreen and sunglasses — Jaipur is very sunny', 'Comfortable walking shoes for fort exploration', 'Light cotton clothes — Rajasthan gets very hot', 'A scarf for sun protection and temple visits', 'Camera — every corner is photogenic'],
        customs: ['Bargain at bazaars — it\'s expected and part of the culture', 'Respect local customs at temples — remove shoes, cover head if asked', 'Try the local meetha paan after meals — it\'s a Rajasthani tradition'],
        budget: ['Composite tickets cover multiple monuments at discounted rates', 'Auto-rickshaws are cheap — negotiate before boarding', 'Street food at Chowk is incredibly affordable and delicious'],
        safety: ['Be cautious of gem scam artists near tourist spots', 'Drink only bottled water', 'Use government-approved guides at monuments'],
        transportation: ['Auto-rickshaws and e-rickshaws for short distances', 'Hire a full-day cab for covering distant spots like Amber Fort', 'Jaipur Metro connects some tourist areas'],
        bestTimeToVisit: 'October to March is ideal for visiting Jaipur. November-February offers pleasant weather perfect for fort exploration. The Jaipur Literature Festival (January) and Elephant Festival (March) are special events.'
      }
    }
  };

  // Find matching destination data
  let destData = null;
  for (const [key, data] of Object.entries(destinationActivities)) {
    if (destLower.includes(key)) {
      destData = data;
      break;
    }
  }

  // Pick activities for each day from the pool
  function buildDailyActivities(activityPool, dayIndex) {
    const activitiesPerDay = 6;
    const startIdx = (dayIndex * activitiesPerDay) % activityPool.length;
    const selected = [];
    for (let j = 0; j < activitiesPerDay; j++) {
      const activity = activityPool[(startIdx + j) % activityPool.length];
      selected.push({
        time: activity.time,
        name: activity.name,
        description: activity.description,
        category: activity.category,
        duration: activity.duration,
        estimatedCost: budget === 'luxury' ? fmt(activity.cost[0]) : budget === 'mid-range' ? fmt(activity.cost[1]) : fmt(activity.cost[2]),
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

  // Default generic activities for unknown destinations
  const defaultActivities = [
    { time: '08:00', name: `Morning Exploration in ${dest}`, description: `Start your day early and explore the heart of ${dest}. Visit the most popular landmarks and soak in the local atmosphere.`, category: 'culture', duration: '2.5 hours', location: 'City Center', cost: [20, 10, 5] },
    { time: '10:30', name: `${dest} Heritage Walk`, description: `Take a guided heritage walk through the historic quarters of ${dest}. Discover ancient architecture, local stories, and hidden courtyards.`, category: 'culture', duration: '2 hours', location: 'Old Town', cost: [15, 8, 3] },
    { time: '13:00', name: 'Local Cuisine Experience', description: `Sample the best local dishes at a popular restaurant in ${dest}. Ask for regional specialties and seasonal dishes.`, category: 'food', duration: '1.5 hours', location: 'Food District', cost: [30, 15, 8] },
    { time: '15:00', name: `${dest} Cultural Landmark`, description: `Visit one of the most celebrated cultural landmarks in ${dest}. Learn about its history and significance through guided tours.`, category: 'culture', duration: '2 hours', location: 'Cultural Quarter', cost: [15, 8, 4] },
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
    packing: ['Comfortable walking shoes — you\'ll walk 10,000+ steps daily', 'Universal power adapter for charging devices', 'Light layers for varying weather conditions', 'Reusable water bottle to stay hydrated', 'Small daypack for daily essentials'],
    customs: ['Learn basic greetings in the local language', 'Research tipping customs as they vary by country', 'Dress modestly when visiting religious or cultural sites'],
    budget: ['Eat where locals eat for authentic and affordable meals', 'Use public transportation instead of taxis', 'Book attractions online in advance for discounts'],
    safety: ['Keep copies of important documents separately', 'Use hotel safes for valuables', 'Stay aware of your surroundings in crowded areas'],
    transportation: ['Purchase a multi-day transit pass if available', 'Walking is the best way to explore city centers', 'Use reputable ride-sharing apps for longer distances'],
    bestTimeToVisit: 'Spring and Autumn typically offer the most pleasant weather with fewer crowds and better hotel rates.'
  };

  const demoItinerary = {
    destination: dest,
    summary: `An unforgettable ${days}-day journey through ${dest}. This carefully curated itinerary blends iconic landmarks with hidden gems, offering authentic experiences tailored to your interests. From cultural immersions to culinary adventures, every moment is designed to create lasting memories.`,
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
    travelTips: tips,
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
  };

  return demoItinerary;
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
