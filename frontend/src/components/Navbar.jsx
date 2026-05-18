import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';

const Navbar = ({ onOpenAuth }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-gym-dark/90 backdrop-blur-md py-4 shadow-lg shadow-gym-orange/10 border-b border-white/5' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 overflow-hidden rounded-sm transition-transform group-hover:scale-110">
              <img src={logo} alt="Personality Gym Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-display font-bold text-lg sm:text-2xl tracking-tighter text-white whitespace-nowrap">
              THE <span className="text-gym-orange">PERSONALITY</span> GYM
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-300 hover:text-gym-orange transition-colors font-medium">Home</a>
            <a href="#features" className="text-gray-300 hover:text-gym-orange transition-colors font-medium">Features</a>
            <a href="#trainers" className="text-gray-300 hover:text-gym-orange transition-colors font-medium">Trainers</a>
            <a href="#pricing" className="text-gray-300 hover:text-gym-orange transition-colors font-medium">Memberships</a>
            <button 
              onClick={onOpenAuth}
              className="bg-gym-orange text-white px-6 py-2 rounded-sm font-bold uppercase tracking-wide hover:bg-gym-neon hover:shadow-[0_0_15px_rgba(255,61,0,0.5)] transition-all duration-300 transform hover:-translate-y-1"
            >
              Join Now
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-gym-orange focus:outline-none p-2 bg-white/5 rounded-md"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed inset-x-0 top-0 transition-transform duration-300 transform ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'} glassmorphism -z-10 pt-24 pb-10 border-b border-white/10`}>
        <div className="px-4 space-y-4 flex flex-col items-center">
          <a href="#home" onClick={() => setIsMobileMenuOpen(false)} className="text-xl text-gray-300 hover:text-gym-orange font-medium">Home</a>
          <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="text-xl text-gray-300 hover:text-gym-orange font-medium">Features</a>
          <a href="#trainers" onClick={() => setIsMobileMenuOpen(false)} className="text-xl text-gray-300 hover:text-gym-orange font-medium">Trainers</a>
          <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)} className="text-xl text-gray-300 hover:text-gym-orange font-medium">Memberships</a>
          <button 
            onClick={() => { setIsMobileMenuOpen(false); onOpenAuth(); }}
            className="w-full max-w-xs text-center bg-gym-orange text-white px-6 py-4 rounded-sm font-bold uppercase tracking-wide mt-4 shadow-lg shadow-gym-orange/20"
          >
            Join Now
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
