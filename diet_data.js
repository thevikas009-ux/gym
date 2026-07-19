// ============================================================
// DIET_DATA — Budget-friendly, high-protein, high-fiber plan
// Tailored for: 76 kg, lean muscle gain / recomposition
// Daily target: ~2250-2400 kcal | ~150-160g protein | ~35g+ fiber
// All items sourced from common Indian kirana/grocery staples.
// ============================================================

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
    time: "After 7:30 PM",
    slot: "Dinner",
    title: "Lighter on carbs, still high protein + fiber-dense veg",
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
