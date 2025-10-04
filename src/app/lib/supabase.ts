import { createClient } from "@supabase/supabase-js";

// Client Supabase pour le serveur (avec service_role pour opérations admin)
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // Clé service_role (privée)
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Client Supabase pour le client (avec anon key)
export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);