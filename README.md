# Maanit Khatkar — CV Website

A modern, interactive CV built with React + Vite.

## 🚀 Quick Start

```bash
# 1. Unzip and enter the project
cd maanit-cv

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

Open http://localhost:5173 — you're live.

## 📁 Project Structure

```
maanit-cv/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Cursor.jsx          # Custom animated cursor
│   │   ├── Nav.jsx             # Sticky navigation
│   │   ├── Hero.jsx            # Landing hero section
│   │   ├── Skills.jsx          # Animated skill bars
│   │   ├── Projects.jsx        # Expandable project cards
│   │   ├── Education.jsx       # Education + achievements
│   │   ├── Contact.jsx         # Contact form (Phase 2 ready)
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── index.css               # Global styles + CSS variables
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## 🔧 Customisation

- **Project links**: Open `Projects.jsx` and update the `github` / `live` fields per project
- **Profile photo**: Add an `<img>` tag in `Hero.jsx` pointing to your photo
- **Colours**: Edit CSS variables in `src/index.css` under `:root`
- **Resume PDF**: Drop your `resume.pdf` into the `/public` folder

## 📦 Build for Production

```bash
npm run build
# Output goes to /dist — ready to deploy
```

## 🌐 Deploy to Vercel (free)

```bash
# Option A — Vercel CLI
npm i -g vercel
vercel

# Option B — Drag & drop
# 1. Run: npm run build
# 2. Go to vercel.com → New Project → drag /dist folder
```

Then connect your custom domain in Vercel dashboard → Settings → Domains.

## ⚡ Phase 2 — Backend (coming next)

The contact form is wired up for UI only. Phase 2 will add:
- **Supabase** database to store every submission
- **Gmail API** to auto-draft notification emails
- API endpoint in `Contact.jsx` (look for the `TODO Phase 2` comment)

## 🎨 Design

- **Typography**: DM Serif Display (headings) + DM Sans (body)
- **Palette**: Warm paper `#f5f2eb` · Ink `#1a1a18` · Accent orange `#c4601a`
- **Aesthetic**: Light editorial — inspired by print design & quality journalism
