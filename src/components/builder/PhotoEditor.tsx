import { useRef, useState, type CSSProperties } from 'react'
import { ImagePlus, RotateCcw, ZoomIn } from 'lucide-react'
import type { PhotoTransform } from '@/types/builderPass'

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

export default function PhotoEditor({
  photoDataUrl,
  transform,
  onTransformChange,
  onPhotoChange,
  onReset,
}: {
  photoDataUrl: string
  transform: PhotoTransform
  onTransformChange: (transform: PhotoTransform) => void
  onPhotoChange: (photoDataUrl: string) => void
  onReset: () => void
}) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const dragRef = useRef<{ x: number; y: number; startX: number; startY: number } | null>(null)
  const [error, setError] = useState('')

  async function handleFile(file: File) {
    setError('')
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError('Only JPG, PNG and WEBP are supported.')
      return
    }
    if (file.size > MAX_FILE_SIZE) {
      setError('Maximum upload size is 5MB.')
      return
    }
    onPhotoChange(await readFileAsDataUrl(file))
  }

  const zoomPercent = Math.round(((transform.zoom - 1) / (2.5 - 1)) * 100)

  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#e3d7b6] bg-[#fffaf0] p-3 text-[#072f38]">
      <div
        className="mx-auto mb-2.5 aspect-square w-full max-w-[170px] touch-none rounded-full bg-gradient-to-br from-[#0b5a33] via-[#2f8a56] to-[#0b5a33] p-[3px] shadow-[0_10px_24px_rgba(7,47,56,0.22)]"
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId)
          dragRef.current = {
            x: event.clientX,
            y: event.clientY,
            startX: transform.offsetX,
            startY: transform.offsetY,
          }
        }}
        onPointerMove={(event) => {
          if (!dragRef.current) return
          const rect = event.currentTarget.getBoundingClientRect()
          onTransformChange({
            ...transform,
            offsetX: dragRef.current.startX + (event.clientX - dragRef.current.x) / rect.width,
            offsetY: dragRef.current.startY + (event.clientY - dragRef.current.y) / rect.height,
          })
        }}
        onPointerUp={() => {
          dragRef.current = null
        }}
        onPointerCancel={() => {
          dragRef.current = null
        }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-full bg-[#efe3c7]">
          <img
            src={photoDataUrl}
            alt="Editable profile"
            draggable={false}
            className="absolute inset-0 h-full w-full select-none object-cover"
            style={{
              transform: `translate(${transform.offsetX * 100}%, ${transform.offsetY * 100}%) scale(${transform.zoom})`,
            }}
          />
        </div>
      </div>

      <label className="mb-2 block">
        <span className="mb-1.5 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.14em] text-[#31545a]">
          <span className="flex items-center gap-1.5">
            <ZoomIn className="h-3 w-3" />
            Photo Zoom
          </span>
          <span className="rounded-md bg-[#072f38] px-1.5 py-0.5 text-[10px] font-bold text-[#ffe36a]">
            {transform.zoom.toFixed(2)}×
          </span>
        </span>
        <input
          type="range"
          min="1"
          max="2.5"
          step="0.01"
          value={transform.zoom}
          onChange={(event) => onTransformChange({ ...transform, zoom: Number(event.target.value) })}
          className="range-coral w-full"
          style={{ '--fill': `${zoomPercent}%` } as CSSProperties}
        />
      </label>

      <div className="mt-auto grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#31545a]/25 bg-[#072f38] px-3 text-sm font-bold text-white transition duration-200 hover:bg-[#0b4d2b] active:scale-[0.98]"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#ff4f1f] px-3 text-sm font-bold text-white shadow-[0_6px_16px_rgba(255,79,31,0.3)] transition duration-200 hover:bg-[#ff673e] active:scale-[0.98]"
        >
          <ImagePlus className="h-4 w-4" />
          Change Photo
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0]
          if (file) void handleFile(file)
          event.currentTarget.value = ''
        }}
      />
      {error && (
        <p className="mt-2 rounded-xl border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}
