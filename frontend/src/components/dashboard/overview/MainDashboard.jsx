import { motion } from 'framer-motion';
import MembershipCard from './MembershipCard';
import WeeklyActivity from './WeeklyActivity';
import AttendanceWidget from './AttendanceWidget';
import MiniWorkoutWidget from './MiniWorkoutWidget';
import { useAppContext } from '../../../context/AppContext';

const MainDashboard = ({ weekDays }) => {
  const { user } = useAppContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column — 8 cols */}
        <div className="lg:col-span-8 flex flex-col gap-8">

          {/* Membership Card */}
          <MembershipCard userData={user} />

          {/* Weekly Streak */}
          <WeeklyActivity weekDays={weekDays} />

        </div>

        {/* Right Column — 4 cols */}
        <div className="lg:col-span-4 flex flex-col gap-6">

          {/* Check-in / Check-out */}
          <AttendanceWidget />

          {/* Today's Workout Mini Widget */}
          <MiniWorkoutWidget />

          {/* AI Coach Promo */}
          <div className="bg-gradient-to-br from-gym-orange to-gym-neon p-6 rounded-3xl relative overflow-hidden shadow-2xl">
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
            <h4 className="text-white font-black text-xl uppercase italic leading-tight mb-2 relative z-10">
              AI Performance Coach
            </h4>
            <p className="text-white/80 text-xs font-bold uppercase tracking-wider mb-6 relative z-10">
              Personalized AI Diet & Workout coming soon.
            </p>
            <button className="w-full py-3.5 bg-white text-gym-orange rounded-xl font-black uppercase tracking-widest text-xs hover:bg-gym-dark hover:text-white transition-all relative z-10 active:scale-95">
              Get Early Access
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default MainDashboard;
