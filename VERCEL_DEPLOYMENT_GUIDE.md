# Vercel Deployment Guide

## 🚀 Quick Setup for Vercel

### Step 1: Environment Variable

In Vercel Dashboard → Settings → Environment Variables, add:

```
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

Replace `your-backend-url.onrender.com` with your actual backend URL.

---

### Step 2: Deploy

1. Push your code to GitHub
2. Connect repository to Vercel
3. Vercel will auto-detect React app
4. Add the environment variable
5. Deploy!

---

## 📋 Complete Environment Variable List

### For Vercel (Frontend Only):
```
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

### For Backend (Render/Railway - NOT Vercel):
```
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NODE_ENV=production
```

---

## ⚠️ Important

- **Vercel** = Frontend only (React app)
- **Render/Railway** = Backend only (Node.js server)
- **Never** put backend secrets in Vercel!

