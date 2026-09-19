import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getDatePlans = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({ password: z.string().min(1).max(200) }).parse(data))
  .handler(async ({ data }) => {
    const expected = process.env["ADMIN_PASSWORD"] ?? process.env["VITE_ADMIN_PASSWORD"];
    if (!expected || data.password !== expected) throw new Error("Unauthorized");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: plans, error } = await supabaseAdmin
      .from("date_plans")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error("Could not load responses");
    return plans;
  });