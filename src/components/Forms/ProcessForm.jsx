

import React, { useState } from 'react';
import { Plus, Play, Trash2 } from 'lucide-react';

const ProcessForm = ({ selectedAlgo, onSimulate }) => {
  const [processes, setProcesses] = useState([{ pid: 'P1', arrival: 0, burst: 5, priority: 1 }]);
  const [quantum, setQuantum] = useState(2);

  const addProcess = () => {
    const newId = `P${processes.length + 1}`;
    setProcesses([...processes, { pid: newId, arrival: 0, burst: 5, priority: 1 }]);
  };

  const removeProcess = (index) => {
    setProcesses(processes.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updated = [...processes];
    
    // 1. If it's the PID (text), just update it
    if (field === 'pid') {
      updated[index][field] = value;
    } else {
      // 2. For numbers, check if the input is empty
      // If empty, store as an empty string so the user can type
      // If not empty, parse it to an integer
      updated[index][field] = value === '' ? '' : parseInt(value);
    }
    
    setProcesses(updated);
  };
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
      <h2 className="text-xl font-bold mb-4 text-slate-800">Process Configuration</h2>
      
      {selectedAlgo.hasQuantum && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <label className="block text-sm font-semibold">Time Quantum</label>
          <input 
            type="number" 
            className="w-full mt-1 p-2 border rounded"
            value={quantum}
            onChange={(e) => setQuantum(parseInt(e.target.value))}
          />
        </div>
      )}

      <div className="space-y-3">
        {processes.map((p, i) => (
          <div key={i} className="flex gap-2 items-end animate-in fade-in slide-in-from-left-2">
            <div className="flex-1">
              <label className="text-xs text-slate-500">PID</label>
              <input value={p.pid} onChange={(e)=>handleChange(i, 'pid', e.target.value)} className="w-full p-2 border rounded" />
            </div>
            <div className="flex-1">
              <label className="text-xs text-slate-500">Arrival</label>
              <input type="number" value={p.arrival} onChange={(e)=>handleChange(i, 'arrival', e.target.value)} className="w-full p-2 border rounded" />
            </div>
            <div className="flex-1">
              <label className="text-xs text-slate-500">Burst</label>
              <input type="number" value={p.burst} onChange={(e)=>handleChange(i, 'burst', e.target.value)} className="w-full p-2 border rounded" />
            </div>
            {selectedAlgo.hasPriority && (
              <div className="flex-1">
                <label className="text-xs text-slate-500">Priority</label>
                <input type="number" value={p.priority} onChange={(e)=>handleChange(i, 'priority', e.target.value)} className="w-full p-2 border rounded" />
              </div>
            )}
            <button onClick={() => removeProcess(i)} className="p-2 text-red-500 hover:bg-red-50 rounded">
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        <button onClick={addProcess} className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg font-medium">
          <Plus size={18} /> Add Process
        </button>
        <button 
          onClick={() => onSimulate({ processes, quantum })}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold transition-all"
        >
          <Play size={18} /> Run Simulation
        </button>
      </div>
    </div>
  );
};

export default ProcessForm;