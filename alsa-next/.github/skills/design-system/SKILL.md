---
name: design-system
description: ALWAYS use for ALSA Next UI pages, design system, tokens, and UI components in this repository (maroon/cream theme, globals.css, design patterns).
---

# Design System Skill: ALSA Next

This skill defines the visual and implementation rules for UI work in this repository.

## 1) Product Visual Identity

- Brand direction: formal academic organization with warm editorial feel.
- Core palette: deep maroon primary with cream secondary.
- Tone: strong headings, generous spacing, high contrast, clean section rhythm.
- Motion language: slow marquee, fade/slide entrance, scroll-linked transitions.

## 2) Design Tokens (Source of Truth)

Use tokens from app/globals.css and avoid hardcoded colors unless there is a clear one-off reason.

- --primary-color: #740107 / rgb(116, 1, 7)
- --secondary-color: #f0f0ea / rgb(240, 240, 234)
- --text-color: #f0f0ea
- --bg-color-primary: #740107
- --bg-color-for-gradient: rgb(240, 240, 234)
- --feeds-color-light-red: #952f28
- --feeds-color-medium-red: #7d0100
- --feeds-color-dark-red: #670100
- --feeds-color-gold: #D19A04
- --feeds-color-berduka: #221516
- --feeds-color-hari-raya: #f0f0ea

Typography token:

- Global font family: Figtree, sans-serif

## 3) Spacing, Sizing, and Responsive Rules

- Use clamp() for typography and spacing across breakpoints.
- Prefer width constraints such as min(90%, 1100px) or min(95%, 1300px).
- Primary section height pattern: min-h-[100vh] on desktop with reduced mobile minimums.
- Border and radius rhythm:
	- Preview containers: border 5px solid var(--primary-color)
	- Radius: usually 20px or clamp(10px, 2vw, 20px)

## 4) Shared UI Patterns

When creating new sections, follow one of the existing patterns before inventing a new one.

- Section title pattern:
	- text-[clamp(1.8rem,8vw,8rem)] for hero-size headings
	- text-[clamp(2.5rem,8vw,6.25rem)] for section-heading utility
- Carousel shell pattern:
	- rounded container, overflow-x hidden, duplicated group for infinite loop
- Preview container pattern:
	- centered box with border and fixed visual hierarchy
- Alternate section backgrounds for rhythm:
	- maroon section then cream section

## 5) Motion System

Allowed shared keyframes from globals.css:

- marquee
- fade-in
- slide-right
- slide-left
- slide-right-scroll
- slide-left-scroll
- entry-blurp-square

Motion conventions:

- Keep marquee speeds long and smooth (for example 30s to 200s linear infinite).
- Use hover pause for moving carousels.
- Use scroll-linked animation only when it communicates layout progression.
- Prefer transform and opacity animation to avoid layout thrashing.

## 6) Component Architecture Rules

- Keep components focused by section (static or dynamic).
- Extract repeated class strings into constants (for example SECTION_CLASSES, TITLE_CLASSES).
- Use explicit fallback content for CMS-driven sections.
- Keep API typing close to component usage with local TS types.
- Prefer one-way data flow:
	1. API route reads Sanity
	2. Component fetches route
	3. Component maps payload to presentation model

## 7) Accessibility and Semantics

- Use meaningful heading order (h1-h2 hierarchy per section).
- Preserve aria-label on icon-only controls and social links.
- Keep interactive targets keyboard-accessible (button for controls, anchor for navigation).
- Provide alt text for all images, including CMS-loaded images.

## 8) Data-Driven UI Rules (Sanity)

- All CMS fetch failures must gracefully fall back to local content.
- Do not block rendering when CMS response fails.
- Filter incomplete CMS rows before rendering (missing image/title/link/description).
- Use no-store for preview-like freshness where needed.

## 9) Implementation Checklist For New UI

Before opening a PR, verify:

1. Colors come from tokens in globals.css.
2. Responsive values use clamp()/min()/max() patterns already used in the repo.
3. Repeated class lists are extracted into named constants.
4. New motion uses existing keyframes first; custom keyframes only if truly needed.
5. CMS-backed components include typed payload, mapping, and fallback content.
6. Section keeps contrast and alternating background rhythm.
7. Lint passes with no new warnings/errors.

## 10) Do / Do Not

Do:

- Reuse the existing maroon/cream visual language.
- Keep typography bold for major section headlines.
- Maintain border-radius and border thickness consistency.
- Keep code DRY by centralizing repeated style strings.

Do not:

- Introduce random new color families without token updates.
- Use hardcoded pixel-only typography for major text blocks.
- Remove fallback data in dynamic sections.
- Add decorative animation that reduces readability.

## 11) Reference Map

Use these files as concrete examples:

- app/globals.css: tokens, shared utilities, keyframes
- components/static/Hero.tsx: hero layout and scroll-linked ornament motion
- components/static/Pilars.tsx: sticky/scroll narrative cards with GSAP ScrollTrigger
- components/dynamic/EventPreview.tsx: data mapping + fallback + timed slider
- components/dynamic/PublicationPreview.tsx: marquee carousel with duplicated groups
- components/dynamic/FooterPreview.tsx: icon system and link interaction details
