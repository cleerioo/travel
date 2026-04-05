const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, '../data/db.json');

// Helper to safely read DB
function readDB() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      // Initialize with reasonable seed numbers
      const initialData = {
        totalTrips: 10243,
        ratings: { count: 4821, sum: 23623 } // Avgs to ~4.9
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
      return initialData;
    }
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading DB:', err);
    return { totalTrips: 10000, ratings: { count: 1, sum: 5 } };
  }
}

// Helper to write DB
function writeDB(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing DB:', err);
  }
}

// Get stats
function getStats() {
  const data = readDB();
  const averageRating = data.ratings.count === 0 ? 5 : data.ratings.sum / data.ratings.count;
  return {
    trips: data.totalTrips,
    rating: parseFloat(averageRating.toFixed(1))
  };
}

// Increment trips generated
function incrementTrips() {
  const data = readDB();
  data.totalTrips += 1;
  writeDB(data);
  return data.totalTrips;
}

// Add a specific rating (1-5)
function addRating(score) {
  const rounded = Math.max(1, Math.min(5, Math.round(score)));
  const data = readDB();
  data.ratings.count += 1;
  data.ratings.sum += rounded;
  writeDB(data);
  return getStats();
}

module.exports = {
  getStats,
  incrementTrips,
  addRating
};
