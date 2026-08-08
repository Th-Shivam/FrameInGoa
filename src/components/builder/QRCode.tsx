import { useEffect, useRef } from 'react'
import QRCodeLib from 'qrcode'

export default function QRCode({ value, className = '' }: { value: string; className?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!ref.current) return
    QRCodeLib.toCanvas(ref.current, value, {
      errorCorrectionLevel: 'H',
      margin: 1,
      width: 160,
      color: {
        dark: '#062d37',
        light: '#fff7e6',
      },
    })
  }, [value])

  return <canvas ref={ref} className={className} aria-label="Builder Pass QR code" />
}
