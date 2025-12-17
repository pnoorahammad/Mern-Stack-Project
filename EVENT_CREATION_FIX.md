# Fix: Event Creation Server Error

## 🔍 Most Common Issue: Row Level Security (RLS)

The error is most likely caused by **RLS blocking inserts** on the `events` table.

---

## ✅ Solution: Disable RLS on Events Table

1. **Go to Supabase Dashboard**
   - URL: https://supabase.com/dashboard/project/tiyawviuchokupzmkrfh

2. **Click "Table Editor"** (left sidebar)

3. **Select "events" table**

4. **Disable RLS:**
   - Look for "RLS: Enabled" at the top of the table
   - Click it → Select "Disable RLS"

5. **Also disable RLS on:**
   - `users` table (if not already done)
   - `rsvps` table

---

## 🧪 Test After Fixing

1. Restart your server (if needed)
2. Try creating an event again
3. Check the server console for detailed error messages

---

## 📊 Check Server Logs

The server now logs detailed error information. Check your terminal/console where `npm run dev` is running to see:
- Error message
- Error code
- Error details
- Error hint

---

## 🔧 Other Possible Issues

### 1. Missing Tables
If tables don't exist, run the SQL setup:
- Go to Supabase → SQL Editor
- Run `server/supabase_setup.sql`

### 2. Foreign Key Issue
If `creator_id` is invalid:
- Make sure you're logged in
- Check that your user exists in the `users` table

### 3. Data Type Mismatch
- `capacity` must be an integer
- `date` must be a valid date string
- `rsvp_open_at` is set automatically

---

## 🚀 After Fixing RLS

Once RLS is disabled, event creation should work immediately!

