import { IDCardData } from '../types/idCard'
import { drawCircularPhoto } from '../utils/drawPhoto'
import { drawCenteredText } from '../utils/drawText'
import { drawQRCode } from '../utils/drawQR'

/**
 * Frame is 1024×1536 — two cards side by side, each 512×1536.
 * We render the front (left) card only, exported at 2× = 1024×3072.
 *
 * All layout constants below are in frame-space (512×1536).
 * The canvas is scaled by SCALE so everything is drawn at native coords.
 */

// ─── SET THIS TO true TO SEE COLORED CROSSHAIRS AT EVERY POSITION ───
const DEBUG = false

const CARD_W = 512
const CARD_H = 1536
const SCALE = 2

// Photo circle (frame-space) — white circle center ~(255, 690), r ~110
const PHOTO_CX = 255
const PHOTO_CY = 690
const PHOTO_R = 108

// Name — drawn just above the pink "BUILDER" placeholder (~y 800)
const NAME_CX = 256
const NAME_Y = 880
const NAME_MAX_W = 360

// Role — overlaid on the pink "BUILDER" area (~y 920)
const ROLE_CX = 195
const ROLE_Y = 1020
const ROLE_MAX_W = 300

// City / Country — below role, above info box (~y 940)
const CITY_X = 145
const CITY_Y = 960
const COUNTRY_X = 290
const COUNTRY_Y = 960

// Hacker ID — inside the dark info box (~y 960)
const ID_CX = 195
const ID_Y = 1050
const ID_MAX_W = 360

// QR code — bottom-left icon area (~y 1070, x 75)
const QR_X = 345
const QR_Y = 990
const QR_SIZE = 100

let cachedFrame: HTMLImageElement | null = null

async function loadFrame(): Promise<HTMLImageElement> {
  if (cachedFrame) return cachedFrame
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => { cachedFrame = img; resolve(img) }
    img.onerror = () => reject(new Error('Failed to load frame.png'))
    img.src = '/frame.png'
  })
}

async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error(`Failed to load: ${src}`))
    img.src = src
  })
}

function debugDot(ctx: CanvasRenderingContext2D, x: number, y: number, label: string, color = '#00ffff') {
  if (!DEBUG) return
  ctx.save()
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc(x, y, 4, 0, Math.PI * 2)
  ctx.fill()
  ctx.strokeStyle = '#000'
  ctx.lineWidth = 0.5
  ctx.stroke()
  ctx.fillStyle = '#fff'
  ctx.font = 'bold 10px monospace'
  ctx.textAlign = 'left'
  ctx.fillText(label, x + 6, y + 4)
  ctx.restore()
}

export async function renderIDCard(data: IDCardData): Promise<string> {
  const canvas = document.createElement('canvas')
  canvas.width = CARD_W * SCALE
  canvas.height = CARD_H * SCALE

  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas 2D context unavailable')

  ctx.scale(SCALE, SCALE)

  // 1. Draw frame — crop to front (left) card only
  const frame = await loadFrame()
  ctx.drawImage(frame, 0, 0, CARD_W, CARD_H, 0, 0, CARD_W, CARD_H)

  // 2. Draw circular photo
  if (data.photoDataUrl) {
    try {
      const photoImg = await loadImage(data.photoDataUrl)
      drawCircularPhoto(ctx, photoImg, PHOTO_CX, PHOTO_CY, PHOTO_R)
    } catch {
      // Photo load failure — skip silently
    }
  }
  debugDot(ctx, PHOTO_CX, PHOTO_CY, `Photo cx=${PHOTO_CX} cy=${PHOTO_CY} r=${PHOTO_R}`, '#ff4444')

  // Ensure Nabla and Megrim fonts are loaded before drawing
  await document.fonts.load('700 26px Nabla')
  await document.fonts.load('700 30px Honk')
  await document.fonts.load('700 33px Kalnia Glaze')

  // 3. Draw Name
  ctx.fillStyle = '#F5EFE4'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'alphabetic'
  drawCenteredText(ctx, data.name.toUpperCase(), NAME_CX, NAME_Y, NAME_MAX_W, 26, '700', '#F5EFE4', 'Nabla')
  debugDot(ctx, NAME_CX, NAME_Y, `Name y=${NAME_Y}`, '#00ffff')

  // 4. Draw Role
  drawCenteredText(ctx, `Role: ${data.role.toUpperCase()}`, ROLE_CX, ROLE_Y, ROLE_MAX_W, 30, '700', '#FF007F', 'Honk')
  debugDot(ctx, ROLE_CX, ROLE_Y, `Role y=${ROLE_Y}`, '#ff00ff')

  // 5. Draw City (near location pin icon)
  ctx.fillStyle = '#b3c7aa'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'alphabetic'
  ctx.font = '500 19px sans-serif'
  const cityText = data.city.length > 16 ? data.city.slice(0, 15) + '…' : data.city
  ctx.fillText(cityText, CITY_X, CITY_Y)
  debugDot(ctx, CITY_X, CITY_Y, `City x=${CITY_X} y=${CITY_Y}`, '#00ff88')

  // 6. Draw Country (near globe icon)
  const countryText = data.country.length > 16 ? data.country.slice(0, 15) + '…' : data.country
  ctx.fillText(countryText, COUNTRY_X, COUNTRY_Y)
  debugDot(ctx, COUNTRY_X, COUNTRY_Y, `Country x=${COUNTRY_X} y=${COUNTRY_Y}`, '#ffaa00')

  // 7. Draw Hacker ID inside info box
  drawCenteredText(ctx, `ID: ${data.hackerId}`, ID_CX, ID_Y, ID_MAX_W, 23, '700', '#FFE600', 'Kalnia Glaze')
  debugDot(ctx, ID_CX, ID_Y, `ID y=${ID_Y}`, '#ffe600')

  // 8. Draw QR Code
  const qrPayload = {
    name: data.name,
    id: data.hackerId,
    role: data.role,
    city: data.city,
    country: data.country,
  }
  try {
    await drawQRCode(ctx, qrPayload, QR_X, QR_Y, QR_SIZE)
  } catch {
    // QR failure is non-fatal
  }
  debugDot(ctx, QR_X, QR_Y, `QR x=${QR_X} y=${QR_Y} size=${QR_SIZE}`, '#88ff00')

  // Crop top and bottom to remove extra whitespace
  const CROP_TOP = 180    // pixels to remove from top (frame-space)
  const CROP_BOTTOM = 180 // pixels to remove from bottom (frame-space)

  const croppedCanvas = document.createElement('canvas')
  croppedCanvas.width = CARD_W * SCALE
  croppedCanvas.height = (CARD_H - CROP_TOP - CROP_BOTTOM) * SCALE

  const croppedCtx = croppedCanvas.getContext('2d')
  if (!croppedCtx) throw new Error('Canvas 2D context unavailable')

  croppedCtx.drawImage(
    canvas,
    0, CROP_TOP * SCALE,                          // source x, y
    CARD_W * SCALE, (CARD_H - CROP_TOP - CROP_BOTTOM) * SCALE, // source w, h
    0, 0,                                          // dest x, y
    CARD_W * SCALE, (CARD_H - CROP_TOP - CROP_BOTTOM) * SCALE  // dest w, h
  )

  return croppedCanvas.toDataURL('image/png')
}
