/* @ds-bundle: {"format":4,"namespace":"AmigosDesignSystem_9ec6eb","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Stat","sourcePath":"components/core/Stat.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Accordion","sourcePath":"components/feedback/Accordion.jsx"},{"name":"Alert","sourcePath":"components/feedback/Alert.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"AmountPicker","sourcePath":"components/forms/AmountPicker.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"RadioGroup","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Breadcrumbs","sourcePath":"components/navigation/Breadcrumbs.jsx"},{"name":"Pagination","sourcePath":"components/navigation/Pagination.jsx"},{"name":"SiteFooter","sourcePath":"components/navigation/SiteFooter.jsx"},{"name":"SiteHeader","sourcePath":"components/navigation/SiteHeader.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"CtaBand","sourcePath":"components/sections/CtaBand.jsx"},{"name":"Hero","sourcePath":"components/sections/Hero.jsx"},{"name":"ImageBlock","sourcePath":"components/sections/ImageBlock.jsx"},{"name":"Quote","sourcePath":"components/sections/ImageBlock.jsx"},{"name":"SectionHeader","sourcePath":"components/sections/SectionHeader.jsx"},{"name":"TypePattern","sourcePath":"components/sections/TypePattern.jsx"},{"name":"CircleMotif","sourcePath":"components/sections/TypePattern.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"22effec76811","components/core/Button.jsx":"3cac8c64a844","components/core/Card.jsx":"08d1aa87372e","components/core/Stat.jsx":"afce58977394","components/core/Tag.jsx":"daf8be5f44a5","components/feedback/Accordion.jsx":"f7b1ec56cb55","components/feedback/Alert.jsx":"a2404b2022ea","components/feedback/Dialog.jsx":"d4b30c423ab2","components/forms/AmountPicker.jsx":"172bf8847df5","components/forms/Checkbox.jsx":"b66a430d7d1f","components/forms/Field.jsx":"2f23ba06669a","components/forms/Input.jsx":"5a32ee423eed","components/forms/Radio.jsx":"c161e8495c66","components/forms/Select.jsx":"9e843863ddac","components/navigation/Breadcrumbs.jsx":"abf8d63d460e","components/navigation/Pagination.jsx":"0cc51dd4d854","components/navigation/SiteFooter.jsx":"4e62c19504af","components/navigation/SiteHeader.jsx":"4ebdd9860888","components/navigation/Tabs.jsx":"b7dece52cf04","components/sections/CtaBand.jsx":"93f0cf3205fb","components/sections/Hero.jsx":"e44585f8b2fb","components/sections/ImageBlock.jsx":"1bc96c3617ec","components/sections/SectionHeader.jsx":"df75470331ce","components/sections/TypePattern.jsx":"e2c52558a6b7"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.AmigosDesignSystem_9ec6eb = window.AmigosDesignSystem_9ec6eb || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function Badge({
  children,
  status = 'info',
  dot = true,
  style
}) {
  const m = {
    info: 'var(--am-info)',
    success: 'var(--am-success)',
    warning: 'var(--am-warning)',
    error: 'var(--am-error)',
    neutral: 'var(--text-tertiary)'
  };
  const bg = {
    info: 'var(--am-info-bg)',
    success: 'var(--am-success-bg)',
    warning: 'var(--am-warning-bg)',
    error: 'var(--am-error-bg)',
    neutral: 'var(--bg-surface-muted)'
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 24,
      padding: '0 10px',
      borderRadius: 'var(--radius-sm)',
      background: bg[status],
      color: m[status],
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      lineHeight: 1,
      whiteSpace: 'nowrap',
      ...style
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: m[status]
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const base = {
  fontFamily: 'var(--font-body)',
  fontWeight: 600,
  fontSize: 'var(--text-button)',
  lineHeight: 1,
  border: '2px solid transparent',
  borderRadius: 'var(--radius-button)',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 10,
  whiteSpace: 'nowrap',
  textDecoration: 'none',
  transition: 'background var(--dur-fast) var(--ease-out),color var(--dur-fast) var(--ease-out),border-color var(--dur-fast) var(--ease-out),transform var(--dur-fast) var(--ease-out)'
};
const sizes = {
  sm: {
    height: 'var(--control-sm)',
    padding: '0 16px',
    fontSize: 14
  },
  md: {
    height: 'var(--control-md)',
    padding: '0 22px'
  },
  lg: {
    height: 'var(--control-lg)',
    padding: '0 30px',
    fontSize: 18
  }
};
const variants = {
  primary: {
    bg: 'var(--color-primary)',
    fg: 'var(--text-on-field)',
    bd: 'var(--color-primary)',
    hbg: 'var(--color-primary-hover)',
    hbd: 'var(--color-primary-hover)'
  },
  secondary: {
    bg: 'transparent',
    fg: 'var(--color-primary)',
    bd: 'var(--color-primary)',
    hbg: 'var(--color-primary-softer)',
    hbd: 'var(--color-primary)'
  },
  ghost: {
    bg: 'transparent',
    fg: 'var(--text-primary)',
    bd: 'transparent',
    hbg: 'var(--bg-surface-muted)',
    hbd: 'transparent'
  },
  accent: {
    bg: 'var(--color-accent)',
    fg: 'var(--text-on-accent)',
    bd: 'var(--color-accent)',
    hbg: 'var(--color-accent-hover)',
    hbd: 'var(--color-accent-hover)'
  },
  inverse: {
    bg: 'var(--am-white)',
    fg: 'var(--am-green-900)',
    bd: 'var(--am-white)',
    hbg: 'var(--am-green-100)',
    hbd: 'var(--am-green-100)'
  },
  inverseOutline: {
    bg: 'transparent',
    fg: 'var(--am-white)',
    bd: 'var(--am-white)',
    hbg: 'rgba(255,255,255,0.12)',
    hbd: 'var(--am-white)'
  }
};
function Button({
  variant = 'primary',
  size = 'md',
  href,
  disabled,
  icon,
  iconRight,
  children,
  style,
  onClick,
  type = 'button',
  ...rest
}) {
  const [h, setH] = React.useState(false);
  const [p, setP] = React.useState(false);
  const v = variants[variant] || variants.primary;
  const s = sizes[size] || sizes.md;
  const st = {
    ...base,
    ...s,
    background: h && !disabled ? v.hbg : v.bg,
    color: v.fg,
    borderColor: h && !disabled ? v.hbd : v.bd,
    opacity: disabled ? 0.45 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transform: p && !disabled ? 'translateY(1px)' : 'none',
    ...style
  };
  const inner = /*#__PURE__*/React.createElement(React.Fragment, null, icon, children, iconRight);
  const ev = {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => {
      setH(false);
      setP(false);
    },
    onMouseDown: () => setP(true),
    onMouseUp: () => setP(false)
  };
  if (href) return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    style: st,
    onClick: onClick
  }, ev, rest), inner);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    style: st,
    disabled: disabled,
    onClick: onClick
  }, ev, rest), inner);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function Card({
  image,
  imageShape = 'rounded',
  eyebrow,
  title,
  children,
  href,
  meta,
  tone = 'outline',
  style
}) {
  const [h, setH] = React.useState(false);
  const tones = {
    outline: {
      bg: 'var(--bg-surface)',
      bd: '1px solid var(--border-default)',
      fg: 'var(--text-primary)'
    },
    muted: {
      bg: 'var(--bg-surface-muted)',
      bd: '1px solid transparent',
      fg: 'var(--text-primary)'
    },
    field: {
      bg: 'var(--bg-field)',
      bd: '1px solid transparent',
      fg: 'var(--text-on-field)'
    },
    pale: {
      bg: 'var(--bg-field-pale)',
      bd: '1px solid transparent',
      fg: 'var(--text-on-pale)'
    }
  };
  const t = tones[tone] || tones.outline;
  const Cmp = href ? 'a' : 'div';
  return /*#__PURE__*/React.createElement(Cmp, {
    href: href,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: 'flex',
      flexDirection: 'column',
      background: t.bg,
      border: t.bd,
      borderRadius: 'var(--radius-card)',
      overflow: 'hidden',
      textDecoration: 'none',
      color: t.fg,
      transition: 'border-color var(--dur-fast) var(--ease-out)',
      borderColor: h && href && tone === 'outline' ? 'var(--border-strong)' : undefined,
      ...style
    }
  }, image && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: imageShape === 'circle' ? '24px 24px 0' : 0
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: "",
    style: {
      width: imageShape === 'circle' ? 120 : '100%',
      height: imageShape === 'circle' ? 120 : 220,
      objectFit: 'cover',
      borderRadius: imageShape === 'circle' ? '50%' : 0,
      display: 'block',
      transform: h && href ? 'scale(1.02)' : 'none',
      transition: 'transform var(--dur-slow) var(--ease-out)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      flex: 1
    }
  }, eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-label)',
      letterSpacing: 'var(--ls-label)',
      textTransform: 'uppercase',
      fontWeight: 600,
      color: tone === 'field' ? 'var(--text-on-field-muted)' : 'var(--text-brand)'
    }
  }, eyebrow), title && /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 22,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
      margin: 0,
      color: 'inherit',
      textDecoration: h && href ? 'underline' : 'none',
      textUnderlineOffset: '0.15em',
      textDecorationThickness: 2
    }
  }, title), children && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      lineHeight: 1.5,
      color: tone === 'field' ? 'var(--text-on-field-muted)' : tone === 'pale' ? 'var(--am-green-800)' : 'var(--text-secondary)'
    }
  }, children), meta && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      paddingTop: 12,
      fontSize: 13,
      color: tone === 'field' ? 'var(--text-on-field-muted)' : 'var(--text-tertiary)'
    }
  }, meta)));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Stat.jsx
