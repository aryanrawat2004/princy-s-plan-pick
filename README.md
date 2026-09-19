# Princy's Plan Pick

Build a beautiful, premium, mobile-first interactive website called:

“Pick Our Plan ✨”

PURPOSE:

This is a cute and playful personal invitation website for a girl named “Princy”.

IMPORTANT:

This is NOT a love confession website.

Do NOT use “I love you”, “relationship”, “girlfriend”, proposal rings, intense romantic language, or anything that creates pressure.

The vibe should be:

- sweet

- playful

- slightly flirty

- respectful

- comfortable

- light-hearted

- personal

- premium

- modern

The idea is:

Instead of deciding a plan over WhatsApp, Princy can open this website and choose:

- what she wants to do

- which date

- what time

- location preference

- food/movie preferences

At the end, show a beautiful summary and let her confirm the plan.

The website should feel like:

“you choose everything, I’ll handle the planning.”

==================================================

TECH STACK

==================================================

Use:

- React

- Vite

- TypeScript

- Tailwind CSS

- Framer Motion

- Lucide React icons

- Supabase for database

- Sonner for toast notifications

The website must be:

- fully responsive

- primarily optimized for mobile

- beautiful on iPhone and Android

- smooth on desktop too

- fast loading

- visually polished

- production ready

DO NOT create a generic form.

It must feel like a personalized interactive mini-experience.

==================================================

DESIGN SYSTEM

==================================================

STYLE:

Premium soft romantic minimal UI.

Use:

- warm off-white / cream background

- very light blush pink

- soft lavender

- subtle peach

- light beige

Avoid:

- bright red

- dark romantic themes

- excessive hearts

- childish design

- over-the-top Valentine's styling

Suggested colors:

Background:

#FFFDF9

Primary soft pink:

#F6D6DC

Lavender:

#E8DFF5

Peach:

#FCE1D7

Text dark:

#2B2B2B

Muted text:

#77716D

Accent:

#E8A6B3

Cards:

rgba(255,255,255,0.75)

Use subtle glassmorphism:

- backdrop blur

- soft borders

- soft shadows

Border radius:

20px to 28px

Buttons:

pill shaped or rounded-xl

==================================================

TYPOGRAPHY

==================================================

Use:

- clean modern sans serif for normal text

- elegant handwritten / soft serif accent for special headings

Examples:

- Inter

- Poppins

- DM Sans

Accent heading:

- Playfair Display

or

- Caveat

or similar elegant font

Do NOT overuse handwritten fonts.

==================================================

BACKGROUND DETAILS

==================================================

Add very subtle decorative elements:

- tiny floating sparkles

- tiny stars

- very soft circles/blobs

- tiny minimal hearts occasionally

- slow animated gradients

Animations must be subtle.

No large heart explosions.

==================================================

PAGE STRUCTURE

==================================================

This should behave like an interactive multi-step experience.

Use one main centered card on mobile.

Add:

- progress indicator

- smooth animated transitions

- back button where appropriate

Progress can look like:

Step 1 of 6

or small dots.

==================================================

SCREEN 1 — INTRO

==================================================

Main small text:

“made with a little courage 😂”

Main heading:

“Hey Princy 👀”

Subheading:

“Okay… since deciding plans over WhatsApp is apparently impossible 😂”

Then:

“I made this.”

Then:

“You choose.

I’ll plan. 😌”

CTA button:

“Let’s Pick →”

At bottom:

“no pressure, promise :)”

Add subtle animated sparkle near CTA.

==================================================

SCREEN 2 — PLAYFUL START

==================================================

Heading:

“Before we begin…”

Text:

“How suspicious are you right now? 👀”

Create a beautiful slider from:

“Not at all”

to

“Very 😂”

As user moves the slider, show changing text:

0–25:

“Okay, surprisingly calm 😌”

26–50:

“Fair enough 😂”

51–75:

“I knew it 👀”

76–100:

“Relax 😂 proposal nahi hai.”

Then button:

“Continue”

This screen should feel fun and interactive.

==================================================

SCREEN 3 — MAIN QUESTION

==================================================

Heading:

“So… should we actually make a plan? 👀”

Subheading:

“Bas ek simple sa plan.

No awkwardness.

No serious talks required 😂”

Show 3 options as cards:

1.

“Yes, why not 😌”

2.

“Hmm… convince me 😂”

3.

“Maybe some other time :)”

IMPORTANT:

Do NOT make the third option disappear or run away.

Do NOT manipulate the user.

If option 3 is selected:

