# YUVA — Daily Recomp Tracker

A single-file mobile web app for your workout + diet + progress tracking, tailored to:
5'6" / 76kg · lean muscle gain & recomposition · budget high-protein/high-fiber diet · your exact daily schedule.

## Files
- `index.html` — the app shell (open this one)
- `workout_data.js` — 4-week rotating workout database (Legs/Push/Pull/Full)
- `diet_data.js` — diet plan + local food database used for intake logging
- `app.js` — all the app logic
- `reminder_bot.py` — optional WhatsApp/SMS reminder script (Twilio)

Everything runs client-side. Your logs (weight, water, checklists, food)
are stored only in your phone's browser via `localStorage` — nothing is
uploaded anywhere.

---

## ⚠️ Important: how editing a file updates the app

**Yes — editing any of these files and refreshing the page is enough.**
There's no build step, no compiling, no server-side code. `index.html`
just loads `workout_data.js`, `diet_data.js`, and `app.js` directly in
the browser.

- **If you're running it locally** (opened `index.html` directly, or via
  `python3 -m http.server`): edit the file, save it, then refresh/reload
  the page in your browser. That's it.
- **If you've hosted it** (GitHub Pages / Netlify / Vercel): edit the file,
  then re-upload / re-push it to your host. The live link updates within
  a minute or two. On GitHub Pages specifically: commit + push the changed
  file to your repo, Pages rebuilds automatically.

You never need to touch `index.html` to change workouts or diet — just
edit `workout_data.js` or `diet_data.js`. You only need to edit `app.js`
if you want to change logic (like schedule times or the weekday→split
mapping).

---

## What changed in this version
1. **Renamed** to **YUVA — Daily Recomp Tracker** everywhere (title, header, PWA name).
2. **Today's schedule** now reflects your real commute: home arrival shown
   as **7:15–7:30 PM**, and dinner as a **flexible 7:30–9:30 PM window**
   instead of a fixed time (edit these in the `SCHEDULE` array at the top
   of `app.js`, and in the "Dinner" entry inside `diet_data.js`).