try { (() => {
function Stat({
  value,
  unit,
  label,
  tone = 'ink',
  size = 'lg',
  style
}) {
  const c = {
    ink: 'var(--text-primary)',
    brand: 'var(--text-brand)',
    accent: 'var(--color-accent)',
    inverse: 'var(--text-on-field)'
  }[tone];
  const lc = tone === 'inverse' ? 'var(--text-on-field-muted)' : 'var(--text-secondary)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: size === 'lg' ? 'var(--text-stat)' : 'var(--text-stat-sm)',
      lineHeight: 1,
      letterSpacing: 'var(--ls-stat)',
      color: c,
      fontFeatureSettings: '"tnum"'
    }
  }, value, unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 500,
      fontSize: '0.4em',
      marginLeft: '0.12em',
      color: tone === 'inverse' ? 'var(--text-on-field-muted)' : 'var(--text-tertiary)'
    }
  }, unit)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      lineHeight: 1.4,
      color: lc,
      maxWidth: '22ch'
    }
  }, label));
}
Object.assign(__ds_scope, { Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Stat.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function Tag({
  children,
  tone = 'neutral',
  selected,
  onClick,
  style
}) {
  const tones = {
    neutral: {
      bg: 'var(--bg-surface-muted)',
      fg: 'var(--text-secondary)',
      bd: 'transparent'
    },
    brand: {
      bg: 'var(--color-primary-soft)',
      fg: 'var(--am-green-900)',
      bd: 'transparent'
    },
    outline: {
      bg: 'transparent',
      fg: 'var(--text-primary)',
      bd: 'var(--border-strong)'
    },
    accent: {
      bg: 'var(--color-accent-soft)',
      fg: 'var(--am-purple-700)',
      bd: 'transparent'
    }
  };
  const t = selected ? {
    bg: 'var(--color-primary)',
    fg: 'var(--text-on-field)',
    bd: 'var(--color-primary)'
  } : tones[tone] || tones.neutral;
  const Cmp = onClick ? 'button' : 'span';
  return /*#__PURE__*/React.createElement(Cmp, {
    onClick: onClick,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      height: 32,
      padding: '0 14px',
      borderRadius: 'var(--radius-tag)',
      background: t.bg,
      color: t.fg,
      border: '1px solid ' + t.bd,
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      fontWeight: 500,
      lineHeight: 1,
      cursor: onClick ? 'pointer' : 'default',
      whiteSpace: 'nowrap',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Accordion.jsx
try { (() => {
function Accordion({
  items = [],
  allowMultiple = false,
  defaultOpen = [],
  style
}) {
  const [open, setOpen] = React.useState(new Set(defaultOpen));
  const toggle = id => setOpen(prev => {
    const n = new Set(allowMultiple ? prev : []);
    if (prev.has(id)) n.delete(id);else n.add(id);
    return n;
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--border-default)',
      fontFamily: 'var(--font-body)',
      ...style
    }
  }, items.map(it => {
    const on = open.has(it.id);
    return /*#__PURE__*/React.createElement("div", {
      key: it.id,
      style: {
        borderBottom: '1px solid var(--border-default)'
      }
    }, /*#__PURE__*/React.createElement("button", {
      "aria-expanded": on,
      onClick: () => toggle(it.id),
      style: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 16,
        padding: '20px 0',
        background: 'none',
        border: 0,
        cursor: 'pointer',
        textAlign: 'left',
        color: 'var(--text-primary)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        fontSize: 20,
        lineHeight: 1.25,
        letterSpacing: '-0.01em'
      }
    }, it.title), /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        flex: 'none',
        width: 32,
        height: 32,
        borderRadius: '50%',
        border: '2px solid var(--color-primary)',
        color: 'var(--color-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform var(--dur-base) var(--ease-out),background var(--dur-fast)',
        transform: on ? 'rotate(45deg)' : 'none',
        background: on ? 'var(--color-primary)' : 'transparent'
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: on ? '#fff' : 'currentColor',
      strokeWidth: "3",
      strokeLinecap: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 5v14M5 12h14"
    })))), on && /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '0 0 22px',
        fontSize: 16,
        lineHeight: 1.55,
        color: 'var(--text-secondary)',
        maxWidth: '64ch'
      }
    }, it.content));
  }));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Alert.jsx
