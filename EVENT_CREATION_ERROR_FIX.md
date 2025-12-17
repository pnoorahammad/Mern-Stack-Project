# Fix: "Server error creating event"

## 🔍 Most Common Cause: Row Level Security (RLS)

The error "Server error creating event" is **99% likely** caused by **RLS blocking inserts** on the `events` table.

---

## ✅ SOLUTION: Disable RLS on Events Table

### Step-by-Step:

1. **Go to Supabase Dashboard**
   - URL: https://supabase.com/dashboard/project/tiyawviuchokupzmkrfh

2. **Click "Table Editor"** (left sidebar)
   - NOT "Authentication"
   - Look for the database icon 📊

3. **Select "events" table**

4. **Disable RLS:**
   - Look at the top of the table view
   - Find "RLS: Enabled" (usually in a badge/button)
   - Click it
   - Select "Disable RLS"

5. **Also disable RLS on:**
   - `users` table (if not already done)
   - `rsvps` table (if not already done)

---

## 🧪 After Disabling RLS

1. Try creating an event again
2. It should work immediately!
3. Check the `events` table in Supabase Table Editor to see your event

---

## 📊 Check Server Logs

If you want to see the exact error:

1. Look at the terminal where `npm run dev` is running
2. Look for lines that say:
   - `Supabase insert error:`
   - `Error details:`
   - `Create event error:`

The error will show:
- Error message
- Error code (usually `42501` for RLS violations)
- Error details
- Error hint

---

## 🔧 Other Possible Issues

### 1. Missing Tables
If tables don't exist:
- Go to Supabase → SQL Editor
- Run `server/supabase_setup.sql`

### 2. Invalid User ID
If `creator_id` is invalid:
- Make sure you're logged in
- Check that your user exists in `users` table

### 3. Data Type Issues
- `capacity` must be a number (integer)
- `date` must be a valid date string
- All required fields must be filled

---

## ✅ Quick Test

After disabling RLS, try creating an event with:
- Title: "Test Event"
- Description: "This is a test"
- Date: Any future date
- Location: "Test Location"
- Capacity: 10

If it works, RLS was the issue!

