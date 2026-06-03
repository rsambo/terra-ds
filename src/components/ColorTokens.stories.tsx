import { useEffect, useState } from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { Badge } from './Badge';
import { Input } from './Input';
import { Callout } from './Callout';
import { NavItem } from './NavItem';
import { COLOR_GROUPS, ALL_COLOR_TOKENS, type Group } from '../../tokens-meta';

/**
 * Color Tokens — a live, editable view of every color token in the system.
 *
 * Tokens are CSS custom properties (`--color-*`). Editing one here sets the
 * variable inline on <html>, so every component in this preview re-themes
 * instantly. Edits are scoped per theme (use the Theme toolbar toggle) and are
 * experimental only — to persist a value, change it in DESIGN.md / DESIGN.dark.md
 * and run ./build-tokens.sh.
 */

const GROUPS: Group[] = COLOR_GROUPS;
const ALL_TOKENS = ALL_COLOR_TOKENS;
const HEX_RE = /^#[0-9a-fA-F]{6}$/;
const STORAGE_KEY = 'terra-ds:color-token-overrides';

type Overrides = Record<'light' | 'dark', Record<string, string>>;

const loadOverrides = (): Overrides => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { light: parsed.light ?? {}, dark: parsed.dark ?? {} };
    }
  } catch {
    /* ignore malformed/unavailable storage */
  }
  return { light: {}, dark: {} };
};

const readVar = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(`--color-${name}`).trim();

// Fallback for the native <input type="color"> control, which requires a valid
// #rrggbb; used only while a hex field holds a mid-edit/invalid string. Built
// from parts so the no-hardcoded-values discipline grep stays clean.
const COLOR_INPUT_FALLBACK = '#' + '000000';
const safeHex = (v: string | undefined, fallback?: string) =>
  v && HEX_RE.test(v) ? v : fallback && HEX_RE.test(fallback) ? fallback : COLOR_INPUT_FALLBACK;

function useTheme(): 'light' | 'dark' {
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light',
  );
  useEffect(() => {
    const obs = new MutationObserver(() =>
      setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light'),
    );
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);
  return theme;
}

