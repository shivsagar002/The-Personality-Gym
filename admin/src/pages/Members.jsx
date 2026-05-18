import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Edit2, Trash2, CheckCircle2, XCircle, X, Plus } from 'lucide-react';
import CustomSelect from '../components/CustomSelect';

const initialMembers = [
  { id: 'PG-001', name: 'Sagar Developer', email: 'sagar@example.com', phone: '9876543210', plan: 'Elite Membership', status: 'Active', joinDate: '2026-01-12' },
  { id: 'PG-002', name: 'Alex Chen', email: 'alex@example.com', phone: '5551234567', plan: 'Pro Athlete', status: 'Active', joinDate: '2026-02-15' },
  { id: 'PG-003', name: 'Sarah Miller', email: 'sarah@example.com', phone: '1112223333', plan: 'Basic Access', status: 'Inactive', joinDate: '2025-11-05' },
];

const Members = () => {
  const [members, setMembers] = useState(initialMembers);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [currentMember, setCurrentMember] = useState(null);

  // Filter Logic (Search by name, email, or phone)
  const filteredMembers = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return members.filter(m => 
      m.name.toLowerCase().includes(term) || 
      m.email.toLowerCase().includes(term) ||
      m.phone.includes(term)
    );
  }, [members, searchTerm]);

  const handleOpenAddModal = () => {
    setModalMode('add');
    setCurrentMember({ name: '', email: '', phone: '', plan: 'Basic Access', status: 'Active' });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (member) => {
    setModalMode('edit');
    setCurrentMember(member);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to remove this member?")) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  const handleSaveModal = (e) => {
    e.preventDefault();
    if (modalMode === 'add') {
      const newMember = {
        ...currentMember,
        id: `PG-00${members.length + 1}`, // simple dummy ID generation
        joinDate: new Date().toISOString().split('T')[0]
      };
      setMembers([...members, newMember]);
    } else {
      setMembers(members.map(m => m.id === currentMember.id ? currentMember : m));
    }
    setIsModalOpen(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-black text-white uppercase italic">Member Directory</h1>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-1">Manage user accounts and access</p>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative group flex-grow md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gym-orange transition-colors" size={16} />
            <input 
              type="text"
              placeholder="Search name, email, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white text-xs font-bold focus:outline-none focus:border-gym-orange/50 transition-colors"
            />
          </div>
          <button onClick={handleOpenAddModal} className="bg-gym-orange text-white px-6 py-2.5 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-gym-neon transition-colors shadow-lg shadow-gym-orange/20 flex items-center gap-2 whitespace-nowrap">
            <Plus size={16} /> Add Member
          </button>
        </div>
      </div>

      <div className="glassmorphism rounded-3xl border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-[10px] uppercase tracking-widest text-gray-500 font-black">
                <th className="p-6 font-black">Member ID</th>
                <th className="p-6 font-black">Member Info</th>
                <th className="p-6 font-black">Phone</th>
                <th className="p-6 font-black">Active Plan</th>
                <th className="p-6 font-black">Status</th>
                <th className="p-6 font-black text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-white/5 transition-colors group">
                  <td className="p-6"><span className="font-mono text-sm font-bold text-white">{member.id}</span></td>
                  <td className="p-6">
                    <div>
                      <p className="text-white font-bold text-sm">{member.name}</p>
                      <p className="text-gray-500 text-xs">{member.email}</p>
                    </div>
                  </td>
                  <td className="p-6 text-gray-400 text-sm font-medium">{member.phone}</td>
                  <td className="p-6">
                    <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10">
                      {member.plan}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      {member.status === 'Active' ? <CheckCircle2 size={16} className="text-green-500" /> : <XCircle size={16} className="text-red-500" />}
                      <span className={`text-xs font-bold uppercase tracking-widest ${member.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
                        {member.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center justify-center gap-3">
                      <button onClick={() => handleOpenEditModal(member)} className="p-2 text-gray-400 hover:text-white bg-white/5 rounded-lg transition-colors"><Edit2 size={16} /></button>
                      <button onClick={() => handleDelete(member.id)} className="p-2 text-gray-400 hover:text-red-500 bg-white/5 rounded-lg transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredMembers.length === 0 && (
            <div className="p-8 text-center text-gray-500 font-bold uppercase tracking-widest text-xs">No members found.</div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-gym-darker/90 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-lg glassmorphism rounded-3xl border border-white/10 shadow-2xl p-8 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gym-orange" />
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-white uppercase">{modalMode === 'add' ? 'Add New Member' : 'Edit Member'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white"><X size={20} /></button>
              </div>

              <form onSubmit={handleSaveModal} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Full Name</label>
                  <input type="text" required value={currentMember.name} onChange={(e) => setCurrentMember({...currentMember, name: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gym-orange" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Email Address</label>
                  <input type="email" required value={currentMember.email} onChange={(e) => setCurrentMember({...currentMember, email: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gym-orange" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Phone Number</label>
                  <input type="text" required value={currentMember.phone} onChange={(e) => setCurrentMember({...currentMember, phone: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gym-orange" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1 relative z-50">
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Assigned Plan</label>
                    <CustomSelect 
                      value={currentMember.plan}
                      onChange={(val) => setCurrentMember({...currentMember, plan: val})}
                      options={[
                        { value: 'Basic Access', label: 'Basic Access' },
                        { value: 'Elite Membership', label: 'Elite Membership' },
                        { value: 'Pro Athlete', label: 'Pro Athlete' }
                      ]}
                    />
                  </div>
                  <div className="space-y-1 relative z-50">
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Status</label>
                    <CustomSelect 
                      value={currentMember.status}
                      onChange={(val) => setCurrentMember({...currentMember, status: val})}
                      options={[
                        { value: 'Active', label: 'Active' },
                        { value: 'Inactive', label: 'Inactive' }
                      ]}
                    />
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5">
                  <button type="submit" className="w-full py-4 bg-gym-orange text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-gym-neon transition-all">
                    {modalMode === 'add' ? 'Create Member' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Members;
