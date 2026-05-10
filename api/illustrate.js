// Vercel serverless function: POST /api/illustrate
// Body: { photo: dataURL, species, breed?, furColor?, eyeColor? }
// Returns: { url: string }
//
// ENV needed (set in Vercel dashboard):
//   REPLICATE_API_TOKEN  — get from https://replicate.com/account/api-tokens

// Use model endpoint (auto-uses latest version, no version hash needed)
const MODEL = 'fofr/sticker-maker'

const SPECIES_LABEL = {
  cat:     'cat',
  dog:     'dog',
  bird:    'bird',
  rabbit:  'rabbit',
  reptile: 'reptile',
  fish:    'fish',
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { species = 'cat', breed = '', furColor = '', eyeColor = '' } = req.body || {}

  const token = process.env.REPLICATE_API_TOKEN
  if (!token) return res.status(500).json({ error: 'REPLICATE_API_TOKEN not configured' })

  const animal = SPECIES_LABEL[species] || 'pet'
  const colorBits = [furColor && `${furColor} fur`, eyeColor && `${eyeColor} eyes`].filter(Boolean).join(', ')
  const breedBit = breed ? `${breed} breed, ` : ''
  const prompt = `cute baby ${breedBit}${animal}, ${colorBits}, sticker style, kawaii, big eyes, simple illustration, white background, centered, friendly expression`

  try {
    // Step 1: kick off prediction (using model endpoint = latest version)
    const startRes = await fetch(`https://api.replicate.com/v1/models/${MODEL}/predictions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Prefer: 'wait=30', // sync mode — wait up to 30s for result
      },
      body: JSON.stringify({
        input: {
          prompt,
          steps: 17,
          width: 768,
          height: 768,
          output_format: 'webp',
          output_quality: 90,
        },
      }),
    })

    const data = await startRes.json()
    if (data.error) return res.status(500).json({ error: typeof data.error === 'string' ? data.error : JSON.stringify(data.error) })

    // If sync mode returned succeeded, output is ready
    if (data.status === 'succeeded') {
      const url = Array.isArray(data.output) ? data.output[0] : data.output
      return res.status(200).json({ url })
    }

    // Otherwise poll for completion
    const id = data.id
    let result = data
    for (let i = 0; i < 25; i++) {
      await new Promise(r => setTimeout(r, 1500))
      const pollRes = await fetch(`https://api.replicate.com/v1/predictions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      result = await pollRes.json()
      if (result.status === 'succeeded' || result.status === 'failed' || result.status === 'canceled') break
    }

    if (result.status !== 'succeeded') {
      return res.status(500).json({ error: result.error || `Generation ${result.status}` })
    }

    const url = Array.isArray(result.output) ? result.output[0] : result.output
    return res.status(200).json({ url })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
