# Zaheer Ali — 3D Animated Portfolio

A stunning, professional portfolio built with **Next.js 14**, **Three.js**, **Framer Motion**, and **Tailwind CSS**.

## ✨ Features

- 🌌 **3D Particle Background** — WebGL-powered floating particles with mouse parallax
- 🔮 **Animated 3D Sphere** in the Hero section using React Three Fiber
- 🃏 **3D Tilt Cards** on Projects and Skills — mouse-tracking perspective effect
- 🎭 **Framer Motion** scroll-reveal animations throughout
- 📱 **Fully Responsive** — works on all screen sizes
- 📧 **Contact Form** with Node.js backend using Nodemailer
- ⚡ **Next.js 14 App Router** with TypeScript
- 🎨 **Dark theme** with indigo/violet accent palette

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Gmail credentials

# 3. Run development server
npm run dev

# Open http://localhost:3000
```

## 📦 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| 3D Graphics | Three.js + React Three Fiber + Drei |
| Animations | Framer Motion |
| Styling | Tailwind CSS |
| Backend/API | Next.js API Routes + Node.js |
| Email | Nodemailer (Gmail) |
| Deployment | Vercel |

## 📧 Setting Up the Contact Form

1. Enable 2-factor auth on your Gmail account
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Create an App Password for "Mail"
4. Add to `.env.local`:
   ```
   GMAIL_USER=your@gmail.com
   GMAIL_PASS=your_16_char_app_password
   ```

## 🌐 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add env variables in Vercel Dashboard:
# Settings → Environment Variables → Add GMAIL_USER & GMAIL_PASS
```

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Main page
│   ├── globals.css         # Global styles
│   └── api/
│       └── contact/
│           └── route.ts    # Contact form API
├── components/
│   ├── ParticleBackground  # Three.js 3D particles
│   ├── Hero.tsx            # 3D sphere + animated text
│   ├── About.tsx           # 3D tilt avatar
│   ├── Skills.tsx          # Animated skill cards
│   ├── Projects.tsx        # 3D hover project cards
│   ├── Contact.tsx         # Contact form
│   ├── Navbar.tsx          # Sticky navigation
│   ├── Footer.tsx          # Footer
│   └── CursorGlow.tsx      # Mouse glow effect
├── public/
│   └── (your images, CV PDF)
└── tailwind.config.ts
```

## 🎨 Customization

- **Colors**: Edit CSS variables in `globals.css`
- **Projects**: Update the `projects` array in `components/Projects.tsx`
- **Skills**: Update `skillCategories` in `components/Skills.tsx`
- **About text**: Edit `components/About.tsx`

---

Built with ❤️ by Zaheer Ali
