'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import the entire Three.js component to prevent SSR issues
const ThreeJSBackground = dynamic(() => import('./ThreeJSBackground'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 gradient-bg" />
})



interface DynamicBackgroundProps {
  prompt: string
}

export default function DynamicBackground({ prompt }: DynamicBackgroundProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="absolute inset-0 gradient-bg" />
  }

  return (
    <div className="absolute inset-0 gradient-bg">
      <ThreeJSBackground prompt={prompt} />
    </div>
  )
}
