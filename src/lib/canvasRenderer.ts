import QRCode from 'qrcode'
import type { BuilderPassData, PhotoTransform } from '@/types/builderPass'
import { getBuilderPassUrl } from '@/lib/builderPass'

const TEMPLATE_SRC = '/card.png'

// Temporary diagnostic flag: set to true to render the card WITHOUT the QR code
// to confirm whether QR generation/drawing is involved in a failure.
const DISABLE_QR = false

// All coordinates are fractions of the template's natural dimensions (1024 x 1536).
const PHOTO = { cx: 0.303, cy: 0.306, size: 0.371 }
const QR = { x: 0.06, y: 0.715, size: 0.17 }
const TEXT = {
  nameY: 0.585,
  roleY: 0.635,
  idY: 0.87,
  idX: 0.52,
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error(`Unable to load image: ${src}`))
    image.src = src
  })
}

function fitText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, startSize: number, weight = 800) {
  let size = startSize
  do {
    ctx.font = `${weight} ${size}px "Space Grotesk", "Inter", system-ui, sans-serif`
    if (ctx.measureText(text).width <= maxWidth) break
    size -= 2
  } while (size > 24)
}

function drawCircularPhoto(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  circle: { cx: number; cy: number; size: number },
  transform: PhotoTransform
) {
  const radius = circle.size / 2
  const centerX = circle.cx
  const centerY = circle.cy
  const coverScale = Math.max(circle.size / image.naturalWidth, circle.size / image.naturalHeight)
  const drawWidth = image.naturalWidth * coverScale * transform.zoom
  const drawHeight = image.naturalHeight * coverScale * transform.zoom
  const drawX = centerX - drawWidth / 2 + transform.offsetX * circle.size
  const drawY = centerY - drawHeight / 2 + transform.offsetY * circle.size

  ctx.save()
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius * 0.94, 0, Math.PI * 2)
  ctx.clip()
  ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight)
  ctx.restore()
}

async function createQrCanvas(text: string, size: number) {
  const qrCanvas = document.createElement('canvas')
  qrCanvas.width = size
  qrCanvas.height = size
  await QRCode.toCanvas(qrCanvas, text, {
    errorCorrectionLevel: 'H',
    margin: 1,
    width: size,
    color: {
      dark: '#062d37',
      light: '#fff7e6',
    },
  })
  return qrCanvas
}

export async function renderBuilderPass(canvas: HTMLCanvasElement, pass: BuilderPassData) {
  console.log('[ID] Final render started')

  console.log('[ID] Loading ID template')
  const template = await loadImage(TEMPLATE_SRC)
  console.log('[ID] ID template loaded')

  console.log('[ID] Loading user photo')
  const photo = await loadImage(pass.photoDataUrl)
  console.log('[ID] User photo loaded')

  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Unable to create 2D canvas context for the final render.')

  canvas.width = template.naturalWidth
  canvas.height = template.naturalHeight

  const width = canvas.width
  const height = canvas.height
  ctx.clearRect(0, 0, width, height)

  console.log('[ID] Drawing template')
  ctx.drawImage(template, 0, 0, width, height)
  console.log('[ID] Template drawn')

  console.log('[ID] Drawing user photo')
  drawCircularPhoto(
    ctx,
    photo,
    {
      cx: PHOTO.cx * width,
      cy: PHOTO.cy * height,
      size: PHOTO.size * width,
    },
    pass.photoTransform
  )
  console.log('[ID] User photo drawn')

  ctx.save()
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  console.log('[ID] Drawing name')
  ctx.fillStyle = '#082f3b'
  fitText(ctx, pass.fullName.toUpperCase(), width * 0.42, width * 0.048, 900)
  ctx.fillText(pass.fullName.toUpperCase(), width * 0.505, height * TEXT.nameY)
  console.log('[ID] Name drawn')

  console.log('[ID] Drawing role')
  ctx.fillStyle = '#0b5a33'
  fitText(ctx, pass.role.toUpperCase(), width * 0.32, width * 0.028, 800)
  ctx.fillText(pass.role.toUpperCase(), width * 0.505, height * TEXT.roleY)
  console.log('[ID] Role drawn')

  console.log('[ID] Drawing builder ID')
  ctx.fillStyle = '#082f3b'
  ctx.textAlign = 'left'
  fitText(ctx, pass.id, width * 0.28, width * 0.03, 900)
  ctx.fillText(pass.id, width * TEXT.idX, height * TEXT.idY)
  ctx.restore()
  console.log('[ID] Builder ID drawn')

  const qrSize = QR.size * width
  if (DISABLE_QR) {
    console.log('[ID] QR generation skipped (temporary diagnostic flag)')
  } else {
    console.log('[ID] Generating QR')
    const qrCanvas = await createQrCanvas(getBuilderPassUrl(pass.id), Math.round(qrSize))
    console.log('[ID] QR generated')
    console.log('[ID] Drawing QR')
    ctx.drawImage(qrCanvas, QR.x * width, QR.y * height, qrSize, qrSize)
    console.log('[ID] QR drawn')
  }
}
