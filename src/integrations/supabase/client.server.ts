import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

function createSupabaseAdminClient() {
  const supabaseUrl =
    process.env["SUPABASE_URL"] ??
    process.env["VITE_SUPABASE_URL"];

  const secretKey =
    process.env["SUPABASE_SECRET_KEY"] ??
    process.env["SUPABASE_SERVICE_ROLE_KEY"];

  if (!supabaseUrl || !secretKey) {
    throw new Error("Missing Supabase server credentials");
  }

  return createClient<Database>(supabaseUrl, secretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}

let adminClient: ReturnType<typeof createSupabaseAdminClient> | undefined;

export const supabaseAdmin = new Proxy(
  {} as ReturnType<typeof createSupabaseAdminClient>,
  {
    get(_, prop, receiver) {
      if (!adminClient) {
        adminClient = createSupabaseAdminClient();
      }

      return Reflect.get(adminClient, prop, receiver);
    },
  },
);