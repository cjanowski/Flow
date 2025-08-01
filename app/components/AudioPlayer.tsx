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
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', () => setIsPlaying(false))

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', () => setIsPlaying(false))
    }
  }, [audioUrl])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-effect p-6 rounded-lg max-w-md w-full ${isFlowMode ? 'fixed bottom-4 right-4 max-w-xs' : ''}`}
    >
      <audio ref={audioRef} src={audioUrl} />
      
      {!isFlowMode && (
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold mb-2">Now Playing</h3>
          <p className="text-sm text-gray-300 truncate">{prompt}</p>
        </div>
      )}

      <div className="flex items-center gap-4 mb-4">
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

        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span>{formatTime(currentTime)}</span>
            <div className="flex-1 bg-gray-600 rounded-full h-1">
              <div 
                className="bg-flow-accent h-1 rounded-full transition-all"
                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              />
            </div>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.824L4.5 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.5l3.883-3.824z" clipRule="evenodd" />
        </svg>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="flex-1"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={onNewFlow}
          className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded transition-colors"
        >
          New Flow
        </button>
        <button
          onClick={onToggleFlowMode}
          className="bg-flow-accent hover:bg-flow-accent/80 text-white py-2 px-4 rounded transition-colors"
        >
          {isFlowMode ? 'Exit Flow' : 'Flow Mode'}
        </button>
      </div>
    </motion.div>
  )
}
