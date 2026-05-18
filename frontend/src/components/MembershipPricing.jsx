import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Basic',
    price: '49',
    period: '/month',
    description: 'Essential access to forge your foundation.',
    features: [
      'Access to all gym equipment',
      'Locker room & showers',
      'Free parking',
      '1 Guest pass per month'
    ],
    buttonText: 'Add to Cart',
    popular: false
  },
  {
    name: 'Elite',
    price: '89',
    period: '/month',
    description: 'The ultimate package for serious commitment.',
    features: [
      '24/7 Priority Access',
      'Advanced Body Composition Analysis',
      'Unlimited Guest Passes',
      '2 Personal Training Sessions',
      'Recovery Zone Access (Sauna/Ice Bath)'
    ],
    buttonText: 'Add to Cart - Recommended',
    popular: true
  },
  {
    name: 'Personal Training',
    price: '199',
    period: '/month',
    description: 'Dedicated guidance to sculpt your personality.',
    features: [
      'All Elite Membership Benefits',
      '8 Personal Training Sessions/mo',
      'Customized Nutrition Plan',
      'Direct line to your trainer',
      'Monthly progress tracking'
    ],
    buttonText: 'Add to Cart',
    popular: false
  }
];

const MembershipPricing = ({ onOpenAuth }) => {
  return (
    <section id="pricing" className="py-24 bg-gym-dark relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            JOIN THE <span className="text-gym-orange">MOVEMENT</span>
          </h2>
          <p className="text-gray-400">
            Choose your tier. Commit to the process. No hidden fees, no bullshit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative bg-gym-gray flex flex-col p-8 transition-transform duration-300 hover:-translate-y-4 ${
                plan.popular 
                  ? 'border-2 border-gym-orange shadow-[0_0_30px_rgba(255,87,34,0.15)] transform md:-translate-y-4' 
                  : 'border border-white/10 mt-0 md:mt-4'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gym-orange text-white px-4 py-1 font-bold text-sm tracking-wider uppercase">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-black mb-2 uppercase">{plan.name}</h3>
              <p className="text-gray-400 text-sm mb-6 h-10">{plan.description}</p>
              
              <div className="mb-8 flex items-baseline">
                <span className="text-5xl font-black text-white">${plan.price}</span>
                <span className="text-gray-500 font-medium ml-1">{plan.period}</span>
              </div>
              
              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check size={20} className="text-gym-orange mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={onOpenAuth}
                className={`w-full py-4 font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 ${
                  plan.popular 
                    ? 'bg-gym-orange text-white hover:bg-gym-neon box-glow' 
                    : 'bg-transparent border border-white/20 text-white hover:border-gym-orange hover:bg-gym-orange/10'
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MembershipPricing;
