import { createClient } from "@supabase/supabase-js";

// Server-only Supabase client using the secret key. Tables have row-level security on and no public policies.
export function db() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) throw new Error("Supabase env vars are missing");
  return createClient(url, key, { auth: { persistSession: false } });
}
