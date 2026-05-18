import { Dumbbell, Target, Users, Zap } from 'lucide-react';
import equipmentBg from '../assets/gym_equipment.png';

const features = [
  {
    icon: <Dumbbell size={32} />,
    title: 'Premium Equipment',
    description: 'State-of-the-art machines and free weights designed for optimal biomechanics and maximum results.'
  },
  {
    icon: <Target size={32} />,
    title: 'Personalized Plans',
    description: 'Customized training regimes tailored to your specific body type, goals, and personality.'
  },
  {
    icon: <Users size={32} />,
    title: 'Elite Trainers',
    description: 'Learn from industry veterans who push you beyond your mental and physical limits.'
  },
  {
    icon: <Zap size={32} />,
    title: 'High-Octane Vibe',
    description: 'An electrifying atmosphere with dark aesthetics and driving beats to keep you in the zone.'
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-gym-darker relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            NOT YOUR <span className="text-gym-orange">AVERAGE</span> GYM
          </h2>
          <p className="text-gray-400">
            We provide an environment engineered for serious lifters and athletes who demand the best from themselves and their equipment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group bg-gym-gray/50 p-8 border border-white/5 hover:border-gym-orange/50 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gym-orange to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="text-gym-orange mb-6 group-hover:scale-110 transition-transform origin-left">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative large text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 select-none pointer-events-none opacity-5 hidden lg:block overflow-hidden">
        <span className="font-display font-black text-[15rem] leading-none whitespace-nowrap text-white">
          DISCIPLINE
        </span>
      </div>
      
      {/* Visual Break with Image */}
      <div className="mt-24 relative h-64 md:h-96 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gym-darker torn-paper-top z-10 origin-top h-16 w-full"></div>
        <img 
          src={equipmentBg} 
          alt="Gym Equipment" 
          className="w-full h-full object-cover opacity-40 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gym-orange/10 mix-blend-overlay"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-4xl md:text-6xl font-black text-white text-glow tracking-widest text-center">
            NO EXCUSES.<br />JUST RESULTS.
          </h2>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gym-dark torn-paper-bottom z-10"></div>
      </div>
    </section>
  );
};

export default Features;
