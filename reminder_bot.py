"""
FORGE Reminder Bot
-------------------
Sends WhatsApp (or SMS) reminders on your daily schedule using Twilio's
free WhatsApp Sandbox. Works even if your phone is locked or the web
app isn't open, because this runs as its own small always-on script.

SETUP (one-time, ~10 minutes, free):
1. Create a free Twilio account: https://www.twilio.com/try-twilio
2. In the Twilio Console, open "Messaging" -> "Try it out" -> "Send a WhatsApp message"
   to activate the free WhatsApp Sandbox. You'll get:
     - A Twilio WhatsApp sandbox number (looks like: whatsapp:+14155238886)
     - A join code, e.g. "join happy-tiger" — send that exact phrase from
       YOUR WhatsApp to the sandbox number once. This links your phone.
3. Get your Account SID and Auth Token from the Twilio Console dashboard.
4. Install the SDK:  pip install twilio schedule
5. Set the environment variables below (or paste directly, but env vars are safer):
     export TWILIO_ACCOUNT_SID="ACxxxxxxxxxxxxxxxx"
     export TWILIO_AUTH_TOKEN="your_auth_token"
     export MY_WHATSAPP_NUMBER="whatsapp:+91XXXXXXXXXX"   # your number, with country code
6. Run:  python reminder_bot.py
   Leave it running (on a laptop, a Raspberry Pi, or a free cloud VM —
   see hosting notes at the bottom of this file for a $0 always-on option).

This script checks the clock every 30 seconds and fires each reminder once
per day at the scheduled time.
"""

import os
import time
import datetime
import schedule
from twilio.rest import Client

ACCOUNT_SID = os.environ.get("TWILIO_ACCOUNT_SID", "PASTE_YOUR_ACCOUNT_SID")
AUTH_TOKEN = os.environ.get("TWILIO_AUTH_TOKEN", "PASTE_YOUR_AUTH_TOKEN")
FROM_WHATSAPP = "whatsapp:+14155238886"  # Twilio sandbox number — same for everyone
TO_WHATSAPP = os.environ.get("MY_WHATSAPP_NUMBER", "whatsapp:+91XXXXXXXXXX")

client = Client(ACCOUNT_SID, AUTH_TOKEN)

# ---- Your daily schedule -> reminder text ----
# Edit times/messages freely. 24-hour "HH:MM" format.
REMINDERS = [
    ("05:45", "⏰ Pre-workout: black coffee + banana. Gym window opens soon — let's go."),
    ("06:25", "🚆 Train time in 7 min — don't forget your gym bag."),
    ("08:40", "🍳 Post-workout breakfast time — high protein, don't skip this window."),
    ("12:55", "🍽️ Lunch coming up at 1:00–1:30 PM — high protein + fiber, keep it clean."),
    ("16:25", "🥜 Evening snack time — roasted chana / boiled eggs, not vending machine carbs."),
    ("19:15", "🏠 Almost home — plan dinner: protein + veggies, light on carbs."),
    ("19:30", "🍛 Dinner reminder — grilled protein + sabzi. Log it in FORGE once done."),
    ("21:30", "📊 Don't forget to log today's weight & water in the FORGE app."),
]


def send_whatsapp(message: str):
    try:
        client.messages.create(body=message, from_=FROM_WHATSAPP, to=TO_WHATSAPP)
        print(f"[{datetime.datetime.now()}] Sent: {message}")
    except Exception as e:
        print(f"[{datetime.datetime.now()}] FAILED to send: {e}")


def schedule_all():
    for time_str, message in REMINDERS:
        schedule.every().day.at(time_str).do(send_whatsapp, message=message)
        # Skip weekends automatically for office-hour-specific reminders if you want —
        # e.g. only run gym/office reminders on weekdays:
        # schedule.every().monday.at(time_str).do(send_whatsapp, message=message)
        # ...repeat for tuesday..friday, and use a shorter list for Sat/Sun.


if __name__ == "__main__":
    schedule_all()
    print("FORGE reminder bot running. Press Ctrl+C to stop.")
    while True:
        schedule.run_pending()
        time.sleep(30)


# ------------------------------------------------------------------
# FREE 24/7 HOSTING OPTIONS FOR THIS SCRIPT (so it runs even when your
# laptop is off):
#
# OPTION A — GitHub Actions (fully free, recommended):
#   Instead of a long-running loop, split this into a single "check and
#   send if due" run, then use a GitHub Actions workflow with a cron
#   trigger (e.g. every 5 minutes) to execute it. GitHub's free tier
#   gives ~2000 min/month for private repos, unlimited for public repos.
#   Store TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN / MY_WHATSAPP_NUMBER as
#   GitHub Actions "Secrets" instead of plain env vars.
#
# OPTION B — Google Calendar (zero code, 2 minutes):
#   Create recurring calendar events at each reminder time with
#   notifications set to "Notification" (push) — Google Calendar's app
#   already sends free, reliable phone push notifications, no Twilio
#   needed at all. This is the fastest fallback if you'd rather skip
#   the Twilio setup entirely.
#
# OPTION C — Free-tier always-on VM:
#   Services like Oracle Cloud's Always Free tier or PythonAnywhere's
#   free tier can keep a lightweight script like this running 24/7 at
#   no cost — upload this file and run it with `python reminder_bot.py`
#   inside a `screen`/`tmux` session (or as a scheduled task on
#   PythonAnywhere, which has a built-in free task scheduler).
# ------------------------------------------------------------------
