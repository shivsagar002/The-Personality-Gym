import { motion } from 'framer-motion';
import { Camera, Send, Phone, Star, ShieldCheck } from 'lucide-react';
import trainer1 from '../../assets/trainer1.png';
import trainer2 from '../../assets/trainer2.png';
import trainer3 from '../../assets/trainer3.png';

const trainers = [
  {
    name: "Vikram 'The Beast' Singh",
    role: "Head Strength Coach",
    specialty: "Powerlifting & Hypertrophy",
    mobile: "+91 98765 43210",
    image: trainer1,
    rating: 4.9,
    clients: 120
  },
  {
    name: "Sarah 'Steel' Miller",
    role: "Elite Fitness Trainer",
    specialty: "HIIT & Transformation",
    mobile: "+1 (555) 123-4567",
    image: trainer2,
    rating: 4.8,
    clients: 85
  },
  {
    name: "Marcus Thorne",
    role: "Body Recomposition Expert",
    specialty: "Nutrition & Fat Loss",
    mobile: "+44 20 7946 0000",
    image: trainer3,
    rating: 5.0,
    clients: 45
  }
];

const Trainers = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-12"
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-black text-white uppercase italic">Elite <span className="text-gym-orange">Coaches</span></h2>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-2">Certified masters of the arena</p>
        </div>
        <button className="hidden md:block px-6 py-3 bg-gym-orange/10 border border-gym-orange/30 rounded-xl text-gym-orange font-black uppercase tracking-widest text-[10px] hover:bg-gym-orange hover:text-white transition-all">
          Request PT Session
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {trainers.map((trainer, index) => (
          <div key={index} className="glassmorphism rounded-3xl overflow-hidden border border-white/5 group hover:border-gym-orange/30 transition-all duration-500">
            <div className="relative h-64 overflow-hidden">
              <img src={trainer.image} alt={trainer.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-gym-darker via-transparent to-transparent" />
              <div className="absolute top-4 right-4 flex gap-2">
                <span className="bg-gym-dark/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-white flex items-center gap-1">
                  <Star size={10} className="text-gym-orange" fill="currentColor" /> {trainer.rating}
                </span>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-xl font-black text-white uppercase leading-none">{trainer.name}</h3>
                <p className="text-gym-orange font-bold text-[10px] uppercase tracking-widest mt-2 italic">{trainer.role}</p>
              </div>
              
              <div className="space-y-2 py-4 border-y border-white/5 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-gray-500 font-bold uppercase">Specialty</span>
                  <span className="text-white font-bold">{trainer.specialty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-bold uppercase">Experience</span>
                  <span className="text-white font-bold">8+ Years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-bold uppercase">Active Clients</span>
                  <span className="text-white font-bold">{trainer.clients}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex gap-3">
                  <a href="#" className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-gym-orange hover:bg-white/10 transition-all"><Camera size={16} /></a>
                  <a href="#" className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-gym-orange hover:bg-white/10 transition-all"><Send size={16} /></a>
                </div>
                <button className="flex items-center gap-2 bg-gym-orange text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gym-neon transition-all">
                  Book <ShieldCheck size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Trainers;
