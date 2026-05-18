import logo from '../assets/logo.png';
import { Camera, Send, MessageCircle, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gym-darker border-t border-white/5 pt-16 pb-8 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6 cursor-pointer group">
              <div className="w-10 h-10 overflow-hidden rounded-sm transition-transform group-hover:scale-110">
                <img src={logo} alt="Personality Gym Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-display font-bold text-xl tracking-tighter text-white uppercase">
                Personality Gym
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              We aren't here to play games. We're here to build machines. Join the elite and forge your legacy today.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gym-orange transition-colors"><Camera size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-gym-orange transition-colors"><Send size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-gym-orange transition-colors"><MessageCircle size={20} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#home" className="text-gray-400 hover:text-gym-orange text-sm transition-colors">Home</a></li>
              <li><a href="#features" className="text-gray-400 hover:text-gym-orange text-sm transition-colors">Features</a></li>
              <li><a href="#trainers" className="text-gray-400 hover:text-gym-orange text-sm transition-colors">Trainers</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-gym-orange text-sm transition-colors">Memberships</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-gym-orange text-sm transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gym-orange text-sm transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gym-orange text-sm transition-colors">Waiver Form</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start text-gray-400 text-sm">
                <MapPin size={18} className="mr-3 text-gym-orange flex-shrink-0" />
                <span>123 Iron Avenue, Forge District<br />Metropolis, NY 10001</span>
              </li>
              <li className="flex items-center text-gray-400 text-sm">
                <Phone size={18} className="mr-3 text-gym-orange flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center text-gray-400 text-sm">
                <Mail size={18} className="mr-3 text-gym-orange flex-shrink-0" />
                <span>join@personalitygym.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} The Personality Gym. All rights reserved.
          </p>
          <div className="text-gray-500 text-xs font-medium uppercase tracking-widest">
            Forged with Power
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
