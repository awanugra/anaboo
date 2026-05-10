// Vercel serverless function: POST /api/illustrate
// Body: { photo: dataURL, species, breed?, furColor?, eyeColor? }
// Returns: { url: string }
//
// ENV needed (set in Vercel dashboard):
//   REPLICATE_API_TOKEN  — get from https://replicate.com/account/api-tokens

const MODEL_VERSION = 'fofr/sticker-maker:4acb778eb059772225ec213948f0660867b2e03f277448f18cf1800b96a65a1a'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { photo, species = 'cat', breed = '', furColor = '', eyeColor = '' } = req.body || {}
  if (!photo) return res.status(400).json({ error: 'photo required' })

  const token = process.env.REPLICATE_API_TOKEN
  if (!token) return res.status(500).json({ error: 'REPLICATE_API_TOKEN not configured' })

  const prompt = `cute ${breed} ${species} sticker, simple flat illustration, bold black outline, kawaii style, white background, ${furColor} fur, ${eyeColor} eyes, pastel colors, friendly expression`

  try {
    // Step 1: kick off prediction
    const startRes = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: { Authorization: `Token ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        version: MODEL_VERSION.split(':')[1],
        input: {
          prompt,
          image: photo,
          steps: 20,
          width: 512,
          height: 512,
        },
      }),
    })
    const start = await startRes.json()
    if (start.error) return res.status(500).json({ error: start.error })

    // Step 2: poll until done (max ~30s)
    const id = start.id
    let result
    for (let i = 0; i < 30; i++) {
      await new Promise(r => setTimeout(r, 1000))
      const pollRes = await fetch(`https://api.replicate.com/v1/predictions/${id}`, {
        headers: { Authorization: `Token ${token}` },
      })
      result = await pollRes.json()
      if (result.status === 'succeeded' || result.status === 'failed' || result.status === 'canceled') break
    }

    if (result.status !== 'succeeded') {
      return res.status(500).json({ error: `Generation ${result.status}` })
    }

    const url = Array.isArray(result.output) ? result.output[0] : result.output
    return res.status(200).json({ url })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
