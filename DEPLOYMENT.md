# IMAGIFY - Deployment Guide (Single Service)

## 🚀 Deploy to Render (Frontend + Backend Together)

### Prerequisites
1. MongoDB Atlas account (free tier available)
2. Razorpay account
3. Clipdrop API key
4. Render account (free tier available)
5. GitHub account

---

## Step 1: Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Go to "Network Access" → Add IP Address → Allow access from anywhere (0.0.0.0/0)
4. Go to "Database Access" → Create database user
5. Copy connection string (replace `<password>` with actual password)
6. Example: `mongodb+srv://username:password@cluster.mongodb.net/imagify?retryWrites=true&w=majority`

---

## Step 2: Get API Keys

### Razorpay
1. Sign up at [Razorpay](https://razorpay.com)
2. Go to Dashboard → API Keys
3. Copy `Key ID` (starts with `rzp_`)
4. Copy `Key Secret`
5. Save both for environment variables

### Clipdrop
1. Go to [Clipdrop](https://clipdrop.co)
2. Sign up for API access
3. Get your API key from dashboard
4. Save for environment variables

---

## Step 3: Push to GitHub

```bash
# Navigate to project
cd /Users/priyamrajput/Desktop/IMAGIFY

# Add all files
git add .

# Commit changes
git commit -m "Ready for deployment"

# Push to GitHub
git push origin main
```

---

## Step 4: Deploy to Render

### Create Single Web Service

1. **Go to Render Dashboard**
   - Visit [render.com](https://render.com)
   - Sign up/Login with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your repository

3. **Configure Service**
   ```
   Name: imagify
   Region: Choose closest to you
   Branch: main
   Root Directory: (leave empty)
   Runtime: Node
   Build Command: npm install && cd server && npm install && cd ../client && npm install && npm run build
   Start Command: cd server && npm start
   Plan: Free
   ```

4. **Add Environment Variables** (Click "Advanced")
   Add these variables:
   ```
   NODE_ENV = production
   PORT = 8000
   MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/imagify?retryWrites=true&w=majority
   JWT_SECRET = <generate-random-string-32-chars>
   RAZORPAY_KEY_ID = rzp_live_xxxxx
   RAZORPAY_KEY_SECRET = xxxxx
   CLIPDROP_API = xxxxx
   CURRENCY = USD
   ```

5. **Create Web Service**
   - Click "Create Web Service"
   - Wait for build to complete (5-10 minutes)
   - Build logs will show progress

6. **Get Your URL**
   - Once deployed, copy the URL (e.g., `https://imagify.onrender.com`)
   - Your app is live! 🎉

---

## Step 5: Test Your Deployment

### Backend API
Visit: `https://your-app.onrender.com/api`
Should see API routes working

### Frontend
Visit: `https://your-app.onrender.com`
Should see your app homepage

### Test Features
- [ ] Register new account
- [ ] Login
- [ ] View credits
- [ ] Buy credits (test mode)
- [ ] Generate image

---

## 🔧 Troubleshooting

### Build Failed
**Error**: "Build command failed"
- **Solution**: Check build logs in Render dashboard
- **Check**: All dependencies are in package.json
- **Check**: Node version is compatible

### MongoDB Connection Error
**Error**: "Cannot connect to MongoDB"
- **Solution**: Check MONGODB_URI in environment variables
- **Check**: Network Access allows all IPs (0.0.0.0/0)
- **Check**: Username/password are correct

### CORS Error
**Error**: "CORS policy blocked"
- **Solution**: App serves frontend and backend together, CORS should work automatically
- **Check**: All routes start with `/api`

### API Not Working
**Error**: "Cannot fetch from API"
- **Solution**: Check environment variables are set
- **Check**: Server logs for specific errors
- **Check**: API routes are correct (`/api/user`, `/api/image`)

---

## 📝 Environment Variables Reference

All variables needed in Render:

```
✓ NODE_ENV = production
✓ PORT = 8000
✓ MONGODB_URI = mongodb+srv://...
✓ JWT_SECRET = <32+ random characters>
✓ RAZORPAY_KEY_ID = rzp_live_...
✓ RAZORPAY_KEY_SECRET = ...
✓ CLIPDROP_API = ...
✓ CURRENCY = USD
```

---

## 🎉 Success Checklist

- [ ] Code pushed to GitHub
- [ ] Render service created
- [ ] Environment variables added
- [ ] Build completed successfully
- [ ] Frontend loads at URL
- [ ] Can register new user
- [ ] Can login
- [ ] Can generate images
- [ ] Payment integration works

---

## 🔄 Auto-Deploy

Render automatically redeploys when you push to GitHub:
```bash
git add .
git commit -m "Update feature"
git push origin main
```

---

## 💡 Pro Tips

1. **Free Tier Limits**: 
   - Spins down after 15 min inactivity
   - First request after sleep takes 30-60 seconds

2. **Environment Variables**: 
   - Never commit .env files
   - Use Render's environment settings

3. **Logs**: 
   - Check "Logs" tab for debugging
   - Real-time log streaming available

4. **Monitoring**: 
   - Render provides free monitoring
   - Check "Metrics" for performance

---

## 📞 Support

If you encounter issues:
1. Check Render build logs
2. Check Render service logs
3. Test API endpoints with curl/Postman
4. Verify all environment variables

---

## 🚀 Your App is Live!

Visit: `https://your-app.onrender.com`

Enjoy your AI Image Generator! 🎨
