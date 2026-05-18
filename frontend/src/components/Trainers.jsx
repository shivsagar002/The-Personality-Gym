import { useState, useEffect } from 'react';
import { Camera, Send, Phone, ArrowLeft, ArrowRight } from 'lucide-react';
import trainer1 from '../assets/trainer1.png';
import trainer2 from '../assets/trainer2.png';
import trainer3 from '../assets/trainer3.png';

const trainers = [
  {
    name: "Vikram 'The Beast' Singh",
    role: "Head Strength Coach",
    specialty: "Powerlifting & Hypertrophy",
    mobile: "+91 98765 43210",
    image: trainer1,
    social: { instagram: "#", twitter: "#" }
  },
  {
    name: "Sarah 'Steel' Miller",
    role: "Elite Fitness Trainer",
    specialty: "HIIT & Transformation",
    mobile: "+1 (555) 123-4567",
    image: trainer2,
    social: { instagram: "#", twitter: "#" }
  },
  {
    name: "Marcus Thorne",
    role: "Body Recomposition Expert",
    specialty: "Nutrition & Fat Loss",
    mobile: "+44 20 7946 0000",
    image: trainer3,
    social: { instagram: "#", twitter: "#" }
  }
];

const Trainers = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scrolling logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % trainers.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % trainers.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + trainers.length) % trainers.length);
  };

  return (
    <section id="trainers" className="py-24 bg-gym-darker relative overflow-hidden min-h-[800px] flex items-center">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-gym-orange/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-gym-orange/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-display font-black mb-4">
            KNOW YOUR <span className="text-gym-orange italic">TRAINERS</span>
          </h2>
          <div className="w-24 h-1.5 bg-gym-orange mx-auto transform -skew-x-12 mb-6" />
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Trainer Card Slider */}
          <div className="relative overflow-hidden rounded-sm border border-white/10 glassmorphism shadow-2xl min-h-[500px] md:min-h-[600px]">
            {trainers.map((trainer, index) => (
              <div 
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
                  index === currentIndex ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-full scale-95 pointer-events-none'
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                  {/* Image Part */}
                  <div className="relative h-64 md:h-full overflow-hidden">
                    <img 
                      src={trainer.image} 
                      alt={trainer.name} 
                      className="w-full h-full object-cover object-center transform scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gym-darker via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-gym-darker/50" />
                  </div>

                  {/* Info Part */}
                  <div className="p-8 md:p-12 flex flex-col justify-center bg-gym-dark/40 backdrop-blur-sm">
                    <div className="space-y-6">
                      <div>
                        <span className="text-gym-orange font-black uppercase tracking-[0.3em] text-sm italic">Elite Coach</span>
                        <h3 className="text-3xl md:text-5xl font-black text-white mt-2 leading-tight uppercase">
                          {trainer.name}
                        </h3>
                        <p className="text-gray-400 text-lg md:text-xl font-medium mt-1 uppercase italic border-l-4 border-gym-orange pl-4">
                          {trainer.role}
                        </p>
                      </div>

                      <div className="space-y-4 pt-4">
                        <div className="flex items-center gap-4 text-gray-300">
                          <div className="w-10 h-10 rounded-full bg-gym-orange/10 flex items-center justify-center text-gym-orange border border-gym-orange/20">
                            <Phone size={18} />
                          </div>
                          <span className="font-bold tracking-wider">{trainer.mobile}</span>
                        </div>
                        <div className="flex items-center gap-4 text-gray-300">
                          <div className="w-10 h-10 rounded-full bg-gym-orange/10 flex items-center justify-center text-gym-orange border border-gym-orange/20">
                            <div className="font-black italic text-xs">SPEC</div>
                          </div>
                          <span className="font-medium">{trainer.specialty}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 pt-8">
                        <a href={trainer.social.instagram} className="group flex items-center gap-2 text-gray-400 hover:text-white transition-all uppercase font-black tracking-widest text-xs">
                          <div className="w-12 h-12 rounded-sm border border-white/10 flex items-center justify-center group-hover:border-gym-orange group-hover:bg-gym-orange/10 transition-all">
                            <Camera size={20} />
                          </div>
                          Instagram
                        </a>
                        <a href={trainer.social.twitter} className="group flex items-center gap-2 text-gray-400 hover:text-white transition-all uppercase font-black tracking-widest text-xs">
                          <div className="w-12 h-12 rounded-sm border border-white/10 flex items-center justify-center group-hover:border-gym-orange group-hover:bg-gym-orange/10 transition-all">
                            <Send size={20} />
                          </div>
                          Twitter
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-8 z-20">
            <button 
              onClick={prevSlide}
              className="w-12 h-12 md:w-16 md:h-16 bg-gym-dark border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-gym-orange hover:border-gym-orange transition-all shadow-xl"
            >
              <ArrowLeft size={24} />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-8 z-20">
            <button 
              onClick={nextSlide}
              className="w-12 h-12 md:w-16 md:h-16 bg-gym-dark border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-gym-orange hover:border-gym-orange transition-all shadow-xl"
            >
              <ArrowRight size={24} />
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-3 mt-10">
            {trainers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  index === currentIndex ? 'w-12 bg-gym-orange' : 'w-3 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trainers;
