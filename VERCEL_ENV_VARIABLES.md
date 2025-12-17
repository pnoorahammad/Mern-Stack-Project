# Vercel Environment Variables Setup

## 📋 For Frontend Deployment on Vercel

When deploying the **React frontend** to Vercel, you only need **ONE** environment variable:

### Required Environment Variable

```
REACT_APP_API_URL
```

### What to Set It To

**Option 1: If backend is deployed separately (Render/Railway)**
```
REACT_APP_API_URL=https://your-backend-url.onrender.com
```
or
```
REACT_APP_API_URL=https://your-backend-url.railway.app
```

**Option 2: If backend is on same domain (monorepo deployment)**
```
REACT_APP_API_URL=/api
```
(This uses relative URLs - only works if backend serves the frontend)

---

## 🔧 How to Add in Vercel

1. **Go to Vercel Dashboard**
   - https://vercel.com/dashboard

2. **Select your project**

3. **Go to Settings → Environment Variables**

4. **Add the variable:**
   - **Key:** `REACT_APP_API_URL`
   - **Value:** Your backend URL (e.g., `https://your-backend.onrender.com`)
   - **Environment:** Production, Preview, Development (select all)

5. **Click "Save"**

6. **Redeploy** your application

---

## ⚠️ Important Notes

### ❌ DO NOT Add These to Vercel (Frontend):
- `SUPABASE_SERVICE_ROLE_KEY` - Server-side only, never expose to client!
- `JWT_SECRET` - Server-side only
- `SUPABASE_KEY` - Server-side only
- `PORT` - Not needed for Vercel

### ✅ Only Add:
- `REACT_APP_API_URL` - Points to your backend API

---

## 📝 Example Values

### If Backend is on Render:
```
REACT_APP_API_URL=https://event-platform-backend.onrender.com
```

### If Backend is on Railway:
```
REACT_APP_API_URL=https://event-platform-production.up.railway.app
```

### If Backend is on Heroku:
```
REACT_APP_API_URL=https://your-app.herokuapp.com
```

---

## 🧪 Test After Deployment

1. Open your Vercel deployment URL
2. Check browser console (F12) for API calls
3. Verify API calls go to the correct backend URL
4. Test login/register functionality

---

## 🔒 Security Reminder

- **Never** commit `.env` files to git
- **Never** expose service role keys or secrets to the frontend
- Only public API URLs should be in frontend environment variables

