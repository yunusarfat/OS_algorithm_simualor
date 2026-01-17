import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, RoundedBox } from '@react-three/drei';

function ProcessBlock({ position, color, pid, width }) {
  const mesh = useRef();
  
  return (
    <group position={position}>
      <RoundedBox args={[width, 1, 1]} radius={0.1} smoothness={4}>
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
      </RoundedBox>
      <Text position={[0, 0, 0.6]} fontSize={0.4} color="white">
        {pid}
      </Text>
    </group>
  );
}

const Scene = ({ data }) => {
  // data: array of {pid, startTime, endTime, color}
  return (
    <div className="h-[400px] w-full bg-slate-900 rounded-xl overflow-hidden shadow-2xl">
      <Canvas camera={{ position: [5, 5, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <gridHelper args={[20, 20, 0xffffff, 0x333333]} rotation={[Math.PI / 2, 0, 0]} />
        
        {data?.map((p, index) => (
          <ProcessBlock 
            key={index}
            // Position blocks along the X-axis based on start time
            position={[(p.start_time + p.burst / 2) - 5, 0, 0]} 
            width={p.burst}
            color={p.color || "#3b82f6"}
            pid={p.pid}
          />
        ))}
        
        <OrbitControls enablePan={true} zoomSpeed={0.5} />
      </Canvas>
    </div>
  );
};

export default Scene;