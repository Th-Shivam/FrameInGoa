import { useEffect, useState } from 'react'
import { BadgeCheck, QrCode, UserRound, Wrench } from 'lucide-react'
import QRCode from '@/components/builder/QRCode'
import { useRenderedCard } from '@/hooks/useRenderedCard'
import { getBuilderPass } from '@/lib/builderPassStorage'
import type { BuilderPassData } from '@/types/builderPass'

export default function PublicIdPage({
  id,
  navigate,
}: {
  id: string
  navigate: (path: string) => void
}) {
  const [pass, setPass] = useState<BuilderPassData | null>(null)
  const [loaded, setLoaded] = useState(false)
  const { dataUrl } = useRenderedCard(id)

  useEffect(() => {
    let cancelled = false
    getBuilderPass(id)
      .then((stored) => {
        if (cancelled) return
        setPass(stored)
        setLoaded(true)
      })
      .catch((error) => {
        console.error('[ID] Failed to load builder pass', error)
        if (cancelled) return
        setLoaded(true)
      })
    return () => {
      cancelled = true
    }
  }, [id])

  const publicUrl =
    typeof window !== 'undefined' ? `${window.location.origin}/id/${id}` : `https://frameingoa.com/id/${id}`

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(130%_100%_at_50%_0%,#0d5c3a_0%,#07402a_48%,#042b1c_100%)] px-4 py-8 md:px-6 lg:py-12">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#0b5a33] opacity-60 blur-[140px]" />
        <div className="absolute bottom-[-120px] right-[-140px] h-[400px] w-[560px] rounded-full bg-[#ff4f1f]/10 blur-[130px]" />
        <div className="absolute left-[-160px] top-1/3 h-[360px] w-[460px] rounded-full bg-[#ffe36a]/10 blur-[130px]" />
        <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] [background-size:44px_44px]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1100px]">
        <header className="mb-8 text-center lg:mb-10">
          <p className="flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-[0.32em] text-[#ffe36a]">
            <span className="hidden h-px w-10 bg-gradient-to-r from-transparent to-[#ffe36a]/70 sm:block" />
            HH Goa 2026
            <span className="hidden h-px w-10 bg-gradient-to-l from-transparent to-[#ffe36a]/70 sm:block" />
          </p>
          <h1
            className="mt-3 text-[clamp(1.6rem,3.4vw,2.3rem)] font-black leading-tight tracking-tight text-[#fbf4df]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Builder Pass
          </h1>
          <p className="mt-2 text-sm font-medium text-[#b9e0cf]">
            Official Hacker House Goa 2026 identity · Verified by QR
          </p>
        </header>

        {!loaded && (
          <div className="grid min-h-[320px] place-items-center rounded-[22px] border border-white/10 bg-white/5">
            <div className="flex flex-col items-center gap-3 text-[#fbf4df]">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#ffe36a] border-t-[#ff4f1f]" />
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#ffe36a]">Loading pass</p>
            </div>
          </div>
        )}

        {loaded && !pass && (
          <div className="grid min-h-[320px] place-items-center rounded-[22px] border border-white/10 bg-[#fbf4df] p-6 text-center text-[#072f38] shadow-[0_24px_70px_rgba(2,20,14,0.35)]">
            <div>
              <h2 className="text-2xl font-black">Pass not found</h2>
              <p className="mt-2 text-sm font-semibold text-[#31545a]">This Builder Pass does not exist on this device.</p>
              <button
                type="button"
                onClick={() => navigate('/create-id')}
                className="mt-5 inline-flex h-11 items-center gap-2 rounded-xl bg-[#ff4f1f] px-6 text-sm font-bold text-white transition hover:bg-[#ff673e]"
              >
                Create Your Own ID
              </button>
            </div>
          </div>
        )}

        {loaded && pass && (
          <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)] lg:gap-9">
            <div className="relative mx-auto w-full max-w-[420px] lg:mx-0">
              <div aria-hidden className="absolute -inset-6 rounded-full bg-[#ff4f1f]/15 blur-3xl" />
              <div className="relative rounded-[24px] border border-white/10 bg-white/5 p-3 shadow-[0_30px_80px_rgba(2,20,14,0.55)] backdrop-blur-sm">
                {dataUrl ? (
                  <img
                    src={dataUrl}
                    alt={`HH Goa 2026 Builder Pass ${id}`}
                    className="block h-auto w-full rounded-[16px]"
                  />
                ) : (
                  <div className="grid aspect-[2/3] w-full place-items-center rounded-[16px] bg-[#08303c]">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#ffe36a] border-t-[#ff4f1f]" />
                  </div>
                )}
              </div>
            </div>

            <aside className="grid content-start gap-5">
              <div className="rounded-[22px] border border-white/10 bg-[#fbf4df] p-5 text-[#072f38] shadow-[0_24px_70px_rgba(2,20,14,0.35)] md:p-6">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-[#0b5a33] bg-[#efe3c7]">
                    {pass.photoDataUrl && (
                      <img src={pass.photoDataUrl} alt={pass.fullName} className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-xl font-black">{pass.fullName}</p>
                    <p className="truncate text-sm font-semibold text-[#31545a]">{pass.role}</p>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3 rounded-xl bg-[#fffaf0] px-4 py-3">
                  <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-[#31545a]">
                    <UserRound className="h-3.5 w-3.5" />
                    Builder ID
                  </div>
                  <p className="text-sm font-black tracking-wide text-[#0b5a33]">{pass.id}</p>
                </div>

                <div className="mt-4 rounded-xl bg-[#fffaf0] px-4 py-3">
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#31545a]">Stack / Role</p>
                  <p className="mt-1 flex items-center gap-2 text-sm font-bold text-[#072f38]">
                    <Wrench className="h-3.5 w-3.5 text-[#ff4f1f]" />
                    {pass.role}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#19b06c]/40 bg-[#e8f5ee] px-4 py-3">
                  <BadgeCheck className="h-4 w-4 shrink-0 text-[#0b5a33]" />
                  <p className="text-xs font-bold text-[#0b4d2b]">
                    QR verified — the QR code on this card points to this page.
                  </p>
                </div>
              </div>

              <div className="rounded-[22px] border border-white/10 bg-white/5 p-5 backdrop-blur-sm md:p-6">
                <p className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#ffe36a]">
                  <QrCode className="h-4 w-4" />
                  QR Verification
                </p>
                <div className="mt-4 flex items-start gap-4">
                  <QRCode value={publicUrl} className="h-24 w-24 shrink-0 rounded-xl bg-[#fff7e6] p-1" />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold leading-5 text-[#a5c9bb]">
                      Scan the QR on the ID card to open this page and confirm the pass is genuine.
                    </p>
                    <p className="mt-2 break-all text-[11px] font-bold leading-5 text-[#dff3e9]">{publicUrl}</p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate('/create-id')}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ff4f1f] to-[#ff7a1a] px-4 text-sm font-bold text-white shadow-[0_10px_28px_rgba(255,79,31,0.35)] transition duration-200 hover:shadow-[0_14px_36px_rgba(255,79,31,0.5)] hover:brightness-110 active:scale-[0.98]"
              >
                Create Your Own Builder Pass
              </button>
            </aside>
          </div>
        )}
      </div>
    </main>
  )
}
