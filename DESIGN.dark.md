---
name: Terra DS Dark
description: A warm dark theme for the Terra DS design system, targeting reading, writing, AI chat, and productivity tools.
colors:
  primary: '#E8DDD5'
  primary-container: '#3D322B'
  on-primary: '#2A1F1A'
  secondary: '#C4B5A5'
  secondary-container: '#2A231C'
  on-secondary: '#2A1F1A'
  accent: '#845510'
  accent-container: '#3D2E14'
  on-accent: '#FAF0E0'
  surface: '#1A1410'
  surface-raised: '#221C16'
  surface-overlay: '#2A231C'
  on-surface: '#F0EBE3'
  on-surface-muted: '#9C8D80'
  surface-content: '#1E1810'
  surface-content-raised: '#261F14'
  on-content: '#EDE8E0'
  on-content-muted: '#A09080'
  surface-chat-user: '#2A221A'
  surface-chat-assistant: '#221C14'
  on-chat: '#EDE8E0'
  border: '#3D3228'
  border-subtle: '#2E2620'
  error: '#E86666'
  on-error: '#1A1010'
  focus-ring: '#D4892B'
  neutral: '#2A231C'
typography:
  display-lg:
    fontFamily: 'Inter'
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.1
  display-sm:
    fontFamily: 'Inter'
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.1
  heading-xl:
    fontFamily: 'Inter'
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.2
  heading-lg:
    fontFamily: 'Inter'
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.2
  heading-md:
    fontFamily: 'Inter'
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.3
  heading-sm:
    fontFamily: 'Inter'
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.3
  body-lg:
    fontFamily: 'Inter'
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  body-md:
    fontFamily: 'Inter'
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: 'Inter'
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.5
  label-lg:
    fontFamily: 'Inter'
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0.01em
  label-sm:
    fontFamily: 'Inter'
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0.02em
  code-md:
    fontFamily: "'SF Mono', Monaco, monospace"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  content-display:
    fontFamily: "'Noto Serif', serif"
    fontSize: 40px
    fontWeight: 400
    lineHeight: 1.2
  content-heading-lg:
    fontFamily: "'Noto Serif', serif"
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.2
  content-heading-md:
    fontFamily: "'Noto Serif', serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.3
  content-heading-sm:
    fontFamily: "'Noto Serif', serif"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.3
  content-body-lg:
    fontFamily: "'Noto Serif', serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.75
  content-body-md:
    fontFamily: "'Noto Serif', serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  content-caption:
    fontFamily: "'Noto Serif', serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.5
    fontStyle: italic
  content-blockquote:
    fontFamily: "'Noto Serif', serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
    fontStyle: italic
spacing:
  2xs: 2px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
rounded:
  none: 0px
  sm: 4px
  md: 6px
  lg: 10px
  xl: 16px
  full: 9999px
