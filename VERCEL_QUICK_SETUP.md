# 🚀 Vercel Quick Setup Guide

## ✅ Your Vercel Deployment is Working!

**URL:** https://mern-stack-project-xi-two.vercel.app/

The frontend is deployed and loading! ✅

---

## ⚙️ Required: Add Environment Variable

### Step 1: Add to Vercel

1. Go to: https://vercel.com/dashboard
2. Select project: **mern-stack-project-xi-two**
3. Go to: **Settings → Environment Variables**
4. Click: **Add New**
5. Add:
   ```
   Key: REACT_APP_API_URL
   Value: https://your-backend-url.onrender.com
   ```
   (Replace with your actual backend URL)
6. Select: **Production, Preview, Development**
7. Click: **Save**
8. **Redeploy** your project

---

## 🔍 Find Your Backend URL

### If Backend is on Render:
- Dashboard → Your Service → Copy URL
- Example: `https://event-platform-abc123.onrender.com`

### If Backend is on Railway:
- Dashboard → Your Service → Copy URL
- Example: `https://event-platform-production.up.railway.app`

### If Backend is NOT Deployed:
1. Deploy backend to Render/Railway first
2. Get the backend URL
3. Add it to Vercel environment variables

---

## ✅ What's Already Done

- ✅ CORS updated to allow Vercel domain
- ✅ Frontend code ready
- ✅ API configuration ready

---

## 🧪 Test After Setup

1. Open: https://mern-stack-project-xi-two.vercel.app/
2. Open Browser Console (F12)
3. Check Network tab for API calls
4. Try registering/logging in
5. Verify API calls go to your backend

---

## 📋 Summary

**In Vercel, add ONLY:**
```
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

That's it! One environment variable. 🎯