try { (() => {
const I = {
  info: 'i',
  success: '✓',
  warning: '!',
  error: '!'
};
function Alert({
  status = 'info',
  title,
  children,
  onDismiss,
  action,
  style
}) {
  const fg = 'var(--am-' + status + ')',
    bg = 'var(--am-' + status + '-bg)';
  return /*#__PURE__*/React.createElement("div", {
    role: status === 'error' ? 'alert' : 'status',
    style: {
      display: 'flex',
      gap: 14,
      padding: '16px 18px',
      borderRadius: 'var(--radius-md)',
      background: bg,
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-body)',
      alignItems: 'flex-start',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      flex: 'none',
      width: 24,
      height: 24,
      borderRadius: '50%',
      background: fg,
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 700,
      fontSize: 14,
      marginTop: 1
    }
  }, I[status]), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      fontSize: 15,
      lineHeight: 1.5
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      color: fg,
      marginBottom: children ? 2 : 0
    }
  }, title), children && /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-secondary)'
    }
  }, children), action && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, action)), onDismiss && /*#__PURE__*/React.createElement("button", {
    onClick: onDismiss,
    "aria-label": "Bez\xE1r\xE1s",
    style: {
      background: 'none',
      border: 0,
      cursor: 'pointer',
      color: 'var(--text-tertiary)',
      fontSize: 20,
      lineHeight: 1,
      padding: 0
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Alert });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Alert.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function Dialog({
  open,
  onClose,
  title,
  children,
  primary,
  secondary,
  size = 'md',
  inline
}) {
  if (!open) return null;
  const w = {
    sm: 420,
    md: 560,
    lg: 760
  }[size];
  const panel = /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    "aria-label": title,
    style: {
      width: 'min(100% - 32px,' + w + 'px)',
      background: 'var(--bg-surface)',
      borderRadius: 'var(--radius-dialog)',
      boxShadow: 'var(--shadow-float)',
      padding: 32,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      fontFamily: 'var(--font-body)',
      color: 'var(--text-primary)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 28,
      lineHeight: 1.1,
      letterSpacing: '-0.015em',
      margin: 0
    }
  }, title), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Bez\xE1r\xE1s",
    style: {
      background: 'var(--bg-surface-muted)',
      border: 0,
      width: 36,
      height: 36,
      borderRadius: '50%',
      cursor: 'pointer',
      fontSize: 20,
      color: 'var(--text-secondary)',
      flex: 'none'
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      lineHeight: 1.55,
      color: 'var(--text-secondary)'
    }
  }, children), (primary || secondary) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      justifyContent: 'flex-end',
      marginTop: 8
    }
  }, secondary && /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "ghost",
    onClick: secondary.onClick
  }, secondary.label), primary && /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: primary.variant || 'primary',
    onClick: primary.onClick
  }, primary.label)));
  if (inline) return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      padding: 24,
      background: 'rgba(23,28,18,0.5)',
      borderRadius: 12
    }
  }, panel);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(23,28,18,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation()
  }, panel));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/forms/AmountPicker.jsx
