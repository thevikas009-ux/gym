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
  // --- Fruits ---
  { id: "banana_med", name: "Banana / Kela (Medium ~100g)", cal: 89, protein: 1.1, carbs: 23, fiber: 2.6, unit: "banana" },
  { id: "banana_small", name: "Banana / Kela (Small ~70g)", cal: 62, protein: 0.8, carbs: 16, fiber: 1.8, unit: "banana" },

  // --- Beverages & Tea/Coffee ---
  { id: "coffee_1cup", name: "1 Cup Coffee (Milk & Sugar)", cal: 80, protein: 2, carbs: 10, fiber: 0, unit: "cup" },
  { id: "tea_lowsugar", name: "1 Cup Milk Tea (Low Sugar)", cal: 60, protein: 2, carbs: 7, fiber: 0, unit: "cup" },
  { id: "tea_jaggery", name: "1 Cup Milk Tea (Jaggery/Gud)", cal: 75, protein: 2, carbs: 11, fiber: 0, unit: "cup" },
  { id: "black_coffee", name: "Black Coffee / Green Tea", cal: 5, protein: 0.2, carbs: 0.5, fiber: 0, unit: "cup" },
  { id: "whey_1scoop", name: "Whey Protein (1 Scoop)", cal: 120, protein: 24, carbs: 2, fiber: 0, unit: "scoop" },
  { id: "milk_250ml", name: "Toned Milk (250ml)", cal: 150, protein: 8, carbs: 12, fiber: 0, unit: "glass" },

  // --- Breakfast & Snacks ---
  { id: "poha_1plate", name: "Poha (1 Medium Plate)", cal: 220, protein: 4, carbs: 40, fiber: 3, unit: "plate" },
  { id: "upma_1plate", name: "Upma (1 Medium Plate)", cal: 210, protein: 5, carbs: 36, fiber: 3, unit: "plate" },
  { id: "brown_bread_slice", name: "Brown Bread (1 Slice)", cal: 75, protein: 3, carbs: 13, fiber: 2, unit: "slice" },
  { id: "egg_boiled", name: "Whole Boiled Egg", cal: 70, protein: 6, carbs: 0.5, fiber: 0, unit: "egg" },
  { id: "egg_white", name: "Egg White", cal: 17, protein: 3.6, carbs: 0.2, fiber: 0, unit: "egg white" },
  { id: "peanut_butter_1tbsp", name: "Peanut Butter (1 tbsp)", cal: 95, protein: 4, carbs: 3, fiber: 1, unit: "tbsp" },
  { id: "sprouts_1bowl", name: "Moong Sprouts (1 Bowl)", cal: 100, protein: 7, carbs: 18, fiber: 4, unit: "bowl" },
  { id: "paneer_100g", name: "Raw Paneer (100g)", cal: 265, protein: 18, carbs: 3, fiber: 0, unit: "100g" },
  { id: "almonds_10", name: "Almonds (10 pcs)", cal: 70, protein: 2.5, carbs: 2.5, fiber: 1.5, unit: "handful" },

  // --- Main Meals (Lunch / Dinner) ---
  { id: "roti_1", name: "Wheat Roti / Chapati (1 pc)", cal: 85, protein: 3, carbs: 15, fiber: 2, unit: "roti" },
  { id: "dal_1bowl", name: "Cooked Dal (Yellow/Makhani - 1 Bowl)", cal: 150, protein: 8, carbs: 20, fiber: 5, unit: "bowl" },
  { id: "rice_1bowl", name: "Cooked White/Brown Rice (1 Bowl)", cal: 160, protein: 3.5, carbs: 35, fiber: 1, unit: "bowl" },
  { id: "chicken_breast_100g", name: "Chicken Breast Cooked (100g)", cal: 165, protein: 31, carbs: 0, fiber: 0, unit: "100g" },
  { id: "soya_chunks_50g", name: "Soya Chunks Dry (50g)", cal: 170, protein: 26, carbs: 16, fiber: 6, unit: "50g dry" },
  { id: "curd_1bowl", name: "Curd / Dahi (1 Bowl 150g)", cal: 100, protein: 5, carbs: 6, fiber: 0, unit: "bowl" },
  { id: "mixed_veg_1bowl", name: "Mixed Veg Sabzi (1 Bowl)", cal: 120, protein: 3, carbs: 12, fiber: 4, unit: "bowl" },
  { id: "salad_1bowl", name: "Green Cucumber/Tomato Salad", cal: 35, protein: 1, carbs: 7, fiber: 3, unit: "bowl" }
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
      { tag: "veg", text: "1 Plate Poha / Upma + 1 Scoop Whey + 1 Banana" },
      { tag: "nonveg", text: "3 Whole Eggs + 2 Brown Bread Slices + 1 Banana" }
    ]
  },
  {
    time: "01:00 PM",
    slot: "Lunch",
    title: "High-Protein Lunch",
    macroNote: "Target: 40g Protein + Clean Carbs",
    options: [
      { tag: "veg", text: "2 Roti + 1 Bowl Dal + 50g Soya Chunks Sabzi + Curd + Salad" },
      { tag: "nonveg", text: "2 Roti / Rice + 150g Chicken Curry + Dal + Salad" }
    ]
  },
  {
    time: "04:30 PM",
    slot: "Evening Snack",
    title: "Workday Refuel",
    macroNote: "Target: Satiety & Sustained Energy",
    options: [
      { tag: "veg", text: "1 Cup Milk Tea (Low Sugar / Jaggery) + 1 Banana / Sprouts" },
      { tag: "veg", text: "1 Scoop Whey + 1 Banana + 10 Almonds" }
    ]
  },
  {
    time: "08:00 PM",
    slot: "Dinner",
    title: "Light & Clean Dinner",
    macroNote: "Target: Protein Rich, Moderate Carbs",
    options: [
      { tag: "veg", text: "2 Roti + 1 Bowl Dal + 100g Paneer Bhurji / Sabzi + Salad" },
      { tag: "nonveg", text: "150g Grilled Chicken / Fish + 1 Roti + Dal + Salad" }
    ]
  }
];
