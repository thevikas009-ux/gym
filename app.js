// ============================================================
// YUVA — Fully Synced Multi-Date App Logic
// ============================================================

const LS = {
  startDate: "yuva_start_date",
  logs: "yuva_daily_logs",
  selWeek: "yuva_sel_week",
  selDate: "yuva_workout_sel_date",
  progressSelDate: "yuva_progress_sel_date"
};

const GLASS_ML = 250; 

const SCHEDULE = [
  { time: "06:00 AM", label: "Wake up" },
  { time: "06:32 AM", label: "Catch train for gym" },
  { time: "07:00 AM", label: "Gym workout begins" },
  { time: "08:30 AM", label: "Shower & get ready" },
  { time: "08:45 AM", label: "Post-workout breakfast" },
  { time: "09:00 AM", label: "Office hours begin" },
  { time: "01:00 PM", label: "High-protein lunch" },
  { time: "04:30 PM", label: "Evening snack" },
  { time: "06:00 PM", label: "Office hours end" },
  { time: "07:15 PM", label: "Reach home (7:15–7:30 PM)" },
  { time: "08:00 PM", label: "Dinner window (7:30–9:30 PM)" }
];

const WEEKDAY_KEYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

function todayKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function parseDateKey(key) {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function getLogs() {
  return JSON.parse(localStorage.getItem(LS.logs) || "{}");
}
function saveLogs(logs) {
  localStorage.setItem(LS.logs, JSON.stringify(logs));
  refreshAllActiveViews();
}

function ensureEntry(logs, key) {
  if (!logs[key]) logs[key] = { weight: null, weighTiming: null, water: 0, checks: {}, foodLog: {} };
  if (!logs[key].checks) logs[key].checks = {};
  if (!logs[key].foodLog) logs[key].foodLog = {};
  return logs[key];
}

function getEntryForDate(dateStr) {
  const logs = getLogs();
  const entry = ensureEntry(logs, dateStr);
  return { logs, key: dateStr, entry };
}

function getTodayLog() {
  return getEntryForDate(todayKey());
}

function getWorkoutSelDate() {
  return localStorage.getItem(LS.selDate) || todayKey();
}
function setWorkoutSelDate(dateStr) {
  localStorage.setItem(LS.selDate, dateStr);
}

function getProgressSelDate() {
  return localStorage.getItem(LS.progressSelDate) || todayKey();
}
function setProgressSelDate(dateStr) {
  localStorage.setItem(LS.progressSelDate, dateStr);
}

function getStartDate() {
  let s = localStorage.getItem(LS.startDate);
  if (!s) {
    s = todayKey();
    localStorage.setItem(LS.startDate, s);
  }
  return s;
}

function weekNumberForDate(d) {
  const start = parseDateKey(getStartDate());
  const target = parseDateKey(todayKey(d));
  const diffDays = Math.floor((target - start) / 86400000);
  const weekIdx = Math.floor(diffDays / 7) % 4;
  return weekIdx < 0 ? ((weekIdx % 4) + 4) % 4 + 1 : weekIdx + 1;
}

function currentWeekNumber() {
  return weekNumberForDate(new Date());
}

function splitTypeForDate(d) {
  const dow = d.getDay(); 
  const idx = dow === 0 ? 6 : dow - 1; 
  return SPLIT_CYCLE[WEEKDAY_KEYS[idx]];
}

function todaySplitType() {
  return splitTypeForDate(new Date());
}

function showToast(msg) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 1600);
}

function refreshAllActiveViews() {
  renderTodayTab();
  renderWorkoutTab();
  renderDietTab();
  renderProgressTab();
  renderInsightsTab();
}

// ---------- Navigation ----------
function switchView(name) {
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  document.getElementById("view-" + name).classList.add("active");
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.toggle("active", b.dataset.view === name));
  if (name === "workout") renderWorkoutTab();
  if (name === "diet") renderDietTab();
  if (name === "progress") renderProgressTab();
  if (name === "today") renderTodayTab();
  if (name === "insights") renderInsightsTab();
}
document.querySelectorAll(".nav-btn").forEach(b => {
  b.addEventListener("click", () => switchView(b.dataset.view));
});

