declare module 'qrcode' {
  interface QRCodeCanvasOptions {
    errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H'
    margin?: number
    scale?: number
    width?: number
    color?: {
      dark?: string
      light?: string
    }
  }

  const QRCode: {
    toCanvas(
      canvas: HTMLCanvasElement,
      text: string,
      options?: QRCodeCanvasOptions
    ): Promise<void>
  }

  export default QRCode
}
