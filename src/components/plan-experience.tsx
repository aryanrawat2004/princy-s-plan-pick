import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import {
  ArrowLeft, ArrowRight, CalendarDays, Check, Clock3, Coffee, Film, Gamepad2,
  Heart, IceCreamBowl, MapPin, PartyPopper, Pizza, RotateCcw, Sparkles, Star, SunMedium,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

type State = {
  step: number; suspicion: number; response: string; activity: string; preference: string;
  date: string; time: string; location: string; deal: string; confirmed: boolean;
};

const initial: State = { step: 0, suspicion: 36, response: "", activity: "", preference: "", date: "", time: "", location: "", deal: "", confirmed: false };
const STORAGE_KEY = "pick-our-plan-v1";

const activities = [
  ["Coffee Date", "good coffee, random conversations", Coffee],
  ["Movie + Snacks", "popcorn included obviously", Film],
  ["Food Date", "because food solves everything", Pizza],
  ["Evening Walk + Chai", "simple and peaceful", SunMedium],
  ["Bowling / Games", "loser pays for snacks 😂", Gamepad2],
  ["Ice Cream Drive", "short, sweet, chill", IceCreamBowl],
  ["Something Random", "we figure it out on the way", Star],
  ["Surprise Me", "dangerous choice 😂", Sparkles],
] as const;

const moviePrefs = ["Comedy 😂", "Rom-Com 🫶", "Horror 👻", "Thriller 👀", "Action 💥", "Anything except boring 😭", "You choose"];
const foodPrefs = ["Coffee ☕", "Pizza 🍕", "Dessert 🍰", "Momos 🥟", "Pasta 🍝", "Something spicy 🌶️", "Whatever looks good 😂", "You decide"];
const locations = ["Near your side", "Near my side", "Somewhere in between", "You choose the place", "Aryan, you decide 😌", "Surprise me"];
const times = [["Afternoon", "1 PM – 4 PM", "🌤️"], ["Evening", "4 PM – 7 PM", "🌅"], ["Night-ish", "7 PM – 9 PM", "🌙"], ["You decide", "Aryan figures it out", "✨"]] as const;
const quickDates = [new Date(2026, 8, 20), new Date(2026, 8, 25), new Date(2026, 8, 26), new Date(2026, 8, 27)];

function isoDate(date: Date) { return format(date, "yyyy-MM-dd"); }
function displayDate(value: string) { return value ? format(new Date(`${value}T12:00:00`), "EEEE, d MMMM") : "Not picked yet"; }

export function PlanExperience() {
  const [state, setState] = useState<State>(initial);
  const [hydrated, setHydrated] = useState(false);
  const [saving, setSaving] = useState(false);
  const [exactTime, setExactTime] = useState(false);

  useEffect(() => {
    try { const saved = localStorage.getItem(STORAGE_KEY); if (saved) setState({ ...initial, ...JSON.parse(saved) }); } catch { /* fresh start */ }
    setHydrated(true);
  }, []);
  useEffect(() => { if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }, [state, hydrated]);

  const preferenceNeeded = state.activity.includes("Movie") || state.activity.includes("Coffee") || state.activity.includes("Food");
  const set = (patch: Partial<State>) => setState((s) => ({ ...s, ...patch }));
  const next = () => setState((s) => ({ ...s, step: s.step + 1 }));
  const back = () => setState((s) => ({ ...s, step: Math.max(0, s.step - 1) }));
  const restart = () => { localStorage.removeItem(STORAGE_KEY); setState(initial); setExactTime(false); };

  const progress = useMemo(() => Math.min(100, Math.max(0, ((state.step - 1) / 10) * 100)), [state.step]);
  const suspicionCopy = state.suspicion <= 25 ? "Okay, surprisingly calm 😌" : state.suspicion <= 50 ? "Fair enough 😂" : state.suspicion <= 75 ? "I knew it 👀" : "Relax 😂 proposal nahi hai.";

  const selectResponse = (response: string) => {
    set({ response });
    if (response === "Yes, why not 😌") setTimeout(next, 180);
  };
  const chooseActivity = (activity: string) => set({ activity, preference: "" });
  const afterActivity = () => set({ step: preferenceNeeded ? 5 : 6 });

  const confirm = async () => {
    setSaving(true);
    const { error } = await supabase.from("date_plans").insert({
      activity: state.activity, activity_preference: state.preference || null,
      selected_date: state.date, selected_time: state.time, location_preference: state.location,
      suspicion_level: state.suspicion, response_type: state.response, deal_response: state.deal,
    });
    setSaving(false);
    if (error) { toast.error("Something went wrong 😭", { description: "Try once more." }); return; }
    toast.success("Plan saved ✨"); set({ confirmed: true, step: 11 });
  };

  if (!hydrated) return <main className="min-h-dvh bg-background" />;

  return (
    <main className="relative min-h-dvh overflow-hidden bg-background px-4 py-5 sm:grid sm:place-items-center sm:py-10">
      <Decorations />
      <section className="relative z-10 mx-auto flex min-h-[calc(100dvh-2.5rem)] w-full max-w-[460px] flex-col overflow-hidden rounded-[28px] border border-border/80 bg-card/80 shadow-shell backdrop-blur-xl sm:min-h-[780px] sm:max-h-[900px]">
        <header className="grid grid-cols-[44px_minmax(0,1fr)_44px] items-center gap-2 px-4 pt-4">
          <Button aria-label="Go back" title="Go back" variant="ghost" size="icon" className={cn("rounded-full", (state.step === 0 || state.step === 11) && "invisible")} onClick={back}><ArrowLeft /></Button>
          <div className="min-w-0 text-center">
            {state.step > 0 && state.step < 11 && <><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Step {Math.min(state.step, 10)} of 10</p><div className="mx-auto mt-2 h-1 w-full max-w-48 overflow-hidden rounded-full bg-muted"><motion.div className="h-full bg-primary" animate={{ width: `${progress}%` }} /></div></>}
          </div>
          <Button aria-label="Restart" title="Restart" variant="ghost" size="icon" className="rounded-full text-muted-foreground" onClick={restart}><RotateCcw /></Button>
        </header>

        <div className="flex flex-1 flex-col overflow-y-auto px-5 pb-5 pt-4 sm:px-7">
          <AnimatePresence mode="wait">
            <motion.div key={state.step} initial={{ opacity: 0, y: 12, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: .99 }} transition={{ duration: .24, ease: "easeOut" }} className="flex min-h-full flex-1 flex-col">
              {state.step === 0 && <Intro onNext={next} />}
              {state.step === 1 && <Screen title="Before we begin…" subtitle="How suspicious are you right now? 👀"><div className="my-auto py-8"><div className="mb-5 flex justify-between text-xs text-muted-foreground"><span>Not at all</span><span>Very 😂</span></div><Slider value={[state.suspicion]} max={100} step={1} onValueChange={([value]) => set({ suspicion: value ?? 0 })} /><motion.div key={suspicionCopy} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 rounded-2xl bg-lavender/60 p-5 text-center font-accent text-xl">{suspicionCopy}</motion.div></div><NextButton onClick={next}>Continue</NextButton></Screen>}
              {state.step === 2 && <ClarityScreen onNext={next} />}
              {state.step === 3 && <Screen title="So… should we actually make a plan? 👀" subtitle={<>Bas ek simple sa plan.<br/>No awkwardness.<br/>No serious talks required 😂</>}><div className="mt-7 space-y-3">{["Yes, why not 😌", "Hmm… convince me 😂", "Maybe some other time :)"].map((x) => <Option key={x} selected={state.response === x} onClick={() => selectResponse(x)} title={x} />)}</div>{state.response.includes("convince") && <div className="mt-5 rounded-2xl bg-peach/65 p-4 text-sm leading-6"><b>My strongest argument:</b><br/>good food + bad jokes + zero pressure 😂<NextButton className="mt-4" onClick={next}>Okay fine, show me options 👀</NextButton></div>}{state.response.includes("other") && <div className="mt-5 rounded-2xl bg-muted/70 p-5 text-center"><p>All good 😌<br/>No pressure at all.</p><Button variant="soft" size="plan" className="mt-4 w-full" onClick={() => set({ response: "" })}>Back</Button></div>}</Screen>}
              {state.step === 4 && <Screen title="What are we doing? 👀" subtitle="You pick the vibe."><div className="mt-6 grid grid-cols-2 gap-3">{activities.map(([title, subtitle, Icon]) => <Option key={title} selected={state.activity === title} onClick={() => chooseActivity(title)} title={title} subtitle={subtitle} icon={<Icon />} />)}</div>{state.activity && <p className="mt-4 text-center font-accent text-lg text-primary">{state.activity === "Surprise Me" ? "You really picked surprise me? 😭😂" : "Good choice 😌"}</p>}<NextButton disabled={!state.activity} onClick={afterActivity}>Next <ArrowRight /></NextButton></Screen>}
              {state.step === 5 && <Screen title={state.activity.includes("Movie") ? "Okay movie person 🍿" : "Important question 😂"} subtitle={state.activity.includes("Movie") ? "What type?" : "What are we eating?"}><div className="mt-7 grid grid-cols-2 gap-3">{(state.activity.includes("Movie") ? moviePrefs : foodPrefs).map((x) => <Option key={x} selected={state.preference === x} onClick={() => set({ preference: x })} title={x} />)}</div><NextButton disabled={!state.preference} onClick={next}>Next <ArrowRight /></NextButton></Screen>}
              {state.step === 6 && <Screen title="When are you free? 📅" subtitle="Pick whatever feels comfortable."><div className="mt-7 grid grid-cols-2 gap-3">{quickDates.map((d) => <DateOption key={d.toISOString()} date={d} selected={state.date === isoDate(d)} onClick={() => set({ date: isoDate(d) })} />)}</div><Popover><PopoverTrigger asChild><Button variant="soft" size="plan" className="mt-3 w-full"><CalendarDays /> Choose another date</Button></PopoverTrigger><PopoverContent className="pointer-events-auto w-auto rounded-2xl p-0" align="center"><Calendar mode="single" selected={state.date ? new Date(`${state.date}T12:00:00`) : undefined} onSelect={(d) => d && set({ date: isoDate(d) })} disabled={{ before: new Date(2026, 8, 19) }} defaultMonth={new Date(2026, 8, 1)} className="pointer-events-auto rounded-2xl" /></PopoverContent></Popover>{state.date && <p className="mt-4 text-center text-sm font-medium text-primary">{displayDate(state.date)} — noted ✨</p>}<NextButton disabled={!state.date} onClick={next}>Next <ArrowRight /></NextButton></Screen>}
              {state.step === 7 && <Screen title="What time works best? ⏰"><div className="mt-7 grid grid-cols-2 gap-3">{times.map(([title, subtitle, emoji]) => <Option key={title} selected={state.time === title || (title === "Evening" && !state.time)} recommended={title === "Evening"} onClick={() => { set({ time: title }); setExactTime(false); }} title={`${emoji} ${title}`} subtitle={subtitle} />)}</div><Button variant="soft" size="plan" className="mt-3 w-full" onClick={() => setExactTime(true)}><Clock3 /> Pick exact time</Button>{exactTime && <input aria-label="Pick exact time" type="time" className="mt-3 min-h-12 w-full rounded-2xl border border-input bg-card px-4 text-center text-foreground outline-none focus:ring-2 focus:ring-ring" onChange={(e) => set({ time: e.target.value })} />}<NextButton disabled={!state.time} onClick={next}>Next <ArrowRight /></NextButton></Screen>}
              {state.step === 8 && <Screen title="Where should we meet? 📍" subtitle="No need to decide exact cafe right now."><div className="mt-7 space-y-3">{locations.map((x) => <Option key={x} selected={state.location === x} onClick={() => set({ location: x })} title={x} icon={<MapPin />} />)}</div><NextButton disabled={!state.location} onClick={next}>Next <ArrowRight /></NextButton></Screen>}
              {state.step === 9 && <Screen><div className="my-auto rounded-[26px] border border-primary/30 bg-gradient-rule p-6 text-center shadow-soft"><div className="mx-auto mb-5 grid size-12 place-items-center rounded-full bg-primary text-primary-foreground"><PartyPopper /></div><h1 className="font-accent text-4xl">One rule ☝️</h1><p className="mt-5 leading-8 text-muted-foreground">Phone thoda side mein rakhenge,<br/>kaam ki baatein thodi kam karenge,<br/>aur bas thoda chill karenge :)</p><p className="mt-6 font-semibold">Deal?</p><div className="mt-5 grid grid-cols-2 gap-3"><Button variant="plan" size="plan" onClick={() => { set({ deal: "Deal 😌" }); setTimeout(next, 150); }}>Deal 😌</Button><Button variant="soft" size="plan" onClick={() => set({ deal: "Depends 😂" })}>Depends 😂</Button></div>{state.deal === "Depends 😂" && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-sm">Fair 😂<br/>Negotiations allowed.<NextButton className="mt-4" onClick={next}>Continue</NextButton></motion.div>}</div></Screen>}
              {state.step === 10 && <Screen title="So it’s a plan? 👀"><Summary state={state} /><p className="mt-5 text-center text-sm leading-6 text-muted-foreground">No pressure.<br/>No labels.<br/>Bas thoda time together. 🌷</p><NextButton disabled={saving} onClick={confirm}>{saving ? "Saving…" : "Lock This Plan 🔒✨"}</NextButton><Button variant="ghost" size="plan" className="mt-2 w-full text-muted-foreground" onClick={() => set({ step: 4 })}>Wait, I changed my mind 😂</Button></Screen>}
              {state.step === 11 && <Success onSummary={() => set({ step: 10 })} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}

function Screen({ title, subtitle, children }: { title?: string; subtitle?: React.ReactNode; children?: React.ReactNode }) { return <div className="flex min-h-full flex-1 flex-col"><div className="text-center">{title && <h1 className="font-accent text-[2rem] leading-tight text-foreground">{title}</h1>}{subtitle && <p className="mx-auto mt-3 max-w-sm text-[0.95rem] leading-6 text-muted-foreground">{subtitle}</p>}</div>{children}</div>; }
function Intro({ onNext }: { onNext: () => void }) { return <div className="flex min-h-full flex-1 flex-col items-center justify-center text-center"><span className="rounded-full bg-peach/70 px-4 py-2 text-xs font-medium text-muted-foreground">made with a little courage 😂</span><h1 className="mt-8 font-accent text-5xl leading-tight">Hey Princy 👀</h1><p className="mt-5 max-w-sm leading-7 text-muted-foreground">Okay… since deciding plans over WhatsApp is apparently impossible 😂</p><p className="mt-8 font-accent text-2xl">I made this.</p><p className="mt-6 text-xl font-semibold leading-8">You choose.<br/>I’ll plan. 😌</p><div className="relative mt-10 w-full"><motion.span className="absolute -top-4 right-12 text-primary" animate={{ rotate: [0, 16, 0], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}><Sparkles /></motion.span><NextButton onClick={onNext}>Let’s Pick <ArrowRight /></NextButton></div><p className="mt-5 text-xs text-muted-foreground">no pressure, promise :)</p></div>; }
function ClarityScreen({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative my-auto overflow-hidden rounded-[26px] border border-primary/20 bg-gradient-to-br from-peach/45 via-card to-lavender/45 p-6 text-center shadow-soft"
      >
        <motion.span aria-hidden className="pointer-events-none absolute -right-2 top-3 text-primary/25" animate={{ y: [0, -6, 0], opacity: [0.4, 0.9, 0.4] }} transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}><Heart size={16} /></motion.span>
        <motion.span aria-hidden className="pointer-events-none absolute bottom-3 left-3 text-primary/20" animate={{ y: [0, 5, 0], opacity: [0.3, 0.8, 0.3] }} transition={{ repeat: Infinity, duration: 3.6, delay: 0.8, ease: "easeInOut" }}><Sparkles size={14} /></motion.span>
        <motion.span initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25, duration: 0.5, ease: "easeOut" }} className="mx-auto mb-5 grid size-12 place-items-center rounded-full bg-primary/12 text-primary"><Heart /></motion.span>
        <h1 className="font-accent text-[2rem] leading-tight text-foreground">Ek choti si clarity… 🌷</h1>
        <p className="mt-5 leading-7 text-muted-foreground">Main bas itna chahta hu ki agar tum comfortable ho, toh kabhi thoda time saath spend karein.</p>
        <p className="mt-4 leading-7 text-muted-foreground">Koi pressure nahi, koi label nahi, aur tumhe kisi cheez ke liye force feel nahi hona chahiye.</p>
        <p className="mt-4 leading-7 text-muted-foreground">Bas coffee, movie ya kuch simple sa… jisme tum comfortable ho.</p>
        <p className="mt-4 leading-7 text-muted-foreground">Baaki tum jo choose karogi, wahi plan hoga 😌</p>
        <p className="mt-6 font-accent text-lg text-primary">{"Your comfort > the plan."}</p>
        <NextButton className="mt-6" onClick={onNext}>Okay, let me choose 🌷</NextButton>
      </motion.div>
    </div>
  );
}
function NextButton({ children, className, ...props }: React.ComponentProps<typeof Button>) { return <Button variant="plan" size="plan" className={cn("mt-auto w-full", className)} {...props}>{children}</Button>; }
function Option({ title, subtitle, icon, selected, recommended, onClick }: { title: string; subtitle?: string; icon?: React.ReactNode; selected: boolean; recommended?: boolean; onClick: () => void }) { return <motion.button type="button" whileTap={{ scale: .98 }} onClick={onClick} className={cn("relative flex min-h-16 w-full items-center gap-3 rounded-[20px] border bg-card/70 p-4 text-left shadow-soft transition", selected ? "border-primary bg-primary/10 shadow-plan" : "border-border hover:border-primary/40")}><span className="flex size-8 shrink-0 items-center justify-center text-primary [&_svg]:size-5">{icon ?? (selected ? <Check /> : null)}</span><span className="min-w-0"><span className="block text-sm font-semibold leading-5">{title}</span>{subtitle && <span className="mt-1 block text-xs leading-4 text-muted-foreground">{subtitle}</span>}</span>{recommended && <span className="absolute -top-2 right-3 rounded-full bg-lavender px-2 py-1 text-[9px] font-semibold uppercase tracking-wider">lovely pick</span>}</motion.button>; }
function DateOption({ date, selected, onClick }: { date: Date; selected: boolean; onClick: () => void }) { return <motion.button whileTap={{ scale: .97 }} onClick={onClick} className={cn("min-h-24 rounded-[20px] border bg-card/70 p-3 text-center shadow-soft", selected ? "border-primary bg-primary/10 shadow-plan" : "border-border")}><span className="block text-xs text-muted-foreground">{format(date, "EEEE")}</span><span className="mt-1 block font-accent text-2xl">{format(date, "d MMM")}</span></motion.button>; }
function Summary({ state }: { state: State }) { return <div className="ticket mt-7 overflow-hidden rounded-[24px] border border-primary/35 bg-card shadow-plan"><div className="border-b border-dashed border-primary/35 bg-primary/10 px-5 py-4 text-center"><p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">our little plan</p><h2 className="mt-1 font-accent text-3xl">Princy + Aryan</h2></div><div className="space-y-4 p-5 text-sm">{[["✨", "Activity", state.activity], ["📅", "Date", displayDate(state.date)], ["🕕", "Time", state.time], ["🍰", "Preference", state.preference || "We’ll figure it out 😌"], ["📍", "Location", state.location]].map(([icon, label, value]) => <div key={label} className="grid grid-cols-[24px_88px_minmax(0,1fr)] gap-2"><span>{icon}</span><span className="text-muted-foreground">{label}</span><b className="min-w-0 text-right font-medium">{value}</b></div>)}</div></div>; }
function Success({ onSummary }: { onSummary: () => void }) { return <div className="relative flex min-h-full flex-1 flex-col items-center justify-center text-center">{Array.from({ length: 9 }).map((_, i) => <motion.span key={i} className="absolute text-primary" style={{ left: `${10 + ((i * 31) % 80)}%`, top: `${8 + ((i * 17) % 72)}%` }} animate={{ y: [0, -12, 0], opacity: [.35, 1, .35], rotate: [0, 20, 0] }} transition={{ repeat: Infinity, delay: i * .16, duration: 2.4 }}><Sparkles size={i % 3 === 0 ? 18 : 12} /></motion.span>)}<div className="relative grid size-20 place-items-center rounded-full bg-primary/15 text-primary shadow-plan"><Sparkles size={36} /></div><h1 className="mt-7 font-accent text-5xl">Yayyy 🥹</h1><p className="mt-4 text-xl font-semibold">Plan locked.</p><div className="mt-7 space-y-3 leading-7 text-muted-foreground"><p>Your only job:<br/><b className="text-foreground">show up 😌</b></p><p>Planning meri responsibility.</p><p className="font-accent text-2xl text-foreground">See you ✨</p></div><p className="mt-6 text-sm text-muted-foreground">I’ll text you the final place.</p><Button variant="soft" size="plan" className="mt-9 w-full" onClick={onSummary}>See Our Plan</Button><p className="mt-5 text-xs text-muted-foreground">made specially for Princy 🌷</p></div>; }
function Decorations() { return <div aria-hidden className="pointer-events-none absolute inset-0"><div className="absolute left-[8%] top-[12%] size-40 rounded-full bg-peach/35 blur-3xl"/><div className="absolute bottom-[8%] right-[5%] size-52 rounded-full bg-lavender/40 blur-3xl"/><Sparkles className="absolute left-[12%] top-[28%] text-primary/40" size={18}/><Star className="absolute bottom-[18%] right-[14%] text-primary/30" size={14}/></div>; }