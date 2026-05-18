import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, X, Edit2, Trash2, Video, Target, Activity } from 'lucide-react';
import { globalExercises } from '../data/dummyData';

const Exercises = () => {
  // Use the shared data array to initialize state
  const [exercises, setExercises] = useState(globalExercises);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentExercise, setCurrentExercise] = useState({ name: '', target: '', video: '', instructions: [''] });

  const filteredExercises = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return exercises.filter(e => 
      e.name.toLowerCase().includes(term) || 
      e.target.toLowerCase().includes(term)
    );
  }, [exercises, searchTerm]);

  const handleSaveExercise = (e) => {
    e.preventDefault();
    if(currentExercise.id) {
      const updated = exercises.map(ex => ex.id === currentExercise.id ? currentExercise : ex);
      setExercises(updated);
      
      // Update global store
      const idx = globalExercises.findIndex(ex => ex.id === currentExercise.id);
      if(idx !== -1) globalExercises[idx] = currentExercise;

    } else {
      const newEx = { ...currentExercise, id: `ex-${Date.now()}` };
      setExercises([...exercises, newEx]);
      globalExercises.push(newEx); // Update global store
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if(window.confirm("Remove this exercise from the master library? This may affect existing workouts.")) {
      setExercises(exercises.filter(ex => ex.id !== id));
      
      // Update global store
      const idx = globalExercises.findIndex(ex => ex.id === id);
      if(idx !== -1) globalExercises.splice(idx, 1);
    }
  };

  const handleUpdateInstruction = (index, value) => {
    const newInstructions = [...currentExercise.instructions];
    newInstructions[index] = value;
    setCurrentExercise({ ...currentExercise, instructions: newInstructions });
  };

  const handleAddInstruction = () => {
    setCurrentExercise({ ...currentExercise, instructions: [...currentExercise.instructions, ''] });
  };

  const handleRemoveInstruction = (index) => {
    const newInstructions = [...currentExercise.instructions];
    newInstructions.splice(index, 1);
    setCurrentExercise({ ...currentExercise, instructions: newInstructions });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-black text-white uppercase italic">Exercise Master Library</h1>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-1">Manage individual exercises, instructions, and form videos</p>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative group flex-grow md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gym-orange transition-colors" size={16} />
            <input 
              type="text"
              placeholder="Search exercises or targets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white text-xs font-bold focus:outline-none focus:border-gym-orange/50 transition-colors"
            />
          </div>
          <button onClick={() => { setCurrentExercise({ name: '', target: '', video: '', instructions: '' }); setIsModalOpen(true); }} className="bg-gym-orange text-white px-6 py-2.5 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-gym-neon transition-colors shadow-lg shadow-gym-orange/20 flex items-center gap-2 whitespace-nowrap">
            <Plus size={16} /> Add Exercise
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredExercises.map((ex) => (
          <div key={ex.id} className="glassmorphism p-6 rounded-2xl border border-white/5 hover:border-gym-orange/30 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white border border-white/10">
                  <Activity size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white uppercase">{ex.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Target size={14} className="text-gym-orange" />
                    <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">{ex.target}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setCurrentExercise(ex); setIsModalOpen(true); }} className="p-2 text-gray-500 hover:text-white transition-colors"><Edit2 size={16} /></button>
                <button onClick={() => handleDelete(ex.id)} className="p-2 text-gray-500 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
              </div>
            </div>

            <div className="bg-black/40 rounded-xl p-4 border border-white/5 mb-4">
              <ul className="text-gray-400 text-sm leading-relaxed list-disc pl-4 space-y-1">
                {(Array.isArray(ex.instructions) ? ex.instructions : [ex.instructions]).map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>

            {ex.video && (
              <a href={ex.video} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-400 transition-colors">
                <Video size={16} /> View Form Video
              </a>
            )}
          </div>
        ))}
        {filteredExercises.length === 0 && (
          <div className="col-span-full p-8 text-center text-gray-500 font-bold uppercase tracking-widest text-xs">No exercises found.</div>
        )}
      </div>

      {/* Create/Edit Exercise Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-gym-darker/90 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-xl glassmorphism rounded-3xl border border-white/10 shadow-2xl p-8 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gym-orange" />
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-white uppercase flex items-center gap-2"><Activity size={20} className="text-gym-orange" /> {currentExercise.id ? 'Edit Exercise' : 'Add New Exercise'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white"><X size={20} /></button>
              </div>

              <form onSubmit={handleSaveExercise} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Exercise Name</label>
                    <input type="text" required value={currentExercise.name} onChange={(e) => setCurrentExercise({...currentExercise, name: e.target.value})} placeholder="e.g. Barbell Bench Press" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gym-orange" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Target Muscle</label>
                    <input type="text" required value={currentExercise.target} onChange={(e) => setCurrentExercise({...currentExercise, target: e.target.value})} placeholder="e.g. Chest" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gym-orange" />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">YouTube Video URL</label>
                  <div className="relative">
                    <Video className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input type="url" value={currentExercise.video} onChange={(e) => setCurrentExercise({...currentExercise, video: e.target.value})} placeholder="https://youtube.com/watch?v=..." className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white text-sm focus:outline-none focus:border-gym-orange" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">How to Perform (Instructions)</label>
                    <button type="button" onClick={handleAddInstruction} className="bg-white/10 hover:bg-white/20 text-white px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-1">
                      <Plus size={12} /> Add Point
                    </button>
                  </div>
                  {currentExercise.instructions.map((inst, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input type="text" required value={inst} onChange={(e) => handleUpdateInstruction(idx, e.target.value)} placeholder={`Step ${idx + 1}...`} className="flex-grow bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-gym-orange" />
                      {currentExercise.instructions.length > 1 && (
                        <button type="button" onClick={() => handleRemoveInstruction(idx)} className="p-2 text-gray-500 hover:text-red-500 bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="pt-4 mt-4 border-t border-white/5">
                  <button type="submit" className="w-full py-4 bg-gym-orange text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-gym-neon transition-all">
                    {currentExercise.id ? 'Save Changes' : 'Add to Library'}
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

export default Exercises;
