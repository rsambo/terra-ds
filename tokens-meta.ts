/**
 * Token metadata shared between the Theme Editor and Storybook stories.
 * Lives at repo root (outside src/components/) so it isn't bundled into
 * the published package.
 */

export type TokenMeta = { name: string; title: string; description: string };
export type Group = { title: string; description: string; tokens: TokenMeta[] };

export const COLOR_GROUPS: Group[] = [
  {
    title: 'Brand & Action',
    description:
      'The core brand tones used for buttons and emphasis. "Container" pairs a soft tonal background with its base; "on-" is the text/icon color placed on top of a filled element.',
    tokens: [
      {
        name: 'primary',
        title: 'Primary',
        description:
          'Core brand color — the deep espresso brown. Primary button fill and primary text on light surfaces.',
      },
      {
        name: 'primary-container',
        title: 'Primary Container',
        description: 'Soft tonal background paired with primary — subtle filled backgrounds and selected states.',
      },
      {
        name: 'on-primary',
        title: 'On Primary',
        description: 'Text/icon color placed on top of a primary fill (e.g. the label inside a primary button).',
      },
      {
        name: 'secondary',
        title: 'Secondary',
        description: 'Supporting brand tone — secondary buttons and lower-emphasis text or icons.',
      },
      {
        name: 'secondary-container',
        title: 'Secondary Container',
        description: 'Tonal background paired with secondary for muted filled surfaces.',
      },
      {
        name: 'on-secondary',
        title: 'On Secondary',
        description: 'Text/icon color placed on top of a secondary fill.',
      },
      {
        name: 'accent',
        title: 'Accent',
        description:
          'The single earthy amber. One interactive highlight per view — links, active accents, primary CTAs. Use sparingly.',
      },
      {
        name: 'accent-container',
        title: 'Accent Container',
        description: 'Soft amber wash behind accented elements — accent badges and highlighted regions.',
      },
      {
        name: 'on-accent',
        title: 'On Accent',
        description: 'Text/icon color placed on top of an accent fill.',
      },
    ],
  },
  {
    title: 'UI Surfaces (chrome)',
    description:
      'The cooler-cream chrome register: app shell, sidebars, toolbars, cards, menus. Three elevations that must stay materially distinct.',
    tokens: [
      {
        name: 'surface',
        title: 'Surface',
        description: 'Default UI background (cooler cream) — app shell, sidebars, toolbars.',
      },
      {
        name: 'surface-raised',
        title: 'Surface Raised',
        description: 'Elevated chrome that sits above the base — cards, menus, popovers.',
      },
      {
        name: 'surface-overlay',
        title: 'Surface Overlay',
        description: 'Highest elevation — dialogs, dropdowns, and overlays floating over everything.',
      },
      {
        name: 'on-surface',
        title: 'On Surface',
        description: 'Primary text/icon color on UI surfaces.',
      },
      {
        name: 'on-surface-muted',
        title: 'On Surface Muted',
        description: 'Secondary text on UI surfaces — captions, placeholders, disabled labels.',
      },
    ],
  },
  {
    title: 'Content Canvas (paper)',
    description:
      'The warmest-cream "paper" register for long-form reading and writing. Pairs with the Noto Serif content type scale.',
    tokens: [
      {
        name: 'surface-content',
        title: 'Surface Content',
        description: 'The reading/writing canvas — warmest cream "paper" for long-form content.',
      },
      {
        name: 'surface-content-raised',
        title: 'Surface Content Raised',
        description: 'Raised blocks within the canvas — callouts and cards inside an article.',
      },
      {
        name: 'on-content',
        title: 'On Content',
        description: 'Primary (serif) body text color on the content canvas.',
      },
      {
        name: 'on-content-muted',
        title: 'On Content Muted',
        description: 'Muted text on the content canvas — captions, metadata, footnotes.',
      },
    ],
  },
  {
    title: 'Conversational (chat)',
    description:
      'The in-between register for AI chat bubbles — distinct from both chrome and paper so a conversation reads as its own surface.',
    tokens: [
      {
        name: 'surface-chat-user',
        title: 'Chat — User Bubble',
        description: "Background of the user's chat message bubble.",
      },
      {
        name: 'surface-chat-assistant',
        title: 'Chat — Assistant Bubble',
        description: "Background of the assistant's chat message bubble.",
      },
      {
        name: 'on-chat',
        title: 'On Chat',
        description: 'Text color inside chat bubbles (both sides).',
      },
    ],
  },
  {
    title: 'Borders & Lines',
    description: 'Warm-tinted dividers and outlines — never cool grey.',
    tokens: [
      {
        name: 'border',
        title: 'Border',
        description: 'Default border/divider — input outlines, card edges, table lines.',
      },
      {
        name: 'border-subtle',
        title: 'Border Subtle',
        description: 'Faint separators where a full border would feel too heavy.',
      },
    ],
  },
  {
    title: 'Feedback & State',
    description: 'Error and focus communication.',
    tokens: [
      {
        name: 'error',
        title: 'Error',
        description: 'Destructive/error states — validation text, error badges, danger buttons.',
      },
      {
        name: 'on-error',
        title: 'On Error',
        description: 'Text/icon color placed on top of an error fill.',
      },
      {
        name: 'focus-ring',
        title: 'Focus Ring',
        description: 'Keyboard-focus indicator ring around interactive elements.',
      },
    ],
  },
  {
    title: 'Neutral',
    description: 'Generic neutral fill.',
    tokens: [
      {
        name: 'neutral',
        title: 'Neutral',
        description: 'Neutral filled background — chips, skeletons, subtle hover fills.',
      },
    ],
  },
];