// ---------- Today tab ----------
function parseTime(t) {
  const [time, ampm] = t.split(" ");
  let [h, m] = time.split(":").map(Number);
  if (ampm === "PM" && h !== 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;
  return [h, m, ampm];
}

function renderTodayTab() {
  const now = new Date();
  document.getElementById("headerDate").textContent =
    now.toLocaleDateString(undefined, { weekday: "short", day: "2-digit", month: "short" });

  const week = currentWeekNumber();
  const split = todaySplitType();
  const splitLabel = split === "rest" ? "Rest Day" : split === "full" ? "Full Body Day" : split[0].toUpperCase() + split.slice(1) + " Day";
  document.getElementById("dashSub").textContent = `Week ${week} · ${splitLabel}`;

  document.getElementById("startDate").value = getStartDate();

  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const tl = document.getElementById("timeline");
  tl.innerHTML = "";
  SCHEDULE.forEach((item) => {
    const [h, m] = parseTime(item.time);
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

  const { entry } = getTodayLog();
  document.getElementById("statWeight").textContent = entry.weight ? entry.weight : "--";
  document.getElementById("statWater").textContent = `${entry.water || 0}/8`;
  document.getElementById("statStreak").textContent = computeStreak();

  const row = document.getElementById("weekBadgeRow");
  row.innerHTML = "";
  [1, 2, 3, 4].forEach(w => {
    const chip = document.createElement("div");
    chip.className = "chip" + (w === week ? " active" : "");
    chip.textContent = "Week " + w;
    row.appendChild(chip);
  });
}

function computeStreak() {
  const logs = getLogs();
  let streak = 0;
  let d = new Date();
  
  while (true) {
    const k = todayKey(d);
    const e = logs[k];
    
    // Check if user did any activity on this day
    const hasWeight = e && e.weight != null;
    const hasWater = e && e.water > 0;
    const hasChecks = e && e.checks && Object.values(e.checks).some(v => v === true);
    const hasFood = e && e.foodLog && Object.values(e.foodLog).some(arr => arr && arr.length > 0);

    if (hasWeight || hasWater || hasChecks || hasFood) {
      streak++;
      d.setDate(d.getDate() - 1);
    } else {
      // If today has no log yet, check if streak existed up to yesterday
      if (k === todayKey()) {
        d.setDate(d.getDate() - 1);
        continue;
      }
      break;
    }
  }
  return streak;
}

document.getElementById("startDate")?.addEventListener("change", (e) => {
  localStorage.setItem(LS.startDate, e.target.value);
  refreshAllActiveViews();
});

// ---------- Workout tab ----------
function renderWorkoutTab() {
  const selDateStr = getWorkoutSelDate();
  const workoutDateElem = document.getElementById("workoutDate");
  if (workoutDateElem) workoutDateElem.value = selDateStr;
  
  renderQuickDateChips(selDateStr);

  const selDate = parseDateKey(selDateStr);
  const currentWeek = weekNumberForDate(selDate);
  const previewWeek = parseInt(localStorage.getItem(LS.selWeek)) || currentWeek;
  const isPreview = previewWeek !== currentWeek;
  const split = splitTypeForDate(selDate);
  const isToday = selDateStr === todayKey();

  const dayName = selDate.toLocaleDateString(undefined, { weekday: "long" });
  const dateLabel = selDate.toLocaleDateString(undefined, { day: "2-digit", month: "short" });
  const splitLabel = split === "rest" ? "REST DAY" : split === "full" ? "FULL BODY DAY" : split.toUpperCase() + " DAY";
  
  const todaySplitElem = document.getElementById("todaySplitBig");
  if (todaySplitElem) {
    todaySplitElem.textContent = `${isToday ? "TODAY" : dayName.toUpperCase()} ${dateLabel} · ${splitLabel}`;
  }
  
  const dayFocusElem = document.getElementById("dayFocusNote");
  if (dayFocusElem) {
    dayFocusElem.textContent = (isPreview ? `Previewing Week ${previewWeek} exercises. ` : "") + SPLIT_FOCUS[split];
  }

  const weekRow = document.getElementById("weekSelectRow");
  if (weekRow) {
    weekRow.innerHTML = "";
    [1, 2, 3, 4].forEach(w => {
      const chip = document.createElement("button");
      chip.className = "chip" + (w === previewWeek ? " active" : "");
      chip.textContent = "Week " + w + (w === currentWeek ? " (Match)" : "");
      chip.onclick = () => { localStorage.setItem(LS.selWeek, w); renderWorkoutTab(); };
      weekRow.appendChild(chip);
    });
  }

  const list = document.getElementById("exerciseList");
  if (!list) return;
  list.innerHTML = "";

  if (split === "rest") {
    list.innerHTML = `<div class="card"><div class="card-title">Rest &amp; Recovery</div><div class="card-sub" style="margin-bottom:0;">No lifting on ${dateLabel}.</div></div>`;
    return;
  }

  const exercises = WORKOUT_DATA[previewWeek][split];
  const { entry } = getEntryForDate(selDateStr);

  exercises.forEach((ex, i) => {
    const checkId = `w${previewWeek}_${split}_${i}`;
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
        ${isPreview
          ? `<span style="font-size:10px; color:var(--text-faint);">Preview</span>`
          : `<button class="check${isChecked ? " on" : ""}" data-id="${checkId}">${isChecked ? "✓" : ""}</button>`
        }
      </div>
    `;
    list.appendChild(card);
  });

  list.querySelectorAll(".check").forEach(btn => {
    btn.addEventListener("click", () => {
      const { logs, key, entry } = getEntryForDate(selDateStr);
      const id = btn.dataset.id;
      entry.checks[id] = !entry.checks[id];
      logs[key] = entry;
      saveLogs(logs);
    });
  });
}

function renderQuickDateChips(selDateStr) {
  const row = document.getElementById("quickDateRow");
  if (!row) return;
  row.innerHTML = "";
  
  const today = parseDateKey(todayKey());
  let days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    days.push(todayKey(d));
  }

  days.forEach(k => {
    const d = parseDateKey(k);
    const chip = document.createElement("button");
    chip.className = "chip" + (k === selDateStr ? " active" : "");
    chip.textContent = (k === todayKey() ? "Today" : d.toLocaleDateString(undefined, { weekday: "short", day: "numeric" }));
    chip.onclick = () => { 
      setWorkoutSelDate(k); 
      localStorage.setItem(LS.selWeek, weekNumberForDate(parseDateKey(k)));
      renderWorkoutTab(); 
    };
    row.appendChild(chip);
  });
}

document.getElementById("workoutDate")?.addEventListener("change", (e) => {
  if (!e.target.value) return;
  setWorkoutSelDate(e.target.value);
  localStorage.setItem(LS.selWeek, weekNumberForDate(parseDateKey(e.target.value)));
  renderWorkoutTab();
});

// ---------- Diet tab ----------
function computeDayMacros(entry) {
  const totals = { calories: 0, protein: 0, carbs: 0, fiber: 0 };
  if (!entry || !entry.foodLog) return totals;
  Object.values(entry.foodLog).forEach(items => {
    (items || []).forEach(it => {
      const f = findFood(it.foodId);
      if (!f) return;
      totals.calories += f.cal * it.qty;
      totals.protein += f.protein * it.qty;
      totals.carbs += f.carbs * it.qty;
      totals.fiber += f.fiber * it.qty;
    });
  });
  return totals;
}

function renderIntakeTargets(totals) {
  const box = document.getElementById("intakeTargets");
  if (!box) return;
  const rows = [
    { key: "calories", label: "Calories", unit: "kcal", target: DAILY_TARGET.calories },
    { key: "protein", label: "Protein", unit: "g", target: DAILY_TARGET.protein },
    { key: "carbs", label: "Carbs", unit: "g", target: DAILY_TARGET.carbs },
    { key: "fiber", label: "Fiber", unit: "g", target: DAILY_TARGET.fiber }
  ];
  box.innerHTML = rows.map(r => {
    const val = Math.round(totals[r.key] * 10) / 10;
    const pct = Math.min(100, Math.round((totals[r.key] / r.target) * 100));
    return `
      <div class="target-row">
        <div class="tr-head"><span>${r.label}</span><b>${val} / ${r.target}${r.unit}</b></div>
        <div class="bar-track"><div class="bar-fill" style="width:${pct}%;"></div></div>
      </div>
    `;
  }).join("");
}

function foodOptionsHtml() {
  return FOOD_DB.map(f => `<option value="${f.id}">${f.name} (${f.unit})</option>`).join("");
}

function renderDietTab() {
  const { entry } = getTodayLog();
  const totals = computeDayMacros(entry);
  renderIntakeTargets(totals);

  const list = document.getElementById("mealList");
  if (!list) return;
  list.innerHTML = "";
  DIET_DATA.forEach((meal, i) => {
    const checkId = `meal_${i}`;
    const isChecked = !!entry.checks[checkId];
    const optsHtml = meal.options.map(o =>
      `<div class="meal-opt"><span class="tag ${o.tag}">${o.tag === "veg" ? "Veg" : "Non-Veg"}</span>${o.text}</div>`
    ).join("");

    const loggedItems = entry.foodLog[i] || [];
    const loggedHtml = loggedItems.map((it, idx) => {
      const f = findFood(it.foodId);
      if (!f) return "";
      return `
        <div class="logged-item">
          <span>${f.name} × ${it.qty}</span>
          <span class="macros">${Math.round(f.cal * it.qty)}kcal · ${Math.round(f.protein * it.qty * 10) / 10}g P
            <button class="remove-x" data-meal="${i}" data-idx="${idx}">✕</button>
          </span>
        </div>`;
    }).join("");

    const card = document.createElement("div");
    card.className = "meal-card";
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
      <div class="log-box">
        <div class="log-box-title">What did you actually eat?</div>
        <div id="loggedList_${i}">${loggedHtml || `<div class="card-sub" style="margin:0 0 6px;">Nothing logged yet for this meal.</div>`}</div>
        <div class="log-form">
          <select id="foodSelect_${i}">${foodOptionsHtml()}</select>
          <input type="number" id="foodQty_${i}" value="1" min="0.5" step="0.5">
          <button class="btn small" data-add-meal="${i}">Add</button>
        </div>
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
    });
  });

  list.querySelectorAll("[data-add-meal]").forEach(btn => {
    btn.addEventListener("click", () => {
      const mealIdx = btn.dataset.addMeal;
      const foodId = document.getElementById(`foodSelect_${mealIdx}`).value;
      const qty = parseFloat(document.getElementById(`foodQty_${mealIdx}`).value) || 1;
      const { logs, key, entry } = getTodayLog();
      if (!entry.foodLog[mealIdx]) entry.foodLog[mealIdx] = [];
      entry.foodLog[mealIdx].push({ foodId, qty });
      logs[key] = entry;
      saveLogs(logs);
      showToast("Food logged ✓");
    });
  });

  list.querySelectorAll(".remove-x").forEach(btn => {
    btn.addEventListener("click", () => {
      const mealIdx = btn.dataset.meal;
      const idx = parseInt(btn.dataset.idx);
      const { logs, key, entry } = getTodayLog();
      entry.foodLog[mealIdx].splice(idx, 1);
      logs[key] = entry;
      saveLogs(logs);
    });
  });

  renderNutritionChart();
}

function renderNutritionChart() {
  const svg = document.getElementById("nutritionChart");
  if (!svg) return;
  const logs = getLogs();
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d);
  }
  const values = days.map(d => {
    const e = logs[todayKey(d)];
    return e ? computeDayMacros(e).protein : 0;
  });
  const max = Math.max(DAILY_TARGET.protein, ...values, 10);
  const w = 500, h = 160, padX = 24, padY = 24, barGap = 10;
  const barW = (w - padX * 2 - barGap * (days.length - 1)) / days.length;

  let bars = "";
  days.forEach((d, i) => {
    const val = values[i];
    const barH = (val / max) * (h - padY * 2);
    const x = padX + i * (barW + barGap);
    const y = h - padY - barH;
    const isToday = i === days.length - 1;
    bars += `<rect x="${x}" y="${y}" width="${barW}" height="${barH}" rx="4" fill="${isToday ? '#e8a93b' : '#5fd6a8'}" opacity="${val > 0 ? 1 : 0.15}"/>`;
    bars += `<text x="${x + barW / 2}" y="${h - 6}" font-size="10" fill="#9aa1b0" text-anchor="middle">${d.toLocaleDateString(undefined, { weekday: 'narrow' })}</text>`;
    if (val > 0) bars += `<text x="${x + barW / 2}" y="${y - 5}" font-size="10" fill="#eef0f2" text-anchor="middle">${Math.round(val)}</text>`;
  });
  const targetY = h - padY - (DAILY_TARGET.protein / max) * (h - padY * 2);
  bars += `<line x1="${padX}" y1="${targetY}" x2="${w - padX}" y2="${targetY}" stroke="#ff7a59" stroke-width="1.5" stroke-dasharray="4,4"/>`;

  svg.innerHTML = bars;
}

// ---------- Progress tab (Weight & Water Backfill) ----------
function renderProgressTab() {
  const selDateStr = getProgressSelDate();
  
  const progDateElem = document.getElementById("progressLogDate");
  if (progDateElem) {
    progDateElem.value = selDateStr;
  }

  renderProgressQuickDateChips(selDateStr);

  const { entry } = getEntryForDate(selDateStr);
  
  const weightInput = document.getElementById("inputWeight");
  if (weightInput) weightInput.value = entry.weight !== null ? entry.weight : "";
  
  const waterCount = document.getElementById("waterCount");
  if (waterCount) waterCount.textContent = `${entry.water || 0} / 8`;
  
  const waterLiters = document.getElementById("waterLiters");
  if (waterLiters) waterLiters.textContent = (((entry.water || 0) * GLASS_ML) / 1000).toFixed(2) + " L";

  const timingRow = document.getElementById("weighTimingRow");
  if (timingRow) {
    timingRow.innerHTML = "";
    [["before", "Before Workout"], ["after", "After Workout"]].forEach(([val, label]) => {
      const chip = document.createElement("button");
      chip.className = "chip" + (entry.weighTiming === val ? " active" : "");
      chip.textContent = label;
      chip.onclick = () => {
        const { logs, key, entry } = getEntryForDate(getProgressSelDate());
        entry.weighTiming = val;
        logs[key] = entry;
        saveLogs(logs);
      };
      timingRow.appendChild(chip);
    });
  }

  renderHistory();
  renderChart();
}

function renderProgressQuickDateChips(selDateStr) {
  const row = document.getElementById("progressQuickDateRow");
  if (!row) return;
  row.innerHTML = "";
  
  const today = parseDateKey(todayKey());
  let days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    days.push(todayKey(d));
  }

  days.forEach(k => {
    const d = parseDateKey(k);
    const chip = document.createElement("button");
    chip.className = "chip" + (k === selDateStr ? " active" : "");
    chip.textContent = (k === todayKey() ? "Today" : d.toLocaleDateString(undefined, { weekday: "short", day: "numeric" }));
    chip.onclick = () => { 
      setProgressSelDate(k); 
      renderProgressTab(); 
    };
    row.appendChild(chip);
  });
}

document.getElementById("progressLogDate")?.addEventListener("change", (e) => {
  if (!e.target.value) return;
  setProgressSelDate(e.target.value);
  renderProgressTab();
});

document.getElementById("waterPlus")?.addEventListener("click", () => {
  const { logs, key, entry } = getEntryForDate(getProgressSelDate());
  entry.water = Math.min(20, (entry.water || 0) + 1);
  logs[key] = entry; 
  saveLogs(logs);
});

document.getElementById("waterMinus")?.addEventListener("click", () => {
  const { logs, key, entry } = getEntryForDate(getProgressSelDate());
  entry.water = Math.max(0, (entry.water || 0) - 1);
  logs[key] = entry; 
  saveLogs(logs);
});

document.getElementById("saveProgress")?.addEventListener("click", () => {
  const targetDate = getProgressSelDate();
  const { logs, key, entry } = getEntryForDate(targetDate);
  const w = parseFloat(document.getElementById("inputWeight").value);
  if (!isNaN(w)) entry.weight = w;
  logs[key] = entry;
  saveLogs(logs);
  showToast(`Saved for ${targetDate} ✓`);
});

function renderHistory() {
  const logs = getLogs();
  const keys = Object.keys(logs).sort().reverse().slice(0, 14);
  const box = document.getElementById("historyTable");
  if (!box) return;
  if (!keys.length) { box.innerHTML = `<div class="empty">No entries yet.</div>`; return; }
  let html = `<table><tr><th>Date</th><th>Weight</th><th>When</th><th>Water</th></tr>`;
  keys.forEach(k => {
    const e = logs[k];
    const when = e.weighTiming ? (e.weighTiming === "before" ? "Before" : "After") : "-";
    html += `<tr><td class="mono">${k.slice(5)}</td><td class="mono">${e.weight != null ? e.weight : "-"}</td><td class="mono">${when}</td><td class="mono">${e.water || 0}/8 · ${(((e.water || 0) * GLASS_ML) / 1000).toFixed(2)}L</td></tr>`;
  });
  html += `</table>`;
  box.innerHTML = html;
}

function renderChart() {
  const logs = getLogs();
  const keys = Object.keys(logs).filter(k => logs[k].weight != null).sort();
  const svg = document.getElementById("weightChart");
  if (!svg) return;
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

// ---------- Dashboard / Insights tab ----------
function renderInsightsTab() {
  const logs = getLogs();
  renderLeanStats(logs);
  renderAdherence(logs);
  const review = renderYesterdayAlerts(logs);
  renderAdjustedTargets(review);
}

function renderLeanStats(logs) {
  const weightKeys = Object.keys(logs).filter(k => logs[k].weight != null).sort();
  const box = document.getElementById("leanStats");
  if (!box) return;
  if (!weightKeys.length) {
    box.innerHTML = `<div class="empty" style="grid-column:1/-1;">Log weight in Progress to see stats.</div>`;
    return;
  }
  const start = logs[weightKeys[0]].weight;
  const current = logs[weightKeys[weightKeys.length - 1]].weight;
  const delta = Math.round((current - start) * 10) / 10;
  const deltaStr = (delta > 0 ? "+" : "") + delta + " kg";
  box.innerHTML = `
    <div class="stat-box"><div class="stat-num mono">${start}</div><div class="stat-lbl">Start (kg)</div></div>
    <div class="stat-box"><div class="stat-num mono">${current}</div><div class="stat-lbl">Current (kg)</div></div>
    <div class="stat-box"><div class="stat-num mono">${deltaStr}</div><div class="stat-lbl">Change</div></div>
    <div class="stat-box"><div class="stat-num mono">${computeStreak()}</div><div class="stat-lbl">Day Streak</div></div>
  `;
}

function weekStartDate() {
  const d = new Date();
  const dow = d.getDay();
  const diffToMon = dow === 0 ? 6 : dow - 1;
  d.setDate(d.getDate() - diffToMon);
  d.setHours(0, 0, 0, 0);
  return d;
}

function renderAdherence(logs) {
  const monday = weekStartDate();
  const today = new Date();
  let expectedEx = 0, actualEx = 0, expectedMeals = 0, actualMeals = 0, proteinDays = 0, proteinTotal = 0;

  for (let d = new Date(monday); d <= today; d.setDate(d.getDate() + 1)) {
    const key = todayKey(d);
    const e = logs[key];
    const split = splitTypeForDate(d);
    const week = weekNumberForDate(d);
    if (split !== "rest") {
      const list = WORKOUT_DATA[week][split] || [];
      expectedEx += list.length;
      if (e) {
        list.forEach((ex, i) => { if (e.checks && e.checks[`w${week}_${split}_${i}`]) actualEx++; });
      }
    }
    expectedMeals += 6;
    if (e) {
      for (let m = 0; m < 6; m++) { if (e.checks && e.checks[`meal_${m}`]) actualMeals++; }
      const macros = computeDayMacros(e);
      if (macros.protein > 0) { proteinDays++; proteinTotal += macros.protein; }
    }
  }

  const exPct = expectedEx ? Math.round((actualEx / expectedEx) * 100) : 0;
  const mealPct = expectedMeals ? Math.round((actualMeals / expectedMeals) * 100) : 0;
  const avgProtein = proteinDays ? Math.round(proteinTotal / proteinDays) : 0;

  const barElem = document.getElementById("adherenceBars");
  if (!barElem) return;
  barElem.innerHTML = `
    <div class="target-row">
      <div class="tr-head"><span>Workout completion</span><b>${actualEx}/${expectedEx} · ${exPct}%</b></div>
      <div class="bar-track"><div class="bar-fill" style="width:${exPct}%;"></div></div>
    </div>
    <div class="target-row">
      <div class="tr-head"><span>Meals logged</span><b>${actualMeals}/${expectedMeals} · ${mealPct}%</b></div>
      <div class="bar-track"><div class="bar-fill" style="width:${mealPct}%;"></div></div>
    </div>
    <div class="target-row">
      <div class="tr-head"><span>Avg daily protein</span><b>${avgProtein}g / ${DAILY_TARGET.protein}g</b></div>
      <div class="bar-track"><div class="bar-fill" style="width:${Math.min(100, Math.round((avgProtein / DAILY_TARGET.protein) * 100))}%;"></div></div>
    </div>
  `;
}

function renderYesterdayAlerts(logs) {
  const y = new Date();
  y.setDate(y.getDate() - 1);
  const key = todayKey(y);
  const e = logs[key];
  const split = splitTypeForDate(y);
  const week = weekNumberForDate(y);
  const box = document.getElementById("yesterdayAlerts");
  const alerts = [];
  let proteinShortfall = 0;
  let workoutMissed = false;
  let workoutInfo = null;

  if (split !== "rest") {
    const list = WORKOUT_DATA[week][split] || [];
    let done = 0;
    if (e) list.forEach((ex, i) => { if (e.checks && e.checks[`w${week}_${split}_${i}`]) done++; });
    if (done < list.length) {
      workoutMissed = true;
      workoutInfo = { split, done, total: list.length };
      alerts.push({ type: "warn", text: `Only ${done}/${list.length} ${split} exercises marked done yesterday.` });
    }
  }

  let mealsChecked = 0;
  if (e) for (let m = 0; m < 6; m++) { if (e.checks && e.checks[`meal_${m}`]) mealsChecked++; }
  if (mealsChecked < 6) {
    alerts.push({ type: "warn", text: `${6 - mealsChecked} meal slot(s) not checked off yesterday.` });
  }

  const macros = e ? computeDayMacros(e) : { protein: 0 };
  if (macros.protein > 0 && macros.protein < DAILY_TARGET.protein - 10) {
    proteinShortfall = Math.round(DAILY_TARGET.protein - macros.protein);
    alerts.push({ type: "warn", text: `Protein was ${proteinShortfall}g short yesterday (${Math.round(macros.protein)}g vs ${DAILY_TARGET.protein}g target).` });
  } else if (macros.protein === 0) {
    alerts.push({ type: "warn", text: `No food logged yesterday — can't verify protein intake.` });
  }

  if (box) {
    if (!alerts.length) {
      box.innerHTML = `<div class="alert ok">✅ Yesterday was fully on track — workout done, meals logged, protein hit.</div>`;
    } else {
      box.innerHTML = alerts.map(a => `<div class="alert warn">⚠️ ${a.text}</div>`).join("");
    }
  }

  return { proteinShortfall, workoutMissed, workoutInfo };
}

function renderAdjustedTargets(review) {
  const box = document.getElementById("adjustedTargets");
  if (!box) return;
  const bumps = [];

  const proteinBump = Math.min(25, Math.round((review.proteinShortfall || 0) * 0.5));
  const adjustedProtein = DAILY_TARGET.protein + proteinBump;
  if (proteinBump > 0) {
    bumps.push(`<div class="alert tip">🎯 Protein target today: <b>${adjustedProtein}g</b> (${proteinBump}g catch-up).</div>`);
  } else {
    bumps.push(`<div class="alert tip">🎯 Protein target today: <b>${DAILY_TARGET.protein}g</b> — on track.</div>`);
  }

  if (review.workoutMissed && review.workoutInfo) {
    bumps.push(`<div class="alert tip">💪 Yesterday's ${review.workoutInfo.split} day incomplete (${review.workoutInfo.done}/${review.workoutInfo.total}). Add 1 extra set to main lifts today.</div>`);
  }

  box.innerHTML = bumps.join("");
}

// ---------- Init ----------
refreshAllActiveViews();
setInterval(renderTodayTab, 60000);
