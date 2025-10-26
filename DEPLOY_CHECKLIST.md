# ✅ IMAGIFY Deployment Checklist

## Before You Start

### 1. Get All API Keys ✓
- [ ] Create MongoDB Atlas account
- [ ] Create free MongoDB cluster  
- [ ] Get MongoDB connection string
- [ ] Create Razorpay account
- [ ] Get Razorpay Key ID
- [ ] Get Razorpay Key Secret
- [ ] Get Clipdrop API key

### 2. Test Locally First ✓
- [ ] Backend runs: `cd server && npm run dev`
- [ ] Frontend runs: `cd client && npm run dev`
- [ ] Can register user
- [ ] Can login
- [ ] Can generate image
- [ ] Everything works locally

---

## Deploy to Render (Single Service)

### Step 1: Push to GitHub ✓
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```
- [ ] All files committed
- [ ] Pushed to GitHub
- [ ] Repository is accessible

### Step 2: Create Render Service ✓
1. [ ] Go to render.com
2. [ ] Sign up/Login with GitHub
3. [ ] Click "New +" → "Web Service"
4. [ ] Connect GitHub repository
5. [ ] Select repository

### Step 3: Configure Service ✓
- [ ] Name: `imagify`
- [ ] Runtime: `Node`
- [ ] Build Command: `npm run build`
- [ ] Start Command: `npm start`
- [ ] Plan: `Free`

### Step 4: Add Environment Variables ✓

Add these EXACT variables:

```env
NODE_ENV = production
PORT = 8000
MONGODB_URI = mongodb+srv://...
JWT_SECRET = <generate-32-char-random>
RAZORPAY_KEY_ID = rzp_live_xxxxx
RAZORPAY_KEY_SECRET = xxxxx
CLIPDROP_API = xxxxx
CURRENCY = USD
```

- [ ] All variables added
- [ ] No extra spaces
- [ ] Values are correct

### Step 5: Deploy ✓
- [ ] Click "Create Web Service"
- [ ] Watch build progress
- [ ] Build completes successfully
- [ ] Service is "Live"

### Step 6: Get Your URL ✓
- [ ] Copy deployed URL
- [ ] Example: `https://imagify.onrender.com`

---

## Post-Deployment Tests ✓

### Basic Tests
- [ ] Visit your URL
- [ ] Homepage loads
- [ ] No console errors

### Registration/Login
- [ ] Can click "Get Started"
- [ ] Registration form shows
- [ ] Can register new user
- [ ] Can login with credentials

### Credits & Payment
- [ ] Can view credits
- [ ] Can go to buy credits page
- [ ] Payment options show
- [ ] Test payment (test mode)

### Image Generation
- [ ] Can enter prompt
- [ ] Can click generate
- [ ] Image generates successfully
- [ ] Can download image

---

## Environment Variables Checklist ✓

```
✓ NODE_ENV=production
✓ PORT=8000
✓ MONGODB_URI=mongodb+srv://...
✓ JWT_SECRET=<32-chars>
✓ RAZORPAY_KEY_ID=rzp_...
✓ RAZORPAY_KEY_SECRET=...
✓ CLIPDROP_API=...
✓ CURRENCY=USD
```

---

## Common Issues & Solutions

### Issue: Build fails at npm install
**Solution**: Check all dependencies are in package.json

### Issue: MongoDB connection error  
**Solution**: 
- Verify MONGODB_URI is correct
- Check Network Access allows all IPs (0.0.0.0/0)
- Verify username/password

### Issue: Blank white page
**Solution**: 
- Check browser console for errors
- Verify build completed successfully
- Check server logs

### Issue: API calls fail
**Solution**:
- All API routes should start with `/api`
- Check CORS settings
- Verify environment variables

### Issue: Payment doesn't work
**Solution**:
- Check RAZORPAY keys are correct
- Verify VITE_RAZORPAY_KEY_ID in client
- Test in Razorpay test mode first

---

## 🎉 Success Criteria

Your deployment is successful if:
- ✅ App loads without errors
- ✅ Can register new users
- ✅ Can login
- ✅ Can generate images
- ✅ Credits system works
- ✅ Payment integration works

---

## 🔄 Updates & Redeploys

To update your app:
```bash
# Make changes locally
git add .
git commit -m "Update feature"
git push origin main

# Render auto-deploys on push
# Wait 5-10 minutes for deployment
```

---

## 📊 Monitoring

- Check "Logs" tab for errors
- Check "Metrics" for performance
- Check "Events" for deployment history

---

## 🚀 You're Done!

Your app is live at: `https://imagify.onrender.com`

Enjoy your AI Image Generator! 🎨