export const ALL_COLOR_TOKENS = COLOR_GROUPS.flatMap((g) => g.tokens.map((t) => t.name));

export const SPACING_META = [
  { name: '2xs', title: '2XS', description: 'Micro gaps and hairline spacing.' },
  { name: 'xs', title: 'XS', description: 'Tight internal padding, icon gaps.' },
  { name: 'sm', title: 'SM', description: 'Button padding, compact controls.' },
  { name: 'md', title: 'MD', description: 'Card padding, form field padding.' },
  { name: 'lg', title: 'LG', description: 'Section gutters, card margins.' },
  { name: 'xl', title: 'XL', description: 'Page-level margins.' },
  { name: '2xl', title: '2XL', description: 'Major section breaks.' },
  { name: '3xl', title: '3XL', description: 'Layout macro gaps.' },
];

export const ALL_SPACING_TOKENS = SPACING_META.map((s) => s.name);

export const RADIUS_META = [
  { name: 'none', title: 'None', description: 'Full-bleed content pages, tables.' },
  { name: 'sm', title: 'Small', description: 'Checkboxes, nav items, tabs.' },
  { name: 'md', title: 'Medium', description: 'Buttons, inputs, callouts.' },
  { name: 'lg', title: 'Large', description: 'Cards, chat bubbles.' },
  { name: 'xl', title: 'Extra Large', description: 'Dialogs, modals.' },
  { name: 'full', title: 'Full', description: 'Pills, toggles, badges.' },
];

export const ALL_RADIUS_TOKENS = RADIUS_META.map((r) => r.name);

export const TYPOGRAPHY_ROLES = [
  { name: 'display-lg', title: 'Display LG', register: 'ui' },
  { name: 'display-sm', title: 'Display SM', register: 'ui' },
  { name: 'heading-xl', title: 'Heading XL', register: 'ui' },
  { name: 'heading-lg', title: 'Heading LG', register: 'ui' },
  { name: 'heading-md', title: 'Heading MD', register: 'ui' },
  { name: 'heading-sm', title: 'Heading SM', register: 'ui' },
  { name: 'body-lg', title: 'Body LG', register: 'ui' },
  { name: 'body-md', title: 'Body MD', register: 'ui' },
  { name: 'body-sm', title: 'Body SM', register: 'ui' },
  { name: 'label-lg', title: 'Label LG', register: 'ui' },
  { name: 'label-sm', title: 'Label SM', register: 'ui' },
  { name: 'code-md', title: 'Code MD', register: 'mono' },
  { name: 'content-display', title: 'Content Display', register: 'content' },
  { name: 'content-heading-lg', title: 'Content Heading LG', register: 'content' },
  { name: 'content-heading-md', title: 'Content Heading MD', register: 'content' },
  { name: 'content-heading-sm', title: 'Content Heading SM', register: 'content' },
  { name: 'content-body-lg', title: 'Content Body LG', register: 'content' },
  { name: 'content-body-md', title: 'Content Body MD', register: 'content' },
  { name: 'content-caption', title: 'Content Caption', register: 'content' },
  { name: 'content-blockquote', title: 'Content Blockquote', register: 'content' },
] as const;

export const ALL_TYPOGRAPHY_ROLES = TYPOGRAPHY_ROLES.map((r) => r.name);

export const TYPOGRAPHY_FAMILY_STACKS = [
  { key: 'ui', title: 'UI Sans', default: "Inter, system-ui, sans-serif" },
  { key: 'content', title: 'Content Serif', default: "'Noto Serif', Georgia, serif" },
  { key: 'mono', title: 'Mono', default: "'SF Mono', Monaco, monospace" },
];

export const CONTRAST_PAIRS: { fg: string; bg: string }[] = [
  { fg: 'on-surface', bg: 'surface' },
  { fg: 'on-surface-muted', bg: 'surface' },
  { fg: 'on-primary', bg: 'primary' },
  { fg: 'on-secondary', bg: 'secondary' },
  { fg: 'on-accent', bg: 'accent' },
  { fg: 'on-content', bg: 'surface-content' },
  { fg: 'on-content-muted', bg: 'surface-content' },
  { fg: 'on-chat', bg: 'surface-chat-user' },
  { fg: 'on-chat', bg: 'surface-chat-assistant' },
  { fg: 'on-error', bg: 'error' },
  { fg: 'on-surface', bg: 'surface-raised' },
  { fg: 'on-surface-muted', bg: 'surface-raised' },
  { fg: 'on-surface', bg: 'surface-overlay' },
];

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = /^#?([a-fA-F0-9]{6})$/.exec(hex.trim());
  if (!m) return null;
  const v = parseInt(m[1], 16);
  return { r: (v >> 16) & 0xff, g: (v >> 8) & 0xff, b: v & 0xff };
}

function luminance(rgb: { r: number; g: number; b: number }): number {
  const a = [rgb.r, rgb.g, rgb.b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export function contrastRatio(fgHex: string, bgHex: string): number {
  const fg = hexToRgb(fgHex);
  const bg = hexToRgb(bgHex);
  if (!fg || !bg) return 0;
  const l1 = luminance(fg) + 0.05;
  const l2 = luminance(bg) + 0.05;
  return l1 > l2 ? l1 / l2 : l2 / l1;
}

export function wcagLevel(ratio: number): 'AA' | 'AA-large' | 'fail' {
  if (ratio >= 4.5) return 'AA';
  if (ratio >= 3) return 'AA-large';
  return 'fail';
}
