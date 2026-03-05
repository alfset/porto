# Alfset Portfolio — Next.js

Personal portfolio for **Alfino Setiawan** (alfset) — Web3 Fullstack Developer & Validator Operator.

## Features

- 🔴 **Live GitHub data** — repos, profile stats, and activity feed fetched via GitHub API
- 📊 **Contribution heatmap** — 26-week activity graph generated from real event data
- 🃏 **Project cards** — featured pinned projects + auto-fetched GitHub repos sorted by stars
- 🎨 **Clean B&W design** — Playfair Display serif + DM Mono, cream/off-white + pure black
- ⚡ **ISR caching** — GitHub data cached with `revalidate: 3600` (1hr), events at 5min

## Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data**: GitHub REST API (unauthenticated, public)
- **Fonts**: Playfair Display + DM Mono (Google Fonts)

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open http://localhost:3000
```

## Project Structure

```
alfset-portfolio/
├── app/
│   ├── globals.css        # Global styles + Tailwind
│   ├── layout.tsx         # Root layout + metadata
│   └── page.tsx           # Home page (server component)
├── components/
│   ├── Nav.tsx            # Sticky navigation
│   ├── Hero.tsx           # Hero with GitHub stats
│   ├── Marquee.tsx        # Scrolling skills ticker
│   ├── About.tsx          # About + skills grid
│   ├── Projects.tsx       # Featured + GitHub repos
│   ├── Activity.tsx       # GitHub events + heatmap
│   ├── Contact.tsx        # Contact links
│   └── Footer.tsx         # Footer
└── lib/
    └── github.ts          # GitHub API helpers + types
```

## Customize

- **Featured projects** — edit `FEATURED` array in `components/Projects.tsx`
- **Skills** — edit `skills` array in `components/About.tsx`
- **Contact links** — edit `contacts` array in `components/Contact.tsx`
- **GitHub username** — change `USERNAME` in `lib/github.ts`

## Deploy

```bash
# Build
npm run build

# Deploy to Vercel (recommended)
npx vercel
```
