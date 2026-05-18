import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Square, Clock, Dumbbell } from 'lucide-react';

const AttendanceTracker = ({ onCheckIn, onCheckOut }) => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const todayFocus = "Chest & Triceps"; // Could be passed as prop

  // Timer logic
  useEffect(() => {
    let interval;
    if (isCheckedIn && startTime) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCheckedIn, startTime]);

  const handleToggle = () => {
    if (!isCheckedIn) {
      // Check in
      setIsCheckedIn(true);
      setStartTime(Date.now());
      setElapsedTime(0);
      if (onCheckIn) onCheckIn();
    } else {
      // Check out
      setIsCheckedIn(false);
      setStartTime(null);
      if (onCheckOut) onCheckOut(elapsedTime);
    }
  };

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="glassmorphism p-6 md:p-8 rounded-3xl border-white/5 flex flex-col justify-between h-full relative overflow-hidden group">
      {/* Background decoration */}
      <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full blur-[60px] transition-colors duration-700 ${isCheckedIn ? 'bg-gym-orange/20' : 'bg-transparent'}`} />

      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start gap-6">
        
        {/* Workout Focus */}
        <div className="space-y-2">
          <h4 className="text-white font-bold uppercase tracking-wider flex items-center gap-2 text-sm">
            <Dumbbell size={16} className="text-gym-orange" /> Today's Focus
          </h4>
          <p className="text-2xl md:text-3xl font-black text-white uppercase italic tracking-tighter">
            {todayFocus}
          </p>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">
            Assigned by your trainer
          </p>
        </div>

        {/* Live Timer Display (Visible when checked in) */}
        {isCheckedIn && (
          <div className="bg-black/40 border border-gym-orange/30 px-4 py-2 rounded-xl flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-gym-orange animate-pulse" />
            <span className="font-mono text-xl font-bold text-white tracking-widest">
              {formatTime(elapsedTime)}
            </span>
          </div>
        )}
      </div>

      <div className="relative z-10 mt-8">
        <button 
          onClick={handleToggle}
          className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all duration-300 ${
            isCheckedIn 
              ? 'bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500/20' 
              : 'bg-gym-orange text-white hover:bg-gym-neon shadow-[0_0_20px_rgba(255,87,34,0.3)] hover:shadow-[0_0_30px_rgba(255,87,34,0.5)]'
          }`}
        >
          {isCheckedIn ? (
            <>
              <Square size={18} fill="currentColor" />
              Check Out
            </>
          ) : (
            <>
              <Play size={18} fill="currentColor" />
              Start Workout
            </>
          )}
        </button>
        
        <div className="mt-4 flex items-center justify-center gap-2 text-gray-500">
          <Clock size={12} />
          <span className="text-[10px] font-bold uppercase tracking-widest">
            {isCheckedIn ? 'Recording active session...' : 'Tap to start recording time'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTracker;
