// ============================================================
// DIET_DATA — Budget-friendly, high-protein, high-fiber plan
// Tailored for: 76 kg, lean muscle gain / recomposition
// Daily target: ~2250-2400 kcal | ~150-160g protein | ~35g+ fiber | ~250g carbs (approx)
// All items sourced from common Indian kirana/grocery staples.
// ============================================================

const DAILY_TARGET = { calories: 2325, protein: 160, carbs: 250, fiber: 35 };

const DIET_DATA = [
  {
    time: "05:45 AM",
    slot: "Pre-Workout",
    title: "Light Fuel — don't train fully fasted",
    options: [
      { tag: "veg", text: "1 banana + black coffee (or 5-6 soaked almonds + black coffee)" },
      { tag: "veg", text: "Alt: 1 tsp honey in warm water + black coffee if banana isn't handy" }
    ],
    macroNote: "~110 kcal · 2g protein — just enough glycogen, no heavy digestion before lifting."
  },
  {
    time: "08:45 AM",
    slot: "Post-Workout / Breakfast",
    title: "Refuel the muscle you just worked",
    options: [
      { tag: "nonveg", text: "3 whole eggs + 2 egg whites bhurji (onion-tomato-chili) + 2 slices whole wheat toast" },
      { tag: "veg", text: "2 besan-veggie chilla + 1 cup curd + a handful of roasted chana" },
      { tag: "veg", text: "Alt: Oats (60g dry) cooked in milk + 1 scoop whey or 30g soya chunks mixed in" }
    ],
    macroNote: "~450-500 kcal · 35-40g protein · 6-8g fiber"
  },
  {
    time: "01:00 – 01:30 PM",
    slot: "Lunch",
    title: "The anchor meal — build it around dal + protein + veg",
    options: [
      { tag: "nonveg", text: "2 whole wheat roti + 150g grilled/curry chicken breast + 1 cup dal + cucumber-tomato salad" },
      { tag: "veg", text: "2 whole wheat roti + 150g paneer bhurji or curry + 1 cup rajma/chole + salad + 1 cup curd" },
      { tag: "veg", text: "Alt: Brown rice (1 cup) + sprouts + moong dal + sautéed seasonal veggies" }
    ],
    macroNote: "~600-650 kcal · 45-50g protein · 10-12g fiber"
  },
  {
    time: "04:30 PM",
    slot: "Evening Snack (at office)",
    title: "Keep it protein-forward, no vending machine carbs",
    options: [
      { tag: "veg", text: "Roasted chana (1 fist) + 1 fruit (apple/guava/orange)" },
      { tag: "nonveg", text: "2 boiled eggs + a small handful of peanuts" },
      { tag: "veg", text: "Alt: Sprouts chaat (moong+chana) with lemon and onion, or 1 cup curd + roasted flax seeds" }
    ],
    macroNote: "~250-300 kcal · 15-18g protein · 6g fiber"
  },
  {
    time: "7:30 – 9:30 PM",
    slot: "Dinner",
    title: "Flexible window — you reach home ~7:15-7:30, dinner can slide up to 9:30",
    options: [
      { tag: "nonveg", text: "150-180g grilled chicken breast or fish + large mixed veg sabzi + 1 small roti" },
      { tag: "veg", text: "Soya chunks curry (60g dry soya) or paneer (100g) + palak/mixed veg sabzi + 1 small roti" },
      { tag: "veg", text: "Alt: Moong dal chilla (2) + paneer bhurji + sautéed veggies, skip the rice/roti" }
    ],
    macroNote: "~450-500 kcal · 40-45g protein · 8-10g fiber"
  },
  {
    time: "Anytime",
    slot: "Free Top-Ups",
    title: "Use these to hit protein/fiber targets without blowing budget",
    options: [
      { tag: "veg", text: "Buttermilk / chaas, roasted makhana, cucumber-carrot sticks, guava, seasonal salad" },
      { tag: "nonveg", text: "Extra 2 boiled eggs (cheapest protein per rupee available almost anywhere)" }
    ],
    macroNote: "Fill gaps — don't skip fiber sources (sprouts, salad, seasonal veg) even on busy days."
  }
];

const BUDGET_STAPLES = [
  "Eggs", "Soya chunks / soya chaap", "Paneer", "Chicken breast (buy in bulk, freeze)",
  "Moong / chana / rajma / masoor dal", "Sprouts (moong + chana, sprout at home for near-zero cost)",
  "Oats", "Whole wheat atta", "Curd / buttermilk", "Seasonal vegetables & salad veg",
  "Roasted chana & peanuts", "Bananas & guava (cheap, high-fiber fruit)"
];

