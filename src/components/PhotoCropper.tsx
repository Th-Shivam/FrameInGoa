import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import type { Area } from 'react-easy-crop'
import { getCroppedImg } from '../utils/cropImage'

interface Props {
  imageSrc: string
  onCropComplete: (croppedDataUrl: string) => void
  onCancel: () => void
}

export default function PhotoCropper({ imageSrc, onCropComplete, onCancel }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  const onCropChange = useCallback((c: { x: number; y: number }) => setCrop(c), [])
  const onZoomChange = useCallback((z: number) => setZoom(z), [])

  const onCropAreaComplete = useCallback((_: Area, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels)
  }, [])

  const handleConfirm = async () => {
    if (!croppedAreaPixels) return
    try {
      const cropped = await getCroppedImg(imageSrc, croppedAreaPixels)
      onCropComplete(cropped)
    } catch {
      // ignore
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4 bg-[#0B3D22] rounded-2xl overflow-hidden border border-[#FFE600]/20 shadow-2xl">
        {/* Crop area */}
        <div className="relative w-full" style={{ height: '380px' }}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={onCropAreaComplete}
          />
        </div>

        {/* Controls */}
        <div className="p-5 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-[#b3c7aa] text-xs font-mono uppercase tracking-widest w-10">Zoom</span>
            <input
              type="range"
              min={1}
              max={3}
              step={0.05}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="flex-1 accent-[#FF007F]"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 py-2.5 rounded-xl border border-[#b3c7aa]/30 text-[#b3c7aa] text-sm font-medium hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 py-2.5 rounded-xl bg-[#FF007F] text-white text-sm font-bold hover:bg-[#e0006e] transition-colors"
            >
              Use Photo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
