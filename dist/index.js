"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/components/index.ts
var index_exports = {};
__export(index_exports, {
  AppShell: () => AppShell,
  Avatar: () => Avatar,
  AvatarGroup: () => AvatarGroup,
  Badge: () => Badge,
  Breadcrumb: () => Breadcrumb,
  Button: () => Button,
  Callout: () => Callout,
  Card: () => Card,
  ChatBubble: () => ChatBubble,
  Checkbox: () => Checkbox,
  CodeBlock: () => CodeBlock,
  CommandMenu: () => CommandMenu,
  CommandMenuItem: () => CommandMenuItem,
  CommandMenuSection: () => CommandMenuSection,
  ContentBlockquote: () => ContentBlockquote,
  ContentBody: () => ContentBody,
  ContentCaption: () => ContentCaption,
  ContentHeading: () => ContentHeading,
  ContentPage: () => ContentPage,
  DataTable: () => DataTable,
  DataTableCell: () => DataTableCell,
  DataTableHeader: () => DataTableHeader,
  DataTableRow: () => DataTableRow,
  Dialog: () => Dialog,
  DropdownMenu: () => DropdownMenu,
  DropdownMenuItem: () => DropdownMenuItem,
  DropdownMenuSeparator: () => DropdownMenuSeparator,
  EmptyState: () => EmptyState,
  Header: () => Header,
  Input: () => Input,
  NavItem: () => NavItem,
  Select: () => Select,
  SelectItem: () => SelectItem,
  Sidebar: () => Sidebar,
  SidebarItem: () => SidebarItem,
  SidebarSection: () => SidebarSection,
  Skeleton: () => Skeleton,
  SkeletonText: () => SkeletonText,
  Tab: () => Tab,
  TabContent: () => TabContent,
  TabList: () => TabList,
  TabsRoot: () => TabsRoot,
  Textarea: () => Textarea,
  Toast: () => Toast,
  ToastViewport: () => ToastViewport,
  Toggle: () => Toggle,
  Tooltip: () => Tooltip,
  useToast: () => useToast
});
module.exports = __toCommonJS(index_exports);

// src/components/Button.tsx
var import_react = __toESM(require("react"));
var import_jsx_runtime = require("react/jsx-runtime");
var Button = import_react.default.forwardRef(
  ({ variant = "primary", disabled, className = "", children, ...props }, ref) => {
    const base = "inline-flex items-center justify-center font-body-md transition-colors focus:outline-none focus:ring-2 focus:ring-focus-ring";
    const variants = {
      primary: disabled ? "bg-neutral text-on-surface-muted rounded-md px-md py-sm" : "bg-primary text-on-primary rounded-md px-md py-sm hover:bg-primary-container hover:text-on-surface",
      secondary: disabled ? "bg-neutral text-on-surface-muted rounded-md px-md py-sm" : "bg-secondary text-on-secondary rounded-md px-md py-sm hover:bg-secondary-container hover:text-on-surface",
      ghost: disabled ? "bg-neutral text-on-surface-muted rounded-md px-md py-sm" : "bg-surface text-on-surface rounded-md px-md py-sm hover:bg-surface-raised",
      destructive: disabled ? "bg-neutral text-on-surface-muted rounded-md px-md py-sm" : "bg-error text-on-error rounded-md px-md py-sm"
    };
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
var import_react2 = __toESM(require("react"));
var import_jsx_runtime2 = require("react/jsx-runtime");
var Input = import_react2.default.forwardRef(
  ({ error, disabled, className = "", ...props }, ref) => {
    const base = "w-full font-body-md text-on-surface placeholder-on-surface-muted focus:outline-none focus:ring-2 focus:ring-focus-ring transition-colors";
    const state = disabled ? "bg-neutral text-on-surface-muted rounded-md px-md py-sm" : error ? "bg-surface-raised text-error rounded-md px-md py-sm" : "bg-surface-raised text-on-surface rounded-md px-md py-sm focus:bg-surface-overlay";
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { ref, disabled, className: `${base} ${state} ${className}`, ...props });
  }
);
Input.displayName = "Input";

// src/components/Badge.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var Badge = ({ variant = "default", className = "", children, ...props }) => {
  const base = "inline-flex items-center justify-center font-label-sm rounded-full px-xs py-2xs";
  const variants = {
    default: "bg-secondary text-on-secondary",
    accent: "bg-accent-container text-on-accent",
    error: "bg-error text-on-error"
  };
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: `${base} ${variants[variant]} ${className}`, ...props, children });
};

