import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const planNotificationSchema = z.object({
  activity: z.string().min(1).max(500),
  preference: z.string().max(500),
  date: z.string().min(1).max(40),
  time: z.string().min(1).max(100),
  location: z.string().min(1).max(120),
  response: z.string().min(1).max(80),
  deal: z.string().min(1).max(80),
  note: z.string().max(500),
});

export const sendPlanNotification = createServerFn({ method: "POST" })
  .validator((data) => planNotificationSchema.parse(data))
  .handler(async ({ data }) => {
    const response = await fetch("https://formsubmit.co/ajax/rawataryan691@gmail.com", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _subject: "Princy completed Pick Our Plan 🌷",
        _template: "table",
        Activity: data.activity,
        Preference: data.preference || "Open / we will decide",
        Date: data.date,
        Time: data.time,
        Location: data.location,
        Response: data.response,
        Deal: data.deal,
        "Note from Princy": data.note || "No note added",
      }),
    });

    if (!response.ok) throw new Error("Email notification failed");
    return { delivered: true };
  });

export const getDatePlans = createServerFn({ method: "POST" })
  .validator((data) => z.object({ password: z.string().min(1).max(200) }).parse(data))
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
