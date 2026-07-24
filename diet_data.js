// ============================================================
// YUVA — Diet Data & Food Database (Expanded Full Menu)
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
  { id: "diet_chiwda_1cup", group: "Munchies & Snacks", name: "Diet Roasted Chiwda / Poha (1 Cup)", cal: 100, protein: 2, carbs: 18, fiber: 2, unit: "cup" },
  { id: "lasun_chivda_1cup", group: "Munchies & Snacks", name: "Lasun Chivda (1 Cup ~30g)", cal: 150, protein: 2, carbs: 18, fiber: 1.5, unit: "cup" },
  { id: "oats_biscuit_2pc", group: "Munchies & Snacks", name: "Oats Biscuits (2 Pieces)", cal: 90, protein: 2, carbs: 14, fiber: 1.5, unit: "2 pcs" },
  { id: "murmura_1cup", group: "Munchies & Snacks", name: "Kurmura / Murmura / Puffed Rice (1 Cup)", cal: 50, protein: 1, carbs: 11, fiber: 0.5, unit: "cup" },
  { id: "bhel_1plate", group: "Munchies & Snacks", name: "Bhel Puri (1 Plate ~150g)", cal: 220, protein: 4, carbs: 38, fiber: 3, unit: "plate" },
  { id: "kurkure_1pkt", group: "Munchies & Snacks", name: "Kurkure / Namkeen Pack (Small 30g)", cal: 160, protein: 1.8, carbs: 17, fiber: 0.5, unit: "pkt" },
  { id: "potato_wafer_1pkt", group: "Munchies & Snacks", name: "Potato Wafers / Chips (Small 30g)", cal: 165, protein: 2, carbs: 16, fiber: 1, unit: "pkt" },
  { id: "puffed_corn_chips", group: "Munchies & Snacks", name: "Puffed Corn Chips / Cheetos (30g)", cal: 145, protein: 1.5, carbs: 19, fiber: 1, unit: "pkt" },

  // --- STREET FOOD & FAST FOOD ---
  { id: "vada_pav_1pc", group: "Street Food & Fast Food", name: "Vada Pav (1 Piece)", cal: 290, protein: 5, carbs: 42, fiber: 3, unit: "pc" },
  { id: "samosa_pav_1pc", group: "Street Food & Fast Food", name: "Samosa Pav (1 Piece)", cal: 320, protein: 6, carbs: 48, fiber: 3.5, unit: "pc" },
  { id: "pav_bhaji_1plate", group: "Street Food & Fast Food", name: "Pav Bhaji (2 Butter Pav + Bhaji)", cal: 420, protein: 8, carbs: 62, fiber: 6, unit: "plate" },
  { id: "veg_burger_1pc", group: "Street Food & Fast Food", name: "Veg Burger (1 Medium)", cal: 350, protein: 9, carbs: 48, fiber: 4, unit: "burger" },
  { id: "veg_pizza_1slice", group: "Street Food & Fast Food", name: "Veg Cheese Pizza (1 Medium Slice)", cal: 240, protein: 9, carbs: 28, fiber: 2, unit: "slice" },
  { id: "veg_momos_6pc", group: "Street Food & Fast Food", name: "Steamed Veg Momos (6 pcs)", cal: 210, protein: 5, carbs: 36, fiber: 2, unit: "plate" },
  { id: "chicken_momos_6pc", group: "Street Food & Fast Food", name: "Steamed Chicken Momos (6 pcs)", cal: 280, protein: 16, carbs: 32, fiber: 1.5, unit: "plate" },

  // --- NOODLES, PASTA & RAMEN ---
  { id: "maggie_1pkt", group: "Noodles & Pasta", name: "Maggie Noodles (1 Pack Cooked)", cal: 310, protein: 7, carbs: 46, fiber: 2, unit: "pack" },
  { id: "ramen_1bowl", group: "Noodles & Pasta", name: "Korean / Veg Ramen Bowl", cal: 380, protein: 8, carbs: 54, fiber: 3, unit: "bowl" },
  { id: "veg_pasta_1bowl", group: "Noodles & Pasta", name: "Veg Pasta (White/Red Sauce - 1 Bowl)", cal: 280, protein: 7, carbs: 42, fiber: 3, unit: "bowl" },
  { id: "chicken_pasta_1bowl", group: "Noodles & Pasta", name: "Chicken Pasta (1 Bowl)", cal: 360, protein: 22, carbs: 40, fiber: 2.5, unit: "bowl" },
  { id: "veg_noodles_1bowl", group: "Noodles & Pasta", name: "Veg Hakka Noodles (1 Bowl)", cal: 290, protein: 6, carbs: 45, fiber: 3, unit: "bowl" },
  { id: "chicken_noodles_1bowl", group: "Noodles & Pasta", name: "Chicken Hakka Noodles (1 Bowl)", cal: 370, protein: 18, carbs: 44, fiber: 2.5, unit: "bowl" },

  // --- SOUTH INDIAN ITEMS ---
  { id: "idli_2pc", group: "South Indian", name: "Steamed Idli (2 pcs + Sambhar)", cal: 150, protein: 5, carbs: 30, fiber: 3, unit: "2 pcs" },
  { id: "medu_vada_2pc", group: "South Indian", name: "Medu Vada (2 pcs + Sambhar)", cal: 310, protein: 7, carbs: 34, fiber: 4, unit: "2 pcs" },
  { id: "masala_dosa_1pc", group: "South Indian", name: "Masala Dosa (1 Medium + Sambhar)", cal: 330, protein: 6, carbs: 52, fiber: 4, unit: "dosa" },
  { id: "dahi_vada_2pc", group: "South Indian", name: "Dahi Vada (2 pcs)", cal: 260, protein: 8, carbs: 32, fiber: 2.5, unit: "plate" },

  // --- SWEETS & DESSERTS ---
  { id: "dark_chocolate_30g", group: "Sweets & Desserts", name: "Dark Chocolate 70%+ (30g / 3 squares)", cal: 170, protein: 2.2, carbs: 13, fiber: 3.2, unit: "30g" },
  { id: "indian_sweet_1pc", group: "Sweets & Desserts", name: "Indian Sweet / Mithai (Gulab Jamun/Laddoo 1 pc)", cal: 150, protein: 2, carbs: 22, fiber: 0.5, unit: "pc" },
  { id: "halwa_1bowl", group: "Sweets & Desserts", name: "Sooji / Gajar Halwa (1 Small Bowl ~100g)", cal: 240, protein: 3.5, carbs: 36, fiber: 1.5, unit: "bowl" },

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

  // --- BREAKFAST & MEAL ITEMS ---
  { id: "boil_potato_1med", group: "Breakfast & Meal Items", name: "Boiled Potato / Aloo (1 Medium ~100g)", cal: 87, protein: 2, carbs: 20, fiber: 1.8, unit: "potato" },
  { id: "soya_chaap_100g", group: "Breakfast & Meal Items", name: "Soya Chaap Cooked (100g)", cal: 210, protein: 16, carbs: 14, fiber: 3, unit: "100g" },
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
      { tag: "veg", text: "1 Bowl Boiled Corn / Poha / Upma / Idli + 1 Scoop Whey" },
      { tag: "nonveg", text: "3 Whole Eggs + 2 Brown Bread Slices + 1 Banana" }
    ]
  },
  {
    time: "01:00 PM",
    slot: "Lunch",
    title: "High-Protein Lunch",
    macroNote: "Target: 40g Protein + Clean Carbs",
    options: [
      { tag: "veg", text: "1 Bowl Dal Khichdi / Masala Rice / 2 Roti + Dal + Soya Chunks/Chaap + Curd" },
      { tag: "nonveg", text: "1 Bowl Masala Rice / 2 Roti + 150g Chicken Curry + Salad" }
    ]
  },
  {
    time: "04:30 PM",
    slot: "Evening Snack",
    title: "Workday Refuel",
    macroNote: "Target: Satiety & Sustained Energy",
    options: [
      { tag: "veg", text: "1 Cup Makhana / Roasted Chana / Diet Chiwda / Bhel + Tea" },
      { tag: "veg", text: "1 Scoop Whey + 1 Banana + 10 Almonds / Peanuts" }
    ]
  },
  {
    time: "08:00 PM",
    slot: "Dinner",
    title: "Light & Clean Dinner",
    macroNote: "Target: Protein Rich, Moderate Carbs",
    options: [
      { tag: "veg", text: "1 Bowl Dal Khichdi / Mixed Veg Soup + Roti + Paneer / Soya Chaap" },
      { tag: "nonveg", text: "1 Bowl Chicken Soup / Grilled Chicken + 1 Roti + Salad" }
    ]
  }
];
