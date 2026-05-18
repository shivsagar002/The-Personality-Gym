import { motion } from 'framer-motion';
import { Users, DollarSign, Activity, TrendingUp, ArrowUpRight, ArrowDownRight, Dumbbell, Clock, Flame } from 'lucide-react';

const Overview = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black text-white uppercase italic">Command Center</h1>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-1">Real-time platform analytics</p>
        </div>
        <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-xs font-bold text-white uppercase tracking-widest">
          Last 30 Days
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Total Revenue" 
          value="$24,590" 
          trend="+12.5%" 
          isPositive={true} 
          icon={<DollarSign size={24} />} 
        />
        <KPICard 
          title="Active Members" 
          value="1,248" 
          trend="+4.2%" 
          isPositive={true} 
          icon={<Users size={24} />} 
        />
        <KPICard 
          title="Daily Active (DAU)" 
          value="456" 
          trend="-1.8%" 
          isPositive={false} 
          icon={<Activity size={24} />} 
        />
        <KPICard 
          title="Conversion Rate" 
          value="8.4%" 
          trend="+2.1%" 
          isPositive={true} 
          icon={<TrendingUp size={24} />} 
        />
        <KPICard 
          title="New Signups (MTD)" 
          value="142" 
          trend="+18.4%" 
          isPositive={true} 
          icon={<Users size={24} />} 
        />
        <KPICard 
          title="Workouts Completed" 
          value="8,902" 
          trend="+15.2%" 
          isPositive={true} 
          icon={<Dumbbell size={24} />} 
        />
        <KPICard 
          title="Avg. Visit Duration" 
          value="68m" 
          trend="+5.0%" 
          isPositive={true} 
          icon={<Clock size={24} />} 
        />
        <KPICard 
          title="Trainer Engagement" 
          value="72%" 
          trend="-0.5%" 
          isPositive={false} 
          icon={<Flame size={24} />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Area (Simulated) */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glassmorphism rounded-3xl p-6 md:p-8 border-white/5 overflow-x-auto">
            <h3 className="text-xl font-black text-white uppercase mb-6">Revenue & Attendance Trends</h3>
            <div className="min-w-[500px] h-72 flex items-end justify-between gap-2 border-b border-l border-white/10 p-4 pb-0 pl-0 relative">
              {/* Y Axis Labels */}
              <div className="absolute -left-8 h-full flex flex-col justify-between text-[10px] font-bold text-gray-500 py-4">
                <span>$5k</span>
                <span>$2.5k</span>
                <span>$0</span>
              </div>
              
              {/* Simulated Bar Chart */}
              {[40, 60, 45, 80, 55, 90, 75, 100, 85, 95, 60, 70].map((height, i) => (
                <div key={i} className="w-full bg-white/5 rounded-t-sm relative group hover:bg-white/10 transition-colors" style={{ height: '100%' }}>
                  <div 
                    className="absolute bottom-0 w-full bg-gym-orange/80 rounded-t-sm group-hover:bg-gym-orange transition-colors"
                    style={{ height: `${height}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="min-w-[500px] flex justify-between mt-4 text-[10px] font-bold text-gray-500 uppercase px-2">
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Plan Distribution Mini Chart */}
            <div className="glassmorphism rounded-3xl p-6 border-white/5">
              <h3 className="text-sm font-black text-white uppercase mb-6">Plan Distribution</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-gray-400">Basic Access</span>
                    <span className="text-white">45%</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '45%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-gray-400">Elite Membership</span>
                    <span className="text-white">35%</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gym-orange rounded-full" style={{ width: '35%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-gray-400">Pro Athlete</span>
                    <span className="text-white">20%</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: '20%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Peak Hours Mini Chart */}
            <div className="glassmorphism rounded-3xl p-6 border-white/5">
              <h3 className="text-sm font-black text-white uppercase mb-6">Peak Hours</h3>
              <div className="flex items-end justify-between h-32 gap-1 border-b border-white/10 pb-2">
                {[10, 20, 50, 80, 100, 70, 40, 60, 90, 85, 40, 20].map((h, i) => (
                  <div key={i} className="w-full bg-white/10 rounded-t-sm" style={{ height: `${h}%` }} />
                ))}
              </div>
              <div className="flex justify-between mt-2 text-[8px] font-bold text-gray-500 uppercase">
                <span>6AM</span>
                <span>12PM</span>
                <span>6PM</span>
                <span>10PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="glassmorphism rounded-3xl p-6 md:p-8 border-white/5">
          <h3 className="text-xl font-black text-white uppercase mb-6">Live Feed</h3>
          <div className="space-y-6">
            <ActivityItem type="signup" user="Alex Chen" plan="Elite Membership" time="2m ago" />
            <ActivityItem type="checkin" user="Sarah Miller" plan="Gym Floor" time="15m ago" />
            <ActivityItem type="upgrade" user="Mike Ross" plan="Pro Athlete" time="1h ago" />
            <ActivityItem type="payment" user="Emma Watson" plan="Basic Access" time="2h ago" />
            <ActivityItem type="checkin" user="David Kim" plan="PT Session" time="3h ago" />
            <ActivityItem type="signup" user="John Doe" plan="Basic Access" time="4h ago" />
            <ActivityItem type="payment" user="Jane Smith" plan="Elite Membership" time="5h ago" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const KPICard = ({ title, value, trend, isPositive, icon }) => (
  <div className="glassmorphism p-6 rounded-2xl border-white/5 relative overflow-hidden group">
    <div className="absolute -right-4 -top-4 text-white/5 group-hover:text-gym-orange/10 group-hover:scale-110 transition-all duration-500">
      <div className="w-24 h-24">{icon}</div>
    </div>
    <div className="relative z-10">
      <div className="flex justify-between items-start mb-4">
        <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">{title}</p>
        <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-md ${isPositive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
          {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {trend}
        </div>
      </div>
      <h3 className="text-3xl font-black text-white">{value}</h3>
    </div>
  </div>
);

const ActivityItem = ({ type, user, plan, time }) => {
  const getIcon = () => {
    switch(type) {
      case 'signup': return <div className="text-blue-400 bg-blue-400/10 p-2 rounded-lg"><Users size={16} /></div>;
      case 'checkin': return <div className="text-green-400 bg-green-400/10 p-2 rounded-lg"><Activity size={16} /></div>;
      case 'upgrade': return <div className="text-purple-400 bg-purple-400/10 p-2 rounded-lg"><TrendingUp size={16} /></div>;
      case 'payment': return <div className="text-gym-orange bg-gym-orange/10 p-2 rounded-lg"><DollarSign size={16} /></div>;
      default: return null;
    }
  };

  return (
    <div className="flex items-start gap-4">
      {getIcon()}
      <div className="flex-grow">
        <p className="text-sm font-bold text-white">{user}</p>
        <p className="text-xs text-gray-500 font-medium">{type === 'signup' ? 'New Registration' : type === 'checkin' ? 'Checked In' : type === 'upgrade' ? 'Upgraded Plan' : 'Payment Processed'} • {plan}</p>
      </div>
      <span className="text-[10px] font-bold text-gray-600 uppercase whitespace-nowrap">{time}</span>
    </div>
  );
};

export default Overview;
