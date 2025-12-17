# 🔍 How to Find Your Backend URL

## Current Status

Your backend is currently running **locally** at:
```
http://localhost:5000
```

**⚠️ This won't work for Vercel!** Vercel needs a public URL.

---

## 🚀 Option 1: Deploy Backend to Render (Recommended)

### Step 1: Deploy to Render

1. **Go to:** https://render.com
2. **Sign up/Login**
3. **Click:** "New +" → "Web Service"
4. **Connect your GitHub repository**
5. **Configure:**
   - **Name:** `event-platform-backend` (or any name)
   - **Root Directory:** `server`
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free

6. **Add Environment Variables:**
   ```
   PORT=5000
   JWT_SECRET=event_platform_jwt_secret_key_2024
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeWF3dml1Y2hva3Vwem1rcmZoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTk3NTY1OCwiZXhwIjoyMDgxNTUxNjU4fQ.ROJY-TA1IFuiMqZc6X95hQi3wdQuYd7Tb4bLD90xK5A
   NODE_ENV=production
   ```

7. **Click:** "Create Web Service"

8. **Wait for deployment** (5-10 minutes)

9. **Get your URL:** 
   - Render will give you a URL like: `https://event-platform-backend-abc123.onrender.com`
   - **This is your backend URL!**

### Step 2: Use This URL in Vercel

In Vercel, set:
```
REACT_APP_API_URL=https://event-platform-backend-abc123.onrender.com
```
(Replace with your actual Render URL)

---

## 🚂 Option 2: Deploy Backend to Railway

### Step 1: Deploy to Railway

1. **Go to:** https://railway.app
2. **Sign up/Login**
3. **Click:** "New Project" → "Deploy from GitHub"
4. **Select your repository**
5. **Configure:**
   - **Root Directory:** `server`
   - **Start Command:** `npm start`

6. **Add Environment Variables:**
   ```
   PORT=5000
   JWT_SECRET=event_platform_jwt_secret_key_2024
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeWF3dml1Y2hva3Vwem1rcmZoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTk3NTY1OCwiZXhwIjoyMDgxNTUxNjU4fQ.ROJY-TA1IFuiMqZc6X95hQi3wdQuYd7Tb4bLD90xK5A
   NODE_ENV=production
   ```

7. **Get your URL:**
   - Railway will give you a URL like: `https://event-platform-production.up.railway.app`
   - **This is your backend URL!**

### Step 2: Use This URL in Vercel

In Vercel, set:
```
REACT_APP_API_URL=https://event-platform-production.up.railway.app
```
(Replace with your actual Railway URL)

---

## 📋 Quick Checklist

- [ ] Deploy backend to Render or Railway
- [ ] Get the backend URL (e.g., `https://xxx.onrender.com`)
- [ ] Add `REACT_APP_API_URL` to Vercel with that URL
- [ ] Redeploy Vercel
- [ ] Test the connection

---

## ⚠️ Important

**You MUST deploy the backend first!** 

- Localhost (`http://localhost:5000`) won't work with Vercel
- Vercel needs a public URL
- Deploy backend → Get URL → Add to Vercel

---

## 🎯 After Deployment

Once you have your backend URL, add it to Vercel:

```
REACT_APP_API_URL=https://your-actual-backend-url.onrender.com
```

Then your Vercel frontend will connect to your deployed backend! ✅

