# 🌌 Her Little Universe — Interactive Mobile Birthday Website

Built with **React 19 + TypeScript + Vite + Framer Motion + Tailwind CSS + Web Audio API**.

A cinematic, emotional, playful, and interactive **mobile-only birthday experience** handcrafted for two best friends with chaotic, playful lover-like energy.

---

## ✨ Features & Story Journey

1. **Dreamy Pink Opening**: Soft ambient particles, glowing gradient, and cinematic typing reveal with instant tap response.
2. **Interactive Floating Balloons**: Floating balloons with realistic pop physics and sound effects.
3. **Cupid / Angel Drama**: Cute chibi cupid with animated bow and playful dialogue: *"Fine. I guess I have to do this myself."*
4. **Giant Heart Impact**: Arrow hit $\rightarrow$ BOOM particle explosion into typography and humorous best-friend banter.
5. **Secret Vault Passcode**: Sleek numeric keypad with customizable 4-digit code (Default: `0824`), gentle cycling friendship quotes, and playful wrong attempt teasers.
6. **Little Universe Loading**: Ambient night sky stepper collecting hugs, unspoken wishes, and chaotic memories before unlocking a 20-star galaxy.
7. **Interactive Stars**: Tap glowing stars to reveal heartfelt and hilarious bestie memories.
8. **Love & Friendship Quote Cards**: Dreamy typography cards cycling through emotional & playful thoughts.
9. **3D Envelope & Handwritten Letter**: Realistic opening envelope with an unfolding, personalized handwritten letter.
10. **Touch Scratch Card**: Interactive pastel scratch card with real-time gesture scratching, sparkles, and secret reveal.
11. **Memory Timeline**: Polaroid scrapbook viewer with tags, dates, titles, and captions.
12. **Cinematic Film Reel**: Vintage film reel sequence with shutter clicks, flash effects, and slow-motion replay.
13. **Intimate Final Message**: Starry night reveal: *"Out of all the people in this world... I'm really glad I got you as my person."*
14. **Birthday Cake & Candle Celebration**: Interactive candle blow, confetti shower, and fanfare!
15. **Hidden Easter Egg**: Secret star tucked in the bottom right with a special photo and heartfelt note.
16. **Replay & Navigation**: Easy jump controls to replay the entire story, re-read the letter, or replay memories.
17. **Sound System**: Procedural Web Audio API synthesis (pops, whooshes, chimes, paper rustles, camera shutters, fanfare) + drop-in MP3 asset support.

---

## 🚀 Quick Start

To run the app locally:
```bash
npm run dev
```
Open **[http://localhost:5173/](http://localhost:5173/)** in your browser.

To test mobile view on desktop:
- Open Developer Tools (`F12` or `Ctrl+Shift+I`)
- Toggle Device Toolbar (`Ctrl+Shift+M`)
- Select **iPhone 14 Pro** or set dimensions to **390 × 844**.

---

## 🎨 How to Personalize

All customizations are in one single file: [`src/config.ts`](file:///c:/Users/nskab_hoawqow/Desktop/Bday_Website/src/config.ts).

### 1. Change Name, Password & Age
```typescript
export const BIRTHDAY_CONFIG: BirthdayConfig = {
  recipientName: "Maya",        // Her name
  senderName: "Your Bestie",    // Your name/nickname
  age: 21,                      // Her birthday age
  secretPassword: "0824",       // 4-digit passcode for vault
  ...
};
```

### 2. Replace Photos
Place your photos in `assets/photos/`:
- `photo01.svg` / `photo01.jpg`
- `photo02.svg` / `photo02.jpg`
- ... up to `photo06.jpg`
- `secret.svg` / `secret.jpg` (for the Easter egg)

Then update the paths in `BIRTHDAY_CONFIG.memories` inside [`src/config.ts`](file:///c:/Users/nskab_hoawqow/Desktop/Bday_Website/src/config.ts).

---

## 📁 Modern React + TypeScript Architecture

```
Bday_Website/
├── src/
│   ├── config.ts            # Central typed configuration (texts, password, photos)
│   ├── App.tsx              # Master state machine & scene orchestrator
│   ├── main.tsx             # Application entry point
│   ├── index.css            # Tailwind & typography styling
│   ├── utils/
│   │   └── sound.ts         # Zero-latency Web Audio API synthesizer
│   └── components/
│       ├── SoundPromptModal.tsx
│       ├── SceneOpening.tsx
│       ├── SceneBalloons.tsx
│       ├── SceneCupid.tsx
│       ├── SceneHeartImpact.tsx
│       ├── SceneLock.tsx
│       ├── SceneSurprise.tsx
│       ├── SceneUniverseLoading.tsx
│       ├── SceneInteractiveStars.tsx
│       ├── SceneQuotes.tsx
│       ├── SceneEnvelope.tsx
│       ├── SceneScratch.tsx
│       ├── SceneTimeline.tsx
│       ├── SceneFilmReel.tsx
│       ├── SceneHiddenFinal.tsx
│       ├── SceneCelebration.tsx
│       └── EasterEggModal.tsx
├── assets/
│   ├── illustrations/       # SVGs (Cupid, Cake, Balloons)
│   ├── photos/              # Memories and Easter egg illustrations/photos
│   ├── sounds/              # Sound effects folder
│   └── music/               # Background music folder
├── package.json
├── vite.config.ts
└── tsconfig.json
```
