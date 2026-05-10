# Anaboo Deploy Guide

## Deploy ke Vercel (Recommended)

### Setup awal
1. Push project ke GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial Anaboo"
   gh repo create anaboo --public --push
   ```

2. Buka https://vercel.com → "New Project" → pilih repo `anaboo`
3. Vercel auto-detect Vite. Klik **Deploy**.

### Setup API keys (untuk fitur AI)

Di Vercel dashboard → **Settings** → **Environment Variables**, tambah:

| Key | Value | Untuk apa |
|---|---|---|
| `REPLICATE_API_TOKEN` | dari https://replicate.com/account/api-tokens | Generate ilustrasi anabul (3D mascot) |
| `ANTHROPIC_API_KEY` | dari https://console.anthropic.com/ | AI vet chat + smart text features |

Setelah set env var, redeploy: **Deployments** tab → "..." → **Redeploy**.

### Cek API endpoints

Setelah deploy:
- `POST https://YOUR-DOMAIN.vercel.app/api/illustrate` → generate ilustrasi
- `POST https://YOUR-DOMAIN.vercel.app/api/vet-chat` → AI vet chat

### Cost estimate
- **Replicate** (sticker-maker model): ~$0.01–0.03 per gambar
- **Claude Haiku 4.5**: ~$1 per 1M input tokens, ~$5 per 1M output tokens — chat 1 reply ≈ <$0.001
- **Vercel**: gratis untuk hobby tier (100GB bandwidth/bulan, ribuan API invocations)

### Local dev dengan API
```bash
# Install Vercel CLI
npm i -g vercel

# Login & link project
vercel login
vercel link

# Pull env vars dari Vercel
vercel env pull .env.local

# Run dengan API support
vercel dev
```
Lalu buka http://localhost:3000 — sekarang `/api/*` jalan dari local.