// src/components/NavItem.tsx
var import_react3 = __toESM(require("react"));
var import_jsx_runtime4 = require("react/jsx-runtime");
var NavItem = import_react3.default.forwardRef(
  ({ active, onClick, className = "", children, href, ...props }, ref) => {
    const base = "inline-flex items-center font-label-lg rounded-sm px-md py-sm transition-colors focus:outline-none focus:ring-2 focus:ring-focus-ring";
    const state = active ? "bg-accent text-on-accent" : "bg-surface text-on-surface-muted hover:bg-surface-raised hover:text-on-surface";
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
var import_react4 = __toESM(require("react"));
var TabsPrimitive = __toESM(require("@radix-ui/react-tabs"));
var import_jsx_runtime5 = require("react/jsx-runtime");
var TabList = import_react4.default.forwardRef(({ className = "", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
  TabsPrimitive.List,
  {
    ref,
    className: `inline-flex items-center gap-xs bg-surface rounded-md p-xs ${className}`,
    ...props
  }
));
TabList.displayName = "TabList";
var Tab = import_react4.default.forwardRef(({ className = "", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
  TabsPrimitive.Trigger,
  {
    ref,
    className: `inline-flex items-center justify-center font-label-lg rounded-sm px-md py-sm transition-colors focus:outline-none focus:ring-2 focus:ring-focus-ring data-[state=active]:bg-surface-raised data-[state=active]:text-on-surface text-on-surface-muted hover:bg-surface-raised hover:text-on-surface ${className}`,
    ...props
  }
));
Tab.displayName = "Tab";
var TabContent = import_react4.default.forwardRef(({ className = "", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
var import_react5 = __toESM(require("react"));
var import_jsx_runtime6 = require("react/jsx-runtime");
var Card = import_react5.default.forwardRef(
  ({ interactive, className = "", children, ...props }, ref) => {
    const base = "bg-surface-raised text-on-surface rounded-lg p-md transition-colors";
    const state = interactive ? "hover:bg-surface-overlay hover:shadow-raised cursor-pointer focus:outline-none focus:ring-2 focus:ring-focus-ring" : "";
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { ref, className: `${base} ${state} ${className}`, ...props, children });
  }
);
Card.displayName = "Card";

// src/components/Dialog.tsx
var DialogPrimitive = __toESM(require("@radix-ui/react-dialog"));
var import_jsx_runtime7 = require("react/jsx-runtime");
var Dialog = ({ open, onOpenChange, title, children }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(DialogPrimitive.Root, { open, onOpenChange, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(DialogPrimitive.Portal, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(DialogPrimitive.Overlay, { className: "fixed inset-0 bg-on-surface/20 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
      DialogPrimitive.Content,
      {
        className: "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface-overlay text-on-surface rounded-xl p-lg shadow-overlay w-full max-w-lg focus:outline-none focus:ring-2 focus:ring-focus-ring data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(DialogPrimitive.Title, { className: "font-heading-md text-on-surface mb-sm", children: title }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { children })
        ]
      }
    )
  ] }) });
};

// src/components/ChatBubble.tsx
var import_react6 = __toESM(require("react"));
var import_jsx_runtime8 = require("react/jsx-runtime");
var ChatBubble = import_react6.default.forwardRef(
  ({ role, className = "", children, ...props }, ref) => {
    const isUser = role === "user";
    const base = "max-w-xl rounded-lg p-md font-body-md";
    const tone = isUser ? "bg-surface-chat-user text-on-chat ml-auto" : "bg-surface-chat-assistant text-on-chat mr-auto";
    return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { ref, className: `${base} ${tone} ${className}`, ...props, children });
  }
);
ChatBubble.displayName = "ChatBubble";

// src/components/ContentPage.tsx
var import_react7 = __toESM(require("react"));
var import_jsx_runtime9 = require("react/jsx-runtime");
var ContentPage = import_react7.default.forwardRef(
  ({ className = "", children, ...props }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
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
var import_react8 = __toESM(require("react"));
var import_jsx_runtime10 = require("react/jsx-runtime");
var Callout = import_react8.default.forwardRef(
  ({ className = "", children, ...props }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
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
var import_react9 = __toESM(require("react"));
var import_jsx_runtime11 = require("react/jsx-runtime");
var Textarea = import_react9.default.forwardRef(
  ({ error, disabled, className = "", ...props }, ref) => {
    const base = "w-full font-body-md text-on-surface placeholder-on-surface-muted focus:outline-none focus:ring-2 focus:ring-focus-ring resize-y";
    const state = disabled ? "bg-neutral text-on-surface-muted rounded-md px-md py-sm" : error ? "bg-surface-raised text-error rounded-md px-md py-sm" : "bg-surface-raised text-on-surface rounded-md px-md py-sm focus:bg-surface-overlay";
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
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
var import_react10 = __toESM(require("react"));
var SwitchPrimitive = __toESM(require("@radix-ui/react-switch"));
var import_jsx_runtime12 = require("react/jsx-runtime");
var Toggle = ({ checked, onCheckedChange, disabled, label }) => {
  const id = import_react10.default.useId();
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "flex items-center gap-sm", children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
      SwitchPrimitive.Root,
      {
        id,
        checked,
        onCheckedChange,
        disabled,
        className: `w-11 h-6 rounded-full relative transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring data-[state=checked]:bg-primary data-[state=unchecked]:bg-surface ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`,
        children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
          SwitchPrimitive.Thumb,
          {
            className: "block w-5 h-5 bg-on-primary rounded-full transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5 shadow-raised"
          }
        )
      }
    ),
    label && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("label", { htmlFor: id, className: `font-label-lg ${disabled ? "text-on-surface-muted" : "text-on-surface"}`, children: label })
  ] });
};

// src/components/Checkbox.tsx
var import_react11 = __toESM(require("react"));
var CheckboxPrimitive = __toESM(require("@radix-ui/react-checkbox"));
var import_jsx_runtime13 = require("react/jsx-runtime");
var Checkbox = ({ checked, onCheckedChange, disabled, label }) => {
  const id = import_react11.default.useId();
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "flex items-center gap-sm", children: [
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
      CheckboxPrimitive.Root,
      {
        id,
        checked,
        onCheckedChange,
        disabled,
        className: `w-4 h-4 rounded-sm border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring flex items-center justify-center ${disabled ? "bg-neutral border-border-subtle opacity-60 cursor-not-allowed" : checked ? "bg-primary border-primary" : "bg-surface-raised border-border"}`,
        children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(CheckboxPrimitive.Indicator, { children: checked === "indeterminate" ? /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { className: "block w-2 h-0.5 bg-on-primary rounded-full" }) : /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "none", className: "text-on-primary", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("path", { d: "M1 5L3.5 7.5L9 2", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }) })
      }
    ),
    label && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("label", { htmlFor: id, className: `font-label-lg ${disabled ? "text-on-surface-muted" : "text-on-surface"}`, children: label })
  ] });
};

