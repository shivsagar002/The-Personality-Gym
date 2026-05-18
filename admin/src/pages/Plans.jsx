import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Check, Tag, X } from 'lucide-react';

const initialPlans = [
  { id: 'p1', name: 'Basic Access', price: '49', users: '450', isRecommended: false, features: ['Access to gym floor', 'Standard equipment', 'Locker room access', '1 Guest pass/month'] },
  { id: 'p2', name: 'Elite Membership', price: '89', users: '620', isRecommended: true, features: ['24/7 Priority Access', 'All Premium Equipment', 'AI Diet & Workout App', 'Sauna & Recovery Lounge', 'Unlimited Guest Passes'] },
  { id: 'p3', name: 'Pro Athlete', price: '149', users: '178', isRecommended: false, features: ['Everything in Elite', '2 PT Sessions/month', 'Custom Meal Prep Delivery', 'Body Composition Scans'] },
];

const initialCoupons = [
  { id: 'c1', code: 'FORGE20', discount: '20% OFF', usage: 145, limit: 500, status: 'Active' },
  { id: 'c2', code: 'NEWYEAR50', discount: '$50 OFF', usage: 500, limit: 500, status: 'Exhausted' },
];

const AdminPlans = () => {
  const [plans, setPlans] = useState(initialPlans);
  const [coupons, setCoupons] = useState(initialCoupons);

  // Modal States
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);
  
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [currentCoupon, setCurrentCoupon] = useState({ code: '', discount: '', limit: 100 });

  const handleOpenPlanModal = (plan = null) => {
    if (plan) {
      setCurrentPlan(plan);
    } else {
      setCurrentPlan({ id: `p${plans.length + 1}`, name: '', price: '', users: '0', isRecommended: false, features: [''] });
    }
    setIsPlanModalOpen(true);
  };

  const handleSavePlan = (e) => {
    e.preventDefault();
    const existing = plans.find(p => p.id === currentPlan.id);
    if (existing) {
      setPlans(plans.map(p => p.id === currentPlan.id ? currentPlan : p));
    } else {
      setPlans([...plans, currentPlan]);
    }
    setIsPlanModalOpen(false);
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...currentPlan.features];
    newFeatures[index] = value;
    setCurrentPlan({ ...currentPlan, features: newFeatures });
  };

  const addFeatureRow = () => setCurrentPlan({ ...currentPlan, features: [...currentPlan.features, ''] });

  const handleDeletePlan = (id) => {
    if(window.confirm("Remove this plan? This may affect active users.")) {
      setPlans(plans.filter(p => p.id !== id));
    }
  };

  const handleSaveCoupon = (e) => {
    e.preventDefault();
    const newCoupon = {
      ...currentCoupon,
      id: `c${coupons.length + 1}`,
      usage: 0,
      status: 'Active'
    };
    setCoupons([...coupons, newCoupon]);
    setIsCouponModalOpen(false);
  };

  const handleDeleteCoupon = (id) => {
    if(window.confirm("Deactivate this coupon code?")) {
      setCoupons(coupons.filter(c => c.id !== id));
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Plans Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-white uppercase italic">Subscription Plans</h1>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-1">Configure pricing tiers and features</p>
        </div>
        <button onClick={() => handleOpenPlanModal()} className="bg-gym-orange text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-gym-neon transition-colors flex items-center gap-2 shadow-lg shadow-gym-orange/20">
          <Plus size={16} /> Create New Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div key={plan.id} className={`glassmorphism rounded-3xl p-8 relative flex flex-col justify-between group ${plan.isRecommended ? 'border-gym-orange shadow-[0_0_30px_rgba(255,87,34,0.15)]' : 'border-white/5'}`}>
            {plan.isRecommended && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gym-orange text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                Most Popular
              </div>
            )}
            
            <div>
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-black text-white uppercase">{plan.name}</h3>
                <div className="flex gap-2">
                  <button onClick={() => handleOpenPlanModal(plan)} className="text-gray-500 hover:text-white transition-colors"><Edit2 size={16} /></button>
                  <button onClick={() => handleDeletePlan(plan.id)} className="text-gray-500 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                </div>
              </div>

              <div className="flex items-end gap-1 mb-2">
                <span className="text-4xl font-black text-gym-orange">${plan.price}</span>
                <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mb-1">/month</span>
              </div>
              <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-8">Active Users: {plan.users}</p>

              <ul className="space-y-4 mb-8 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check size={16} className="text-gym-orange shrink-0 mt-0.5" />
                    <span className="text-gray-400 font-medium text-sm leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Coupons Section */}
      <div className="mt-12 pt-12 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-black text-white uppercase italic">Active Coupons</h2>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-1">Manage promotional codes</p>
          </div>
          <button onClick={() => {setCurrentCoupon({code: '', discount: '', limit: 100}); setIsCouponModalOpen(true);}} className="bg-white/5 border border-white/10 text-white px-6 py-2.5 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-colors flex items-center gap-2">
            <Tag size={16} /> Generate Code
          </button>
        </div>

        <div className="glassmorphism rounded-3xl border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-[10px] uppercase tracking-widest text-gray-500 font-black">
                  <th className="p-6 font-black">Code</th>
                  <th className="p-6 font-black">Discount</th>
                  <th className="p-6 font-black">Usage / Limit</th>
                  <th className="p-6 font-black">Status</th>
                  <th className="p-6 font-black text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {coupons.map(coupon => (
                  <tr key={coupon.id} className="hover:bg-white/5 transition-colors group">
                    <td className="p-6"><span className="font-mono text-sm font-bold text-gym-orange">{coupon.code}</span></td>
                    <td className="p-6 text-white font-bold text-sm">{coupon.discount}</td>
                    <td className="p-6 text-gray-400 font-medium">{coupon.usage} / {coupon.limit}</td>
                    <td className="p-6">
                      <span className={`${coupon.status === 'Active' ? 'text-green-500' : 'text-red-500'} text-xs font-bold uppercase tracking-widest`}>
                        {coupon.status}
                      </span>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center justify-center gap-3">
                        <button onClick={() => handleDeleteCoupon(coupon.id)} className="text-gray-500 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {coupons.length === 0 && (
                  <tr><td colSpan="5" className="p-8 text-center text-gray-500 font-bold uppercase text-xs">No active coupons.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Plan Form Modal */}
      <AnimatePresence>
        {isPlanModalOpen && currentPlan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-gym-darker/90 backdrop-blur-sm" onClick={() => setIsPlanModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-lg glassmorphism rounded-3xl border border-white/10 shadow-2xl p-8 max-h-[90vh] overflow-y-auto custom-scrollbar">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gym-orange" />
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-white uppercase">{currentPlan.name ? 'Edit Plan' : 'Create New Plan'}</h3>
                <button onClick={() => setIsPlanModalOpen(false)} className="text-gray-500 hover:text-white"><X size={20} /></button>
              </div>

              <form onSubmit={handleSavePlan} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Plan Name</label>
                  <input type="text" required value={currentPlan.name} onChange={(e) => setCurrentPlan({...currentPlan, name: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gym-orange" />
                </div>
                <div className="flex gap-4">
                  <div className="space-y-1 flex-1">
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Price ($/mo)</label>
                    <input type="number" required value={currentPlan.price} onChange={(e) => setCurrentPlan({...currentPlan, price: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gym-orange" />
                  </div>
                  <div className="space-y-1 flex items-end">
                    <label className="flex items-center gap-2 cursor-pointer h-[46px] px-2 text-white font-bold text-sm">
                      <input type="checkbox" checked={currentPlan.isRecommended} onChange={(e) => setCurrentPlan({...currentPlan, isRecommended: e.target.checked})} className="w-4 h-4 accent-gym-orange" />
                      Highlight as Recommended
                    </label>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Features List</label>
                  {currentPlan.features.map((feature, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input type="text" required value={feature} onChange={(e) => handleFeatureChange(idx, e.target.value)} placeholder="E.g., 24/7 Access" className="flex-grow bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-gym-orange" />
                      {idx === currentPlan.features.length - 1 && (
                        <button type="button" onClick={addFeatureRow} className="bg-white/10 p-2 rounded-xl text-white hover:bg-gym-orange"><Plus size={20} /></button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="pt-4 mt-4 border-t border-white/5">
                  <button type="submit" className="w-full py-4 bg-gym-orange text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-gym-neon transition-all">Save Plan</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Coupon Form Modal */}
      <AnimatePresence>
        {isCouponModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-gym-darker/90 backdrop-blur-sm" onClick={() => setIsCouponModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-sm glassmorphism rounded-3xl border border-white/10 shadow-2xl p-8">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gym-orange" />
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-white uppercase">Generate Coupon</h3>
                <button onClick={() => setIsCouponModalOpen(false)} className="text-gray-500 hover:text-white"><X size={20} /></button>
              </div>

              <form onSubmit={handleSaveCoupon} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Code (e.g. SUMMER50)</label>
                  <input type="text" required value={currentCoupon.code} onChange={(e) => setCurrentCoupon({...currentCoupon, code: e.target.value.toUpperCase()})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gym-orange uppercase font-mono font-bold" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Discount Amount/String</label>
                  <input type="text" required value={currentCoupon.discount} onChange={(e) => setCurrentCoupon({...currentCoupon, discount: e.target.value})} placeholder="e.g. 20% OFF or $10 OFF" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gym-orange" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Usage Limit</label>
                  <input type="number" required min="1" value={currentCoupon.limit} onChange={(e) => setCurrentCoupon({...currentCoupon, limit: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gym-orange" />
                </div>

                <div className="pt-4 mt-4 border-t border-white/5">
                  <button type="submit" className="w-full py-4 bg-gym-orange text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-gym-neon transition-all">Create Coupon</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default AdminPlans;
