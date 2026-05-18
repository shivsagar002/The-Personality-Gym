import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, SkipForward, Trophy, Dumbbell, Clock, CheckCircle2, RotateCcw } from 'lucide-react';
import { useAppContext } from '../../../context/AppContext';

// ── Rest Countdown Timer ────────────────────────────────────────────────────
const RestTimer = ({ seconds, onDone, onSkip }) => {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    if (remaining <= 0) { onDone(); return; }
    const t = setInterval(() => setRemaining(r => r - 1), 1000);
    return () => clearInterval(t);
  }, [remaining, onDone]);

  const pct = ((seconds - remaining) / seconds) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-8 py-8"
    >
      <p className="text-gym-orange font-black uppercase tracking-[0.3em] text-sm">Rest Time</p>

      {/* Circular countdown */}
      <div className="relative w-40 h-40">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="50" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="none" />
          <circle
            cx="60" cy="60" r="50"
            stroke="#FF5722" strokeWidth="8" fill="none"
            strokeDasharray={`${2 * Math.PI * 50}`}
            strokeDashoffset={`${2 * Math.PI * 50 * (1 - pct / 100)}`}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-black text-white tabular-nums">{remaining}</span>
          <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">seconds</span>
        </div>
      </div>

      <button
        onClick={onSkip}
        className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-black uppercase tracking-widest text-xs rounded-xl transition-all"
      >
        <SkipForward size={16} /> Skip Rest
      </button>
    </motion.div>
  );
};

