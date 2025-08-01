'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface PromptInputProps {
  onGenerate: (prompt: string) => void
  isGenerating: boolean
}

export default function PromptInput({ onGenerate, isGenerating }: PromptInputProps) {
  const [prompt, setPrompt] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (prompt.trim() && !isGenerating) {
      onGenerate(prompt.trim())
    }
  }

  const examplePrompts = [
    "Rainy lofi with distant thunder",
    "Cyberpunk coffee shop ambience", 
    "Forest sounds with gentle piano",
    "Retro 8-bit focus music"
  ]

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="glass-effect p-8">
        <h2 className="text-xl font-semibold mb-6 text-center">
          Describe your perfect coding atmosphere
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Calm rain on a window with soft lofi beats..."
            className="w-full h-24 bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-flow-accent transition-colors"
            disabled={isGenerating}
          />
          
          <button
            type="submit"
            disabled={!prompt.trim() || isGenerating}
            className="w-full bg-flow-accent hover:bg-flow-accent/80 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            {isGenerating ? 'Generating Your Flow...' : 'Generate Flow'}
          </button>
        </form>

        <div className="mt-6">
          <p className="text-sm text-gray-400 mb-3">Try these examples:</p>
          <div className="flex flex-wrap gap-2">
            {examplePrompts.map((example, index) => (
              <button
                key={index}
                onClick={() => setPrompt(example)}
                className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-1 transition-colors"
                disabled={isGenerating}
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}