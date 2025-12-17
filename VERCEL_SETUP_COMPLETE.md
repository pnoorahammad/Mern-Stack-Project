# ✅ Vercel Deployment - Setup Checklist

## 🎉 Your Vercel Deployment is Working!

Your app is live at: **https://mern-stack-project-xi-two.vercel.app/**

The HTML is loading correctly! ✅

---

## ⚙️ Next Steps: Configure API Connection

### Step 1: Add Environment Variable in Vercel

1. **Go to Vercel Dashboard**
   - https://vercel.com/dashboard
   - Select your project: `mern-stack-project-xi-two`

2. **Go to Settings → Environment Variables**

3. **Add this variable:**
   ```
   Key: REACT_APP_API_URL
   Value: https://your-backend-url.onrender.com
   ```
   (Replace with your actual backend URL)

4. **Select all environments:** Production, Preview, Development

5. **Click "Save"**

6. **Redeploy** your application

---

## 🔍 How to Find Your Backend URL

### If Backend is on Render:
- Go to Render Dashboard
- Find your backend service
- Copy the URL (e.g., `https://event-platform-abc123.onrender.com`)

### If Backend is on Railway:
- Go to Railway Dashboard
- Find your backend service
- Copy the URL (e.g., `https://event-platform-production.up.railway.app`)

### If Backend is NOT deployed yet:
- Deploy backend first to Render/Railway
- Then add the URL to Vercel environment variables

---

## 🧪 Test Your Deployment

1. **Open:** https://mern-stack-project-xi-two.vercel.app/

2. **Open Browser Console (F12)**

3. **Check Network Tab:**
   - Look for API calls
   - Verify they go to your backend URL
   - Check for CORS errors

4. **Test Features:**
   - Register/Login
   - Create Event
   - View Events

---

## ⚠️ Common Issues

### Issue 1: API Calls Fail
**Solution:** Make sure `REACT_APP_API_URL` is set in Vercel

### Issue 2: CORS Errors
**Solution:** Backend CORS should allow your Vercel domain:
```javascript
app.use(cors({
  origin: ['https://mern-stack-project-xi-two.vercel.app', 'http://localhost:3001']
}));
```

### Issue 3: 404 on API Routes
**Solution:** Backend must be deployed and accessible

---

## 📋 Complete Checklist

- [x] Frontend deployed to Vercel ✅
- [ ] Backend deployed to Render/Railway
- [ ] `REACT_APP_API_URL` set in Vercel
- [ ] CORS configured on backend
- [ ] Test registration
- [ ] Test event creation

---

## 🚀 Your Current Status

✅ **Frontend:** Deployed and working  
⏳ **Backend:** Needs to be deployed (if not already)  
⏳ **Environment Variable:** Needs to be added to Vercel

