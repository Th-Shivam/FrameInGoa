import React from 'react'
import { useDropzone } from 'react-dropzone'
import { UploadCloud, Trash2, RefreshCw, AlertCircle, X } from 'lucide-react'
import { useImageUpload, UploadedImageData } from '@/hooks/useImageUpload'
import { navigateTo } from '@/lib/appRouter'

interface UploadBoxProps {
  onImageSelect?: (data: UploadedImageData | null) => void
}

export default function UploadBox({ onImageSelect }: UploadBoxProps) {
  const shouldNavigateToCreate = !onImageSelect
  const { imageData, toastMessage, handleFileDrop, removeImage, clearToast } = useImageUpload(
    (data) => {
      if (onImageSelect) onImageSelect(data)
    }
  )

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop: handleFileDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/webp': ['.webp'],
    },
    maxSize: 5 * 1024 * 1024,
    multiple: false,
    noClick: shouldNavigateToCreate,
    noKeyboard: shouldNavigateToCreate,
  })

  const navigateToCreate = () => navigateTo('/create-id')

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    removeImage()
    if (onImageSelect) onImageSelect(null)
  }

  const handleChangePhoto = (e: React.MouseEvent) => {
    e.stopPropagation()
    open()
  }

  return (
    <div className="relative w-[min(100%,300px)] sm:w-[320px] md:w-[340px] lg:w-[360px] max-w-full">
      {/* ── Toast Notification ── */}
      {toastMessage && (
        <div
          role="alert"
          className="absolute -top-12 left-0 right-0 z-50 flex items-center justify-between gap-2 px-4 py-2 text-xs font-medium text-white bg-red-600/90 backdrop-blur-md rounded-xl shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-white flex-shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button
            onClick={clearToast}
            className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Dismiss error notification"
          >
            <X className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      )}

      {/* ── Main Dropzone Container ── */}
      {!imageData ? (
        <div
          {...getRootProps()}
          onClick={shouldNavigateToCreate ? navigateToCreate : undefined}
          tabIndex={0}
          role="button"
          aria-label="Upload photo drag and drop area"
          className={`relative w-full aspect-[36/22] min-h-[194px] sm:min-h-0 sm:h-[184px] lg:h-[194px] p-[22px] rounded-[28px] border-2 border-dashed cursor-pointer flex flex-col items-center justify-center text-center transition-all duration-250 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4C430] ${
            isDragActive
              ? 'border-[#FFE600] bg-[#0B5A33]/40 shadow-[0_0_20px_rgba(244,196,48,0.25)] scale-[1.01]'
              : 'border-[#F4C430] bg-[#0B5A33]/20 hover:bg-[#0B5A33]/30'
          }`}
        >
          <input {...getInputProps()} />

          {/* Golden Yellow Upload Icon (52px) */}
          <UploadCloud
            className="w-[52px] h-[52px] text-[#F4C430] mb-2 flex-shrink-0"
            strokeWidth={1.75}
          />

          {/* Heading */}
          <p className="text-white font-bold text-[15px] leading-tight mb-1">
            Drag &amp; Drop Your Photo Here
          </p>

          {/* Subtitle */}
          <p className="text-white/65 text-xs mb-2">or</p>

          {/* Browse Files Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              if (shouldNavigateToCreate) {
                navigateToCreate()
                return
              }
              open()
            }}
            className="bg-[#FF1F8F] text-white font-semibold text-xs min-h-[48px] py-[10px] px-[28px] rounded-[14px] hover:brightness-110 transition-all cursor-pointer shadow-md mb-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4C430]"
          >
            Browse Files
          </button>

          {/* File Info */}
          <p className="text-[#f5efe4]/70 text-[11px] font-mono tracking-wide">
            JPG, PNG (Max 5MB)
          </p>
        </div>
      ) : (
        /* ── Uploaded File Preview State ── */
        <div className="relative w-full min-h-[204px] sm:min-h-0 sm:h-[184px] lg:h-[194px] p-[18px] rounded-[28px] border-2 border-solid border-[#F4C430]/60 bg-[#0B5A33]/40 flex flex-col items-center justify-between text-center transition-all duration-250">
          <div className="flex items-center gap-4 w-full text-left bg-black/20 p-3 rounded-2xl border border-white/10 mb-4">
            {/* Image Thumbnail */}
            <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-black/40 border border-white/20 flex-shrink-0">
              <img
                src={imageData.previewUrl}
                alt="Uploaded photo preview"
                className="w-full h-full object-cover"
              />
            </div>

            {/* File Details */}
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm truncate" title={imageData.fileName}>
                {imageData.fileName}
              </p>
              <p className="text-[#f5efe4]/70 text-xs font-mono">
                {imageData.fileSizeFormatted} · {imageData.imageWidth}×{imageData.imageHeight}px
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 w-full">
            <button
              type="button"
              onClick={handleChangePhoto}
              className="flex items-center gap-1.5 bg-[#FF1F8F] text-white font-semibold text-xs min-h-[48px] py-2.5 px-4 rounded-[12px] hover:brightness-110 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4C430]"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Change Photo
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="flex items-center gap-1.5 bg-red-600/80 hover:bg-red-600 text-white font-semibold text-xs min-h-[48px] py-2.5 px-3.5 rounded-[12px] transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4C430]"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