// src/components/Select.tsx
var SelectPrimitive = __toESM(require("@radix-ui/react-select"));
var import_jsx_runtime14 = require("react/jsx-runtime");
var SelectItem = ({ value, children }) => /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
  SelectPrimitive.Item,
  {
    value,
    className: "relative font-body-md text-on-surface rounded-sm px-md py-sm cursor-pointer outline-none data-[highlighted]:bg-surface-raised data-[state=checked]:text-accent select-none",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(SelectPrimitive.ItemText, { children }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(SelectPrimitive.ItemIndicator, { className: "absolute right-sm inline-flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "none", className: "text-accent", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("path", { d: "M1 5L3.5 7.5L9 2", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }) })
    ]
  }
);
var Select = ({ value, onValueChange, placeholder, disabled, children }) => /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(SelectPrimitive.Root, { value, onValueChange, disabled, children: [
  /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
    SelectPrimitive.Trigger,
    {
      className: `inline-flex items-center justify-between w-full font-body-md rounded-md px-md py-sm focus:outline-none focus:ring-2 focus:ring-focus-ring ${disabled ? "bg-neutral text-on-surface-muted cursor-not-allowed" : "bg-surface-raised text-on-surface hover:bg-surface-overlay data-[state=open]:bg-surface-overlay"}`,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(SelectPrimitive.Value, { placeholder }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(SelectPrimitive.Icon, { className: "text-on-surface-muted ml-sm", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("path", { d: "M2 4L6 8L10 4", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }) })
      ]
    }
  ),
  /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(SelectPrimitive.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
    SelectPrimitive.Content,
    {
      className: "bg-surface-overlay rounded-md shadow-overlay p-xs min-w-[var(--radix-select-trigger-width)] z-50 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 duration-150",
      position: "popper",
      sideOffset: 4,
      children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(SelectPrimitive.Viewport, { className: "p-xs", children })
    }
  ) })
] });

