export function drawCircularPhoto(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cx: number,
  cy: number,
  radius: number
): void {
  ctx.save()
  ctx.beginPath()
  ctx.arc(cx, cy, radius, 0, Math.PI * 2)
  ctx.closePath()
  ctx.clip()

  const size = radius * 2
  ctx.drawImage(img, cx - radius, cy - radius, size, size)
  ctx.restore()
}
