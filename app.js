// ============================================================
// FORGE — app logic
// All data persists locally on this device via localStorage.
// Nothing is sent anywhere; this is a fully offline personal tracker.
// ============================================================

const LS = {
  startDate: "forge_start_date",
  logs: "forge_daily_logs",       // { "2026-07-19": { weight, water, checks: {ex:[], meal:[]} } }
  selWeek: "forge_sel_week",
  selDay: "forge_sel_day"
};

const DAY_NAMES = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const SCHEDULE = [
  { time: "06:00 AM", label: "Wake up", type: "wake" },
  { time: "06:32 AM", label: "Catch train for gym", type: "commute" },
  { time: "07:00 AM", label: "Gym Workout begins", type: "workout" },
  { time: "08:30 AM", label: "Shower & get ready", type: "routine" },
  { time: "08:45 AM", label: "Post-workout breakfast", type: "meal" },
  { time: "09:00 AM", label: "Office hours begin", type: "routine" },
  { time: "01:00 PM", label: "High-protein lunch", type: "meal" },
  { time: "04:30 PM", label: "Evening snack", type: "meal" },
  { time: "06:00 PM", label: "Office hours end", type: "routine" },
  { time: "07:13 PM", label: "Reach home", type: "commute" },
  { time: "07:30 PM", label: "Dinner", type: "meal" }
];

function todayKey(d = new Date()) {
  return d.toISOString().slice(0, 10);
}

function getLogs() {
  return JSON.parse(localStorage.getItem(LS.logs) || "{}");
}
function saveLogs(logs) {
  localStorage.setItem(LS.logs, JSON.stringify(logs));
}
function getTodayLog() {
  const logs = getLogs();
  const k = todayKey();
  if (!logs[k]) logs[k] = { weight: null, water: 0, checks: {} };
  return { logs, key: k, entry: logs[k] };
}

function getStartDate() {
  let s = localStorage.getItem(LS.startDate);
  if (!s) {
    s = todayKey();
    localStorage.setItem(LS.startDate, s);
  }
  return s;
}

function currentWeekNumber() {
  const start = new Date(getStartDate());
  const now = new Date(todayKey());
  const diffDays = Math.floor((now - start) / 86400000);
  const weekIdx = Math.floor(diffDays / 7) % 4;
  return weekIdx < 0 ? 1 : weekIdx + 1;
}

function todaySplitType() {
  const dow = new Date().getDay(); // 0=Sun
  const idx = dow === 0 ? 6 : dow - 1; // shift so Mon=0..Sun=6
  return SPLIT_CYCLE[idx];
}

function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 1600);
}

// ---------- Navigation ----------
function switchView(name) {
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  document.getElementById("view-" + name).classList.add("active");
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.toggle("active", b.dataset.view === name));
  if (name === "workout") renderWorkoutTab();
  if (name === "diet") renderDietTab();
  if (name === "progress") renderProgressTab();
  if (name === "dashboard") renderDashboard();
}
document.querySelectorAll(".nav-btn").forEach(b => {
  b.addEventListener("click", () => switchView(b.dataset.view));
});

// ---------- Dashboard ----------
function renderDashboard() {
  const now = new Date();
  document.getElementById("headerDate").textContent =
    now.toLocaleDateString(undefined, { weekday: "short", day: "2-digit", month: "short" });

  const week = currentWeekNumber();
  const split = todaySplitType();
  const splitLabel = split === "rest" ? "Rest Day" : split[0].toUpperCase() + split.slice(1) + " Day";
  document.getElementById("dashSub").textContent = `Week ${week} · ${splitLabel}`;

  document.getElementById("startDate").value = getStartDate();

  // Timeline
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const tl = document.getElementById("timeline");
  tl.innerHTML = "";
  SCHEDULE.forEach((item, i) => {
    const [h, m, ampm] = parseTime(item.time);
    const itemMinutes = h * 60 + m;
    const isPast = nowMinutes > itemMinutes + 20;
    const isActive = Math.abs(nowMinutes - itemMinutes) <= 20;
    const div = document.createElement("div");
    div.className = "tl-item" + (isActive ? " active" : "") + (isPast ? " done" : "");
    div.innerHTML = `
      <div class="tl-dot"></div>
      <div class="tl-time">${item.time}</div>
      <div class="tl-label">${item.label}</div>
    `;
    tl.appendChild(div);
  });

  // Stats
  const { entry } = getTodayLog();
  document.getElementById("statWeight").textContent = entry.weight ? entry.weight : "--";
  document.getElementById("statWater").textContent = `${entry.water || 0}/8`;
  document.getElementById("statStreak").textContent = computeStreak();

  // Week badges
  const row = document.getElementById("weekBadgeRow");
  row.innerHTML = "";
  [1, 2, 3, 4].forEach(w => {
    const chip = document.createElement("div");
    chip.className = "chip" + (w === week ? " active" : "");
    chip.textContent = "Week " + w;
    row.appendChild(chip);
  });
}