components:
  button-primary:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.on-primary}'
    rounded: '{rounded.md}'
    padding: '{spacing.sm} {spacing.md}'
  button-primary-hover:
    backgroundColor: '{colors.primary-container}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.md}'
    padding: '{spacing.sm} {spacing.md}'
  button-primary-focus:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.on-primary}'
    rounded: '{rounded.md}'
    padding: '{spacing.sm} {spacing.md}'
  button-primary-disabled:
    backgroundColor: '{colors.neutral}'
    textColor: '{colors.on-surface-muted}'
    rounded: '{rounded.md}'
    padding: '{spacing.sm} {spacing.md}'
  button-secondary:
    backgroundColor: '{colors.secondary}'
    textColor: '{colors.on-secondary}'
    rounded: '{rounded.md}'
    padding: '{spacing.sm} {spacing.md}'
  button-secondary-hover:
    backgroundColor: '{colors.secondary-container}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.md}'
    padding: '{spacing.sm} {spacing.md}'
  button-secondary-focus:
    backgroundColor: '{colors.secondary}'
    textColor: '{colors.on-secondary}'
    rounded: '{rounded.md}'
    padding: '{spacing.sm} {spacing.md}'
  button-secondary-disabled:
    backgroundColor: '{colors.neutral}'
    textColor: '{colors.on-surface-muted}'
    rounded: '{rounded.md}'
    padding: '{spacing.sm} {spacing.md}'
  button-ghost:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.md}'
    padding: '{spacing.sm} {spacing.md}'
  button-ghost-hover:
    backgroundColor: '{colors.surface-raised}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.md}'
    padding: '{spacing.sm} {spacing.md}'
  button-ghost-focus:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.md}'
    padding: '{spacing.sm} {spacing.md}'
  button-ghost-disabled:
    backgroundColor: '{colors.neutral}'
    textColor: '{colors.on-surface-muted}'
    rounded: '{rounded.md}'
    padding: '{spacing.sm} {spacing.md}'
  button-destructive:
    backgroundColor: '{colors.error}'
    textColor: '{colors.on-error}'
    rounded: '{rounded.md}'
    padding: '{spacing.sm} {spacing.md}'
  button-destructive-hover:
    backgroundColor: '{colors.error}'
    textColor: '{colors.on-error}'
    rounded: '{rounded.md}'
    padding: '{spacing.sm} {spacing.md}'
  button-destructive-focus:
    backgroundColor: '{colors.error}'
    textColor: '{colors.on-error}'
    rounded: '{rounded.md}'
    padding: '{spacing.sm} {spacing.md}'
  button-destructive-disabled:
    backgroundColor: '{colors.neutral}'
    textColor: '{colors.on-surface-muted}'
    rounded: '{rounded.md}'
    padding: '{spacing.sm} {spacing.md}'
  input:
    backgroundColor: '{colors.surface-raised}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.md}'
    padding: '{spacing.sm} {spacing.md}'
  input-focus:
    backgroundColor: '{colors.surface-overlay}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.md}'
    padding: '{spacing.sm} {spacing.md}'
  input-error:
    backgroundColor: '{colors.surface-raised}'
    textColor: '{colors.error}'
    rounded: '{rounded.md}'
    padding: '{spacing.sm} {spacing.md}'
  input-disabled:
    backgroundColor: '{colors.neutral}'
    textColor: '{colors.on-surface-muted}'
    rounded: '{rounded.md}'
    padding: '{spacing.sm} {spacing.md}'
  checkbox:
    backgroundColor: '{colors.surface-raised}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.sm}'
    padding: '{spacing.xs}'
  checkbox-checked:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.on-primary}'
    rounded: '{rounded.sm}'
    padding: '{spacing.xs}'
  checkbox-focus:
    backgroundColor: '{colors.surface-raised}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.sm}'
    padding: '{spacing.xs}'
  toggle:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.full}'
    padding: '{spacing.xs} {spacing.sm}'
  toggle-on:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.on-primary}'
    rounded: '{rounded.full}'
    padding: '{spacing.xs} {spacing.sm}'
  toggle-focus:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.full}'
    padding: '{spacing.xs} {spacing.sm}'
  card:
    backgroundColor: '{colors.surface-raised}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.lg}'
    padding: '{spacing.md}'
  card-interactive:
    backgroundColor: '{colors.surface-raised}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.lg}'
    padding: '{spacing.md}'
  card-interactive-hover:
    backgroundColor: '{colors.surface-overlay}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.lg}'
    padding: '{spacing.md}'
  chat-bubble-user:
    backgroundColor: '{colors.surface-chat-user}'
    textColor: '{colors.on-chat}'
    rounded: '{rounded.lg}'
    padding: '{spacing.md}'
  chat-bubble-assistant:
    backgroundColor: '{colors.surface-chat-assistant}'
    textColor: '{colors.on-chat}'
    rounded: '{rounded.lg}'
    padding: '{spacing.md}'
  content-page:
    backgroundColor: '{colors.surface-content}'
    textColor: '{colors.on-content}'
    rounded: '{rounded.none}'
    padding: '{spacing.lg}'
  callout:
    backgroundColor: '{colors.surface-content-raised}'
    textColor: '{colors.on-content-muted}'
    rounded: '{rounded.md}'
    padding: '{spacing.md}'
  badge:
    backgroundColor: '{colors.secondary}'
    textColor: '{colors.on-secondary}'
    rounded: '{rounded.full}'
    padding: '{spacing.xs} {spacing.sm}'
  badge-accent:
    backgroundColor: '{colors.accent-container}'
    textColor: '{colors.on-accent}'
    rounded: '{rounded.full}'
    padding: '{spacing.xs} {spacing.sm}'
  badge-error:
    backgroundColor: '{colors.error}'
    textColor: '{colors.on-error}'
    rounded: '{rounded.full}'
    padding: '{spacing.xs} {spacing.sm}'
  dialog:
    backgroundColor: '{colors.surface-overlay}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.xl}'
    padding: '{spacing.lg}'
  tooltip:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.on-primary}'
    rounded: '{rounded.md}'
    padding: '{spacing.sm} {spacing.md}'
  dropdown-menu:
    backgroundColor: '{colors.surface-overlay}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.md}'
    padding: '{spacing.sm}'
  dropdown-menu-item-hover:
    backgroundColor: '{colors.surface-raised}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.sm}'
    padding: '{spacing.sm}'
  nav-item:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface-muted}'
    rounded: '{rounded.sm}'
    padding: '{spacing.sm} {spacing.md}'
  nav-item-active:
    backgroundColor: '{colors.accent}'
    textColor: '{colors.on-accent}'
    rounded: '{rounded.sm}'
    padding: '{spacing.sm} {spacing.md}'
  nav-item-hover:
    backgroundColor: '{colors.surface-raised}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.sm}'
    padding: '{spacing.sm} {spacing.md}'
  tab:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface-muted}'
    rounded: '{rounded.sm}'
    padding: '{spacing.sm} {spacing.md}'
  tab-active:
    backgroundColor: '{colors.surface-raised}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.sm}'
    padding: '{spacing.sm} {spacing.md}'
  tab-hover:
    backgroundColor: '{colors.surface-raised}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.sm}'
    padding: '{spacing.sm} {spacing.md}'
  divider:
    backgroundColor: '{colors.on-surface}'
    textColor: '{colors.border}'
    rounded: '{rounded.none}'
    padding: '{spacing.2xs}'
  divider-subtle:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.border-subtle}'
    rounded: '{rounded.none}'
    padding: '{spacing.2xs}'
  focus-indicator:
    backgroundColor: '{colors.surface-raised}'
    textColor: '{colors.focus-ring}'
    rounded: '{rounded.sm}'
    padding: '{spacing.2xs}'
  textarea:
    backgroundColor: '{colors.surface-raised}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.md}'
    padding: '{spacing.sm} {spacing.md}'
  textarea-focus:
    backgroundColor: '{colors.surface-overlay}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.md}'
    padding: '{spacing.sm} {spacing.md}'
  textarea-error:
    backgroundColor: '{colors.surface-raised}'
    textColor: '{colors.error}'
    rounded: '{rounded.md}'
    padding: '{spacing.sm} {spacing.md}'
  textarea-disabled:
    backgroundColor: '{colors.neutral}'
    textColor: '{colors.on-surface-muted}'
    rounded: '{rounded.md}'
    padding: '{spacing.sm} {spacing.md}'
  select:
    backgroundColor: '{colors.surface-raised}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.md}'
    padding: '{spacing.sm} {spacing.md}'
  select-open:
    backgroundColor: '{colors.surface-overlay}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.md}'
    padding: '{spacing.sm} {spacing.md}'
  select-disabled:
    backgroundColor: '{colors.neutral}'
    textColor: '{colors.on-surface-muted}'
    rounded: '{rounded.md}'
    padding: '{spacing.sm} {spacing.md}'
  code-block:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.md}'
    padding: '{spacing.md}'
  sidebar:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.none}'
    padding: '{spacing.md}'
  sidebar-section-label:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface-muted}'
    rounded: '{rounded.none}'
    padding: '{spacing.xs} {spacing.md}'
  header:
    backgroundColor: '{colors.surface-raised}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.none}'
    padding: '{spacing.sm} {spacing.lg}'
  breadcrumb-item:
    backgroundColor: '{colors.surface-raised}'
    textColor: '{colors.on-surface-muted}'
    rounded: '{rounded.sm}'
    padding: '{spacing.xs} {spacing.sm}'
  breadcrumb-item-active:
    backgroundColor: '{colors.surface-raised}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.sm}'
    padding: '{spacing.xs} {spacing.sm}'
  command-menu:
    backgroundColor: '{colors.surface-overlay}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.lg}'
    padding: '{spacing.sm}'
  command-menu-item:
    backgroundColor: '{colors.surface-overlay}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.sm}'
    padding: '{spacing.sm} {spacing.md}'
  command-menu-item-active:
    backgroundColor: '{colors.surface-raised}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.sm}'
    padding: '{spacing.sm} {spacing.md}'
  command-menu-section-label:
    backgroundColor: '{colors.surface-overlay}'
    textColor: '{colors.on-surface-muted}'
    rounded: '{rounded.none}'
    padding: '{spacing.xs} {spacing.md}'
  avatar:
    backgroundColor: '{colors.secondary}'
    textColor: '{colors.on-secondary}'
    rounded: '{rounded.full}'
    padding: '{spacing.xs}'
  avatar-muted:
    backgroundColor: '{colors.neutral}'
    textColor: '{colors.on-surface-muted}'
    rounded: '{rounded.full}'
    padding: '{spacing.xs}'
  toast:
    backgroundColor: '{colors.surface-overlay}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.lg}'
    padding: '{spacing.sm} {spacing.md}'
  toast-success:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.on-primary}'
    rounded: '{rounded.lg}'
    padding: '{spacing.sm} {spacing.md}'
  toast-error:
    backgroundColor: '{colors.error}'
    textColor: '{colors.on-error}'
    rounded: '{rounded.lg}'
    padding: '{spacing.sm} {spacing.md}'
  skeleton:
    backgroundColor: '{colors.neutral}'
    textColor: '{colors.on-surface-muted}'
    rounded: '{rounded.md}'
    padding: '{spacing.xs}'
  empty-state:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface-muted}'
    rounded: '{rounded.lg}'
    padding: '{spacing.2xl}'
  table-header:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface-muted}'
    rounded: '{rounded.none}'
    padding: '{spacing.sm} {spacing.md}'
  table-row:
    backgroundColor: '{colors.surface-raised}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.none}'
    padding: '{spacing.sm} {spacing.md}'
  table-row-hover:
    backgroundColor: '{colors.surface-overlay}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.none}'
    padding: '{spacing.sm} {spacing.md}'
  table-row-selected:
    backgroundColor: '{colors.accent-container}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.none}'
    padding: '{spacing.sm} {spacing.md}'
