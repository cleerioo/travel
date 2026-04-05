const imageCache = new Map();

// Curated fallback images for popular destinations
const fallbackImages = {
  default: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80',
  tokyo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&q=80',
  paris: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80',
  london: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&q=80',
  'new york': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200&q=80',
  rome: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&q=80',
  barcelona: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=1200&q=80',
  dubai: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80',
  bali: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80',
  sydney: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1200&q=80',
  bangkok: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=1200&q=80',
  istanbul: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200&q=80',
  singapore: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200&q=80',
  amsterdam: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=1200&q=80',
  kyoto: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80',
  'san francisco': 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200&q=80',
  prague: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=1200&q=80',
  lisbon: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=1200&q=80',
  'rio de janeiro': 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=1200&q=80',
  marrakech: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=1200&q=80',
  maldives: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80',
  santorini: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=80',
  iceland: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=1200&q=80',
  swiss: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=1200&q=80',
  vienna: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=1200&q=80',
  cairo: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=1200&q=80',
  mumbai: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=1200&q=80',
  delhi: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&q=80',
  goa: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80',
  jaipur: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200&q=80',
  kerala: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&q=80',
};

async function getDestinationImage(query) {
  const normalizedQuery = query.toLowerCase().trim();

  // Check cache first
  if (imageCache.has(normalizedQuery)) {
    return imageCache.get(normalizedQuery);
  }

  // Try Unsplash API if key is available
  if (process.env.UNSPLASH_ACCESS_KEY) {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query + ' travel landmark')}&per_page=1&orientation=landscape`,
        {
          headers: {
            'Authorization': `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const imageUrl = data.results[0].urls.regular;
          imageCache.set(normalizedQuery, {
            url: imageUrl,
            photographer: data.results[0].user.name,
            source: 'unsplash'
          });
          return imageCache.get(normalizedQuery);
        }
      }
    } catch (error) {
      console.error('Unsplash API error:', error.message);
    }
  }

  // Fallback to curated images
  const matchedKey = Object.keys(fallbackImages).find(key =>
    normalizedQuery.includes(key) || key.includes(normalizedQuery)
  );

  const imageUrl = matchedKey ? fallbackImages[matchedKey] : fallbackImages.default;
  const result = { url: imageUrl, photographer: 'Unsplash', source: 'fallback' };
  imageCache.set(normalizedQuery, result);
  return result;
}

module.exports = { getDestinationImage };
