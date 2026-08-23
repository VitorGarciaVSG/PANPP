# DataSell & RentalIQ - SaaS Applications Setup Guide

Complete guide to setup, develop, and deploy both SaaS applications.

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Environment Setup](#environment-setup)
3. [Running Locally](#running-locally)
4. [Deployment](#deployment)
5. [Architecture](#architecture)
6. [API Reference](#api-reference)

## 🎯 Project Overview

Two complete SaaS applications:

### 1. **DataSell** - E-commerce Analytics Platform
- Port: Frontend (3000), Backend (5000)
- Use Case: Analytics for e-commerce sellers on Mercado Libre & Shopee
- Key Features: Real-time dashboards, price recommendations, profit margins

### 2. **RentalIQ** - Dynamic Pricing System for Vacation Rentals
- Port: Frontend (3001), Backend (5001)
- Use Case: Price optimization for Airbnb & Booking.com properties
- Key Features: AI pricing, occupancy tracking, booking management

## 🔧 Environment Setup

### Prerequisites
- Node.js 16+ 
- npm or yarn
- MongoDB (local or Atlas)
- Git

### MongoDB Setup

**Option 1: Local MongoDB**
```bash
# macOS (Homebrew)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Linux (Ubuntu)
sudo apt-get install -y mongodb
sudo systemctl start mongod

# Windows
# Download from https://www.mongodb.com/try/download/community
```

**Option 2: MongoDB Atlas (Cloud)**
```bash
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Add to .env file
```

### Environment Variables

**DataSell Backend (.env)**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/datasell
JWT_SECRET=your_secret_key_datasell_123
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000

# Integrations (configure later)
MELI_CLIENT_ID=your_meli_id
MELI_CLIENT_SECRET=your_meli_secret
SHOPEE_PARTNER_ID=your_shopee_id
SHOPEE_PARTNER_KEY=your_shopee_key
```

**RentalIQ Backend (.env)**
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/rentaliq
JWT_SECRET=your_secret_key_rentaliq_456
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3001

# Integrations (configure later)
AIRBNB_API_KEY=your_airbnb_key
BOOKING_PARTNER_ID=your_booking_id
BOOKING_PARTNER_KEY=your_booking_key
ML_SERVER_URL=http://localhost:5002
```

## 🚀 Running Locally

### DataSell

**Terminal 1: Backend**
```bash
cd datasell/backend
npm install
npm run dev
# Server running on http://localhost:5000
```

**Terminal 2: Frontend**
```bash
cd datasell/frontend
npm install
npm run dev
# App available on http://localhost:3000
```

### RentalIQ

**Terminal 3: Backend**
```bash
cd rentaliq/backend
npm install
npm run dev
# Server running on http://localhost:5001
```

**Terminal 4: Frontend**
```bash
cd rentaliq/frontend
npm install
npm run dev
# App available on http://localhost:3001
```

## 📝 First Steps

1. **Create test accounts:**
   - Go to http://localhost:3000/register (DataSell)
   - Go to http://localhost:3001/register (RentalIQ)
   - Fill registration form
   - Login to access dashboard

2. **Test API endpoints:**
   ```bash
   # DataSell
   curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@test.com","password":"password123"}'

   # RentalIQ
   curl -X POST http://localhost:5001/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@test.com","password":"password123"}'
   ```

## 🌐 Deployment

### Frontend Deployment (Vercel)

**DataSell Frontend**
```bash
cd datasell/frontend
npm install -g vercel
vercel login
vercel --prod
```

**RentalIQ Frontend**
```bash
cd rentaliq/frontend
vercel --prod
```

Environment variables on Vercel:
- VITE_API_URL=https://datasell-api.railway.app (or your backend URL)

### Backend Deployment (Railway)

**Create new project on Railway.app**

**DataSell Backend**
```bash
cd datasell/backend
railway login
railway init
railway link
railway up
```

**RentalIQ Backend**
```bash
cd rentaliq/backend
railway login
railway init
railway link
railway up
```

Environment variables on Railway:
- MONGODB_URI: (set to Atlas URI)
- JWT_SECRET: (your secret)
- FRONTEND_URL: (your Vercel URL)

## 🏗️ Architecture

### Technology Stack

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs Password Hashing

**Frontend:**
- React 18
- Vite (build tool)
- React Router (navigation)
- Axios (HTTP client)
- Zustand (state management)

### Database Schema

**User Model:**
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String (RentalIQ only),
  company: String (RentalIQ only),
  plan: 'FREE' | 'PRO' | 'ENTERPRISE',
  pricingStrategy: 'AGGRESSIVE' | 'BALANCED' | 'CONSERVATIVE' (RentalIQ),
  tokens: {
    // 3rd party API integrations
  },
  createdAt: Date,
  updatedAt: Date
}
```

### API Response Format

**Success:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "data": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "plan": "FREE"
  }
}
```

**Error:**
```json
{
  "error": "Email already exists"
}
```

## 📚 API Reference

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "passwordConfirm": "SecurePass123",
  "phone": "(11) 99999-9999",      // RentalIQ only
  "company": "My Company"           // RentalIQ only
}

Response: 201
{
  "success": true,
  "token": "...",
  "data": { user object }
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}

Response: 200
{
  "success": true,
  "token": "...",
  "data": { user object }
}
```

#### Get Current User
```
GET /api/auth/me
Authorization: Bearer {token}

Response: 200
{
  "success": true,
  "data": { user object }
}
```

#### Update Pricing Strategy (RentalIQ only)
```
PATCH /api/auth/update-strategy
Authorization: Bearer {token}
Content-Type: application/json

{
  "pricingStrategy": "AGGRESSIVE"
}

Response: 200
{
  "success": true,
  "data": { updated user object }
}
```

### Dashboard Endpoints

#### Get Metrics
```
GET /api/dashboard/metrics
Authorization: Bearer {token}

Response: 200
{
  "success": true,
  "data": {
    "totalSales": 15250,           // DataSell
    "totalProducts": 48,
    "averageTicket": 318.75,
    "monthlyGrowth": 23,
    
    // OR RentalIQ
    "totalRevenue": 28450,
    "occupancyRate": 78,
    "totalBookings": 24,
    "avgPricePerNight": 185.50
  }
}
```

#### Get Pricing Suggestions (RentalIQ)
```
GET /api/dashboard/pricing-suggestions
Authorization: Bearer {token}

Response: 200
{
  "success": true,
  "data": {
    "currentPrice": 185.50,
    "suggestedPrice": 195.75,
    "confidence": 0.87,
    "reasoning": "High demand on weekends...",
    "occupancyTrend": "upward"
  }
}
```

## 🔄 Development Workflow

1. **Create feature branch:**
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Make changes:**
   - Backend: `datasell/backend/src/` or `rentaliq/backend/src/`
   - Frontend: `datasell/frontend/src/` or `rentaliq/frontend/src/`

3. **Test locally:**
   - Run both frontend and backend
   - Test in browser
   - Check API endpoints

4. **Commit and push:**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   git push -u origin feature/new-feature
   ```

5. **Deploy:**
   - Frontend → Vercel
   - Backend → Railway

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Check if MongoDB is running
mongosh # connect to shell
# If not running, start it:
brew services start mongodb-community  # macOS
sudo systemctl start mongod            # Linux
```

### Port Already in Use
```bash
# Kill process on specific port
lsof -ti:5000 | xargs kill -9  # Port 5000
lsof -ti:3000 | xargs kill -9  # Port 3000
```

### CORS Error
```
Issue: "Access to XMLHttpRequest has been blocked by CORS"
Solution: Check FRONTEND_URL in backend .env matches your frontend URL
```

### JWT Token Invalid
```
Issue: "Token inválido"
Solution: 
- Clear localStorage in browser DevTools
- Re-login
- Check JWT_SECRET matches in frontend fetch calls
```

## 📊 Progress Tracking

### Phase 1: Foundation ✅
- [x] Project setup
- [x] Backend authentication
- [x] Frontend auth components
- [x] Database schemas
- [x] React Router setup

### Phase 2: Core Features (IN PROGRESS)
- [ ] Product models (DataSell)
- [ ] Property models (RentalIQ)
- [ ] Dashboard with real data
- [ ] CRUD operations

### Phase 3: Integrations
- [ ] Mercado Libre API (DataSell)
- [ ] Shopee API (DataSell)
- [ ] Airbnb API (RentalIQ)
- [ ] Booking.com API (RentalIQ)

### Phase 4: AI & Analytics
- [ ] ML model deployment
- [ ] Price recommendations
- [ ] Advanced analytics
- [ ] Predictive insights

### Phase 5: Monetization
- [ ] Stripe integration
- [ ] Subscription system
- [ ] Payment webhooks
- [ ] Usage tracking

### Phase 6: Production
- [ ] Final testing
- [ ] Vercel deployment
- [ ] Railway deployment
- [ ] Monitoring & logging

## 📞 Support

For issues or questions:
1. Check this guide
2. Review project README files
3. Check logs in terminal
4. Check browser DevTools console

---

**Last Updated:** August 23, 2024
**Developed by:** Claude Code
