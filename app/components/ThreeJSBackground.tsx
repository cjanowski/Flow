'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function AnimatedPoints({ prompt }: { prompt: string }) {
  const ref = useRef<THREE.Points>(null!)
  
  // Create geometry with random points
  const particleCount = 5000
  const positions = new Float32Array(particleCount * 3)
  
  for (let i = 0; i < particleCount; i++) {
    const radius = Math.random() * 2
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(Math.random() * 2 - 1)
    
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = radius * Math.cos(phi)
  }

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
      ref.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  // Change color based on prompt mood
  const getColorFromPrompt = (prompt: string) => {
    if (prompt.includes('rain') || prompt.includes('calm')) return '#4f46e5'
    if (prompt.includes('cyber') || prompt.includes('neon')) return '#06ffa5'
    if (prompt.includes('forest') || prompt.includes('nature')) return '#10b981'
    if (prompt.includes('retro') || prompt.includes('8-bit')) return '#f59e0b'
    return '#6366f1'
  }

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        transparent
        color={getColorFromPrompt(prompt)}
        size={0.002}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  )
}

interface ThreeJSBackgroundProps {
  prompt: string
}

export default function ThreeJSBackground({ prompt }: ThreeJSBackgroundProps) {
  return (
    <Canvas camera={{ position: [0, 0, 1] }}>
      <AnimatedPoints prompt={prompt} />
    </Canvas>
  )
}
