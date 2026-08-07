import { useState, useEffect } from 'react'

export interface ScrollProgress {
  progress: number // 0 to 1
  scrollY: number
  isScrolled: boolean
}

/**
 * Custom hook to track window scroll progress percentage and scroll position.
 */
export function useScrollProgress(threshold: number = 20): ScrollProgress {
  const [scrollState, setScrollState] = useState<ScrollProgress>({
    progress: 0,
    scrollY: 0,
    isScrolled: false,
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const currentProgress = scrollHeight > 0 ? Math.min(Math.max(currentScrollY / scrollHeight, 0), 1) : 0

      setScrollState({
        progress: currentProgress,
        scrollY: currentScrollY,
        isScrolled: currentScrollY > threshold,
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return scrollState
}
