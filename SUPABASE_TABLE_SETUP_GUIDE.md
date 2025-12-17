# Supabase Table Setup Guide

## ✅ Current Status: RLS is DISABLED (Good for Anon Key)

Based on your screenshot, RLS is **unchecked** (disabled) on the `events` table. This is correct if you're using the anon key.

---

## 🎯 What You Should Do

### Option 1: Keep RLS Disabled (Current Setup)

**For `events` table:**
- ✅ **RLS: UNCHECKED** (as shown in your screenshot)
- ✅ Click "Save" to confirm
- ✅ This allows public access with anon key

**Do the same for:**
- `users` table - RLS should be UNCHECKED
- `rsvps` table - RLS should be UNCHECKED

---

### Option 2: Enable RLS + Use Service Role Key (More Secure)

If you want to enable RLS (recommended for production):

1. **Enable RLS on all tables:**
   - `events` - CHECK the RLS checkbox
   - `users` - CHECK the RLS checkbox  
   - `rsvps` - CHECK the RLS checkbox

2. **Get Service Role Key:**
   - Go to Settings → API
   - Copy the `service_role` key

3. **Add to `server/.env`:**
   ```env
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

4. **Restart server**

---

## 📋 Quick Checklist

For **Option 1** (RLS Disabled - Current):
- [ ] `events` table: RLS UNCHECKED ✅ (you have this)
- [ ] `users` table: RLS UNCHECKED
- [ ] `rsvps` table: RLS UNCHECKED
- [ ] Click "Save" on each table

For **Option 2** (RLS Enabled + Service Key):
- [ ] `events` table: RLS CHECKED
- [ ] `users` table: RLS CHECKED
- [ ] `rsvps` table: RLS CHECKED
- [ ] Add `SUPABASE_SERVICE_ROLE_KEY` to `.env`
- [ ] Restart server

---

## 🔍 If You're Still Getting PGRST204 Error

Even with RLS disabled, you might get PGRST204 if:
1. The SELECT query after INSERT is failing
2. The foreign key relationship name is wrong

**Solution:** The code has been updated to handle this. Make sure:
- All tables have RLS disabled (or use service key)
- Restart your server after making changes

---

## ✅ Recommended: Use Service Role Key

For server-side operations, using service role key is better:
- ✅ More secure
- ✅ Bypasses RLS automatically
- ✅ No need to disable RLS
- ✅ Production-ready

