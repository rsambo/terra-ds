import React, { useMemo } from 'react';
import { SPACING_META } from '../../tokens-meta';

interface Props {
  overrides: Record<string, string>;
  onChange: (name: string, value: string | undefined) => void;
}

const DIM_RE = /^\d+(\.\d+)?(px|rem|em|%)$/;

export const SpacingEditors: React.FC<Props> = ({ overrides, onChange }) => {
  const defaults = useMemo(() => {
    const def: Record<string, string> = {};
    SPACING_META.forEach((s) => {
      const v = getComputedStyle(document.documentElement).getPropertyValue(`--spacing-${s.name}`).trim();
      def[s.name] = v;
    });
    return def;
  }, []);

  const current = (name: string) => overrides[name] ?? defaults[name] ?? '0px';

  return (
    <div className="p-md space-y-xl">
      <div>
        <h3 className="font-heading-sm text-on-surface">Spacing</h3>
        <p className="font-body-sm text-on-surface-muted mt-2xs mb-md">
          Edit each step of the spacing scale. Preview updates live.
        </p>
      </div>

      <div className="space-y-md">
        {SPACING_META.map((meta) => {
          const val = current(meta.name);
          const edited = overrides[meta.name] !== undefined;
          return (
            <div
              key={meta.name}
              className="flex gap-sm items-center bg-surface-raised border border-border-subtle rounded-lg p-sm"
            >
              <div className="w-24 shrink-0">
                <div className="font-label-sm text-on-surface">{meta.title}</div>
                <div className="font-code-md text-on-surface-muted text-xs">--spacing-{meta.name}</div>
              </div>
              <div className="flex-1 flex items-center gap-sm">
                <div
                  className="bg-accent rounded-sm shrink-0"
                  style={{ width: val, height: '16px' }}
                  aria-hidden
                />
                <input
                  type="text"
                  value={val}
                  onChange={(e) => {
                    const v = e.target.value.trim();
                    if (DIM_RE.test(v)) onChange(meta.name, v);
                    else if (v === '') onChange(meta.name, undefined);
                  }}
                  className={`font-code-md text-sm w-24 px-sm py-xs rounded-md border bg-surface text-on-surface ${
                    val && !DIM_RE.test(val) ? 'border-error' : 'border-border'
                  }`}
                />
                {edited && <span className="font-label-sm text-accent">● edited</span>}
                <button
                  type="button"
                  onClick={() => onChange(meta.name, undefined)}
                  disabled={!edited}
                  className="font-label-sm text-on-surface-muted underline disabled:opacity-40 disabled:no-underline disabled:cursor-default ml-auto"
                >
                  Reset
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Visual ramp */}
      <div className="bg-surface-raised border border-border-subtle rounded-lg p-md">
        <div className="font-label-sm text-on-surface-muted mb-sm">Visual ramp</div>
        <div className="flex flex-col gap-sm">
          {SPACING_META.map((meta) => {
            const val = current(meta.name);
            return (
              <div key={meta.name} className="flex items-center gap-sm">
                <span className="font-code-md text-xs text-on-surface-muted w-12">{meta.name}</span>
                <div
                  className="bg-accent rounded-sm"
                  style={{ width: val, height: '12px' }}
                  aria-hidden
                />
                <span className="font-code-md text-xs text-on-surface-muted">{val}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
