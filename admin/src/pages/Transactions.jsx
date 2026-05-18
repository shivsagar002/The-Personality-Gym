import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, X, Receipt, CheckCircle2, DollarSign } from 'lucide-react';
import CustomSelect from '../components/CustomSelect';

const initialTransactions = [
  { id: 'TRX-9081', date: '2026-05-17', user: 'Sagar Developer', email: 'sagar@example.com', phone: '9876543210', amount: '$89.00', plan: 'Elite Membership', method: 'Credit Card', status: 'Completed' },
  { id: 'TRX-9080', date: '2026-05-16', user: 'Alex Chen', email: 'alex@example.com', phone: '5551234567', amount: '$149.00', plan: 'Pro Athlete', method: 'UPI', status: 'Completed' },
  { id: 'TRX-9079', date: '2026-05-15', user: 'Mike Ross', email: 'mike@example.com', phone: '2223334444', amount: '$49.00', plan: 'Basic Access', method: 'Cash', status: 'Completed' },
  { id: 'TRX-9078', date: '2026-05-15', user: 'Sarah Miller', email: 'sarah@example.com', phone: '1112223333', amount: '$89.00', plan: 'Elite Membership', method: 'Credit Card', status: 'Failed' },
];

const Transactions = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTrx, setNewTrx] = useState({ 
    user: '', email: '', phone: '', amount: '', plan: 'Basic Access', method: 'Cash', externalId: '' 
  });

  const filteredTransactions = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return transactions.filter(t => 
      t.user.toLowerCase().includes(term) || 
      t.email.toLowerCase().includes(term) ||
      t.phone.includes(term) ||
      t.id.toLowerCase().includes(term)
    );
  }, [transactions, searchTerm]);

  // Handle method change to clear externalId if switching back to cash
  const handleMethodChange = (e) => {
    const method = e.target.value;
    if(method === 'Cash') {
      setNewTrx({ ...newTrx, method, externalId: '' });
    } else {
      setNewTrx({ ...newTrx, method });
    }
  };

  const handleSaveTransaction = (e) => {
    e.preventDefault();
    
    // Determine the ID to use
    let finalId = '';
    if (newTrx.method === 'Cash') {
      finalId = `TRX-${Math.floor(1000 + Math.random() * 9000)}`; // Auto-generate for cash
    } else {
      if (!newTrx.externalId.trim()) {
        alert("Please provide the Transaction / Reference Number for online payments.");
        return;
      }
      finalId = newTrx.externalId.toUpperCase();
    }

    const t = {
      ...newTrx,
      id: finalId,
      date: new Date().toISOString().split('T')[0],
      amount: `$${parseFloat(newTrx.amount).toFixed(2)}`,
      status: 'Completed'
    };
    
    setTransactions([t, ...transactions]);
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
          <h1 className="text-3xl font-black text-white uppercase italic">Transactions</h1>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-1">Payment history and manual logging</p>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative group flex-grow md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gym-orange transition-colors" size={16} />
            <input 
              type="text"
              placeholder="Search ID, Name, Email, Phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white text-xs font-bold focus:outline-none focus:border-gym-orange/50 transition-colors"
            />
          </div>
          <button onClick={() => { setNewTrx({ user: '', email: '', phone: '', amount: '', plan: 'Basic Access', method: 'Cash', externalId: '' }); setIsModalOpen(true); }} className="bg-gym-orange text-white px-6 py-2.5 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-gym-neon transition-colors shadow-lg shadow-gym-orange/20 flex items-center gap-2 whitespace-nowrap">
            <Plus size={16} /> Log Payment
          </button>
        </div>
      </div>

      <div className="glassmorphism rounded-3xl border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-[10px] uppercase tracking-widest text-gray-500 font-black">
                <th className="p-6 font-black">Trx ID & Date</th>
                <th className="p-6 font-black">Customer Details</th>
                <th className="p-6 font-black">Plan</th>
                <th className="p-6 font-black">Amount</th>
                <th className="p-6 font-black">Method</th>
                <th className="p-6 font-black">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredTransactions.map((trx) => (
                <tr key={trx.id} className="hover:bg-white/5 transition-colors group">
                  <td className="p-6">
                    <div className="flex flex-col">
                      <span className="font-mono text-sm font-bold text-white group-hover:text-gym-orange transition-colors">{trx.id}</span>
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{trx.date}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <div>
                      <p className="text-white font-bold text-sm">{trx.user}</p>
                      <p className="text-gray-500 text-[10px] uppercase tracking-widest">{trx.email} • {trx.phone}</p>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10">
                      {trx.plan}
                    </span>
                  </td>
                  <td className="p-6 font-black text-white">{trx.amount}</td>
                  <td className="p-6 text-gray-400 text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <Receipt size={14} className="text-gym-orange/50" /> {trx.method}
                    </div>
                  </td>
                  <td className="p-6">
                    <span className={`text-[10px] px-2 py-1 rounded font-black uppercase tracking-widest ${trx.status === 'Completed' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                      {trx.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredTransactions.length === 0 && (
                <tr><td colSpan="6" className="p-8 text-center text-gray-500 font-bold uppercase tracking-widest text-xs">No transactions found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Payment Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-gym-darker/90 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-lg glassmorphism rounded-3xl border border-white/10 shadow-2xl p-8 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gym-orange" />
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-white uppercase flex items-center gap-2"><DollarSign size={20} className="text-gym-orange" /> Log Offline Payment</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white"><X size={20} /></button>
              </div>

              <form onSubmit={handleSaveTransaction} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Customer Name</label>
                  <input type="text" required value={newTrx.user} onChange={(e) => setNewTrx({...newTrx, user: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gym-orange" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Email</label>
                    <input type="email" required value={newTrx.email} onChange={(e) => setNewTrx({...newTrx, email: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gym-orange" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Phone</label>
                    <input type="text" required value={newTrx.phone} onChange={(e) => setNewTrx({...newTrx, phone: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gym-orange" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1 relative z-50">
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Select Plan</label>
                    <CustomSelect 
                      value={newTrx.plan}
                      onChange={(val) => setNewTrx({...newTrx, plan: val})}
                      options={[
                        { value: 'Basic Access', label: 'Basic Access' },
                        { value: 'Elite Membership', label: 'Elite Membership' },
                        { value: 'Pro Athlete', label: 'Pro Athlete' },
                        { value: 'Custom PT Package', label: 'Custom PT Package' }
                      ]}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Amount Paid ($)</label>
                    <input type="number" required min="1" step="0.01" value={newTrx.amount} onChange={(e) => setNewTrx({...newTrx, amount: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gym-orange" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1 relative z-40">
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Payment Method</label>
                    <CustomSelect 
                      value={newTrx.method}
                      onChange={(val) => handleMethodChange({ target: { value: val } })}
                      options={[
                        { value: 'Cash', label: 'Cash' },
                        { value: 'UPI / Bank Transfer', label: 'UPI / Bank Transfer' },
                        { value: 'POS Terminal', label: 'POS Terminal' }
                      ]}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                      {newTrx.method === 'Cash' ? 'System Reference' : 'Transaction ID / Ref'}
                    </label>
                    <input 
                      type="text" 
                      required={newTrx.method !== 'Cash'}
                      disabled={newTrx.method === 'Cash'}
                      value={newTrx.method === 'Cash' ? 'Auto-generated' : newTrx.externalId} 
                      onChange={(e) => setNewTrx({...newTrx, externalId: e.target.value})} 
                      className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gym-orange font-mono uppercase font-bold
                        ${newTrx.method === 'Cash' 
                          ? 'bg-white/5 border-white/5 text-gray-600' 
                          : 'bg-black/40 border-white/10 text-white shadow-inner shadow-gym-orange/10'}`} 
                    />
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5">
                  <button type="submit" className="w-full py-4 bg-gym-orange text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-gym-neon transition-all">
                    Process Transaction
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

export default Transactions;
