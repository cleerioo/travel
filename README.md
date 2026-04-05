# ✈️ TravelAI – Intelligent AI Trip Planner

An AI-powered travel planner that generates personalized trip itineraries based on your preferences, built with React, Node.js, and Google Gemini AI.

![TravelAI](https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80)

## ✨ Features

- 🤖 **AI-Powered Itineraries** – Google Gemini generates personalized day-by-day travel plans
- 🎯 **Interest-Based Planning** – Culture, food, adventure, nature, shopping, nightlife & more
- 💰 **Budget Optimization** – Budget, mid-range, or luxury recommendations with cost estimates
- 📍 **Local Insights** – Hidden gems, tourist attractions, and local recommendations
- 📋 **Travel Tips** – Packing lists, local customs, safety tips, and transportation advice
- 🖼️ **Destination Images** – Beautiful Unsplash photos for every destination
- 📱 **Fully Responsive** – Works beautifully on desktop, tablet, and mobile
- 💾 **Export & Share** – Save itineraries as JSON or share with friends

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| AI | Google Gemini 2.5 Flash |
| Images | Unsplash API |
| Styling | Vanilla CSS (Dark Mode, Glassmorphism) |

## 📦 Quick Start

### Prerequisites
- Node.js 18+
- npm

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/travel-ai.git
cd travel-ai
```

### 2. Install dependencies
```bash
# Backend
cd server && npm install

# Frontend
cd ../client && npm install
```

### 3. Configure environment (optional)
```bash
cp server/.env.example server/.env
# Add your API keys for live mode:
# GEMINI_API_KEY=your_key_here
# UNSPLASH_ACCESS_KEY=your_key_here
```

> **Note:** The app works in **Demo Mode** without any API keys! Demo mode generates realistic sample itineraries.

### 4. Run the app
```bash
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend  
cd client && npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3001

## 🔑 API Keys (Optional)

| API | Free Tier | Get Key At |
|-----|-----------|-----------|
| Google Gemini | ✅ Free, no credit card | [aistudio.google.com](https://aistudio.google.com) |
| Unsplash | ✅ 50 req/hr demo | [unsplash.com/developers](https://unsplash.com/developers) |

## 📁 Project Structure

```
travel-ai/
├── client/                    # React + Vite frontend
│   ├── src/
│   │   ├── components/        # UI components
│   │   ├── pages/             # Page components
│   │   ├── styles/            # CSS design system
│   │   └── utils/             # API helpers
│   └── index.html
├── server/                    # Express backend
│   ├── routes/                # API routes
│   ├── services/              # Gemini & Unsplash services
│   └── utils/                 # Prompt engineering
└── README.md
```

## 🎨 Design

- **Dark mode** with premium glassmorphism effects
- **Google Fonts**: Outfit (headings) + Inter (body)  
- **Micro-animations**: Floating orbs, hover effects, loading animations
- **Responsive**: Mobile-first with tablet and desktop breakpoints

## 📄 License

MIT

---

Built with ❤️ and AI
