import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tlifzgspaftjrlozoxnw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsaWZ6Z3NwYWZ0anJsb3pveG53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwNTA2NjAsImV4cCI6MjA2NjYyNjY2MH0.Gwf_p8UhgkTUYKqOAwlzuzw5PpcIqQKmW2Kz9Z9f_Z4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// All user-specific queries must use the local UUID from uuidHelper for user_id, unless using Supabase Auth.

// Types für unsere Daten
export interface ScanResult {
  id?: number;
  user_id: string;
  image_url: string;
  skin_score: number;
  hydration_level: string;
  oil_level: string;
  texture_analysis: string;
  recommendations: string[];
  created_at?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  created_at?: string;
}

export interface Subscription {
  id?: number;
  user_id: string;
  plan: 'free' | 'premium' | 'pro';
  status: 'active' | 'cancelled' | 'expired';
  started_at?: string;
  expires_at?: string;
} 