import { CropArea } from '../types/idCard'

export async function getCroppedImg(
  imageSrc: string,
  cropArea: CropArea
): Promise<string> {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = imageSrc
  })

  const canvas = document.createElement('canvas')
  const size = Math.min(cropArea.width, cropArea.height)
  canvas.width = size
  canvas.height = size

  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas context unavailable')

  ctx.drawImage(
    image,
    cropArea.x,
    cropArea.y,
    cropArea.width,
    cropArea.height,
    0,
    0,
    size,
    size
  )

  return canvas.toDataURL('image/jpeg', 0.92)
}