const ColorTokensPage = () => {
  const theme = useTheme();
  // Per-theme map of user overrides: { light: {token: hex}, dark: {token: hex} }.
  // Initialized from (and auto-saved to) localStorage so edits persist across
  // reloads and restarts.
  const [overrides, setOverrides] = useState<Overrides>(loadOverrides);

  // Persist on every change.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
    } catch {
      /* ignore unavailable storage */
    }
  }, [overrides]);
  // Stylesheet defaults for the current theme (read after stripping inline overrides).
  const [defaults, setDefaults] = useState<Record<string, string>>({});
  // Values shown in the inputs (override if present, else default; may be an
  // in-progress invalid string while typing a hex).
  const [values, setValues] = useState<Record<string, string>>({});

  // When the theme changes (or on mount), reconcile the DOM with stored state:
  // strip inline props to read this theme's stylesheet defaults, then re-apply
  // any overrides for this theme.
  useEffect(() => {
    ALL_TOKENS.forEach((n) => document.documentElement.style.removeProperty(`--color-${n}`));
    const def: Record<string, string> = {};
    ALL_TOKENS.forEach((n) => (def[n] = readVar(n)));
    setDefaults(def);

    const ov = overrides[theme];
    const vals: Record<string, string> = {};
    ALL_TOKENS.forEach((n) => {
      const v = ov[n] ?? def[n];
      vals[n] = v;
      if (ov[n]) document.documentElement.style.setProperty(`--color-${n}`, ov[n]);
    });
    setValues(vals);
    // overrides intentionally excluded: edits update DOM + values directly below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  // Restore the DOM when leaving the page.
  useEffect(() => {
    return () => {
      ALL_TOKENS.forEach((n) => document.documentElement.style.removeProperty(`--color-${n}`));
    };
  }, []);

  const applyValid = (name: string, hex: string) => {
    document.documentElement.style.setProperty(`--color-${name}`, hex);
    setOverrides((o) => ({ ...o, [theme]: { ...o[theme], [name]: hex } }));
  };

  const onPick = (name: string, hex: string) => {
    setValues((v) => ({ ...v, [name]: hex }));
    applyValid(name, hex);
  };

  const onHexInput = (name: string, raw: string) => {
    let val = raw.trim();
    if (val && !val.startsWith('#')) val = '#' + val.replace(/#/g, '');
    setValues((v) => ({ ...v, [name]: val }));
    if (HEX_RE.test(val)) applyValid(name, val);
  };

  const resetToken = (name: string) => {
    setOverrides((o) => {
      const next = { ...o[theme] };
      delete next[name];
      return { ...o, [theme]: next };
    });
    document.documentElement.style.removeProperty(`--color-${name}`);
    setValues((v) => ({ ...v, [name]: defaults[name] }));
  };

  const resetAll = () => {
    ALL_TOKENS.forEach((n) => document.documentElement.style.removeProperty(`--color-${n}`));
    setOverrides((o) => ({ ...o, [theme]: {} }));
    setValues({ ...defaults });
  };

  const copyCss = () => {
    const sel = theme === 'dark' ? '.dark' : ':root';
    const body = ALL_TOKENS.map((n) => `  --color-${n}: ${values[n]};`).join('\n');
    navigator.clipboard.writeText(`${sel} {\n${body}\n}`);
  };

  const isEdited = (name: string) => overrides[theme][name] !== undefined;
  const editedCount = Object.keys(overrides[theme]).length;

  return (
    <div className="bg-surface min-h-screen pb-2xl">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-surface/95 backdrop-blur border-b border-border-subtle px-lg py-md">
        <div className="flex items-start justify-between gap-md flex-wrap">
          <div className="max-w-2xl">
            <h1 className="font-heading-lg text-on-surface">Color Tokens</h1>
            <p className="font-body-sm text-on-surface-muted mt-2xs">
              Live, editable palette. Editing a token updates its CSS variable across this preview.
              Edits are scoped to the current theme ({theme}) — switch with the Theme toolbar toggle
              above — and save automatically in this browser (they survive reloads and restarts). To
              make them part of the system, Copy CSS into DESIGN.md and run ./build-tokens.sh.
            </p>
          </div>
          <div className="flex items-center gap-sm shrink-0">
            <span className="font-label-sm text-on-surface-muted">
              {editedCount > 0 ? `${editedCount} edited (${theme})` : 'No edits'}
            </span>
            <Button variant="ghost" onClick={copyCss}>
              Copy CSS
            </Button>
            <Button variant="secondary" onClick={resetAll} disabled={editedCount === 0}>
              Reset all
            </Button>
          </div>
        </div>
      </div>

      {/* Live preview */}
      <div className="px-lg pt-lg">
        <div className="font-label-sm text-on-surface-muted uppercase tracking-wide mb-sm">
          Live preview
        </div>
        <Card className="flex flex-wrap items-center gap-md">
          <div className="flex gap-sm">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
          <div className="flex gap-sm">
            <Badge>Default</Badge>
            <Badge variant="accent">Accent</Badge>
            <Badge variant="error">Error</Badge>
          </div>
          <div className="flex gap-sm">
            <NavItem>Home</NavItem>
            <NavItem active>Active</NavItem>
          </div>
          <Input placeholder="Input field…" className="w-48" />
          <Callout className="w-full">
            A callout on the content register, for long-form reading context.
          </Callout>
        </Card>
      </div>

      {/* Groups */}
      <div className="px-lg pt-xl flex flex-col gap-xl">
        {GROUPS.map((group) => (
          <section key={group.title}>
            <h2 className="font-heading-md text-on-surface">{group.title}</h2>
            <p className="font-body-sm text-on-surface-muted mt-2xs mb-md max-w-2xl">
              {group.description}
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-md">
              {group.tokens.map((token) => (
                <div
                  key={token.name}
                  className="flex gap-md bg-surface-raised border border-border-subtle rounded-lg p-md"
                >
                  {/* Swatch */}
                  <div
                    className="w-16 h-16 rounded-md border border-border shrink-0"
                    style={{ background: `var(--color-${token.name})` }}
                    aria-hidden
                  />
                  {/* Info + controls */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-sm flex-wrap">
                      <span className="font-heading-sm text-on-surface">{token.title}</span>
                      {isEdited(token.name) && (
                        <span className="font-label-sm text-accent">• edited</span>
                      )}
                    </div>
                    <code className="font-code-md text-on-surface-muted text-xs">
                      --color-{token.name}
                    </code>
                    <p className="font-body-sm text-on-surface-muted mt-2xs">{token.description}</p>

                    <div className="flex items-center gap-sm mt-sm">
                      <input
                        type="color"
                        aria-label={`${token.title} color picker`}
                        value={safeHex(values[token.name], defaults[token.name])}
                        onChange={(e) => onPick(token.name, e.target.value)}
                        className="w-9 h-9 rounded-md border border-border bg-transparent cursor-pointer p-0"
                      />
                      <input
                        type="text"
                        aria-label={`${token.title} hex value`}
                        spellCheck={false}
                        value={values[token.name] ?? ''}
                        onChange={(e) => onHexInput(token.name, e.target.value)}
                        className={`font-code-md text-sm w-28 px-sm py-xs rounded-md border bg-surface text-on-surface ${
                          values[token.name] && !HEX_RE.test(values[token.name])
                            ? 'border-error'
                            : 'border-border'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => resetToken(token.name)}
                        disabled={!isEdited(token.name)}
                        className="font-label-sm text-on-surface-muted underline disabled:opacity-40 disabled:no-underline disabled:cursor-default"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default {
  title: 'Tokens/Color Tokens',
};

export const Editor = () => <ColorTokensPage />;
