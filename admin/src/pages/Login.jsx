import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, ShieldCheck } from 'lucide-react';
import logo from '../assets/logo.png';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      onLogin();
    } else {
      alert("Invalid credentials. Try admin/admin");
    }
  };

  return (
    <div className="min-h-screen bg-gym-darker flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-gym-orange/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-gym-neon/10 rounded-full blur-[100px]" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="glassmorphism p-10 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-gym-orange to-gym-neon" />
          
          <div className="text-center mb-10">
            <div className="w-20 h-20 mx-auto bg-black/40 p-4 rounded-2xl border border-white/10 shadow-xl mb-6">
              <img src={logo} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tight">Admin Portal</h1>
            <div className="flex items-center justify-center gap-2 mt-3 text-gym-orange text-[10px] font-bold uppercase tracking-widest">
              <ShieldCheck size={14} /> Restricted Access Area
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-gray-400 text-[10px] font-bold uppercase tracking-widest pl-2">Admin ID</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gym-orange transition-colors" size={20} />
                <input 
                  type="text" 
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-gym-orange/50 transition-all text-sm font-bold placeholder:text-gray-700"
                  placeholder="Enter your ID"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-gray-400 text-[10px] font-bold uppercase tracking-widest pl-2">Security Key</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gym-orange transition-colors" size={20} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-gym-orange/50 transition-all text-sm font-bold placeholder:text-gray-700"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-4 mt-4 bg-gym-orange text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-gym-neon shadow-[0_0_20px_rgba(255,87,34,0.3)] hover:shadow-[0_0_30px_rgba(255,87,34,0.5)] transition-all transform active:scale-95"
            >
              Authorize Entry
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
