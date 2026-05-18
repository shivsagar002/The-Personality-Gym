import { motion } from 'framer-motion';
import { Utensils, Droplets, Zap, CheckCircle2, AlertCircle } from 'lucide-react';

const dietPlan = [
  { time: '08:00 AM', meal: 'Breakfast', menu: '6 Egg Whites, 1 Whole Egg, 50g Oats with Berries', macros: '450 kcal | 40g P' },
  { time: '11:30 AM', meal: 'Mid-Day Snack', menu: 'Greek Yogurt (200g) with Walnuts', macros: '250 kcal | 20g P' },
  { time: '02:00 PM', meal: 'Lunch', menu: '150g Grilled Chicken, 100g Brown Rice, Steamed Broccoli', macros: '550 kcal | 45g P' },
  { time: '05:30 PM', meal: 'Pre-Workout', menu: '1 Banana, Black Coffee', macros: '100 kcal | 1g P' },
  { time: '08:30 PM', meal: 'Dinner', menu: '150g White Fish, Large Green Salad, Olive Oil', macros: '400 kcal | 35g P' },
];

const DietPlan = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-12"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Daily Meals */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-black text-white uppercase italic">Daily Fuel Plan</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-gym-orange">
                <Droplets size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">3.5L / 4L Water</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {dietPlan.map((item, index) => (
              <div key={index} className="glassmorphism p-6 rounded-2xl border border-white/5 hover:border-gym-orange/30 transition-all group flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gym-orange group-hover:bg-gym-orange group-hover:text-white transition-all">
                    <Utensils size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{item.time}</span>
                      <span className="text-gym-orange font-black text-[10px] uppercase tracking-tighter bg-gym-orange/10 px-2 py-0.5 rounded-full">{item.meal}</span>
                    </div>
                    <h4 className="text-white font-bold text-lg mt-1">{item.menu}</h4>
                  </div>
                </div>
                
                <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto mt-4 md:mt-0">
                  <span className="text-xs font-mono font-bold text-gray-400 bg-white/5 px-3 py-1 rounded-lg truncate">{item.macros}</span>
                  <button className="text-gray-600 hover:text-gym-orange transition-colors">
                    <CheckCircle2 size={24} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Macros & Supplements */}
        <div className="lg:col-span-4 space-y-8">
          <div className="glassmorphism p-8 rounded-3xl border-white/5">
            <h4 className="text-white font-black text-xl uppercase italic mb-8">Macros Breakdown</h4>
            <div className="space-y-6">
              <MacroProgress label="Protein" current="180g" target="200g" color="bg-gym-orange" percent="90%" />
              <MacroProgress label="Carbs" current="120g" target="150g" color="bg-white/40" percent="80%" />
              <MacroProgress label="Fats" current="45g" target="60g" color="bg-white/20" percent="75%" />
            </div>
          </div>

          <div className="bg-gym-orange/10 border border-gym-orange/20 p-8 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
              <AlertCircle size={60} />
            </div>
            <h4 className="text-gym-orange font-black text-xl uppercase italic mb-4">Supplement Stack</h4>
            <ul className="space-y-3">
              {['Whey Isolate - Post Workout', 'Creatine Monohydrate - 5g', 'Multivitamin - With Meal 1', 'Fish Oil - With Dinner'].map((supp, i) => (
                <li key={i} className="flex items-center gap-3 text-white/80 text-xs font-bold uppercase tracking-wider">
                  <div className="w-1.5 h-1.5 rounded-full bg-gym-orange" />
                  {supp}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const MacroProgress = ({ label, current, target, color, percent }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-end">
      <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{label}</span>
      <span className="text-white font-black text-sm">{current} <span className="text-gray-500 font-bold">/ {target}</span></span>
    </div>
    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
      <div className={`h-full ${color} rounded-full shadow-[0_0_10px_rgba(255,87,34,0.3)]`} style={{ width: percent }} />
    </div>
  </div>
);

export default DietPlan;
