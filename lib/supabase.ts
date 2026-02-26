import { createClient, SupabaseClient } from '@supabase/supabase-js'

let supabaseInstance: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (supabaseInstance) return supabaseInstance;
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials not configured');
    return null;
  }
  
  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  return supabaseInstance;
}

// Legacy export for backward compatibility (use getSupabase() instead)
export const supabase = typeof window !== 'undefined' 
  ? getSupabase() 
  : null as unknown as SupabaseClient;

export type Prayer = {
  id: string
  prayer_text: string
  response_text: string
  detected_emotion: string
  created_at: string
}