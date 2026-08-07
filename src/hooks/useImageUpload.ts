import { useState, useCallback } from 'react'
import { FileRejection } from 'react-dropzone'

export interface UploadedImageData {
  file: File
  previewUrl: string
  fileName: string
  fileSize: number
  fileSizeFormatted: string
  imageWidth: number
  imageHeight: number
}

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB
const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']

export function useImageUpload(onUploadSuccess?: (data: UploadedImageData) => void) {
  const [imageData, setImageData] = useState<UploadedImageData | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 4000)
  }, [])

  const clearToast = useCallback(() => {
    setToastMessage(null)
  }, [])

  const removeImage = useCallback(() => {
    if (imageData?.previewUrl) {
      URL.revokeObjectURL(imageData.previewUrl)
    }
    setImageData(null)
  }, [imageData])

  const handleFileDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      // Check for file rejections first
      if (fileRejections.length > 0) {
        const rejection = fileRejections[0]
        const isSizeError = rejection.errors.some(
          (e) => e.code === 'file-too-large' || e.message.includes('size')
        )
        if (isSizeError) {
          showToast('Maximum upload size is 5MB.')
        } else {
          showToast('Only JPG, PNG and WEBP are supported.')
        }
        return
      }

      if (!acceptedFiles || acceptedFiles.length === 0) return

      const file = acceptedFiles[0]

      // Additional strict checks
      if (!ACCEPTED_TYPES.includes(file.type)) {
        showToast('Only JPG, PNG and WEBP are supported.')
        return
      }

      if (file.size > MAX_FILE_SIZE) {
        showToast('Maximum upload size is 5MB.')
        return
      }

      // Create preview object URL
      const previewUrl = URL.createObjectURL(file)

      // Calculate image dimensions
      const img = new Image()
      img.onload = () => {
        const sizeMb = (file.size / (1024 * 1024)).toFixed(1)
        const formattedSize = `${sizeMb} MB`

        const newImageData: UploadedImageData = {
          file,
          previewUrl,
          fileName: file.name,
          fileSize: file.size,
          fileSizeFormatted: formattedSize,
          imageWidth: img.naturalWidth,
          imageHeight: img.naturalHeight,
        }

        setImageData(newImageData)
        if (onUploadSuccess) {
          onUploadSuccess(newImageData)
        }
      }
      img.onerror = () => {
        showToast('Failed to load image preview.')
      }
      img.src = previewUrl
    },
    [showToast, onUploadSuccess]
  )

  return {
    imageData,
    toastMessage,
    handleFileDrop,
    removeImage,
    clearToast,
  }
}
