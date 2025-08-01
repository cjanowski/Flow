'use client'

import { motion } from 'framer-motion'
import PomodoroTimer from './PomodoroTimer'
import TodoList from './TodoList'

export default function ProductivityPanel() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 left-6 right-6 flex gap-4 justify-center"
    >
      <PomodoroTimer />
      <TodoList />
    </motion.div>
  )
}
