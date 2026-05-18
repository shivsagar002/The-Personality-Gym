import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Zap, Tag, ArrowRight, CreditCard, X } from 'lucide-react';

const plans = [
  {
    id: 'basic',
    name: 'Basic Access',
    price: 49,
    period: '/month',
    features: ['Access to gym floor', 'Standard equipment', 'Locker room access', '1 Guest pass/month'],
    recommended: false
  },
  {
    id: 'elite',
    name: 'Elite Membership',
    price: 89,
    period: '/month',
    features: ['24/7 Priority Access', 'All Premium Equipment', 'AI Diet & Workout App', 'Sauna & Recovery Lounge', 'Unlimited Guest Passes'],
    recommended: true
  },
  {
    id: 'pro',
    name: 'Pro Athlete',
    price: 149,
    period: '/month',
    features: ['Everything in Elite', '2 PT Sessions/month', 'Custom Meal Prep Delivery (1/wk)', 'Body Composition Scans'],
    recommended: false
  }
];

const Plans = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.toLowerCase() === 'forge20') {
      setDiscountApplied(true);
    } else {
      alert("Invalid coupon code.");
      setDiscountApplied(false);
    }
  };

  const handleCheckout = () => {
    // In a real app, integrate Stripe/Razorpay here
    alert(`Proceeding to payment gateway for ${selectedPlan.name}...`);
    setSelectedPlan(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-12 relative"
    >
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic mb-4">
          Upgrade Your <span className="text-gym-orange">Arsenal</span>
        </h2>
        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">
          Select a plan that matches your ambition. No hidden fees. Cancel anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
        {plans.map((plan) => (
          <div 
            key={plan.id}
            className={`glassmorphism rounded-3xl p-8 relative flex flex-col justify-between group transition-all duration-500 ${
              plan.recommended ? 'border-gym-orange shadow-[0_0_30px_rgba(255,87,34,0.15)] transform md:-translate-y-4' : 'border-white/5 hover:border-white/20'
            }`}
          >
            {plan.recommended && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gym-orange text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                Most Popular
              </div>
            )}
            
            <div>
              <h3 className="text-2xl font-black text-white uppercase mb-2">{plan.name}</h3>
              <div className="flex items-end gap-1 mb-8">
                <span className="text-4xl font-black text-gym-orange">${plan.price}</span>
                <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mb-1">{plan.period}</span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-gym-orange shrink-0 mt-0.5" />
                    <span className="text-gray-300 font-medium text-sm leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button 
              onClick={() => setSelectedPlan(plan)}
              className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 ${
                plan.recommended 
                  ? 'bg-gym-orange text-white hover:bg-gym-neon shadow-lg shadow-gym-orange/20' 
                  : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              Select Plan <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Checkout Modal Overlay */}
      <AnimatePresence>
        {selectedPlan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gym-darker/90 backdrop-blur-sm"
              onClick={() => setSelectedPlan(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md glassmorphism rounded-3xl border border-white/10 shadow-2xl p-8 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gym-orange" />
              
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-black text-white uppercase">Checkout</h3>
                  <p className="text-gym-orange text-xs font-bold uppercase tracking-widest">{selectedPlan.name}</p>
                </div>
                <button onClick={() => setSelectedPlan(null)} className="text-gray-500 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Order Summary */}
                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-gray-400 font-medium">Subscription</span>
                    <span className="text-white font-bold">${selectedPlan.price}.00</span>
                  </div>
                  {discountApplied && (
                    <div className="flex justify-between items-center text-sm mb-2 text-green-500">
                      <span className="font-bold flex items-center gap-1"><Tag size={14} /> FORGE20 (-20%)</span>
                      <span className="font-bold">-${(selectedPlan.price * 0.2).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t border-white/10 mt-3 pt-3 flex justify-between items-center">
                    <span className="text-white font-black uppercase tracking-widest text-xs">Total Due</span>
                    <span className="text-2xl font-black text-gym-orange">
                      ${discountApplied ? (selectedPlan.price * 0.8).toFixed(2) : selectedPlan.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Coupon Code */}
                <form onSubmit={handleApplyCoupon} className="relative group">
                  <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gym-orange transition-colors" size={18} />
                  <input 
                    type="text" 
                    placeholder="ENTER COUPON CODE (Try FORGE20)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full pl-12 pr-24 py-4 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-gym-orange/50 transition-all text-[10px] font-bold tracking-widest uppercase"
                  />
                  <button 
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all"
                  >
                    Apply
                  </button>
                </form>

                {/* Security Badge */}
                <div className="flex items-center justify-center gap-2 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                  <ShieldCheck size={14} /> Secure SSL Payment Processing
                </div>

                {/* Pay Button */}
                <button 
                  onClick={handleCheckout}
                  className="w-full py-4 bg-gym-orange text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-gym-neon transition-all flex items-center justify-center gap-2 shadow-lg shadow-gym-orange/20"
                >
                  <CreditCard size={18} /> Proceed to Pay
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Plans;
