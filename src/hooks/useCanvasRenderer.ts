import { useState, useCallback } from 'react'
import { IDCardData } from '../types/idCard'
import { renderIDCard } from '../components/CardRenderer'

interface UseCanvasRendererReturn {
  cardDataUrl: string | null
  isRendering: boolean
  error: string | null
  generate: (data: IDCardData) => Promise<void>
  reset: () => void
}

export function useCanvasRenderer(): UseCanvasRendererReturn {
  const [cardDataUrl, setCardDataUrl] = useState<string | null>(null)
  const [isRendering, setIsRendering] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generate = useCallback(async (data: IDCardData) => {
    setIsRendering(true)
    setError(null)
    try {
      const dataUrl = await renderIDCard(data)
      setCardDataUrl(dataUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Rendering failed')
    } finally {
      setIsRendering(false)
    }
  }, [])

  const reset = useCallback(() => {
    setCardDataUrl(null)
    setError(null)
  }, [])

  return { cardDataUrl, isRendering, error, generate, reset }
}
