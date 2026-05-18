import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Dumbbell, Plus, X, Edit2, Trash2, Clock, Flame } from 'lucide-react';
import CustomSelect from '../components/CustomSelect';
import { globalExercises } from '../data/dummyData';

const initialWorkouts = [
  { 
    id: 'w1', 
    name: 'Chest & Triceps Power', 
    target: 'Chest & Triceps', 
    duration: '75 min', 
    level: 'Intermediate',
    blocks: [
      { exerciseId: 'ex-1', sets: '4', reps: '8-10', rest: '90s' },
      { exerciseId: 'ex-2', sets: '3', reps: '12-15', rest: '60s' }
    ]
  }
];

const Workouts = () => {
  const [workouts, setWorkouts] = useState(initialWorkouts);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentWorkout, setCurrentWorkout] = useState({ 
    name: '', target: '', duration: '', level: 'Beginner', blocks: [] 
  });

  const filteredWorkouts = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return workouts.filter(w => 
      w.name.toLowerCase().includes(term) || 
      w.target.toLowerCase().includes(term) ||
      w.level.toLowerCase().includes(term)
    );
  }, [workouts, searchTerm]);

  const handleSaveWorkout = (e) => {
    e.preventDefault();
    if(currentWorkout.blocks.length === 0) {
      alert("Please add at least one exercise to the workout.");
      return;
    }

    if(currentWorkout.id) {
      setWorkouts(workouts.map(w => w.id === currentWorkout.id ? currentWorkout : w));
    } else {
      setWorkouts([...workouts, { ...currentWorkout, id: `w${Date.now()}` }]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if(window.confirm("Remove this workout routine?")) {
      setWorkouts(workouts.filter(w => w.id !== id));
    }
  };

  const handleAddBlock = () => {
    setCurrentWorkout({
      ...currentWorkout,
      blocks: [...currentWorkout.blocks, { exerciseId: '', sets: '', reps: '', rest: '' }]
    });
  };

  const handleUpdateBlock = (index, field, value) => {
    const newBlocks = [...currentWorkout.blocks];
    newBlocks[index][field] = value;
    setCurrentWorkout({ ...currentWorkout, blocks: newBlocks });
  };

  const handleRemoveBlock = (index) => {
    const newBlocks = [...currentWorkout.blocks];
    newBlocks.splice(index, 1);
    setCurrentWorkout({ ...currentWorkout, blocks: newBlocks });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-black text-white uppercase italic">Workout Library</h1>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-1">Manage platform routines and exercises</p>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative group flex-grow md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gym-orange transition-colors" size={16} />
            <input 
              type="text"
              placeholder="Search routines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white text-xs font-bold focus:outline-none focus:border-gym-orange/50 transition-colors"
            />
          </div>
          <button onClick={() => { setCurrentWorkout({ name: '', target: '', duration: '', level: 'Beginner', blocks: [] }); setIsModalOpen(true); }} className="bg-gym-orange text-white px-6 py-2.5 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-gym-neon transition-colors shadow-lg shadow-gym-orange/20 flex items-center gap-2 whitespace-nowrap">
            <Plus size={16} /> New Routine
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkouts.map((workout) => (
          <div key={workout.id} className="glassmorphism p-6 rounded-2xl border border-white/5 hover:border-gym-orange/30 transition-all group relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-full bg-gym-orange/5 -skew-x-12 translate-x-1/2 group-hover:bg-gym-orange/10 transition-all" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-gym-orange text-white flex items-center justify-center shadow-lg shadow-gym-orange/20">
                  <Dumbbell size={20} />
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setCurrentWorkout({...workout, blocks: workout.blocks || []}); setIsModalOpen(true); }} className="p-2 text-gray-500 hover:text-white transition-colors"><Edit2 size={16} /></button>
                  <button onClick={() => handleDelete(workout.id)} className="p-2 text-gray-500 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                </div>
              </div>
              
              <h3 className="text-xl font-black text-white uppercase mb-1">{workout.name}</h3>
              <p className="text-gym-orange text-xs font-bold uppercase tracking-widest italic mb-4">{workout.target}</p>

              <div className="space-y-2 mb-6">
                {(workout.blocks || []).map((block, idx) => {
                  const ex = globalExercises.find(e => e.id === block.exerciseId);
                  return (
                    <div key={idx} className="flex justify-between items-center bg-black/40 px-3 py-2 rounded-lg text-xs font-bold">
                      <span className="text-white truncate max-w-[50%]">{ex ? ex.name : 'Unknown Exercise'}</span>
                      <span className="text-gray-400">{block.sets}x{block.reps} • <span className="text-gym-orange">{block.rest}</span></span>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center gap-6 pt-4 border-t border-white/5">
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock size={16} className="text-gym-orange/50" />
                  <span className="text-xs font-bold uppercase tracking-tighter">{workout.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Flame size={16} className="text-gym-orange/50" />
                  <span className="text-xs font-bold uppercase tracking-tighter">{workout.blocks.length} EXER</span>
                </div>
                <div className="ml-auto bg-white/10 px-2 py-1 rounded text-[10px] font-black uppercase text-white">
                  {workout.level}
                </div>
              </div>
            </div>
          </div>
        ))}
        {filteredWorkouts.length === 0 && (
          <div className="col-span-full p-8 text-center text-gray-500 font-bold uppercase tracking-widest text-xs">No workout routines found.</div>
        )}
      </div>

      {/* Create/Edit Workout Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-gym-darker/90 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-2xl glassmorphism rounded-3xl border border-white/10 shadow-2xl p-8 overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gym-orange" />
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-white uppercase">{currentWorkout.id ? 'Edit Routine' : 'Create Routine'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white"><X size={20} /></button>
              </div>

              <form onSubmit={handleSaveWorkout} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Routine Name</label>
                    <input type="text" required value={currentWorkout.name} onChange={(e) => setCurrentWorkout({...currentWorkout, name: e.target.value})} placeholder="e.g. Chest Power" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gym-orange" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Target Muscle</label>
                    <input type="text" required value={currentWorkout.target} onChange={(e) => setCurrentWorkout({...currentWorkout, target: e.target.value})} placeholder="e.g. Chest" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gym-orange" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Est. Duration</label>
                    <input type="text" required value={currentWorkout.duration} onChange={(e) => setCurrentWorkout({...currentWorkout, duration: e.target.value})} placeholder="e.g. 75 min" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gym-orange" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Difficulty Level</label>
                    <CustomSelect 
                      value={currentWorkout.level}
                      onChange={(val) => setCurrentWorkout({...currentWorkout, level: val})}
                      options={[
                        { value: 'Beginner', label: 'Beginner' },
                        { value: 'Intermediate', label: 'Intermediate' },
                        { value: 'Advanced', label: 'Advanced' }
                      ]}
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-white font-black uppercase text-sm">Workout Exercises</h4>
                    <button type="button" onClick={handleAddBlock} className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-1">
                      <Plus size={14} /> Add Exercise
                    </button>
                  </div>

                  {currentWorkout.blocks.length === 0 && (
                    <div className="text-center p-6 border border-dashed border-white/10 rounded-xl text-gray-500 text-xs font-bold uppercase tracking-widest">
                      No exercises added yet. Click "Add Exercise" above.
                    </div>
                  )}

                  {currentWorkout.blocks.map((block, idx) => (
                    <div key={idx} className="bg-black/40 border border-white/10 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-end">
                      <div className="flex-grow w-full space-y-1 relative z-50">
                        <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Select Exercise</label>
                        <CustomSelect 
                          searchable={true}
                          value={block.exerciseId}
                          onChange={(val) => handleUpdateBlock(idx, 'exerciseId', val)}
                          options={globalExercises.map(ex => ({ value: ex.id, label: `${ex.name} (${ex.target})` }))}
                        />
                      </div>
                      
                      <div className="w-full md:w-24 space-y-1">
                        <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Sets</label>
                        <input type="text" required value={block.sets} onChange={(e) => handleUpdateBlock(idx, 'sets', e.target.value)} placeholder="e.g. 4" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-gym-orange text-center" />
                      </div>
                      
                      <div className="w-full md:w-24 space-y-1">
                        <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Reps</label>
                        <input type="text" required value={block.reps} onChange={(e) => handleUpdateBlock(idx, 'reps', e.target.value)} placeholder="e.g. 10-12" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-gym-orange text-center" />
                      </div>

                      <div className="w-full md:w-28 space-y-1">
                        <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Rest Time</label>
                        <input type="text" required value={block.rest} onChange={(e) => handleUpdateBlock(idx, 'rest', e.target.value)} placeholder="e.g. 90s" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-gym-orange text-center" />
                      </div>

                      <button type="button" onClick={() => handleRemoveBlock(idx)} className="p-3 text-gray-500 hover:text-red-500 bg-white/5 hover:bg-white/10 rounded-lg transition-colors mb-px">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-4 mt-4 border-t border-white/5">
                  <button type="submit" className="w-full py-4 bg-gym-orange text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-gym-neon transition-all">
                    {currentWorkout.id ? 'Save Changes' : 'Create Routine'}
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

export default Workouts;
