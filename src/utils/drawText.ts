export function drawFitText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  baseFontSize: number,
  fontStyle: string
): void {
  let fontSize = baseFontSize
  ctx.font = `${fontStyle} ${fontSize}px sans-serif`

  while (ctx.measureText(text).width > maxWidth && fontSize > 8) {
    fontSize -= 1
    ctx.font = `${fontStyle} ${fontSize}px sans-serif`
  }

  ctx.fillText(text, x, y)
}

export function drawCenteredText(
  ctx: CanvasRenderingContext2D,
  text: string,
  cx: number,
  y: number,
  maxWidth: number,
  baseFontSize: number,
  fontStyle: string,
  color: string
): void {
  ctx.fillStyle = color
  ctx.textAlign = 'center'
  drawFitText(ctx, text, cx, y, maxWidth, baseFontSize, fontStyle)
  ctx.textAlign = 'left'
}
