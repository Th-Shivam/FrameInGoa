import { useEffect, useRef, useState } from 'react'
import LoadingAnimation from '@/components/builder/LoadingAnimation'
import { DEFAULT_PHOTO_TRANSFORM, generateBuilderId } from '@/lib/builderPass'
import { getBuilderPass, saveBuilderPass, saveGeneratedCard } from '@/lib/builderPassStorage'
import { clearPendingBuilderPass, getPendingBuilderPass } from '@/lib/pendingBuilderPass'
import { renderBuilderPass } from '@/lib/canvasRenderer'
import type { BuilderPassData } from '@/types/builderPass'

export type GenerationStage =
  | 'photo'
  | 'id'
  | 'create'
  | 'render'
  | 'done'
  | 'error'

export default function GeneratingPage({
  navigate,
}: {
  navigate: (path: string) => void
}) {
  const [stage, setStage] = useState<GenerationStage>('photo')
  const [errorMessage, setErrorMessage] = useState('')
  const startedRef = useRef(false)

  useEffect(() => {
    if (startedRef.current) return
    startedRef.current = true

    async function run() {
      try {
        console.log('[ID] Generation started')

        setStage('photo')
        // Read the photo-bearing input from the in-memory module-level cache.
        // It is set by CreateIdPage.handleSubmit. We do NOT use sessionStorage
        // because the photo data URL exceeds the ~5 MB sessionStorage quota.
        const input = getPendingBuilderPass()
        if (!input) {
          throw new Error('Missing form data. Please start again from the create page.')
        }
        if (!input?.photoDataUrl || !input?.fullName || !input?.role) {
          throw new Error('Form data is incomplete. Please re-upload your details.')
        }
        console.log('[ID] Photo processing completed')

        setStage('id')
        let id = generateBuilderId()
        let attempts = 0
        while (await getBuilderPass(id)) {
          id = generateBuilderId()
          attempts += 1
          if (attempts > 25) break
        }
        console.log('[ID] Builder ID:', id)

        setStage('create')
        const pass: BuilderPassData = {
          ...input,
          photoTransform: input.photoTransform ?? DEFAULT_PHOTO_TRANSFORM,
          id,
          createdAt: new Date().toISOString(),
        }
        await saveBuilderPass(pass)
        // The photo is now persisted in IndexedDB — release the in-memory copy.
        clearPendingBuilderPass()
        console.log('[ID] Pass created')

        setStage('render')
        console.log('[ID] Final render started')

        let renderedDataUrl: string
        try {
          renderedDataUrl = await renderBuilderPassToDataUrl(pass)
        } catch (renderError) {
          console.error('[ID] FINAL RENDER ERROR:', renderError)
          setErrorMessage('Something went wrong while creating your ID card. Please try again.')
          setStage('error')
          return
        }

        console.log('[ID] Canvas exported', renderedDataUrl?.length)
        console.log('[ID] Saving generated card')
        await saveGeneratedCard(pass.id, renderedDataUrl)
        console.log('[ID] Generated card saved')

        console.log('[ID] Navigating to result page')
        navigate(`/id-card/${pass.id}`)
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        console.error('[ID] Generation failed:', error)
        setErrorMessage(message)
        setStage('error')
      }
    }

    void run()
  }, [navigate])

  return (
    <main className="grid min-h-screen place-items-center bg-[#0b5a33] px-5">
      <LoadingAnimation stage={stage} errorMessage={errorMessage} onRetry={() => navigate('/create-id')} />
    </main>
  )
}

async function renderBuilderPassToDataUrl(pass: BuilderPassData): Promise<string> {
  const canvas = document.createElement('canvas')
  await renderBuilderPass(canvas, pass)
  return canvas.toDataURL('image/png')
}
