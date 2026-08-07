import QRCode from 'qrcode'

export async function drawQRCode(
  ctx: CanvasRenderingContext2D,
  data: object,
  x: number,
  y: number,
  size: number
): Promise<void> {
  const qrDataUrl = await QRCode.toDataURL(JSON.stringify(data), {
    width: size,
    margin: 1,
    color: { dark: '#000000', light: '#ffffff' },
    errorCorrectionLevel: 'M',
  })

  await new Promise<void>((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      ctx.drawImage(img, x, y, size, size)
      resolve()
    }
    img.onerror = reject
    img.src = qrDataUrl
  })
}
