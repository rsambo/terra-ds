import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Sampler } from './Sampler';
import { ColorEditors } from './editors/ColorEditors';
import { SpacingEditors } from './editors/SpacingEditors';
import { RadiusEditors } from './editors/RadiusEditors';
import { TypographyEditors } from './editors/TypographyEditors';
import {
  Button,
  Toggle,
  Callout,
  TabsRoot,
  TabList,
  Tab,
  TabContent,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '../src/components';
import {
  ALL_COLOR_TOKENS,
  ALL_SPACING_TOKENS,
  ALL_RADIUS_TOKENS,
  ALL_TYPOGRAPHY_ROLES,
  CONTRAST_PAIRS,
  contrastRatio,
  wcagLevel,
} from '../tokens-meta';

type Theme = 'light' | 'dark';
type Category = 'colors' | 'spacing' | 'radius' | 'typography';

export type ColorOverrides = Record<Theme, Record<string, string>>;
export type SpacingOverrides = Record<string, string>;
export type RadiusOverrides = Record<string, string>;
export type TypographyOverrides = Record<string, Record<string, string>>;

export interface EditorState {
  colors: ColorOverrides;
  spacing: SpacingOverrides;
  radius: RadiusOverrides;
  typography: TypographyOverrides;
}

const STORAGE_KEY = 'terra-ds:theme-editor';

function loadState(): EditorState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return {
    colors: { light: {}, dark: {} },
    spacing: {},
    radius: {},
    typography: {},
  };
}

function saveState(state: EditorState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch { /* ignore */ }
}

