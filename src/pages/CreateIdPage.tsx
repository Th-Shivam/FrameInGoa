import { motion } from 'framer-motion'
import BuilderForm from '@/components/builder/BuilderForm'
import { setPendingBuilderPass } from '@/lib/pendingBuilderPass'
import type { BuilderPassInput } from '@/types/builderPass'

export default function CreateIdPage({ navigate }: { navigate: (path: string) => void }) {
  function handleSubmit(input: BuilderPassInput) {
    // Keep the photo (a large base64 data URL) in the in-memory module-level
    // cache instead of Web Storage. sessionStorage caps at ~5 MB and a single
    // 5 MB upload + JSON overhead will throw QuotaExceededError.
    setPendingBuilderPass(input)
    navigate('/generating')
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(130%_100%_at_50%_0%,#0d5c3a_0%,#07402a_48%,#042b1c_100%)] px-4 py-8 md:px-6 lg:py-10">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[440px] w-[760px] -translate-x-1/2 rounded-full bg-[#0b5a33] opacity-60 blur-[140px]" />
        <div className="absolute bottom-[-120px] right-[-140px] h-[400px] w-[560px] rounded-full bg-[#ff4f1f]/10 blur-[130px]" />
        <div className="absolute left-[-160px] top-1/4 h-[360px] w-[480px] rounded-full bg-[#ffe36a]/10 blur-[130px]" />
        <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] [background-size:44px_44px]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-[600px] flex-col items-center">
        <motion.header
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-7 text-center lg:mb-9"
        >
          <p className="flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-[0.32em] text-[#ffe36a]">
            <span className="hidden h-px w-10 bg-gradient-to-r from-transparent to-[#ffe36a]/70 sm:block" />
            HH Goa 2026
            <span className="hidden h-px w-10 bg-gradient-to-l from-transparent to-[#ffe36a]/70 sm:block" />
          </p>
          <h1
            className="mt-3 text-[clamp(1.7rem,3.4vw,2.4rem)] font-black leading-tight tracking-tight text-[#fbf4df]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Create Builder Pass
          </h1>
          <p className="mt-2 text-sm font-medium text-[#b9e0cf]">Build your identity. Own your vibe.</p>
        </motion.header>

        <BuilderForm onSubmit={handleSubmit} />
      </div>
    </main>
  )
}
