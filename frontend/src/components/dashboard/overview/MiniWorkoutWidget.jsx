import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, CheckCircle2, SkipForward, Dumbbell, Clock } from 'lucide-react';
import { useAppContext } from '../../../context/AppContext';
import { getTodaysWorkout } from '../../../data/workoutData';
import { useNavigate } from 'react-router-dom';

const MiniWorkoutWidget = () => {
  const { workoutSession, startWorkout, advanceWorkout, endWorkout } = useAppContext();
  const navigate = useNavigate();
  const todayWorkout = getTodaysWorkout();
  const isRest = todayWorkout.totalExercises === 0;

  if (!workoutSession) {
    // ── Idle state ──────────────────────────────────────────────────
    return (
      <div className="glassmorphism p-6 rounded-3xl border border-white/5 flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-1 flex items-center gap-1">
              <Dumbbell size={10} className="text-gym-orange" /> Today's Workout
            </p>
            <h4 className="text-white font-black text-lg uppercase italic leading-tight">
              {isRest ? 'Rest Day 😌' : todayWorkout.target}
            </h4>
            {!isRest && (
              <p className="text-gray-500 text-xs font-bold mt-1">
                {todayWorkout.totalExercises} exercises · {todayWorkout.duration}
              </p>
            )}
          </div>
        </div>

        {!isRest && (
          <>
            {/* Preview exercises mini list */}
            <div className="space-y-2">
              {todayWorkout.exercises.slice(0, 3).map((ex, i) => (
                <div key={ex.id} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-md bg-white/5 text-gray-600 text-[10px] font-black flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-gray-400 text-xs font-bold truncate flex-grow">{ex.name}</span>
                  <span className="text-gray-600 text-[10px] font-bold flex-shrink-0">{ex.sets}×{ex.reps}</span>
                </div>
              ))}
              {todayWorkout.exercises.length > 3 && (
                <p className="text-gray-600 text-[10px] font-bold pl-8">
                  +{todayWorkout.exercises.length - 3} more exercises
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => startWorkout(todayWorkout)}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-gym-orange text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-gym-neon transition-all shadow-[0_0_15px_rgba(255,87,34,0.2)] active:scale-95"
              >
                <PlayCircle size={14} /> Start Now
              </button>
              <button
                onClick={() => navigate('/user/workout')}
                className="px-4 py-3 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl font-black uppercase tracking-widest text-[10px] transition-all"
              >
                View Plan
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  // ── Active session mini widget ───────────────────────────────────
  const { exerciseIndex, setIndex, phase, workout } = workoutSession;
  const currentEx = workout.exercises[exerciseIndex];

  if (phase === 'complete') {
    return (
      <div className="glassmorphism p-6 rounded-3xl border border-green-500/20 flex flex-col items-center gap-3 text-center">
        <div className="text-4xl">🏆</div>
        <p className="text-green-400 font-black uppercase tracking-widest text-sm">Workout Complete!</p>
        <button
          onClick={endWorkout}
          className="w-full py-3 bg-white/5 hover:bg-white/10 text-gray-400 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all"
        >
          Dismiss
        </button>
      </div>
    );
  }

  return (
    <div className="glassmorphism p-5 rounded-3xl border border-gym-orange/20 flex flex-col gap-4 relative overflow-hidden">
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-gym-orange/10 rounded-full blur-2xl" />

      <div className="relative z-10 flex justify-between items-start">
        <div>
          <p className="text-gym-orange text-[9px] uppercase font-black tracking-widest flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-gym-orange animate-pulse" />
            Active Workout
          </p>
          <h4 className="text-white font-black text-base uppercase leading-tight mt-1">{currentEx.name}</h4>
          <p className="text-gray-500 text-xs font-bold">{currentEx.target}</p>
        </div>
        <div className="text-right">
          <p className="text-gym-orange font-black text-2xl leading-none">{currentEx.reps}</p>
          <p className="text-gray-600 text-[9px] uppercase font-bold">REPS</p>
        </div>
      </div>

      {/* Set progress */}
      <div className="relative z-10 flex items-center gap-2">
        {Array.from({ length: currentEx.sets }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i < setIndex ? 'bg-gym-orange' : i === setIndex ? 'bg-gym-orange/50 animate-pulse' : 'bg-white/10'
            }`}
          />
        ))}
        <span className="text-gray-500 text-[10px] font-bold ml-1 flex-shrink-0">
          {setIndex + 1}/{currentEx.sets}
        </span>
      </div>

      {/* Phase indicator */}
      {phase === 'rest' && (
        <div className="relative z-10 bg-black/40 border border-gym-orange/20 rounded-xl p-3 text-center">
          <p className="text-gym-orange text-xs font-black uppercase tracking-widest">⏸ Rest Time</p>
          <p className="text-gray-400 text-[10px] mt-1">Use the workout screen to see timer</p>
        </div>
      )}

      <div className="relative z-10 grid grid-cols-2 gap-2">
        <button
          onClick={advanceWorkout}
          className={`flex items-center justify-center gap-2 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all active:scale-95 ${
            phase === 'rest'
              ? 'bg-white/10 text-white hover:bg-white/20'
              : 'bg-gym-orange text-white hover:bg-gym-neon shadow-[0_0_15px_rgba(255,87,34,0.2)]'
          }`}
        >
          {phase === 'rest' ? (
            <><SkipForward size={14} /> Skip Rest</>
          ) : (
            <><CheckCircle2 size={14} /> Done</>
          )}
        </button>
        <button
          onClick={() => navigate('/user/workout')}
          className="flex items-center justify-center gap-1.5 py-3 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl font-black uppercase tracking-widest text-[10px] transition-all"
        >
          Full View
        </button>
      </div>
    </div>
  );
};

export default MiniWorkoutWidget;
