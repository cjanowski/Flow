'use client'

import PomodoroTimer from './PomodoroTimer'
import TodoList from './TodoList'

export default function ProductivityPanel() {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 w-80">
      <PomodoroTimer />
      <TodoList />
    </div>
  )
}