---

## Overview

Terra DS is a warm, text-forward design system built for reading, writing, AI chat, and productivity tools. The interface must recede so content can breathe. Every decision privileges clarity over ornament.

The system defines three surface registers. UI chrome uses cooler cream surfaces for controls, navigation, and tools. Content canvas uses the warmest cream for long-form reading and writing. Conversational surfaces sit between the two for chat and threaded dialogue.

When in doubt, ask: does this element serve the content, or compete with it?

## Colors

Base colors carry semantic meaning. `primary` drives the dominant interactive layer. `secondary` supports it for auxiliary actions. `accent` is reserved for singular emphasis and must never appear on more than one interactive element in a single view. Use `accent` for a maximum of one interactive element per view. Never use it for decoration.

UI surface colors (`surface`, `surface-raised`, `surface-overlay`) form the chrome register. Content surface colors (`surface-content`, `surface-content-raised`) form the reading register. Conversational surface colors (`surface-chat-user`, `surface-chat-assistant`) form the chat register. Utility colors (`border`, `border-subtle`, `error`, `focus-ring`, `neutral`) provide structure and state.

Prohibitions: never use pure white `#ffffff` or pure black `#000000`. Never place `on-surface` text on `surface-content` without verifying contrast. Never use `accent` as a background for large areas.

