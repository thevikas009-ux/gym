// ============================================================
// YUVA — Diet Data & Food Database
// ============================================================

const DAILY_TARGET = {
  calories: 2300,
  protein: 155,
  carbs: 230,
  fiber: 35
};

const FOOD_DB = [
  // --- FRUITS ---
  { id: "banana_med", group: "Fruits", name: "Banana / Kela (Medium ~100g)", cal: 89, protein: 1.1, carbs: 23, fiber: 2.6, unit: "banana" },
  { id: "banana_small", group: "Fruits", name: "Banana / Kela (Small ~70g)", cal: 62, protein: 0.8, carbs: 16, fiber: 1.8, unit: "banana" },
  { id: "apple_1med", group: "Fruits", name: "Apple / Seb (1 Medium)", cal: 95, protein: 0.5, carbs: 25, fiber: 4.4, unit: "apple" },

  // --- MUNCHIES & HEALTHY SNACKS ---
  { id: "roasted_peanuts_30g", group: "Munchies & Snacks", name: "Roasted Peanuts / Mungfali (30g)", cal: 170, protein: 7.5, carbs: 6, fiber: 2.5, unit: "30g" },
  { id: "roasted_chana_30g", group: "Munchies & Snacks", name: "Roasted Chana / Bhuna Chana (30g)", cal: 110, protein: 6, carbs: 18, fiber: 5, unit: "30g" },
  { id: "makhana_1cup", group: "Munchies & Snacks", name: "Roasted Makhana / Foxnuts (1 Cup)", cal: 70, protein: 2, carbs: 14, fiber: 2, unit: "cup" },
  { id: "khakhra_1pc", group: "Munchies & Snacks", name: "Whole Wheat Khakhra (1 Piece)", cal: 75, protein: 2, carbs: 13, fiber: 2, unit: "piece" },
  { id: "chiwda_1cup", group: "Munchies & Snacks", name: "Poha Chiwda / Namkeen (1 Cup)", cal: 130, protein: 2.5, carbs: 20, fiber: 1.5, unit: "cup" },
  { id: "oats_biscuit_2pc", group: "Munchies & Snacks", name: "Oats Biscuits (2 Pieces)", cal: 90, protein: 2, carbs: 14, fiber: 1.5, unit: "2 pcs" },
  { id: "murmura_1cup", group: "Munchies & Snacks", name: "Kurmura / Murmura / Puffed Rice (1 Cup)", cal: 50, protein: 1, carbs: 11, fiber: 0.5, unit: "cup" },

  // --- SOUPS & STARTERS ---
  { id: "veg_soup_1bowl", group: "Soups & Starters", name: "Mixed Veg Soup (1 Bowl ~250ml)", cal: 65, protein: 2, carbs: 10, fiber: 3, unit: "bowl" },
  { id: "chicken_soup_1bowl", group: "Soups & Starters", name: "Clear Chicken Soup (1 Bowl)", cal: 110, protein: 12, carbs: 4, fiber: 1, unit: "bowl" },

  // --- BEVERAGES, TEA & COFFEE ---
  { id: "coffee_1cup", group: "Beverages & Tea/Coffee", name: "1 Cup Coffee (Milk & Sugar)", cal: 80, protein: 2, carbs: 10, fiber: 0, unit: "cup" },
  { id: "tea_lowsugar", group: "Beverages & Tea/Coffee", name: "1 Cup Milk Tea (Low Sugar)", cal: 60, protein: 2, carbs: 7, fiber: 0, unit: "cup" },
  { id: "tea_jaggery", group: "Beverages & Tea/Coffee", name: "1 Cup Milk Tea (Jaggery/Gud)", cal: 75, protein: 2, carbs: 11, fiber: 0, unit: "cup" },
  { id: "black_coffee", group: "Beverages & Tea/Coffee", name: "Black Coffee / Green Tea", cal: 5, protein: 0.2, carbs: 0.5, fiber: 0, unit: "cup" },
  { id: "whey_1scoop", group: "Beverages & Tea/Coffee", name: "Whey Protein (1 Scoop)", cal: 120, protein: 24, carbs: 2, fiber: 0, unit: "scoop" },
  { id: "milk_250ml", group: "Beverages & Tea/Coffee", name: "Toned Milk (250ml)", cal: 150, protein: 8, carbs: 12, fiber: 0, unit: "glass" },

  // --- BREAKFAST & SNACKS ---
  { id: "boiled_corn_1cup", group: "Breakfast & Meal Items", name: "Boiled Sweet Corn (1 Cup / 150g)", cal: 140, protein: 5, carbs: 28, fiber: 4, unit: "cup" },
  { id: "poha_1plate", group: "Breakfast & Meal Items", name: "Poha (1 Medium Plate)", cal: 220, protein: 4, carbs: 40, fiber: 3, unit: "plate" },
  { id: "upma_1plate", group: "Breakfast & Meal Items", name: "Upma (1 Medium Plate)", cal: 210, protein: 5, carbs: 36, fiber: 3, unit: "plate" },
  { id: "brown_bread_slice", group: "Breakfast & Meal Items", name: "Brown Bread (1 Slice)", cal: 75, protein: 3, carbs: 13, fiber: 2, unit: "slice" },
  { id: "egg_boiled", group: "Breakfast & Meal Items", name: "Whole Boiled Egg", cal: 70, protein: 6, carbs: 0.5, fiber: 0, unit: "egg" },
  { id: "egg_white", group: "Breakfast & Meal Items", name: "Egg White", cal: 17, protein: 3.6, carbs: 0.2, fiber: 0, unit: "egg white" },
  { id: "peanut_butter_1tbsp", group: "Breakfast & Meal Items", name: "Peanut Butter (1 tbsp)", cal: 95, protein: 4, carbs: 3, fiber: 1, unit: "tbsp" },
  { id: "sprouts_1bowl", group: "Breakfast & Meal Items", name: "Moong Sprouts (1 Bowl)", cal: 100, protein: 7, carbs: 18, fiber: 4, unit: "bowl" },
  { id: "paneer_100g", group: "Breakfast & Meal Items", name: "Raw Paneer (100g)", cal: 265, protein: 18, carbs: 3, fiber: 0, unit: "100g" },
  { id: "almonds_10", group: "Breakfast & Meal Items", name: "Almonds (10 pcs)", cal: 70, protein: 2.5, carbs: 2.5, fiber: 1.5, unit: "handful" },

  // --- MAIN MEALS ---
  { id: "khichdi_1bowl", group: "Main Meals", name: "Dal Khichdi (1 Bowl ~200g)", cal: 215, protein: 7.5, carbs: 38, fiber: 4.5, unit: "bowl" },
  { id: "masala_rice_1bowl", group: "Main Meals", name: "Masala Rice / Pulao (1 Bowl)", cal: 210, protein: 4.5, carbs: 42, fiber: 2.5, unit: "bowl" },
  { id: "roti_1", group: "Main Meals", name: "Wheat Roti / Chapati (1 pc)", cal: 85, protein: 3, carbs: 15, fiber: 2, unit: "roti" },
  { id: "dal_1bowl", group: "Main Meals", name: "Cooked Dal (Yellow/Makhani - 1 Bowl)", cal: 150, protein: 8, carbs: 20, fiber: 5, unit: "bowl" },
  { id: "rice_1bowl", group: "Main Meals", name: "Cooked White/Brown Rice (1 Bowl)", cal: 160, protein: 3.5, carbs: 35, fiber: 1, unit: "bowl" },
  { id: "chicken_breast_100g", group: "Main Meals", name: "Chicken Breast Cooked (100g)", cal: 165, protein: 31, carbs: 0, fiber: 0, unit: "100g" },
  { id: "soya_chunks_50g", group: "Main Meals", name: "Soya Chunks Dry (50g)", cal: 170, protein: 26, carbs: 16, fiber: 6, unit: "50g dry" },
  { id: "curd_1bowl", group: "Main Meals", name: "Curd / Dahi (1 Bowl 150g)", cal: 100, protein: 5, carbs: 6, fiber: 0, unit: "bowl" },
  { id: "mixed_veg_1bowl", group: "Main Meals", name: "Mixed Veg Sabzi (1 Bowl)", cal: 120, protein: 3, carbs: 12, fiber: 4, unit: "bowl" },
  { id: "salad_1bowl", group: "Main Meals", name: "Green Cucumber/Tomato Salad", cal: 35, protein: 1, carbs: 7, fiber: 3, unit: "bowl" }
];

