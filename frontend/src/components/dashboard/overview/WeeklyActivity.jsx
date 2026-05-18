import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

const WeeklyActivity = ({ weekDays }) => {
  return (
    <div className="glassmorphism p-4 md:p-6 rounded-3xl border border-white/5 flex flex-col justify-center gap-4">
      <div className="flex justify-between items-center">
        <h4 className="text-white font-bold uppercase tracking-wider text-xs md:text-sm">
          Weekly Streak
        </h4>
        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
          🔥 STREAK ACTIVE
        </span>
      </div>
      
      <div className="grid grid-cols-6 sm:grid-cols-7 gap-2 md:gap-4">
        {weekDays.map((day, index) => (
          <div 
            key={index} 
            className={`flex flex-col items-center gap-2 ${
              index === 6 ? 'hidden sm:flex' : 'flex'
            }`}
          >
            <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{day.day}</span>
            <div className="relative group">
              {day.status === 'present' ? (
                <motion.div
                  animate={{ 
                    scale: [1, 1.12, 1], 
                    filter: ["brightness(1)", "brightness(1.4)", "brightness(1)"] 
                  }}
                  transition={{ repeat: Infinity, duration: 2, delay: index * 0.2 }}
                  className="text-gym-orange drop-shadow-[0_0_10px_rgba(255,87,34,0.5)]"
                >
                  <Flame size={24} fill="currentColor" />
                </motion.div>
              ) : (
                <div className="text-gray-700/40 grayscale">
                  <Flame size={24} />
                </div>
              )}
            </div>
            {/* Status indicator dot */}
            <div className={`w-1 h-1 rounded-full ${day.status === 'present' ? 'bg-gym-orange' : 'bg-transparent'}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyActivity;
