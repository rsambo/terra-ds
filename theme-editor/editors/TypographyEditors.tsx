import React, { useMemo, useState } from 'react';
import {
  TYPOGRAPHY_ROLES,
  TYPOGRAPHY_FAMILY_STACKS,
} from '../../tokens-meta';

interface Props {
  overrides: Record<string, Record<string, string>>;
  onChange: (role: string, prop: string, value: string | undefined) => void;
}

const PROPS = [
  { key: 'fontFamily', label: 'Family' },
  { key: 'fontSize', label: 'Size' },
  { key: 'fontWeight', label: 'Weight' },
  { key: 'lineHeight', label: 'Line-height' },
  { key: 'letterSpacing', label: 'Tracking' },
] as const;

export const TypographyEditors: React.FC<Props> = ({ overrides, onChange }) => {
  const [familyOverrides, setFamilyOverrides] = useState<Record<string, string>>({});

  const defaults = useMemo(() => {
    const def: Record<string, Record<string, string>> = {};
    TYPOGRAPHY_ROLES.forEach((role) => {
      const r: Record<string, string> = {};
      PROPS.forEach((p) => {
        const v = getComputedStyle(document.documentElement).getPropertyValue(`--${p.key.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())}-${role.name}`).trim();
        r[p.key] = v;
      });
      def[role.name] = r;
    });
    // Family stacks from first role of each register
    const families: Record<string, string> = {};
    TYPOGRAPHY_FAMILY_STACKS.forEach((stack) => {
      const firstRole = TYPOGRAPHY_ROLES.find((r) => r.register === stack.key);
      if (firstRole) {
        families[stack.key] = def[firstRole.name]?.fontFamily ?? stack.default;
      }
    });
    return { roles: def, families };
  }, []);

  const current = (role: string, prop: string) => {
    const ov = overrides[role]?.[prop];
    if (ov) return ov;
    // If family stack override exists, apply it to all roles of that register
    if (prop === 'fontFamily') {
      const register = TYPOGRAPHY_ROLES.find((r) => r.name === role)?.register;
      if (register && familyOverrides[register]) return familyOverrides[register];
    }
    return defaults.roles[role]?.[prop] ?? '';
  };

  const handleFamilyStackChange = (register: string, value: string) => {
    setFamilyOverrides((prev) => ({ ...prev, [register]: value }));
    TYPOGRAPHY_ROLES.filter((r) => r.register === register).forEach((role) => {
      onChange(role.name, 'fontFamily', value);
    });
  };

  return (
    <div className="p-md space-y-xl">
      <div>
        <h3 className="font-heading-sm text-on-surface">Typography</h3>
        <p className="font-body-sm text-on-surface-muted mt-2xs mb-md">
          Edit family stacks and per-role properties. Preview updates live.
        </p>
      </div>

      {/* Family stacks */}
      <div className="bg-surface-raised border border-border-subtle rounded-lg p-md space-y-md">
        <div className="font-label-lg text-on-surface">Family Stacks</div>
        {TYPOGRAPHY_FAMILY_STACKS.map((stack) => (
          <div key={stack.key} className="flex items-center gap-sm">
            <label className="font-label-sm text-on-surface-muted w-24">{stack.title}</label>
            <input
              type="text"
              value={familyOverrides[stack.key] ?? defaults.families[stack.key] ?? stack.default}
              onChange={(e) => handleFamilyStackChange(stack.key, e.target.value)}
              className="font-code-md text-sm flex-1 px-sm py-xs rounded-md border border-border bg-surface text-on-surface"
            />
          </div>
        ))}
      </div>

      {/* Per-role table */}
      <div className="bg-surface-raised border border-border-subtle rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface border-b border-border-subtle">
              <tr>
                <th className="px-sm py-xs font-label-sm text-on-surface-muted">Role</th>
                {PROPS.map((p) => (
                  <th key={p.key} className="px-sm py-xs font-label-sm text-on-surface-muted">
                    {p.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TYPOGRAPHY_ROLES.map((role) => (
                <tr key={role.name} className="border-b border-border-subtle last:border-0">
                  <td className="px-sm py-xs align-top">
                    <div className="font-label-sm text-on-surface">{role.title}</div>
                    <div className="font-code-md text-on-surface-muted text-xs">{role.name}</div>
                  </td>
                  {PROPS.map((p) => (
                    <td key={p.key} className="px-sm py-xs align-top">
                      <input
                        type="text"
                        value={current(role.name, p.key)}
                        onChange={(e) => {
                          const v = e.target.value.trim();
                          onChange(role.name, p.key, v || undefined);
                        }}
                        className="font-code-md text-sm w-20 px-sm py-xs rounded-md border border-border bg-surface text-on-surface"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Type specimens */}
      <div className="space-y-md">
        <div className="font-label-lg text-on-surface">Type Specimens</div>
        {TYPOGRAPHY_ROLES.map((role) => (
          <div
            key={role.name}
            className="bg-surface-raised border border-border-subtle rounded-lg p-md"
          >
            <div className="font-label-sm text-on-surface-muted mb-xs">{role.title}</div>
            <div className={`font-${role.name}`}>
              The quick brown fox jumps over the lazy dog.
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
