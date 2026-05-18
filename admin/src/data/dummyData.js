// A simple mutable store to share state between pages during frontend prototyping.
// In a real app, this would be replaced by Redux/Context or fetched from a backend database.

export const globalExercises = [
  { id: 'ex-1', name: 'Barbell Bench Press', target: 'Chest', video: 'https://youtube.com/watch?v=rxD321l2svE', instructions: ['Lie on a flat bench.', 'Grip the barbell slightly wider than shoulder-width.', 'Lower the bar to your mid-chest, then press it back up.'] },
  { id: 'ex-2', name: 'Tricep Rope Pushdown', target: 'Triceps', video: 'https://youtube.com/watch?v=vB5OHsJ3EME', instructions: ['Attach a rope to a high cable.', 'Keep elbows tucked in at your sides.', 'Push the rope down until arms are fully extended, then slowly return.'] },
  { id: 'ex-3', name: 'Barbell Squat', target: 'Legs', video: 'https://youtube.com/watch?v=1oed-UmAxFs', instructions: ['Rest the barbell on your upper back.', 'Stand with feet shoulder-width apart.', 'Squat down as if sitting in a chair until thighs are parallel to the floor, then stand back up.'] },
  { id: 'ex-4', name: 'Lat Pulldown', target: 'Back', video: 'https://youtube.com/watch?v=CAwf7n6Luuc', instructions: ['Sit at a lat pulldown machine.', 'Grab the wide bar.', 'Pull the bar down to your upper chest while squeezing your shoulder blades together.'] },
];
