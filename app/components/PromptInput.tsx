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

  const presetPrompts = [
    'Rainy day coding session',
    'Cyberpunk neon vibes',
    'Forest morning ambience',
    'Retro 8-bit soundscape',
    'Deep focus meditation'
  ]

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-effect p-8 rounded-lg max-w-md w-full"
    >
      <h2 className="text-2xl font-bold text-center mb-6">
        Generate Your Flow
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
            Describe your ideal coding atmosphere
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Peaceful rain sounds with soft piano for deep focus..."
            className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 resize-none"
            rows={3}
            disabled={isGenerating}
          />
        </div>
        
        <button
          type="submit"
          disabled={!prompt.trim() || isGenerating}
          className="w-full bg-flow-accent hover:bg-flow-accent/80 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-medium transition-colors"
        >
          {isGenerating ? 'Generating Flow...' : 'Generate Flow'}
        </button>
      </form>

      <div className="mt-6">
        <p className="text-sm text-gray-400 mb-3">Or try a preset:</p>
        <div className="space-y-2">
          {presetPrompts.map((preset, index) => (
            <button
              key={index}
              onClick={() => setPrompt(preset)}
              disabled={isGenerating}
              className="w-full text-left p-2 text-sm bg-white/5 hover:bg-white/10 disabled:hover:bg-white/5 rounded border border-white/10 transition-colors"
            >
              {preset}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
