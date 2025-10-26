# 🎨 IMAGIFY - AI Image Generator

A professional AI-powered image generation platform built with React, Express, and powered by Clipdrop API.

## ✨ Features

- 🤖 AI Image Generation using advanced prompts
- 💳 Secure Payment Integration (Razorpay)
- 💰 Flexible Credit System
- 🔐 JWT Authentication
- 📱 Responsive Design
- ⚡ Fast & Optimized
- 🎨 Professional Quality Images

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- API Keys (Razorpay, Clipdrop)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd IMAGIFY
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Edit .env with your credentials
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd client
   npm install
   cp .env.example .env
   # Edit .env with your API URLs
   npm run dev
   ```

4. **Access the app**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:8000

## 📦 Tech Stack

### Frontend
- React 19
- React Router
- Framer Motion
- Tailwind CSS
- Axios
- React Toastify

### Backend
- Node.js
- Express 5
- MongoDB
- JWT Authentication
- Razorpay Integration
- Clipdrop API

## 🌐 Deployment

### Deploy to Render

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

**Quick Steps:**
1. Push to GitHub
2. Create services on Render
3. Configure environment variables
4. Deploy!

### Environment Variables

**Backend** (`server/.env`):
```env
PORT=8000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret
RAZORPAY_KEY_ID=rzp_...
RAZORPAY_KEY_SECRET=...
CLIPDROP_API=...
CURRENCY=USD
FRONTEND_URL=https://your-app.onrender.com
```

**Frontend** (`client/.env`):
```env
VITE_BACKEND_URL=https://your-backend.onrender.com
VITE_RAZORPAY_KEY_ID=rzp_...
```

## 📝 API Endpoints

### User
- `POST /api/user/register` - Register new user
- `POST /api/user/login` - Login user
- `GET /api/user/credits` - Get user credits
- `POST /api/user/pay-razor` - Create payment order
- `POST /api/user/verify-razor` - Verify payment

### Image
- `POST /api/image/generate-image` - Generate AI image

## 💳 Credits System

- **Basic Plan**: $10 - 100 credits
- **Advanced Plan**: $50 - 500 credits
- **Business Plan**: $250 - 5000 credits

1 credit = 1 AI-generated image

## 🔐 Security

- JWT-based authentication
- Bcrypt password hashing
- CORS protection
- Secure payment processing
- Input validation
- Error handling

## 📄 License

ISC

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open an issue on GitHub.

---

Made with ❤️ using React + Express