// src/components/DropdownMenu.tsx
var import_react12 = __toESM(require("react"));
var DropdownMenuPrimitive = __toESM(require("@radix-ui/react-dropdown-menu"));
var import_jsx_runtime15 = require("react/jsx-runtime");
var DropdownMenu = ({ trigger, children }) => /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(DropdownMenuPrimitive.Root, { children: [
  /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(DropdownMenuPrimitive.Trigger, { asChild: true, children: trigger }),
  /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
    DropdownMenuPrimitive.Content,
    {
      className: "bg-surface-overlay rounded-md shadow-overlay p-xs min-w-[160px] z-50 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 duration-150",
      sideOffset: 4,
      children
    }
  ) })
] });
var DropdownMenuItem = import_react12.default.forwardRef(
  ({ destructive, className = "", children, disabled, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
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
var DropdownMenuSeparator = import_react12.default.forwardRef(
  ({ className = "", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
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
var import_react13 = __toESM(require("react"));
var import_jsx_runtime16 = require("react/jsx-runtime");
var ContentHeading = import_react13.default.forwardRef(
  ({ level = 1, className = "", children, ...props }, ref) => {
    const Tag = `h${level}`;
    const sizeMap2 = {
      1: "font-content-heading-lg text-on-content",
      2: "font-content-heading-md text-on-content",
      3: "font-content-heading-sm text-on-content",
      4: "font-content-heading-sm text-on-content"
    };
    return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(Tag, { ref, className: `${sizeMap2[level]} ${className}`, ...props, children });
  }
);
ContentHeading.displayName = "ContentHeading";

// src/components/ContentBody.tsx
var import_react14 = __toESM(require("react"));
var import_jsx_runtime17 = require("react/jsx-runtime");
var ContentBody = import_react14.default.forwardRef(
  ({ size = "md", className = "", children, ...props }, ref) => {
    const sizeClass = size === "lg" ? "font-content-body-lg" : "font-content-body-md";
    const leading = size === "lg" ? "leading-[1.75]" : "leading-[1.6]";
    return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("p", { ref, className: `${sizeClass} ${leading} text-on-content ${className}`, ...props, children });
  }
);
ContentBody.displayName = "ContentBody";

// src/components/ContentBlockquote.tsx
var import_react15 = __toESM(require("react"));
var import_jsx_runtime18 = require("react/jsx-runtime");
var ContentBlockquote = import_react15.default.forwardRef(
  ({ className = "", children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
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
var import_react16 = __toESM(require("react"));
var import_jsx_runtime19 = require("react/jsx-runtime");
var ContentCaption = import_react16.default.forwardRef(
  ({ className = "", children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
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
var import_react17 = __toESM(require("react"));
var import_jsx_runtime20 = require("react/jsx-runtime");
var CodeBlock = import_react17.default.forwardRef(
  ({ language, className = "", children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: "relative", children: [
    language && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("span", { className: "absolute top-sm right-sm font-label-sm text-on-surface-muted", children: language }),
    /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
      "pre",
      {
        ref,
        className: `bg-surface rounded-md p-md overflow-x-auto font-code-md text-on-surface leading-[1.5] ${className}`,
        ...props,
        children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("code", { children })
      }
    )
  ] })
);
CodeBlock.displayName = "CodeBlock";

// src/components/Tooltip.tsx
var TooltipPrimitive = __toESM(require("@radix-ui/react-tooltip"));
var import_jsx_runtime21 = require("react/jsx-runtime");
var Tooltip = ({ content, children, side = "top", delayDuration = 400 }) => /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(TooltipPrimitive.Provider, { delayDuration, children: /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(TooltipPrimitive.Root, { children: [
  /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(TooltipPrimitive.Trigger, { asChild: true, children }),
  /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(TooltipPrimitive.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(
    TooltipPrimitive.Content,
    {
      side,
      className: "bg-primary text-on-primary rounded-md px-md py-sm font-label-sm shadow-raised z-50 data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 duration-100",
      sideOffset: 4,
      children: [
        content,
        /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(TooltipPrimitive.Arrow, { className: "fill-primary" })
      ]
    }
  ) })
] }) });

// src/components/Breadcrumb.tsx
var import_jsx_runtime22 = require("react/jsx-runtime");
var Breadcrumb = ({ items, className = "" }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("nav", { "aria-label": "breadcrumb", className, children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("ol", { className: "flex items-center", children: items.map((item, index) => {
    const isLast = index === items.length - 1;
    return /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("li", { className: "flex items-center", children: isLast ? /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
      "span",
      {
        className: "font-label-sm text-on-surface",
        "aria-current": "page",
        children: item.label
      }
    ) : /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(import_jsx_runtime22.Fragment, { children: [
      item.href ? /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
        "a",
        {
          href: item.href,
          onClick: item.onClick,
          className: "font-label-sm text-on-surface-muted hover:text-on-surface transition-colors",
          children: item.label
        }
      ) : item.onClick ? /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
        "button",
        {
          onClick: item.onClick,
          className: "font-label-sm text-on-surface-muted hover:text-on-surface transition-colors",
          children: item.label
        }
      ) : /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("span", { className: "font-label-sm text-on-surface-muted", children: item.label }),
      /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("span", { className: "text-on-surface-muted mx-xs", "aria-hidden": "true", children: "\u203A" })
    ] }) }, index);
  }) }) });
};

// src/components/Header.tsx
var import_jsx_runtime23 = require("react/jsx-runtime");
var Header = ({ title, breadcrumb, actions, className = "" }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("header", { className: `bg-surface-raised border-b border-border-subtle ${className}`, children: /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "flex items-center justify-between px-lg py-sm h-14", children: [
    /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "flex items-center min-w-0", children: breadcrumb ? /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(Breadcrumb, { items: breadcrumb }) : title ? /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("h1", { className: "font-heading-sm text-on-surface truncate", children: title }) : null }),
    actions && /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "flex items-center gap-sm flex-shrink-0", children: actions })
  ] }) });
};

// src/components/Sidebar.tsx
var import_react18 = __toESM(require("react"));
var import_jsx_runtime24 = require("react/jsx-runtime");
var SidebarSection = ({
  label,
  children,
  collapsible,
  defaultCollapsed
}) => {
  const [open, setOpen] = (0, import_react18.useState)(!defaultCollapsed);
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: "flex flex-col", children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(
      "button",
      {
        onClick: () => collapsible && setOpen(!open),
        className: `flex items-center justify-between font-label-sm text-on-surface-muted uppercase tracking-wide px-md py-xs ${collapsible ? "cursor-pointer hover:text-on-surface" : ""}`,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("span", { children: label }),
          collapsible && /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("span", { className: `text-on-surface-muted transition-transform ${open ? "rotate-90" : ""}`, children: "\u203A" })
        ]
      }
    ),
    (!collapsible || open) && /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: "flex flex-col", children })
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
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(
    "a",
    {
      href,
      onClick,
      className: `inline-flex items-center w-full font-label-lg rounded-sm px-md py-sm transition-colors focus:outline-none focus:ring-2 focus:ring-focus-ring ${active ? "bg-accent text-on-accent" : "bg-surface text-on-surface-muted hover:bg-surface-raised hover:text-on-surface"} ${indent ? "pl-xl" : ""} ${className}`,
      ...props,
      children: [
        icon && /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("span", { className: "mr-sm", children: icon }),
        children
      ]
    }
  );
};
var Sidebar = ({ children, className = "", collapsed }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
    "aside",
    {
      className: `bg-surface flex flex-col h-full border-r border-border-subtle overflow-y-auto transition-[width] duration-200 ease-in-out ${collapsed ? "w-14" : "w-60"} ${className}`,
      children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: "flex flex-col gap-sm py-md", children: import_react18.default.Children.map(children, (child) => {
        if (!import_react18.default.isValidElement(child)) return child;
        if (child.type === SidebarSection) {
          return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
            SidebarSection,
            {
              ...child.props,
              label: collapsed ? void 0 : child.props.label
            }
          );
        }
        if (child.type === SidebarItem && collapsed) {
          const itemProps = child.props;
          return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: "flex justify-center py-sm", children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(Tooltip, { content: typeof itemProps.children === "string" ? itemProps.children : "", side: "right", children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("span", { className: `cursor-pointer ${itemProps.active ? "text-on-accent" : "text-on-surface-muted"}`, children: itemProps.icon || /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("span", { className: "w-4 h-4 block" }) }) }) });
        }
        return child;
      }) })
    }
  );
};

