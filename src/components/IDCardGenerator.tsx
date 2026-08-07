import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import UploadForm from './UploadForm'
import PhotoCropper from './PhotoCropper'
import GenerateButton from './GenerateButton'
import { useCanvasRenderer } from '../hooks/useCanvasRenderer'
import { generateHackerId } from '../utils/generateHackerId'
import { GeneratorStep } from '../types/idCard'

interface FormState {
  name: string
  role: string
  city: string
  country: string
  github: string
  linkedin: string
  emergencyContact: string
}

const INITIAL_FORM: FormState = {
  name: '',
  role: '',
  city: '',
  country: '',
  github: '',
  linkedin: '',
  emergencyContact: '',
}

export default function IDCardGenerator() {
  const [step, setStep] = useState<GeneratorStep>('form')
  const [formState, setFormState] = useState<FormState>(INITIAL_FORM)
  const [rawImageSrc, setRawImageSrc] = useState<string | null>(null)
  const [croppedPhoto, setCroppedPhoto] = useState<string | null>(null)
  const [hackerId] = useState(() => generateHackerId())

  const { cardDataUrl, isRendering, error, generate, reset } = useCanvasRenderer()

  const handleFormChange = useCallback((field: keyof FormState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }))
  }, [])

  const handlePhotoSelect = useCallback((file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const src = e.target?.result as string
      setRawImageSrc(src)
      setStep('crop')
    }
    reader.readAsDataURL(file)
  }, [])

  const handleCropComplete = useCallback((cropped: string) => {
    setCroppedPhoto(cropped)
    setRawImageSrc(null)
    setStep('form')
  }, [])

  const handleCropCancel = useCallback(() => {
    setRawImageSrc(null)
    setStep('form')
  }, [])

  const handleGenerate = useCallback(async () => {
    if (!croppedPhoto) return
    await generate({
      name: formState.name.trim(),
      role: formState.role.trim(),
      city: formState.city.trim(),
      country: formState.country.trim(),
      github: formState.github.trim(),
      linkedin: formState.linkedin.trim(),
      emergencyContact: formState.emergencyContact.trim(),
      hackerId,
      photoDataUrl: croppedPhoto,
    })
    setStep('preview')
  }, [croppedPhoto, formState, hackerId, generate])

  const handleReset = useCallback(() => {
    setFormState(INITIAL_FORM)
    setCroppedPhoto(null)
    setRawImageSrc(null)
    reset()
    setStep('form')
  }, [reset])

  return (
    <section
      id="generate"
      className="relative w-full py-20 px-4"
      style={{ backgroundColor: '#0B4D2B' }}
    >
      {/* Section header */}
      <div className="text-center mb-12">
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#98E8A3] mb-3">
          — Step 1 of 1 —
        </p>
        <h2
          className="text-4xl md:text-5xl font-bold text-[#f5efe4]"
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
        >
          Generate Your{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #FF007F 0%, #FFE600 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            ID Card
          </span>
        </h2>
        <p className="text-[#b3c7aa] mt-3 text-sm">
          Your Hacker ID:{' '}
          <span className="font-mono text-[#FFE600] font-bold">{hackerId}</span>
        </p>
      </div>

      <AnimatePresence mode="wait">
        {/* FORM STEP */}
        {step === 'form' && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            <UploadForm
              formState={formState}
              photoPreview={croppedPhoto}
              onFormChange={handleFormChange}
              onPhotoSelect={handlePhotoSelect}
              onSubmit={handleGenerate}
            />
            {isRendering && (
              <div className="flex items-center justify-center gap-2 mt-6 text-[#b3c7aa]">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-sm">Rendering your card…</span>
              </div>
            )}
            {error && (
              <p className="text-center text-red-400 text-sm mt-4">{error}</p>
            )}
          </motion.div>
        )}

        {/* PREVIEW STEP */}
        {step === 'preview' && cardDataUrl && (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-8"
          >
            {/* Card preview */}
            <div className="relative">
              <div
                className="absolute inset-0 rounded-3xl blur-2xl opacity-40"
                style={{ background: 'radial-gradient(circle, #FF007F 0%, transparent 70%)' }}
              />
              <img
                src={cardDataUrl}
                alt="Your Hacker House Goa ID Card"
                className="relative w-full max-w-xs rounded-2xl shadow-2xl border border-[#FFE600]/20"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </div>

            <GenerateButton
              cardDataUrl={cardDataUrl}
              hackerId={hackerId}
              onReset={handleReset}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* CROP MODAL */}
      {step === 'crop' && rawImageSrc && (
        <PhotoCropper
          imageSrc={rawImageSrc}
          onCropComplete={handleCropComplete}
          onCancel={handleCropCancel}
        />
      )}
    </section>
  )
}
