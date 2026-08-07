import { Download, RefreshCw } from 'lucide-react'

interface Props {
  cardDataUrl: string
  hackerId: string
  onReset: () => void
}

export default function GenerateButton({ cardDataUrl, hackerId, onReset }: Props) {
  const handleDownload = () => {
    const a = document.createElement('a')
    a.href = cardDataUrl
    a.download = `HHG26-ID-${hackerId}.png`
    a.click()
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-sm mx-auto">
      <button
        onClick={handleDownload}
        className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl bg-[#FF007F] text-white font-bold text-base hover:bg-[#e0006e] transition-all active:scale-[0.98] shadow-lg shadow-[#FF007F]/30"
      >
        <Download className="w-5 h-5" />
        Download ID Card
      </button>
      <button
        onClick={onReset}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-[#FFE600]/20 text-[#b3c7aa] text-sm font-medium hover:bg-white/5 transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        Generate Another
      </button>
    </div>
  )
}