Show:

“All good 😌

No pressure at all.”

And button:

“Back”

If option 2 is selected:

Show:

“My strongest argument:

good food + bad jokes + zero pressure 😂”

Then button:

“Okay fine, show me options 👀”

If option 1:

Proceed directly.

==================================================

SCREEN 4 — CHOOSE THE VIBE

==================================================

Heading:

“What are we doing? 👀”

Subheading:

“You pick the vibe.”

Create beautiful selectable cards with icons.

Options:

☕ Coffee Date

Subtitle:

“good coffee, random conversations”

🎬 Movie + Snacks

Subtitle:

“popcorn included obviously”

🍕 Food Date

Subtitle:

“because food solves everything”

🌇 Evening Walk + Chai

Subtitle:

“simple and peaceful”

🎳 Bowling / Games

Subtitle:

“loser pays for snacks 😂”

🍦 Ice Cream Drive

Subtitle:

“short, sweet, chill”

🎨 Something Random

Subtitle:

“we figure it out on the way”

✨ Surprise Me

Subtitle:

“dangerous choice 😂”

Selected card should animate slightly and glow softly.

After selection show:

“Good choice 😌”

Button:

“Next →”

==================================================

SCREEN 5 — CONDITIONAL PREFERENCES

==================================================

If user selected MOVIE:

Heading:

“Okay movie person 🍿”

Ask:

“What type?”

Options:

- Comedy 😂

- Rom-Com 🫶

- Horror 👻

- Thriller 👀

- Action 💥

- Anything except boring 😭

- You choose

Allow one selection.

--------------------------------

If user selected CAFE / FOOD:

Heading:

“Important question 😂”

Ask:

“What are we eating?”

Options:

- Coffee ☕

- Pizza 🍕

- Dessert 🍰

- Momos 🥟

- Pasta 🍝

- Something spicy 🌶️

- Whatever looks good 😂

- You decide

--------------------------------

If selected bowling/walk/ice cream/random:

Skip this step smoothly.

==================================================

SCREEN 6 — DATE SELECTION

==================================================

Heading:

“When are you free? 📅”

Subheading:

“Pick whatever feels comfortable.”

Show quick date cards dynamically.

Current reference date:

September 2026

Suggested quick options:

Sunday

20 Sep

Friday

25 Sep

Saturday

26 Sep

Sunday

27 Sep

Also include:

“Choose another date 📅”

Clicking it opens a calendar date picker.

IMPORTANT:

Do not allow past dates.

Highlight chosen date beautifully.

Store:

selectedDate

Button:

“Next →”

==================================================

SCREEN 7 — TIME

==================================================

Heading:

“What time works best? ⏰”

Show cards:

🌤️ Afternoon

“1 PM – 4 PM”

🌅 Evening

“4 PM – 7 PM”

🌙 Night-ish

“7 PM – 9 PM”

✨ You decide

“Aryan figures it out”

Also allow:

“Pick exact time”

Use time picker.

Store:

selectedTime

Default visual recommendation:

Evening

But do not force it.

==================================================

SCREEN 8 — LOCATION

==================================================

Heading:

“Where should we meet? 📍”

Options:

“Near your side”

“Near my side”

“Somewhere in between”

“You choose the place”

“Aryan, you decide 😌”

“Surprise me”

Add small helper text:

“No need to decide exact cafe right now.”

Store:

locationPreference

==================================================

SCREEN 9 — ONE RULE

==================================================

Create a special visually different card.

Heading:

“One rule ☝️”

Text:

“Phone thoda side mein rakhenge,

kaam ki baatein thodi kam karenge,

aur bas thoda chill karenge :)”

Then:

“Deal?”

Buttons:

“Deal 😌”

“Depends 😂”

If “Depends 😂”:

Show:

“Fair 😂

Negotiations allowed.”

Then continue.

==================================================

SCREEN 10 — SUMMARY

==================================================

Heading:

“So it’s a plan? 👀”

Create a beautiful ticket/pass style card.

Title inside card:

“Princy + Aryan”

Show dynamically:

Activity:

{{selectedActivity}}

Date:

{{selectedDate}}

Time:

{{selectedTime}}

Preference:

{{activityPreference}}

Location:

{{locationPreference}}

Example:

☕ Coffee

📅 Friday, 25 September

🕕 Evening

📍 Somewhere in between

🍰 Dessert maybe 😌

Then text:

“No pressure.

No labels.

Bas thoda time together. 🌷”

Buttons:

Primary:

“Lock This Plan 🔒✨”

Secondary:

“Wait, I changed my mind 😂”

Secondary button goes back to edit selections.

==================================================

FINAL SUCCESS SCREEN

==================================================

After clicking “Lock This Plan”:

Show smooth celebration animation.

Not confetti explosion.

Use:

- tiny sparkles

- floating stars

- subtle glow

Heading:

“Yayyy 🥹”

Text:

“Plan locked.”

Then:

“Your only job:

show up 😌”

Then:

“Planning meri responsibility.”

Then:

“See you ✨”

Add small note:

“I’ll text you the final place.”

At bottom:

“made specially for Princy 🌷”

Add button:

“See Our Plan”

This shows summary again.

==================================================

DATABASE — SUPABASE

==================================================

Create Supabase table:

date_plans

Fields:

id UUID primary key default gen_random_uuid()

name text default 'Princy'

activity text

activity_preference text nullable

selected_date date

selected_time text

location_preference text

suspicion_level integer

response_type text

deal_response text

status text default 'confirmed'

created_at timestamptz default now()

==================================================

SUPABASE SAVE BEHAVIOR

==================================================

When user clicks:

“Lock This Plan 🔒✨”

Insert data into Supabase.

Do not save partial selections unless needed.

Show toast:

“Plan saved ✨”

Handle errors gracefully:

“Something went wrong 😭

Try once more.”

Do not expose technical errors to the user.

==================================================

OPTIONAL PRIVATE ADMIN PAGE

==================================================

Create route:

/admin

Simple password gate.

Password should come from environment variable.

Example:

VITE_ADMIN_PASSWORD

DO NOT hard-code password.

Admin page heading:

“Princy’s Response 💌”

Display latest response:

Activity

Date

Time

Location

Preference

Response Type

Deal Response

Created At

Also show all past responses in a clean table/cards.

Add:

“Copy Plan”

button.

==================================================

MICROCOPY

==================================================

Use conversational Hinglish.

Examples:

“Good choice 😌”

“Okay okay, noted 😂”

“Solid plan 👀”

“Dangerous choice 😂”

“Fair enough.”

“You really picked surprise me? 😭😂”

Avoid cringe lines.

Avoid:

“My princess”

“My love”

“Soulmate”

“Forever”

“Future wife”

etc.

==================================================

ANIMATIONS

==================================================

Use Framer Motion.

Page transitions:

- fade

- slight slide up

- scale 0.98 → 1

Card selection:

- slight scale

- soft shadow increase

Buttons:

- subtle tap animation

Slider:

smooth.

Final screen:

tiny floating sparkle animation.

Keep all animations lightweight.

==================================================

MOBILE UX

==================================================

VERY IMPORTANT:

Main target screen:

360px–430px wide phones.

Ensure:

- buttons minimum 48px height

- no horizontal overflow

- cards are easy to tap

- typography readable

- date cards wrap properly

- bottom CTA stays visible

Use max-width around:

430px–480px

Center on larger screens.

Desktop can show:

phone-like premium card in center.

==================================================

EXTRA DETAILS

==================================================

Add a small top-right:

“restart ↻”

Click resets everything.

Persist progress temporarily using localStorage.

If user refreshes:

restore current selections.

After final confirmation:

store confirmation locally too.

==================================================

URL META DETAILS

==================================================

Page title:

“Pick Our Plan ✨”

Meta description:

“Just a small plan :)”

Favicon:

minimal pink sparkle/star icon.

==================================================

DO NOT

==================================================

Do not create:

- proposal theme

- wedding design

- heavy romance

- red rose theme

- dark red background

- fake countdown timer

- manipulative “No” button

- moving buttons

- fake urgency

- love confession

- audio autoplay

==================================================

QUALITY EXPECTATION

==================================================

The final website should look like a premium custom-made experience, not a template.

Focus heavily on:

- spacing

- visual hierarchy

- typography

- microinteractions

- mobile usability

- emotional but light-hearted copy

Every screen should feel polished.

Do not leave placeholders.

Implement every interaction.

Create reusable components for:

- option cards

- date cards

- progress

- buttons

- summary ticket

- animations

Make the entire experience functional from start to finish.

Final flow:

Intro

↓

Suspicion Slider

↓

Make a Plan?

↓

Choose Activity

↓

Preference

↓

Choose Date

↓

Choose Time

↓

Choose Location

↓

One Rule

↓

Summary

↓

Confirm

↓

Success

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/008baac4-db36-4cd6-89de-e419b8d8c904).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