// ------------------------------------------------------------
// FOOD_DB — small local nutrition database (per stated unit).
// Used by the Diet tab's "What did you actually eat?" logger to
// auto-calculate calories / protein / carbs / fiber for the day —
// no external nutrition API, everything works fully offline.
// Values are standard approximate figures for common Indian
// household portions; adjust anytime to match your own cooking.
// ------------------------------------------------------------
const FOOD_DB = [
  { id: "egg",        name: "Egg (whole, cooked)",        unit: "1 egg",        cal: 70,  protein: 6,   carbs: 0.5, fiber: 0 },
  { id: "egg_white",  name: "Egg White",                  unit: "1 egg white",  cal: 17,  protein: 3.6, carbs: 0.2, fiber: 0 },
  { id: "oats",       name: "Oats (dry, cooked)",          unit: "50g dry",      cal: 190, protein: 7,   carbs: 33,  fiber: 5 },
  { id: "banana",     name: "Banana",                      unit: "1 medium",     cal: 105, protein: 1.3, carbs: 27,  fiber: 3.1 },
  { id: "roti",       name: "Whole Wheat Roti",             unit: "1 roti",       cal: 80,  protein: 2.5, carbs: 15,  fiber: 2 },
  { id: "rice",       name: "Brown Rice (cooked)",          unit: "1 cup",        cal: 216, protein: 5,   carbs: 45,  fiber: 3.5 },
  { id: "dal",        name: "Dal (cooked)",                 unit: "1 cup",        cal: 230, protein: 18,  carbs: 40,  fiber: 15 },
  { id: "rajma",      name: "Rajma / Chole (cooked)",       unit: "1 cup",        cal: 270, protein: 15,  carbs: 45,  fiber: 11 },
  { id: "paneer",     name: "Paneer",                       unit: "100g",         cal: 265, protein: 18,  carbs: 6,   fiber: 0 },
  { id: "chicken",    name: "Chicken Breast (cooked)",      unit: "100g",         cal: 165, protein: 31,  carbs: 0,   fiber: 0 },
  { id: "fish",       name: "Fish (grilled)",               unit: "100g",         cal: 140, protein: 26,  carbs: 0,   fiber: 0 },
  { id: "soya",       name: "Soya Chunks (dry, cooked)",    unit: "30g dry",      cal: 100, protein: 16,  carbs: 7,   fiber: 4 },
  { id: "curd",       name: "Curd / Dahi",                  unit: "1 cup",        cal: 150, protein: 8,   carbs: 11,  fiber: 0 },
  { id: "milk",       name: "Milk",                         unit: "1 cup",        cal: 150, protein: 8,   carbs: 12,  fiber: 0 },
  { id: "buttermilk", name: "Buttermilk / Chaas",           unit: "1 glass",      cal: 40,  protein: 2,   carbs: 4,   fiber: 0 },
  { id: "sprouts",    name: "Sprouts (moong/chana)",        unit: "1 cup",        cal: 105, protein: 9,   carbs: 19,  fiber: 8 },
  { id: "chana",      name: "Roasted Chana",                unit: "1 fist (30g)", cal: 120, protein: 7,   carbs: 20,  fiber: 5 },
  { id: "peanuts",    name: "Peanuts",                      unit: "30g",          cal: 170, protein: 7,   carbs: 6,   fiber: 2.5 },
  { id: "almonds",    name: "Almonds (soaked)",             unit: "6 pcs",        cal: 42,  protein: 1.5, carbs: 1.5, fiber: 0.9 },
  { id: "veg_mixed",  name: "Mixed Veg Sabzi",              unit: "1 cup",        cal: 120, protein: 4,   carbs: 15,  fiber: 5 },
  { id: "salad",      name: "Salad (cucumber/tomato)",      unit: "1 bowl",       cal: 40,  protein: 1.5, carbs: 8,   fiber: 3 },
  { id: "besan",      name: "Besan Chilla",                 unit: "1 piece",      cal: 120, protein: 6,   carbs: 14,  fiber: 3 },
  { id: "toast",      name: "Whole Wheat Toast",            unit: "1 slice",      cal: 70,  protein: 3,   carbs: 12,  fiber: 2 },
  { id: "whey",       name: "Whey Protein",                 unit: "1 scoop",      cal: 120, protein: 24,  carbs: 3,   fiber: 0 },
  { id: "guava",      name: "Guava",                        unit: "1 medium",     cal: 68,  protein: 2.6, carbs: 14,  fiber: 5 },
  { id: "apple",      name: "Apple",                        unit: "1 medium",     cal: 95,  protein: 0.5, carbs: 25,  fiber: 4.4 }
];

function findFood(id) {
  return FOOD_DB.find(f => f.id === id);
}
