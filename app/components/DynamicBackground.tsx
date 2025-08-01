'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// Try the new Three.js implementation
const ThreeJSBackgroundV2 = dynamic(() => import('./ThreeJSBackgroundV2'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 gradient-bg" />
})



interface DynamicBackgroundProps {
  prompt: string
}

export default function DynamicBackground({ prompt }: DynamicBackgroundProps) {
  const [mounted, setMounted] = useState(false)
  const [useThreeJS, setUseThreeJS] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Try to enable Three.js after a short delay
    const timer = setTimeout(() => {
      setUseThreeJS(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  if (!mounted) {
    return <div className="absolute inset-0 gradient-bg" />
  }

  // Create a simple animated background based on prompt
  const getBackgroundStyle = (prompt: string) => {
    if (prompt.includes('rain') || prompt.includes('calm')) {
      return 'bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900'
    }
    if (prompt.includes('cyber') || prompt.includes('neon')) {
      return 'bg-gradient-to-br from-purple-900 via-pink-800 to-cyan-900'
    }
    if (prompt.includes('forest') || prompt.includes('nature')) {
      return 'bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900'
    }
    if (prompt.includes('retro') || prompt.includes('8-bit')) {
      return 'bg-gradient-to-br from-orange-900 via-yellow-800 to-red-900'
    }
    return 'gradient-bg'
  }

  return (
    <div className={`absolute inset-0 ${getBackgroundStyle(prompt)}`}>
      {useThreeJS ? (
        <ThreeJSBackgroundV2 prompt={prompt} />
      ) : (
        /* Animated particles using CSS */
        <div className="absolute inset-0 opacity-30">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
