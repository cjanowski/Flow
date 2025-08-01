import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const prompt = searchParams.get('prompt')
  
  // Return a mock audio file URL for development
  // In production, this would return the actual generated audio
  return NextResponse.redirect('https://www.soundjay.com/misc/sounds/bell-ringing-05.wav')
}