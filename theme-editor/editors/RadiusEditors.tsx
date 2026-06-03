import React, { useMemo } from 'react';
import { RADIUS_META } from '../../tokens-meta';

interface Props {
  overrides: Record<string, string>;
  onChange: (name: string, value: string | undefined) => void;
}

const DIM_RE = /^\d+(\.\d+)?(px|rem|em|%)$/;

export const RadiusEditors: React.FC<Props> = ({ overrides, onChange }) => {
  const defaults = useMemo(() => {
    const def: Record<string, string> = {};
    RADIUS_META.forEach((r) => {
      const v = getComputedStyle(document.documentElement).getPropertyValue(`--rounded-${r.name}`).trim();
      def[r.name] = v;
    });
    return def;
  }, []);

  const current = (name: string) => overrides[name] ?? defaults[name] ?? '0px';

  return (
    <div className="p-md space-y-xl">
      <div>
        <h3 className="font-heading-sm text-on-surface">Border Radius</h3>
        <p className="font-body-sm text-on-surface-muted mt-2xs mb-md">
          Edit each step of the radius scale. Preview updates live.
        </p>
      </div>

      <div className="space-y-md">
        {RADIUS_META.map((meta) => {
          const val = current(meta.name);
          const edited = overrides[meta.name] !== undefined;
          return (
            <div
              key={meta.name}
              className="flex gap-sm items-center bg-surface-raised border border-border-subtle rounded-lg p-sm"
            >
              <div className="w-24 shrink-0">
                <div className="font-label-sm text-on-surface">{meta.title}</div>
                <div className="font-code-md text-on-surface-muted text-xs">--rounded-{meta.name}</div>
              </div>
              <div className="flex-1 flex items-center gap-sm">
                <div
                  className="bg-accent shrink-0"
                  style={{ width: '48px', height: '48px', borderRadius: val }}
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
        <div className="flex flex-wrap gap-md items-start">
          {RADIUS_META.map((meta) => {
            const val = current(meta.name);
            return (
              <div key={meta.name} className="flex flex-col items-center gap-xs">
                <div
                  className="bg-accent"
                  style={{ width: '48px', height: '48px', borderRadius: val }}
                  aria-hidden
                />
                <span className="font-code-md text-xs text-on-surface-muted">{meta.name}</span>
                <span className="font-code-md text-xs text-on-surface-muted">{val}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
