import { useCallback, useState, type FormEvent, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, BadgePlus, Camera, ImagePlus } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import PhotoEditor from '@/components/builder/PhotoEditor'
import type { BuilderPassInput, PhotoTransform } from '@/types/builderPass'
import { DEFAULT_PHOTO_TRANSFORM, normalizeBuilderName } from '@/lib/builderPass'

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

function SectionHeader({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#072f38] text-[#ffe36a] shadow-[0_4px_14px_rgba(7,47,56,0.3)]">
        {icon}
      </span>
      <div className="min-w-0">
        <h2 className="text-[13px] font-black uppercase tracking-[0.2em] text-[#31545a]">{title}</h2>
        <div className="mt-1 h-px w-12 bg-gradient-to-r from-[#ff4f1f]/80 to-transparent" />
      </div>
    </div>
  )
}

export default function BuilderForm({ onSubmit }: { onSubmit: (input: BuilderPassInput) => void }) {
  const [photoDataUrl, setPhotoDataUrl] = useState('')
  const [photoName, setPhotoName] = useState('')
  const [photoTransform, setPhotoTransform] = useState<PhotoTransform>(DEFAULT_PHOTO_TRANSFORM)
  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState('')
  const [error, setError] = useState('')

  const setFile = useCallback(async (file: File) => {
    setError('')
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError('Only JPG, PNG and WEBP are supported.')
      return
    }
    if (file.size > MAX_FILE_SIZE) {
      setError('Maximum upload size is 5MB.')
      return
    }
    setPhotoDataUrl(await readFileAsDataUrl(file))
    setPhotoName(file.name)
    setPhotoTransform(DEFAULT_PHOTO_TRANSFORM)
  }, [])

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/webp': ['.webp'],
    },
    maxSize: MAX_FILE_SIZE,
    multiple: false,
    noClick: true,
    onDrop: (files, rejections) => {
      if (rejections.length) {
        setError(
          rejections[0].errors.some((item) => item.code === 'file-too-large')
            ? 'Maximum upload size is 5MB.'
            : 'Only JPG, PNG and WEBP are supported.'
        )
        return
      }
      if (files[0]) void setFile(files[0])
    },
  })

  const canSubmit = !!photoDataUrl && !!normalizeBuilderName(fullName) && !!role.trim()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!canSubmit) {
      setError('Add your photo, full name and stack / role.')
      return
    }
    onSubmit({
      photoDataUrl,
      photoTransform,
      fullName: normalizeBuilderName(fullName),
      role: normalizeBuilderName(role),
    })
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.06 }}
      onSubmit={handleSubmit}
      className="w-full"
    >
      <div className="flex flex-col gap-6 rounded-[22px] border border-white/10 bg-[#fbf4df] p-5 text-[#072f38] shadow-[0_24px_70px_rgba(2,20,14,0.35)] md:p-6">
        <section>
          <SectionHeader icon={<Camera className="h-4 w-4" />} title="Photo" />

          <div
            {...getRootProps()}
            className={`mt-4 h-[380px] overflow-hidden rounded-2xl border border-dashed border-[#31545a]/30 bg-[#fffaf0] transition duration-200 ${
              isDragActive ? 'border-[#ff4f1f]/60 bg-[#fff6e8]' : 'hover:border-[#ff4f1f]/40'
            }`}
          >
            <input {...getInputProps()} />
            {photoDataUrl ? (
              <>
                <p className="flex items-center justify-between gap-3 px-3 pt-3 text-[10px] font-black uppercase tracking-[0.18em] text-[#31545a]">
                  <span className="flex min-w-0 items-center gap-2">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff4f1f]" />
                    Adjust Photo
                  </span>
                  <span className="truncate text-[9px] font-bold normal-case tracking-normal text-[#0b5a33]">
                    ✓ {photoName}
                  </span>
                </p>
                <div className="px-3 pb-3">
                  <PhotoEditor
                    photoDataUrl={photoDataUrl}
                    transform={photoTransform}
                    onTransformChange={setPhotoTransform}
                    onPhotoChange={(newDataUrl) => {
                      setPhotoDataUrl(newDataUrl)
                      setPhotoTransform(DEFAULT_PHOTO_TRANSFORM)
                    }}
                    onReset={() => setPhotoTransform(DEFAULT_PHOTO_TRANSFORM)}
                  />
                </div>
              </>
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3 px-4 text-center">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-[#072f38] text-[#ffe36a]">
                  <ImagePlus className="h-5 w-5" />
                </span>
                <span className="text-sm font-bold text-[#072f38]">Upload Profile Photo</span>
                <button
                  type="button"
                  onClick={open}
                  className="mt-1 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#ff4f1f] px-6 text-sm font-bold text-white shadow-[0_8px_20px_rgba(255,79,31,0.35)] transition duration-200 hover:bg-[#ff673e] active:scale-[0.98]"
                >
                  <ImagePlus className="h-4 w-4" />
                  Choose Photo
                </button>
                <span className="text-xs font-medium text-[#7d8a84]">JPG, PNG, WEBP · up to 5MB</span>
              </div>
            )}
          </div>
        </section>

        <section>
          <SectionHeader icon={<BadgePlus className="h-4 w-4" />} title="Builder Identity" />
          <div className="mt-4 flex flex-col gap-4">
            <label className="block">
              <span className="mb-2 block text-[11px] font-black uppercase tracking-[0.16em] text-[#31545a]">
                Full Name
              </span>
              <input
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="Ada Lovelace"
                className="h-[50px] w-full rounded-xl border border-[#dfd3b0] bg-[#fffaf0] px-4 text-base font-semibold text-[#072f38] outline-none transition duration-200 placeholder:font-normal placeholder:text-[#9aa594] hover:border-[#cdbf99] focus:border-[#ff4f1f]/60 focus:ring-4 focus:ring-[#ff4f1f]/10"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-[11px] font-black uppercase tracking-[0.16em] text-[#31545a]">
                Stack / Role
              </span>
              <input
                value={role}
                onChange={(event) => setRole(event.target.value)}
                placeholder="Full Stack Developer"
                className="h-[50px] w-full rounded-xl border border-[#dfd3b0] bg-[#fffaf0] px-4 text-base font-semibold text-[#072f38] outline-none transition duration-200 placeholder:font-normal placeholder:text-[#9aa594] hover:border-[#cdbf99] focus:border-[#ff4f1f]/60 focus:ring-4 focus:ring-[#ff4f1f]/10"
              />
            </label>
          </div>
        </section>

        {error && (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={!canSubmit}
          className={`group inline-flex h-[52px] w-full items-center justify-center gap-2.5 rounded-xl text-[15px] font-bold tracking-wide transition-all duration-200 ${
            canSubmit
              ? 'bg-gradient-to-r from-[#ff4f1f] to-[#ff7a1a] text-white shadow-[0_10px_28px_rgba(255,79,31,0.35)] hover:shadow-[0_14px_36px_rgba(255,79,31,0.5)] hover:brightness-110 active:scale-[0.985]'
              : 'cursor-not-allowed bg-[#0d3b33] text-[#7fa596]'
          }`}
        >
          Generate My ID
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </div>
    </motion.form>
  )
}
