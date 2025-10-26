import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());

// ✅ Proper CORS setup for production
const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL,
  'https://imagify.onrender.com',
  'https://imagify-frontend.onrender.com'
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, curl, etc) or same origin
      if (!origin) return callback(null, true);
      
      // In production, if serving from same origin, allow it
      if (process.env.NODE_ENV === 'production') {
        return callback(null, true);
      }
      
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "token"],
    credentials: true,
  })
);

// ✅ Connect MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB!'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Handle MongoDB connection errors
mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB error:', err);
});

// ✅ Routes
app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);

// Serve static files from React app (production)
if (process.env.NODE_ENV === 'production') {
  // Serve static files
  app.use(express.static(path.join(__dirname, '../client/dist')));
  
  // Serve React app for all non-API routes (any remaining routes)
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
} else {
  // Development - just show API status
  app.get('/', (req, res) => {
    res.json({ 
      message: "IMAGIFY API is working 🚀",
      status: "online",
      timestamp: new Date().toISOString()
    });
  });
}

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✅ API available at http://localhost:${PORT}`);
});