// ── Exercise View ────────────────────────────────────────────────────────────
const ExerciseView = ({ exercise, setIndex, onCompleteSet }) => (
  <motion.div
    key={`${exercise.id}-set-${setIndex}`}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="space-y-6"
  >
    <div className="flex justify-between items-center">
      <div>
        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">{exercise.target}</p>
        <h3 className="text-2xl md:text-3xl font-black text-white uppercase">{exercise.name}</h3>
      </div>
      <div className="text-right glassmorphism px-4 py-3 rounded-2xl border border-white/10">
        <p className="text-gym-orange font-black text-3xl leading-none">{exercise.reps}</p>
        <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mt-1">REPS</p>
      </div>
    </div>

    {/* Set progress dots */}
    <div className="flex items-center gap-3">
      <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Sets:</span>
      <div className="flex gap-2">
        {Array.from({ length: exercise.sets }).map((_, i) => (
          <div
            key={i}
            className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black border ${
              i < setIndex
                ? 'bg-gym-orange border-gym-orange text-white'
                : i === setIndex
                ? 'border-gym-orange text-gym-orange bg-gym-orange/10 animate-pulse'
                : 'border-white/20 text-gray-600'
            }`}
          >
            {i < setIndex ? '✓' : i + 1}
          </div>
        ))}
      </div>
      <span className="text-white font-black text-sm ml-2">
        Set {setIndex + 1} / {exercise.sets}
      </span>
    </div>

    {/* Instructions */}
    <div className="glassmorphism rounded-2xl p-6 border border-white/5 space-y-3">
      <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
        <Dumbbell size={16} className="text-gym-orange" /> How To Perform
      </h4>
      {exercise.instructions.map((step, i) => (
        <div key={i} className="flex gap-3">
          <span className="w-5 h-5 rounded-full bg-gym-orange/20 text-gym-orange text-[10px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">
            {i + 1}
          </span>
          <p className="text-gray-300 text-sm leading-relaxed">{step}</p>
        </div>
      ))}
    </div>

    <div className="flex gap-4">
      <div className="flex items-center gap-2 text-gray-500 text-xs font-bold">
        <Clock size={14} className="text-gym-orange/60" />
        Rest after set: <span className="text-white">{exercise.restBetweenSets}s</span>
      </div>
    </div>

    <button
      onClick={onCompleteSet}
      className="w-full py-5 bg-gym-orange text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-gym-neon transition-all shadow-[0_0_30px_rgba(255,87,34,0.3)] active:scale-95 flex items-center justify-center gap-3"
    >
      <CheckCircle2 size={20} />
      {setIndex + 1 < exercise.sets ? `Set ${setIndex + 1} Done → Rest` : 'Complete Exercise →'}
    </button>
  </motion.div>
);

// ── Complete Screen ──────────────────────────────────────────────────────────
const CompleteScreen = ({ workout, onClose }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex flex-col items-center gap-8 py-12 text-center"
  >
    <motion.div
      animate={{ rotate: [0, -10, 10, -10, 10, 0], scale: [1, 1.2, 1] }}
      transition={{ duration: 1 }}
      className="text-7xl"
    >
      🏆
    </motion.div>
    <div>
      <h2 className="text-4xl font-black text-white uppercase italic mb-2">Workout Complete!</h2>
      <p className="text-gray-400 text-sm font-bold">You crushed <span className="text-gym-orange">{workout.target}</span> day!</p>
    </div>
    <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
      <div className="glassmorphism rounded-2xl p-4 border border-white/10 text-center">
        <p className="text-3xl font-black text-gym-orange">{workout.totalExercises}</p>
        <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Exercises</p>
      </div>
      <div className="glassmorphism rounded-2xl p-4 border border-white/10 text-center">
        <p className="text-3xl font-black text-gym-orange">
          {workout.exercises.reduce((a, ex) => a + ex.sets, 0)}
        </p>
        <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Total Sets</p>
      </div>
    </div>
    <button
      onClick={onClose}
      className="w-full max-w-sm py-4 bg-gym-orange text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-gym-neon transition-all"
    >
      Back to Dashboard
    </button>
  </motion.div>
);

// ── Main WorkoutRunner Component ─────────────────────────────────────────────
const WorkoutRunner = ({ workout, onClose }) => {
  const { advanceWorkout, workoutSession } = useAppContext();

  if (!workoutSession) return null;

  const { exerciseIndex, setIndex, phase } = workoutSession;
  const currentExercise = workout.exercises[exerciseIndex];
  const progress = ((exerciseIndex * 100) / workout.exercises.length) +
    ((setIndex / currentExercise?.sets || 0) * (100 / workout.exercises.length));

  const isLastSet = setIndex + 1 >= (currentExercise?.sets || 0);
  const restDuration = isLastSet
    ? (currentExercise?.restAfterExercise || 60)
    : (currentExercise?.restBetweenSets || 60);

  return (
    <div className="fixed inset-0 bg-gym-darker z-[100] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <div>
          <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">{workout.target}</p>
          <h2 className="text-white font-black text-xl uppercase">{workout.day} Workout</h2>
        </div>
        <div className="flex items-center gap-4">
          {/* Exercise counter */}
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
            {phase !== 'complete' ? `${exerciseIndex + 1} / ${workout.exercises.length}` : ''}
          </span>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-white bg-white/5 rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      {phase !== 'complete' && (
        <div className="w-full h-1 bg-white/5">
          <motion.div
            className="h-full bg-gym-orange"
            animate={{ width: `${Math.max(2, progress)}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 md:p-10 max-w-2xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {phase === 'complete' ? (
            <CompleteScreen key="complete" workout={workout} onClose={onClose} />
          ) : phase === 'rest' ? (
            <RestTimer
              key={`rest-${exerciseIndex}-${setIndex}`}
              seconds={restDuration}
              onDone={advanceWorkout}
              onSkip={advanceWorkout}
            />
          ) : (
            <ExerciseView
              key={`ex-${exerciseIndex}-${setIndex}`}
              exercise={currentExercise}
              setIndex={setIndex}
              onCompleteSet={advanceWorkout}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Exercise List Footer (collapsed) */}
      {phase !== 'complete' && (
        <div className="border-t border-white/5 px-6 py-4 flex gap-3 overflow-x-auto custom-scrollbar">
          {workout.exercises.map((ex, i) => (
            <div
              key={ex.id}
              className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-colors ${
                i === exerciseIndex
                  ? 'bg-gym-orange text-white border-gym-orange'
                  : i < exerciseIndex
                  ? 'bg-gym-orange/10 text-gym-orange/60 border-gym-orange/20'
                  : 'bg-white/5 text-gray-600 border-white/10'
              }`}
            >
              {ex.name.split(' ').slice(0, 2).join(' ')}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkoutRunner;
