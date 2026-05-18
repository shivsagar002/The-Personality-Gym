import { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext(null);

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used inside AppProvider');
  return ctx;
};

export const AppProvider = ({ children }) => {
  // ── User Data ──────────────────────────────────────────────────
  const [user] = useState({
    name: 'Sagar',
    id: 'PG-2026-X89',
    plan: 'Premium Annual',
    expiresIn: 12,
    joinDate: 'Jan 12, 2026',
    expiryDate: 'Jun 12, 2026',
    status: 'Active',
    trainer: 'Vikram Singh',
    avatar: null,
  });

  // ── Attendance ─────────────────────────────────────────────────
  const [attendance, setAttendance] = useState({
    isCheckedIn: false,
    checkInTime: null,
    todaySessions: [],         // [{ checkIn: Date, checkOut: Date }]
    weekSessions: {            // keyed by "YYYY-MM-DD"
      '2026-05-12': true,
      '2026-05-13': true,
      '2026-05-14': true,
      '2026-05-15': false,
      '2026-05-16': true,
      '2026-05-17': true,
    },
    totalVisits: 42,
  });

  const handleCheckIn = useCallback(() => {
    if (!attendance.isCheckedIn) {
      setAttendance(prev => ({
        ...prev,
        isCheckedIn: true,
        checkInTime: new Date(),
      }));
    }
  }, [attendance.isCheckedIn]);

  const handleCheckOut = useCallback(() => {
    if (attendance.isCheckedIn && attendance.checkInTime) {
      const now = new Date();
      const session = { checkIn: attendance.checkInTime, checkOut: now };
      const todayKey = now.toISOString().split('T')[0];
      setAttendance(prev => ({
        ...prev,
        isCheckedIn: false,
        checkInTime: null,
        todaySessions: [...prev.todaySessions, session],
        weekSessions: { ...prev.weekSessions, [todayKey]: true },
        totalVisits: prev.totalVisits + 1,
      }));
    }
  }, [attendance.isCheckedIn, attendance.checkInTime]);

  // ── Workout Session ────────────────────────────────────────────
  const [workoutSession, setWorkoutSession] = useState(null);
  // workoutSession shape:
  // { workout: {}, exerciseIndex: 0, setIndex: 0, phase: 'exercise'|'rest'|'complete' }

  const startWorkout = useCallback((workout) => {
    setWorkoutSession({
      workout,
      exerciseIndex: 0,
      setIndex: 0,
      phase: 'exercise',  // 'exercise' | 'rest' | 'complete'
      startedAt: new Date(),
    });
  }, []);

  const advanceWorkout = useCallback(() => {
    setWorkoutSession(prev => {
      if (!prev) return null;
      const { workout, exerciseIndex, setIndex } = prev;
      const currentEx = workout.exercises[exerciseIndex];
      const totalSets = currentEx.sets;

      // After completing a set, go to rest phase
      if (prev.phase === 'exercise') {
        return { ...prev, phase: 'rest' };
      }

      // After rest, go to next set or next exercise
      if (prev.phase === 'rest') {
        const nextSetIndex = setIndex + 1;
        if (nextSetIndex < totalSets) {
          return { ...prev, setIndex: nextSetIndex, phase: 'exercise' };
        }
        // Move to next exercise
        const nextExerciseIndex = exerciseIndex + 1;
        if (nextExerciseIndex < workout.exercises.length) {
          return { ...prev, exerciseIndex: nextExerciseIndex, setIndex: 0, phase: 'exercise' };
        }
        // Workout complete
        return { ...prev, phase: 'complete' };
      }
      return prev;
    });
  }, []);

  const endWorkout = useCallback(() => setWorkoutSession(null), []);

  return (
    <AppContext.Provider value={{
      user,
      attendance,
      handleCheckIn,
      handleCheckOut,
      workoutSession,
      startWorkout,
      advanceWorkout,
      endWorkout,
    }}>
      {children}
    </AppContext.Provider>
  );
};
