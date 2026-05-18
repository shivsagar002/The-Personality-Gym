import { ChevronRight } from 'lucide-react';
import heroBg from '../assets/gym_hero_bg.png';

const Hero = ({ onOpenAuth }) => {
  return (
    <div id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Gym Interior" 
          className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gym-darker via-gym-dark/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gym-darker via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-3xl">
          <div className="inline-block px-4 py-1 mb-6 border border-gym-orange/30 bg-gym-orange/10 backdrop-blur-sm transform -skew-x-12">
            <span className="text-gym-orange font-bold tracking-widest text-sm uppercase block transform skew-x-12">
              Transform Your Identity
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] mb-6">
            FORGE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gym-orange to-[#FF8A65] text-glow">
              YOUR LEGACY
            </span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-xl mb-10 border-l-4 border-gym-orange pl-4">
            More than just a gym. We build character, discipline, and raw power. 
            Join the elite and sculpt the personality you were meant to have.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onOpenAuth}
              className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-gym-orange rounded-sm overflow-hidden transform transition-all hover:scale-105 box-glow"
            >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
              <span className="relative flex items-center gap-2">
                JOIN THE ELITE <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            <a href="#features" className="inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-transparent border border-white/20 hover:border-gym-orange hover:bg-gym-orange/10 transition-all rounded-sm">
              EXPLORE FACILITY
            </a>
          </div>
        </div>
      </div>

      {/* Torn Paper Bottom Transition */}
      <div className="absolute bottom-0 left-0 w-full h-16 md:h-24 bg-gym-darker torn-paper-bottom z-20 translate-y-[2px]"></div>
    </div>
  );
};

export default Hero;
