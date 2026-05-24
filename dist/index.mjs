// src/components/Button.tsx
import React from "react";
import { jsx } from "react/jsx-runtime";
var Button = React.forwardRef(
  ({ variant = "primary", disabled, className = "", children, ...props }, ref) => {
    const base = "inline-flex items-center justify-center font-body-md transition-colors focus:outline-none focus:ring-2 focus:ring-focus-ring";
    const variants = {
      primary: disabled ? "bg-neutral text-on-surface-muted rounded-md px-md py-sm" : "bg-primary text-on-primary rounded-md px-md py-sm hover:bg-primary-container hover:text-on-surface",
      secondary: disabled ? "bg-neutral text-on-surface-muted rounded-md px-md py-sm" : "bg-secondary text-on-secondary rounded-md px-md py-sm hover:bg-secondary-container hover:text-on-surface",
      ghost: disabled ? "bg-neutral text-on-surface-muted rounded-md px-md py-sm" : "bg-surface text-on-surface rounded-md px-md py-sm hover:bg-surface-raised",
      destructive: disabled ? "bg-neutral text-on-surface-muted rounded-md px-md py-sm" : "bg-error text-on-error rounded-md px-md py-sm"
    };
    return /* @__PURE__ */ jsx(
      "button",
      {
        ref,
        disabled,
        className: `${base} ${variants[variant]} ${className}`,
        ...props,
        children
      }
    );
  }
);
Button.displayName = "Button";

// src/components/Input.tsx
import React2 from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
var Input = React2.forwardRef(
  ({ error, disabled, className = "", ...props }, ref) => {
    const base = "w-full font-body-md text-on-surface placeholder-on-surface-muted focus:outline-none focus:ring-2 focus:ring-focus-ring transition-colors";
    const state = disabled ? "bg-neutral text-on-surface-muted rounded-md px-md py-sm" : error ? "bg-surface-raised text-error rounded-md px-md py-sm" : "bg-surface-raised text-on-surface rounded-md px-md py-sm focus:bg-surface-overlay";
    return /* @__PURE__ */ jsx2("input", { ref, disabled, className: `${base} ${state} ${className}`, ...props });
  }
);
Input.displayName = "Input";

// src/components/Badge.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
var Badge = ({ variant = "default", className = "", children, ...props }) => {
  const base = "inline-flex items-center justify-center font-label-sm rounded-full px-xs py-2xs";
  const variants = {
    default: "bg-secondary text-on-secondary",
    accent: "bg-accent-container text-on-accent",
    error: "bg-error text-on-error"
  };
  return /* @__PURE__ */ jsx3("span", { className: `${base} ${variants[variant]} ${className}`, ...props, children });
};

// src/components/NavItem.tsx
import React3 from "react";
import { jsx as jsx4 } from "react/jsx-runtime";
var NavItem = React3.forwardRef(
  ({ active, onClick, className = "", children, href, ...props }, ref) => {
    const base = "inline-flex items-center font-label-lg rounded-sm px-md py-sm transition-colors focus:outline-none focus:ring-2 focus:ring-focus-ring";
    const state = active ? "bg-accent text-on-accent" : "bg-surface text-on-surface-muted hover:bg-surface-raised hover:text-on-surface";
    return /* @__PURE__ */ jsx4(
      "a",
      {
        ref,
        href,
        onClick,
        className: `${base} ${state} ${className}`,
        ...props,
        children
      }
    );
  }
);
NavItem.displayName = "NavItem";

// src/components/Tab.tsx
import React4 from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { jsx as jsx5 } from "react/jsx-runtime";
var TabList = React4.forwardRef(({ className = "", ...props }, ref) => /* @__PURE__ */ jsx5(
  TabsPrimitive.List,
  {
    ref,
    className: `inline-flex items-center gap-xs bg-surface rounded-md p-xs ${className}`,
    ...props
  }
));
TabList.displayName = "TabList";
var Tab = React4.forwardRef(({ className = "", ...props }, ref) => /* @__PURE__ */ jsx5(
  TabsPrimitive.Trigger,
  {
    ref,
    className: `inline-flex items-center justify-center font-label-lg rounded-sm px-md py-sm transition-colors focus:outline-none focus:ring-2 focus:ring-focus-ring data-[state=active]:bg-surface-raised data-[state=active]:text-on-surface text-on-surface-muted hover:bg-surface-raised hover:text-on-surface ${className}`,
    ...props
  }
));
Tab.displayName = "Tab";
var TabContent = React4.forwardRef(({ className = "", ...props }, ref) => /* @__PURE__ */ jsx5(
  TabsPrimitive.Content,
  {
    ref,
    className: `mt-sm focus:outline-none ${className}`,
    ...props
  }
));
TabContent.displayName = "TabContent";
var TabsRoot = TabsPrimitive.Root;

// src/components/Card.tsx
import React5 from "react";
import { jsx as jsx6 } from "react/jsx-runtime";
var Card = React5.forwardRef(
  ({ interactive, className = "", children, ...props }, ref) => {
    const base = "bg-surface-raised text-on-surface rounded-lg p-md transition-colors";
    const state = interactive ? "hover:bg-surface-overlay hover:shadow-raised cursor-pointer focus:outline-none focus:ring-2 focus:ring-focus-ring" : "";
    return /* @__PURE__ */ jsx6("div", { ref, className: `${base} ${state} ${className}`, ...props, children });
  }
);
Card.displayName = "Card";

