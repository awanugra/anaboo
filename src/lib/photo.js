// Phase 1: just turn an uploaded File into a base64 data URL we can store in localStorage.
// Phase 2 (future): pipe to AI illustration generator.
export function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null)
    const reader = new FileReader()
    reader.onload  = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

// Tiny client-side compressor — keeps localStorage from blowing up
export async function compressImage(file, maxSize = 400, quality = 0.85) {
  const dataUrl = await fileToDataUrl(file)
  if (!dataUrl) return null
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const scale = Math.min(1, maxSize / Math.max(img.width, img.height))
      const w = Math.round(img.width  * scale)
      const h = Math.round(img.height * scale)
      const canvas = document.createElement('canvas')
      canvas.width  = w
      canvas.height = h
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, w, h)
      resolve(canvas.toDataURL('image/jpeg', quality))
    }
    img.onerror = () => resolve(dataUrl) // fallback
    img.src = dataUrl
  })
}
