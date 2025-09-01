import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Database } from './types';
import { createClient } from '@supabase/supabase-js'

export const SUPABASE_URL = "https://btxjjzcdirbkjwerveox.supabase.co";
export const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0eGpqemNkaXJia2p3ZXJ2ZW94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2NzMwODQsImV4cCI6MjA3MjI0OTA4NH0.dbMqrPA2aYn0jyCsR69OaoA16EFHjMc2gzTSKeIo70g";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
