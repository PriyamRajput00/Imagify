# 🎨 IMAGIFY - AI Image Generator

Professional AI-powered image generation platform built with React + Express.

## ✨ Features

- 🤖 **AI Image Generation** using Clipdrop API with advanced prompts
- 💳 **Secure Payment** via Razorpay integration
- 💰 **Credit System** with flexible pricing plans
- 🔐 **JWT Authentication** for secure access
- 📱 **Responsive Design** - works on all devices
- ⚡ **Optimized** for performance and speed
- 🎨 **Professional Quality** images with AI

---

## 🚀 Quick Deploy (5 Minutes)

### 1. Get API Keys
- MongoDB Atlas account
- Razorpay account  
- Clipdrop API key

### 2. Push to GitHub
```bash
git push origin main
```

### 3. Deploy on Render
1. Go to [render.com](https://render.com)
2. Create "Web Service"
3. Connect GitHub repo
4. Add environment variables
5. Deploy!

**See [DEPLOYMENT.md](./DEPLOYMENT.md) for details**

---

## 📦 Local Development

### Install Dependencies
```bash
# Install all dependencies
npm install

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```

### Run Development Server
```bash
# Run both frontend and backend
npm run dev

# Or run separately:
# Backend: cd server && npm run dev
# Frontend: cd client && npm run dev
```

### Environment Setup
Copy `.env.example` files and add your keys:
- `server/.env.example` → `server/.env`
- `client/.env.example` → `client/.env`

---

## 🏗️ Project Structure

```
IMAGIFY/
├── client/           # React frontend
│   ├── src/
│   │   ├── pages/   # Pages (Home, BuyCredit, Result)
│   │   ├── components/
│   │   └── context/
│   └── dist/        # Build output
│
├── server/           # Express backend
│   ├── controllers/ # Business logic
│   ├── routes/      # API routes
│   ├── models/      # Database models
│   └── middlewares/ # Auth middleware
│
├── render.yaml       # Render deployment config
└── package.json     # Root scripts
```

---

## 📝 API Endpoints

### Authentication
- `POST /api/user/register` - Register user
- `POST /api/user/login` - Login user

### User
- `GET /api/user/credits` - Get credits
- `POST /api/user/pay-razor` - Create order
- `POST /api/user/verify-razor` - Verify payment

### Image Generation
- `POST /api/image/generate-image` - Generate AI image

---

## 💳 Credit Plans

| Plan      | Price  | Credits |
|-----------|--------|---------|
| Basic     | $10    | 100     |
| Advanced  | $50    | 500     |
| Business  | $250   | 5000    |

**1 credit = 1 AI-generated image**

---

## 🔧 Tech Stack

### Frontend
- React 19
- React Router 7
- Framer Motion
- Tailwind CSS
- React Toastify

### Backend
- Node.js
- Express 5
- MongoDB
- JWT
- Razorpay
- Clipdrop API

---

## 📄 Scripts

```bash
# Root level
npm run dev          # Run both frontend and backend
npm run build        # Build for production
npm start            # Start production server

# Server
cd server && npm run dev      # Development
cd server && npm start         # Production

# Client  
cd client && npm run dev       # Development
cd client && npm run build     # Build
```

---

## 🔐 Environment Variables

### Server (.env)
```env
PORT=8000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=<random-string>
RAZORPAY_KEY_ID=rzp_...
RAZORPAY_KEY_SECRET=...
CLIPDROP_API=...
CURRENCY=USD
NODE_ENV=production
```

### Client (.env)
```env
VITE_BACKEND_URL=http://localhost:8000
VITE_RAZORPAY_KEY_ID=rzp_...
```

---

## 🚀 Deploy in 3 Steps

1. **Get API keys** (MongoDB, Razorpay, Clipdrop)
2. **Push to GitHub**
3. **Deploy on Render** (see [DEPLOYMENT.md](./DEPLOYMENT.md))

---

## 🔄 Auto-Deploy

Render automatically redeploys when you push to GitHub:
```bash
git push origin main
```

---

## 📊 Monitoring

- Build logs: Check Render dashboard
- Server logs: Check service logs
- Metrics: Monitor performance

---

## 💡 Features

- **Smart Prompt Enhancement** - Automatically improves prompts for better quality
- **Professional Error Handling** - User-friendly error messages
- **Secure Payments** - Razorpay integration
- **JWT Authentication** - Secure user sessions
- **Responsive UI** - Works on all devices

---

## 📞 Support

For issues:
1. Check [DEPLOYMENT.md](./DEPLOYMENT.md)
2. Review [DEPLOY_CHECKLIST.md](./DEPLOY_CHECKLIST.md)
3. Check logs in Render dashboard

---

## 📄 License

ISC

---

## 🎉 Made with ❤️

Built with React + Express + MongoDB
