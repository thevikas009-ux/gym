# FORGE — Your Personal Recomp Tracker

A single-file mobile web app for your workout + diet + reminders, tailored to:
5'6" / 76kg · lean muscle gain & recomposition · budget high-protein/high-fiber diet · your exact daily schedule.

## Files
- `index.html` — the app shell (open this one)
- `workout_data.js` — 4-week rotating Push/Pull/Legs database
- `diet_data.js` — budget high-protein/high-fiber meal plan
- `app.js` — all the app logic (schedule timeline, checklists, progress log, notifications)
- `reminder_bot.py` — optional WhatsApp/SMS reminder script (Twilio)

Everything runs client-side. Your logs (weight, water, checklists) are stored
only in your phone's browser via `localStorage` — nothing is uploaded anywhere.

---

## 1. Try it locally first (0 setup)
Just double-tap `index.html` on your phone/laptop, or on a computer:
```
cd forge-app
python3 -m http.server 8000
```
Then visit `http://localhost:8000` (or `http://<your-laptop-ip>:8000` from
your phone, if both are on the same WiFi).

## 2. Host it for free so you can open it from anywhere
Any static host works since there's no backend. Pick one:

### Option A — GitHub Pages (recommended, free forever)
1. Create a new GitHub repo, e.g. `forge-tracker`.
2. Upload `index.html`, `workout_data.js`, `diet_data.js`, `app.js` to the repo root.
3. Repo Settings → Pages → Source: "Deploy from branch" → branch `main`, folder `/root`.
4. After ~1 minute you'll get a URL like `https://yourusername.github.io/forge-tracker/`.
5. Open that URL on your phone → tap **Share → Add to Home Screen** (iOS) or
   **⋮ menu → Install app** (Android Chrome). It now behaves like a real app icon.

### Option B — Netlify (drag-and-drop, free)
1. Go to https://app.netlify.com/drop
2. Drag the whole `forge-app` folder onto the page.
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
- **Today tab** — shows your live daily timeline (wake → gym → office → meals → home),
  today's program week & split (Push/Pull/Legs), quick stats, and lets you set
  your **Program Start Date** once (the app auto-rotates Weeks 1→4→1→4… from there).
- **Workout tab** — pick any week/day to preview it; tap the circle next to an
  exercise to check it off as done today.
- **Diet tab** — today's full meal map with Veg/Non-Veg swappable options;
  check off meals as you eat them.
- **Progress tab** — log weight + water, see a trend line and a 14-day history table.
- **Remind tab** — turn on in-browser notifications, or set up the WhatsApp
  bot below for reminders that work even when your phone is locked.

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
- To change exercises/reps/rest: edit `workout_data.js`.
- To change meals: edit `diet_data.js`.
- To change your daily clock times: edit the `SCHEDULE` array at the top of `app.js`.
No build tools, frameworks, or npm installs required — it's plain HTML/CSS/JS.
