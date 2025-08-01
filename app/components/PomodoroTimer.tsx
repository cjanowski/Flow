'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface PomodoroTimerProps {
  onSessionComplete?: () => void
}

export default function PomodoroTimer({ onSessionComplete }: PomodoroTimerProps) {
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [sessions, setSessions] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      // Session complete
      if (isBreak) {
        setTimeLeft(25 * 60) // Back to work
        setIsBreak(false)
      } else {
        setSessions(prev => prev + 1)
        setTimeLeft(5 * 60) // 5 minute break
        setIsBreak(true)
      }
      setIsActive(false)
      onSessionComplete?.()
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft, isBreak, onSessionComplete])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const resetTimer = () => {
    setIsActive(false)
    setTimeLeft(25 * 60)
    setIsBreak(false)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-effect p-4 rounded-lg"
    >
      <div className="text-center">
        <h3 className="text-sm font-medium text-gray-300 mb-2">
          {isBreak ? 'Break Time' : 'Focus Session'}
        </h3>
        
        <div className="text-2xl font-mono font-bold mb-4">
          {formatTime(timeLeft)}
        </div>
        
        <div className="flex gap-2 justify-center mb-3">
          <button
            onClick={() => setIsActive(!isActive)}
            className="bg-flow-accent hover:bg-flow-accent/80 text-white px-4 py-2 rounded text-sm transition-colors"
          >
            {isActive ? 'Pause' : 'Start'}
          </button>
          
          <button
            onClick={resetTimer}
            className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded text-sm transition-colors"
          >
            Reset
          </button>
        </div>
        
        <div className="text-xs text-gray-400">
          Sessions completed: {sessions}
        </div>
      </div>
    </motion.div>
  )
}