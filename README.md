# Ferrari SF90 Stradale Experience

An immersive, scrolling web experience showcasing the engineering marvel that is the Ferrari SF90 Stradale. This project utilizes advanced web technologies to deliver a cinematic and interactive presentation of the car's features, including aerodynamics, interior luxury, and hybrid performance.

## 🏎️ Project Overview

This application is designed to mimic a high-end product landing page, focusing on visual storytelling through scroll-based animations and frame-by-frame image sequences. It offers a detailed look into the SF90 Stradale's various systems.

## ✨ Features

-   **Immersive Scroll Animations**: Smooth, frame-by-frame scrubbable video sequences using `framer-motion` and canvas rendering.
-   **Interactive Dialogue Boxes**: Detailed feature breakdowns (Aerodynamics, Interior, Engine) that appear dynamically as you explore.
-   **Responsive Design**: Fully optimized for customized mobile and desktop experiences.
-   **Performance Focused**: Efficient image loading and canvas rendering for smooth playback.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
-   **Language**: TypeScript
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Utilities**: `clsx`, `tailwind-merge`

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Key Components

-   **`UniversalScrollCanvas`**: The core component responsible for efficiently rendering frame sequences on a canvas based on scroll position.
-   **`AerodynamicsExperience`**: Handles the active aero visualization and interactive hotspots.
-   **`InteriorExperience`**: Showcases the cockpit, steering, and display systems.
-   **`HybridExperience`**: Explains the layout of the V8 engine and electric motors.

## 🎨 Design Philosophy

The design strictly follows a premium aesthetic:
-   **Typography**: Orbitron (Headings) & Rajdhani (Body) for a futuristic, technical feel.
-   **Color Palette**: Ferrari Red accents against Deep Black/Carbon backgrounds.
-   **Interaction**: "Scroll to Explore" paradigm to give users control over the pacing.

---

*(This is a fan project for demonstration purposes)*
