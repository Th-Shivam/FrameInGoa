export const DEFAULT_PHOTO_TRANSFORM = {
  zoom: 1,
  offsetX: 0,
  offsetY: 0,
}

export function generateBuilderId() {
  const digits = crypto.getRandomValues(new Uint32Array(1))[0] % 100000000
  return `HH${digits.toString().padStart(8, '0')}`
}

export function getBuilderPassUrl(id: string) {
  if (typeof window !== 'undefined') {
    const origin = window.location.origin
    return `${origin}/id/${id}`
  }
  return `https://frameingoa.com/id/${id}`
}

export function normalizeBuilderName(value: string) {
  return value.trim().replace(/\s+/g, ' ')
}
