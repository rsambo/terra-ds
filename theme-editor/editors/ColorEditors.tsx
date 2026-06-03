import React, { useMemo, useState } from 'react';
import {
  Card,
  Input,
  Button,
  Badge,
  Tooltip,
} from '../../src/components';
import {
  COLOR_GROUPS,
  ALL_COLOR_TOKENS,
  CONTRAST_PAIRS,
  contrastRatio,
  wcagLevel,
} from '../../tokens-meta';
import type { ColorOverrides } from '../ThemeEditor';

const HEX_RE = /^#[0-9a-fA-F]{6}$/;
const COLOR_INPUT_FALLBACK = '#' + '000000';
const safeHex = (v: string | undefined, fallback?: string) =>
  v && HEX_RE.test(v) ? v : fallback && HEX_RE.test(fallback) ? fallback : COLOR_INPUT_FALLBACK;

interface Props {
  theme: 'light' | 'dark';
  overrides: ColorOverrides;
  onChange: (theme: 'light' | 'dark', name: string, value: string | undefined) => void;
}

export const ColorEditors: React.FC<Props> = ({ theme, overrides, onChange }) => {
  const [values, setValues] = useState<Record<string, string>>({});

  const defaults = useMemo(() => {
    const def: Record<string, string> = {};
    ALL_COLOR_TOKENS.forEach((n) => {
      const v = getComputedStyle(document.documentElement).getPropertyValue(`--color-${n}`).trim();
      def[n] = v;
    });
    return def;
  }, [theme]);

  const currentValue = (name: string) => {
    return overrides[theme][name] ?? values[name] ?? defaults[name] ?? '#000000';
  };

  const handlePick = (name: string, hex: string) => {
    setValues((v) => ({ ...v, [name]: hex }));
    onChange(theme, name, hex);
  };

  const handleHexInput = (name: string, raw: string) => {
    let val = raw.trim();
    if (val && !val.startsWith('#')) val = '#' + val.replace(/#/g, '');
    setValues((v) => ({ ...v, [name]: val }));
    if (HEX_RE.test(val)) onChange(theme, name, val);
  };

  const handleReset = (name: string) => {
    onChange(theme, name, undefined);
    setValues((v) => ({ ...v, [name]: defaults[name] }));
  };

  const contrastForToken = (name: string) => {
    const result: { pair: string; ratio: number; level: 'AA' | 'AA-large' | 'fail' }[] = [];
    const bgHex = currentValue(name);
    if (!HEX_RE.test(bgHex)) return result;
    for (const pair of CONTRAST_PAIRS) {
      if (pair.bg === name) {
        const fgHex = currentValue(pair.fg);
        if (HEX_RE.test(fgHex)) {
          const ratio = contrastRatio(fgHex, bgHex);
          result.push({ pair: `${pair.fg} / ${pair.bg}`, ratio, level: wcagLevel(ratio) });
        }
      }
      if (pair.fg === name) {
        const bgHex2 = currentValue(pair.bg);
        if (HEX_RE.test(bgHex2)) {
          const ratio = contrastRatio(bgHex, bgHex2);
          result.push({ pair: `${pair.fg} / ${pair.bg}`, ratio, level: wcagLevel(ratio) });
        }
      }
    }
    return result;
  };

  return (
    <div className="p-md space-y-xl">
      {COLOR_GROUPS.map((group) => (
        <section key={group.title}>
          <h3 className="font-heading-sm text-on-surface">{group.title}</h3>
          <p className="font-body-sm text-on-surface-muted mt-2xs mb-md">{group.description}</p>
          <div className="space-y-sm">
            {group.tokens.map((token) => {
              const val = currentValue(token.name);
              const edited = overrides[theme][token.name] !== undefined;
              const badges = contrastForToken(token.name);
              const worst = badges.length > 0 ? badges.reduce((w, b) => (b.ratio < w.ratio ? b : w)) : null;

              return (
                <Card
                  key={token.name}
                  className="flex gap-sm items-start border border-border-subtle p-sm"
                >
                  <div
                    className="w-12 h-12 rounded-md border border-border shrink-0 mt-0.5"
                    style={{ background: val }}
                    aria-hidden
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-sm flex-wrap">
                      <Tooltip content={token.description} side="top">
                        <span className="font-label-sm text-on-surface">{token.title}</span>
                      </Tooltip>
                      {edited && <Badge variant="accent">edited</Badge>}
                      {worst && (
                        <Badge
                          variant={
                            worst.level === 'AA'
                              ? 'default'
                              : worst.level === 'AA-large'
                              ? 'accent'
                              : 'error'
                          }
                        >
                          {worst.level === 'AA' ? '✓ AA' : worst.level === 'AA-large' ? '⚠ AA-large' : '✗ Fail'}
                          {' '}
                          {worst.ratio.toFixed(1)}:1
                        </Badge>
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
                        value={safeHex(val, defaults[token.name])}
                        onChange={(e) => handlePick(token.name, e.target.value)}
                        className="w-8 h-8 rounded-md border border-border bg-transparent cursor-pointer p-0"
                      />
                      <Input
                        type="text"
                        aria-label={`${token.title} hex value`}
                        spellCheck={false}
                        value={val}
                        onChange={(e) => handleHexInput(token.name, e.target.value)}
                        error={val && !HEX_RE.test(val)}
                        className="font-code-md text-sm w-24"
                      />
                      <Button
                        variant="ghost"
                        onClick={() => handleReset(token.name)}
                        disabled={!edited}
                        className="font-label-sm underline disabled:no-underline"
                      >
                        Reset
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
};