## Typography

Inter is the exclusive typeface for the UI register. Use it for buttons, labels, navigation, headings in tool panes, and any control that is clicked or tapped. Inter must never be used for long-form reading.

Noto Serif is the exclusive typeface for the content register. Use it for articles, essays, notes, and any continuous text. Noto Serif must never be used for UI controls or navigation.

If text will be read continuously for more than a few seconds, use the content register.

## Layout

The spacing scale is `2xs` (2px), `xs` (4px), `sm` (8px), `md` (16px), `lg` (24px), `xl` (32px), `2xl` (48px), `3xl` (64px). Use `xs` and `sm` for internal component padding and tight gaps. Use `md` and `lg` for card padding and section gutters. Use `xl` through `3xl` for page-level margins and major section breaks.

Content measure must not exceed approximately 65 characters per line. Measure is enforced by max-width, not by font size changes.

Never use raw pixel values. Always reference a spacing token.

## Elevation & Depth

Elevation is expressed through warm-tinted shadows, never grey. Shadows carry a subtle amber or cream tint that harmonizes with the surface palette. The progression runs flat (`surface`) to raised (`surface-raised`) to overlay (`surface-overlay`). Overlays float above all other layers and receive the strongest shadow.

If a shadow draws attention to itself, it is too strong.

## Shapes

