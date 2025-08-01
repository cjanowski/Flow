'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Todo {
  id: string
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
        id: Date.now().toString(),
        text: newTodo.trim(),
        completed: false
      }])
      setNewTodo('')
    }
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-effect p-4 rounded-lg"
    >
      <h3 className="text-sm font-medium text-gray-300 mb-3">
        Session Goals
      </h3>
      
      <form onSubmit={addTodo} className="mb-3">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a task..."
          className="w-full bg-white/5 border border-white/20 rounded px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-flow-accent transition-colors"
        />
      </form>
      
      <div className="space-y-2 max-h-40 overflow-y-auto">
        <AnimatePresence>
          {todos.map((todo) => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center gap-2 group"
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                  todo.completed 
                    ? 'bg-flow-accent border-flow-accent' 
                    : 'border-gray-400 hover:border-flow-accent'
                }`}
              >
                {todo.completed && (
                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
              
              <span className={`flex-1 text-sm ${
                todo.completed ? 'line-through text-gray-500' : 'text-white'
              }`}>
                {todo.text}
              </span>
              
              <button
                onClick={() => deleteTodo(todo.id)}
                className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-all"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {todos.length === 0 && (
        <p className="text-xs text-gray-500 text-center py-4">
          No tasks yet. Add one above!
        </p>
      )}
    </motion.div>
  )
}