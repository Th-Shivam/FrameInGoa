import { useState, useEffect } from 'react'

export interface MousePosition {
  x: number
  y: number
  elementX: number
  elementY: number
}

/**
 * Custom hook to track global mouse position or position relative to an element.
 */
export function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    elementX: 0,
    elementY: 0,
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
        elementX: event.pageX,
        elementY: event.pageY,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return mousePosition
}
