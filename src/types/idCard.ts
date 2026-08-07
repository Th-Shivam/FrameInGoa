export interface IDCardData {
  name: string
  role: string
  city: string
  country: string
  github?: string
  linkedin?: string
  emergencyContact?: string
  hackerId: string
  photoDataUrl: string
}

export interface CropArea {
  x: number
  y: number
  width: number
  height: number
}

export type GeneratorStep = 'form' | 'crop' | 'preview'
