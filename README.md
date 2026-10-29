# PHONIX GLOBAL TRADE
## International Import & Export / Global Trading
### Premium Editorial & Creative Multi-Page Frontend Experience

> **Awwwards-Level Digital Flagship** combining Swiss editorial typography, contemporary luxury branding, cinematic motion engineering, and 100% authentic maritime logistics photography.

---

## 1. Executive Summary & Design Philosophy

**PHONIX GLOBAL TRADE** is an international merchant trading house orchestrating bulk agricultural commodities, industrial raw materials, and precision manufactured goods across sovereign economic corridors.

Rather than adopting generic logistics templates with floating 3D globe models or clichéd corporate blue cards, this digital flagship was conceived under an **Agency-Level Creative Direction**:

- **Swiss Editorial Design**: Asymmetric grid systems, expansive negative space, and disciplined typographic scales.
- **Contrasting Typography Matrix**: High-character display geometry (**Syne**) juxtaposed with high-fashion editorial serif italics (**Cormorant Garamond**) and clean monospaced technical telemetry (**JetBrains Mono**).
- **Cinematic 2D Depth (No Heavy 3D)**: Scroll-linked pinned panels, masked reveals, horizontal scrubs, and parallax imagery creating immersive spatial depth without Three.js or WebGL overhead.
- **Dual Theme Architecture**:
  - **Light Theme**: Editorial print magazine aesthetic with warm alabaster backgrounds (`#F5F3ED`), charcoal typography (`#161616`), and burnt orange trade accents (`#E66A38`).
  - **Dark Theme**: Deep nocturnal obsidian (`#0C1015`), ivory typography (`#F6F2E9`), and vibrant coral ember accents (`#FF8455`).
  - **Zero-FOUC**: Instant theme detection in `<head>` honoring system preferences and persistent `localStorage`.

---

## 2. Multi-Page Architecture (7 Full Routes)

| Route | Page | Architectural Purpose & Experience Highlights |
| :--- | :--- | :--- |
| `/` | **Home** | Cinematic opening loading sequence, full-screen parallax hero, **5 website-template-style scrolling panels**, 5-slide horizontal gallery scrub, company charter, interactive sector showcase, 2D vector maritime trade map, and editorial closing CTA. |
| `/about` | **About Us** | The Trade Triad governance principles (Integrity, Logistics Sovereignty, Macro Resilience), 4-step supply chain methodology, and international compliance frameworks (ISO, GAFTA, FOSFA, SGS). |
| `/products` | **Products** | Comprehensive commodity & industrial catalog featuring interactive sector filtering (Agricultural, Metals, Consumer Goods, Sourcing), HS Code badges, and quick specification highlights. |
| `/products/:id` | **Product Details** | Dynamic detail dossier with multi-angle image gallery switcher, guaranteed laboratory assay specifications table, Incoterms packaging data, and related commodity recommendations. |
| `/global-trade` | **Global Trade** | In-depth maritime logistics hub featuring 4 sovereign shipping arteries (Silk Sea, Trans-Pacific, Atlantic Axis, Indian Ocean Gateway) with transit days, TEU capacities, and on-ground trading desks. |
| `/gallery` | **Gallery** | High-definition editorial photo gallery with category filter and a **full-screen interactive Lightbox** equipped with previous/next navigation, metadata coordinates, and keyboard ESC controls. |
| `/contact` | **Contact** | Interactive commercial inquiry portal featuring real-time client validation, Incoterms procurement inputs, global trading desk directories, and a simulated confirmation modal with reference tracking. |

---

## 3. Technology Stack & Motion Engineering

- **Core Framework**: React 19 + TypeScript (ES2023)
- **Build System**: Vite 8 with `@vitejs/plugin-react` (sub-400ms production builds)
- **Styling Architecture**: Tailwind CSS v4 (`@tailwindcss/vite`) with custom CSS theme tokens
- **Routing Engine**: React Router DOM v7 (Clean client-side SPA routing)
- **Kinetic Motion**: Motion (`motion/react`) for spring physics, scroll-linked transforms, and staged reveals
- **Smooth Momentum Scrolling**: Lenis (`lenis`) with prefers-reduced-motion safety guard
- **Iconography**: Lucide React (`lucide-react`)
- **Automated Verification**: Playwright (`playwright`) headless browser testing across desktop and mobile viewports

---

## 4. Getting Started & Development Commands

### Prerequisites
- Node.js `v18+` or `v20+` (tested on Node v24)
- npm `v9+` or `v11+`

### Installation
```bash
# Clone or navigate to project directory
cd "d:\phonix global traders"

# Install dependencies
npm install
```

### Development Server
```bash
npm run dev
# Server will launch at http://localhost:5173
```

### Production Build & Preview
```bash
# Type check and build optimized bundle
npm run build

# Preview production build locally
npm run preview
# Preview server runs at http://localhost:4173
```

### Run Playwright Visual Inspection Suite
```bash
node scripts/test_visuals.mjs
# Captures 13 desktop, tablet, and mobile screenshots to public/screenshots/
```

---

## 5. Visual Inspection Screenshots

All visual tests were verified via Playwright in `public/screenshots/`:

| Screenshot | Description |
| :--- | :--- |
| `01-home-hero-dark.png` | Desktop Hero in Dark Mode (Monumental typography & port photography) |
| `02-home-hero-light.png` | Desktop Hero in Light Mode (Warm editorial magazine palette) |
| `03-stacked-panels.png` | Pinned Stacked Template Panels (Layered scroll narrative) |
| `04-category-showcase.png` | Interactive Commercial Product Divisions |
| `05-interactive-trade-map.png` | 2D Mercator Vector Maritime Shipping Arteries |
| `06-about-page.png` | About Charter, Trade Triad & Governance |
| `07-products-catalog.png` | Full Commodity Catalog with Sector Filtering |
| `08-product-detail.png` | High-Purity Copper Cathode Technical Dossier |
| `09-global-trade.png` | Sovereign Trade Corridors & Shipping Channels |
| `10-gallery-lightbox.png` | Full-Screen Maritime Terminal Lightbox |
| `11-contact-success-modal.png` | Validated Inquiry Form Submission Confirmation |
| `12-mobile-home.png` | Responsive Mobile Hero Viewport (390×844) |
| `13-mobile-fullscreen-menu.png` | Mobile Typographic Full-Screen Navigation Menu |

---

## 6. Photographic Assets & License Attribution

All imagery used throughout the website comprises 100% authentic, high-resolution photography downloaded and saved locally in `public/images/`. Refer to `ATTRIBUTION.md` for complete credits under the Unsplash Free Commercial License.
