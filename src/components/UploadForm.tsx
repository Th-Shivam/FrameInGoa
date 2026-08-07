import { useRef } from 'react'
import { Upload, User, Briefcase, MapPin, Globe, Github, Linkedin, Phone } from 'lucide-react'
import { IDCardData } from '../types/idCard'

interface FormState {
  name: string
  role: string
  city: string
  country: string
  github: string
  linkedin: string
  emergencyContact: string
}

interface Props {
  formState: FormState
  photoPreview: string | null
  onFormChange: (field: keyof FormState, value: string) => void
  onPhotoSelect: (file: File) => void
  onSubmit: () => void
}

const FIELD_CLASS =
  'w-full bg-[#0a3320] border border-[#FFE600]/20 rounded-xl px-4 py-3 text-[#f5efe4] text-sm placeholder-[#4a7a5a] focus:outline-none focus:border-[#FF007F]/60 focus:ring-1 focus:ring-[#FF007F]/30 transition-all'

export default function UploadForm({ formState, photoPreview, onFormChange, onPhotoSelect, onSubmit }: Props) {
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) onPhotoSelect(file)
  }

  const isValid = formState.name.trim() && formState.role.trim() && formState.city.trim() && formState.country.trim() && photoPreview

  return (
    <div className="w-full max-w-lg mx-auto space-y-5">
      {/* Photo Upload */}
      <div
        onClick={() => fileRef.current?.click()}
        className="relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 border-dashed border-[#FFE600]/30 bg-[#0a3320] cursor-pointer hover:border-[#FF007F]/50 hover:bg-[#0d3d26] transition-all group"
      >
        {photoPreview ? (
          <img
            src={photoPreview}
            alt="Preview"
            className="w-24 h-24 rounded-full object-cover border-2 border-[#FF007F]/60"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-[#0B4D2B] border-2 border-dashed border-[#FFE600]/30 flex items-center justify-center group-hover:border-[#FF007F]/50 transition-colors">
            <Upload className="w-7 h-7 text-[#4a7a5a] group-hover:text-[#FF007F] transition-colors" />
          </div>
        )}
        <div className="text-center">
          <p className="text-[#f5efe4] text-sm font-medium">
            {photoPreview ? 'Click to change photo' : 'Upload your photo'}
          </p>
          <p className="text-[#4a7a5a] text-xs mt-0.5">JPG, PNG, WEBP · Max 10MB</p>
        </div>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>

      {/* Required Fields */}
      <div className="grid grid-cols-1 gap-3">
        <div className="relative">
          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a7a5a]" />
          <input
            className={`${FIELD_CLASS} pl-10`}
            placeholder="Full Name *"
            value={formState.name}
            onChange={(e) => onFormChange('name', e.target.value)}
            maxLength={40}
          />
        </div>

        <div className="relative">
          <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a7a5a]" />
          <input
            className={`${FIELD_CLASS} pl-10`}
            placeholder="Role (e.g. AI Engineer) *"
            value={formState.role}
            onChange={(e) => onFormChange('role', e.target.value)}
            maxLength={30}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a7a5a]" />
            <input
              className={`${FIELD_CLASS} pl-10`}
              placeholder="City *"
              value={formState.city}
              onChange={(e) => onFormChange('city', e.target.value)}
              maxLength={20}
            />
          </div>
          <div className="relative">
            <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a7a5a]" />
            <input
              className={`${FIELD_CLASS} pl-10`}
              placeholder="Country *"
              value={formState.country}
              onChange={(e) => onFormChange('country', e.target.value)}
              maxLength={20}
            />
          </div>
        </div>
      </div>

      {/* Optional Fields */}
      <div className="space-y-3">
        <p className="text-[#4a7a5a] text-xs font-mono uppercase tracking-widest">Optional</p>
        <div className="relative">
          <Github className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a7a5a]" />
          <input
            className={`${FIELD_CLASS} pl-10`}
            placeholder="GitHub username"
            value={formState.github}
            onChange={(e) => onFormChange('github', e.target.value)}
            maxLength={39}
          />
        </div>
        <div className="relative">
          <Linkedin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a7a5a]" />
          <input
            className={`${FIELD_CLASS} pl-10`}
            placeholder="LinkedIn username"
            value={formState.linkedin}
            onChange={(e) => onFormChange('linkedin', e.target.value)}
            maxLength={60}
          />
        </div>
        <div className="relative">
          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a7a5a]" />
          <input
            className={`${FIELD_CLASS} pl-10`}
            placeholder="Emergency contact (name & phone)"
            value={formState.emergencyContact}
            onChange={(e) => onFormChange('emergencyContact', e.target.value)}
            maxLength={50}
          />
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={onSubmit}
        disabled={!isValid}
        className="w-full py-4 rounded-xl bg-[#FF007F] text-white font-bold text-base tracking-wide hover:bg-[#e0006e] disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
      >
        Generate ID Card →
      </button>
    </div>
  )
}
