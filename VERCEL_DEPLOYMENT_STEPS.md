# 🚀 Vercel Deployment - Step by Step

## ✅ Quick Setup for Vercel

### Step 1: Push Code to GitHub

1. Make sure all your code is committed
2. Push to GitHub repository

### Step 2: Deploy to Vercel

1. **Go to:** https://vercel.com
2. **Sign up/Login** (use GitHub account)
3. **Click:** "Add New..." → "Project"
4. **Import your GitHub repository**
5. **Configure Project:**
   - **Framework Preset:** Create React App (or Vite if you're using it)
   - **Root Directory:** `client` (important!)
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
   - **Install Command:** `npm install`

### Step 3: Add Environment Variable

**Before deploying, add this environment variable:**

1. In Vercel project settings, go to **Environment Variables**
2. Click **Add New**
3. Add:
   ```
   Key: REACT_APP_API_URL
   Value: https://your-backend-url.onrender.com
   ```
   (Replace with your actual backend URL)

4. **Select environments:** Production, Preview, Development
5. **Save**

### Step 4: Deploy

1. Click **Deploy**
2. Wait for build to complete (2-5 minutes)
3. Your app will be live!

---

## ⚠️ Important: Backend Must Be Deployed First!

**You need a backend URL before deploying to Vercel.**

### If Backend is NOT Deployed:

1. **Deploy backend to Render/Railway first**
2. **Get the backend URL** (e.g., `https://xxx.onrender.com`)
3. **Then add it to Vercel environment variables**
4. **Redeploy Vercel**

---

## 📋 Environment Variables for Vercel

### ✅ Add This:
```
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

### ❌ DO NOT Add These (Backend Only):
- `SUPABASE_SERVICE_ROLE_KEY` - Server-side only!
- `JWT_SECRET` - Server-side only!
- `SUPABASE_KEY` - Server-side only!
- `PORT` - Not needed

---

## 🔧 Vercel Configuration

### Root Directory
```
client
```

### Build Settings
- **Build Command:** `npm run build`
- **Output Directory:** `build`
- **Install Command:** `npm install`

---

## ✅ After Deployment

1. **Test your app:** Open the Vercel URL
2. **Check console:** Open browser DevTools (F12)
3. **Verify API calls:** Check Network tab
4. **Test features:** Register, login, create events

---

## 🐛 Troubleshooting

### Issue: API calls fail
**Solution:** Make sure `REACT_APP_API_URL` is set correctly

### Issue: CORS errors
**Solution:** Backend CORS should allow your Vercel domain

### Issue: Build fails
**Solution:** Check build logs in Vercel dashboard

---

## 📝 Quick Checklist

- [ ] Code pushed to GitHub
- [ ] Backend deployed (Render/Railway)
- [ ] Backend URL obtained
- [ ] `REACT_APP_API_URL` added to Vercel
- [ ] Root directory set to `client`
- [ ] Deployed successfully
- [ ] Tested the app