// src/components/AppShell.tsx
var import_jsx_runtime25 = require("react/jsx-runtime");
var AppShell = ({
  header,
  sidebar,
  children,
  className = ""
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: `flex flex-col h-screen bg-surface ${className}`, children: [
    header && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { className: "flex-shrink-0", children: header }),
    /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "flex flex-1 overflow-hidden", children: [
      sidebar && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { className: "flex-shrink-0 h-full overflow-hidden", children: sidebar }),
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("main", { className: "flex-1 overflow-y-auto", children })
    ] })
  ] });
};

// src/components/CommandMenu.tsx
var import_react19 = __toESM(require("react"));
var DialogPrimitive2 = __toESM(require("@radix-ui/react-dialog"));
var import_jsx_runtime26 = require("react/jsx-runtime");
var CommandMenuItem = ({ onSelect, icon, shortcut, children }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(
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
        icon && /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("span", { className: "text-on-surface-muted", children: icon }),
        /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("span", { className: "flex-1", children }),
        shortcut && /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("span", { className: "font-label-sm text-on-surface-muted", children: shortcut })
      ]
    }
  );
};
var CommandMenuSection = ({ label, children }) => /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)("div", { className: "mt-xs", children: [
  label && /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { className: "font-label-sm text-on-surface-muted uppercase px-md py-xs", children: label }),
  /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { className: "flex flex-col", children })
] });
var CommandMenu = ({ open, onOpenChange, placeholder = "Search\u2026", children }) => {
  const [query, setQuery] = (0, import_react19.useState)("");
  const inputRef = (0, import_react19.useRef)(null);
  (0, import_react19.useEffect)(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(DialogPrimitive2.Root, { open, onOpenChange, children: /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(DialogPrimitive2.Portal, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(DialogPrimitive2.Overlay, { className: "fixed inset-0 bg-on-surface/20 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }),
    /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(
      DialogPrimitive2.Content,
      {
        className: "fixed top-[20vh] left-1/2 -translate-x-1/2 bg-surface-overlay rounded-lg shadow-overlay w-full max-w-xl overflow-hidden focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        onKeyDown: (e) => {
          if (e.key === "Escape") onOpenChange(false);
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
            "input",
            {
              ref: inputRef,
              value: query,
              onChange: (e) => setQuery(e.target.value),
              placeholder,
              className: "w-full font-body-lg text-on-surface placeholder-on-surface-muted px-lg py-md outline-none border-b border-border-subtle bg-transparent"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { className: "max-h-80 overflow-y-auto py-sm", children: import_react19.default.Children.count(children) === 0 ? /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { className: "px-lg py-md font-body-md text-on-surface-muted", children: "No results" }) : children })
        ]
      }
    )
  ] }) });
};

