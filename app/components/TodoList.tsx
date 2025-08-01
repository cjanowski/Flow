'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false
      }])
      setNewTodo('')
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-effect p-4 rounded-lg w-80"
    >
      <h3 className="text-sm font-medium text-gray-300 mb-3">Session Tasks</h3>
      
      <form onSubmit={addTodo} className="mb-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a task..."
            className="flex-1 p-2 text-sm bg-white/10 border border-white/20 rounded text-white placeholder-gray-400"
          />
          <button
            type="submit"
            className="bg-flow-accent hover:bg-flow-accent/80 text-white px-3 py-2 rounded text-sm transition-colors"
          >
            Add
          </button>
        </div>
      </form>

      <div className="space-y-2 max-h-40 overflow-y-auto">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center gap-2 p-2 bg-white/5 rounded"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="rounded"
            />
            <span
              className={`flex-1 text-sm ${
                todo.completed ? 'line-through text-gray-400' : 'text-white'
              }`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-400 hover:text-red-300 text-sm"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {todos.length === 0 && (
        <p className="text-gray-400 text-sm text-center py-4">
          No tasks yet. Add one above!
        </p>
      )}
    </motion.div>
  )
}
