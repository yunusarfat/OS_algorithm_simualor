// export const BASE_URL = "http://127.0.0.1:8000/api";
export const ALGORITHMS = {
    FCFS: { name: 'First Come First Serve', endpoint: '/fcfs/simulate/' },
    SJF: { name: 'Shortest Job First', endpoint: '/sjf/simulate/' },
    SRTF: { name: 'SRTF (Preemptive SJF)', endpoint: '/srtf/simulate/' },
    RR: { name: 'Round Robin', endpoint: '/roundrobin/simulate/', hasQuantum: true },
    PRIORITY: { name: 'Priority Scheduling', endpoint: '/priority/simulate/', hasPriority: true },
   
  };
  
  export const BASE_URL = 'https://os-simulator-jnci.onrender.com/api';