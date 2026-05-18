import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, ArrowRight } from 'lucide-react';
import logo from '../assets/logo.png';

const AuthModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  const toggleAuth = () => setIsLogin(!isLogin);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-gym-dark/90 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-[450px] glassmorphism rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
      >
        {/* Top Accent */}
        <div className="h-1.5 bg-gradient-to-r from-gym-orange via-gym-neon to-gym-orange w-full" />
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 text-gray-400 hover:text-white transition-colors bg-white/5 p-2 rounded-full hover:bg-white/10"
        >
          <X size={20} />
        </button>

        <div className="p-8 sm:p-10">
          {/* Logo Section */}
          <motion.div 
            layout
            className="flex flex-col items-center mb-10"
          >
            <div className="w-20 h-20 overflow-hidden rounded-2xl border border-white/10 p-3 glassmorphism shadow-xl mb-4">
              <img src={logo} alt="Personality Gym" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-2xl font-display font-black text-white uppercase tracking-tight">
              THE <span className="text-gym-orange">PERSONALITY</span> GYM
            </h2>
          </motion.div>

          {/* Sliding Content */}
          <div className="relative overflow-hidden min-h-[380px]">
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div
                  key="login"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 20, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white uppercase italic">Welcome Back</h3>
                    <p className="text-gray-400 text-sm font-medium mt-1">Enter your credentials to enter the arena</p>
                  </div>

                  <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onLoginSuccess(); }}>
                    <div className="space-y-2">
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gym-orange transition-colors" size={18} />
                        <input 
                          type="email" 
                          placeholder="EMAIL ADDRESS"
                          className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-gym-orange/50 transition-all uppercase text-sm font-bold tracking-wider"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gym-orange transition-colors" size={18} />
                        <input 
                          type="password" 
                          placeholder="PASSWORD"
                          className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-gym-orange/50 transition-all text-sm font-bold tracking-wider"
                        />
                      </div>
                    </div>
                    <button className="w-full bg-gym-orange text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-gym-neon transition-all duration-300 shadow-lg shadow-gym-orange/20 flex items-center justify-center gap-3 group">
                      Sign In <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="signup"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white uppercase italic">Join The Elite</h3>
                    <p className="text-gray-400 text-sm font-medium mt-1">Start your transformation journey today</p>
                  </div>

                  <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onLoginSuccess(); }}>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gym-orange transition-colors" size={18} />
                      <input 
                        type="text" 
                        placeholder="FULL NAME"
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-gym-orange/50 transition-all uppercase text-sm font-bold tracking-wider"
                      />
                    </div>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gym-orange transition-colors" size={18} />
                      <input 
                        type="email" 
                        placeholder="EMAIL ADDRESS"
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-gym-orange/50 transition-all uppercase text-sm font-bold tracking-wider"
                      />
                    </div>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gym-orange transition-colors" size={18} />
                      <input 
                        type="password" 
                        placeholder="PASSWORD"
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-gym-orange/50 transition-all text-sm font-bold tracking-wider"
                      />
                    </div>
                    <button className="w-full bg-gym-orange text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-gym-neon transition-all duration-300 shadow-lg shadow-gym-orange/20 flex items-center justify-center gap-3 group">
                      Create Account <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Toggle Button */}
          <div className="mt-10 text-center pt-6 border-t border-white/5">
            <button 
              onClick={toggleAuth}
              className="text-gray-400 hover:text-gym-orange text-sm font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 mx-auto group"
            >
              {isLogin ? "Need an account? " : "Already a member? "}
              <span className="text-white group-hover:text-gym-orange transition-colors">
                {isLogin ? 'Sign Up' : 'Sign In'}
              </span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthModal;
