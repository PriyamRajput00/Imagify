# ✅ IMAGIFY Deployment Checklist

## Before You Deploy

### 1. Get All API Keys ✓
- [ ] Create MongoDB Atlas account
- [ ] Create free MongoDB cluster
- [ ] Get MongoDB connection string
- [ ] Create Razorpay account
- [ ] Get Razorpay Key ID and Secret
- [ ] Get Clipdrop API key

### 2. Test Locally ✓
- [ ] Backend runs on http://localhost:8000
- [ ] Frontend runs on http://localhost:5173
- [ ] User registration works
- [ ] User login works
- [ ] Image generation works
- [ ] Payment flow works

### 3. Prepare Repository ✓
- [ ] All changes committed
- [ ] Push to GitHub
- [ ] Repository is public or Render has access

---

## Deploy to Render

### Step 1: Deploy Backend
1. [ ] Go to [render.com](https://render.com)
2. [ ] Sign up/Login
3. [ ] Click "New +" → "Web Service"
4. [ ] Connect GitHub repository
5. [ ] Configure backend service:
   - Name: `imagify-backend`
   - Build: `cd server && npm install`
   - Start: `cd server && npm start`
   - Plan: Free

6. [ ] Add environment variables:
   ```
   NODE_ENV=production
   PORT=8000
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=<random-secret-32-chars>
   RAZORPAY_KEY_ID=<your-key>
   RAZORPAY_KEY_SECRET=<your-secret>
   CLIPDROP_API=<your-api-key>
   CURRENCY=USD
   FRONTEND_URL=https://imagify-frontend.onrender.com
   ```

7. [ ] Create and wait for deployment
8. [ ] Test: Visit https://your-backend.onrender.com
9. [ ] Should see: `{"message":"IMAGIFY API is working 🚀"}`

### Step 2: Deploy Frontend
1. [ ] Create another Web Service
2. [ ] Connect same GitHub repository
3. [ ] Configure frontend service:
   - Name: `imagify-frontend`
   - Build: `cd client && npm install && npm run build`
   - Start: `cd client && npm run preview`
   - Plan: Free

4. [ ] Add environment variables:
   ```
   VITE_BACKEND_URL=https://imagify-backend.onrender.com
   VITE_RAZORPAY_KEY_ID=<your-razorpay-key-id>
   ```

5. [ ] Create and wait for deployment
6. [ ] Test: Visit https://your-frontend.onrender.com

### Step 3: Update CORS
1. [ ] Go to backend service settings
2. [ ] Update `FRONTEND_URL` with actual URL
3. [ ] Redeploy backend

---

## Post-Deployment Tests ✓

### Backend Tests
- [ ] Visit backend URL → Should show API status
- [ ] Test registration endpoint
- [ ] Test login endpoint
- [ ] Test image generation (with auth)

### Frontend Tests
- [ ] Visit frontend URL → Should show homepage
- [ ] Register new account
- [ ] Login with account
- [ ] View credits
- [ ] Buy credits
- [ ] Generate image
- [ ] Payment works

---

## Environment Variables Summary

### Backend Variables
```
✓ NODE_ENV=production
✓ PORT=8000
✓ MONGODB_URI=mongodb+srv://...
✓ JWT_SECRET=<32-char-random-string>
✓ RAZORPAY_KEY_ID=rzp_live_...
✓ RAZORPAY_KEY_SECRET=...
✓ CLIPDROP_API=...
✓ CURRENCY=USD
✓ FRONTEND_URL=https://imagify-frontend.onrender.com
```

### Frontend Variables
```
✓ VITE_BACKEND_URL=https://imagify-backend.onrender.com
✓ VITE_RAZORPAY_KEY_ID=rzp_live_...
```

---

## Common Issues & Solutions

### Issue: "MongoDB connection error"
**Solution**: Check MongoDB URI, ensure network access allows all IPs (0.0.0.0/0)

### Issue: "CORS error"
**Solution**: Update `FRONTEND_URL` in backend environment variables

### Issue: "Invalid API key"
**Solution**: Check all API keys, ensure no extra spaces

### Issue: "Build failed"
**Solution**: Check build logs, ensure all dependencies are in package.json

---

## 🎉 Success!
If all tests pass, your app is live! 🚀

- **Frontend**: https://imagify-frontend.onrender.com
- **Backend**: https://imagify-backend.onrender.com

---

## 📞 Need Help?
1. Check build logs in Render dashboard
2. Check server logs for errors
3. Test API endpoints with Postman/curl
4. Verify all environment variables are set