function findFood(id) {
  return FOOD_DB.find(f => f.id === id) || null;
}

const DIET_DATA = [
  {
    time: "06:30 AM",
    slot: "Pre-Workout Fuel",
    title: "Morning Kickstart",
    macroNote: "Target: Quick Carbs & Hydration",
    options: [
      { tag: "veg", text: "1 Banana + 1 Cup Coffee/Tea OR 2 Brown Bread Slices" },
      { tag: "nonveg", text: "Black Coffee + 2 Boiled Egg Whites / 1 Banana" }
    ]
  },
  {
    time: "08:45 AM",
    slot: "Breakfast",
    title: "Post-Workout Breakfast",
    macroNote: "Target: 30g+ Protein + Fiber",
    options: [
      { tag: "veg", text: "1 Bowl Boiled Corn / Poha / Upma + 1 Scoop Whey" },
      { tag: "nonveg", text: "3 Whole Eggs + 2 Brown Bread Slices + 1 Banana" }
    ]
  },
  {
    time: "01:00 PM",
    slot: "Lunch",
    title: "High-Protein Lunch",
    macroNote: "Target: 40g Protein + Clean Carbs",
    options: [
      { tag: "veg", text: "1 Bowl Dal Khichdi / Masala Rice / 2 Roti + Dal + Soya Chunks + Curd" },
      { tag: "nonveg", text: "1 Bowl Masala Rice / 2 Roti + 150g Chicken Curry + Salad" }
    ]
  },
  {
    time: "04:30 PM",
    slot: "Evening Snack",
    title: "Workday Refuel",
    macroNote: "Target: Satiety & Sustained Energy",
    options: [
      { tag: "veg", text: "1 Cup Makhana / Roasted Chana / Chiwda + Tea" },
      { tag: "veg", text: "1 Scoop Whey + 1 Banana + 10 Almonds / Peanuts" }
    ]
  },
  {
    time: "08:00 PM",
    slot: "Dinner",
    title: "Light & Clean Dinner",
    macroNote: "Target: Protein Rich, Moderate Carbs",
    options: [
      { tag: "veg", text: "1 Bowl Dal Khichdi / Mixed Veg Soup + Roti + Paneer" },
      { tag: "nonveg", text: "1 Bowl Chicken Soup / Grilled Chicken + 1 Roti + Salad" }
    ]
  }
];
