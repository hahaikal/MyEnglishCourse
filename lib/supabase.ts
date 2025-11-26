import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const getSupabase = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables not found');
    return null;
  }

  return createClient(supabaseUrl, supabaseAnonKey);
};

export type Wish = {
  id: string;
  name: string;
  message: string;
  created_at: string;
};
