import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Users, CreditCard, Dumbbell, 
  Settings, LogOut, Bell, Search, Activity, Receipt, Menu, X, ScanLine
} from 'lucide-react';
import logo from '../assets/logo.png';

const AdminLayout = ({ onLogout }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Overview', icon: <LayoutDashboard size={20} /> },
    { path: '/members', label: 'Members', icon: <Users size={20} /> },
    { path: '/plans', label: 'Plans', icon: <CreditCard size={20} /> },
    { path: '/exercises', label: 'Exercises', icon: <Activity size={20} /> },
    { path: '/workouts', label: 'Workouts', icon: <Dumbbell size={20} /> },
    { path: '/transactions', label: 'Transactions', icon: <Receipt size={20} /> },
    { path: '/checkin', label: 'Check-In Scanner', icon: <ScanLine size={20} /> },
    { path: '#', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gym-darker flex">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`fixed h-full bg-gym-dark border-r border-white/5 p-6 flex flex-col z-50 transition-transform duration-300 w-72 md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center mb-10 px-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 p-1.5 glassmorphism rounded-lg">
              <img src={logo} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="font-display font-black text-white text-lg tracking-tight uppercase leading-none block">THE P. GYM</span>
              <span className="text-gym-orange text-[10px] font-bold uppercase tracking-widest">Admin Console</span>
            </div>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-500 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-grow space-y-2 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all font-bold uppercase tracking-widest text-xs group ${
                  isActive 
                    ? 'bg-gym-orange text-white shadow-lg shadow-gym-orange/20' 
                    : 'text-gray-500 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className={`${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gym-orange'} transition-colors`}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button 
          onClick={onLogout}
          className="flex items-center gap-4 text-gray-500 hover:text-gym-orange transition-colors p-4 font-bold uppercase tracking-widest text-xs border-t border-white/5 mt-auto"
        >
          <LogOut size={20} /> Terminate Session
        </button>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow md:ml-72 flex flex-col min-h-screen w-full">
        {/* Topbar */}
        <header className="h-20 md:h-24 bg-gym-dark/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-20 px-4 md:px-10 flex items-center justify-between">
          <div className="flex items-center gap-4 w-full md:w-96">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-white p-2">
              <Menu size={24} />
            </button>
            <div className="relative group flex-grow hidden sm:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gym-orange transition-colors" size={18} />
              <input 
                type="text"
                placeholder="SEARCH MEMBERS OR TRX ID..."
                className="w-full bg-black/40 border border-white/10 rounded-xl py-2 md:py-3 pl-12 pr-4 text-white text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-gym-orange/50 transition-colors"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4 md:gap-6">
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-gym-orange rounded-full animate-ping" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-gym-orange rounded-full" />
            </button>
            <div className="h-8 w-px bg-white/10 hidden md:block" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <p className="text-white font-bold text-sm uppercase leading-none">Super Admin</p>
                <p className="text-gym-orange text-[10px] font-bold uppercase tracking-widest">Level 5 Access</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gym-orange/20 border border-gym-orange/50 flex items-center justify-center text-gym-orange shrink-0">
                <Activity size={20} />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-grow p-4 md:p-10 pb-20 max-w-[100vw]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
