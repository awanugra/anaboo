// Vercel serverless function: POST /api/vet-chat
// Uses Claude API for AI vet assistant + smart text features
// Body: { messages: [{role, content}], pet?: {species, breed, age, weight} }
// Returns: { reply: string }
//
// ENV needed (set in Vercel dashboard):
//   ANTHROPIC_API_KEY  — get from https://console.anthropic.com/

const SYSTEM_PROMPT = `Kamu adalah Anaboo, AI asisten perawatan hewan peliharaan yang ramah & informatif.
- Jawab dengan bahasa Indonesia santai (kecuali user pakai bahasa Inggris)
- Style: cute, supportive, kayak teman ngobrol, gunakan emoji 🐾 sesekali
- Untuk masalah serius (gejala parah, darurat): SELALU sarankan ke dokter hewan, jangan diagnosa sendiri
- Untuk pertanyaan umum (nutrisi, perawatan, training): kasih tips praktis
- Jawaban singkat (2-4 kalimat) kecuali user minta detail`

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { messages = [], pet } = req.body || {}
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured' })

  const petContext = pet
    ? `\n\nKonteks anabul user: ${pet.species} ${pet.breed || ''}, umur ${pet.age || '–'}, BB ${pet.weight || '–'} kg.`
    : ''

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 512,
        system: SYSTEM_PROMPT + petContext,
        messages,
      }),
    })
    const data = await response.json()
    if (data.error) return res.status(500).json({ error: data.error.message })

    const reply = data.content?.[0]?.text || ''
    return res.status(200).json({ reply })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
