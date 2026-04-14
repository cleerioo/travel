/**
 * Curated destination database with real landmarks, restaurants, and tips.
 * Used as fallback when AI API quota is exceeded (demo mode).
 * Each destination has: highlights, activities pool, tips, and costProfile.
 */

const destinations = {
  varanasi: {
    costTier: 'budget-mid',
    costMultipliers: { accommodation: [800, 2000, 5000], food: [150, 400, 1200], activities: [100, 300, 800] },
    highlights: [
      'Witness the mesmerizing Ganga Aarti at Dashashwamedh Ghat',
      'Seek blessings at the sacred Kashi Vishwanath Temple',
      'Take a sunrise boat ride on the holy River Ganges',
      'Explore ancient Sarnath where Buddha gave his first sermon',
      'Stroll through the narrow lanes of the old city and silk bazaars'
    ],
    activities: [
      { time: '05:00', name: 'Sunrise Boat Ride on the Ganges', description: 'Experience the magical sunrise over the ghats from a traditional wooden boat. Watch devotees perform morning prayers along the riverbank — the most iconic Varanasi experience.', category: 'culture', duration: '1.5 hours', location: 'Dashashwamedh Ghat', cost: [20, 10, 5] },
      { time: '07:00', name: 'Breakfast at Kachori Gali', description: 'Head to famous Kachori Gali for traditional Banarasi breakfast — crispy kachori sabzi, jalebi, and special Banarasi chai from Ram Bhandar.', category: 'food', duration: '1 hour', location: 'Kachori Gali, Vishwanath Lane', cost: [15, 8, 3] },
      { time: '08:30', name: 'Kashi Vishwanath Temple Darshan', description: 'Visit the most sacred Hindu temple — one of the twelve Jyotirlingas. The new Kashi Vishwanath Corridor connects the temple directly to the ghats. Arrive early to avoid queues.', category: 'culture', duration: '2 hours', location: 'Kashi Vishwanath Temple, Lahori Tola', cost: [0, 0, 0] },
      { time: '11:00', name: 'Old City Lanes Walk', description: 'Explore narrow winding alleys (galis) of old Varanasi. Discover hidden temples, ancient havelis, and famous Banarasi silk weaving workshops.', category: 'culture', duration: '2 hours', location: 'Old City, Varanasi', cost: [10, 5, 0] },
      { time: '13:00', name: 'Lunch at Baati Chokha', description: 'Enjoy authentic Bihari-Banarasi thali — signature litti chokha, baigan bharta, and sattu paratha in a rustic village-themed setting.', category: 'food', duration: '1.5 hours', location: 'Baati Chokha, Lanka', cost: [30, 15, 8] },
      { time: '15:00', name: 'Sarnath – Where Buddha Preached', description: 'Visit Sarnath (10 km away) where Lord Buddha delivered his first sermon. Explore Dhamek Stupa, Ashoka Pillar, Sarnath Museum, and Mulagandha Kuti Vihar.', category: 'culture', duration: '3 hours', location: 'Sarnath, Varanasi', cost: [25, 12, 5] },
      { time: '18:30', name: 'Ganga Aarti at Dashashwamedh Ghat', description: 'Witness the world-famous evening Ganga Aarti — a spectacular ritual of fire, chanting, and devotion. Arrive early for front-row seats.', category: 'culture', duration: '1 hour', location: 'Dashashwamedh Ghat', cost: [0, 0, 0] },
      { time: '20:00', name: 'Blue Lassi & Street Food Walk', description: 'Try the legendary Blue Lassi (thick flavored yogurt), then explore street food at Godowlia crossing — tamatar chaat, paan, and malaiyo.', category: 'food', duration: '1.5 hours', location: 'Blue Lassi Shop, Kachori Gali', cost: [25, 12, 5] },
      { time: '09:00', name: 'Ramnagar Fort & Museum', description: 'Cross the Ganges to the 18th-century Ramnagar Fort — ancestral home of the Maharaja. Museum has vintage cars, royal costumes, and ancient weaponry.', category: 'culture', duration: '2 hours', location: 'Ramnagar Fort', cost: [15, 8, 3] },
      { time: '10:00', name: 'Assi Ghat Morning Walk', description: 'Peaceful morning walk along Assi Ghat. Watch yoga practitioners, join a meditation session, and soak in the spiritual atmosphere.', category: 'relaxation', duration: '1.5 hours', location: 'Assi Ghat', cost: [0, 0, 0] },
      { time: '14:00', name: 'Banarasi Silk Saree Shopping', description: 'Visit famous silk shops to see intricate handloom Banarasi silk weaving. Watch artisans create brocade sarees on traditional looms.', category: 'shopping', duration: '2 hours', location: 'Chowk Market, Varanasi', cost: [0, 0, 0] },
      { time: '16:00', name: 'BHU & Bharat Kala Bhavan Museum', description: 'Visit sprawling Banaras Hindu University campus and the Bharat Kala Bhavan museum with miniature paintings, sculptures, and ancient artifacts.', category: 'culture', duration: '2 hours', location: 'BHU, Lanka', cost: [10, 5, 2] }
    ],
    tips: {
      packing: ['Comfortable shoes for cobblestoned lanes', 'Modest clothing for temple visits', 'Sunscreen and hat for boat rides', 'Umbrella for unpredictable weather', 'Small cash — many shops don\'t accept cards'],
      customs: ['Remove shoes before entering temples', 'Ask permission before photographing rituals', 'Dress conservatively near religious sites'],
      budget: ['Auto-rickshaws — negotiate before boarding', 'Street food at Godowlia is incredibly cheap', 'Boat rides are cheaper if shared'],
      safety: ['Beware of touts offering "special" puja ceremonies', 'Stick to well-lit areas at night', 'Don\'t carry too much cash in crowded lanes'],
      transportation: ['Walk through old city — lanes are too narrow for vehicles', 'Auto-rickshaw for Sarnath trips', 'E-rickshaws around Lanka and BHU'],
      bestTimeToVisit: 'October to March. Dev Deepawali in November is spectacular. Avoid extreme summer (April-June).'
    },
    nearbyPlaces: [
      { name: 'Sarnath', distance: '10 km', description: 'Where Buddha gave his first sermon. Dhamek Stupa and museum.', suggestedTime: 'Half day' },
      { name: 'Prayagraj (Allahabad)', distance: '125 km', description: 'Triveni Sangam — confluence of Ganga, Yamuna, and Saraswati.', suggestedTime: 'Full day' },
      { name: 'Vindhyachal', distance: '80 km', description: 'Ancient Vindhyavasini Devi temple, one of the Shakti Peethas.', suggestedTime: 'Half day' },
      { name: 'Chunar Fort', distance: '40 km', description: 'Historic fort on the banks of the Ganges with panoramic views.', suggestedTime: 'Half day' }
    ],
    weather: { winter: '8-22°C, foggy mornings', summer: '30-45°C, very hot', monsoon: '25-35°C, heavy rains', best: 'Oct-Mar' }
  },

  'vaishno devi': {
    costTier: 'budget',
    costMultipliers: { accommodation: [500, 1500, 4000], food: [100, 300, 800], activities: [50, 150, 500] },
    highlights: [
      'Trek to the holy Bhawan cave temple of Mata Vaishno Devi',
      'Visit the sacred Ardhkuwari Cave midway on the trek',
      'Take blessings at Ban Ganga — the holy river origin',
      'Experience the spiritual atmosphere of Katra base town',
      'Ride the helicopter for breathtaking mountain views'
    ],
    activities: [
      { time: '03:00', name: 'Start the Holy Trek to Bhawan', description: 'Begin the 13 km trek from Katra to the sacred Bhawan cave temple. The path is well-maintained with rest stops, refreshment stalls, and pony/palki services available. Start early to avoid crowds.', category: 'adventure', duration: '5-6 hours', location: 'Katra to Bhawan', cost: [0, 0, 0] },
      { time: '04:30', name: 'Ban Ganga — Holy River Stop', description: 'Stop at Ban Ganga, 1.5 km from Katra. Legend says Mata Vaishno Devi shot an arrow here creating the river. Devotees wash their hands and feet before continuing.', category: 'culture', duration: '30 mins', location: 'Ban Ganga, on trek route', cost: [0, 0, 0] },
      { time: '06:00', name: 'Ardhkuwari Cave Temple', description: 'Visit the narrow sacred cave at Ardhkuwari (6 km point). It\'s believed Mata Vaishno Devi meditated here for 9 months. You\'ll crawl through a narrow passage — a deeply spiritual experience.', category: 'culture', duration: '1 hour', location: 'Ardhkuwari, midway on trek', cost: [0, 0, 0] },
      { time: '09:00', name: 'Bhawan — Main Temple Darshan', description: 'Reach the holy Bhawan cave shrine at 5,200 feet altitude. Enter the sacred cave to see the three natural rock formations (Pindis) of Maha Kali, Maha Lakshmi, and Maha Saraswati.', category: 'culture', duration: '2 hours', location: 'Bhawan Temple, Trikuta Hills', cost: [0, 0, 0] },
      { time: '11:00', name: 'Bhairon Nath Temple', description: 'Trek 1.5 km further uphill to Bhairon Nath temple at 6,600 feet. The yatra is considered incomplete without visiting this temple. Stunning panoramic mountain views from the top.', category: 'culture', duration: '1.5 hours', location: 'Bhairon Nath Temple summit', cost: [0, 0, 0] },
      { time: '13:00', name: 'Langar & Prasad at Bhawan', description: 'Enjoy the free community langar (meal) at Bhawan. The Shrine Board serves hot meals to all pilgrims. Also collect prasad from the temple counter.', category: 'food', duration: '1 hour', location: 'Bhawan Langar Hall', cost: [0, 0, 0] },
      { time: '14:30', name: 'Return Trek / Helicopter to Katra', description: 'Begin the return journey. You can trek back (4-5 hours), take a pony/palki, or book a helicopter ride (5 mins) from Sanjichhat helipad for stunning aerial views.', category: 'transport', duration: '4-5 hours', location: 'Bhawan to Katra', cost: [0, 0, 0] },
      { time: '19:00', name: 'Dinner at Sagar Ratna, Katra', description: 'Relax with a hearty dinner at Sagar Ratna or Vaishno Bhojanalaya in Katra. Try Rajma Chawal, Chole Bhature, and local Dogra cuisine. Most restaurants are vegetarian.', category: 'food', duration: '1.5 hours', location: 'Katra Main Market', cost: [20, 10, 5] },
      { time: '08:00', name: 'Explore Katra Town', description: 'Visit the bustling Katra market for religious souvenirs, dry fruits, and local handicrafts. Don\'t miss the Chungi Market and the Shiv Khori road-side stalls.', category: 'shopping', duration: '2 hours', location: 'Katra Main Bazaar', cost: [10, 5, 0] },
      { time: '10:00', name: 'Shiv Khori Cave Temple', description: 'Visit Shiv Khori (80 km from Katra), a natural cave temple with a 4-foot-high Shivling formation. The cave is 200 meters deep with stalactite/stalagmite formations.', category: 'culture', duration: '4 hours (with travel)', location: 'Shiv Khori, Reasi', cost: [15, 8, 3] },
      { time: '15:00', name: 'Jhajjar Kotli Picnic Spot', description: 'Relax at Jhajjar Kotli, a beautiful riverside spot 15 km from Katra. Crystal clear water streams through rocks — perfect for cooling off after the trek.', category: 'nature', duration: '2 hours', location: 'Jhajjar Kotli, near Katra', cost: [5, 3, 0] },
      { time: '07:00', name: 'Helicopter Ride to Bhawan', description: 'For those preferring not to trek, book a helicopter from Katra helipad to Sanjichhat (near Bhawan). 5-minute scenic ride over the Trikuta Hills. Book via Shrine Board website.', category: 'transport', duration: '10 mins', location: 'Katra Helipad', cost: [100, 100, 100] }
    ],
    tips: {
      packing: ['Comfortable trekking shoes — the path is steep', 'Warm jacket — temperatures drop at higher altitude', 'Rain poncho — weather is unpredictable', 'Walking stick (available for rent at Katra)', 'Yatra slip printout (register online at maavaishnodevi.org)'],
      customs: ['Register for yatra slip online before arriving', 'No leather items allowed inside the temple', 'Maintain silence and discipline while in the cave', 'No photography inside the Bhawan cave'],
      budget: ['Free langar available at Bhawan', 'Ponies cost ₹500-1500 one way', 'Helicopter ₹1,800 per person one way', 'Budget lodges in Katra from ₹500/night'],
      safety: ['Carry a flashlight for early morning trek starts', 'Stay hydrated — carry a water bottle', 'Don\'t trek alone at night', 'Medical facilities available at Ardhkuwari and Bhawan'],
      transportation: ['Katra is well-connected by train (Shri Mata Vaishno Devi Katra station)', 'Shared autos from Katra station to base camp ₹20', 'Pre-book helicopter at maavaishnodevi.org'],
      bestTimeToVisit: 'March to October. Navratri (March/April and Sept/Oct) is the holiest time but extremely crowded. Avoid Dec-Feb due to snowfall.'
    },
    nearbyPlaces: [
      { name: 'Patnitop', distance: '110 km', description: 'Hill station at 2,024m with pine forests, meadows, and snow in winter.', suggestedTime: 'Full day' },
      { name: 'Shiv Khori', distance: '80 km', description: 'Natural cave temple with a 4-foot Shivling formation.', suggestedTime: 'Half day' },
      { name: 'Jammu City', distance: '50 km', description: 'Raghunath Temple, Mubarak Mandi Palace, Bahu Fort.', suggestedTime: 'Full day' },
      { name: 'Jhajjar Kotli', distance: '15 km', description: 'Beautiful riverside picnic spot with crystal clear streams.', suggestedTime: '2-3 hours' }
    ],
    weather: { winter: '2-15°C, cold with possible snow', summer: '15-30°C, pleasant for trekking', monsoon: '15-25°C, heavy rains, slippery paths', best: 'Mar-Oct' }
  },

  delhi: {
    costTier: 'metro',
    costMultipliers: { accommodation: [1500, 4000, 15000], food: [200, 600, 2000], activities: [150, 400, 1200] },
    highlights: ['Visit the majestic Red Fort & Chandni Chowk', 'Explore Humayun\'s Tomb & Qutub Minar', 'Feast at Paranthe Wali Gali', 'Pay respects at India Gate', 'Shop at Sarojini Nagar & Connaught Place'],
    activities: [
      { time: '08:00', name: 'Red Fort (Lal Qila)', description: 'UNESCO World Heritage Site and symbol of Mughal power. Walk through Lahori Gate, Diwan-i-Am, Diwan-i-Khas, and Rang Mahal.', category: 'culture', duration: '2.5 hours', location: 'Netaji Subhash Marg, Chandni Chowk', cost: [8, 8, 8] },
      { time: '10:30', name: 'Chandni Chowk & Paranthe Wali Gali', description: 'Dive into Old Delhi\'s Chandni Chowk bazaars. Eat legendary paranthas at 150-year-old shops in Paranthe Wali Gali.', category: 'food', duration: '2 hours', location: 'Chandni Chowk, Old Delhi', cost: [15, 8, 4] },
      { time: '13:00', name: 'Jama Masjid', description: 'India\'s largest mosque built by Shah Jahan (1656). Climb the southern minaret for panoramic Old Delhi views.', category: 'culture', duration: '1 hour', location: 'Jama Masjid, Old Delhi', cost: [5, 5, 0] },
      { time: '14:30', name: 'Humayun\'s Tomb', description: 'Stunning precursor to the Taj Mahal — UNESCO World Heritage Site with Persian-style gardens and red sandstone architecture.', category: 'culture', duration: '2 hours', location: 'Nizamuddin East', cost: [8, 8, 8] },
      { time: '17:00', name: 'India Gate & Kartavya Path', description: 'Visit the iconic India Gate war memorial at sunset. Evening walk along illuminated Kartavya Path.', category: 'culture', duration: '1.5 hours', location: 'India Gate, New Delhi', cost: [0, 0, 0] },
      { time: '19:00', name: 'Dinner at Karim\'s', description: 'Legendary restaurant near Jama Masjid since 1913. Try mutton burra kebab, nihari, and butter naan.', category: 'food', duration: '1.5 hours', location: 'Karim\'s, Gali Kababian', cost: [40, 20, 10] },
      { time: '09:00', name: 'Qutub Minar Complex', description: 'India\'s tallest brick minaret at 73m. See the mysterious rust-free Iron Pillar and intricate carvings.', category: 'culture', duration: '2 hours', location: 'Mehrauli, South Delhi', cost: [8, 8, 8] },
      { time: '14:00', name: 'Lotus Temple', description: 'Stunning Bahá\'í House of Worship shaped like a lotus flower. Welcomes all faiths for meditation.', category: 'culture', duration: '1.5 hours', location: 'Bahapur, New Delhi', cost: [0, 0, 0] },
      { time: '16:00', name: 'Connaught Place Shopping', description: 'Georgian-style colonnaded buildings. Shop at Palika Bazaar, grab coffee at Wenger\'s Bakery.', category: 'shopping', duration: '2 hours', location: 'Connaught Place', cost: [15, 10, 5] },
      { time: '11:00', name: 'Akshardham Temple', description: 'Magnificent temple with intricate stone carvings, musical fountain show, and boat ride through Indian culture.', category: 'culture', duration: '3 hours', location: 'Noida Mor, New Delhi', cost: [0, 0, 0] }
    ],
    tips: {
      packing: ['Comfortable walking shoes', 'Light cotton clothes', 'Face mask for pollution days', 'Water bottle', 'Power bank'],
      customs: ['Remove shoes at religious sites', 'Cover head at gurudwaras', 'Bargain at street markets — start at half price'],
      budget: ['Delhi Metro covers all major tourist spots', 'Eat at dhabas for authentic cheap food', 'Some monuments offer free entry on Fridays'],
      safety: ['Use Uber/Ola instead of random auto-rickshaws', 'Beware pickpockets at Chandni Chowk', 'Carry ID copies for monument entry'],
      transportation: ['Delhi Metro — buy a tourist smart card', 'Auto-rickshaws — always negotiate', 'Hop-on hop-off tourist buses from CP'],
      bestTimeToVisit: 'October to March. Avoid April-June when temperatures cross 45°C.'
    },
    nearbyPlaces: [
      { name: 'Agra (Taj Mahal)', distance: '230 km', description: 'The magnificent Taj Mahal, Agra Fort, and Fatehpur Sikri.', suggestedTime: 'Full day' },
      { name: 'Jaipur', distance: '280 km', description: 'Pink City — Amber Fort, Hawa Mahal, City Palace.', suggestedTime: '2-3 days' },
      { name: 'Mathura & Vrindavan', distance: '180 km', description: 'Birthplace of Lord Krishna. Beautiful temples and ghats.', suggestedTime: 'Full day' },
      { name: 'Neemrana Fort', distance: '122 km', description: 'Heritage fort palace with zip-lining and vintage car museum.', suggestedTime: 'Overnight' }
    ],
    weather: { winter: '4-22°C, foggy mornings', summer: '30-48°C, extremely hot', monsoon: '25-35°C, moderate rains', best: 'Oct-Mar' }
  },

  jaipur: {
    costTier: 'mid',
    costMultipliers: { accommodation: [1000, 3000, 10000], food: [150, 500, 1500], activities: [100, 350, 1000] },
    highlights: ['Marvel at iconic Hawa Mahal', 'Explore grand Amber Fort', 'Discover Jantar Mantar observatory', 'Shop for gemstones at Johari Bazaar', 'Experience the vibrant pink-walled city'],
    activities: [
      { time: '08:00', name: 'Amber Fort (Amer Fort)', description: 'Magnificent hilltop fort overlooking Maota Lake. Explore Sheesh Mahal, Diwan-i-Khas, and Ganesh Pol. Reach via elephant ride or jeep.', category: 'culture', duration: '3 hours', location: 'Amber Fort, Amer', cost: [15, 8, 5] },
      { time: '11:30', name: 'Hawa Mahal', description: 'Jaipur\'s most iconic landmark — five-story pink sandstone facade with 953 small windows designed for royal women.', category: 'culture', duration: '1 hour', location: 'Hawa Mahal Road, Badi Choupad', cost: [6, 6, 6] },
      { time: '13:00', name: 'Lunch at LMB', description: 'Legendary Laxmi Mishthan Bhandar on Johari Bazaar. Try dal baati churma, ghevar, and pyaaz kachori.', category: 'food', duration: '1.5 hours', location: 'Johari Bazaar, Jaipur', cost: [25, 15, 8] },
      { time: '14:30', name: 'City Palace & Museum', description: 'Sprawling palace complex still partially royal-occupied. See royal costumes, manuscripts, and the famous giant silver urns.', category: 'culture', duration: '2 hours', location: 'City Palace, Jaleb Chowk', cost: [20, 12, 8] },
      { time: '17:00', name: 'Jantar Mantar Observatory', description: 'UNESCO site with world\'s largest stone sundial. Instruments still accurately measure time and track celestial bodies.', category: 'culture', duration: '1.5 hours', location: 'Near City Palace', cost: [6, 6, 6] },
      { time: '19:00', name: 'Dinner at Chokhi Dhani', description: 'Rajasthani village experience — traditional thali, folk dances, puppet shows, camel rides, magic shows.', category: 'food', duration: '3 hours', location: 'Chokhi Dhani, Tonk Road', cost: [40, 25, 15] }
    ],
    tips: {
      packing: ['Sunscreen and sunglasses', 'Comfortable shoes for forts', 'Light cotton clothes', 'Scarf for sun/temple visits', 'Camera — every corner is photogenic'],
      customs: ['Bargain at bazaars — it\'s expected', 'Remove shoes at temples', 'Try meetha paan after meals'],
      budget: ['Composite tickets cover multiple monuments', 'Auto-rickshaws — negotiate before boarding', 'Street food at Chowk is very affordable'],
      safety: ['Beware gem scam artists near tourist spots', 'Drink only bottled water', 'Use government-approved guides'],
      transportation: ['Auto-rickshaws and e-rickshaws for short distances', 'Full-day cab for Amber Fort', 'Jaipur Metro for some areas'],
      bestTimeToVisit: 'October to March. Jaipur Literature Festival (January) and Elephant Festival (March) are special.'
    },
    nearbyPlaces: [
      { name: 'Ajmer & Pushkar', distance: '145 km', description: 'Ajmer Sharif Dargah and the holy Pushkar Lake with Brahma Temple.', suggestedTime: 'Full day' },
      { name: 'Ranthambore', distance: '180 km', description: 'Famous tiger reserve and wildlife sanctuary.', suggestedTime: '2 days' },
      { name: 'Sariska Tiger Reserve', distance: '110 km', description: 'Tiger spotting, ancient temples, and Aravalli hills.', suggestedTime: 'Full day' }
    ],
    weather: { winter: '5-22°C, pleasant', summer: '28-45°C, hot', monsoon: '25-35°C, moderate rain', best: 'Oct-Mar' }
  },

  goa: {
    costTier: 'tourist-premium',
    costMultipliers: { accommodation: [1500, 4000, 15000], food: [200, 600, 2000], activities: [200, 500, 2000] },
    highlights: ['Relax on golden Baga & Calangute beaches', 'Explore Old Goa\'s Portuguese churches', 'Experience Tito\'s Lane nightlife', 'Visit the scenic Dudhsagar Falls', 'Try Goan fish curry and feni'],
    activities: [
      { time: '07:00', name: 'Sunrise at Palolem Beach', description: 'Start your day at the crescent-shaped Palolem Beach in South Goa. Watch the sunrise, take a swim, and enjoy the peaceful morning before crowds arrive.', category: 'nature', duration: '2 hours', location: 'Palolem Beach, Canacona', cost: [0, 0, 0] },
      { time: '09:30', name: 'Basilica of Bom Jesus', description: 'UNESCO World Heritage church in Old Goa housing the mortal remains of St. Francis Xavier. Stunning Baroque architecture dating to 1605.', category: 'culture', duration: '1.5 hours', location: 'Old Goa', cost: [0, 0, 0] },
      { time: '11:30', name: 'Se Cathedral & Old Goa Churches', description: 'Visit the massive Se Cathedral (largest church in Asia) and Church of St. Cajetan modeled after St. Peter\'s Basilica in Rome.', category: 'culture', duration: '1.5 hours', location: 'Old Goa', cost: [0, 0, 0] },
      { time: '13:30', name: 'Lunch at Gunpowder', description: 'Try authentic Goan cuisine at Gunpowder in Assagao. Famous for pork vindaloo, fish recheado, and prawn balchão with kokum sol kadi.', category: 'food', duration: '1.5 hours', location: 'Gunpowder, Assagao', cost: [40, 25, 12] },
      { time: '15:30', name: 'Anjuna Flea Market', description: 'Browse the famous Wednesday flea market at Anjuna Beach. Find jewelry, clothes, handicrafts, and souvenirs. Great for bargain shopping.', category: 'shopping', duration: '2 hours', location: 'Anjuna Beach', cost: [10, 5, 0] },
      { time: '18:00', name: 'Sunset at Chapora Fort', description: 'Watch the sunset from the famous "Dil Chahta Hai" fort. Panoramic views of Vagator Beach and the Arabian Sea coastline.', category: 'nature', duration: '1.5 hours', location: 'Chapora Fort, Vagator', cost: [0, 0, 0] },
      { time: '20:00', name: 'Night out at Tito\'s Lane, Baga', description: 'Experience Goa\'s famous nightlife at Tito\'s Lane in Baga. Live music, cocktails, and dancing. Try Club Tito\'s, Mambo\'s, and Café Mambos.', category: 'nightlife', duration: '3 hours', location: 'Tito\'s Lane, Baga Beach', cost: [50, 30, 15] },
      { time: '08:00', name: 'Dudhsagar Falls Day Trip', description: 'Visit the spectacular 310m Dudhsagar Falls (Mollem). Take a jeep safari through the Western Ghats. Swimming at the base is unforgettable.', category: 'adventure', duration: '6 hours', location: 'Dudhsagar, Mollem', cost: [50, 35, 20] },
      { time: '10:00', name: 'Spice Plantation Tour', description: 'Visit Sahakari or Tropical spice plantation. Learn about cardamom, pepper, vanilla, and cinnamon. Includes traditional Goan buffet lunch.', category: 'nature', duration: '3 hours', location: 'Ponda, Goa', cost: [20, 15, 10] },
      { time: '16:00', name: 'Water Sports at Baga', description: 'Try parasailing, jet skiing, banana boat rides, and bumper rides at Baga Beach. Negotiate prices with operators.', category: 'adventure', duration: '2 hours', location: 'Baga Beach', cost: [40, 25, 15] }
    ],
    tips: {
      packing: ['Swimwear and beach towel', 'Sunscreen SPF 50+', 'Light comfortable clothes', 'Waterproof phone pouch', 'Mosquito repellent'],
      customs: ['Dress modestly when visiting churches', 'Don\'t litter on beaches — heavy fines', 'Respect local fishing communities'],
      budget: ['Rent a scooter (₹300-500/day) instead of taxis', 'Beach shacks are cheaper than restaurants', 'Avoid peak season (Dec-Jan) for lower prices'],
      safety: ['Don\'t swim in the sea after dark', 'Keep valuables secure on beaches', 'Don\'t drink and drive — police checkpoints are common'],
      transportation: ['Rent a scooter/Activa for maximum freedom', 'Taxis are expensive — negotiate always', 'Kadamba buses connect major towns cheaply'],
      bestTimeToVisit: 'November to February for pleasant weather. Sunburn Festival (Dec) and Carnival (Feb) are highlights. Monsoon (Jun-Sep) is green but many shacks close.'
    },
    nearbyPlaces: [
      { name: 'Dudhsagar Falls', distance: '60 km', description: '310-meter waterfall in the Western Ghats. Jeep safari through forest.', suggestedTime: 'Full day' },
      { name: 'Hampi', distance: '340 km', description: 'UNESCO World Heritage ruins of the Vijayanagara Empire.', suggestedTime: '2 days' },
      { name: 'Gokarna', distance: '170 km', description: 'Quieter alternative with pristine beaches — Om Beach and Kudle Beach.', suggestedTime: 'Overnight' }
    ],
    weather: { winter: '20-32°C, dry and pleasant', summer: '25-36°C, hot and humid', monsoon: '24-30°C, heavy rainfall', best: 'Nov-Feb' }
  },

  shimla: {
    costTier: 'tourist-premium',
    costMultipliers: { accommodation: [1200, 3500, 12000], food: [150, 450, 1500], activities: [100, 300, 800] },
    highlights: ['Walk the iconic Mall Road & Ridge', 'Ride the UNESCO Heritage Toy Train', 'Visit Jakhoo Temple with Hanuman statue', 'Explore Viceregal Lodge & Botanical Gardens', 'Experience snowfall in winter months'],
    activities: [
      { time: '08:00', name: 'Mall Road Morning Walk', description: 'Start with a leisurely walk along Shimla\'s famous Mall Road. Browse bookshops, cafés, and colonial-era buildings. The morning is quieter and perfect for photos.', category: 'culture', duration: '1.5 hours', location: 'Mall Road, Shimla', cost: [5, 3, 0] },
      { time: '09:30', name: 'The Ridge & Christ Church', description: 'Visit The Ridge — Shimla\'s large open space with stunning mountain views. See Christ Church, the second oldest church in North India (1857).', category: 'culture', duration: '1.5 hours', location: 'The Ridge, Shimla', cost: [0, 0, 0] },
      { time: '11:00', name: 'Jakhoo Temple Trek', description: 'Trek (or take ropeway) to Jakhoo Hill\'s Hanuman temple at 8,000 feet. The 108-foot Hanuman statue is visible from across Shimla. Stunning panoramic views.', category: 'culture', duration: '2 hours', location: 'Jakhoo Hill, Shimla', cost: [5, 3, 0] },
      { time: '13:30', name: 'Lunch at Wake & Bake Café', description: 'Enjoy pizza, pasta, and coffee at the popular Wake & Bake on Mall Road. Or try local Himachali Dham thali at Ashiana Restaurant.', category: 'food', duration: '1.5 hours', location: 'Mall Road, Shimla', cost: [25, 15, 8] },
      { time: '15:00', name: 'Viceregal Lodge & Botanical Gardens', description: 'Explore the stunning British-era Viceregal Lodge (Rashtrapati Niwas) — summer residence of the British Viceroy. Beautiful gardens and architecture.', category: 'culture', duration: '2 hours', location: 'Observatory Hill, Shimla', cost: [8, 5, 3] },
      { time: '17:30', name: 'Sunset at Scandal Point', description: 'Watch the sunset from Scandal Point at the junction of Mall Road and Ridge. Named after a famous scandal of a British officer eloping with the Maharaja\'s daughter.', category: 'nature', duration: '1 hour', location: 'Scandal Point, The Ridge', cost: [0, 0, 0] },
      { time: '09:00', name: 'Toy Train Ride (Shimla-Kalka)', description: 'Ride the UNESCO Heritage Kalka-Shimla Railway built in 1898. The narrow-gauge train passes through 102 tunnels and 800+ bridges with breathtaking valley views.', category: 'adventure', duration: '5 hours', location: 'Shimla Railway Station', cost: [10, 5, 2] },
      { time: '10:00', name: 'Kufri Adventure', description: 'Visit Kufri (16 km) for horse riding, yak rides, and Himalayan Nature Park. In winter, enjoy snow activities. Green Valley has stunning views.', category: 'adventure', duration: '4 hours', location: 'Kufri, near Shimla', cost: [20, 12, 5] }
    ],
    tips: {
      packing: ['Warm layers — even summer evenings are cool', 'Good walking shoes — Shimla is hilly', 'Rain jacket — weather changes quickly', 'Sunscreen — altitude sun is strong', 'Camera for Himalayan views'],
      customs: ['Mall Road is vehicle-free — walk only', 'Monkeys at Jakhoo can be aggressive — don\'t carry food openly', 'Respect local Pahari culture'],
      budget: ['Walk everywhere on Mall Road — it\'s pedestrian only', 'HRTC buses are cheapest to Kufri', 'Off-season (Jul-Sep) has the lowest hotel prices'],
      safety: ['Watch out for aggressive monkeys at Jakhoo', 'Roads can be slippery in winter', 'Don\'t venture off marked trails'],
      transportation: ['Mall Road is pedestrian — walk or take escalators', 'Local taxi for Kufri/Mashobra trips', 'Toy Train from Kalka is an experience itself'],
      bestTimeToVisit: 'March-June for pleasant weather. December-February for snowfall. Avoid monsoon (Jul-Sep) due to landslides.'
    },
    nearbyPlaces: [
      { name: 'Kufri', distance: '16 km', description: 'Hill station with adventure sports, yak rides, and snow in winter.', suggestedTime: 'Half day' },
      { name: 'Mashobra', distance: '12 km', description: 'Quieter alternative to Shimla with apple orchards and forests.', suggestedTime: 'Half day' },
      { name: 'Naldehra', distance: '23 km', description: 'India\'s oldest golf course with stunning deodar forests.', suggestedTime: 'Half day' },
      { name: 'Chail', distance: '45 km', description: 'Former summer capital of Patiala state with the world\'s highest cricket ground.', suggestedTime: 'Full day' }
    ],
    weather: { winter: '-2 to 10°C, snowfall likely', summer: '15-30°C, pleasant', monsoon: '15-25°C, heavy rains, landslide risk', best: 'Mar-Jun, Dec-Feb for snow' }
  },

  manali: {
    costTier: 'tourist-premium',
    costMultipliers: { accommodation: [1000, 3000, 12000], food: [150, 400, 1200], activities: [200, 500, 1500] },
    highlights: ['Visit the ancient Hadimba Devi Temple', 'Adventure at Solang Valley & Rohtang Pass', 'Explore Old Manali\'s hippie cafes', 'Trek to Jogini Waterfall', 'Experience river rafting on the Beas'],
    activities: [
      { time: '08:00', name: 'Hadimba Devi Temple', description: 'Visit the iconic 1553 wooden temple set amidst towering deodar trees. Dedicated to Hadimba, wife of Bhima from the Mahabharata. Beautiful pagoda-style architecture.', category: 'culture', duration: '1.5 hours', location: 'Hadimba Temple Road, Manali', cost: [0, 0, 0] },
      { time: '10:00', name: 'Solang Valley Adventures', description: 'Paragliding, zorbing, skiing (winter), and rope-way to Solang Peak. Stunning views of snow-capped peaks and meadows.', category: 'adventure', duration: '4 hours', location: 'Solang Valley, 14 km from Manali', cost: [50, 30, 15] },
      { time: '15:00', name: 'Old Manali Café Hopping', description: 'Explore the bohemian Old Manali village across the bridge. Visit Lazy Dog, Drifter\'s Café, and People for wood-fired pizza, Israeli food, and mountain views.', category: 'food', duration: '2 hours', location: 'Old Manali', cost: [20, 12, 6] },
      { time: '17:30', name: 'Walk Along Beas River', description: 'Evening stroll along the Beas River promenade. The sound of rushing water with mountain backdrop is incredibly peaceful.', category: 'nature', duration: '1.5 hours', location: 'Beas River, Manali', cost: [0, 0, 0] },
      { time: '08:00', name: 'Rohtang Pass Day Trip', description: 'Drive to Rohtang Pass (51 km, 3,979m altitude). Play in snow, see glaciers, and enjoy breathtaking Himalayan panoramas. Permit required (book online at HP tourism).', category: 'adventure', duration: '8 hours', location: 'Rohtang Pass', cost: [40, 25, 15] },
      { time: '09:00', name: 'Jogini Waterfall Trek', description: 'Easy 3 km trek from Vashisht village to the beautiful Jogini waterfall. Walk through pine forests and small villages.', category: 'adventure', duration: '3 hours', location: 'Vashisht to Jogini', cost: [0, 0, 0] },
      { time: '14:00', name: 'Vashisht Hot Springs', description: 'Soak in the natural hot water springs at Vashisht Temple. The sulfur-rich water is believed to have healing properties.', category: 'relaxation', duration: '1.5 hours', location: 'Vashisht Village, Manali', cost: [0, 0, 0] },
      { time: '16:00', name: 'River Rafting on Beas', description: 'White water rafting from Pirdi to Jhiri (14 km). Grade 2-3 rapids suitable for beginners. An exhilarating 1.5-hour experience.', category: 'adventure', duration: '2 hours', location: 'Pirdi, near Kullu', cost: [15, 10, 8] }
    ],
    tips: {
      packing: ['Warm jacket — even summer nights are cold', 'Trekking shoes', 'Sunscreen and sunglasses', 'Rain gear', 'Power bank — remote areas have no charging'],
      customs: ['Respect local Kullu-Manali traditions', 'Don\'t litter on treks', 'Ask before photographing locals'],
      budget: ['Travel by HRTC Volvo from Delhi (₹800-1200)', 'Rent a scooter for local sightseeing', 'Eat at dhabas in Old Manali for cheap food'],
      safety: ['Altitude sickness possible at Rohtang — carry meds', 'Don\'t drive on mountain roads after dark', 'Check weather before Rohtang Pass trip'],
      transportation: ['Local taxis for Solang/Rohtang', 'Walk in old Manali — it\'s small enough', 'HRTC buses connect to Kullu, Naggar'],
      bestTimeToVisit: 'October to June. December-February for snow. March-June for pleasant weather. Avoid monsoon (Jul-Sep) due to landslides.'
    },
    nearbyPlaces: [
      { name: 'Rohtang Pass', distance: '51 km', description: 'Snow-covered pass at 3,979m with glaciers and panoramic views.', suggestedTime: 'Full day' },
      { name: 'Kasol', distance: '75 km', description: 'Mini Israel of India — backpacker paradise in Parvati Valley.', suggestedTime: 'Overnight' },
      { name: 'Naggar Castle', distance: '21 km', description: 'Medieval castle with Roerich Art Gallery and mountain views.', suggestedTime: 'Half day' },
      { name: 'Manikaran', distance: '85 km', description: 'Hot springs and Sikh/Hindu pilgrimage near Kasol.', suggestedTime: 'Full day' }
    ],
    weather: { winter: '-5 to 10°C, heavy snowfall', summer: '10-28°C, pleasant', monsoon: '12-22°C, heavy rains', best: 'Oct-Jun' }
  },

  rishikesh: {
    costTier: 'budget-mid',
    costMultipliers: { accommodation: [600, 2000, 6000], food: [100, 300, 1000], activities: [100, 400, 1200] },
    highlights: ['Attend Triveni Ghat Aarti on the Ganges', 'Try white water river rafting', 'Cross the iconic Laxman Jhula', 'Practice yoga at Parmarth Niketan', 'Bungee jump at Jumpin Heights'],
    activities: [
      { time: '06:00', name: 'Yoga Session at Parmarth Niketan', description: 'Join a sunrise yoga class at Parmarth Niketan ashram on the Ganges banks. Open to all levels. The spiritual atmosphere is transformative.', category: 'relaxation', duration: '1.5 hours', location: 'Parmarth Niketan, Swargashram', cost: [5, 5, 0] },
      { time: '08:00', name: 'Walk Across Laxman Jhula', description: 'Cross the iconic 450-foot suspension bridge over the Ganges. Visit the 13-story Trimbakeshwar Temple on the other side. Great views and photo opportunities.', category: 'culture', duration: '1.5 hours', location: 'Laxman Jhula, Rishikesh', cost: [0, 0, 0] },
      { time: '10:00', name: 'White Water River Rafting', description: 'Adrenaline-pumping 16 km rafting from Shivpuri to Rishikesh with Grade 3-4 rapids. Includes cliff jumping and body surfing. The Ganges is incredibly exciting here.', category: 'adventure', duration: '3 hours', location: 'Shivpuri to Rishikesh', cost: [30, 20, 12] },
      { time: '14:00', name: 'Lunch at Chotiwala Restaurant', description: 'Eat at the famous Chotiwala near Ram Jhula — a Rishikesh institution since 1958. Try their thali and aloo puri. Entertaining doorman in costume.', category: 'food', duration: '1 hour', location: 'Chotiwala, Ram Jhula', cost: [12, 8, 4] },
      { time: '15:30', name: 'Beatles Ashram (Maharishi Mahesh)', description: 'Explore the abandoned Maharishi Mahesh Yogi ashram where The Beatles stayed in 1968. Now covered in graffiti art and jungle — very surreal and photogenic.', category: 'culture', duration: '2 hours', location: 'Beatles Ashram, Swargashram', cost: [8, 8, 5] },
      { time: '18:00', name: 'Triveni Ghat Aarti', description: 'Attend the magical evening Ganga Aarti at Triveni Ghat. Floating diyas on the river, chanting, and fire rituals create an unforgettable spiritual experience.', category: 'culture', duration: '1 hour', location: 'Triveni Ghat, Rishikesh', cost: [0, 0, 0] },
      { time: '10:00', name: 'Bungee Jumping at Jumpin Heights', description: 'India\'s highest bungee jump (83 meters) operated by Jumpin Heights. Also offers giant swing and flying fox. Heart-stopping views of the valley below.', category: 'adventure', duration: '2 hours', location: 'Jumpin Heights, Mohan Chatti', cost: [45, 45, 45] },
      { time: '14:00', name: 'Neelkanth Mahadev Temple', description: 'Drive up to this sacred Shiva temple 1,330m up in the hills. Legend says Shiva drank poison (neelkanth) here. Stunning forest drive and mountain views.', category: 'culture', duration: '3 hours', location: 'Neelkanth, 30 km from Rishikesh', cost: [10, 5, 0] }
    ],
    tips: {
      packing: ['Quick-dry clothes for rafting', 'Sturdy sandals/water shoes', 'Yoga mat (or rent at ashram)', 'Swimwear (modest)', 'Carry cash — many places don\'t accept cards'],
      customs: ['Rishikesh is a vegetarian city — no meat or alcohol served', 'Remove shoes at ashrams and temples', 'Dress modestly — it\'s a spiritual town'],
      budget: ['Ashram stays are cheapest (₹300-800/night)', 'Walk everywhere in the main area', 'Book rafting directly at camp — skip agents'],
      safety: ['Don\'t swim in the Ganges without local guidance', 'Watch for monkeys — they steal food and glasses', 'Use only certified adventure operators'],
      transportation: ['Walk around Laxman Jhula / Ram Jhula area', 'Shared auto to Shivpuri (₹30)', 'Taxi for Neelkanth temple'],
      bestTimeToVisit: 'September to November and February to May. Monsoon (Jul-Aug) closes rafting. Winter (Dec-Jan) is cold but peaceful.'
    },
    nearbyPlaces: [
      { name: 'Haridwar', distance: '25 km', description: 'Har Ki Pauri Ganga Aarti, one of the seven holiest Hindu cities.', suggestedTime: 'Half day' },
      { name: 'Mussoorie', distance: '75 km', description: 'Queen of Hills — Kempty Falls, Gun Hill, Mall Road.', suggestedTime: 'Overnight' },
      { name: 'Dehradun', distance: '43 km', description: 'Robber\'s Cave, Sahastradhara, and Forest Research Institute.', suggestedTime: 'Half day' }
    ],
    weather: { winter: '5-18°C, chilly nights', summer: '20-38°C, hot but dry', monsoon: '22-32°C, heavy rains, rafting closed', best: 'Sep-Nov, Feb-May' }
  },

  agra: {
    costTier: 'mid',
    costMultipliers: { accommodation: [800, 2500, 10000], food: [100, 350, 1200], activities: [100, 300, 800] },
    highlights: ['Marvel at the Taj Mahal at sunrise', 'Explore the massive Agra Fort', 'Visit the exquisite Itimad-ud-Daulah (Baby Taj)', 'Discover the ghost city of Fatehpur Sikri', 'Taste the famous Agra ka Petha'],
    activities: [
      { time: '05:30', name: 'Sunrise at Taj Mahal', description: 'Witness the Taj Mahal at sunrise — the most magical time when the white marble glows pink-orange. Enter through the East Gate for the iconic first view through the main gateway.', category: 'culture', duration: '3 hours', location: 'Taj Mahal, Agra', cost: [15, 15, 15] },
      { time: '09:00', name: 'Agra Fort', description: 'Explore this massive UNESCO red sandstone fort — seat of Mughal emperors. See Diwan-i-Am, Diwan-i-Khas, Sheesh Mahal, and Shah Jahan\'s prison room with his view of the Taj.', category: 'culture', duration: '2.5 hours', location: 'Agra Fort, Rakabganj', cost: [8, 8, 8] },
      { time: '12:00', name: 'Lunch at Pinch of Spice', description: 'Popular restaurant for Mughlai cuisine. Try their butter chicken, dal makhani, and biryani. Or visit Peshawri at ITC Mughal for luxury dining.', category: 'food', duration: '1.5 hours', location: 'Pinch of Spice, Fatehabad Road', cost: [30, 18, 8] },
      { time: '14:00', name: 'Itimad-ud-Daulah (Baby Taj)', description: 'Visit this exquisite white marble tomb on the Yamuna banks — often called the "Baby Taj" or "Jewel Box". Its pietra dura inlay work influenced the Taj Mahal\'s design.', category: 'culture', duration: '1.5 hours', location: 'Itimad-ud-Daulah, east bank', cost: [5, 5, 5] },
      { time: '16:00', name: 'Mehtab Bagh (Moonlight Garden)', description: 'Walk through Mehtab Bagh across the river from the Taj Mahal. The best spot for sunset photos of the Taj with its reflection in the Yamuna.', category: 'nature', duration: '1.5 hours', location: 'Mehtab Bagh, Nagla Devjit', cost: [5, 5, 3] },
      { time: '18:00', name: 'Agra Petha Shopping', description: 'Buy Agra\'s famous Petha (translucent sweet) from Panchhi Petha or Bhagat Halwai. Also try local marble handicrafts and leather goods at Sadar Bazaar.', category: 'shopping', duration: '1.5 hours', location: 'Sadar Bazaar, Agra', cost: [10, 5, 3] },
      { time: '09:00', name: 'Fatehpur Sikri Day Trip', description: 'Visit the UNESCO ghost city (37 km from Agra) built by Akbar in 1571 and abandoned 14 years later due to water scarcity. Buland Darwaza is Asia\'s highest gateway.', category: 'culture', duration: '4 hours', location: 'Fatehpur Sikri', cost: [8, 8, 5] }
    ],
    tips: {
      packing: ['Comfortable shoes for walking on marble', 'Sunscreen and hat', 'Avoid carrying large bags — lockers at Taj', 'Water bottle', 'Camera — but tripods not allowed at Taj'],
      customs: ['Taj Mahal is closed on Fridays', 'Remove shoe covers provided at entry', 'No food inside Taj Mahal complex'],
      budget: ['Visit Taj on free admission days (if any)', 'Hire a shared guide at the gate', 'Skip expensive hotel restaurants for local dhabas'],
      safety: ['Ignore touts at Taj entrance', 'Drink only bottled water', 'Beware of tourist overcharging'],
      transportation: ['Pre-book taxi from Delhi (3-4 hours drive)', 'Auto-rickshaws for within Agra', 'Gatimaan Express from Delhi (fastest train)'],
      bestTimeToVisit: 'October to March. Full moon nights at Taj are magical (tickets available online). Avoid summer (Apr-Jun) — unbearable heat.'
    },
    nearbyPlaces: [
      { name: 'Fatehpur Sikri', distance: '37 km', description: 'Akbar\'s abandoned capital — Buland Darwaza, Panch Mahal, Jama Masjid.', suggestedTime: 'Half day' },
      { name: 'Mathura & Vrindavan', distance: '60 km', description: 'Birthplace of Lord Krishna. Banke Bihari Temple and Prem Mandir.', suggestedTime: 'Full day' },
      { name: 'Bharatpur Bird Sanctuary', distance: '55 km', description: 'Keoladeo National Park — UNESCO site with 350+ bird species.', suggestedTime: 'Half day' }
    ],
    weather: { winter: '5-22°C, pleasant', summer: '28-47°C, extreme heat', monsoon: '25-35°C, moderate rain', best: 'Oct-Mar' }
  },

  amritsar: {
    costTier: 'budget-mid',
    costMultipliers: { accommodation: [800, 2500, 8000], food: [100, 300, 1000], activities: [50, 200, 600] },
    highlights: ['Visit the Golden Temple at all hours', 'Witness the Wagah Border ceremony', 'Feast at authentic Punjabi dhabas', 'Explore the emotional Jallianwala Bagh', 'Walk through the vibrant old city bazaars'],
    activities: [
      { time: '04:30', name: 'Golden Temple (Harmandir Sahib) at Dawn', description: 'Visit the holiest Sikh shrine at dawn for the most serene experience. The gold-plated temple reflecting in the sacred pool (Amrit Sarovar) at sunrise is breathtaking.', category: 'culture', duration: '3 hours', location: 'Golden Temple, Amritsar', cost: [0, 0, 0] },
      { time: '08:00', name: 'Langar at Golden Temple', description: 'Experience the world\'s largest free community kitchen serving 50,000+ meals daily. Sit on the floor with pilgrims and volunteers — a humbling, unforgettable experience.', category: 'food', duration: '1 hour', location: 'Golden Temple Langar Hall', cost: [0, 0, 0] },
      { time: '09:30', name: 'Jallianwala Bagh Memorial', description: 'Visit the site of the 1919 massacre where General Dyer ordered firing on unarmed civilians. See the bullet marks on walls and the Martyrs\' Well. A deeply moving experience.', category: 'culture', duration: '1.5 hours', location: 'Jallianwala Bagh, near Golden Temple', cost: [0, 0, 0] },
      { time: '11:30', name: 'Lunch at Bharawan Da Dhaba', description: 'Eat at the legendary Bharawan Da Dhaba on Lawrence Road — famous since 1912. Try amritsari kulcha with chole, dal makhani, and lassi.', category: 'food', duration: '1.5 hours', location: 'Bharawan Da Dhaba, Lawrence Road', cost: [15, 10, 5] },
      { time: '14:00', name: 'Partition Museum', description: 'Visit India\'s first Partition Museum at Town Hall. Powerful exhibits with personal stories, photographs, and artifacts from the 1947 partition. Deeply emotional.', category: 'culture', duration: '2 hours', location: 'Town Hall, Company Bagh', cost: [5, 5, 3] },
      { time: '16:30', name: 'Wagah Border Ceremony', description: 'Witness the spectacular daily border flag-lowering ceremony between India and Pakistan. The energy, patriotism, and synchronized marching are electrifying. Reach early for seats.', category: 'culture', duration: '3 hours (including travel)', location: 'Wagah Border, 28 km', cost: [0, 0, 0] },
      { time: '20:00', name: 'Golden Temple at Night', description: 'Return to the Golden Temple at night when it\'s illuminated. The reflection of the lit-up temple in the pool is magical. Less crowded and deeply peaceful.', category: 'culture', duration: '1.5 hours', location: 'Golden Temple', cost: [0, 0, 0] },
      { time: '10:00', name: 'Hall Bazaar & Katra Jaimal Singh', description: 'Shop in the vibrant old city markets. Famous for Phulkari embroidery, juttis (Punjabi shoes), Amritsari papad, and dried fruits.', category: 'shopping', duration: '2 hours', location: 'Hall Bazaar, Amritsar', cost: [10, 5, 0] }
    ],
    tips: {
      packing: ['Head covering for Golden Temple (bandanas/scarves available free)', 'Modest clothing', 'Socks (no shoes allowed — marble floor is hot/cold)', 'Keep a plastic bag for shoes', 'Camera but silence in prayer hall'],
      customs: ['Cover your head inside Gurudwara', 'Remove shoes before entering', 'No smoking, alcohol, or tobacco near Golden Temple', 'Wash feet at entrance'], 
      budget: ['Golden Temple langar is free — donate if you wish', 'Free accommodation at Gurudwara sarai', 'Auto-rickshaws are very cheap in Amritsar'],
      safety: ['Very safe city overall', 'Beware of overpriced taxis at railway station', 'Don\'t carry valuables to Wagah Border'],
      transportation: ['Auto-rickshaws for local travel', 'Pre-book taxi for Wagah Border trip', 'Many attractions are walkable from Golden Temple'],
      bestTimeToVisit: 'October to March. Baisakhi (April 14) is the biggest celebration. Summer (May-Jul) is extremely hot (45°C+).'
    },
    nearbyPlaces: [
      { name: 'Wagah Border', distance: '28 km', description: 'India-Pakistan border with daily patriotic flag ceremony.', suggestedTime: '3-4 hours' },
      { name: 'Dalhousie', distance: '200 km', description: 'British-era hill station with churches, pine forests, and views.', suggestedTime: '2-3 days' },
      { name: 'Dharamshala/McLeod Ganj', distance: '210 km', description: 'Dalai Lama\'s residence, Tibetan culture, and Himalayan trekking.', suggestedTime: '2-3 days' }
    ],
    weather: { winter: '2-18°C, foggy and cold', summer: '25-45°C, extremely hot', monsoon: '25-35°C, moderate rain', best: 'Oct-Mar' }
  }
};

