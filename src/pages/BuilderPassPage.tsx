import { useEffect, useState } from 'react'
import BuilderCard from '@/components/builder/BuilderCard'
import { getBuilderPass, saveBuilderPass } from '@/lib/builderPassStorage'
import type { BuilderPassData } from '@/types/builderPass'

export default function BuilderPassPage({
  id,
  navigate,
}: {
  id: string
  navigate: (path: string) => void
}) {
  const [pass, setPass] = useState<BuilderPassData | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let cancelled = false
    getBuilderPass(id)
      .then((storedPass) => {
        if (cancelled) return
        setPass(storedPass)
        setLoaded(true)
      })
      .catch((error) => {
        console.error('[ID] Failed to load builder pass', error)
        if (cancelled) return
        setPass(null)
        setLoaded(true)
      })
    return () => {
      cancelled = true
    }
  }, [id])

  function updatePass(nextPass: BuilderPassData) {
    setPass(nextPass)
    void saveBuilderPass(nextPass)
  }

  return (
    <main className="min-h-screen bg-[#0b5a33] px-4 py-6 md:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        <div className="flex flex-col gap-3 text-[#fbf4df] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#ffe36a]">Builder Pass</p>
            <h1 className="mt-2 text-3xl font-black">{id}</h1>
          </div>
          <button
            type="button"
            onClick={() => navigate('/create-id')}
            className="h-11 rounded-[8px] border border-white/20 px-4 text-sm font-bold text-white"
          >
            Create Another
          </button>
        </div>

        {!loaded && (
          <div className="grid min-h-[60vh] place-items-center rounded-[8px] border border-white/10 bg-[#082f3b] text-white">
            Loading Builder Pass
          </div>
        )}

        {loaded && !pass && (
          <div className="grid min-h-[60vh] place-items-center rounded-[8px] border border-white/10 bg-[#fbf4df] p-6 text-center text-[#072f38]">
            <div>
              <h2 className="text-2xl font-black">Pass not found</h2>
              <p className="mt-2 text-sm font-semibold text-[#31545a]">Create a new Builder Pass to save it on this device.</p>
            </div>
          </div>
        )}

        {pass && <BuilderCard pass={pass} onPassChange={updatePass} />}
      </div>
    </main>
  )
}