// src/components/Avatar.tsx
var import_react20 = require("react");
var import_jsx_runtime27 = require("react/jsx-runtime");
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
  const [imgError, setImgError] = (0, import_react20.useState)(false);
  const showImage = src && !imgError;
  const displayInitials = initials || (alt ? deriveInitials(alt) : "");
  const sizeClass = sizeMap[size];
  const fontClass = fontMap[size];
  const stateClass = muted ? "bg-neutral text-on-surface-muted" : "bg-secondary text-on-secondary";
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
    "div",
    {
      className: `inline-flex items-center justify-center rounded-full ${sizeClass} ${fontClass} ${stateClass} ${className}`,
      "aria-label": showImage ? alt : displayInitials,
      role: "img",
      children: showImage ? /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
        "img",
        {
          src,
          alt: alt || "",
          className: "w-full h-full rounded-full object-cover",
          onError: () => setImgError(true)
        }
      ) : /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("span", { children: displayInitials })
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
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "flex items-center", children: [
    visible.map((avatar, i) => /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: `${i > 0 ? "-ml-2" : ""}`, style: { zIndex: visible.length - i }, children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(Avatar, { ...avatar, size }) }, i)),
    overflow > 0 && /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: "-ml-2", children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(Avatar, { initials: `+${overflow}`, size, muted: true }) })
  ] });
};

