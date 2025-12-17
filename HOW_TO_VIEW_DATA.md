# How to View Your Data in Supabase

## ✅ IMPORTANT: You're Looking in the Wrong Place!

You're currently viewing:
- ❌ **Authentication → Users** (Supabase Auth users)

But your app stores data in:
- ✅ **Table Editor → users** (Custom database table)

---

## 📍 Correct Steps to View Your Data:

1. **Go to Supabase Dashboard**
   - URL: https://supabase.com/dashboard/project/tiyawviuchokupzmkrfh

2. **Click "Table Editor"** (left sidebar)
   - NOT "Authentication"
   - Look for the database icon 📊

3. **Select the "users" table**
   - You should see columns: id, name, email, password_hash, created_at, updated_at

4. **Your registered users will be here!**

---

## 🧪 Test Registration:

The registration API is working! I just tested it:
- ✅ Status: 201 Created
- ✅ User was successfully stored
- ✅ Token was generated

---

## 📊 Other Tables to Check:

- **events** - All created events
- **rsvps** - All RSVP records

---

## ⚠️ If Tables Don't Exist:

If you don't see the `users`, `events`, or `rsvps` tables:

1. Go to **SQL Editor** (left sidebar)
2. Open `server/supabase_setup.sql`
3. Copy all SQL code
4. Paste and run in Supabase SQL Editor

---

## 🔍 Quick Test:

Try registering a user through your app:
- Go to: http://localhost:3001/register
- Fill the form
- Submit
- Then check **Table Editor → users** (NOT Authentication)