try { (() => {
function AmountPicker({
  amounts = [3000, 5000, 10000, 20000],
  value,
  onChange,
  currency = 'Ft',
  allowCustom = true,
  tone = 'brand'
}) {
  const [custom, setCustom] = React.useState('');
  const fmt = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const active = tone === 'accent' ? 'var(--color-accent)' : 'var(--color-primary)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "radiogroup",
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(' + amounts.length + ',1fr)',
      gap: 8
    }
  }, amounts.map(a => {
    const on = value === a;
    return /*#__PURE__*/React.createElement("button", {
      key: a,
      type: "button",
      role: "radio",
      "aria-checked": on,
      onClick: () => {
        setCustom('');
        onChange && onChange(a);
      },
      style: {
        height: 52,
        borderRadius: 'var(--radius-input)',
        border: '2px solid ' + (on ? active : 'var(--border-strong)'),
        background: on ? active : 'var(--bg-surface)',
        color: on ? '#fff' : 'var(--text-primary)',
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        fontSize: 18,
        letterSpacing: '-0.01em',
        cursor: 'pointer',
        fontFeatureSettings: '"tnum"'
      }
    }, fmt(a), " ", /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 13,
        fontWeight: 500,
        opacity: .8
      }
    }, currency));
  })), allowCustom && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height: 52,
      padding: '0 16px',
      borderRadius: 'var(--radius-input)',
      border: '2px solid ' + (custom ? active : 'var(--border-strong)'),
      background: 'var(--bg-surface)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      color: 'var(--text-tertiary)'
    }
  }, "M\xE1s \xF6sszeg"), /*#__PURE__*/React.createElement("input", {
    inputMode: "numeric",
    value: custom,
    onChange: e => {
      const v = e.target.value.replace(/\D/g, '');
      setCustom(v);
      onChange && onChange(v ? Number(v) : undefined);
    },
    style: {
      flex: 1,
      border: 0,
      outline: 0,
      textAlign: 'right',
      font: 'inherit',
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 18,
      background: 'transparent',
      color: 'var(--text-primary)',
      minWidth: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--text-tertiary)'
    }
  }, currency)));
}
Object.assign(__ds_scope, { AmountPicker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/AmountPicker.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function Checkbox({
  checked,
  defaultChecked,
  onChange,
  label,
  description,
  disabled,
  invalid,
  name,
  value
}) {
  const [c, setC] = React.useState(!!defaultChecked);
  const isC = checked !== undefined ? checked : c;
  const toggle = e => {
    if (disabled) return;
    if (checked === undefined) setC(e.target.checked);
    onChange && onChange(e);
  };
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      fontFamily: 'var(--font-body)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      flex: 'none',
      width: 22,
      height: 22,
      marginTop: 1
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    name: name,
    value: value,
    checked: isC,
    onChange: toggle,
    disabled: disabled,
    style: {
      position: 'absolute',
      inset: 0,
      opacity: 0,
      margin: 0,
      cursor: 'inherit'
    }
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 6,
      border: '2px solid ' + (invalid ? 'var(--am-error)' : isC ? 'var(--color-primary)' : 'var(--border-strong)'),
      background: isC ? 'var(--color-primary)' : 'var(--bg-surface)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background var(--dur-fast) var(--ease-out)'
    }
  }, isC && /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6 9 17l-5-5"
  })))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      lineHeight: 1.5,
      color: 'var(--text-primary)'
    }
  }, label, description && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 13,
      color: 'var(--text-tertiary)'
    }
  }, description)));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
function Field({
  label,
  hint,
  error,
  required,
  htmlFor,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: htmlFor,
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      fontWeight: 600,
      color: 'var(--text-primary)'
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      color: 'var(--am-error)',
      marginLeft: 4
    }
  }, "*")), children, error ? /*#__PURE__*/React.createElement("div", {
    role: "alert",
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center',
      fontSize: 13,
      color: 'var(--am-error)',
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 14,
      height: 14,
      borderRadius: '50%',
      border: '2px solid currentColor',
      display: 'inline-block',
      flex: 'none'
    }
  }), error) : hint ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-tertiary)'
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const ctlBase = (focus, invalid, disabled) => ({
  fontFamily: 'var(--font-body)',
  fontSize: 16,
  height: 'var(--control-md)',
  padding: '0 14px',
  borderRadius: 'var(--radius-input)',
  border: '2px solid ' + (invalid ? 'var(--am-error)' : focus ? 'var(--border-focus)' : 'var(--border-strong)'),
  background: disabled ? 'var(--bg-surface-muted)' : 'var(--bg-surface)',
  color: 'var(--text-primary)',
  outline: 'none',
  boxShadow: focus ? 'var(--focus-ring)' : 'none',
  width: '100%',
  boxSizing: 'border-box',
  transition: 'border-color var(--dur-fast) var(--ease-out),box-shadow var(--dur-fast) var(--ease-out)'
});
function Input({
  invalid,
  disabled,
  multiline,
  rows = 4,
  prefix,
  suffix,
  style,
  ...rest
}) {
  const [f, setF] = React.useState(false);
  const s = ctlBase(f, invalid, disabled);
  if (multiline) return /*#__PURE__*/React.createElement("textarea", _extends({
    rows: rows,
    disabled: disabled,
    onFocus: () => setF(true),
    onBlur: () => setF(false),
    style: {
      ...s,
      height: 'auto',
      padding: '12px 14px',
      resize: 'vertical',
      lineHeight: 1.5,
      ...style
    }
  }, rest));
  if (prefix || suffix) return /*#__PURE__*/React.createElement("div", {
    style: {
      ...s,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '0 14px',
      ...style
    }
  }, prefix && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-tertiary)',
      fontWeight: 500
    }
  }, prefix), /*#__PURE__*/React.createElement("input", _extends({
    disabled: disabled,
    onFocus: () => setF(true),
    onBlur: () => setF(false),
    style: {
      border: 0,
      outline: 0,
      background: 'transparent',
      font: 'inherit',
      flex: 1,
      minWidth: 0,
      color: 'inherit',
      padding: 0
    }
  }, rest)), suffix && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-tertiary)',
      fontWeight: 500
    }
  }, suffix));
  return /*#__PURE__*/React.createElement("input", _extends({
    disabled: disabled,
    onFocus: () => setF(true),
    onBlur: () => setF(false),
    style: {
      ...s,
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function Radio({
  name,
  value,
  checked,
  onChange,
  label,
  description,
  disabled
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      fontFamily: 'var(--font-body)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      flex: 'none',
      width: 22,
      height: 22,
      marginTop: 1
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: name,
    value: value,
    checked: checked,
    onChange: onChange,
    disabled: disabled,
    style: {
      position: 'absolute',
      inset: 0,
      opacity: 0,
      margin: 0,
      cursor: 'inherit'
    }
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: '50%',
      border: '2px solid ' + (checked ? 'var(--color-primary)' : 'var(--border-strong)'),
      background: 'var(--bg-surface)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, checked && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: 'var(--color-primary)'
    }
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      lineHeight: 1.5,
      color: 'var(--text-primary)'
    }
  }, label, description && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 13,
      color: 'var(--text-tertiary)'
    }
  }, description)));
}
function RadioGroup({
  name,
  options,
  value,
  onChange,
  direction = 'column'
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "radiogroup",
    style: {
      display: 'flex',
      flexDirection: direction,
      gap: direction === 'column' ? 12 : 24,
      flexWrap: 'wrap'
    }
  }, options.map(o => /*#__PURE__*/React.createElement(Radio, {
    key: o.value,
    name: name,
    value: o.value,
    label: o.label,
    description: o.description,
    disabled: o.disabled,
    checked: value === o.value,
    onChange: () => onChange && onChange(o.value)
  })));
}
Object.assign(__ds_scope, { Radio, RadioGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const ctlBase = (focus, invalid, disabled) => ({
  fontFamily: 'var(--font-body)',
  fontSize: 16,
  height: 'var(--control-md)',
  padding: '0 14px',
  borderRadius: 'var(--radius-input)',
  border: '2px solid ' + (invalid ? 'var(--am-error)' : focus ? 'var(--border-focus)' : 'var(--border-strong)'),
  background: disabled ? 'var(--bg-surface-muted)' : 'var(--bg-surface)',
  color: 'var(--text-primary)',
  outline: 'none',
  boxShadow: focus ? 'var(--focus-ring)' : 'none',
  width: '100%',
  boxSizing: 'border-box',
  transition: 'border-color var(--dur-fast) var(--ease-out),box-shadow var(--dur-fast) var(--ease-out)'
});
function Select({
  options = [],
  invalid,
  disabled,
  placeholder,
  style,
  ...rest
}) {
  const [f, setF] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    disabled: disabled,
    onFocus: () => setF(true),
    onBlur: () => setF(false),
    style: {
      ...ctlBase(f, invalid, disabled),
      appearance: 'none',
      WebkitAppearance: 'none',
      paddingRight: 40,
      cursor: disabled ? 'not-allowed' : 'pointer',
      ...style
    }
  }, rest), placeholder && /*#__PURE__*/React.createElement("option", {
    value: ""
  }, placeholder), options.map(o => typeof o === 'string' ? /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o) : /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label))), /*#__PURE__*/React.createElement("svg", {
    "aria-hidden": "true",
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      position: 'absolute',
      right: 14,
      top: '50%',
      transform: 'translateY(-50%)',
      pointerEvents: 'none',
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "m6 9 6 6 6-6"
  })));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Breadcrumbs.jsx
