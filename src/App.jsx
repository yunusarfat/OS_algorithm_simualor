// import { Routes, Route } from "react-router-dom";
// import Navbar from "./components/common/Navbar";
// import Home from "./pages/Home";
// import Theory from "./pages/Theory";
// import Simulation from "./pages/Simulation";

// export default function App() {
//   return (
//     <div className="min-h-screen">
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/theory" element={<Theory />} />
//         <Route path="/simulate" element={<Simulation />} />
//       </Routes>
//     </div>
//   );
// }
import React, { useState } from 'react';
import axios from 'axios';
import { ALGORITHMS, BASE_URL } from './utils/constants';
import ProcessForm from './components/Forms/ProcessForm.jsx';
import Scene from './components/Simulations/Scene';
// import BankerForm from "./components/Forms/BankerForm";
// import FirstFitForm from "./components/Forms/FirstFitForm";


function App() {
  const [algoKey, setAlgoKey] = useState('FCFS');
  console.log("Selected algorithm:", algoKey, ALGORITHMS[algoKey]);

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSimulate = async (payload) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}${ALGORITHMS[algoKey].endpoint}`,
        payload
      );
  
      const algo = ALGORITHMS[algoKey];
  
      // 🎯 CPU Scheduling Algorithms (FCFS, SJF, SRTF, RR, PRIORITY)
      if (!algo.type) {
        const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];
  
        const formattedData = response.data.process_summary.map((step, i) => ({
          ...step,
          color: colors[i % colors.length]
        }));
  
        setResults(formattedData);
      }
  
      // 🏦 Banker’s Algorithm
      // else if (algo.type === "banker") {
      //   setResults({
      //     safe_sequence: response.data.safe_sequence,
      //     deadlocked: response.data.deadlocked
      //   });
      // }
  
      // // 🧠 First-Fit Memory Allocation
      // else if (algo.type === "memory") {
      //   setResults(response.data.allocation);
      // }
  
    } catch (error) {
      console.error(
        "Backend error:",
        error.response ? error.response.data : error.message
      );
      alert("Error connecting to backend");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <header className="max-w-6xl mx-auto mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          OS <span className="text-indigo-600">Scheduler</span> Visualizer
        </h1>
        <p className="text-slate-500 mt-2">Professional 3D Simulation for CPU Algorithms</p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar: Controls */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <label className="block text-sm font-bold text-slate-700 mb-2">Algorithm</label>
            <select 
              value={algoKey}
              onChange={(e) => setAlgoKey(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-md outline-none focus:ring-2 ring-indigo-500"
            >
              {Object.keys(ALGORITHMS).map(key => (
                <option key={key} value={key}>{ALGORITHMS[key].name}</option>
              ))}
            </select>
          </div>

          {ALGORITHMS[algoKey].type === "banker" && (
  <BankerForm onSimulate={handleSimulate} />
)}

{ALGORITHMS[algoKey].type === "memory" && (
  <FirstFitForm onSimulate={handleSimulate} />
)}

{!ALGORITHMS[algoKey].type && (
  <ProcessForm selectedAlgo={ALGORITHMS[algoKey]} onSimulate={handleSimulate} />
)}

        </div>

        {/* Content: 3D Visualization & Analytics */}
        <div className="lg:col-span-8 space-y-6">
          <div className="relative">
            {loading && (
              <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
            )}
            <Scene data={results} />
          </div>

          {/* Detailed Stats Table */}
          {results && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b">
                  <tr>
                    <th className="p-4 text-sm font-semibold text-slate-600">Process</th>
                    <th className="p-4 text-sm font-semibold text-slate-600">Start Time</th>
                    <th className="p-4 text-sm font-semibold text-slate-600">End Time</th>
                    <th className="p-4 text-sm font-semibold text-slate-600">Burst</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-indigo-600">{r.pid}</td>
                      <td className="p-4">{r.start_time}</td>
                      <td className="p-4">{r.end_time}</td>
                      <td className="p-4">{r.burst}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;