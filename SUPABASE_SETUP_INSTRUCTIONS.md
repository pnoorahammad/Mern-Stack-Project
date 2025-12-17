# Supabase Setup Instructions

## Step 1: Create Database Tables in Supabase

1. Go to your Supabase project: https://tiyawviuchokupzmkrfh.supabase.co
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the entire contents of `server/supabase_setup.sql`
5. Click **Run** (or press Ctrl+Enter)
6. You should see "Success. No rows returned"

This will create:
- `users` table
- `events` table  
- `rsvps` table
- All necessary indexes and triggers

## Step 2: Verify Tables Created

1. Go to **Table Editor** in Supabase
2. You should see three tables: `users`, `events`, `rsvps`

## Step 3: Run the Application

The application is now configured to use Supabase!

```bash
cd server
npm run dev
```

Then open: http://localhost:5000

## Step 4: Test Registration

1. Open http://localhost:5000
2. Click "Sign Up"
3. Create a new account
4. Check Supabase Table Editor → `users` table to see your account

## Notes

- All data is now stored in Supabase (cloud database)
- No MongoDB needed
- Data persists across server restarts
- You can view all data in Supabase dashboard

