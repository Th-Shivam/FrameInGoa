import { motion } from 'framer-motion'
import type { GenerationStage } from '@/pages/GeneratingPage'
import { AlertCircle, RotateCw } from 'lucide-react'

const stageOrder: GenerationStage[] = ['photo', 'id', 'create', 'render']

const stageLabels: Record<GenerationStage, string> = {
  photo: 'Uploading Photo',
  id: 'Generating Builder ID',
  create: 'Creating Pass',
  render: 'Rendering Final Card',
  done: 'Done',
  error: 'Error',
}

export default function LoadingAnimation({
  stage,
  errorMessage,
  onRetry,
}: {
  stage: GenerationStage
  errorMessage?: string
  onRetry?: () => void
}) {
  const isError = stage === 'error'
  const activeIndex = isError
    ? -1
    : stage === 'done'
      ? stageOrder.length
      : stageOrder.indexOf(stage)

  return (
    <div className="w-full max-w-xl rounded-[8px] border border-white/10 bg-[#fbf4df] p-6 text-[#072f38] shadow-[0_28px_80px_rgba(0,0,0,0.32)]">
      <div className="mx-auto mb-8 grid h-24 w-24 place-items-center rounded-full bg-[#072f38]">
        {isError ? (
          <AlertCircle className="h-12 w-12 text-red-400" />
        ) : (
          <motion.div
            className="h-14 w-14 rounded-full border-4 border-[#ffe36a] border-t-[#ff4f1f]"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
          />
        )}
      </div>

      <div className="mb-5 h-3 overflow-hidden rounded-full bg-[#e1d4b3]">
        <motion.div
          className={`h-full rounded-full ${isError ? 'bg-red-500' : 'bg-[#ff4f1f]'}`}
          initial={false}
          animate={{ width: isError ? '100%' : `${Math.max(6, ((activeIndex + 1) / stageOrder.length) * 100)}%` }}
          transition={{ duration: 0.25 }}
        />
      </div>

      <div className="grid gap-3">
        {stageOrder.map((key, index) => {
          const status = stageLabels[key]
          const completed = index < activeIndex
          const active = !isError && index === activeIndex
          return (
            <div key={status} className="flex items-center gap-3">
              <span
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  completed
                    ? 'bg-[#0b5a33]'
                    : active
                      ? 'bg-[#ff4f1f] animate-pulse'
                      : 'bg-[#cdbf9e]'
                }`}
              />
              <span
                className={`text-sm font-black transition-colors ${
                  active ? 'text-[#072f38]' : completed ? 'text-[#0b5a33]' : 'text-[#637a73]'
                }`}
              >
                {status}
              </span>
            </div>
          )
        })}
      </div>

      {isError && (
        <div className="mt-6 rounded-[8px] border border-red-300 bg-red-50 p-4 text-left">
          <p className="text-xs font-black uppercase text-red-700">Generation Failed</p>
          <p className="mt-1 text-sm font-semibold text-red-800">
            {errorMessage || 'Something went wrong while generating your Builder Pass.'}
          </p>
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="mt-3 inline-flex h-10 items-center gap-2 rounded-[8px] bg-[#072f38] px-4 text-xs font-black text-white"
            >
              <RotateCw className="h-4 w-4" />
              Start Over
            </button>
          )}
        </div>
      )}
    </div>
  )
}