3. **Workout tab reworked**:
   - No more manual Push/Pull/Legs day picker. The app **auto-picks
     today's day** from the real weekday:
     `Mon → Legs · Tue → Push · Wed → Pull · Thu → Push · Fri → Pull · Sat → Full Body · Sun → Rest`
   - **Saturday now has its own dedicated Full Body workout**, separate
     from the Push/Pull/Legs exercises, and it also rotates every week.
   - You can still tap a **Week chip** to preview upcoming weeks' exercises
     (clearly marked "Preview" — only *this week's* checkboxes count as done).
   - Exercises still fully rotate every week (Week 1 Push ≠ Week 2 Push, etc.),
     now across 4 workout types (Push/Pull/Legs/Full) instead of 3.
4. **Diet tab now logs what you actually ate**, not just what you should eat:
   - Every meal card has a **"What did you actually eat?"** section — pick
     a food from the dropdown (a small built-in nutrition database of
     ~26 common budget Indian foods), set quantity, tap Add.
   - A **"Today's Intake"** card at the top auto-totals your **calories,
     protein, carbs, and fiber** from everything logged, against your daily
     targets, with progress bars.
   - A **7-day protein trend chart** at the bottom of the Diet tab shows your
     logged protein each day vs the target line — this is the foundation for
     the "weekly graph" you mentioned; extend `renderNutritionChart()` in
     `app.js` if you want calories/carbs/fiber charted too.
   - Add more foods any time by adding entries to the `FOOD_DB` array in
     `diet_data.js` — each entry just needs a name, a unit, and its
     calories/protein/carbs/fiber for that unit.
5. **Progress tab**:
   - Weight logging now asks **"Weighed In: Before Workout / After Workout"**
     so you can be consistent about when you check the scale.
   - Water intake still counts in **glasses (target 8)**, and now also shows
     the **litre equivalent** next to it (assumes 1 glass ≈ 250ml — change
     `GLASS_ML` at the top of `app.js` if your bottle/glass is a different size).
6. **Reminders tab replaced with a Dashboard tab** (in-browser reminders were
   unreliable, as you found). The new Dashboard shows:
   - **Lean Progress** — starting weight vs current, change, and day streak.
   - **This Week's Adherence** — % of workout exercises checked off, % of
     meals logged, and average daily protein vs target.
   - **Yesterday's Review** — flags anything missed: incomplete workout,
     unchecked meals, or a protein shortfall.
   - **Today's Adjusted Targets** — if yesterday fell short on protein, today's
     target is automatically bumped up a bit to help you catch up; if
     yesterday's workout was incomplete, it suggests adding an extra set
     today to make up the lost volume.

If you'd still like real phone-locked WhatsApp reminders, `reminder_bot.py`
is unchanged in purpose — see the setup steps inside it.

---

## 1. Try it locally first (0 setup)
Just double-tap `index.html` on your phone/laptop, or on a computer:
```
cd yuva-app
python3 -m http.server 8000
```
Then visit `http://localhost:8000` (or `http://<your-laptop-ip>:8000` from
your phone, if both are on the same WiFi).

## 2. Host it for free so you can open it from anywhere
Any static host works since there's no backend. Pick one:

### Option A — GitHub Pages (recommended, free forever)
1. Create a new GitHub repo, e.g. `yuva-tracker`.
2. Upload `index.html`, `workout_data.js`, `diet_data.js`, `app.js` to the repo root.
3. Repo Settings → Pages → Source: "Deploy from branch" → branch `main`, folder `/root`.
4. After ~1 minute you'll get a URL like `https://yourusername.github.io/yuva-tracker/`.
5. Open that URL on your phone → tap **Share → Add to Home Screen** (iOS) or
   **⋮ menu → Install app** (Android Chrome). It now behaves like a real app icon.

### Option B — Netlify (drag-and-drop, free)
1. Go to https://app.netlify.com/drop
2. Drag the whole `yuva-app` folder onto the page.
3. You instantly get a live URL (e.g. `random-name.netlify.app`). Add it to
   your phone's home screen the same way as above.

### Option C — Vercel (free)
1. Go to https://vercel.com, "Add New Project" → "Import" (or use the Vercel CLI: `vercel deploy`).
2. Point it at the folder with these files — no build step needed, it's static.
3. Deploy → open the given URL on your phone.

Any of these three gets you a free, permanent HTTPS link you can open on
your phone anytime, from anywhere, no laptop required after setup.

---

## 3. Using the app
- **Today** — live daily timeline, today's program week & auto-picked split, quick stats.
- **Workout** — today's exercises, auto-picked (no day selection); preview other weeks with the Week chips.
- **Diet** — what you can eat per slot, plus logging of what you actually ate with live macro totals.
- **Progress** — log weight (before/after workout) + water (glasses + litres), trend chart, history table.
- **Dashboard** — lean progress, weekly adherence, yesterday's missed-item alerts, and today's adjusted targets.

## 4. Setting up WhatsApp/SMS reminders (optional but recommended)
See the detailed instructions inside `reminder_bot.py` — short version:
1. `pip install twilio schedule`
2. Activate Twilio's free WhatsApp Sandbox and join it from your phone (one message).
3. Set your Twilio credentials as environment variables.
4. Run `python reminder_bot.py` and leave it running (or deploy it on a free
   always-on service — Oracle Cloud Free Tier, PythonAnywhere free tier, or
   GitHub Actions on a cron schedule — notes are in the script's comments).

If you'd rather skip Twilio entirely: create recurring Google Calendar events
at each reminder time with push notifications on — zero code, works instantly
on your phone.

---

## 5. Editing your plan later
- To change exercises/reps/rest, or the Saturday full-body day: edit `workout_data.js`.
- To change meals, add more foods to the nutrition logger, or adjust daily
  calorie/protein/fiber targets: edit `diet_data.js` (`DIET_DATA`, `FOOD_DB`, `DAILY_TARGET`).
- To change your daily clock times, the weekday→split mapping, or water glass size:
  edit the `SCHEDULE`, and `GLASS_ML` values near the top of `app.js`
  (the weekday→split mapping itself, `SPLIT_CYCLE`, lives in `workout_data.js`).
No build tools, frameworks, or npm installs required — it's plain HTML/CSS/JS.