try { (() => {
function Breadcrumbs({
  items = [],
  style
}) {
  return /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Morzsamen\xFC",
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      ...style
    }
  }, /*#__PURE__*/React.createElement("ol", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap',
      alignItems: 'center'
    }
  }, items.map((it, i) => {
    const last = i === items.length - 1;
    return /*#__PURE__*/React.createElement("li", {
      key: i,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }
    }, last ? /*#__PURE__*/React.createElement("span", {
      "aria-current": "page",
      style: {
        color: 'var(--text-primary)',
        fontWeight: 500
      }
    }, it.label) : /*#__PURE__*/React.createElement("a", {
      href: it.href || '#',
      style: {
        color: 'var(--text-tertiary)',
        textDecoration: 'none'
      }
    }, it.label), !last && /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        width: 4,
        height: 4,
        borderRadius: '50%',
        background: 'var(--border-strong)',
        display: 'inline-block'
      }
    }));
  })));
}
Object.assign(__ds_scope, { Breadcrumbs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Breadcrumbs.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Pagination.jsx
try { (() => {
function Pagination({
  page = 1,
  pages = 1,
  onChange,
  style
}) {
  const go = p => {
    if (p < 1 || p > pages) return;
    onChange && onChange(p);
  };
  const nums = [];
  for (let i = 1; i <= pages; i++) {
    if (i === 1 || i === pages || Math.abs(i - page) <= 1) nums.push(i);else if (nums[nums.length - 1] !== '…') nums.push('…');
  }
  const btn = (content, p, on, dis) => /*#__PURE__*/React.createElement("button", {
    key: String(content) + p,
    disabled: dis,
    onClick: () => go(p),
    "aria-current": on ? 'page' : undefined,
    style: {
      minWidth: 40,
      height: 40,
      padding: '0 8px',
      borderRadius: '50%',
      border: '2px solid ' + (on ? 'var(--color-primary)' : 'transparent'),
      background: on ? 'var(--color-primary)' : 'transparent',
      color: on ? '#fff' : dis ? 'var(--border-strong)' : 'var(--text-primary)',
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      fontWeight: on ? 600 : 500,
      cursor: dis ? 'default' : 'pointer',
      fontFeatureSettings: '"tnum"'
    }
  }, content);
  return /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Lapoz\xE1s",
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center',
      ...style
    }
  }, btn('←', page - 1, false, page <= 1), nums.map((n, i) => n === '…' ? /*#__PURE__*/React.createElement("span", {
    key: 'e' + i,
    style: {
      color: 'var(--text-tertiary)',
      padding: '0 4px'
    }
  }, "\u2026") : btn(n, n, n === page, false)), btn('→', page + 1, false, page >= pages));
}
Object.assign(__ds_scope, { Pagination });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Pagination.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SiteFooter.jsx
try { (() => {
function SiteFooter({
  logoSrc,
  columns = [],
  bank,
  taxId,
  socials = [],
  note,
  style
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--bg-field-deep)',
      color: 'var(--text-on-field)',
      padding: 'var(--space-9) var(--gutter) var(--space-7)',
      fontFamily: 'var(--font-body)',
      position: 'relative',
      overflow: 'hidden',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      right: -120,
      bottom: -160,
      width: 480,
      height: 480,
      borderRadius: '50%',
      background: 'var(--am-green-800)',
      opacity: .6
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1.4fr repeat(' + Math.max(columns.length, 1) + ',1fr)',
      gap: 'var(--space-7)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, logoSrc && /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: "",
    style: {
      width: 56,
      height: 56
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 22
    }
  }, "Amigos a gyerekek\xE9rt")), note && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      lineHeight: 1.5,
      color: 'var(--text-on-field-muted)',
      maxWidth: '34ch'
    }
  }, note), bank && /*#__PURE__*/React.createElement("dl", {
    style: {
      margin: 0,
      fontSize: 14,
      lineHeight: 1.6,
      color: 'var(--text-on-field-muted)',
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      columnGap: 12
    }
  }, /*#__PURE__*/React.createElement("dt", {
    style: {
      color: '#fff',
      fontWeight: 600
    }
  }, "Banksz\xE1mla"), /*#__PURE__*/React.createElement("dd", {
    style: {
      margin: 0,
      fontFeatureSettings: '"tnum"'
    }
  }, bank), taxId && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("dt", {
    style: {
      color: '#fff',
      fontWeight: 600
    }
  }, "Ad\xF3sz\xE1m"), /*#__PURE__*/React.createElement("dd", {
    style: {
      margin: 0
    }
  }, taxId)))), columns.map(col => /*#__PURE__*/React.createElement("div", {
    key: col.title
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-label)',
      letterSpacing: 'var(--ls-label)',
      textTransform: 'uppercase',
      fontWeight: 600,
      color: 'var(--text-on-field-muted)',
      marginBottom: 16
    }
  }, col.title), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, col.links.map(l => /*#__PURE__*/React.createElement("li", {
    key: l.label
  }, /*#__PURE__*/React.createElement("a", {
    href: l.href || '#',
    style: {
      color: '#fff',
      textDecoration: 'none',
      fontSize: 15
    }
  }, l.label))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 'var(--container-max)',
      margin: 'var(--space-8) auto 0',
      paddingTop: 24,
      borderTop: '1px solid rgba(255,255,255,0.18)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 16,
      flexWrap: 'wrap',
      fontSize: 13,
      color: 'var(--text-on-field-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 ", new Date().getFullYear(), " Amigos a gyerekek\xE9rt Alap\xEDtv\xE1ny"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 18
    }
  }, socials.map(s => /*#__PURE__*/React.createElement("a", {
    key: s.label,
    href: s.href || '#',
    style: {
      color: '#fff',
      textDecoration: 'none',
      fontWeight: 500
    }
  }, s.label)))));
}
Object.assign(__ds_scope, { SiteFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SiteFooter.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SiteHeader.jsx
try { (() => {
function SiteHeader({
  logoSrc,
  items = [],
  active,
  onNavigate,
  cta = {
    label: 'Adományozok',
    href: '#'
  },
  secondaryCta,
  tone = 'light',
  style
}) {
  const dark = tone === 'field';
  const fg = dark ? 'var(--text-on-field)' : 'var(--text-primary)';
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 32,
      height: 80,
      padding: '0 var(--gutter)',
      background: dark ? 'var(--bg-field)' : 'var(--bg-page)',
      borderBottom: dark ? 'none' : '1px solid var(--border-default)',
      fontFamily: 'var(--font-body)',
      position: 'relative',
      zIndex: 2,
      ...style
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate && onNavigate('home');
    },
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      textDecoration: 'none',
      color: fg
    }
  }, logoSrc ? /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: "Amigos",
    style: {
      width: 44,
      height: 44
    }
  }) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 20,
      letterSpacing: '-0.01em'
    }
  }, "Amigos")), /*#__PURE__*/React.createElement("nav", {
    "aria-label": "F\u0151 navig\xE1ci\xF3",
    style: {
      display: 'flex',
      gap: 28,
      marginLeft: 'auto'
    }
  }, items.map(it => {
    const on = active === it.id;
    return /*#__PURE__*/React.createElement("a", {
      key: it.id,
      href: it.href || '#',
      onClick: e => {
        if (onNavigate) {
          e.preventDefault();
          onNavigate(it.id);
        }
      },
      style: {
        fontSize: 'var(--text-nav)',
        fontWeight: 500,
        color: fg,
        textDecoration: on ? 'underline' : 'none',
        textUnderlineOffset: '0.35em',
        textDecorationThickness: 2,
        textDecorationColor: dark ? 'var(--am-green-200)' : 'var(--color-primary)',
        opacity: on ? 1 : 0.85,
        whiteSpace: 'nowrap'
      }
    }, it.label);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, secondaryCta && /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: dark ? 'inverseOutline' : 'secondary',
    size: "sm",
    href: secondaryCta.href,
    onClick: secondaryCta.onClick
  }, secondaryCta.label), cta && /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: dark ? 'inverse' : 'accent',
    size: "sm",
    href: cta.href,
    onClick: cta.onClick
  }, cta.label)));
}
Object.assign(__ds_scope, { SiteHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SiteHeader.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function Tabs({
  items = [],
  value,
  onChange,
  style
}) {
  const [v, setV] = React.useState(value ?? (items[0] && items[0].id));
  const cur = value ?? v;
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: 'flex',
      gap: 4,
      borderBottom: '1px solid var(--border-default)',
      fontFamily: 'var(--font-body)',
      overflowX: 'auto',
      overflowY: 'hidden',
      scrollbarWidth: 'none',
      ...style
    }
  }, items.map(it => {
    const on = cur === it.id;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      role: "tab",
      "aria-selected": on,
      onClick: () => {
        setV(it.id);
        onChange && onChange(it.id);
      },
      style: {
        background: 'none',
        border: 0,
        borderBottom: '2px solid ' + (on ? 'var(--color-primary)' : 'transparent'),
        marginBottom: -1,
        padding: '12px 16px',
        fontSize: 15,
        fontWeight: on ? 600 : 500,
        color: on ? 'var(--text-primary)' : 'var(--text-secondary)',
        cursor: 'pointer',
        whiteSpace: 'nowrap'
      }
    }, it.label, it.count !== undefined && /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: 8,
        fontSize: 12,
        color: 'var(--text-tertiary)',
        fontFeatureSettings: '"tnum"'
      }
    }, it.count));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/sections/ImageBlock.jsx
