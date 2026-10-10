"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { createPortal } from "react-dom";

// CLAB palette, from the brand and premium colours
export const C = {
  purple: "#8F49CD",
  deep: "#63328D",
  ink: "#3D1A6E",
  light: "#F0E5FA",
  lilac: "#E7DAFF",
  nav: "#EDE5FA",
  navy: "#003466",
  text: "#24212B",
  mute: "#6F6A78",
  line: "#E6E1EE",
};

const paths: Record<string, ReactNode> = {
  home: <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1Z" />,
  event: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  create: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M12 8.5v7M8.5 12h7" />
    </>
  ),
  workspace: (
    <>
      <path d="M13.5 4.5H6a2 2 0 0 0-2 2V18a2 2 0 0 0 2 2h11.5a2 2 0 0 0 2-2v-7.5" />
      <path d="M17.6 3.4a1.9 1.9 0 0 1 2.7 2.7L12.5 14l-3.5.9.9-3.5Z" />
    </>
  ),
  account: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </>
  ),
  activity: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </>
  ),
  message: <path d="M4 5.5h16v10.5H10l-4.5 3.5V16H4Z" />,
  back: <path d="M15 5 8 12l7 7" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  check: <path d="M5 12.5 10 17.5 19 7" />,
  bookmark: <path d="M6.5 4h11v16.5L12 16.5l-5.5 4Z" />,
  clab: (
    <>
      <path d="M2.5 11 6 7.5l4 1.5 2.5-1.5L17 9l4.5 3" />
      <path d="M7.5 13.5 10 16a1.4 1.4 0 0 0 2-2M10 11.5l3.5 3.5a1.4 1.4 0 0 0 2-2l-3-3M13 16.5l1 1a1.4 1.4 0 0 0 2-2" />
    </>
  ),
  edit: (
    <>
      <path d="M15.5 5.5 18.5 8.5 9 18H6v-3Z" />
      <path d="M13.5 7.5l3 3" />
    </>
  ),
  trash: <path d="M5 7h14M10 7V5h4v2M7 7l1 13h8l1-13" />,
  bell: <path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.5h-15ZM10 20.5a2 2 0 0 0 4 0" />,
  play: <path d="M8 5.5v13l10.5-6.5Z" />,
  file: (
    <>
      <path d="M7 3.5h7l4 4V20a.5.5 0 0 1-.5.5h-10A.5.5 0 0 1 7 20Z" />
      <path d="M14 3.5V8h4M12 11.5v6M9 14.5h6" />
    </>
  ),
  tracker: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  mood: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
      <path d="m3.5 16 5-5 4 4 3-3 5 5" />
      <circle cx="15.5" cy="8.5" r="1.5" />
    </>
  ),
  docs: <path d="M4 6.5a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />,
  meetings: (
    <>
      <rect x="3" y="6.5" width="12.5" height="11" rx="2.5" />
      <path d="m15.5 10.5 5.5-3v9l-5.5-3" />
    </>
  ),
  reports: <path d="M5 20V10M10 20V4M15 20v-7M20 20V8" />,
  lock: (
    <>
      <rect x="5" y="10.5" width="14" height="10" rx="2" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  users: (
    <>
      <circle cx="9" cy="8.5" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 5.5a3.5 3.5 0 0 1 0 6.5M18 14.5a6 6 0 0 1 3.5 5.5" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  star: <path d="m12 4 2.5 5.2 5.7.8-4.1 4 1 5.7L12 17l-5.1 2.7 1-5.7-4.1-4 5.7-.8Z" />,
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.5v3M12 18.5v3M21.5 12h-3M5.5 12h-3M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1M18.7 18.7l-2.1-2.1M7.4 7.4 5.3 5.3" />
    </>
  ),
  send: <path d="M4 12 20 4l-6 16-2.5-6.5Z" />,
  reset: <path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3M4.5 4.5v4h4" />,
  upload: <path d="M12 16V5M7.5 9.5 12 5l4.5 4.5M5 19.5h14" />,
  resume: (
    <>
      <rect x="5" y="3.5" width="14" height="17" rx="2" />
      <path d="M8.5 8h7M8.5 12h7M8.5 16h4" />
    </>
  ),
  course: (
    <>
      <path d="M2.5 9 12 4.5 21.5 9 12 13.5Z" />
      <path d="M6.5 11v4.5c1.4 1.4 3.3 2 5.5 2s4.1-.6 5.5-2V11" />
    </>
  ),
  folder: <path d="M4 6.5a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />,
  sparkle: <path d="M12 3.5 13.8 10l6.7 2-6.7 2L12 20.5 10.2 14l-6.7-2 6.7-2Z" />,
};

