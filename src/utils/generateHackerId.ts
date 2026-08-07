export function generateHackerId(): string {
  const num = Math.floor(Math.random() * 99999) + 1
  return `HHG26-${String(num).padStart(5, '0')}`
}