try { (() => {
function ImageBlock({
  src,
  alt = '',
  caption,
  shape = 'rounded',
  ratio = '4/5',
  style
}) {
  const r = {
    rounded: 'var(--radius-image)',
    circle: '50%',
    square: 0
  }[shape];
  return /*#__PURE__*/React.createElement("figure", {
    style: {
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      fontFamily: 'var(--font-body)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: shape === 'circle' ? '1' : ratio,
      overflow: 'hidden',
      borderRadius: r
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  })), caption && /*#__PURE__*/React.createElement("figcaption", {
    style: {
      fontSize: 'var(--text-caption)',
      lineHeight: 'var(--lh-caption)',
      color: 'var(--text-tertiary)'
    }
  }, caption));
}
function Quote({
  children,
  cite,
  tone = 'ink',
  style
}) {
  return /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 18,
      fontFamily: 'var(--font-body)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "am-quote",
    style: {
      fontFamily: 'var(--font-editorial)',
      fontStyle: 'italic',
      fontSize: 'var(--text-quote)',
      lineHeight: 'var(--lh-quote)',
      color: tone === 'inverse' ? '#fff' : tone === 'accent' ? 'var(--color-accent)' : 'var(--text-primary)',
      margin: 0,
      maxWidth: '26ch',
      textWrap: 'pretty'
    }
  }, "\u201E", children, "\u201D"), cite && /*#__PURE__*/React.createElement("cite", {
    style: {
      fontStyle: 'normal',
      fontSize: 15,
      color: tone === 'inverse' ? 'var(--text-on-field-muted)' : 'var(--text-tertiary)'
    }
  }, "\u2014 ", cite));
}
Object.assign(__ds_scope, { ImageBlock, Quote });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/sections/ImageBlock.jsx", error: String((e && e.message) || e) }); }

