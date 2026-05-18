import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, LogOut, Clock, CheckCircle2, Coffee } from 'lucide-react';
import { useAppContext } from '../../../context/AppContext';

const formatTime = (date) => {
  if (!date) return '--:--';
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
};

const formatDuration = (ms) => {
  const totalS = Math.floor(ms / 1000);
  const h = Math.floor(totalS / 3600);
  const m = Math.floor((totalS % 3600) / 60);
  const s = totalS % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
};

const AttendanceWidget = () => {
  const { attendance, handleCheckIn, handleCheckOut } = useAppContext();
  const [elapsed, setElapsed] = useState(0);

  // Live elapsed timer while checked in
  useEffect(() => {
    if (!attendance.isCheckedIn || !attendance.checkInTime) return;
    const interval = setInterval(() => {
      setElapsed(Date.now() - attendance.checkInTime.getTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [attendance.isCheckedIn, attendance.checkInTime]);

  const todaySessions = attendance.todaySessions;
  const totalTodayMs = todaySessions.reduce((acc, s) => {
    return acc + (s.checkOut - s.checkIn);
  }, 0) + (attendance.isCheckedIn ? elapsed : 0);

  return (
    <div className="glassmorphism p-6 rounded-3xl border border-white/5 flex flex-col gap-6 relative overflow-hidden">
      {/* Glow when checked in */}
      <div className={`absolute -right-10 -top-10 w-48 h-48 rounded-full blur-[80px] transition-all duration-700 ${attendance.isCheckedIn ? 'bg-green-500/15' : 'bg-transparent'}`} />

      {/* Header */}
      <div className="relative z-10">
        <h4 className="text-white font-bold uppercase tracking-wider flex items-center gap-2 text-sm">
          <Clock size={16} className="text-gym-orange" />
          Gym Attendance
        </h4>
        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">
          Independent of your workout session
        </p>
      </div>

      {/* Check-in time & live timer */}
      <div className="relative z-10 flex justify-between items-center">
        <div>
          <p className="text-gray-600 text-[9px] uppercase font-black tracking-widest mb-1">Checked In</p>
          <p className="text-white font-mono font-bold text-lg">
            {attendance.isCheckedIn ? formatTime(attendance.checkInTime) : '--:--'}
          </p>
        </div>
        {attendance.isCheckedIn && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 px-3 py-2 rounded-xl"
            >
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-mono text-green-400 font-black text-lg tabular-nums">
                {formatDuration(elapsed)}
              </span>
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Total time today */}
      {totalTodayMs > 0 && (
        <div className="relative z-10 flex items-center gap-3 bg-black/30 rounded-xl p-3 border border-white/5">
          <Coffee size={14} className="text-gym-orange flex-shrink-0" />
          <span className="text-gray-400 text-xs font-bold">
            Total today: <span className="text-white">{formatDuration(totalTodayMs)}</span>
          </span>
        </div>
      )}

      {/* Buttons */}
      <div className="relative z-10 grid grid-cols-2 gap-3">
        <button
          onClick={handleCheckIn}
          disabled={attendance.isCheckedIn}
          className={`flex items-center justify-center gap-2 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all active:scale-95 ${
            attendance.isCheckedIn
              ? 'bg-white/5 text-gray-600 border border-white/5 cursor-not-allowed'
              : 'bg-gym-orange text-white hover:bg-gym-neon shadow-[0_0_20px_rgba(255,87,34,0.3)]'
          }`}
        >
          <LogIn size={16} />
          Check In
        </button>
        <button
          onClick={handleCheckOut}
          disabled={!attendance.isCheckedIn}
          className={`flex items-center justify-center gap-2 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all active:scale-95 ${
            !attendance.isCheckedIn
              ? 'bg-white/5 text-gray-600 border border-white/5 cursor-not-allowed'
              : 'bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20'
          }`}
        >
          <LogOut size={16} />
          Check Out
        </button>
      </div>

      {/* Session history for today */}
      {todaySessions.length > 0 && (
        <div className="relative z-10 space-y-2 border-t border-white/5 pt-4">
          <p className="text-gray-600 text-[9px] uppercase font-black tracking-widest">Today's Sessions</p>
          {todaySessions.map((s, i) => (
            <div key={i} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-gray-400">
                <CheckCircle2 size={12} className="text-green-500" />
                {formatTime(s.checkIn)} → {formatTime(s.checkOut)}
              </div>
              <span className="text-white font-bold">{formatDuration(s.checkOut - s.checkIn)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AttendanceWidget;
