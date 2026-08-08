import type { RefObject } from 'react'
import type { BuilderPassData } from '@/types/builderPass'

export function CanvasGenerator({
  pass,
  canvasRef,
  className = '',
}: {
  pass: BuilderPassData
  canvasRef: RefObject<HTMLCanvasElement | null>
  className?: string
}) {
  return <canvas ref={canvasRef} className={className} aria-label={`Builder Pass ${pass.id}`} />
}
