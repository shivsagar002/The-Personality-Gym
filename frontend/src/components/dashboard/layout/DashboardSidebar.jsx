import { NavLink, useNavigate } from 'react-router-dom';
import { Activity, User, CreditCard, Users, Zap, Utensils, LogOut } from 'lucide-react';
import logo from '../../../assets/logo.png';

const NAV_ITEMS = [
  { to: '/user/dashboard', icon: Activity, label: 'Dashboard' },
  { to: '/user/profile', icon: User, label: 'Profile' },
  { to: '/user/plans', icon: CreditCard, label: 'Plans & Pricing' },
  { to: '/user/trainers', icon: Users, label: 'Trainers' },
  { to: '/user/workout', icon: Zap, label: 'Workout Plan' },
  { to: '/user/diet', icon: Utensils, label: 'Diet Plan' },
];

const DashboardSidebar = ({ onLogout }) => {
  return (
    <aside className="hidden lg:flex flex-col w-72 bg-gym-dark border-r border-white/5 p-8 fixed h-full z-30 overflow-y-auto">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-12 flex-shrink-0">
        <div className="w-10 h-10 p-1.5 glassmorphism rounded-lg">
          <img src={logo} alt="Logo" className="w-full h-full object-contain" />
        </div>
        <span className="font-display font-black text-white text-lg tracking-tight uppercase leading-none">
          THE <span className="text-gym-orange">P.</span> <br /> GYM
        </span>
      </div>

      <nav className="flex-grow space-y-2">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `w-full flex items-center gap-4 p-4 rounded-xl transition-all font-bold uppercase tracking-widest text-xs ${
                isActive
                  ? 'bg-gym-orange text-white shadow-[0_4px_15px_rgba(255,87,34,0.25)]'
                  : 'text-gray-500 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <Icon size={20} /> {label}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={onLogout}
        className="flex items-center gap-3 text-gray-500 hover:text-gym-orange transition-colors p-4 font-bold uppercase tracking-widest text-xs border-t border-white/5 mt-auto"
      >
        <LogOut size={20} /> Logout
      </button>
    </aside>
  );
};

export default DashboardSidebar;
