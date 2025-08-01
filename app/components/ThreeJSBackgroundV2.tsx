'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function AnimatedPoints({ prompt }: { prompt: string }) {
  const meshRef = useRef<THREE.Points>(null!)
  
  // Memoize the geometry to prevent recreation on every render
  const { positions, colors } = useMemo(() => {
    const particleCount = 2000 // Reduced for better performance
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
      // Create a more spread out distribution
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
      
      // Set colors based on prompt
      const color = getColorFromPrompt(prompt)
      const threeColor = new THREE.Color(color)
      colors[i * 3] = threeColor.r
      colors[i * 3 + 1] = threeColor.g
      colors[i * 3 + 2] = threeColor.b
    }
    
    return { positions, colors }
  }, [prompt])

  // Change color based on prompt mood
  const getColorFromPrompt = (prompt: string) => {
    if (prompt.includes('rain') || prompt.includes('calm')) return '#4f46e5'
    if (prompt.includes('cyber') || prompt.includes('neon')) return '#06ffa5'
    if (prompt.includes('forest') || prompt.includes('nature')) return '#10b981'
    if (prompt.includes('retro') || prompt.includes('8-bit')) return '#f59e0b'
    return '#6366f1'
  }

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation={true}
      />
    </points>
  )
}

interface ThreeJSBackgroundV2Props {
  prompt: string
}

export default function ThreeJSBackgroundV2({ prompt }: ThreeJSBackgroundV2Props) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ background: 'transparent' }}
      dpr={[1, 2]} // Limit device pixel ratio for performance
    >
      <AnimatedPoints prompt={prompt} />
    </Canvas>
  )
}
