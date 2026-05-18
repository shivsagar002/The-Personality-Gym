import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, MapPin, Phone, Mail, Award, Edit3, User, X, Check, ShieldCheck } from 'lucide-react';
import trainer1 from '../../assets/trainer1.png';
import { useAppContext } from '../../context/AppContext';

const Profile = () => {
  const { user: userData } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: userData.name,
    email: "sagar@personalitygym.com",
    phone: "+91 98765 43210",
    location: "New York, USA",
    weight: "78 KG",
    height: "182 CM",
    bodyFat: "14.2%",
    goal: "Bulk"
  });

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, you'd send this to the backend
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-12"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Identity Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glassmorphism p-8 rounded-3xl border-white/5 text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-2 bg-gym-orange" />
            <div className="relative z-10">
              <div className="w-32 h-32 mx-auto rounded-full border-4 border-gym-orange/20 p-1 mb-6 relative group">
                <img src={trainer1} alt="Profile" className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-500" />
                <button className="absolute bottom-0 right-0 bg-gym-orange p-2 rounded-full text-white shadow-lg hover:bg-gym-neon transition-colors">
                  <Camera size={16} />
                </button>
              </div>
              <h3 className="text-2xl font-black text-white uppercase">{profileData.name}</h3>
              <p className="text-gym-orange font-bold uppercase tracking-widest text-[10px] italic mt-1">{userData.plan}</p>
              
              <div className="flex justify-center gap-4 mt-8">
                <div className="text-center">
                  <p className="text-white font-black text-xl leading-none">12</p>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter mt-1">Workouts</p>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="text-center">
                  <p className="text-white font-black text-xl leading-none">84%</p>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter mt-1">Goal Hit</p>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="text-center">
                  <p className="text-white font-black text-xl leading-none">Gold</p>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter mt-1">Rank</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glassmorphism p-6 rounded-2xl border-white/5 space-y-4">
            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-4">Achievements</h4>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex-shrink-0 w-12 h-12 rounded-xl bg-gym-orange/10 border border-gym-orange/20 flex items-center justify-center text-gym-orange">
                  <Award size={24} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Detailed Info */}
        <div className="lg:col-span-8 space-y-8">
          <div className="glassmorphism p-8 rounded-3xl border-white/5 relative overflow-hidden">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-black text-white uppercase italic">Personal Information</h3>
              <AnimatePresence mode="wait">
                {!isEditing ? (
                  <motion.button 
                    key="edit"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 text-gym-orange text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
                  >
                    <Edit3 size={16} /> Edit Profile
                  </motion.button>
                ) : (
                  <motion.div 
                    key="save"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="flex gap-4"
                  >
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="text-gray-500 hover:text-white transition-colors"
                    >
                      <X size={20} />
                    </button>
                    <button 
                      onClick={handleSave}
                      className="text-green-500 hover:text-green-400 transition-colors"
                    >
                      <Check size={20} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <EditableField 
                label="Full Name" 
                value={profileData.name} 
                isEditing={isEditing} 
                onChange={(v) => setProfileData({...profileData, name: v})}
                icon={<User size={18} />} 
              />
              <EditableField 
                label="Email Address" 
                value={profileData.email} 
                isEditing={isEditing} 
                onChange={(v) => setProfileData({...profileData, email: v})}
                icon={<Mail size={18} />} 
              />
              <EditableField 
                label="Phone Number" 
                value={profileData.phone} 
                isEditing={isEditing} 
                onChange={(v) => setProfileData({...profileData, phone: v})}
                icon={<Phone size={18} />} 
              />
              <EditableField 
                label="Location" 
                value={profileData.location} 
                isEditing={isEditing} 
                onChange={(v) => setProfileData({...profileData, location: v})}
                icon={<MapPin size={18} />} 
              />
            </div>

            <div className="mt-12 pt-12 border-t border-white/5">
              <h3 className="text-xl font-black text-white uppercase italic mb-8">Physical Stats</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <EditableStatBox 
                  label="Weight" 
                  value={profileData.weight} 
                  isEditing={isEditing}
                  onChange={(v) => setProfileData({...profileData, weight: v})}
                />
                <EditableStatBox 
                  label="Height" 
                  value={profileData.height} 
                  isEditing={isEditing}
                  onChange={(v) => setProfileData({...profileData, height: v})}
                />
                <EditableStatBox 
                  label="Body Fat" 
                  value={profileData.bodyFat} 
                  isEditing={isEditing}
                  onChange={(v) => setProfileData({...profileData, bodyFat: v})}
                />
                <EditableStatBox 
                  label="Goal" 
                  value={profileData.goal} 
                  isEditing={isEditing}
                  onChange={(v) => setProfileData({...profileData, goal: v})}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const EditableField = ({ label, value, icon, isEditing, onChange }) => (
  <div className="space-y-2">
    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">{label}</p>
    <div className="flex items-center gap-3 text-white">
      <div className="text-gym-orange/50">{icon}</div>
      {isEditing ? (
        <input 
          type="text" 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="bg-white/5 border-b border-gym-orange/50 focus:outline-none px-2 py-1 w-full font-bold"
        />
      ) : (
        <p className="font-bold tracking-tight">{value}</p>
      )}
    </div>
  </div>
);

const EditableStatBox = ({ label, value, isEditing, onChange }) => (
  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter mb-1">{label}</p>
    {isEditing ? (
      <input 
        type="text" 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent border-b border-gym-orange/50 focus:outline-none w-full font-black text-white"
      />
    ) : (
      <p className="text-lg font-black text-white">{value}</p>
    )}
  </div>
);

export default Profile;
