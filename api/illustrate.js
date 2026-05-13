// /api/illustrate
// 2-stage pipeline:
//   1) Claude Haiku vision analyzes the uploaded photo -> extract pet attributes
//   2) FLUX-schnell text2img generates a B&W mascot illustration based on
//      our fixed style prompt + Claude's analysis
//
// Body: { photo: dataURL?, species, breed?, furColor?, eyeColor? }
// Returns: { url: string, analysis?: string }
//
// ENV required:
//   REPLICATE_API_TOKEN  — https://replicate.com/account/api-tokens
//   ANTHROPIC_API_KEY    — https://console.anthropic.com/

const REPLICATE_MODEL = 'black-forest-labs/flux-schnell'
const CLAUDE_MODEL    = 'claude-haiku-4-5-20251001'

// Static style prompt — derived from user spec.
// This describes the *style*. Subject details will be appended dynamically.
const STYLE_PROMPT = `Vector-style mascot icon of an animal head, high-contrast minimalist logo design.
Show ONLY the head from a 3/4 angle facing right.
Thick bold black outer outline, thinner inner detail lines.
Pure flat fills — NO gradients, NO shadows, NO 3D, NO textures.
Color palette: STRICTLY only black (#000000), white (#FFFFFF), and gray tones. Absolutely no other colors.
Fur or skin areas should be pure clean WHITE; use BLACK or GRAY only for distinctive markings, patches, or shading.
Large black round eyes with small triangular white highlights for friendly liveliness.
Simple black mouth interior with a wide modern mascot smile. If species has distinctive teeth or fangs, show them iconic and minimal.
Capture species-specific anatomy: ear shape, snout/muzzle, whisker pattern, nose, characteristic markings, head contour.
Do NOT include any neck, body, limbs, accessories, props, or background elements.
Background: pure solid white (#FFFFFF).
Style inspiration: classic rubber-hose cartoon mascot meets modern flat vector logo design. Friendly, iconic, brand-ready.`

async function analyzeWithClaude(photoDataUrl, fallback) {
  const key = process.env.ANTHROPIC_API_KEY
  if (!key || !photoDataUrl) return fallback

  // Parse base64 photo
  const match = /^data:(image\/[^;]+);base64,(.+)$/.exec(photoDataUrl)
  if (!match) return fallback

  const mediaType = match[1]
  const data = match[2]

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: CLAUDE_MODEL,
        max_tokens: 220,
        system:
          'You are a pet illustrator assistant. Look at the uploaded pet photo and return a concise, ' +
          'comma-separated list of visual attributes useful for drawing a head-only mascot logo. ' +
          'Cover: species, likely breed, head shape, ear shape (e.g. triangular, floppy, pointed, tufted), ' +
          'snout/muzzle (short, long, flat), eye shape, distinctive markings or patterns (mask, blaze, stripes, spots), ' +
          'color distribution mapped to black/white/gray (e.g. "mostly white with black mask"), ' +
          'and any iconic features (long whiskers, fangs, fluffy ruff, etc.). ' +
          'Output a single line, 50 words max, no preamble, no quotes.',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'image', source: { type: 'base64', media_type: mediaType, data } },
              { type: 'text',  text: 'Describe this pet for a mascot illustrator.' },
            ],
          },
        ],
      }),
    })
    const json = await res.json()
    if (json.error || !json.content?.[0]?.text) return fallback
    return json.content[0].text.trim().replace(/\s+/g, ' ')
  } catch {
    return fallback
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { photo, species = 'cat', breed = '', furColor = '', eyeColor = '' } = req.body || {}
  const token = process.env.REPLICATE_API_TOKEN
  if (!token) return res.status(500).json({ error: 'REPLICATE_API_TOKEN not configured' })

  // Fallback subject description (when no photo / vision fails)
  const colorBits = [furColor && `${furColor} fur`, eyeColor && `${eyeColor} eyes`].filter(Boolean).join(', ')
  const fallbackSubject = [breed ? `${breed} breed` : '', species, colorBits].filter(Boolean).join(', ')

  // Stage 1: Claude analyzes photo (or use fallback)
  let subject = fallbackSubject
  if (photo) {
    subject = await analyzeWithClaude(photo, fallbackSubject) || fallbackSubject
  }

  // Build final prompt for FLUX
  const prompt = `${STYLE_PROMPT}\n\nSubject: ${subject}.`

  // Stage 2: Generate with FLUX-schnell
  try {
    const startRes = await fetch(`https://api.replicate.com/v1/models/${REPLICATE_MODEL}/predictions`, {
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
          output_quality: 92,
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
        subject,
      })
    }

    if (data.status === 'succeeded') {
      const url = Array.isArray(data.output) ? data.output[0] : data.output
      return res.status(200).json({ url, analysis: subject })
    }

    if (data.status === 'failed' || data.status === 'canceled') {
      return res.status(500).json({ error: `Generation ${data.status}`, detail: data.error, subject })
    }

    // Poll
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
      return res.status(500).json({ error: `Generation ${result.status}`, detail: result.error, subject })
    }
    const url = Array.isArray(result.output) ? result.output[0] : result.output
    return res.status(200).json({ url, analysis: subject })
  } catch (err) {
    return res.status(500).json({ error: 'Server error', detail: err.message })
  }
}
