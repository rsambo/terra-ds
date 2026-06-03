---
version: "alpha"
name: "Omni - Platform"
description: "Omni Platform Login Section is designed for authenticating users through a focused access flow. Key features include reusable structure, responsive behavior, and production-ready presentation. It is suitable for authentication screens in web products."
colors:
  primary: "#3B82F6"
  secondary: "#4ADE80"
  tertiary: "#A855F7"
  neutral: "#737373"
  background: "#FFFFFF"
  surface: "#FAF5FF"
  text-primary: "#737373"
  text-secondary: "#171717"
  border: "#F5F5F5"
  accent: "#3B82F6"
typography:
  display-lg:
    fontFamily: "System Font"
    fontSize: "60px"
    fontWeight: 500
    lineHeight: "60px"
    letterSpacing: "-0.025em"
  body-md:
    fontFamily: "System Font"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: "19.5px"
  label-md:
    fontFamily: "System Font"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: "20px"
rounded:
  md: "0px"
  full: "9999px"
spacing:
  base: "4px"
  sm: "1px"
  md: "1.5px"
  lg: "2px"
  xl: "4px"
  gap: "4px"
  card-padding: "9px"
  section-padding: "24px"
components:
  button-primary:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text-secondary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "8px"
  button-link:
    textColor: "{colors.neutral}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: "0px"
  card:
    backgroundColor: "{colors.background}"
    rounded: "12px"
    padding: "16px"
---

## Overview

- **Composition cues:**
  - Layout: Grid
  - Content Width: Full Bleed
  - Framing: Glassy
  - Grid: Strong

## Colors

The color system uses light mode with #3B82F6 as the main accent and #737373 as the neutral foundation.

- **Primary (#3B82F6):** Main accent and emphasis color.
- **Secondary (#4ADE80):** Supporting accent for secondary emphasis.
- **Tertiary (#A855F7):** Reserved accent for supporting contrast moments.
- **Neutral (#737373):** Neutral foundation for backgrounds, surfaces, and supporting chrome.

- **Usage:** Background: #FFFFFF; Surface: #FAF5FF; Text Primary: #737373; Text Secondary: #171717; Border: #F5F5F5; Accent: #3B82F6

- **Gradients:** bg-gradient-to-b from-blue-200 to-transparent, bg-gradient-to-b from-purple-200 to-transparent, bg-gradient-to-b from-green-200 to-transparent, bg-gradient-to-r from-blue-500 to-green-400 via-purple-500

## Typography

Typography relies on System Font across display, body, and utility text.

- **Display (`display-lg`):** System Font, 60px, weight 500, line-height 60px, letter-spacing -0.025em.
- **Body (`body-md`):** System Font, 12px, weight 400, line-height 19.5px.
- **Labels (`label-md`):** System Font, 14px, weight 500, line-height 20px.

## Layout

Layout follows a grid composition with reusable spacing tokens. Preserve the grid, full bleed structural frame before changing ornament or component styling. Use 4px as the base rhythm and let larger gaps step up from that cadence instead of introducing unrelated spacing values.

Treat the page as a grid / full bleed composition, and keep that framing stable when adding or remixing sections.

- **Layout type:** Grid
- **Content width:** Full Bleed
- **Base unit:** 4px
- **Scale:** 1px, 1.5px, 2px, 4px, 6px, 8px, 12px, 16px
- **Section padding:** 24px, 32px, 72px, 112px
- **Card padding:** 9px, 10px, 16px, 24px
- **Gaps:** 4px, 8px, 12px, 16px

## Elevation & Depth

Depth is communicated through glass, border contrast, and reusable shadow or blur treatments. Keep those recipes consistent across hero panels, cards, and controls so the page reads as one material system.

Surfaces should read as glass first, with borders, shadows, and blur only reinforcing that material choice.

- **Surface style:** Glass
- **Borders:** 1px #F5F5F5; 1px #E5E5E5; 1px #E9D5FF; 1px #DBEAFE
- **Shadows:** rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px; rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 8px 20px 0px; rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(168, 85, 247, 0.3) 0px 20px 50px -15px
- **Blur:** 12px, 40px

### Techniques
- **Gradient border shell:** Use a thin gradient border shell around the main card. Wrap the surface in an outer shell with 4px padding and a 0px radius. Drive the shell with none so the edge reads like premium depth instead of a flat stroke. Keep the actual stroke understated so the gradient shell remains the hero edge treatment. Inset the real content surface inside the wrapper with a slightly smaller radius so the gradient only appears as a hairline frame.

## Shapes

Shapes rely on a tight radius system anchored by 4px and scaled across cards, buttons, and supporting surfaces. Icon geometry should stay compatible with that soft-to-controlled silhouette.

Use the radius family intentionally: larger surfaces can open up, but controls and badges should stay within the same rounded DNA instead of inventing sharper or pill-only exceptions.

- **Corner radii:** 4px, 6px, 8px, 12px, 16px, 9999px
- **Icon treatment:** Linear
- **Icon sets:** Solar

## Components

Anchor interactions to the detected button styles. Reuse the existing card surface recipe for content blocks.

### Buttons
- **Primary:** background #FFFFFF, text #171717, radius 9999px, padding 8px, border 0px solid rgb(229, 231, 235).
- **Links:** text #737373, radius 0px, padding 0px, border 0px solid rgb(229, 231, 235).

### Cards and Surfaces
- **Card surface:** background #FFFFFF, border 0px solid rgb(229, 231, 235), radius 12px, padding 16px, shadow rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px.
- **Card surface:** background #FFFFFF, border 0px solid rgb(229, 231, 235), radius 16px, padding 24px, shadow none.
- **Card surface:** background rgba(255, 255, 255, 0.5), radius 0px, padding 12px, shadow none.

### Iconography
- **Treatment:** Linear.
- **Sets:** Solar.

## Do's and Don'ts

Use these constraints to keep future generations aligned with the current system instead of drifting into adjacent styles.

### Do
- Do use the primary palette as the main accent for emphasis and action states.
- Do keep spacing aligned to the detected 4px rhythm.
- Do reuse the Glass surface treatment consistently across cards and controls.
- Do keep corner radii within the detected 4px, 6px, 8px, 12px, 16px, 9999px family.

### Don't
- Don't introduce extra accent colors outside the core palette roles unless the page needs a new semantic state.
- Don't mix unrelated shadow or blur recipes that break the current depth system.
- Don't exceed the detected expressive motion intensity without a deliberate reason.

## Motion

Motion feels expressive but remains focused on interface, text, and layout transitions. Timing clusters around 150ms and 300ms. Easing favors ease and cubic-bezier(0.4. Hover behavior focuses on text and color changes. Scroll choreography uses GSAP ScrollTrigger and Parallax for section reveals and pacing.

**Motion Level:** expressive

**Durations:** 150ms, 300ms

**Easings:** ease, cubic-bezier(0.4, 0, 0.2, 1)

**Hover Patterns:** text, color, shadow, transform

**Scroll Patterns:** gsap-scrolltrigger, parallax
