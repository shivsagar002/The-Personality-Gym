import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const CustomSelect = ({ value, onChange, options, placeholder = 'Select an option...', searchable = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef(null);
  
  const selectedOption = options.find(o => o.value === value);
  const filteredOptions = options.filter(o => o.label.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div 
        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm cursor-pointer flex justify-between items-center hover:border-gym-orange/50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedOption ? "text-white truncate" : "text-gray-500 truncate"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown size={16} className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      {isOpen && (
        <div className="absolute z-50 top-full left-0 w-full mt-2 bg-gym-darker border border-white/10 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.8)] max-h-60 overflow-y-auto custom-scrollbar">
          {searchable && (
            <div className="sticky top-0 bg-gym-darker p-2 border-b border-white/5 z-10">
              <input 
                type="text" 
                autoFocus
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-gym-orange"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          <div className="p-1">
            {filteredOptions.length > 0 ? filteredOptions.map(opt => (
              <div 
                key={opt.value} 
                className={`px-3 py-2.5 text-sm rounded-lg cursor-pointer transition-colors ${
                  opt.value === value 
                    ? 'bg-gym-orange text-white font-bold' 
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
                onClick={() => { onChange(opt.value); setIsOpen(false); setSearch(''); }}
              >
                {opt.label}
              </div>
            )) : (
              <div className="px-3 py-4 text-xs text-gray-500 text-center">No matches</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
