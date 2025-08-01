'use client'

import { useState } from 'react'
import PromptInput from './components/PromptInput'
import DynamicBackground from './components/DynamicBackground'
import AudioPlayer from './components/AudioPlayer'
import ProductivityPanel from './components/ProductivityPanel'

export default function Home() {
  const [currentPrompt, setCurrentPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isFlowMode, setIsFlowMode] = useState(false)

  const handleGenerateFlow = async (prompt: string) => {
    setCurrentPrompt(prompt)
    setIsGenerating(true)
    
    try {
      const response = await fetch('/api/generate-audio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to generate audio')
      }
      
      const data = await response.json()
      setAudioUrl(data.audioUrl)
    } catch (error) {
      console.error('Failed to generate flow:', error)
      // Show error to user
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <main className="relative h-screen w-full overflow-hidden">
      <DynamicBackground prompt={currentPrompt} />
      
      <div className="relative z-10 h-full flex flex-col">
        {!isFlowMode && (
          <header className="p-6">
            <h1 className="text-3xl font-bold text-center mb-8">
              Code<span className="text-flow-accent">Flow</span>
            </h1>
          </header>
        )}

        <div className="flex-1 flex items-center justify-center px-6">
          {!audioUrl ? (
            <PromptInput 
              onGenerate={handleGenerateFlow}
              isGenerating={isGenerating}
            />
          ) : (
            <AudioPlayer 
              audioUrl={audioUrl}
              prompt={currentPrompt}
              onNewFlow={() => setAudioUrl(null)}
              isFlowMode={isFlowMode}
              onToggleFlowMode={() => setIsFlowMode(!isFlowMode)}
            />
          )}
        </div>

        {!isFlowMode && audioUrl && (
          <ProductivityPanel />
        )}
      </div>
    </main>
  )
}
