import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame, LayoutDashboard, Dumbbell, Utensils, Users, User
} from 'lucide-react';
import DashboardSidebar from './DashboardSidebar';
import { useAppContext } from '../../../context/AppContext';

// ── Nav items config ─────────────────────────────────────────────────────────
const NAV = [
  { to: '/user/dashboard', icon: LayoutDashboard, label: 'Home'    },
  { to: '/user/workout',   icon: Dumbbell,        label: 'Workout' },
  { to: '/user/diet',      icon: Utensils,        label: 'Diet'    },
  { to: '/user/trainers',  icon: Users,           label: 'Trainers'},
  { to: '/user/profile',   icon: User,            label: 'Profile' },
];

// ── Single mobile tab ────────────────────────────────────────────────────────
const MobileTab = ({ to, icon: Icon, label }) => (
  <NavLink to={to} className="flex-1 flex flex-col items-center justify-center relative h-14">
    {({ isActive }) => (
      <div className="flex flex-col items-center justify-center w-full h-full">
        {/* Active high-tech glowing key ring - no harsh masking borders */}
        {isActive && (
          <motion.div
            layoutId="mobile-active-glow"
            className="absolute -top-4 w-12 h-12 rounded-full bg-[#111] border-2 border-gym-orange shadow-[0_0_20px_rgba(255,87,34,0.45),inset_0_0_12px_rgba(255,87,34,0.2)] flex items-center justify-center z-10"
            transition={{ type: 'spring', stiffness: 380, damping: 25 }}
          >
            {/* Gloss shine ring */}
            <div className="absolute inset-0.5 rounded-full border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />
          </motion.div>
        )}

        {/* Icon lifts up beautifully into the glowing key ring */}
        <motion.div
          animate={{ y: isActive ? -16 : 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 25 }}
          className="relative z-20 flex items-center justify-center"
        >
          <Icon
            size={20}
            strokeWidth={isActive ? 2.5 : 1.8}
            className={isActive ? 'text-gym-orange' : 'text-gray-500 hover:text-gray-300 transition-colors'}
          />
        </motion.div>

        {/* Label scales and positions nicely */}
        <motion.span
          animate={{ 
            opacity: isActive ? 1 : 0.6,
            y: isActive ? 8 : 2,
            scale: isActive ? 1 : 0.95
          }}
          transition={{ type: 'spring', stiffness: 380, damping: 25 }}
          className={`text-[9px] font-black uppercase tracking-widest leading-none relative z-20 ${
            isActive ? 'text-gym-orange font-black' : 'text-gray-600 font-bold'
          }`}
        >
          {label}
        </motion.span>
      </div>
    )}
  </NavLink>
);

// ── Layout ───────────────────────────────────────────────────────────────────
const DashboardLayout = ({ onLogout }) => {
  const { user, attendance } = useAppContext();
  const location = useLocation();

  const segment = location.pathname.split('/').pop();
  const titleMap = {
    dashboard: null,          // handled inline
    profile:  'Profile',
    plans:    'Plans & Pricing',
    trainers: 'Trainers',
    workout:  'Workout Plan',
    diet:     'Diet Plan',
  };

  const streak = Object.values(attendance.weekSessions).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gym-darker flex">
      {/* Desktop Sidebar */}
      <DashboardSidebar onLogout={onLogout} />

      {/* Main Content */}
      <main className="flex-grow lg:ml-72 p-5 md:p-8 pb-28 lg:pb-10 min-w-0">
        {/* Page Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 min-w-0">
          <h1 className="pr-3 text-2xl md:text-3xl font-black text-white uppercase italic truncate w-full sm:w-auto">
            {segment === 'dashboard' ? (
              <>Welcome Back, <span className="text-gym-orange">{user.name}</span></>
            ) : (
              <span className="text-white">{titleMap[segment] || segment}</span>
            )}
          </h1>
          <div className="glassmorphism px-4 py-2 rounded-xl flex items-center gap-3 border border-gym-orange/20 flex-shrink-0">
            <Flame size={18} fill="currentColor" className="text-gym-orange animate-pulse" />
            <span className="text-white font-black text-sm leading-none">{streak} Day Streak</span>
          </div>
        </header>

        {/* Animated Route Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="w-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ── Mobile Bottom Navigation ── */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50">
        {/* Frosted glass base */}
        <div className="bg-gym-dark/95 backdrop-blur-xl border-t border-white/5 px-2 pt-4 pb-safe pb-5 flex items-end justify-around gap-1 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
          style={{ paddingBottom: 'max(20px, env(safe-area-inset-bottom))' }}
        >
          {NAV.map(item => (
            <MobileTab key={item.to} {...item} />
          ))}
        </div>
      </nav>
    </div>
  );
};

export default DashboardLayout;
