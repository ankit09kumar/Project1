# TechNova Industrial Training Kit Website

A complete, responsive, multi-page web platform for a modern **Modular Industrial PLC & Automation Training Kit**, built using standard **HTML5, CSS3, and ES6 JavaScript**.

## Project Objective

To build an educational and product showcase portal that automatically optimizes layout geometries for:
* **Mobile Viewports** (e.g., iPhone, Android devices)
* **Tablet Viewports** (e.g., iPad Mini, iPad Pro)
* **Laptop/Desktop monitors**

The website serves as a technical resource, detailing training modules, practical laboratory objectives, technical comparison specs, a visual workbench gallery with a lightbox, and an interactive contact and quotation portal.

---

## Folder Structure

All assets are organized in the root workspace according to standard front-end structures:

```
TechNova_Project/
├── index.html          # Home Page (Hero, Highlights, Featured Slider)
├── about.html          # About Page (Project Overview, Curriculum Objectives, Benefits)
├── features.html       # Features Page (Module Cards, Comparison Spec Table, Stack Cards)
├── gallery.html        # Gallery Page (Grid Layout & Custom JavaScript Lightbox Modal)
├── contact.html        # Contact Page (Direct Channels, Map, Validation Form, Success Toast)
├── css/
│   └── style.css       # Core Style Sheets & Responsive Media Queries
├── js/
│   └── script.js       # Client Logic (Header scroll, Hamburger Nav, Slider, Lightbox, Forms)
├── images/
│   ├── hero_training_kit.png   # Generated: PLC Panel Setup
│   ├── gallery_wiring.png       # Generated: Active Student Assembly
│   ├── gallery_hmi.png          # Generated: HMI Dashboard Interface
│   └── gallery_automation.png   # Generated: Electro-Pneumatics Simulator
└── README.md           # Project Documentation (This File)
```

---

## Key Technologies Used

### 1. HTML5
* Semantic structures (`<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`) for optimized SEO mapping and web accessibility.
* Inline SVG vectors for icons (Phone, Email, Settings gear, Chevron, Close cross, Search check) guaranteeing clean display on retina screens without external libraries.
* Accessible ARIA structures (`role="dialog"`, `aria-hidden`, `aria-label`).

### 2. CSS3
* Custom variable definitions (CSS Custom Properties) for centralized palette controls.
* Mobile-first design system utilizing media queries (`@media (min-width: 640px)` and `@media (min-width: 1024px)`).
* Flexbox and Grid alignments for high-precision content positioning.
* Glassmorphism headers, drop-shadow elevations, custom transitions, and keyframe slide animations.

### 3. JavaScript (ES6)
* **Mobile Menu Hamburgers**: Toggles active lists with background scroll locking.
* **Featured Modules Slider**: Custom-built carousel on the Home Page with autoplay loops, hover pausing, arrow buttons, and indicator dots.
* **Interactive Lightbox**: Pop-up modal in the gallery allowing full image cycling, metadata captions, and keyboard arrows (`ArrowLeft` / `ArrowRight` / `Escape`) control.
* **Form Validation**: Checks validation formats (names, emails, phones, message lengths) in real time on key-press/focus-loss, showing dynamic red warning flags, and triggering a sliding confirmation Toast on success.

---

## Color Palette System (Industrial Theme)

The stylesheet defines theme colors mimicking real automation panels (slate steel bases with high-visibility warning orange overlays):
* **Slate Blue Base (`--primary`)**: `#0f172a` (Primary industrial panel tint)
* **Lighter Slate Surface (`--primary-light`)**: `#1e293b` (Card backgrounds)
* **High-Vis Accent Orange (`--accent`)**: `#f97316` (Highlight buttons, alert badges)
* **Muted Gray Text (`--text-muted`)**: `#64748b` (Caption descriptions)
* **Soft Background Gray (`--bg-light`)**: `#f8fafc` (Body backdrop)

---

## Previewing Locally

To run the project locally, you can use any of the following methods:

1. **Direct File System Opening**:
   Simply double-click the `index.html` file in your workspace directory to open it directly in Google Chrome, Firefox, Microsoft Edge, or Safari. All links use relative routing and will function offline.

2. **HTTP Server (Recommended)**:
   If you have Node.js installed, launch a local server in the project folder:
   ```bash
   npx http-server
   ```
   Or using Python:
   ```bash
   python -m http-server 8000
   ```
   Then open `http://localhost:8000` or the listed URL in your browser.