const readVar = (prefix: string, name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(`--${prefix}-${name}`).trim();

function applyOverrides(state: EditorState) {
  const root = document.documentElement;
  ALL_COLOR_TOKENS.forEach((name) => {
    const light = state.colors.light[name];
    const dark = state.colors.dark[name];
    if (light && !root.classList.contains('dark')) root.style.setProperty(`--color-${name}`, light);
    else if (!dark && !root.classList.contains('dark')) root.style.removeProperty(`--color-${name}`);
    if (dark && root.classList.contains('dark')) root.style.setProperty(`--color-${name}`, dark);
    else if (!light && root.classList.contains('dark')) root.style.removeProperty(`--color-${name}`);
  });
  ALL_SPACING_TOKENS.forEach((name) => {
    const v = state.spacing[name];
    if (v) root.style.setProperty(`--spacing-${name}`, v);
    else root.style.removeProperty(`--spacing-${name}`);
  });
  ALL_RADIUS_TOKENS.forEach((name) => {
    const v = state.radius[name];
    if (v) root.style.setProperty(`--rounded-${name}`, v);
    else root.style.removeProperty(`--rounded-${name}`);
  });
  ALL_TYPOGRAPHY_ROLES.forEach((role) => {
    const ov = state.typography[role] || {};
    if (ov.fontFamily) root.style.setProperty(`--font-family-${role}`, ov.fontFamily);
    else root.style.removeProperty(`--font-family-${role}`);
    if (ov.fontSize) root.style.setProperty(`--font-size-${role}`, ov.fontSize);
    else root.style.removeProperty(`--font-size-${role}`);
    if (ov.fontWeight) root.style.setProperty(`--font-weight-${role}`, ov.fontWeight);
    else root.style.removeProperty(`--font-weight-${role}`);
    if (ov.lineHeight) root.style.setProperty(`--line-height-${role}`, ov.lineHeight);
    else root.style.removeProperty(`--line-height-${role}`);
    if (ov.letterSpacing) root.style.setProperty(`--letter-spacing-${role}`, ov.letterSpacing);
    else root.style.removeProperty(`--letter-spacing-${role}`);
  });
}

function clearOverrides() {
  const root = document.documentElement;
  ALL_COLOR_TOKENS.forEach((n) => root.style.removeProperty(`--color-${n}`));
  ALL_SPACING_TOKENS.forEach((n) => root.style.removeProperty(`--spacing-${n}`));
  ALL_RADIUS_TOKENS.forEach((n) => root.style.removeProperty(`--rounded-${n}`));
  ALL_TYPOGRAPHY_ROLES.forEach((role) => {
    root.style.removeProperty(`--font-family-${role}`);
    root.style.removeProperty(`--font-size-${role}`);
    root.style.removeProperty(`--font-weight-${role}`);
    root.style.removeProperty(`--line-height-${role}`);
    root.style.removeProperty(`--letter-spacing-${role}`);
  });
}

export const ThemeEditor: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('light');
  const [category, setCategory] = useState<Category>('colors');
  const [state, setState] = useState<EditorState>(loadState);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [showLifeline, setShowLifeline] = useState(false);
  const importRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    applyOverrides(state);
    saveState(state);
  }, [state, theme]);

  useEffect(() => {
    return () => clearOverrides();
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === '0') {
        e.preventDefault();
        handleResetAll();
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        handleRevertLast();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [state]);

  const handleResetAll = useCallback(() => {
    setState({ colors: { light: {}, dark: {} }, spacing: {}, radius: {}, typography: {} });
  }, []);

  const [lastState, setLastState] = useState<EditorState | null>(null);

  const handleRevertLast = useCallback(() => {
    if (lastState) {
      setState(lastState);
      setLastState(null);
    }
  }, [lastState]);

  const updateColors = useCallback((themeKey: Theme, name: string, value: string | undefined) => {
    setLastState((prev) => prev || JSON.parse(JSON.stringify(state)));
    setState((s) => {
      const next = { ...s, colors: { ...s.colors, [themeKey]: { ...s.colors[themeKey] } } };
      if (value === undefined) delete next.colors[themeKey][name];
      else next.colors[themeKey][name] = value;
      return next;
    });
  }, [state]);

  const updateSpacing = useCallback((name: string, value: string | undefined) => {
    setLastState((prev) => prev || JSON.parse(JSON.stringify(state)));
    setState((s) => {
      const next = { ...s, spacing: { ...s.spacing } };
      if (value === undefined) delete next.spacing[name];
      else next.spacing[name] = value;
      return next;
    });
  }, [state]);

  const updateRadius = useCallback((name: string, value: string | undefined) => {
    setLastState((prev) => prev || JSON.parse(JSON.stringify(state)));
    setState((s) => {
      const next = { ...s, radius: { ...s.radius } };
      if (value === undefined) delete next.radius[name];
      else next.radius[name] = value;
      return next;
    });
  }, [state]);

  const updateTypography = useCallback((role: string, prop: string, value: string | undefined) => {
    setLastState((prev) => prev || JSON.parse(JSON.stringify(state)));
    setState((s) => {
      const next = { ...s, typography: { ...s.typography, [role]: { ...(s.typography[role] || {}) } } };
      if (value === undefined) delete next.typography[role][prop];
      else next.typography[role][prop] = value;
      return next;
    });
  }, [state]);

  const editedCounts = useMemo(() => {
    const lightColors = Object.keys(state.colors.light).length;
    const darkColors = Object.keys(state.colors.dark).length;
    const spacing = Object.keys(state.spacing).length;
    const radius = Object.keys(state.radius).length;
    const typography = Object.values(state.typography).reduce((sum, r) => sum + Object.keys(r).length, 0);
    return { lightColors, darkColors, spacing, radius, typography, total: lightColors + darkColors + spacing + radius + typography };
  }, [state]);

  const contrastSummary = useMemo(() => {
    const root = getComputedStyle(document.documentElement);
    const getColor = (name: string) => root.getPropertyValue(`--color-${name}`).trim();
    let fail = 0;
    let aaLarge = 0;
    let aa = 0;
    for (const pair of CONTRAST_PAIRS) {
      const ratio = contrastRatio(getColor(pair.fg), getColor(pair.bg));
      const level = wcagLevel(ratio);
      if (level === 'fail') fail++;
      else if (level === 'AA-large') aaLarge++;
      else aa++;
    }
    return { fail, aaLarge, aa };
  }, [state, theme]);

  const handleSave = useCallback(async () => {
    setSaving(true);
    setSaveError(null);
    try {
      const res = await fetch('/__write-tokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          colors: state.colors,
          spacing: state.spacing,
          rounded: state.radius,
          typography: state.typography,
        }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || 'Save failed');
      setState({ colors: { light: {}, dark: {} }, spacing: {}, radius: {}, typography: {} });
    } catch (err: any) {
      setSaveError(err?.message || String(err));
    } finally {
      setSaving(false);
    }
  }, [state]);

  const handleExport = useCallback(() => {
    const root = getComputedStyle(document.documentElement);
    const get = (prefix: string, name: string) => root.getPropertyValue(`--${prefix}-${name}`).trim();

    const themeJson = {
      name: 'Terra DS Theme',
      version: '1.0.0',
      colors: {
        light: Object.fromEntries(ALL_COLOR_TOKENS.map((n) => [n, get('color', n)])),
        dark: Object.fromEntries(ALL_COLOR_TOKENS.map((n) => [n, get('color', n)])),
      },
      spacing: Object.fromEntries(ALL_SPACING_TOKENS.map((n) => [n, get('spacing', n)])),
      rounded: Object.fromEntries(ALL_RADIUS_TOKENS.map((n) => [n, get('rounded', n)])),
      typography: Object.fromEntries(ALL_TYPOGRAPHY_ROLES.map((role) => [
        role,
        {
          fontFamily: get('font-family', role),
          fontSize: get('font-size', role),
          fontWeight: get('font-weight', role),
          lineHeight: get('line-height', role),
          letterSpacing: get('letter-spacing', role),
        },
      ])),
    };

    const blob = new Blob([JSON.stringify(themeJson, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'theme.json';
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  const handleImport = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result));
        const newState: EditorState = {
          colors: { light: {}, dark: {} },
          spacing: {},
          radius: {},
          typography: {},
        };

        if (data.colors?.light) {
          for (const [k, v] of Object.entries(data.colors.light)) {
            if (ALL_COLOR_TOKENS.includes(k) && typeof v === 'string') newState.colors.light[k] = v;
          }
        }
        if (data.colors?.dark) {
          for (const [k, v] of Object.entries(data.colors.dark)) {
            if (ALL_COLOR_TOKENS.includes(k) && typeof v === 'string') newState.colors.dark[k] = v;
          }
        }
        if (data.spacing) {
          for (const [k, v] of Object.entries(data.spacing)) {
            if (ALL_SPACING_TOKENS.includes(k) && typeof v === 'string') newState.spacing[k] = v;
          }
        }
        if (data.rounded) {
          for (const [k, v] of Object.entries(data.rounded)) {
            if (ALL_RADIUS_TOKENS.includes(k) && typeof v === 'string') newState.radius[k] = v;
          }
        }
        if (data.typography) {
          for (const [role, props] of Object.entries(data.typography)) {
            if (ALL_TYPOGRAPHY_ROLES.includes(role) && props && typeof props === 'object') {
              newState.typography[role] = {};
              for (const [prop, val] of Object.entries(props as Record<string, unknown>)) {
                if (typeof val === 'string') newState.typography[role][prop] = val;
              }
            }
          }
        }

        setState(newState);
      } catch {
        setSaveError('Failed to parse theme.json');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }, []);

  const badges: string[] = [];
  if (editedCounts.lightColors) badges.push(`● ${editedCounts.lightColors} light`);
  if (editedCounts.darkColors) badges.push(`● ${editedCounts.darkColors} dark`);
  if (editedCounts.spacing) badges.push(`● ${editedCounts.spacing} spacing`);
  if (editedCounts.radius) badges.push(`● ${editedCounts.radius} radius`);
  if (editedCounts.typography) badges.push(`● ${editedCounts.typography} typography`);

  return (
    <div className="h-screen flex flex-col bg-surface text-on-surface font-body-md overflow-hidden">
      {/* Toolbar */}
      <header className="shrink-0 flex items-center justify-between gap-md px-lg py-sm border-b border-border-subtle bg-surface-raised">
        <div className="flex items-center gap-md">
          <h1 className="font-heading-sm">Terra DS Theme Editor</h1>
          <TabsRoot value={category} onValueChange={(v) => setCategory(v as Category)}>
            <TabList>
              {(['colors', 'spacing', 'radius', 'typography'] as Category[]).map((cat) => (
                <Tab key={cat} value={cat}>
                  {cat[0].toUpperCase() + cat.slice(1)}
                </Tab>
              ))}
            </TabList>
          </TabsRoot>
        </div>

        <div className="flex items-center gap-md flex-wrap">
          <Toggle
            checked={theme === 'dark'}
            onCheckedChange={(v) => setTheme(v ? 'dark' : 'light')}
            label={theme === 'light' ? 'Light' : 'Dark'}
          />

          {badges.length > 0 && (
            <span className="font-label-sm text-accent">{badges.join(' · ')}</span>
          )}

          <DropdownMenu
            trigger={
              <Button variant="ghost" className="font-label-sm">
                Export / Import
              </Button>
            }
          >
            <DropdownMenuItem onClick={handleExport}>Export theme.json</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => importRef.current?.click()}>Import theme.json</DropdownMenuItem>
          </DropdownMenu>
          <input
            ref={importRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={handleImport}
          />

          <Button
            variant="primary"
            onClick={handleSave}
            disabled={editedCounts.total === 0 || saving}
          >
            {saving ? 'Saving…' : 'Save'}
          </Button>
        </div>
      </header>

      {saveError && (
        <Callout className="shrink-0 rounded-none border-b border-error/20 bg-error/10 text-error font-body-sm">
          Save failed: {saveError}
        </Callout>
      )}

      {/* Contrast summary */}
      <div className="shrink-0 flex items-center gap-sm px-lg py-2xs border-b border-border-subtle bg-surface">
        <span className="font-label-sm text-on-surface-muted">Contrast:</span>
        <span className={`font-label-sm ${contrastSummary.fail > 0 ? 'text-error' : 'text-on-surface-muted'}`}>
          {contrastSummary.fail} fail
        </span>
        <span className="font-label-sm text-on-surface-muted">·</span>
        <span className="font-label-sm text-on-surface-muted">{contrastSummary.aaLarge} AA-large</span>
        <span className="font-label-sm text-on-surface-muted">·</span>
        <span className="font-label-sm text-on-surface-muted">{contrastSummary.aa} AA</span>
      </div>

      {/* Main split */}
      <div className="flex-1 flex overflow-hidden">
        <div className="w-[420px] min-w-[320px] overflow-y-auto border-r border-border-subtle bg-surface">
          <TabsRoot value={category} onValueChange={(v) => setCategory(v as Category)}>
            <TabContent value="colors">
              <ColorEditors
                theme={theme}
                overrides={state.colors}
                onChange={updateColors}
              />
            </TabContent>
            <TabContent value="spacing">
              <SpacingEditors
                overrides={state.spacing}
                onChange={updateSpacing}
              />
            </TabContent>
            <TabContent value="radius">
              <RadiusEditors
                overrides={state.radius}
                onChange={updateRadius}
              />
            </TabContent>
            <TabContent value="typography">
              <TypographyEditors
                overrides={state.typography}
                onChange={updateTypography}
              />
            </TabContent>
          </TabsRoot>
        </div>

        <div className="flex-1 overflow-y-auto bg-surface">
          <Sampler />
        </div>
      </div>

      {/* Safety lifeline — raw fixed-style element, never DS */}
      <button
        onClick={() => setShowLifeline((s) => !s)}
        className="fixed bottom-4 right-4 z-50"
        style={{
          background: '#ffffff',
          color: '#1a1a1a',
          border: '1px solid #cccccc',
          borderRadius: '6px',
          padding: '8px 12px',
          fontSize: '12px',
          fontWeight: 500,
          fontFamily: 'system-ui, sans-serif',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          cursor: 'pointer',
        }}
      >
        🛟 Lifeline
      </button>

      {showLifeline && (
        <div
          className="fixed bottom-16 right-4 z-50 flex flex-col gap-2"
          style={{
            background: '#ffffff',
            color: '#1a1a1a',
            border: '1px solid #cccccc',
            borderRadius: '8px',
            padding: '12px',
            fontSize: '13px',
            fontFamily: 'system-ui, sans-serif',
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            minWidth: '180px',
          }}
        >
          <div className="font-semibold mb-1" style={{ fontFamily: 'system-ui, sans-serif' }}>Safety Lifeline</div>
          <button
            onClick={handleRevertLast}
            disabled={!lastState}
            className="text-left px-2 py-1 rounded hover:bg-gray-100 disabled:opacity-40"
            style={{ fontFamily: 'system-ui, sans-serif' }}
          >
            ↩ Revert last edit (Esc)
          </button>
          <button
            onClick={handleResetAll}
            className="text-left px-2 py-1 rounded hover:bg-gray-100"
            style={{ fontFamily: 'system-ui, sans-serif' }}
          >
            ↺ Reset all overrides (⌘0)
          </button>
          <button
            onClick={() => setTheme('light')}
            className="text-left px-2 py-1 rounded hover:bg-gray-100"
            style={{ fontFamily: 'system-ui, sans-serif' }}
          >
            ☀ Force light theme
          </button>
        </div>
      )}
    </div>
  );
};