// src/components/Dialog.tsx
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { jsx as jsx7, jsxs } from "react/jsx-runtime";
var Dialog = ({ open, onOpenChange, title, children }) => {
  return /* @__PURE__ */ jsx7(DialogPrimitive.Root, { open, onOpenChange, children: /* @__PURE__ */ jsxs(DialogPrimitive.Portal, { children: [
    /* @__PURE__ */ jsx7(DialogPrimitive.Overlay, { className: "fixed inset-0 bg-on-surface/20 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }),
    /* @__PURE__ */ jsxs(
      DialogPrimitive.Content,
      {
        className: "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface-overlay text-on-surface rounded-xl p-lg shadow-overlay w-full max-w-lg focus:outline-none focus:ring-2 focus:ring-focus-ring data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        children: [
          /* @__PURE__ */ jsx7(DialogPrimitive.Title, { className: "font-heading-md text-on-surface mb-sm", children: title }),
          /* @__PURE__ */ jsx7("div", { children })
        ]
      }
    )
  ] }) });
};

// src/components/ChatBubble.tsx
import React6 from "react";
import { jsx as jsx8 } from "react/jsx-runtime";
var ChatBubble = React6.forwardRef(
  ({ role, className = "", children, ...props }, ref) => {
    const isUser = role === "user";
    const base = "max-w-xl rounded-lg p-md font-body-md";
    const tone = isUser ? "bg-surface-chat-user text-on-chat ml-auto" : "bg-surface-chat-assistant text-on-chat mr-auto";
    return /* @__PURE__ */ jsx8("div", { ref, className: `${base} ${tone} ${className}`, ...props, children });
  }
);
ChatBubble.displayName = "ChatBubble";

// src/components/ContentPage.tsx
import React7 from "react";
import { jsx as jsx9 } from "react/jsx-runtime";
var ContentPage = React7.forwardRef(
  ({ className = "", children, ...props }, ref) => {
    return /* @__PURE__ */ jsx9(
      "div",
      {
        ref,
        className: `bg-surface-content text-on-content rounded-none p-lg font-content-body-md max-w-prose mx-auto ${className}`,
        ...props,
        children
      }
    );
  }
);
ContentPage.displayName = "ContentPage";

// src/components/Callout.tsx
import React8 from "react";
import { jsx as jsx10 } from "react/jsx-runtime";
var Callout = React8.forwardRef(
  ({ className = "", children, ...props }, ref) => {
    return /* @__PURE__ */ jsx10(
      "div",
      {
        ref,
        className: `bg-surface-content-raised text-on-content-muted rounded-md p-md font-content-body-md ${className}`,
        ...props,
        children
      }
    );
  }
);
Callout.displayName = "Callout";

// src/components/Textarea.tsx
import React9 from "react";
import { jsx as jsx11 } from "react/jsx-runtime";
var Textarea = React9.forwardRef(
  ({ error, disabled, className = "", ...props }, ref) => {
    const base = "w-full font-body-md text-on-surface placeholder-on-surface-muted focus:outline-none focus:ring-2 focus:ring-focus-ring resize-y";
    const state = disabled ? "bg-neutral text-on-surface-muted rounded-md px-md py-sm" : error ? "bg-surface-raised text-error rounded-md px-md py-sm" : "bg-surface-raised text-on-surface rounded-md px-md py-sm focus:bg-surface-overlay";
    return /* @__PURE__ */ jsx11(
      "textarea",
      {
        ref,
        disabled,
        className: `${base} ${state} ${className}`,
        style: { minHeight: "80px" },
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";

// src/components/Toggle.tsx
import React10 from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { jsx as jsx12, jsxs as jsxs2 } from "react/jsx-runtime";
var Toggle = ({ checked, onCheckedChange, disabled, label }) => {
  const id = React10.useId();
  return /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-sm", children: [
    /* @__PURE__ */ jsx12(
      SwitchPrimitive.Root,
      {
        id,
        checked,
        onCheckedChange,
        disabled,
        className: `w-11 h-6 rounded-full relative transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring data-[state=checked]:bg-primary data-[state=unchecked]:bg-surface ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`,
        children: /* @__PURE__ */ jsx12(
          SwitchPrimitive.Thumb,
          {
            className: "block w-5 h-5 bg-on-primary rounded-full transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5 shadow-raised"
          }
        )
      }
    ),
    label && /* @__PURE__ */ jsx12("label", { htmlFor: id, className: `font-label-lg ${disabled ? "text-on-surface-muted" : "text-on-surface"}`, children: label })
  ] });
};

// src/components/Checkbox.tsx
import React11 from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { jsx as jsx13, jsxs as jsxs3 } from "react/jsx-runtime";
var Checkbox = ({ checked, onCheckedChange, disabled, label }) => {
  const id = React11.useId();
  return /* @__PURE__ */ jsxs3("div", { className: "flex items-center gap-sm", children: [
    /* @__PURE__ */ jsx13(
      CheckboxPrimitive.Root,
      {
        id,
        checked,
        onCheckedChange,
        disabled,
        className: `w-4 h-4 rounded-sm border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring flex items-center justify-center ${disabled ? "bg-neutral border-border-subtle opacity-60 cursor-not-allowed" : checked ? "bg-primary border-primary" : "bg-surface-raised border-border"}`,
        children: /* @__PURE__ */ jsx13(CheckboxPrimitive.Indicator, { children: checked === "indeterminate" ? /* @__PURE__ */ jsx13("span", { className: "block w-2 h-0.5 bg-on-primary rounded-full" }) : /* @__PURE__ */ jsx13("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "none", className: "text-on-primary", children: /* @__PURE__ */ jsx13("path", { d: "M1 5L3.5 7.5L9 2", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }) })
      }
    ),
    label && /* @__PURE__ */ jsx13("label", { htmlFor: id, className: `font-label-lg ${disabled ? "text-on-surface-muted" : "text-on-surface"}`, children: label })
  ] });
};

// src/components/Select.tsx
import * as SelectPrimitive from "@radix-ui/react-select";
import { jsx as jsx14, jsxs as jsxs4 } from "react/jsx-runtime";
var SelectItem = ({ value, children }) => /* @__PURE__ */ jsxs4(
  SelectPrimitive.Item,
  {
    value,
    className: "relative font-body-md text-on-surface rounded-sm px-md py-sm cursor-pointer outline-none data-[highlighted]:bg-surface-raised data-[state=checked]:text-accent select-none",
    children: [
      /* @__PURE__ */ jsx14(SelectPrimitive.ItemText, { children }),
      /* @__PURE__ */ jsx14(SelectPrimitive.ItemIndicator, { className: "absolute right-sm inline-flex items-center justify-center", children: /* @__PURE__ */ jsx14("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "none", className: "text-accent", children: /* @__PURE__ */ jsx14("path", { d: "M1 5L3.5 7.5L9 2", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }) })
    ]
  }
);
var Select = ({ value, onValueChange, placeholder, disabled, children }) => /* @__PURE__ */ jsxs4(SelectPrimitive.Root, { value, onValueChange, disabled, children: [
  /* @__PURE__ */ jsxs4(
    SelectPrimitive.Trigger,
    {
      className: `inline-flex items-center justify-between w-full font-body-md rounded-md px-md py-sm focus:outline-none focus:ring-2 focus:ring-focus-ring ${disabled ? "bg-neutral text-on-surface-muted cursor-not-allowed" : "bg-surface-raised text-on-surface hover:bg-surface-overlay data-[state=open]:bg-surface-overlay"}`,
      children: [
        /* @__PURE__ */ jsx14(SelectPrimitive.Value, { placeholder }),
        /* @__PURE__ */ jsx14(SelectPrimitive.Icon, { className: "text-on-surface-muted ml-sm", children: /* @__PURE__ */ jsx14("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", children: /* @__PURE__ */ jsx14("path", { d: "M2 4L6 8L10 4", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }) })
      ]
    }
  ),
  /* @__PURE__ */ jsx14(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsx14(
    SelectPrimitive.Content,
    {
      className: "bg-surface-overlay rounded-md shadow-overlay p-xs min-w-[var(--radix-select-trigger-width)] z-50 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 duration-150",
      position: "popper",
      sideOffset: 4,
      children: /* @__PURE__ */ jsx14(SelectPrimitive.Viewport, { className: "p-xs", children })
    }
  ) })
] });

// src/components/DropdownMenu.tsx
import React12 from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { jsx as jsx15, jsxs as jsxs5 } from "react/jsx-runtime";
var DropdownMenu = ({ trigger, children }) => /* @__PURE__ */ jsxs5(DropdownMenuPrimitive.Root, { children: [
  /* @__PURE__ */ jsx15(DropdownMenuPrimitive.Trigger, { asChild: true, children: trigger }),
  /* @__PURE__ */ jsx15(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx15(
    DropdownMenuPrimitive.Content,
    {
      className: "bg-surface-overlay rounded-md shadow-overlay p-xs min-w-[160px] z-50 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 duration-150",
      sideOffset: 4,
      children
    }
  ) })
] });
var DropdownMenuItem = React12.forwardRef(
  ({ destructive, className = "", children, disabled, ...props }, ref) => /* @__PURE__ */ jsx15(
    DropdownMenuPrimitive.Item,
    {
      ref,
      disabled,
      className: `font-body-md rounded-sm px-md py-sm cursor-pointer outline-none transition-colors data-[highlighted]:bg-surface-raised ${destructive ? "text-error data-[highlighted]:bg-surface-raised" : "text-on-surface"} ${disabled ? "text-on-surface-muted opacity-50 pointer-events-none" : ""} ${className}`,
      ...props,
      children
    }
  )
);
DropdownMenuItem.displayName = "DropdownMenuItem";
var DropdownMenuSeparator = React12.forwardRef(
  ({ className = "", ...props }, ref) => /* @__PURE__ */ jsx15(
    DropdownMenuPrimitive.Separator,
    {
      ref,
      className: `border-t border-border-subtle my-xs ${className}`,
      ...props
    }
  )
);
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

// src/components/ContentHeading.tsx
import React13 from "react";
import { jsx as jsx16 } from "react/jsx-runtime";
var ContentHeading = React13.forwardRef(
  ({ level = 1, className = "", children, ...props }, ref) => {
    const Tag = `h${level}`;
    const sizeMap2 = {
      1: "font-content-heading-lg text-on-content",
      2: "font-content-heading-md text-on-content",
      3: "font-content-heading-sm text-on-content",
      4: "font-content-heading-sm text-on-content"
    };
    return /* @__PURE__ */ jsx16(Tag, { ref, className: `${sizeMap2[level]} ${className}`, ...props, children });
  }
);
ContentHeading.displayName = "ContentHeading";

// src/components/ContentBody.tsx
import React14 from "react";
import { jsx as jsx17 } from "react/jsx-runtime";
var ContentBody = React14.forwardRef(
  ({ size = "md", className = "", children, ...props }, ref) => {
    const sizeClass = size === "lg" ? "font-content-body-lg" : "font-content-body-md";
    const leading = size === "lg" ? "leading-[1.75]" : "leading-[1.6]";
    return /* @__PURE__ */ jsx17("p", { ref, className: `${sizeClass} ${leading} text-on-content ${className}`, ...props, children });
  }
);
ContentBody.displayName = "ContentBody";

// src/components/ContentBlockquote.tsx
import React15 from "react";
import { jsx as jsx18 } from "react/jsx-runtime";
var ContentBlockquote = React15.forwardRef(
  ({ className = "", children, ...props }, ref) => /* @__PURE__ */ jsx18(
    "blockquote",
    {
      ref,
      className: `font-content-blockquote italic text-on-content border-l-2 border-border pl-md ${className}`,
      ...props,
      children
    }
  )
);
ContentBlockquote.displayName = "ContentBlockquote";

// src/components/ContentCaption.tsx
import React16 from "react";
import { jsx as jsx19 } from "react/jsx-runtime";
var ContentCaption = React16.forwardRef(
  ({ className = "", children, ...props }, ref) => /* @__PURE__ */ jsx19(
    "p",
    {
      ref,
      className: `font-content-caption italic text-on-content-muted ${className}`,
      ...props,
      children
    }
  )
);
ContentCaption.displayName = "ContentCaption";

// src/components/CodeBlock.tsx
import React17 from "react";
import { jsx as jsx20, jsxs as jsxs6 } from "react/jsx-runtime";
var CodeBlock = React17.forwardRef(
  ({ language, className = "", children, ...props }, ref) => /* @__PURE__ */ jsxs6("div", { className: "relative", children: [
    language && /* @__PURE__ */ jsx20("span", { className: "absolute top-sm right-sm font-label-sm text-on-surface-muted", children: language }),
    /* @__PURE__ */ jsx20(
      "pre",
      {
        ref,
        className: `bg-surface rounded-md p-md overflow-x-auto font-code-md text-on-surface leading-[1.5] ${className}`,
        ...props,
        children: /* @__PURE__ */ jsx20("code", { children })
      }
    )
  ] })
);
CodeBlock.displayName = "CodeBlock";

// src/components/Tooltip.tsx
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { jsx as jsx21, jsxs as jsxs7 } from "react/jsx-runtime";
var Tooltip = ({ content, children, side = "top", delayDuration = 400 }) => /* @__PURE__ */ jsx21(TooltipPrimitive.Provider, { delayDuration, children: /* @__PURE__ */ jsxs7(TooltipPrimitive.Root, { children: [
  /* @__PURE__ */ jsx21(TooltipPrimitive.Trigger, { asChild: true, children }),
  /* @__PURE__ */ jsx21(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsxs7(
    TooltipPrimitive.Content,
    {
      side,
      className: "bg-primary text-on-primary rounded-md px-md py-sm font-label-sm shadow-raised z-50 data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 duration-100",
      sideOffset: 4,
      children: [
        content,
        /* @__PURE__ */ jsx21(TooltipPrimitive.Arrow, { className: "fill-primary" })
      ]
    }
  ) })
] }) });

// src/components/Breadcrumb.tsx
import { Fragment, jsx as jsx22, jsxs as jsxs8 } from "react/jsx-runtime";
var Breadcrumb = ({ items, className = "" }) => {
  return /* @__PURE__ */ jsx22("nav", { "aria-label": "breadcrumb", className, children: /* @__PURE__ */ jsx22("ol", { className: "flex items-center", children: items.map((item, index) => {
    const isLast = index === items.length - 1;
    return /* @__PURE__ */ jsx22("li", { className: "flex items-center", children: isLast ? /* @__PURE__ */ jsx22(
      "span",
      {
        className: "font-label-sm text-on-surface",
        "aria-current": "page",
        children: item.label
      }
    ) : /* @__PURE__ */ jsxs8(Fragment, { children: [
      item.href ? /* @__PURE__ */ jsx22(
        "a",
        {
          href: item.href,
          onClick: item.onClick,
          className: "font-label-sm text-on-surface-muted hover:text-on-surface transition-colors",
          children: item.label
        }
      ) : item.onClick ? /* @__PURE__ */ jsx22(
        "button",
        {
          onClick: item.onClick,
          className: "font-label-sm text-on-surface-muted hover:text-on-surface transition-colors",
          children: item.label
        }
      ) : /* @__PURE__ */ jsx22("span", { className: "font-label-sm text-on-surface-muted", children: item.label }),
      /* @__PURE__ */ jsx22("span", { className: "text-on-surface-muted mx-xs", "aria-hidden": "true", children: "\u203A" })
    ] }) }, index);
  }) }) });
};

// src/components/Header.tsx
import { jsx as jsx23, jsxs as jsxs9 } from "react/jsx-runtime";
var Header = ({ title, breadcrumb, actions, className = "" }) => {
  return /* @__PURE__ */ jsx23("header", { className: `bg-surface-raised border-b border-border-subtle ${className}`, children: /* @__PURE__ */ jsxs9("div", { className: "flex items-center justify-between px-lg py-sm h-14", children: [
    /* @__PURE__ */ jsx23("div", { className: "flex items-center min-w-0", children: breadcrumb ? /* @__PURE__ */ jsx23(Breadcrumb, { items: breadcrumb }) : title ? /* @__PURE__ */ jsx23("h1", { className: "font-heading-sm text-on-surface truncate", children: title }) : null }),
    actions && /* @__PURE__ */ jsx23("div", { className: "flex items-center gap-sm flex-shrink-0", children: actions })
  ] }) });
};

// src/components/Sidebar.tsx
import React18, { useState } from "react";
import { jsx as jsx24, jsxs as jsxs10 } from "react/jsx-runtime";
var SidebarSection = ({
  label,
  children,
  collapsible,
  defaultCollapsed
}) => {
  const [open, setOpen] = useState(!defaultCollapsed);
  return /* @__PURE__ */ jsxs10("div", { className: "flex flex-col", children: [
    label && /* @__PURE__ */ jsxs10(
      "button",
      {
        onClick: () => collapsible && setOpen(!open),
        className: `flex items-center justify-between font-label-sm text-on-surface-muted uppercase tracking-wide px-md py-xs ${collapsible ? "cursor-pointer hover:text-on-surface" : ""}`,
        children: [
          /* @__PURE__ */ jsx24("span", { children: label }),
          collapsible && /* @__PURE__ */ jsx24("span", { className: `text-on-surface-muted transition-transform ${open ? "rotate-90" : ""}`, children: "\u203A" })
        ]
      }
    ),
    (!collapsible || open) && /* @__PURE__ */ jsx24("div", { className: "flex flex-col", children })
  ] });
};
var SidebarItem = ({
  active,
  icon,
  indent,
  onClick,
  href,
  children,
  className = "",
  ...props
}) => {
  return /* @__PURE__ */ jsxs10(
    "a",
    {
      href,
      onClick,
      className: `inline-flex items-center w-full font-label-lg rounded-sm px-md py-sm transition-colors focus:outline-none focus:ring-2 focus:ring-focus-ring ${active ? "bg-accent text-on-accent" : "bg-surface text-on-surface-muted hover:bg-surface-raised hover:text-on-surface"} ${indent ? "pl-xl" : ""} ${className}`,
      ...props,
      children: [
        icon && /* @__PURE__ */ jsx24("span", { className: "mr-sm", children: icon }),
        children
      ]
    }
  );
};
var Sidebar = ({ children, className = "", collapsed }) => {
  return /* @__PURE__ */ jsx24(
    "aside",
    {
      className: `bg-surface flex flex-col h-full border-r border-border-subtle overflow-y-auto transition-[width] duration-200 ease-in-out ${collapsed ? "w-14" : "w-60"} ${className}`,
      children: /* @__PURE__ */ jsx24("div", { className: "flex flex-col gap-sm py-md", children: React18.Children.map(children, (child) => {
        if (!React18.isValidElement(child)) return child;
        if (child.type === SidebarSection) {
          return /* @__PURE__ */ jsx24(
            SidebarSection,
            {
              ...child.props,
              label: collapsed ? void 0 : child.props.label
            }
          );
        }
        if (child.type === SidebarItem && collapsed) {
          const itemProps = child.props;
          return /* @__PURE__ */ jsx24("div", { className: "flex justify-center py-sm", children: /* @__PURE__ */ jsx24(Tooltip, { content: typeof itemProps.children === "string" ? itemProps.children : "", side: "right", children: /* @__PURE__ */ jsx24("span", { className: `cursor-pointer ${itemProps.active ? "text-on-accent" : "text-on-surface-muted"}`, children: itemProps.icon || /* @__PURE__ */ jsx24("span", { className: "w-4 h-4 block" }) }) }) });
        }
        return child;
      }) })
    }
  );
};

// src/components/AppShell.tsx
import { jsx as jsx25, jsxs as jsxs11 } from "react/jsx-runtime";
var AppShell = ({
  header,
  sidebar,
  children,
  className = ""
}) => {
  return /* @__PURE__ */ jsxs11("div", { className: `flex flex-col h-screen bg-surface ${className}`, children: [
    header && /* @__PURE__ */ jsx25("div", { className: "flex-shrink-0", children: header }),
    /* @__PURE__ */ jsxs11("div", { className: "flex flex-1 overflow-hidden", children: [
      sidebar && /* @__PURE__ */ jsx25("div", { className: "flex-shrink-0 h-full overflow-hidden", children: sidebar }),
      /* @__PURE__ */ jsx25("main", { className: "flex-1 overflow-y-auto", children })
    ] })
  ] });
};

// src/components/CommandMenu.tsx
import React19, { useState as useState2, useRef, useEffect } from "react";
import * as DialogPrimitive2 from "@radix-ui/react-dialog";
import { jsx as jsx26, jsxs as jsxs12 } from "react/jsx-runtime";
var CommandMenuItem = ({ onSelect, icon, shortcut, children }) => {
  return /* @__PURE__ */ jsxs12(
    "div",
    {
      onClick: onSelect,
      className: "flex items-center gap-sm font-body-md text-on-surface rounded-sm px-md py-sm cursor-pointer outline-none transition-colors hover:bg-surface-raised",
      role: "button",
      tabIndex: 0,
      onKeyDown: (e) => {
        if (e.key === "Enter") onSelect();
      },
      children: [
        icon && /* @__PURE__ */ jsx26("span", { className: "text-on-surface-muted", children: icon }),
        /* @__PURE__ */ jsx26("span", { className: "flex-1", children }),
        shortcut && /* @__PURE__ */ jsx26("span", { className: "font-label-sm text-on-surface-muted", children: shortcut })
      ]
    }
  );
};
var CommandMenuSection = ({ label, children }) => /* @__PURE__ */ jsxs12("div", { className: "mt-xs", children: [
  label && /* @__PURE__ */ jsx26("div", { className: "font-label-sm text-on-surface-muted uppercase px-md py-xs", children: label }),
  /* @__PURE__ */ jsx26("div", { className: "flex flex-col", children })
] });
var CommandMenu = ({ open, onOpenChange, placeholder = "Search\u2026", children }) => {
  const [query, setQuery] = useState2("");
  const inputRef = useRef(null);
  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);
  return /* @__PURE__ */ jsx26(DialogPrimitive2.Root, { open, onOpenChange, children: /* @__PURE__ */ jsxs12(DialogPrimitive2.Portal, { children: [
    /* @__PURE__ */ jsx26(DialogPrimitive2.Overlay, { className: "fixed inset-0 bg-on-surface/20 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }),
    /* @__PURE__ */ jsxs12(
      DialogPrimitive2.Content,
      {
        className: "fixed top-[20vh] left-1/2 -translate-x-1/2 bg-surface-overlay rounded-lg shadow-overlay w-full max-w-xl overflow-hidden focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        onKeyDown: (e) => {
          if (e.key === "Escape") onOpenChange(false);
        },
        children: [
          /* @__PURE__ */ jsx26(
            "input",
            {
              ref: inputRef,
              value: query,
              onChange: (e) => setQuery(e.target.value),
              placeholder,
              className: "w-full font-body-lg text-on-surface placeholder-on-surface-muted px-lg py-md outline-none border-b border-border-subtle bg-transparent"
            }
          ),
          /* @__PURE__ */ jsx26("div", { className: "max-h-80 overflow-y-auto py-sm", children: React19.Children.count(children) === 0 ? /* @__PURE__ */ jsx26("div", { className: "px-lg py-md font-body-md text-on-surface-muted", children: "No results" }) : children })
        ]
      }
    )
  ] }) });
};

// src/components/Avatar.tsx
import { useState as useState3 } from "react";
import { jsx as jsx27, jsxs as jsxs13 } from "react/jsx-runtime";
var sizeMap = {
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-10 h-10",
  xl: "w-14 h-14"
};
var fontMap = {
  sm: "font-label-sm",
  md: "font-label-lg",
  lg: "font-label-lg",
  xl: "font-heading-sm"
};
function deriveInitials(alt) {
  return alt.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}
var Avatar = ({
  src,
  alt,
  initials,
  size = "md",
  muted,
  className = ""
}) => {
  const [imgError, setImgError] = useState3(false);
  const showImage = src && !imgError;
  const displayInitials = initials || (alt ? deriveInitials(alt) : "");
  const sizeClass = sizeMap[size];
  const fontClass = fontMap[size];
  const stateClass = muted ? "bg-neutral text-on-surface-muted" : "bg-secondary text-on-secondary";
  return /* @__PURE__ */ jsx27(
    "div",
    {
      className: `inline-flex items-center justify-center rounded-full ${sizeClass} ${fontClass} ${stateClass} ${className}`,
      "aria-label": showImage ? alt : displayInitials,
      role: "img",
      children: showImage ? /* @__PURE__ */ jsx27(
        "img",
        {
          src,
          alt: alt || "",
          className: "w-full h-full rounded-full object-cover",
          onError: () => setImgError(true)
        }
      ) : /* @__PURE__ */ jsx27("span", { children: displayInitials })
    }
  );
};
var AvatarGroup = ({
  avatars,
  max = 3,
  size = "md"
}) => {
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - max;
  return /* @__PURE__ */ jsxs13("div", { className: "flex items-center", children: [
    visible.map((avatar, i) => /* @__PURE__ */ jsx27("div", { className: `${i > 0 ? "-ml-2" : ""}`, style: { zIndex: visible.length - i }, children: /* @__PURE__ */ jsx27(Avatar, { ...avatar, size }) }, i)),
    overflow > 0 && /* @__PURE__ */ jsx27("div", { className: "-ml-2", children: /* @__PURE__ */ jsx27(Avatar, { initials: `+${overflow}`, size, muted: true }) })
  ] });
};

// src/components/Toast.tsx
import * as ToastPrimitive from "@radix-ui/react-toast";
import { jsx as jsx28, jsxs as jsxs14 } from "react/jsx-runtime";
var Toast = ({
  open,
  onOpenChange,
  variant = "default",
  title,
  description,
  duration = 4e3,
  action
}) => {
  const variantClass = variant === "success" ? "bg-primary text-on-primary" : variant === "error" ? "bg-error text-on-error" : "bg-surface-overlay text-on-surface";
  return /* @__PURE__ */ jsxs14(
    ToastPrimitive.Root,
    {
      open,
      onOpenChange,
      duration,
      className: `rounded-lg px-md py-sm shadow-overlay flex items-start gap-md data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom-2 data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right-full data-[state=closed]:fade-out-0 duration-200 ${variantClass}`,
      children: [
        /* @__PURE__ */ jsxs14("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsx28(ToastPrimitive.Title, { className: "font-label-lg", children: title }),
          description && /* @__PURE__ */ jsx28(ToastPrimitive.Description, { className: "font-body-sm opacity-80 mt-xs", children: description })
        ] }),
        action && /* @__PURE__ */ jsx28(
          "button",
          {
            onClick: action.onClick,
            className: `shrink-0 font-label-lg underline ${variant === "default" ? "text-on-surface hover:text-on-surface-muted" : "text-inherit opacity-90 hover:opacity-100"}`,
            children: action.label
          }
        ),
        /* @__PURE__ */ jsx28(
          ToastPrimitive.Close,
          {
            "aria-label": "Close",
            className: `shrink-0 font-label-lg leading-none ${variant === "default" ? "text-on-surface-muted hover:text-on-surface" : "opacity-70 hover:opacity-100"}`,
            children: "\xD7"
          }
        )
      ]
    }
  );
};
var ToastViewport = () => /* @__PURE__ */ jsx28(ToastPrimitive.Viewport, { className: "fixed bottom-md right-md flex flex-col gap-sm z-50" });

// src/components/useToast.ts
import { useState as useState4, useCallback } from "react";
var idCounter = 0;
function useToast() {
  const [toasts, setToasts] = useState4([]);
  const toast = useCallback((options) => {
    const id = `toast-${++idCounter}`;
    const item = { id, ...options };
    setToasts((prev) => [...prev, item]);
    const duration = options.duration ?? 4e3;
    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration + 300);
    }
  }, []);
  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);
  return { toasts, toast, dismiss };
}

// src/components/Skeleton.tsx
import { jsx as jsx29 } from "react/jsx-runtime";
var roundedMap = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full"
};
var Skeleton = ({
  width,
  height,
  rounded = "md",
  className = ""
}) => {
  return /* @__PURE__ */ jsx29(
    "div",
    {
      className: `bg-neutral animate-pulse ${roundedMap[rounded]} ${className}`,
      style: { width, height },
      "aria-hidden": "true"
    }
  );
};
var SkeletonText = ({
  lines = 3,
  lastLineWidth = "60%"
}) => {
  return /* @__PURE__ */ jsx29("div", { className: "flex flex-col gap-sm", children: Array.from({ length: lines }).map((_, i) => /* @__PURE__ */ jsx29(
    Skeleton,
    {
      height: "16px",
      width: i === lines - 1 ? lastLineWidth : "100%",
      rounded: "none"
    },
    i
  )) });
};