// src/components/Toast.tsx
var ToastPrimitive = __toESM(require("@radix-ui/react-toast"));
var import_jsx_runtime28 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(
    ToastPrimitive.Root,
    {
      open,
      onOpenChange,
      duration,
      className: `rounded-lg px-md py-sm shadow-overlay flex items-start gap-md data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom-2 data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right-full data-[state=closed]:fade-out-0 duration-200 ${variantClass}`,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(ToastPrimitive.Title, { className: "font-label-lg", children: title }),
          description && /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(ToastPrimitive.Description, { className: "font-body-sm opacity-80 mt-xs", children: description })
        ] }),
        action && /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
          "button",
          {
            onClick: action.onClick,
            className: `shrink-0 font-label-lg underline ${variant === "default" ? "text-on-surface hover:text-on-surface-muted" : "text-inherit opacity-90 hover:opacity-100"}`,
            children: action.label
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
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
var ToastViewport = () => /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(ToastPrimitive.Viewport, { className: "fixed bottom-md right-md flex flex-col gap-sm z-50" });

// src/components/useToast.ts
var import_react21 = require("react");
var idCounter = 0;
function useToast() {
  const [toasts, setToasts] = (0, import_react21.useState)([]);
  const toast = (0, import_react21.useCallback)((options) => {
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
  const dismiss = (0, import_react21.useCallback)((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);
  return { toasts, toast, dismiss };
}

// src/components/Skeleton.tsx
var import_jsx_runtime29 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("div", { className: "flex flex-col gap-sm", children: Array.from({ length: lines }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
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
var import_jsx_runtime30 = require("react/jsx-runtime");
var EmptyState = ({
  icon,
  title,
  description,
  action,
  className = ""
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)("div", { className: `bg-surface rounded-lg p-2xl flex flex-col items-center text-center ${className}`, children: [
    icon && /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("div", { className: "w-12 h-12 text-on-surface-muted mb-md flex items-center justify-center", children: icon }),
    /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("h3", { className: "font-heading-sm text-on-surface mb-xs", children: title }),
    description && /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("p", { className: "font-body-md text-on-surface-muted max-w-xs mb-lg", children: description }),
    action && /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("div", { children: action })
  ] });
};

// src/components/DataTable.tsx
var import_jsx_runtime31 = require("react/jsx-runtime");
var DataTableCell = ({
  children,
  className = "",
  ...props
}) => /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("td", { className: `px-md py-sm font-body-md text-on-surface ${className}`, ...props, children });
var DataTableRow = ({
  children,
  className = "",
  ...props
}) => /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("tr", { className: `border-b border-border-subtle transition-colors ${className}`, ...props, children });
var DataTableHeader = ({
  children,
  className = "",
  ...props
}) => /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("div", { className: `overflow-x-auto rounded-lg border border-border-subtle ${className}`, children: /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("table", { className: "w-full border-collapse", children: [
    /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("thead", { className: "bg-surface", children: /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(DataTableRow, { children: [
      selectable && /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(DataTableHeader, { className: "w-12", children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
        Checkbox,
        {
          checked: someSelected ? "indeterminate" : allSelected,
          onCheckedChange: handleSelectAll
        }
      ) }),
      columns.map((col) => {
        const isSorted = sortKey === col.key;
        return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
          DataTableHeader,
          {
            className: col.sortable ? "cursor-pointer hover:text-on-surface transition-colors" : "",
            onClick: () => col.sortable && onSort?.(col.key),
            "aria-sort": isSorted ? sortDirection === "asc" ? "ascending" : "descending" : void 0,
            style: col.width ? { width: col.width } : void 0,
            children: /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: "flex items-center gap-xs", children: [
              col.label,
              col.sortable && /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: isSorted ? "text-accent" : "text-on-surface-muted", children: isSorted ? sortDirection === "asc" ? "\u2191" : "\u2193" : "\u2195" })
            ] })
          },
          String(col.key)
        );
      })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("tbody", { children: rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(DataTableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("td", { colSpan: colCount, className: "px-md py-2xl text-center", children: emptyState || /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { className: "font-body-md text-on-surface-muted", children: "No results" }) }) }) : rows.map((row) => {
      const isSelected = selectedIds.includes(row.id);
      return /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(
        DataTableRow,
        {
          className: `${isSelected ? "bg-accent-container" : "bg-surface-raised"} text-on-surface hover:bg-surface-overlay`,
          children: [
            selectable && /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(DataTableCell, { className: "w-12", children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
              Checkbox,
              {
                checked: isSelected,
                onCheckedChange: () => handleSelectRow(row.id)
              }
            ) }),
            columns.map((col) => {
              const value = row[col.key];
              return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(DataTableCell, { children: col.render ? col.render(value, row) : String(value ?? "") }, String(col.key));
            })
          ]
        },
        row.id
      );
    }) })
  ] }) });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
});
//# sourceMappingURL=index.js.map