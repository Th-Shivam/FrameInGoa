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

  const [showToast, setShowToast] = useState(false)
  const [shareModal, setShareModal] = useState<{ platform: 'x' | 'linkedin'; url: string } | null>(null)

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
      className="relative w-full py-16 md:py-24 px-5 sm:px-8"
      style={{ backgroundColor: '#0B4D2B' }}
    >
      {/* Section header — only shown on form step */}
      {step !== 'preview' && (
        <div className="text-center mb-14">
          <p
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#98E8A3]/70 mb-4"
          >
            Your Builder Identity
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#f5efe4]"
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
          <p className="text-[#b3c7aa]/70 mt-4 text-sm">
            Hacker ID:{' '}
            <span className="font-mono text-[#FFE600] font-semibold">{hackerId}</span>
          </p>
        </div>
      )}

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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col lg:flex-row items-center lg:items-center justify-center gap-12 lg:gap-16 min-h-[70vh] max-w-5xl mx-auto"
          >
            {/* Left — info + buttons */}
            <div className="flex flex-col gap-8 w-full max-w-md">
              <div>
                <p
                  className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#98E8A3]/70 mb-4"
                >
                  Your Card is Ready
                </p>
                <h2
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#f5efe4] leading-tight"
                  style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
                >
                  Looking{' '}
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #FF007F 0%, #FFE600 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Great
                  </span>
                  ! 🔥
                </h2>
                <p className="text-[#b3c7aa]/70 mt-4 text-sm">
                  Hacker ID:{' '}
                  <span className="font-mono text-[#FFE600] font-semibold">{hackerId}</span>
                </p>
              </div>

              <div className="flex flex-col gap-3 w-full">
                <button
                  onClick={() => {
                    const a = document.createElement('a')
                    a.href = cardDataUrl
                    a.download = `HHG26-ID-${hackerId}.png`
                    a.click()
                    setShowToast(true)
                    setTimeout(() => setShowToast(false), 4000)
                  }}
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-base text-white transition-all active:scale-[0.98]"
                  style={{ background: 'linear-gradient(135deg, #FF007F 0%, #e0006e 100%)', boxShadow: '0 8px 28px rgba(255,0,127,0.3)' }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" /></svg>
                  Download ID Card
                </button>

                {/* Share buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShareModal({
                      platform: 'x',
                      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Just got my Hacker House Goa 2026 ID! 🌴🔥 Can't wait to meet incredible builders, ship crazy ideas, and make memories in Goa. See you there!\n\n#FrameInGoa #HackerHouseGoa #HHG26`)}`
                    })}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 active:scale-[0.98]"
                    style={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    Share on X
                  </button>
                  <button
                    onClick={() => setShareModal({
                      platform: 'linkedin',
                      url: `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(`Thrilled to be part of Hacker House Goa 2026! 🌴🔥 Can't wait to connect with incredible builders, ship crazy ideas, and make unforgettable memories in Goa.\n\n#FrameInGoa #HackerHouseGoa #HHG26`)}`
                    })}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 active:scale-[0.98]"
                    style={{ background: '#0A66C2' }}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    Share on LinkedIn
                  </button>
                </div>

                <button
                  onClick={handleReset}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border border-white/10 text-[#b3c7aa]/80 text-sm font-medium hover:bg-white/5 hover:border-white/20 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                  Generate Another
                </button>
              </div>
            </div>

            {/* Right — card image */}
            <div className="relative flex-shrink-0">
              <div
                className="absolute inset-0 rounded-2xl blur-3xl opacity-30 scale-110"
                style={{ background: 'radial-gradient(circle, #FF007F 0%, transparent 70%)' }}
              />
              <img
                src={cardDataUrl}
                alt="Your Hacker House Goa ID Card"
                className="relative rounded-2xl shadow-2xl border border-white/10"
                style={{ imageRendering: 'crisp-edges', width: '360px', maxWidth: '85vw' }}
              />
            </div>
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

      {/* Share Confirm Modal */}
      <AnimatePresence>
        {shareModal && cardDataUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
            onClick={() => setShareModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-sm rounded-3xl p-6 flex flex-col gap-5"
              style={{ background: '#0f2d1a', border: '1px solid #FFE600aa' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <p className="text-[#98E8A3] font-mono text-xs uppercase tracking-widest mb-2">Heads up! 📎</p>
                <h3 className="text-[#f5efe4] text-xl font-bold mb-2">Attach your ID Card</h3>
                <p className="text-[#b3c7aa] text-sm leading-relaxed">
                  Clicking <span className="text-[#FFE600] font-semibold">Continue</span> will download your ID card image and open the share page.
                  <br /><br />
                  Attach the downloaded image to your post so everyone can see your Hacker House Goa ID! 🌴🔥
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShareModal(null)}
                  className="flex-1 py-3 rounded-xl border border-white/10 text-[#b3c7aa] text-sm font-medium hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const a = document.createElement('a')
                    a.href = cardDataUrl
                    a.download = `HHG26-ID-${hackerId}.png`
                    a.click()
                    window.open(shareModal.url, '_blank')
                    setShareModal(null)
                  }}
                  className="flex-1 py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #FF007F, #FFE600)' }}
                >
                  Continue →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl text-white text-sm font-medium"
            style={{ background: '#1a1a1a', border: '1px solid #FFE600aa' }}
          >
            <span className="text-lg">📎</span>
            Image downloaded! Attach it manually while sharing.
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
