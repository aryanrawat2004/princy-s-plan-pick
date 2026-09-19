import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Copy, LockKeyhole, MapPin, CalendarDays, Clock3, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getDatePlans } from "@/lib/date-plans.functions";
import type { Tables } from "@/integrations/supabase/types";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [
    { title: "Princy’s Response — Pick Our Plan" },
    { name: "description", content: "Private plan responses." },
    { property: "og:title", content: "Princy’s Response — Pick Our Plan" },
    { property: "og:description", content: "Private plan responses." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: AdminPage,
});

type Plan = Tables<"date_plans">;

function AdminPage() {
  const [password, setPassword] = useState("");
  const [plans, setPlans] = useState<Plan[] | null>(null);
  const [loading, setLoading] = useState(false);

  const unlock = async () => {
    setLoading(true);
    try { setPlans(await getDatePlans({ data: { password } })); }
    catch { toast.error("That password didn’t work."); }
    finally { setLoading(false); }
  };

  const copy = async (plan: Plan) => {
    await navigator.clipboard.writeText(`${plan.activity} • ${plan.selected_date} • ${plan.selected_time} • ${plan.location_preference}${plan.activity_preference ? ` • ${plan.activity_preference}` : ""}`);
    toast.success("Plan copied ✨");
  };

  if (!plans) return <main className="grid min-h-dvh place-items-center bg-background px-4"><section className="w-full max-w-sm rounded-[28px] border border-border bg-card p-7 text-center shadow-shell"><div className="mx-auto grid size-12 place-items-center rounded-full bg-primary/15 text-primary"><LockKeyhole /></div><h1 className="mt-5 font-accent text-3xl">Princy’s Response 💌</h1><p className="mt-2 text-sm text-muted-foreground">This page is just for Aryan.</p><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && unlock()} placeholder="Enter password" className="mt-6 min-h-12 rounded-2xl bg-background"/><Button variant="plan" size="plan" className="mt-3 w-full" disabled={!password || loading} onClick={unlock}>{loading ? "Opening…" : "Open responses"}</Button><Button asChild variant="ghost" className="mt-3"><Link to="/">Back to plan</Link></Button></section></main>;

  return <main className="min-h-dvh bg-background px-4 py-8"><div className="mx-auto max-w-3xl"><header className="flex items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Private view</p><h1 className="mt-2 font-accent text-4xl">Princy’s Response 💌</h1></div><Button asChild variant="soft"><Link to="/">View invite</Link></Button></header>{plans.length === 0 ? <div className="mt-10 rounded-[24px] border border-border bg-card p-10 text-center shadow-soft"><Sparkles className="mx-auto text-primary"/><p className="mt-4 text-muted-foreground">No confirmed plan yet.</p></div> : <div className="mt-8 space-y-5">{plans.map((plan, index) => <article key={plan.id} className="rounded-[24px] border border-border bg-card p-5 shadow-soft"><div className="flex items-center justify-between gap-3"><div><span className="text-xs text-muted-foreground">{index === 0 ? "Latest response" : new Date(plan.created_at).toLocaleString()}</span><h2 className="mt-1 text-xl font-semibold">{plan.activity}</h2></div><Button aria-label="Copy plan" title="Copy plan" variant="soft" size="icon" className="rounded-full" onClick={() => copy(plan)}><Copy /></Button></div><div className="mt-5 grid gap-3 text-sm sm:grid-cols-2"><Item icon={<CalendarDays/>} label="Date" value={plan.selected_date}/><Item icon={<Clock3/>} label="Time" value={plan.selected_time}/><Item icon={<MapPin/>} label="Location" value={plan.location_preference}/><Item icon={<Sparkles/>} label="Preference" value={plan.activity_preference ?? "Open"}/><Item label="Response" value={plan.response_type}/><Item label="Deal" value={plan.deal_response}/></div></article>)}</div>}</div></main>;
}

function Item({ icon, label, value }: { icon?: React.ReactNode; label: string; value: string }) { return <div className="flex min-w-0 gap-3 rounded-2xl bg-muted/60 p-3"><span className="shrink-0 text-primary [&_svg]:size-4">{icon}</span><div className="min-w-0"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-1 break-words font-medium">{value}</p></div></div>; }