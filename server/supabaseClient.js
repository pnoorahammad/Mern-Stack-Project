const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config();

const supabaseUrl = 'https://tiyawviuchokupzmkrfh.supabase.co';

// Use service role key for server-side operations (bypasses RLS)
// If not set, fall back to anon key (but RLS must be disabled)
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeWF3dml1Y2hva3Vwem1rcmZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5NzU2NTgsImV4cCI6MjA4MTU1MTY1OH0.i51Mp6ZP9APXU3kpOZZl4QD0Ce7VH7gkvJl3jmzrmsw';

// Use service role key if available, otherwise use anon key
const supabaseKey = supabaseServiceKey || supabaseAnonKey;

// Log which key is being used (for debugging)
if (supabaseServiceKey) {
  console.log('✅ Using SUPABASE_SERVICE_ROLE_KEY (RLS bypassed)');
} else {
  console.log('⚠️  Using anon key - RLS must be disabled');
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

module.exports = supabase;

