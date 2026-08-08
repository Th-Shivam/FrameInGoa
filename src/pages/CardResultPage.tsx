import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Download, Linkedin, Twitter } from 'lucide-react'
import { useRenderedCard } from '@/hooks/useRenderedCard'
import { getBuilderPass } from '@/lib/builderPassStorage'
import type { BuilderPassData } from '@/types/builderPass'

const SHARE_TEXT =
  "I'm heading to HH Goa 2026 🌴💻 Ready to build, connect and create in Goa! #HHGoa2026 #HackerHouse"

function getPublicIdUrl(id: string) {
  if (typeof window !== 'undefined') return `${window.location.origin}/id/${id}`
  return `https://frameingoa.com/id/${id}`
}

export default function CardResultPage({
  id,
  navigate,
}: {
  id: string
  navigate: (path: string) => void
}) {
  const { dataUrl, error, retry } = useRenderedCard(id)
  const [pass, setPass] = useState<BuilderPassData | null>(null)

  useEffect(() => {
    let cancelled = false
    void getBuilderPass(id).then((stored) => {
      if (!cancelled) setPass(stored)
    })
    return () => {
      cancelled = true
    }
  }, [id])

  const publicUrl = getPublicIdUrl(id)

  function downloadCard() {
    if (!dataUrl) return
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = `HH-Goa-2026-${id}.png`
    link.click()
  }

  function shareOnX() {
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}&url=${encodeURIComponent(publicUrl)}`
    window.open(shareUrl, '_blank', 'noopener,noreferrer,width=640,height=520')
  }

  function shareOnLinkedIn() {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(publicUrl)}`
    window.open(shareUrl, '_blank', 'noopener,noreferrer,width=640,height=640')
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(130%_100%_at_50%_0%,#0d5c3a_0%,#07402a_48%,#042b1c_100%)] px-4 py-8 md:px-6 lg:py-12">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#0b5a33] opacity-60 blur-[140px]" />
        <div className="absolute bottom-[-120px] right-[-140px] h-[400px] w-[560px] rounded-full bg-[#ff4f1f]/10 blur-[130px]" />
        <div className="absolute left-[-160px] top-1/3 h-[360px] w-[460px] rounded-full bg-[#ffe36a]/10 blur-[130px]" />
        <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] [background-size:44px_44px]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-[880px] flex-col items-center">
        <motion.header
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 text-center lg:mb-10"
        >
          <p className="flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-[0.32em] text-[#ffe36a]">
            <span className="hidden h-px w-10 bg-gradient-to-r from-transparent to-[#ffe36a]/70 sm:block" />
            HH Goa 2026
            <span className="hidden h-px w-10 bg-gradient-to-l from-transparent to-[#ffe36a]/70 sm:block" />
          </p>
          <h1
            className="mt-3 text-[clamp(1.7rem,4vw,2.5rem)] font-black leading-tight tracking-tight text-[#fbf4df]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Your ID is Ready! 🌴
          </h1>
          <p className="mt-2 text-sm font-medium text-[#b9e0cf]">HH Goa 2026 • Builder Pass</p>
        </motion.header>

        {!dataUrl && !error && (
          <div className="grid min-h-[320px] w-full place-items-center rounded-[22px] border border-white/10 bg-white/5 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3 text-[#fbf4df]">
              <motion.div
                className="h-12 w-12 rounded-full border-4 border-[#ffe36a] border-t-[#ff4f1f]"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
              />
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#ffe36a]">Preparing your ID</p>
            </div>
          </div>
        )}

        {error && (
          <div className="w-full rounded-[22px] border border-white/10 bg-[#fbf4df] p-6 text-center text-[#072f38] shadow-[0_24px_70px_rgba(2,20,14,0.35)]">
            <h2 className="text-lg font-black">ID card unavailable</h2>
            <p className="mt-2 text-sm font-semibold text-[#31545a]">{error}</p>
            <button
              type="button"
              onClick={retry}
              className="mt-5 inline-flex h-11 items-center gap-2 rounded-xl bg-[#072f38] px-6 text-sm font-bold text-white transition hover:bg-[#0b4d2b]"
            >
              Try Again
            </button>
          </div>
        )}

        {dataUrl && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex w-full flex-col items-center gap-6"
          >
            <div className="relative w-full max-w-[400px]">
              <div aria-hidden className="absolute -inset-6 rounded-full bg-[#ff4f1f]/15 blur-3xl" />
              <div className="relative rounded-[24px] border border-white/10 bg-white/5 p-3 shadow-[0_30px_80px_rgba(2,20,14,0.55)] backdrop-blur-sm">
                <img
                  src={dataUrl}
                  alt={`Your HH Goa 2026 Builder Pass ${id}`}
                  className="block h-auto w-full rounded-[16px]"
                />
              </div>
              {pass && (
                <div className="absolute bottom-6 left-1/2 w-[calc(100%-3rem)] -translate-x-1/2 rounded-2xl border border-white/10 bg-[#062d37]/85 px-4 py-3 text-center backdrop-blur-md">
                  <p className="truncate text-sm font-black text-[#fbf4df]">{pass.fullName}</p>
                  <p className="truncate text-xs font-semibold text-[#9ec9ba]">{pass.role}</p>
                  <p className="mt-1 text-[10px] font-black uppercase tracking-[0.22em] text-[#ffe36a]">{pass.id}</p>
                </div>
              )}
            </div>

            <div className="mx-auto flex w-full max-w-[520px] flex-col items-center gap-3">
              <p className="text-[13px] font-semibold text-[#9ec9ba]">Your card is ready</p>

              <button
                type="button"
                onClick={downloadCard}
                className="inline-flex h-[52px] w-full max-w-[420px] items-center justify-center gap-2 rounded-[15px] bg-gradient-to-r from-[#ff4f1f] to-[#ff7a1a] text-[15px] font-bold text-white shadow-[0_10px_28px_rgba(255,79,31,0.35)] transition duration-200 hover:shadow-[0_14px_36px_rgba(255,79,31,0.5)] hover:brightness-110 active:scale-[0.98]"
              >
                <Download className="h-4 w-4" />
                Download ID Card
              </button>

              <div className="grid w-full max-w-[420px] grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={shareOnX}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#072f38] px-3 text-sm font-bold text-white transition duration-200 hover:bg-[#0b4d2b] active:scale-[0.98]"
                >
                  <Twitter className="h-4 w-4 shrink-0 text-[#ffe36a]" />
                  Share on X
                </button>
                <button
                  type="button"
                  onClick={shareOnLinkedIn}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#072f38] px-3 text-sm font-bold text-white transition duration-200 hover:bg-[#0b4d2b] active:scale-[0.98]"
                >
                  <Linkedin className="h-4 w-4 shrink-0 text-[#ffe36a]" />
                  Share on LinkedIn
                </button>
              </div>

              <p className="mt-[2px] flex items-center gap-2 text-xs font-semibold text-[#9ec9ba]">
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                Your Builder Pass is ready
              </p>

              <button
                type="button"
                onClick={() => navigate('/create-id')}
                className="mt-1 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#b9e0cf] transition hover:text-[#fbf4df]"
              >
                Create Another ID
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  )
}
