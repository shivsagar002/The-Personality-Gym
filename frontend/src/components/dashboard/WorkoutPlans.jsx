import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dumbbell, ChevronDown, ChevronRight, PlayCircle, Clock,
  Flame, Moon, Target, Info, Lock
} from 'lucide-react';
import { workoutSchedule, getTodaysWorkout } from '../../data/workoutData';
import { useAppContext } from '../../context/AppContext';
import WorkoutRunner from './workout/WorkoutRunner';

// ── Single Exercise Row ──────────────────────────────────────────────────────
const ExerciseRow = ({ exercise, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/5 rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center gap-4 p-4 hover:bg-white/5 transition-colors text-left"
        onClick={() => setOpen(o => !o)}
      >
        <span className="w-7 h-7 rounded-lg bg-gym-orange/10 text-gym-orange text-xs font-black flex items-center justify-center flex-shrink-0">
          {index + 1}
        </span>
        <div className="flex-grow min-w-0">
          <p className="text-white font-bold text-sm truncate">{exercise.name}</p>
          <p className="text-gray-500 text-[10px] uppercase tracking-wider font-bold">{exercise.target}</p>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="text-center hidden sm:block">
            <p className="text-white font-black text-sm">{exercise.sets}</p>
            <p className="text-gray-600 text-[10px] uppercase font-bold">Sets</p>
          </div>
          <div className="text-center hidden sm:block">
            <p className="text-gym-orange font-black text-sm">{exercise.reps}</p>
            <p className="text-gray-600 text-[10px] uppercase font-bold">Reps</p>
          </div>
          <div className="text-center hidden sm:block">
            <p className="text-white font-black text-sm">{exercise.restBetweenSets}s</p>
            <p className="text-gray-600 text-[10px] uppercase font-bold">Rest</p>
          </div>
          {open ? (
            <ChevronDown size={16} className="text-gym-orange" />
          ) : (
            <ChevronRight size={16} className="text-gray-600" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 space-y-4 bg-black/30">
              {/* Stats row (mobile visible) */}
              <div className="flex gap-3 sm:hidden">
                {[
                  { label: 'Sets', val: exercise.sets },
                  { label: 'Reps', val: exercise.reps },
                  { label: 'Rest', val: `${exercise.restBetweenSets}s` },
                ].map(s => (
                  <div key={s.label} className="flex-1 bg-white/5 rounded-lg p-2 text-center">
                    <p className="text-white font-black text-sm">{s.val}</p>
                    <p className="text-gray-600 text-[10px] uppercase font-bold">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                <Info size={12} className="text-gym-orange/60" /> Instructions
              </div>
              <ol className="space-y-2">
                {exercise.instructions.map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm text-gray-300 leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-gym-orange/20 text-gym-orange text-[10px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Single Day Card ─────────────────────────────────────────────────────────
const DayCard = ({ plan, isToday, onStartWorkout }) => {
  const [expanded, setExpanded] = useState(isToday);
  const isRest = plan.totalExercises === 0;

  return (
    <div
      className={`glassmorphism rounded-2xl border transition-all duration-300 overflow-hidden ${
        isToday ? 'border-gym-orange/30 shadow-[0_0_30px_rgba(255,87,34,0.1)]' : 'border-white/5'
      }`}
    >
      {/* Card Header */}
      <button
        className="w-full flex items-center gap-4 p-5 hover:bg-white/5 transition-colors text-left"
        onClick={() => !isRest && setExpanded(o => !o)}
      >
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
          isRest ? 'bg-white/5 text-gray-600' : isToday ? 'bg-gym-orange text-white shadow-lg shadow-gym-orange/20' : 'bg-white/10 text-gray-400'
        }`}>
          {isRest ? <Moon size={22} /> : <Dumbbell size={22} />}
        </div>

        <div className="flex-grow min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-white font-black text-lg uppercase leading-none">{plan.day}</h4>
            {isToday && (
              <span className="bg-gym-orange text-white text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest">
                Today
              </span>
            )}
          </div>
          <p className={`text-xs font-bold uppercase tracking-wider mt-1 ${isRest ? 'text-gray-500' : 'text-gym-orange italic'}`}>
            {plan.target}
          </p>
        </div>

        <div className="flex items-center gap-4 flex-shrink-0">
          {!isRest && (
            <>
              <div className="hidden md:flex items-center gap-1.5 text-gray-500 text-xs font-bold">
                <Clock size={13} className="text-gym-orange/50" />
                {plan.duration}
              </div>
              <div className="hidden md:flex items-center gap-1.5 text-gray-500 text-xs font-bold">
                <Flame size={13} className="text-gym-orange/50" />
                {plan.totalExercises} exercises
              </div>
            </>
          )}
          {!isRest && (
            expanded ? <ChevronDown size={18} className="text-gym-orange" /> : <ChevronRight size={18} className="text-gray-500" />
          )}
        </div>
      </button>

      {/* Expanded Exercise List */}
      <AnimatePresence>
        {expanded && !isRest && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-3 border-t border-white/5 pt-4">
              {plan.exercises.map((ex, i) => (
                <ExerciseRow key={ex.id} exercise={ex} index={i} />
              ))}

              <button
                onClick={() => onStartWorkout(plan)}
                className="mt-4 w-full py-4 bg-gym-orange text-white rounded-xl font-black uppercase tracking-widest text-sm hover:bg-gym-neon transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,87,34,0.25)] active:scale-95"
              >
                <PlayCircle size={20} /> Start {plan.day} Workout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Main WorkoutPlans Page ───────────────────────────────────────────────────
const WorkoutPlans = () => {
  const { startWorkout, workoutSession, endWorkout } = useAppContext();
  const todayWorkout = getTodaysWorkout();
  const todayDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8 pb-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Schedule */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-black text-white uppercase italic">Weekly Routine</h3>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/10">
                Mesocycle 1 • Week 3
              </span>
            </div>

            <div className="space-y-4">
              {workoutSchedule.map((plan) => (
                <DayCard
                  key={plan.id}
                  plan={plan}
                  isToday={plan.day === todayDay}
                  onStartWorkout={startWorkout}
                />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Today's Focus Card */}
            <div className="bg-gradient-to-br from-gym-orange to-gym-neon p-6 rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
              <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-1 relative z-10">Today's Focus</p>
              <h4 className="text-white font-black text-2xl uppercase italic leading-tight mb-2 relative z-10">
                {todayWorkout.target}
              </h4>
              <p className="text-white/70 text-xs font-bold mb-6 relative z-10">
                {todayWorkout.totalExercises > 0 ? `${todayWorkout.totalExercises} exercises • ${todayWorkout.duration}` : 'Rest and recover today'}
              </p>
              {todayWorkout.totalExercises > 0 && (
                <button
                  onClick={() => startWorkout(todayWorkout)}
                  className="w-full py-4 bg-gym-dark text-white rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-white hover:text-gym-dark transition-all relative z-10 active:scale-95"
                >
                  <PlayCircle size={18} /> Start Today's Workout
                </button>
              )}
            </div>

            {/* Goal Progress */}
            <div className="glassmorphism p-6 rounded-2xl border-white/5 space-y-4">
              <h4 className="text-white font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                <Target size={16} className="text-gym-orange" /> Current Goal
              </h4>
              <p className="text-gym-orange font-black text-lg uppercase italic">Hybrid Build</p>
              {[
                { label: 'Strength', value: 75 },
                { label: 'Hypertrophy', value: 60 },
                { label: 'Endurance', value: 45 },
              ].map(g => (
                <div key={g.label} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold uppercase">
                    <span className="text-gray-400">{g.label}</span>
                    <span className="text-white">{g.value}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${g.value}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full bg-gym-orange rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="glassmorphism p-5 rounded-2xl border border-white/5">
              <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-3">💡 Trainer Tip</h4>
              <p className="text-gray-400 text-xs italic leading-relaxed">
                "Focus on time-under-tension for hypertrophy days. 3 seconds eccentric, 1 second concentric."
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Workout Runner Overlay */}
      {workoutSession && (
        <WorkoutRunner workout={workoutSession.workout} onClose={endWorkout} />
      )}
    </>
  );
};

export default WorkoutPlans;
