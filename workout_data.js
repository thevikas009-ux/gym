// ============================================================
// WORKOUT_DATA — 4-week rotating Push / Pull / Legs program
// Goal: Lean muscle gain + body recomposition
// Schedule fit: 07:00–08:30 AM gym window (6 day split, PPL x2, 1 rest day)
// Images: placehold.co text-cards (always load, zero API keys needed).
// Swap the `img` field for real Unsplash/Pexels/GIF URLs any time —
// the layout doesn't care about the source.
// ============================================================

function img(label, tint) {
  const bg = "262c3a";
  const fg = tint || "e8a93b";
  return `https://placehold.co/160x160/${bg}/${fg}?font=inter&text=${encodeURIComponent(label)}`;
}

const WORKOUT_DATA = {
  1: {
    push: [
      { name: "Barbell Bench Press", sets: 4, reps: "6-8", rest: "90s", img: img("Bench Press") },
      { name: "Seated Overhead Barbell Press", sets: 3, reps: "8-10", rest: "90s", img: img("OHP") },
      { name: "Incline Dumbbell Press", sets: 3, reps: "10-12", rest: "75s", img: img("Incline DB Press") },
      { name: "Cable Lateral Raise", sets: 3, reps: "12-15", rest: "45s", img: img("Lateral Raise") },
      { name: "Triceps Rope Pushdown", sets: 3, reps: "12-15", rest: "60s", img: img("Rope Pushdown") },
      { name: "Flat Bench Dips", sets: 3, reps: "10-12", rest: "60s", img: img("Bench Dips") }
    ],
    pull: [
      { name: "Conventional Deadlift", sets: 4, reps: "5-6", rest: "120s", img: img("Deadlift") },
      { name: "Wide-Grip Pull-Ups", sets: 3, reps: "6-10", rest: "90s", img: img("Pull-Ups") },
      { name: "Barbell Bent-Over Row", sets: 3, reps: "8-10", rest: "90s", img: img("Bent Over Row") },
      { name: "Face Pulls", sets: 3, reps: "15-20", rest: "45s", img: img("Face Pull") },
      { name: "Barbell Curl", sets: 3, reps: "10-12", rest: "60s", img: img("Barbell Curl") },
      { name: "Hammer Curl", sets: 3, reps: "10-12", rest: "60s", img: img("Hammer Curl") }
    ],
    legs: [
      { name: "Barbell Back Squat", sets: 4, reps: "6-8", rest: "120s", img: img("Back Squat") },
      { name: "Romanian Deadlift", sets: 3, reps: "8-10", rest: "90s", img: img("Romanian Deadlift") },
      { name: "Leg Press", sets: 3, reps: "10-12", rest: "90s", img: img("Leg Press") },
      { name: "Walking Lunges", sets: 3, reps: "12/leg", rest: "60s", img: img("Walking Lunges") },
      { name: "Standing Calf Raise", sets: 4, reps: "15-20", rest: "45s", img: img("Calf Raise") },
      { name: "Hanging Knee Raise", sets: 3, reps: "12-15", rest: "45s", img: img("Knee Raise") }
    ]
  },
  2: {
    push: [
      { name: "Incline Barbell Press", sets: 4, reps: "6-8", rest: "90s", img: img("Incline Barbell") },
      { name: "Dumbbell Shoulder Press", sets: 3, reps: "8-10", rest: "90s", img: img("DB Shoulder Press") },
      { name: "Flat Dumbbell Press", sets: 3, reps: "10-12", rest: "75s", img: img("Flat DB Press") },
      { name: "Front Raise", sets: 3, reps: "12-15", rest: "45s", img: img("Front Raise") },
      { name: "Overhead Triceps Extension", sets: 3, reps: "12-15", rest: "60s", img: img("OH Triceps Ext") },
      { name: "Push-Up (feet elevated)", sets: 3, reps: "AMRAP", rest: "60s", img: img("Push-Up") }
    ],
    pull: [
      { name: "Romanian Deadlift (deficit)", sets: 4, reps: "6-8", rest: "120s", img: img("RDL Deficit") },
      { name: "Lat Pulldown (wide)", sets: 3, reps: "8-10", rest: "90s", img: img("Lat Pulldown") },
      { name: "Pendlay Row", sets: 3, reps: "8-10", rest: "90s", img: img("Pendlay Row") },
      { name: "Rear Delt Fly", sets: 3, reps: "15", rest: "45s", img: img("Rear Delt Fly") },
      { name: "Incline Dumbbell Curl", sets: 3, reps: "10-12", rest: "60s", img: img("Incline DB Curl") },
      { name: "Cable Curl", sets: 3, reps: "12-15", rest: "60s", img: img("Cable Curl") }
    ],
    legs: [
      { name: "Front Squat", sets: 4, reps: "6-8", rest: "120s", img: img("Front Squat") },
      { name: "Seated Leg Curl", sets: 3, reps: "10-12", rest: "75s", img: img("Leg Curl") },
      { name: "Bulgarian Split Squat", sets: 3, reps: "10/leg", rest: "75s", img: img("Bulgarian Split Squat") },
      { name: "Leg Extension", sets: 3, reps: "12-15", rest: "60s", img: img("Leg Extension") },
      { name: "Seated Calf Raise", sets: 4, reps: "15-20", rest: "45s", img: img("Seated Calf Raise") },
      { name: "Cable Crunch", sets: 3, reps: "15", rest: "45s", img: img("Cable Crunch") }
    ]
  },
  3: {
    push: [
      { name: "Decline Bench Press", sets: 4, reps: "6-8", rest: "90s", img: img("Decline Bench") },
      { name: "Arnold Press", sets: 3, reps: "8-10", rest: "90s", img: img("Arnold Press") },
      { name: "Cable Chest Fly", sets: 3, reps: "12-15", rest: "60s", img: img("Cable Fly") },
      { name: "Cable Lateral Raise", sets: 3, reps: "12-15", rest: "45s", img: img("Cable Lateral") },
      { name: "Close-Grip Bench Press", sets: 3, reps: "8-10", rest: "75s", img: img("Close-Grip Bench") },
      { name: "Diamond Push-Up", sets: 3, reps: "AMRAP", rest: "60s", img: img("Diamond Push-Up") }
    ],
    pull: [
      { name: "Rack Pulls", sets: 4, reps: "5-6", rest: "120s", img: img("Rack Pulls") },
      { name: "Chin-Ups", sets: 3, reps: "6-10", rest: "90s", img: img("Chin-Ups") },
      { name: "T-Bar Row", sets: 3, reps: "8-10", rest: "90s", img: img("T-Bar Row") },
      { name: "Cable Face Pull", sets: 3, reps: "15-20", rest: "45s", img: img("Face Pull") },
      { name: "Preacher Curl", sets: 3, reps: "10-12", rest: "60s", img: img("Preacher Curl") },
      { name: "Concentration Curl", sets: 3, reps: "12-15", rest: "60s", img: img("Concentration Curl") }
    ],
    legs: [
      { name: "Goblet Squat", sets: 4, reps: "10-12", rest: "90s", img: img("Goblet Squat") },
      { name: "Stiff-Leg Deadlift", sets: 3, reps: "8-10", rest: "90s", img: img("Stiff-Leg Deadlift") },
      { name: "Hack Squat", sets: 3, reps: "10-12", rest: "90s", img: img("Hack Squat") },
      { name: "Step-Ups", sets: 3, reps: "12/leg", rest: "60s", img: img("Step-Ups") },
      { name: "Donkey Calf Raise", sets: 4, reps: "15-20", rest: "45s", img: img("Donkey Calf Raise") },
      { name: "Russian Twist", sets: 3, reps: "20", rest: "45s", img: img("Russian Twist") }
    ]
  },
  4: {
    push: [
      { name: "Machine Chest Press", sets: 4, reps: "8-10", rest: "90s", img: img("Machine Chest Press") },
      { name: "Push Press", sets: 3, reps: "6-8", rest: "90s", img: img("Push Press") },
      { name: "Incline Cable Fly", sets: 3, reps: "12-15", rest: "60s", img: img("Incline Cable Fly") },
      { name: "Skull Crushers", sets: 3, reps: "10-12", rest: "60s", img: img("Skull Crushers") },
      { name: "Band Pull-Apart", sets: 3, reps: "15-20", rest: "45s", img: img("Pull-Apart") },
      { name: "Dips (chest lean)", sets: 3, reps: "10-12", rest: "75s", img: img("Dips") }
    ],
    pull: [
      { name: "Trap Bar Deadlift", sets: 4, reps: "6-8", rest: "120s", img: img("Trap Bar Deadlift") },
      { name: "Assisted Pull-Up", sets: 3, reps: "8-10", rest: "90s", img: img("Assisted Pull-Up") },
      { name: "One-Arm Dumbbell Row", sets: 3, reps: "10/side", rest: "75s", img: img("1-Arm DB Row") },
      { name: "Reverse Pec Deck", sets: 3, reps: "15", rest: "45s", img: img("Reverse Pec Deck") },
      { name: "Barbell 21s Curl", sets: 3, reps: "21", rest: "60s", img: img("21s Curl") },
      { name: "Rope Hammer Curl", sets: 3, reps: "12-15", rest: "60s", img: img("Rope Hammer Curl") }
    ],
    legs: [
      { name: "Box Squat", sets: 4, reps: "6-8", rest: "120s", img: img("Box Squat") },
      { name: "Good Mornings", sets: 3, reps: "10-12", rest: "90s", img: img("Good Mornings") },
      { name: "Narrow Leg Press", sets: 3, reps: "10-12", rest: "90s", img: img("Narrow Leg Press") },
      { name: "Reverse Lunges", sets: 3, reps: "12/leg", rest: "60s", img: img("Reverse Lunges") },
      { name: "Single-Leg Calf Raise", sets: 3, reps: "12-15/leg", rest: "45s", img: img("Single-Leg Calf Raise") },
      { name: "Weighted Plank", sets: 3, reps: "45s hold", rest: "45s", img: img("Weighted Plank") }
    ]
  }
};

// 6-day split cycle used to derive "today's" workout in the app:
// index 0 = Mon ... 6 = Sun
const SPLIT_CYCLE = ["push", "pull", "legs", "push", "pull", "legs", "rest"];
