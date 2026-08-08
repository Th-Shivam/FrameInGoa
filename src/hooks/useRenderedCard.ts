import { useCallback, useEffect, useState } from 'react'
import { getBuilderPass, getGeneratedCard, saveGeneratedCard } from '@/lib/builderPassStorage'
import { renderBuilderPass } from '@/lib/canvasRenderer'

export function useRenderedCard(id: string) {
  const [dataUrl, setDataUrl] = useState<string | null>(null)
  const [error, setError] = useState('')

  const retry = useCallback(() => {
    let cancelled = false
    setError('')
    setDataUrl(null)

    async function load() {
      try {
        const cached = await getGeneratedCard(id)
        if (cancelled) return
        if (cached) {
          setDataUrl(cached)
          return
        }

        const pass = await getBuilderPass(id)
        if (!pass) {
          if (!cancelled) setError('This ID card could not be found.')
          return
        }

        const canvas = document.createElement('canvas')
        await renderBuilderPass(canvas, pass)
        const url = canvas.toDataURL('image/png')
        if (cancelled) return
        setDataUrl(url)
        void saveGeneratedCard(id, url)
      } catch (loadError) {
        console.error('[ID] Failed to load rendered card', loadError)
        if (!cancelled) setError('Something went wrong while loading your ID card. Please try again.')
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [id])

  useEffect(() => retry(), [retry])

  return { dataUrl, error, retry }
}
