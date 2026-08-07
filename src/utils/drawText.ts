export function drawFitText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  baseFontSize: number,
  fontStyle: string,
  fontFamily = 'sans-serif'
): void {
  let fontSize = baseFontSize
  ctx.font = `${fontStyle} ${fontSize}px ${fontFamily}`

  while (ctx.measureText(text).width > maxWidth && fontSize > 8) {
    fontSize -= 1
    ctx.font = `${fontStyle} ${fontSize}px ${fontFamily}`
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
  color: string,
  fontFamily = 'sans-serif'
): void {
  ctx.fillStyle = color
  ctx.textAlign = 'center'
  drawFitText(ctx, text, cx, y, maxWidth, baseFontSize, fontStyle, fontFamily)
  ctx.textAlign = 'left'
}
