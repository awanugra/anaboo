// Vercel serverless function: POST /api/illustrate
// Body: { species, breed?, furColor?, eyeColor? }
// Returns: { url: string }

// Reliable, fast text-to-image (~3 sec)
const MODEL = 'black-forest-labs/flux-schnell'

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
  const prompt = `cute baby ${breedBit}${animal}, ${colorBits}, kawaii sticker style, big sparkly eyes, simple illustration, white background, centered, friendly happy expression, pastel colors, 3d render, pixar style`

  try {
    const startRes = await fetch(`https://api.replicate.com/v1/models/${MODEL}/predictions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Prefer: 'wait=25',
      },
      body: JSON.stringify({
        input: {
          prompt,
          aspect_ratio: '1:1',
          output_format: 'webp',
          output_quality: 90,
          num_inference_steps: 4,
        },
      }),
    })

    const text = await startRes.text()
    let data
    try { data = JSON.parse(text) } catch { data = { _raw: text } }

    if (!startRes.ok) {
      return res.status(500).json({
        error: 'Replicate error',
        status: startRes.status,
        detail: data.detail || data.error || data._raw || data,
      })
    }

    if (data.status === 'succeeded') {
      const url = Array.isArray(data.output) ? data.output[0] : data.output
      return res.status(200).json({ url })
    }

    if (data.status === 'failed' || data.status === 'canceled') {
      return res.status(500).json({ error: `Generation ${data.status}`, detail: data.error })
    }

    // Poll for completion if not done
    const id = data.id
    if (!id) return res.status(500).json({ error: 'No prediction id', detail: data })

    let result = data
    for (let i = 0; i < 20; i++) {
      await new Promise(r => setTimeout(r, 1500))
      const pollRes = await fetch(`https://api.replicate.com/v1/predictions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      result = await pollRes.json()
      if (['succeeded', 'failed', 'canceled'].includes(result.status)) break
    }

    if (result.status !== 'succeeded') {
      return res.status(500).json({ error: `Generation ${result.status}`, detail: result.error })
    }

    const url = Array.isArray(result.output) ? result.output[0] : result.output
    return res.status(200).json({ url })
  } catch (err) {
    return res.status(500).json({ error: 'Server error', detail: err.message })
  }
}