// Cost tier configurations for formula-based fallback
const costTiers = {
  'budget': { accommodation: [500, 1500, 4000], food: [100, 300, 800], activities: [50, 150, 500], transport: [50, 100, 300] },
  'budget-mid': { accommodation: [800, 2000, 5000], food: [150, 400, 1200], activities: [100, 300, 800], transport: [80, 200, 500] },
  'mid': { accommodation: [1000, 3000, 10000], food: [150, 500, 1500], activities: [100, 350, 1000], transport: [100, 250, 600] },
  'metro': { accommodation: [1500, 4000, 15000], food: [200, 600, 2000], activities: [150, 400, 1200], transport: [150, 300, 800] },
  'tourist-premium': { accommodation: [1200, 3500, 12000], food: [200, 500, 1500], activities: [200, 500, 1500], transport: [150, 350, 800] },
  'international': { accommodation: [3000, 8000, 25000], food: [500, 1500, 5000], activities: [300, 800, 3000], transport: [200, 500, 1500] }
};

// Match destination to curated data
function getDestinationData(destination) {
  const dest = destination.toLowerCase();
  for (const [key, data] of Object.entries(destinations)) {
    if (dest.includes(key)) {
      return data;
    }
  }
  return null;
}

// Get cost tier for a destination
function getCostTier(destination) {
  const data = getDestinationData(destination);
  if (data && data.costTier) {
    return costTiers[data.costTier] || costTiers['mid'];
  }

  const dest = destination.toLowerCase();
  // Pilgrim / budget destinations
  if (['haridwar', 'puri', 'tirupati', 'shirdi', 'bodh gaya', 'dwarka'].some(p => dest.includes(p))) {
    return costTiers['budget'];
  }
  // Metro cities
  if (['mumbai', 'bangalore', 'bengaluru', 'chennai', 'kolkata', 'hyderabad', 'pune'].some(p => dest.includes(p))) {
    return costTiers['metro'];
  }
  // Tourist premium
  if (['udaipur', 'darjeeling', 'ooty', 'munnar', 'kodaikanal', 'andaman', 'lakshadweep', 'ladakh', 'leh'].some(p => dest.includes(p))) {
    return costTiers['tourist-premium'];
  }
  // International
  if (['paris', 'tokyo', 'london', 'new york', 'dubai', 'singapore', 'bangkok', 'bali', 'rome', 'barcelona'].some(p => dest.includes(p))) {
    return costTiers['international'];
  }

  return costTiers['mid'];
}

module.exports = { destinations, costTiers, getDestinationData, getCostTier };
