# Supabase Service Role Key Setup

## 🔑 Why Service Role Key?

For server-side operations, you should use the **Service Role Key** instead of the **Anon Key**:
- ✅ **Bypasses Row Level Security (RLS)** - No need to disable RLS
- ✅ **Full database access** - Can perform all operations
- ✅ **More secure** - Only used on server, never exposed to client

---

## 📝 How to Get Service Role Key

1. **Go to Supabase Dashboard**
   - URL: https://supabase.com/dashboard/project/tiyawviuchokupzmkrfh

2. **Click "Settings"** (gear icon, left sidebar)

3. **Click "API"** (under Project Settings)

4. **Find "service_role" key**
   - It's under "Project API keys"
   - **⚠️ WARNING: Keep this secret! Never expose it to the client!**

5. **Copy the service_role key**

---

## ⚙️ Setup in Your Project

1. **Create/Edit `server/.env` file:**

```env
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
NODE_ENV=development
```

2. **Replace `your_service_role_key_here`** with the actual service role key from Supabase

3. **Restart your server:**
   ```bash
   cd server
   npm run dev
   ```

---

## ✅ After Setup

- ✅ No need to disable RLS
- ✅ All server operations will work
- ✅ More secure setup

---

## 🔒 Security Note

- **NEVER** commit the `.env` file to git
- **NEVER** expose the service role key to the client
- **ONLY** use it on the server side

---

## 🆘 Alternative: Disable RLS

If you don't want to use service role key, you can disable RLS:
1. Go to Supabase → Table Editor
2. Disable RLS on: `users`, `events`, `rsvps` tables

But using service role key is the **recommended approach** for server-side operations.

