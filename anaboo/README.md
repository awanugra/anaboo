# 🐾 Anaboo – Teman Vaksin Kucingmu

> A playful cat vaccine tracker UI for Indonesia, built with vanilla HTML/CSS/JS.

---

## 📁 Project Structure

```
anaboo/
├── index.html          ← Main HTML (all screens)
├── css/
│   ├── variables.css   ← Design tokens (colors, fonts, radius)
│   ├── animations.css  ← Keyframe animations (float, wiggle, pulse, shake)
│   ├── base.css        ← Reset, body, phone shell, shared elements
│   ├── components.css  ← Reusable components (cards, edu boxes, bubbles)
│   └── screens.css     ← Screen-specific styles (onboarding, dashboard, etc.)
├── js/
│   ├── app.js          ← Navigation, interactions, vaccine data
│   └── mascot.js       ← SVG cat mascot helper functions
└── assets/             ← (reserved for images/icons)
```

---

## 🎨 Design Tokens

| Token          | Value     | Usage               |
|----------------|-----------|---------------------|
| `--yellow`     | `#FFD600` | Primary background  |
| `--blue`       | `#015FEE` | CTA buttons, links  |
| `--pink`       | `#FF4896` | Accent, streaks     |
| `--green`      | `#22C55E` | Done status         |
| `--red`        | `#EF4444` | Overdue/warning     |

---

## 📱 Screens

| Screen         | ID               | Description                          |
|----------------|------------------|--------------------------------------|
| Onboarding     | `#onboarding`    | Pet name, birthday, lifestyle input  |
| Dashboard      | `#dashboard`     | Overview, next vaccine, stats        |
| Timeline       | `#timeline`      | Vaccine milestones with edu cards    |
| Add Vaccine    | `#addvaccine`    | Form to log a vaccine record         |
| Reminders      | `#reminders`     | Upcoming vaccine schedule            |
| Education      | `#vaccinedetail` | Full vaccine guide for Indonesia     |

---

## 💉 Vaccines Covered (Indonesia)

| Vaksin       | Usia        | Harga Estimasi     | Keterangan      |
|--------------|-------------|--------------------|-----------------|
| Tricat / F3  | 8–10 minggu | Rp80.000–250.000   | Inti – wajib    |
| Tetracat / F4| 12–14 minggu| Rp170.000–210.000  | Inti – wajib    |
| Rabies       | 20 minggu   | ~Rp100.000         | Wajib, zoonosis |
| FeLV         | Sesuai anjuran| Rp100.000–200.000| Non-inti        |

---

## 🚀 Next Steps (Claude Code)

```bash
# Run locally
npx serve .

# Convert to React
# Ask Claude Code: "Convert this vanilla HTML/CSS/JS to a React + Vite project"

# Add backend
# Ask Claude Code: "Add a Node.js/Express API with SQLite to store vaccine records"

# Deploy
# Ask Claude Code: "Deploy this to Vercel"
```

---

## 🐱 Mascot Functions (`js/mascot.js`)

```js
mascotHappy(width, height)   // Dashboard – happy cat
mascotWorried(width, height) // Reminders – worried cat
mascotFull(width, height)    // Onboarding – full body cat
```