// src/components/EmptyState.tsx
import { jsx as jsx30, jsxs as jsxs15 } from "react/jsx-runtime";
var EmptyState = ({
  icon,
  title,
  description,
  action,
  className = ""
}) => {
  return /* @__PURE__ */ jsxs15("div", { className: `bg-surface rounded-lg p-2xl flex flex-col items-center text-center ${className}`, children: [
    icon && /* @__PURE__ */ jsx30("div", { className: "w-12 h-12 text-on-surface-muted mb-md flex items-center justify-center", children: icon }),
    /* @__PURE__ */ jsx30("h3", { className: "font-heading-sm text-on-surface mb-xs", children: title }),
    description && /* @__PURE__ */ jsx30("p", { className: "font-body-md text-on-surface-muted max-w-xs mb-lg", children: description }),
    action && /* @__PURE__ */ jsx30("div", { children: action })
  ] });
};

// src/components/DataTable.tsx
import { jsx as jsx31, jsxs as jsxs16 } from "react/jsx-runtime";
var DataTableCell = ({
  children,
  className = "",
  ...props
}) => /* @__PURE__ */ jsx31("td", { className: `px-md py-sm font-body-md text-on-surface ${className}`, ...props, children });
var DataTableRow = ({
  children,
  className = "",
  ...props
}) => /* @__PURE__ */ jsx31("tr", { className: `border-b border-border-subtle transition-colors ${className}`, ...props, children });
var DataTableHeader = ({
  children,
  className = "",
  ...props
}) => /* @__PURE__ */ jsx31(
  "th",
  {
    scope: "col",
    className: `px-md py-sm font-label-lg text-on-surface-muted text-left ${className}`,
    ...props,
    children
  }
);
function DataTable({
  columns,
  rows,
  selectable,
  selectedIds = [],
  onSelectionChange,
  sortKey,
  sortDirection,
  onSort,
  emptyState,
  className = ""
}) {
  const allSelected = rows.length > 0 && rows.every((row) => selectedIds.includes(row.id));
  const someSelected = rows.some((row) => selectedIds.includes(row.id)) && !allSelected;
  const handleSelectAll = () => {
    if (!onSelectionChange) return;
    if (allSelected) {
      onSelectionChange([]);
    } else {
      onSelectionChange(rows.map((row) => row.id));
    }
  };
  const handleSelectRow = (id) => {
    if (!onSelectionChange) return;
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter((sid) => sid !== id));
    } else {
      onSelectionChange([...selectedIds, id]);
    }
  };
  const colCount = selectable ? columns.length + 1 : columns.length;
  return /* @__PURE__ */ jsx31("div", { className: `overflow-x-auto rounded-lg border border-border-subtle ${className}`, children: /* @__PURE__ */ jsxs16("table", { className: "w-full border-collapse", children: [
    /* @__PURE__ */ jsx31("thead", { className: "bg-surface", children: /* @__PURE__ */ jsxs16(DataTableRow, { children: [
      selectable && /* @__PURE__ */ jsx31(DataTableHeader, { className: "w-12", children: /* @__PURE__ */ jsx31(
        Checkbox,
        {
          checked: someSelected ? "indeterminate" : allSelected,
          onCheckedChange: handleSelectAll
        }
      ) }),
      columns.map((col) => {
        const isSorted = sortKey === col.key;
        return /* @__PURE__ */ jsx31(
          DataTableHeader,
          {
            className: col.sortable ? "cursor-pointer hover:text-on-surface transition-colors" : "",
            onClick: () => col.sortable && onSort?.(col.key),
            "aria-sort": isSorted ? sortDirection === "asc" ? "ascending" : "descending" : void 0,
            style: col.width ? { width: col.width } : void 0,
            children: /* @__PURE__ */ jsxs16("div", { className: "flex items-center gap-xs", children: [
              col.label,
              col.sortable && /* @__PURE__ */ jsx31("span", { className: isSorted ? "text-accent" : "text-on-surface-muted", children: isSorted ? sortDirection === "asc" ? "\u2191" : "\u2193" : "\u2195" })
            ] })
          },
          String(col.key)
        );
      })
    ] }) }),
    /* @__PURE__ */ jsx31("tbody", { children: rows.length === 0 ? /* @__PURE__ */ jsx31(DataTableRow, { children: /* @__PURE__ */ jsx31("td", { colSpan: colCount, className: "px-md py-2xl text-center", children: emptyState || /* @__PURE__ */ jsx31("span", { className: "font-body-md text-on-surface-muted", children: "No results" }) }) }) : rows.map((row) => {
      const isSelected = selectedIds.includes(row.id);
      return /* @__PURE__ */ jsxs16(
        DataTableRow,
        {
          className: `${isSelected ? "bg-accent-container" : "bg-surface-raised"} text-on-surface hover:bg-surface-overlay`,
          children: [
            selectable && /* @__PURE__ */ jsx31(DataTableCell, { className: "w-12", children: /* @__PURE__ */ jsx31(
              Checkbox,
              {
                checked: isSelected,
                onCheckedChange: () => handleSelectRow(row.id)
              }
            ) }),
            columns.map((col) => {
              const value = row[col.key];
              return /* @__PURE__ */ jsx31(DataTableCell, { children: col.render ? col.render(value, row) : String(value ?? "") }, String(col.key));
            })
          ]
        },
        row.id
      );
    }) })
  ] }) });
}
export {
  AppShell,
  Avatar,
  AvatarGroup,
  Badge,
  Breadcrumb,
  Button,
  Callout,
  Card,
  ChatBubble,
  Checkbox,
  CodeBlock,
  CommandMenu,
  CommandMenuItem,
  CommandMenuSection,
  ContentBlockquote,
  ContentBody,
  ContentCaption,
  ContentHeading,
  ContentPage,
  DataTable,
  DataTableCell,
  DataTableHeader,
  DataTableRow,
  Dialog,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  EmptyState,
  Header,
  Input,
  NavItem,
  Select,
  SelectItem,
  Sidebar,
  SidebarItem,
  SidebarSection,
  Skeleton,
  SkeletonText,
  Tab,
  TabContent,
  TabList,
  TabsRoot,
  Textarea,
  Toast,
  ToastViewport,
  Toggle,
  Tooltip,
  useToast
};
//# sourceMappingURL=index.mjs.map