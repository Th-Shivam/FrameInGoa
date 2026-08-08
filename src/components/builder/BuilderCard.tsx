import { useEffect, useRef, useState } from 'react'
import { Download, Share2 } from 'lucide-react'
import { CanvasGenerator } from '@/components/builder/CanvasGenerator'
import PhotoEditor from '@/components/builder/PhotoEditor'
import QRCode from '@/components/builder/QRCode'
import { DEFAULT_PHOTO_TRANSFORM, getBuilderPassUrl } from '@/lib/builderPass'
import { renderBuilderPass } from '@/lib/canvasRenderer'
import type { BuilderPassData, PhotoTransform } from '@/types/builderPass'

export default function BuilderCard({
  pass,
  onPassChange,
}: {
  pass: BuilderPassData
  onPassChange: (pass: BuilderPassData) => void
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isRendering, setIsRendering] = useState(true)
  const passUrl = getBuilderPassUrl(pass.id)

  useEffect(() => {
    let cancelled = false
    setIsRendering(true)
    if (!canvasRef.current) return

    renderBuilderPass(canvasRef.current, pass).finally(() => {
      if (!cancelled) setIsRendering(false)
    })

    return () => {
      cancelled = true
    }
  }, [pass])

  function updateTransform(transform: PhotoTransform) {
    onPassChange({ ...pass, photoTransform: transform })
  }

  function downloadPass() {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement('a')
    link.href = canvas.toDataURL('image/png')
    link.download = `${pass.id}-builder-pass.png`
    link.click()
  }

  async function sharePass() {
    const canvas = canvasRef.current
    if (!canvas) return
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'))
    if (!blob) return
    const file = new File([blob], `${pass.id}-builder-pass.png`, { type: 'image/png' })
    const nav = navigator as Navigator & {
      canShare?: (data: { files?: File[] }) => boolean
      share?: (data: { title?: string; text?: string; url?: string; files?: File[] }) => Promise<void>
    }
    if (nav.canShare?.({ files: [file] }) && nav.share) {
      await nav.share({ title: 'Builder Pass', text: pass.fullName, files: [file] })
    } else if (nav.share) {
      await nav.share({ title: 'Builder Pass', text: pass.fullName, url: passUrl })
    } else {
      await navigator.clipboard.writeText(passUrl)
    }
  }

  return (
    <div className="grid w-full max-w-7xl gap-6 lg:grid-cols-[minmax(0,0.95fr)_360px]">
      <div className="rounded-[8px] border border-white/10 bg-[#082f3b] p-3 shadow-[0_28px_80px_rgba(0,0,0,0.32)] md:p-5">
        <div className="relative mx-auto max-w-[520px]">
          {isRendering && (
            <div className="absolute inset-0 z-10 grid place-items-center rounded-[8px] bg-[#082f3b]/70 text-sm font-bold text-white backdrop-blur-sm">
              Rendering Final Card
            </div>
          )}
          <CanvasGenerator pass={pass} canvasRef={canvasRef} className="block h-auto w-full rounded-[8px]" />
        </div>
      </div>

      <aside className="grid content-start gap-4">
        <div className="rounded-[8px] border border-white/10 bg-[#fbf4df] p-4 text-[#072f38]">
          <p className="text-xs font-black uppercase text-[#637a73]">Builder ID</p>
          <p className="mt-1 text-2xl font-black tracking-wide">{pass.id}</p>
          <div className="mt-4 flex items-center gap-4">
            <QRCode value={passUrl} className="h-20 w-20 rounded-[8px]" />
            <p className="break-all text-xs font-semibold leading-5 text-[#31545a]">{passUrl}</p>
          </div>
        </div>

        <PhotoEditor
          photoDataUrl={pass.photoDataUrl}
          transform={pass.photoTransform}
          onTransformChange={updateTransform}
          onReset={() => updateTransform(DEFAULT_PHOTO_TRANSFORM)}
          onPhotoChange={(photoDataUrl) => {
            onPassChange({ ...pass, photoDataUrl, photoTransform: DEFAULT_PHOTO_TRANSFORM })
          }}
        />

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={downloadPass}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-[8px] bg-[#ffe36a] px-4 text-sm font-black text-[#072f38]"
          >
            <Download className="h-4 w-4" />
            Download
          </button>
          <button
            type="button"
            onClick={() => void sharePass()}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-[8px] bg-[#ff4f1f] px-4 text-sm font-black text-white"
          >
            <Share2 className="h-4 w-4" />
            Share
          </button>
        </div>
      </aside>
    </div>
  )
}