function parseTime(t) {
  // "06:32 AM" -> [h(24), m]
  const [time, ampm] = t.split(" ");
  let [h, m] = time.split(":").map(Number);
  if (ampm === "PM" && h !== 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;
  return [h, m, ampm];
}

function computeStreak() {
  const logs = getLogs();
  let streak = 0;
  let d = new Date();
  while (true) {
    const k = todayKey(d);
    const e = logs[k];
    const hasActivity = e && (e.weight || (e.checks && Object.values(e.checks).some(v => v)));
    if (!hasActivity) break;
    streak++;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

document.getElementById("startDate").addEventListener("change", (e) => {
  localStorage.setItem(LS.startDate, e.target.value);
  renderDashboard();
});

// ---------- Workout tab ----------
function renderWorkoutTab() {
  const week = parseInt(localStorage.getItem(LS.selWeek)) || currentWeekNumber();
  const day = localStorage.getItem(LS.selDay) || todaySplitType();
  const validDay = day === "rest" ? "push" : day;

  const weekRow = document.getElementById("weekSelectRow");
  weekRow.innerHTML = "";
  [1, 2, 3, 4].forEach(w => {
    const chip = document.createElement("button");
    chip.className = "chip" + (w === week ? " active" : "");
    chip.textContent = "Week " + w;
    chip.onclick = () => { localStorage.setItem(LS.selWeek, w); renderWorkoutTab(); };
    weekRow.appendChild(chip);
  });

  const dayRow = document.getElementById("daySelectRow");
  dayRow.innerHTML = "";
  ["push", "pull", "legs"].forEach(d => {
    const chip = document.createElement("button");
    chip.className = "chip" + (d === validDay ? " active" : "");
    chip.textContent = d[0].toUpperCase() + d.slice(1);
    chip.onclick = () => { localStorage.setItem(LS.selDay, d); renderWorkoutTab(); };
    dayRow.appendChild(chip);
  });

  const focusNotes = {
    push: "Chest · Shoulders · Triceps",
    pull: "Back · Biceps · Rear delts",
    legs: "Quads · Hamstrings · Glutes · Calves · Core"
  };
  document.getElementById("dayFocusNote").textContent = focusNotes[validDay];

  const exercises = WORKOUT_DATA[week][validDay];
  const { entry } = getTodayLog();
  const list = document.getElementById("exerciseList");
  list.innerHTML = "";
  exercises.forEach((ex, i) => {
    const checkId = `w${week}_${validDay}_${i}`;
    const isChecked = !!entry.checks[checkId];
    const card = document.createElement("div");
    card.className = "ex-card";
    card.innerHTML = `
      <img class="ex-img" src="${ex.img}" alt="${ex.name}">
      <div class="ex-body">
        <div class="ex-name">${ex.name}</div>
        <div class="ex-stats">
          <span>SETS <b>${ex.sets}</b></span>
          <span>REPS <b>${ex.reps}</b></span>
          <span>REST <b>${ex.rest}</b></span>
        </div>
      </div>
      <div class="ex-check">
        <button class="check${isChecked ? " on" : ""}" data-id="${checkId}">${isChecked ? "✓" : ""}</button>
      </div>
    `;
    list.appendChild(card);
  });

  list.querySelectorAll(".check").forEach(btn => {
    btn.addEventListener("click", () => {
      const { logs, key, entry } = getTodayLog();
      const id = btn.dataset.id;
      entry.checks[id] = !entry.checks[id];
      logs[key] = entry;
      saveLogs(logs);
      btn.classList.toggle("on");
      btn.textContent = entry.checks[id] ? "✓" : "";
    });
  });
}

// ---------- Diet tab ----------
function renderDietTab() {
  const { entry } = getTodayLog();
  const list = document.getElementById("mealList");
  list.innerHTML = "";
  DIET_DATA.forEach((meal, i) => {
    const checkId = `meal_${i}`;
    const isChecked = !!entry.checks[checkId];
    const card = document.createElement("div");
    card.className = "meal-card";
    const optsHtml = meal.options.map(o =>
      `<div class="meal-opt"><span class="tag ${o.tag}">${o.tag === "veg" ? "Veg" : "Non-Veg"}</span>${o.text}</div>`
    ).join("");
    card.innerHTML = `
      <div class="meal-head">
        <div>
          <div class="meal-time">${meal.time} · ${meal.slot}</div>
          <div class="meal-title">${meal.title}</div>
        </div>
        <button class="check${isChecked ? " on" : ""}" data-id="${checkId}" style="min-width:26px;">${isChecked ? "✓" : ""}</button>
      </div>
      ${optsHtml}
      <div class="meal-opt" style="color:var(--gold); margin-top:8px; font-size:11.5px;">${meal.macroNote}</div>
    `;
    list.appendChild(card);
  });

  list.querySelectorAll(".check").forEach(btn => {
    btn.addEventListener("click", () => {
      const { logs, key, entry } = getTodayLog();
      const id = btn.dataset.id;
      entry.checks[id] = !entry.checks[id];
      logs[key] = entry;
      saveLogs(logs);
      btn.classList.toggle("on");
      btn.textContent = entry.checks[id] ? "✓" : "";
    });
  });
}

// ---------- Progress tab ----------
function renderProgressTab() {
  const { entry } = getTodayLog();
  document.getElementById("inputWeight").value = entry.weight || "";
  document.getElementById("waterCount").textContent = `${entry.water || 0} / 8`;
  renderHistory();
  renderChart();
}

document.getElementById("waterPlus").addEventListener("click", () => {
  const { logs, key, entry } = getTodayLog();
  entry.water = Math.min(20, (entry.water || 0) + 1);
  logs[key] = entry; saveLogs(logs);
  document.getElementById("waterCount").textContent = `${entry.water} / 8`;
});
document.getElementById("waterMinus").addEventListener("click", () => {
  const { logs, key, entry } = getTodayLog();
  entry.water = Math.max(0, (entry.water || 0) - 1);
  logs[key] = entry; saveLogs(logs);
  document.getElementById("waterCount").textContent = `${entry.water} / 8`;
});

document.getElementById("saveProgress").addEventListener("click", () => {
  const { logs, key, entry } = getTodayLog();
  const w = parseFloat(document.getElementById("inputWeight").value);
  if (w) entry.weight = w;
  logs[key] = entry;
  saveLogs(logs);
  showToast("Saved today's log ✓");
  renderHistory();
  renderChart();
  renderDashboard();
});

function renderHistory() {
  const logs = getLogs();
  const keys = Object.keys(logs).sort().reverse().slice(0, 14);
  const box = document.getElementById("historyTable");
  if (!keys.length) { box.innerHTML = `<div class="empty">No entries yet. Log today above.</div>`; return; }
  let html = `<table><tr><th>Date</th><th>Weight</th><th>Water</th></tr>`;
  keys.forEach(k => {
    const e = logs[k];
    html += `<tr><td class="mono">${k.slice(5)}</td><td class="mono">${e.weight || "-"}</td><td class="mono">${e.water || 0}/8</td></tr>`;
  });
  html += `</table>`;
  box.innerHTML = html;
}

function renderChart() {
  const logs = getLogs();
  const keys = Object.keys(logs).filter(k => logs[k].weight).sort();
  const svg = document.getElementById("weightChart");
  svg.innerHTML = "";
  if (keys.length < 2) {
    svg.innerHTML = `<text x="250" y="80" fill="#6b7280" font-size="13" text-anchor="middle">Log weight on 2+ days to see your trend</text>`;
    return;
  }
  const weights = keys.map(k => logs[k].weight);
  const min = Math.min(...weights) - 0.5;
  const max = Math.max(...weights) + 0.5;
  const w = 500, h = 160, padX = 20, padY = 20;
  const stepX = (w - padX * 2) / (keys.length - 1);
  const scaleY = v => h - padY - ((v - min) / (max - min || 1)) * (h - padY * 2);

  let points = keys.map((k, i) => `${padX + i * stepX},${scaleY(logs[k].weight)}`).join(" ");
  let dots = keys.map((k, i) => {
    const x = padX + i * stepX, y = scaleY(logs[k].weight);
    return `<circle cx="${x}" cy="${y}" r="3.5" fill="#e8a93b" />`;
  }).join("");

  svg.innerHTML = `
    <polyline points="${points}" fill="none" stroke="#e8a93b" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    ${dots}
    <line x1="${padX}" y1="${h - padY}" x2="${w - padX}" y2="${h - padY}" stroke="#333a49" stroke-width="1"/>
  `;
}

// ---------- Reminders ----------
document.getElementById("enableNotif").addEventListener("click", async () => {
  if (!("Notification" in window)) {
    document.getElementById("notifStatus").textContent = "This browser doesn't support notifications.";
    return;
  }
  const perm = await Notification.requestPermission();
  document.getElementById("notifStatus").textContent =
    perm === "granted" ? "Enabled — keep this tab/app open around meal & workout times." : "Permission not granted.";
  if (perm === "granted") startNotifWatcher();
});

let notifFired = {};
function startNotifWatcher() {
  setInterval(() => {
    const now = new Date();
    const hhmm = now.toTimeString().slice(0, 5);
    const todayStr = todayKey();
    SCHEDULE.forEach(item => {
      const [h, m] = parseTime(item.time);
      const target = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
      const fireKey = todayStr + item.time;
      if (hhmm === target && !notifFired[fireKey]) {
        notifFired[fireKey] = true;
        new Notification("FORGE Reminder", { body: item.label });
      }
    });
  }, 20000);
}

// ---------- Init ----------
renderDashboard();
setInterval(renderDashboard, 60000);
