'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface AudioPlayerProps {
  audioUrl: string
  prompt: string
  onNewFlow: () => void
  isFlowMode: boolean
  onToggleFlowMode: () => void
}

export default function AudioPlayer({ 
  audioUrl, 
  prompt, 
  onNewFlow, 
  isFlowMode, 
  onToggleFlowMode 
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.7)
  const [showMixer, setShowMixer] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Audio mixing controls based on prompt type
  const [mixerSettings, setMixerSettings] = useState({
    ambient: 0.8,
    rhythm: 0.6,
    effects: 0.4
  })

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const getMixerLabels = (prompt: string) => {
    if (prompt.includes('rain') || prompt.includes('storm')) {
      return { ambient: 'Rain', rhythm: 'Thunder', effects: 'Wind' }
    }
    if (prompt.includes('coffee') || prompt.includes('cafe')) {
      return { ambient: 'Chatter', rhythm: 'Music', effects: 'Machines' }
    }
    if (prompt.includes('forest') || prompt.includes('nature')) {
      return { ambient: 'Birds', rhythm: 'Water', effects: 'Wind' }
    }
    return { ambient: 'Ambient', rhythm: 'Rhythm', effects: 'Effects' }
  }

  const labels = getMixerLabels(prompt)

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md mx-auto"
    >
      <audio
        ref={audioRef}
        src={audioUrl}
        loop
        onLoadedData={() => setIsPlaying(true)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        autoPlay
      />

      <div className="glass-effect p-6 rounded-lg">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold mb-2">Now Playing</h3>
          <p className="text-sm text-gray-300 italic">"{prompt}"</p>
        </div>

        {/* Main Controls */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <button
            onClick={togglePlay}
            className="bg-flow-accent hover:bg-flow-accent/80 text-white p-3 rounded-full transition-colors"
          >
            {isPlaying ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          <button
            onClick={() => setShowMixer(!showMixer)}
            className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded transition-colors"
          >
            Mix
          </button>

          <button
            onClick={onToggleFlowMode}
            className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded transition-colors"
          >
            {isFlowMode ? 'Exit Flow' : 'Flow Mode'}
          </button>
        </div>

        {/* Volume Control */}
        <div className="mb-4">
          <label className="block text-sm text-gray-300 mb-2">Volume</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-full accent-flow-accent"
          />
        </div>

        {/* Mixer Controls */}
        {showMixer && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/10 pt-4 space-y-3"
          >
            {Object.entries(mixerSettings).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm text-gray-300 mb-1">
                  {labels[key as keyof typeof labels]}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={value}
                  onChange={(e) => setMixerSettings(prev => ({
                    ...prev,
                    [key]: parseFloat(e.target.value)
                  }))}
                  className="w-full accent-flow-accent"
                />
              </div>
            ))}
          </motion.div>
        )}

        <button
          onClick={onNewFlow}
          className="w-full mt-4 bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded transition-colors"
        >
          Generate New Flow
        </button>
      </div>
    </motion.div>
  )
}