# IMAGIFY - Deployment Guide

## 🚀 Deploy to Render

### Prerequisites
1. MongoDB Atlas account (free tier available)
2. Razorpay account
3. Clipdrop API key
4. Render account (free tier available)

---

## Step 1: Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Go to "Network Access" → Add IP Address → Allow access from anywhere (0.0.0.0/0)
4. Go to "Database Access" → Create database user
5. Copy connection string (replace `<password>` with actual password)
6. Save this MongoDB URI for later

---

## Step 2: Get API Keys

### Razorpay
1. Sign up at [Razorpay](https://razorpay.com)
2. Go to Dashboard → API Keys
3. Get your `Key ID` and `Key Secret`
4. Save for environment variables

### Clipdrop
1. Go to [Clipdrop](https://clipdrop.co)
2. Sign up for API access
3. Get your API key from dashboard
4. Save for environment variables

---

## Step 3: Deploy Backend to Render

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Go to Render Dashboard**
   - Visit [render.com](https://render.com)
   - Sign up/Login

3. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `imagify-backend`
     - **Runtime**: Node
     - **Build Command**: `cd server && npm install`
     - **Start Command**: `cd server && npm start`
     - **Plan**: Free

4. **Add Environment Variables**
   ```
   NODE_ENV=production
   PORT=8000
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=<generate-a-random-secret>
   RAZORPAY_KEY_ID=<your-razorpay-key>
   RAZORPAY_KEY_SECRET=<your-razorpay-secret>
   CLIPDROP_API=<your-clipdrop-key>
   CURRENCY=USD
   FRONTEND_URL=https://imagify-frontend.onrender.com
   ```

5. **Save & Deploy**
   - Click "Create Web Service"
   - Wait for deployment
   - Copy your backend URL (e.g., `https://imagify-backend.onrender.com`)

---

## Step 4: Deploy Frontend to Render

1. **Create New Web Service** (different from backend)
   - Click "New +" → "Web Service"
   - Connect same GitHub repository
   - Configure:
     - **Name**: `imagify-frontend`
     - **Runtime**: Node
     - **Build Command**: `cd client && npm install && npm run build`
     - **Start Command**: `cd client && npm run preview`
     - **Plan**: Free

2. **Add Environment Variables**
   ```
   VITE_BACKEND_URL=https://imagify-backend.onrender.com
   VITE_RAZORPAY_KEY_ID=<your-razorpay-key-id>
   ```

3. **Save & Deploy**
   - Click "Create Web Service"
   - Wait for deployment
   - Copy your frontend URL

---

## Step 5: Update CORS Settings

1. Go to backend service on Render
2. Go to "Environment"
3. Update `FRONTEND_URL` with your actual frontend URL
4. Re-deploy

---

## Step 6: Test Your Deployment

### Backend
Visit: `https://your-backend.onrender.com`
Should see: `{"message":"IMAGIFY API is working 🚀","status":"online",...}`

### Frontend
Visit: `https://your-frontend.onrender.com`
Should see: Your application homepage

---

## 🔧 Troubleshooting

### Backend Issues

**Problem**: "MongoDB connection error"
- **Solution**: Check MongoDB URI in environment variables
- **Check**: Network Access allows all IPs (0.0.0.0/0)

**Problem**: "Invalid API key"
- **Solution**: Verify all API keys are correct
- **Check**: No extra spaces in environment variables

**Problem**: "CORS error"
- **Solution**: Update `FRONTEND_URL` in backend environment variables
- **Check**: Frontend URL matches exactly (no trailing slash)

### Frontend Issues

**Problem**: "Connection failed"
- **Solution**: Update `VITE_BACKEND_URL` in frontend environment variables
- **Check**: Backend is deployed and running

**Problem**: "Blank page"
- **Solution**: Check browser console for errors
- **Check**: All environment variables are set

---

## 📝 Environment Variables Checklist

### Backend (.env)
```
✓ NODE_ENV=production
✓ PORT=8000
✓ MONGODB_URI=mongodb+srv://...
✓ JWT_SECRET=<random-string>
✓ RAZORPAY_KEY_ID=rzp_...
✓ RAZORPAY_KEY_SECRET=...
✓ CLIPDROP_API=...
✓ CURRENCY=USD
✓ FRONTEND_URL=https://imagify-frontend.onrender.com
```

### Frontend (.env)
```
✓ VITE_BACKEND_URL=https://imagify-backend.onrender.com
✓ VITE_RAZORPAY_KEY_ID=rzp_...
```

---

## 🎉 Success!

Your app is now live at:
- **Frontend**: https://your-frontend.onrender.com
- **Backend**: https://your-backend.onrender.com

---

## 💡 Pro Tips

1. **Auto-deploy**: Render auto-deploys on git push
2. **Logs**: Check build logs in Render dashboard
3. **Monitoring**: Use Render's built-in monitoring
4. **SSL**: Automatic HTTPS on Render
5. **Sleep mode**: Free plan spins down after inactivity

---

## 🔐 Security Notes

1. Never commit `.env` files
2. Use strong JWT secrets
3. Keep API keys secure
4. Regularly rotate secrets
5. Use environment variables only