export function Icon({ name, className = "h-5 w-5", fill = false }: { name: keyof typeof paths | string; className?: string; fill?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill={fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth={fill ? 0 : 1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {paths[name]}
    </svg>
  );
}

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "navy" | "soft" | "ghost" | "danger"; size?: "sm" | "md" | "lg"; loading?: boolean };
export function Btn({ variant = "primary", size = "md", loading, className = "", children, disabled, ...rest }: BtnProps) {
  const v = {
    primary: "bg-[#8F49CD] text-white hover:bg-[#7E3CBB] active:bg-[#6E33A7]",
    navy: "bg-[#003466] text-white hover:bg-[#002B55] active:bg-[#00223f]",
    soft: "bg-[#F0E5FA] text-[#63328D] hover:bg-[#E7DAFF] active:bg-[#DCCBFA]",
    ghost: "bg-white text-[#3D1A6E] ring-1 ring-[#E6E1EE] hover:ring-[#8F49CD]/50 active:bg-[#F7F3FC]",
    danger: "bg-[#C2362F] text-white hover:bg-[#AD2E28]",
  }[variant];
  const s = { sm: "h-8 px-3 text-[12px] rounded-lg", md: "h-10 px-4 text-[13px] rounded-xl", lg: "h-12 px-5 text-[14px] rounded-xl" }[size];
  return (
    <button
      type="button"
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 font-semibold transition-[background,box-shadow,transform,opacity] duration-150 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${v} ${s} ${className}`}
      {...rest}
    >
      {loading && <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-r-transparent" aria-hidden />}
      {children}
    </button>
  );
}

export function IconBtn({ icon, label, onClick, className = "", badge }: { icon: string; label: string; onClick: () => void; className?: string; badge?: number }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`relative grid h-10 w-10 place-items-center rounded-full text-[#3D1A6E] transition-colors hover:bg-[#F0E5FA] active:bg-[#E7DAFF] ${className}`}
    >
      <Icon name={icon} />
      {!!badge && (
        <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-[#8F49CD] px-1 text-[9px] font-bold text-white">{badge}</span>
      )}
    </button>
  );
}

/** The screen header: CLAB wordmark, optional back and title row. */
export function Header({ title, onBack, right }: { title?: string; onBack?: () => void; right?: ReactNode }) {
  return (
    <div className="sticky top-0 z-20 border-b border-[#EFEAF5] bg-white/95 backdrop-blur">
      <p className="pt-3 text-center text-[20px] font-semibold tracking-wide text-[#8F49CD]">CLAB</p>
      {(title || onBack) && (
        <div className="flex h-12 items-center gap-1 px-2">
          {onBack ? <IconBtn icon="back" label="Back" onClick={onBack} /> : <span className="w-2" />}
          <h2 className="flex-1 truncate text-[18px] font-semibold text-[#3D1A6E]">{title}</h2>
          {right}
        </div>
      )}
      {!title && !onBack && <div className="h-2" />}
    </div>
  );
}

export function Field({
  label,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: (id: string, describedBy?: string) => ReactNode;
}) {
  const id = useId();
  const msg = error ? `${id}-err` : hint ? `${id}-hint` : undefined;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[12px] font-medium text-[#3D1A6E]">
        {label}
        {required && <span className="text-[#8F49CD]">*</span>}
      </label>
      {children(id, msg)}
      {error ? (
        <p id={msg} className="mt-1 text-[11px] text-[#C2362F]">
          {error}
        </p>
      ) : hint ? (
        <p id={msg} className="mt-1 text-[11px] text-[#6F6A78]">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
export const inputCls = (err?: string) =>
  `w-full rounded-xl border bg-white px-3.5 py-2.5 text-[13px] text-[#24212B] outline-none transition-[border,box-shadow] placeholder:text-[#A39DAE] focus:border-[#8F49CD] focus:ring-4 focus:ring-[#8F49CD]/15 ${err ? "border-[#C2362F]" : "border-[#E2DCEB]"}`;

export function Chip({ on, children, onClick }: { on?: boolean; children: ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-colors ${on ? "bg-[#8F49CD] text-white" : "bg-[#F0E5FA] text-[#63328D] hover:bg-[#E7DAFF]"}`}
    >
      {children}
    </button>
  );
}

/** Underlined tabs, as on the home and event screens. */
export function Tabs<T extends string>({ value, onChange, items, className = "" }: { value: T; onChange: (v: T) => void; items: { key: T; label: string }[]; className?: string }) {
  return (
    <div role="tablist" className={`flex justify-around ${className}`}>
      {items.map((t) => {
        const on = t.key === value;
        return (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onChange(t.key)}
            className={`relative px-2 pb-2 pt-1 text-[13px] transition-colors ${on ? "font-semibold text-[#3D1A6E]" : "text-[#6F6A78] hover:text-[#3D1A6E]"}`}
          >
            {t.label}
            {on && <motion.span layoutId={`tab-${items.map((i) => i.key).join("")}`} className="absolute inset-x-1 -bottom-px h-[2.5px] rounded-full bg-[#3D1A6E]" />}
          </button>
        );
      })}
    </div>
  );
}

/** Pill toggle (Webinar / Competition). */
export function Segmented<T extends string>({ value, onChange, items }: { value: T; onChange: (v: T) => void; items: { key: T; label: string }[] }) {
  return (
    <div className="flex justify-center gap-3">
      {items.map((t) => (
        <button
          key={t.key}
          type="button"
          aria-pressed={t.key === value}
          onClick={() => onChange(t.key)}
          className={`h-8 rounded-lg px-4 text-[12px] font-semibold transition-colors ${t.key === value ? "bg-[#3D1A6E] text-white" : "border border-[#E2DCEB] text-[#6F6A78] hover:border-[#8F49CD]/50"}`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

export function Empty({ icon, title, body, action }: { icon: string; title: string; body: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center px-8 py-12 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#F0E5FA] text-[#8F49CD]">
        <Icon name={icon} className="h-6 w-6" />
      </span>
      <p className="mt-4 text-[15px] font-semibold text-[#3D1A6E]">{title}</p>
      <p className="mt-1 text-[12.5px] leading-relaxed text-[#6F6A78]">{body}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

/** Renders overlays into the phone's overlay layer, so they cover the screen, not the scroll content. */
export function Portal({ children }: { children: ReactNode }) {
  const [el, setEl] = useState<HTMLElement | null>(null);
  useEffect(() => setEl(document.getElementById("clab-overlay")), []);
  return el ? createPortal(children, el) : null;
}

/** Bottom sheet inside the phone, closable with Esc or the backdrop. */
export function Sheet({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open, onClose]);
  return (
    <Portal>
    <AnimatePresence>
      {open && (
        <motion.div className="pointer-events-auto absolute inset-0 z-40 flex items-end" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button type="button" aria-label="Close" className="absolute inset-0 bg-[#24212B]/35" onClick={onClose} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="relative max-h-[85%] w-full overflow-y-auto rounded-t-3xl bg-white pb-6 shadow-[0_-12px_40px_rgba(61,26,110,.18)]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between bg-white px-5 pb-2 pt-3">
              <span aria-hidden className="absolute left-1/2 top-2 h-1 w-10 -translate-x-1/2 rounded-full bg-[#E2DCEB]" />
              <p className="mt-3 text-[15px] font-semibold text-[#3D1A6E]">{title}</p>
              <IconBtn icon="close" label="Close" onClick={onClose} className="mt-2" />
            </div>
            <div className="px-5">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </Portal>
  );
}

/** Confirmation dialog for destructive actions. */
export function Confirm({ open, title, body, confirm, onConfirm, onClose }: { open: boolean; title: string; body: string; confirm: string; onConfirm: () => void; onClose: () => void }) {
  return (
    <Portal>
    <AnimatePresence>
      {open && (
        <motion.div className="pointer-events-auto absolute inset-0 z-50 grid place-items-center p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button type="button" aria-label="Cancel" className="absolute inset-0 bg-[#24212B]/40" onClick={onClose} />
          <motion.div
            role="alertdialog"
            aria-modal="true"
            aria-label={title}
            className="relative w-full rounded-2xl bg-white p-5 shadow-xl"
            initial={{ scale: 0.94, y: 8 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0 }}
          >
            <p className="text-[15px] font-semibold text-[#3D1A6E]">{title}</p>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#6F6A78]">{body}</p>
            <div className="mt-5 flex justify-end gap-2">
              <Btn variant="ghost" onClick={onClose}>
                Cancel
              </Btn>
              <Btn
                variant="danger"
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
              >
                {confirm}
              </Btn>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </Portal>
  );
}

export function Avatar({ src, name, size = 44 }: { src?: string; name: string; size?: number }) {
  return src ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" width={size} height={size} className="shrink-0 rounded-full object-cover" style={{ width: size, height: size }} />
  ) : (
    <span className="grid shrink-0 place-items-center rounded-full bg-[#E7DAFF] font-semibold text-[#63328D]" style={{ width: size, height: size, fontSize: size * 0.36 }}>
      {name
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")}
    </span>
  );
}

export const card = "rounded-2xl border border-[#ECE6F3] bg-white shadow-[0_2px_10px_rgba(61,26,110,.05)]";
