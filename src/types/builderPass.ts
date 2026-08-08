export interface BuilderPassInput {
  photoDataUrl: string
  fullName: string
  role: string
  photoTransform: PhotoTransform
}

export interface PhotoTransform {
  zoom: number
  offsetX: number
  offsetY: number
}

export interface BuilderPassData extends BuilderPassInput {
  id: string
  createdAt: string
  photoTransform: PhotoTransform
}
