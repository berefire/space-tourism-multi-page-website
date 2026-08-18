# Frontend Mentor - Space Tourism multi-page website solution

![GitHub last commit](https://img.shields.io/github/last-commit/berefire/space-tourism-multi-page-website)
![Repo size](https://img.shields.io/github/repo-size/berefire/space-tourism-multi-page-website)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![Semantic HTML](https://img.shields.io/badge/Semantic%20HTML-ff9800?style=for-the-badge)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
[![Frontend Mentor](https://img.shields.io/badge/Frontend%20Mentor-3e54a3?style=for-the-badge&logo=frontendmentor&logoColor=white)](https://www.frontendmentor.io/)
![Architecture - Feature-Based](https://img.shields.io/badge/Architecture-Feature--Based-2563EB?style=for-the-badge)
![Build Tool - Vite](https://img.shields.io/badge/Build%20Tool-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Accessibility](https://img.shields.io/badge/Accessibility-A11Y-0052cc?style=for-the-badge)
![Responsive Layout](https://img.shields.io/badge/Responsive%20Layout-Full%20Support-blue?style=for-the-badge)
![Mobile First](https://img.shields.io/badge/Mobile--First-Design-orange?style=for-the-badge)
[![Google Lighthouse](https://img.shields.io/badge/Lighthouse-Audit-00B0FF?style=for-the-badge&logo=lighthouse&logoColor=white)](./assets/downloads/lighthouse-performance-report.pdf)

This is a solution to the [Space Tourism multi-page website challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/space-tourism-multipage-website-gRWj1URZ3). Frontend Mentor challenges help improve coding skills by building realistic projects.

---

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#️my-process)
  - [Built with](#built-with)
  - [Project architecture](#project-architecture)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)

---

## 📖Overview

### The challenge

Users should be able to:

- View the optimal layout for each of the website's pages depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- View each page and toggle between tabs to see new information (destinations, crew members, technology)
- Navigate the site using only a keyboard, with visible focus indicators and logical tab order

---

### 📸Screenshot

![Space Tourism website screenshot](./screenshot.jpg)

---

### 🔗Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

---

## ⚙️My process

### Built with

- Semantic HTML5 markup
- [Tailwind CSS v4](https://tailwindcss.com/) - utility-first CSS, using `@theme`, `@utility`, and `@variant` for custom design tokens and responsive logic
- CSS Grid (`grid-template-areas`) for layout reflow across breakpoints
- Vanilla JavaScript (ES modules) - no framework
- [Vite](https://vitejs.dev/) - build tool and dev server, configured as a multi-page app
- Mobile-first workflow
- WAI-ARIA Tabs pattern for accessible, keyboard-navigable content switching

---

### 🔎Project architecture

This project uses a component-based architecture in vanilla JS, organized by responsibility:

```tree
src/
  js/
    components/    → generic, reusable UI (tabs controller, mobile menu, nav highlight)
    features/      → page-specific logic (destination, crew, technology)
    shared/        → cross-cutting utilities (DOM refs, selectors, constants)
  styles/
    theme.css      → design tokens (@theme)
    base.css       → resets, @font-face
    components.css → component classes (CUBE CSS "Block" layer)
    utilities.css  → custom utilities (@utility)
  partials/        → shared HTML fragments (header, shared <head> tags)
```

**Accessible tabs, built once, reused three times.** The `components/tabs` module (a `controller.js`/`events.js` pair implementing the WAI-ARIA APG tabs pattern - roving `tabindex`, arrow/Home/End key support, dynamic `aria-labelledby`) is completely decoupled from markup. It powers the Destination tab selector, the Crew dot navigation, and the Technology numbered selector without any changes to the JavaScript - only the HTML/CSS differs per page.

**HTML partials without a framework.** Since this is a static multi-page site (four independent `.html` entry points, not client-side routed), a small custom Vite plugin (`transformIndexHtml`) resolves `<!--@include file.html-->` comments at build/serve time, letting the shared `<header>` and `<head>` meta tags live in one place instead of being duplicated four times.

**CSS Grid with named areas for responsive reflow.** Several sections (crew member layout, technology showcase) reorder their content completely between breakpoints - not just resizing, but changing which element comes first visually. `grid-template-areas` per breakpoint handles this without duplicating markup or fighting between competing `display` declarations in HTML utilities vs. component CSS.

**CUBE CSS as the naming convention**, chosen over strict BEM because the project already leans on Tailwind utilities for composition and one-off adjustments - only genuine reusable identity (`.page-heading`, `.crew-dot`, `.technology-layout`) gets a named Block class; everything else stays as inline utilities.

---

### 💡What I learned

**Full-bleed elements inside a `base` path (GitHub Pages) need relative asset paths everywhere.** Any `href`/`src`/`url()` starting with `/` resolves against the domain root, ignoring Vite's configured `base` - this broke the entry script, the favicon, nav `aria-current` matching, and background images at different points in the build, always with the same root cause.

```css
/* Works regardless of base path - resolved by Vite's asset pipeline */
.bg-page {
  background-image: url("../assets/images/section/background.jpg");
}
```

**`@apply` in Tailwind v4 only works with real utilities.** Custom CSS classes declared with a plain selector (or inside `@layer utilities`, which lost its special meaning in v4) can't be applied inside another rule - they must be registered with `@utility` first.

```css
@utility full-bleed {
  width: 100vw;
  margin-left: calc(50% - 50vw);
}
```

**Never let both HTML and CSS control the same element's `display`.** Mixing `grid` utility classes in the markup with `display: flex` rules in `components.css` for the same element causes silent conflicts where Tailwind's utility layer usually wins - CSS changes appear to have no effect. The fix is choosing one source of truth per element and sticking to it, ideally moving structural layout entirely into the component's CSS class.

**Multi-page Vite builds need explicit entry points.** By default `vite build` only recognizes `index.html`. Without declaring every page in `build.rollupOptions.input`, only the homepage gets built - and Vite's SPA fallback in preview mode silently serves the homepage for missing routes instead of a clear 404, which made this bug harder to notice.

**`getBoundingClientRect()` beats guessing from screenshots.** Comparing exact pixel measurements between a wrapper, its parent, and a reference layout consistently found root causes (an unaccounted-for `padding`, a fixed-width child inside a full-bleed container) far faster than iterating on CSS values by eye.

---

### 🚀Continued development

- Migrate the Crew page's original flex-based layout to `grid-template-areas` from the start on future pages, rather than retrofitting it after running into `mt-auto`/`flex-1` propagation issues
- Explore `import.meta.glob` for asset resolution instead of hand-written relative paths, to get Vite's build-time hashing on images referenced from JSON data
- Write a small script to standardize crew photo aspect ratios at the source, instead of compensating for inconsistent asset dimensions with `object-fit` per breakpoint

---

### 🤖AI Collaboration

I used Claude throughout this project for:

- **Code review**: structure, accessibility (ARIA patterns), and CSS architecture feedback on hand-written HTML/CSS/JS
- **Debugging**: systematic diagnosis of layout bugs (full-bleed positioning, Grid vs Flexbox space distribution, GitHub Pages `base` path issues) using browser DevTools measurements rather than guesswork
- **Learning support**: explanations of WAI-ARIA patterns, CSS Grid mechanics, Vite's build pipeline, and Conventional Commits conventions while I was actively learning these concepts

What worked well: pairing visual comparisons (screenshots against the Figma reference) with precise DOM measurements (`getBoundingClientRect()`, computed styles) turned several rounds of trial-and-error into confirmed root causes. What was harder: some layout issues took multiple iterations before landing on the right approach, particularly reconciling Grid-based row sizing with content of varying height across the four crew members.

---

## 👤Author

- Frontend Mentor - [@berefire](https://www.frontendmentor.io/profile/berefire)
- GitHub - [@berefire](https://github.com/berefire)

---

## 🙏Acknowledgments

Thanks to Frontend Mentor for providing practical challenges that help developers improve real-world frontend skills.

---