Use `rounded.sm` for compact controls such as checkboxes, nav items, and tabs. Use `rounded.md` for buttons, inputs, and callouts. Use `rounded.lg` for cards and chat bubbles. Use `rounded.xl` for dialogs and modals. Use `rounded.full` for pills, toggles, and badges. Use `rounded.none` for full-bleed content pages.

Never use more than two distinct border-radius values within a single view.

## Components

Buttons communicate hierarchy. Use at most one primary button per view. Secondary and ghost buttons handle supporting actions. Destructive buttons are reserved for irreversible operations.

Form controls sit on raised surfaces. Inputs expand to overlay on focus. Checkboxes and toggles use rounded containers and switch to primary when active.

Cards group related content. Interactive cards lift to overlay on hover. Chat bubbles rely on surface tone alone to distinguish user from assistant; never use color hue as the sole differentiator. Content pages use flat surfaces with generous padding. Callouts surface ancillary information on raised content backgrounds.

Overlays block interaction. Dialogs and dropdown menus use the overlay surface. Tooltips use the primary surface for high-contrast visibility.

Navigation relies on muted text for inactive items and raised surfaces for hover. Active states may use accent sparingly.

## Do's and Don'ts

- **Do** use Inter for every UI control, label, and navigation element. **Don't** use Inter for paragraphs, articles, or any text read continuously.
- **Do** use Noto Serif for long-form content and reading experiences. **Don't** use Noto Serif for buttons, tabs, or input labels.
- **Do** use the `accent` color for exactly one primary call-to-action or active indicator per view. **Don't** use accent for decorative icons, backgrounds, or multiple competing actions.
- **Do** reference spacing tokens such as `{spacing.md}` for all layout values. **Don't** write raw pixel values like `16px` directly in component styles.
- **Do** ensure every text and background pair meets WCAG AA contrast. **Don't** place muted text on neutral surfaces without verifying the ratio.
- **Do** place UI controls on `surface` and content on `surface-content`. **Don't** mix surface registers within a single component.
- **Do** limit border-radius diversity to two values per view. **Don't** combine `rounded.lg` cards with `rounded.xl` buttons and `rounded.md` badges in the same composition.
- **Do** distinguish user and assistant chat bubbles through surface tone alone. **Don't** rely on hue or accent color to differentiate chat roles.
- **Do** write component values as `{colors.primary}` or `{spacing.sm}`. **Don't** use bare strings like `primary` or raw hex values in component definitions.
- **Do** reserve the primary button for the single most important action. **Don't** present multiple primary-styled buttons in one form or dialog.