// components/sections/SectionHeader.jsx
try { (() => {
function SectionHeader({
  eyebrow,
  title,
  lead,
  action,
  level = 2,
  align = 'left',
  tone = 'ink',
  style
}) {
  const H = 'h' + level;
  const fg = tone === 'inverse' ? '#fff' : 'var(--text-primary)';
  const lc = tone === 'inverse' ? 'var(--text-on-field-muted)' : 'var(--text-secondary)';
  const ec = tone === 'inverse' ? 'var(--text-on-field-muted)' : 'var(--text-brand)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: action ? 'minmax(0,1fr) auto' : 'minmax(0,1fr)',
      gap: 24,
      alignItems: 'end',
      marginBottom: 'var(--space-7)',
      textAlign: align,
      fontFamily: 'var(--font-body)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      maxWidth: align === 'center' ? 'var(--container-narrow)' : 'none',
      margin: align === 'center' ? '0 auto' : 0
    }
  }, eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-label)',
      letterSpacing: 'var(--ls-label)',
      textTransform: 'uppercase',
      fontWeight: 600,
      color: ec
    }
  }, eyebrow), React.createElement(H, {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: level === 1 ? 'var(--text-h1)' : 'var(--text-h2)',
      lineHeight: level === 1 ? 'var(--lh-h1)' : 'var(--lh-h2)',
      letterSpacing: 'var(--ls-h2)',
      margin: 0,
      color: fg,
      maxWidth: '22ch',
      textWrap: 'pretty'
    }
  }, title), lead && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-body-lg)',
      lineHeight: 'var(--lh-body-lg)',
      color: lc,
      maxWidth: 'var(--measure-lead)',
      margin: 0
    }
  }, lead)), action && /*#__PURE__*/React.createElement("div", null, action));
}
Object.assign(__ds_scope, { SectionHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/sections/SectionHeader.jsx", error: String((e && e.message) || e) }); }

// components/sections/TypePattern.jsx
try { (() => {
function TypePattern({
  words = ['BARÁTSÁG', 'CSODÁKRA', 'KÉPES'],
  tone = 'field',
  size = 180,
  offset = -20,
  rotate = 0,
  style
}) {
  const c = {
    field: 'var(--am-green-800)',
    deep: 'var(--am-green-800)',
    pale: 'var(--am-green-300)',
    paper: 'var(--am-green-100)',
    accent: 'var(--am-purple-700)'
  }[tone] || 'var(--am-green-800)';
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      userSelect: 'none',
      transform: rotate ? 'rotate(' + rotate + 'deg)' : 'none',
      ...style
    }
  }, words.map((w, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      position: 'absolute',
      left: offset * (i % 2 ? 3 : 1),
      top: i * size * 0.78 - size * 0.12,
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: size,
      lineHeight: 0.8,
      letterSpacing: '-0.04em',
      whiteSpace: 'nowrap',
      color: c
    }
  }, w)));
}
function CircleMotif({
  size = 480,
  tone = 'field',
  x = 'auto',
  y = 'auto',
  right,
  bottom,
  ring = false,
  style
}) {
  const c = {
    field: 'var(--am-green-800)',
    deep: 'var(--am-green-800)',
    pale: 'var(--am-green-300)',
    paper: 'var(--am-green-100)',
    accent: 'var(--am-purple-700)',
    white: 'rgba(255,255,255,0.14)'
  }[tone] || 'var(--am-green-800)';
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left: x,
      top: y,
      right,
      bottom,
      width: size,
      height: size,
      borderRadius: '50%',
      background: ring ? 'transparent' : c,
      border: ring ? '2px solid ' + c : 'none',
      pointerEvents: 'none',
      ...style
    }
  });
}
Object.assign(__ds_scope, { TypePattern, CircleMotif });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/sections/TypePattern.jsx", error: String((e && e.message) || e) }); }

