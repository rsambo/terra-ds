def hex_to_luminance(hex_color):
    hex_color = hex_color.lstrip('#')
    r, g, b = tuple(int(hex_color[i:i+2], 16) / 255.0 for i in (0, 2, 4))
    def linear(c):
        if c <= 0.03928:
            return c / 12.92
        return ((c + 0.055) / 1.055) ** 2.4
    r_lin, g_lin, b_lin = linear(r), linear(g), linear(b)
    return 0.2126 * r_lin + 0.7152 * g_lin + 0.0722 * b_lin

def contrast_ratio(hex1, hex2):
    l1 = hex_to_luminance(hex1)
    l2 = hex_to_luminance(hex2)
    lighter = max(l1, l2)
    darker = min(l1, l2)
    return (lighter + 0.05) / (darker + 0.05)

colors = {
    'primary': '#E8DDD5',
    'primary-container': '#3D322B',
    'on-primary': '#2A1F1A',
    'secondary': '#C4B5A5',
    'secondary-container': '#2A231C',
    'on-secondary': '#2A1F1A',
    'accent': '#845510',
    'accent-container': '#3D2E14',
    'on-accent': '#FAF0E0',
    'surface': '#1A1410',
    'surface-raised': '#221C16',
    'surface-overlay': '#2A231C',
    'on-surface': '#F0EBE3',
    'on-surface-muted': '#9C8D80',
    'surface-content': '#1E1810',
    'surface-content-raised': '#261F14',
    'on-content': '#EDE8E0',
    'on-content-muted': '#A09080',
    'surface-chat-user': '#2A221A',
    'surface-chat-assistant': '#221C14',
    'on-chat': '#EDE8E0',
    'border': '#3D3228',
    'border-subtle': '#2E2620',
    'error': '#E86666',
    'on-error': '#1A1010',
    'focus-ring': '#D4892B',
    'neutral': '#2A231C',
}

components = [
    ('button-primary', 'primary', 'on-primary'),
    ('button-primary-hover', 'primary-container', 'on-surface'),
    ('button-primary-focus', 'primary', 'on-primary'),
    ('button-primary-disabled', 'neutral', 'on-surface-muted'),
    ('button-secondary', 'secondary', 'on-secondary'),
    ('button-secondary-hover', 'secondary-container', 'on-surface'),
    ('button-secondary-focus', 'secondary', 'on-secondary'),
    ('button-secondary-disabled', 'neutral', 'on-surface-muted'),
    ('button-ghost', 'surface', 'on-surface'),
    ('button-ghost-hover', 'surface-raised', 'on-surface'),
    ('button-ghost-focus', 'surface', 'on-surface'),
    ('button-ghost-disabled', 'neutral', 'on-surface-muted'),
    ('button-destructive', 'error', 'on-error'),
    ('button-destructive-hover', 'error', 'on-error'),
    ('button-destructive-focus', 'error', 'on-error'),
    ('button-destructive-disabled', 'neutral', 'on-surface-muted'),
    ('input', 'surface-raised', 'on-surface'),
    ('input-focus', 'surface-overlay', 'on-surface'),
    ('input-error', 'surface-raised', 'error'),
    ('input-disabled', 'neutral', 'on-surface-muted'),
    ('checkbox', 'surface-raised', 'on-surface'),
    ('checkbox-checked', 'primary', 'on-primary'),
    ('checkbox-focus', 'surface-raised', 'on-surface'),
    ('toggle', 'surface', 'on-surface'),
    ('toggle-on', 'primary', 'on-primary'),
    ('toggle-focus', 'surface', 'on-surface'),
    ('card', 'surface-raised', 'on-surface'),
    ('card-interactive', 'surface-raised', 'on-surface'),
    ('card-interactive-hover', 'surface-overlay', 'on-surface'),
    ('chat-bubble-user', 'surface-chat-user', 'on-chat'),
    ('chat-bubble-assistant', 'surface-chat-assistant', 'on-chat'),
    ('content-page', 'surface-content', 'on-content'),
    ('callout', 'surface-content-raised', 'on-content-muted'),
    ('badge', 'secondary', 'on-secondary'),
    ('badge-accent', 'accent-container', 'on-accent'),
    ('badge-error', 'error', 'on-error'),
    ('dialog', 'surface-overlay', 'on-surface'),
    ('tooltip', 'primary', 'on-primary'),
    ('dropdown-menu', 'surface-overlay', 'on-surface'),
    ('dropdown-menu-item-hover', 'surface-raised', 'on-surface'),
    ('nav-item', 'surface', 'on-surface-muted'),
    ('nav-item-active', 'accent', 'on-accent'),
    ('nav-item-hover', 'surface-raised', 'on-surface'),
    ('tab', 'surface', 'on-surface-muted'),
    ('tab-active', 'surface-raised', 'on-surface'),
    ('tab-hover', 'surface-raised', 'on-surface'),
    ('divider', 'on-surface', 'border'),
    ('divider-subtle', 'primary', 'border-subtle'),
    ('focus-indicator', 'surface-raised', 'focus-ring'),
    ('textarea', 'surface-raised', 'on-surface'),
    ('textarea-focus', 'surface-overlay', 'on-surface'),
    ('textarea-error', 'surface-raised', 'error'),
    ('textarea-disabled', 'neutral', 'on-surface-muted'),
    ('select', 'surface-raised', 'on-surface'),
    ('select-open', 'surface-overlay', 'on-surface'),
    ('select-disabled', 'neutral', 'on-surface-muted'),
    ('code-block', 'surface', 'on-surface'),
    ('sidebar', 'surface', 'on-surface'),
    ('sidebar-section-label', 'surface', 'on-surface-muted'),
    ('header', 'surface-raised', 'on-surface'),
    ('breadcrumb-item', 'surface-raised', 'on-surface-muted'),
    ('breadcrumb-item-active', 'surface-raised', 'on-surface'),
    ('command-menu', 'surface-overlay', 'on-surface'),
    ('command-menu-item', 'surface-overlay', 'on-surface'),
    ('command-menu-item-active', 'surface-raised', 'on-surface'),
    ('command-menu-section-label', 'surface-overlay', 'on-surface-muted'),
    ('avatar', 'secondary', 'on-secondary'),
    ('avatar-muted', 'neutral', 'on-surface-muted'),
    ('toast', 'surface-overlay', 'on-surface'),
    ('toast-success', 'primary', 'on-primary'),
    ('toast-error', 'error', 'on-error'),
    ('skeleton', 'neutral', 'on-surface-muted'),
    ('empty-state', 'surface', 'on-surface-muted'),
    ('table-header', 'surface', 'on-surface-muted'),
    ('table-row', 'surface-raised', 'on-surface'),
    ('table-row-hover', 'surface-overlay', 'on-surface'),
    ('table-row-selected', 'accent-container', 'on-surface'),
]

fails = []
for name, bg, text in components:
    ratio = contrast_ratio(colors[bg], colors[text])
    status = 'PASS' if ratio >= 4.5 else 'FAIL'
    if status == 'FAIL':
        fails.append((name, bg, text, ratio))
    print(f"{name}: {bg} on {text} = {ratio:.2f} :1 [{status}]")

print(f"\nTotal fails: {len(fails)}")
for f in fails:
    print(f"  {f[0]}: {f[1]} on {f[2]} = {f[3]:.2f}:1")
