import { createClient } from "@supabase/supabase-js";
import { getSupabaseEnv } from "./env";

const { url, anonKey } = getSupabaseEnv();

export const supabasePublic = createClient(url, anonKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});