// components/sections/CtaBand.jsx
try { (() => {
function CtaBand({
  title,
  lead,
  actions,
  tone = 'field',
  pattern = 'type',
  patternWords = ['EGYÜTT', 'A GYEREKEKÉRT'],
  style
}) {
  const tones = {
    field: {
      bg: 'var(--bg-field)',
      fg: '#fff',
      lead: 'var(--text-on-field-muted)',
      p: 'field'
    },
    deep: {
      bg: 'var(--bg-field-deep)',
      fg: '#fff',
      lead: 'var(--text-on-field-muted)',
      p: 'field'
    },
    pale: {
      bg: 'var(--bg-field-pale)',
      fg: 'var(--text-on-pale)',
      lead: 'var(--am-green-800)',
      p: 'pale'
    },
    accent: {
      bg: 'var(--bg-field-accent)',
      fg: '#fff',
      lead: 'var(--am-purple-100)',
      p: 'accent'
    }
  };
  const t = tones[tone] || tones.field;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      background: t.bg,
      color: t.fg,
      padding: 'var(--section-y-tight) var(--gutter)',
      fontFamily: 'var(--font-body)',
      ...style
    }
  }, pattern === 'type' && /*#__PURE__*/React.createElement(__ds_scope.TypePattern, {
    words: patternWords,
    tone: t.p,
    size: 200,
    offset: -30
  }), pattern === 'circle' && /*#__PURE__*/React.createElement(__ds_scope.CircleMotif, {
    size: 560,
    right: -200,
    bottom: -300,
    tone: t.p
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) auto',
      gap: 'var(--space-7)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      maxWidth: '26ch'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 'var(--text-h2)',
      lineHeight: 'var(--lh-h2)',
      letterSpacing: 'var(--ls-h2)',
      margin: 0,
      color: 'inherit'
    }
  }, title), lead && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-body-lg)',
      lineHeight: 1.45,
      color: t.lead,
      margin: 0
    }
  }, lead)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap',
      alignItems: 'center'
    }
  }, actions)));
}
Object.assign(__ds_scope, { CtaBand });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/sections/CtaBand.jsx", error: String((e && e.message) || e) }); }

// components/sections/Hero.jsx
try { (() => {
function Hero({
  eyebrow,
  title,
  lead,
  actions,
  image,
  imageAlt = '',
  tone = 'paper',
  pattern = 'circle',
  patternWords,
  align = 'split',
  children,
  style
}) {
  const tones = {
    paper: {
      bg: 'var(--bg-page)',
      fg: 'var(--text-primary)',
      lead: 'var(--text-secondary)',
      eye: 'var(--text-brand)'
    },
    field: {
      bg: 'var(--bg-field)',
      fg: '#fff',
      lead: 'var(--text-on-field-muted)',
      eye: 'var(--text-on-field-muted)'
    },
    deep: {
      bg: 'var(--bg-field-deep)',
      fg: '#fff',
      lead: 'var(--text-on-field-muted)',
      eye: 'var(--text-on-field-muted)'
    },
    pale: {
      bg: 'var(--bg-field-pale)',
      fg: 'var(--text-on-pale)',
      lead: 'var(--am-green-800)',
      eye: 'var(--am-green-800)'
    },
    accent: {
      bg: 'var(--bg-field-accent)',
      fg: '#fff',
      lead: 'var(--am-purple-100)',
      eye: 'var(--am-purple-100)'
    }
  };
  const t = tones[tone] || tones.paper;
  const ptone = tone === 'paper' ? 'paper' : tone === 'pale' ? 'pale' : tone === 'accent' ? 'accent' : 'field';
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      background: t.bg,
      color: t.fg,
      padding: 'var(--section-y) var(--gutter)',
      fontFamily: 'var(--font-body)',
      ...style
    }
  }, pattern === 'type' && /*#__PURE__*/React.createElement(__ds_scope.TypePattern, {
    words: patternWords,
    tone: ptone,
    size: 220
  }), pattern === 'circle' && /*#__PURE__*/React.createElement(__ds_scope.CircleMotif, {
    size: 720,
    right: align === 'split' && image ? '38%' : -260,
    bottom: -420,
    tone: ptone
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: align === 'split' && image ? 'minmax(0,7fr) minmax(0,5fr)' : 'minmax(0,1fr)',
      gap: 'var(--space-8)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      maxWidth: align === 'split' ? 'none' : 'var(--container-narrow)'
    }
  }, eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-label)',
      letterSpacing: 'var(--ls-label)',
      textTransform: 'uppercase',
      fontWeight: 600,
      color: t.eye
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 'var(--text-hero)',
      lineHeight: 'var(--lh-hero)',
      letterSpacing: 'var(--ls-hero)',
      margin: 0,
      color: 'inherit',
      maxWidth: '14ch',
      textWrap: 'pretty'
    }
  }, title), lead && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-body-lg)',
      lineHeight: 'var(--lh-body-lg)',
      color: t.lead,
      maxWidth: 'var(--measure-lead)',
      margin: 0
    }
  }, lead), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap',
      marginTop: 8
    }
  }, actions), children), image && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: '1',
      maxWidth: 520,
      justifySelf: 'end',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: imageAlt,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '50%',
      display: 'block'
    }
  }))));
}
Object.assign(__ds_scope, { Hero });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/sections/Hero.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.Alert = __ds_scope.Alert;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.AmountPicker = __ds_scope.AmountPicker;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.RadioGroup = __ds_scope.RadioGroup;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Breadcrumbs = __ds_scope.Breadcrumbs;

__ds_ns.Pagination = __ds_scope.Pagination;

__ds_ns.SiteFooter = __ds_scope.SiteFooter;

__ds_ns.SiteHeader = __ds_scope.SiteHeader;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.CtaBand = __ds_scope.CtaBand;

__ds_ns.Hero = __ds_scope.Hero;

__ds_ns.ImageBlock = __ds_scope.ImageBlock;

__ds_ns.Quote = __ds_scope.Quote;

__ds_ns.SectionHeader = __ds_scope.SectionHeader;

__ds_ns.TypePattern = __ds_scope.TypePattern;

__ds_ns.CircleMotif = __ds_scope.CircleMotif;

})();
