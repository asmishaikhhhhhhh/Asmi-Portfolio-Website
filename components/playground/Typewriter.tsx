"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

/**
 * Write a letter to someone today, on a typewriter. Type on your keyboard (or
 * tap the paper on a phone), and the keys press, the carriage returns and the
 * paper feeds up. Pick a typeface, size and ink, then download it as a PDF.
 * Styled in this site's own ink, paper and marigold.
 */

const ROWS = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

const FACES = [
  { id: "type", label: "Typewriter", css: "var(--font-typewriter), 'Courier New', monospace", pdf: ["courier", "normal"] },
  { id: "serif", label: "Serif", css: "var(--font-display), Georgia, serif", pdf: ["times", "normal"] },
  { id: "hand", label: "Handwritten", css: "var(--font-hand), cursive", pdf: ["times", "italic"], scale: 1.3 },
  { id: "sans", label: "Sans", css: "var(--font-sans), system-ui, sans-serif", pdf: ["helvetica", "normal"] },
] as const;
const SIZES = [16, 20, 24];
const SIZE_LABELS = ["A", "A+", "A++"];
const INKS = [
  { id: "ink", label: "Black ink", hex: "#1a1916" },
  { id: "forest", label: "Forest ink", hex: "#1f4d3a" },
  { id: "marigold", label: "Marigold ink", hex: "#8a5a0b" },
  { id: "blue", label: "Blue ink", hex: "#253f7d" },
];

// ── IST clock (ticks every second; empty on the server) ──
function subscribeClock(cb: () => void) {
  const t = setInterval(cb, 1000);
  return () => clearInterval(t);
}
function istParts() {
  const now = new Date();
  const f = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", ...o }).format(now);
  const date = f({ day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, ".");
  const time = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true }).format(now);
  return `${date}|${time} IST`;
}
function useIstClock() {
  const v = useSyncExternalStore(subscribeClock, istParts, () => "|");
  const [date, time] = v.split("|");
  return { date, time };
}

/** Restart a one-shot CSS animation class on an element. */
function replay(el: HTMLElement | null, cls: string) {
  if (!el) return;
  el.classList.remove(cls);
  void el.offsetWidth;
  el.classList.add(cls);
}

// ── key sound: a short, warm mechanical tick made from filtered noise ──
let audioCtx: AudioContext | null = null;
function tick() {
  try {
    audioCtx ??= new AudioContext();
    const ctx = audioCtx;
    if (ctx.state === "suspended") void ctx.resume();
    const len = Math.floor(ctx.sampleRate * 0.025);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 5);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 2200;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 900;
    bp.Q.value = 2.5;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
    src.connect(lp).connect(bp).connect(gain).connect(ctx.destination);
    src.start();
    src.stop(ctx.currentTime + 0.045);
  } catch {
    /* no audio, no problem */
  }
}

const isEditable = (el: EventTarget | null) =>
  el instanceof HTMLElement && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));

export function Typewriter() {
  const [started, setStarted] = useState(false);
  const [text, setText] = useState("");
  const [face, setFace] = useState(0);
  const [size, setSize] = useState(0);
  const [ink, setInk] = useState(0);
  const [sound, setSound] = useState(true);
  const [pressed, setPressed] = useState<Record<string, boolean>>({});
  const [warn, setWarn] = useState(false);
  const { date, time } = useIstClock();

  const sheetRef = useRef<HTMLDivElement>(null);
  const carriageRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLInputElement>(null);
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const press = useCallback(
    (id: string) => {
      setPressed((p) => ({ ...p, [id]: true }));
      clearTimeout(timers.current[id]);
      timers.current[id] = setTimeout(() => setPressed((p) => ({ ...p, [id]: false })), 170);
      replay(bodyRef.current, "tw-hit");
      if (sound) tick();
    },
    [sound],
  );

  const type = useCallback(
    (key: string) => {
      const k = key.toLowerCase();
      if (key === "Backspace") {
        press("bksp");
        setText((t) => t.slice(0, -1));
      } else if (key === "Enter") {
        press("enter");
        setText((t) => t + "\n");
        replay(carriageRef.current, "tw-cr");
      } else if (key === " ") {
        press("space");
        setText((t) => t + " ");
      } else if (key.length === 1) {
        press(/[a-z]/.test(k) ? k : k === "." || k === "," ? "period" : "other");
        setText((t) => t + key);
        setWarn(false);
      }
    },
    [press],
  );

  // Physical keyboard: only while the typewriter is out, and never while
  // another field (the chat, say) has focus.
  useEffect(() => {
    if (!started) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (isEditable(e.target) && e.target !== mobileRef.current) return;
      if (e.key === "Tab" || e.key === "Escape") return;
      if (e.key === "Backspace" || e.key === "Enter" || e.key.length === 1) {
        e.preventDefault();
        type(e.key);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [started, type]);

  // Keep the newest line in view, like paper feeding up
  useEffect(() => {
    const el = sheetRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [text, size, face]);

  // Phone keyboards: a hidden input catches composed characters
  const onMobileInput = (e: React.FormEvent<HTMLInputElement>) => {
    const v = e.currentTarget.value;
    for (const ch of v) type(ch);
    e.currentTarget.value = "";
  };
  const focusMobile = () => mobileRef.current?.focus({ preventScroll: true });

  const f = FACES[face];
  const px = Math.round(SIZES[size] * ("scale" in f ? f.scale : 1));
  const lineH = Math.round(px * (size === 0 ? 1.85 : size === 1 ? 1.75 : 1.65));

  async function download() {
    if (!text.trim()) {
      setWarn(true);
      return;
    }
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
    const W = doc.internal.pageSize.getWidth();
    const H = doc.internal.pageSize.getHeight();
    const mx = 24, my = 28, usable = W - mx * 2;
    const rule = () => {
      doc.setDrawColor(216, 209, 196);
      doc.setLineWidth(0.15);
      for (let y = my + 14; y < H - 10; y += 7.2) doc.line(mx, y, W - mx, y);
      doc.setDrawColor(227, 162, 59);
      doc.setLineWidth(0.3);
      doc.line(mx - 6, 12, mx - 6, H - 12);
    };
    rule();
    doc.setFont("courier", "normal");
    doc.setFontSize(8);
    doc.setTextColor(110, 106, 97);
    doc.text(`${date} · ${time}`, mx, my);

    const hex = INKS[ink].hex;
    doc.setTextColor(parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16));
    doc.setFont(f.pdf[0], f.pdf[1]);
    const pt = SIZES[size] * 0.75;
    doc.setFontSize(pt);
    const lh = pt * 0.3528 * 1.85;
    let y = my + 10;
    for (const para of text.split("\n")) {
      if (!para) {
        y += lh * 0.6;
        continue;
      }
      for (const line of doc.splitTextToSize(para, usable) as string[]) {
        if (y > H - my) {
          doc.addPage();
          rule();
          y = my;
        }
        doc.text(line, mx, y);
        y += lh;
      }
    }
    const stamp = date.split(".").reverse().join("-");
    doc.save(`letter-${stamp || "today"}.pdf`);
  }

  const renderKey = (id: string, label: string, wide?: string, className = "") => (
    <button
      key={id}
      type="button"
      tabIndex={-1}
      aria-label={label === "⌫" ? "Backspace" : label === "↵" ? "Return" : label}
      onPointerDown={(e) => {
        e.preventDefault();
        type(id === "bksp" ? "Backspace" : id === "enter" ? "Enter" : id === "space" ? " " : id === "period" ? "." : id);
      }}
      className={`tw-key ${pressed[id] ? "tw-key-down" : ""} ${wide ?? "w-[8.2%]"} ${className}`}
    >
      <span>{label}</span>
    </button>
  );

  if (!started)
    return (
      <div className="tw-desk relative flex min-h-[70svh] flex-col items-center justify-center overflow-hidden rounded-media border border-line px-6 py-20 text-center">
        <Clock date={date} time={time} />
        <p className="font-display-soft text-h1 leading-tight">
          Write a letter to <span className="font-display-wonk italic text-forest">someone</span> today
        </p>
        <button
          type="button"
          onClick={() => {
            setStarted(true);
            if (sound) tick();
          }}
          className="mt-10 rounded-full border-2 border-ink px-8 py-3 font-medium transition-colors hover:bg-ink hover:text-paper"
        >
          with a typewriter
        </button>
      </div>
    );

  return (
    <div className="tw-desk tw-in relative overflow-hidden rounded-media border border-line px-4 pb-10 pt-16 md:px-10">
      <Clock date={date} time={time} />

      <div className="mx-auto grid max-w-[60rem] grid-cols-[auto_1fr_auto] items-start gap-3 md:gap-8">
        {/* Typeface + size */}
        <div role="group" aria-label="Typeface and size" className="mt-24 flex flex-col gap-2.5 md:mt-40">
          {FACES.map((x, i) => (
            <button
              key={x.id}
              type="button"
              aria-pressed={face === i}
              aria-label={`${x.label} typeface`}
              onClick={() => setFace(i)}
              className={`tw-chip ${face === i ? "tw-chip-on" : ""}`}
              style={{ fontFamily: x.css, fontSize: x.id === "hand" ? 19 : 15 }}
            >
              Aa
            </button>
          ))}
          <button
            type="button"
            onClick={() => setSize((s) => (s + 1) % SIZES.length)}
            aria-label={`Text size: ${SIZE_LABELS[size]}. Change size`}
            className="tw-chip text-xs font-semibold"
          >
            {SIZE_LABELS[(size + 1) % SIZES.length]}
          </button>
        </div>

        {/* Paper + machine */}
        <div className="min-w-0">
          <div className="flex justify-center">
            <button type="button" onClick={() => setText("")} className="meta mb-2 text-ink-mute underline underline-offset-4 hover:text-ink">
              clear
            </button>
          </div>
          <div ref={carriageRef} className="relative mx-auto w-[86%]">
            <div
              ref={sheetRef}
              onClick={focusMobile}
              className="tw-sheet no-scrollbar relative h-[13.5rem] overflow-y-auto rounded-t-[4px] px-[9%] pb-6 pt-8 md:h-[15rem]"
              style={{ ["--tw-line" as string]: `${lineH}px` }}
              aria-label="Your letter"
              role="textbox"
              aria-multiline
              aria-readonly
              tabIndex={0}
            >
              <p
                className="whitespace-pre-wrap break-words"
                style={{ fontFamily: f.css, fontSize: px, lineHeight: `${lineH}px`, color: INKS[ink].hex }}
              >
                {text}
                <span className="tw-caret" style={{ height: px, background: INKS[ink].hex }} />
              </p>
            </div>
          </div>

          {/* The machine */}
          <div ref={bodyRef} className="relative mx-auto -mt-1" onClick={focusMobile}>
            {/* Platen roller */}
            <div className="relative z-10 mx-auto flex h-5 w-[78%] items-center justify-between rounded-full bg-gradient-to-b from-[#3a3832] to-[#15140f] px-1 shadow-[0_2px_0_rgba(0,0,0,.25)]">
              <span className="h-3.5 w-3.5 rounded-full bg-marigold shadow-[inset_0_-2px_0_rgba(0,0,0,.25)]" />
              <span className="h-3.5 w-3.5 rounded-full bg-marigold shadow-[inset_0_-2px_0_rgba(0,0,0,.25)]" />
            </div>
            {/* Body */}
            <div className="tw-body relative -mt-2 rounded-[2.2rem_2.2rem_1.4rem_1.4rem] px-[5%] pb-[4%] pt-6">
              {/* Ribbon spools + nameplate */}
              <div className="relative mx-auto mb-4 flex w-[62%] items-center justify-between">
                <span className="tw-spool" />
                <span className="absolute inset-x-[14%] top-1/2 h-[2px] -translate-y-1/2 rounded bg-[#8a2b20]" />
                <span className="relative rounded-full border border-marigold/50 bg-[#15140f] px-3 py-0.5 font-display-soft text-[0.7rem] tracking-[0.35em] text-marigold">
                  ASMI ✦
                </span>
                <span className="tw-spool" />
              </div>
              <div aria-hidden className="space-y-[2.2%]">
                {ROWS.map((row, ri) => (
                  <div key={row} className="flex justify-center gap-[1.4%]" style={{ paddingLeft: `${ri * 3}%` }}>
                    {row.split("").map((k) => renderKey(k, k.toUpperCase()))}
                    {ri === 1 && renderKey("enter", "↵", "w-[11%]", "tw-key-accent")}
                    {ri === 2 && (
                      <>
                        {renderKey("period", ".,")}
                        {renderKey("bksp", "⌫", "w-[11%]", "tw-key-accent")}
                      </>
                    )}
                  </div>
                ))}
                <div className="flex justify-center pt-[1%]">
                  {renderKey("space", "space", "w-[48%]", "tw-key-space")}
                </div>
              </div>
            </div>
          </div>
          <input
            ref={mobileRef}
            type="text"
            inputMode="text"
            autoCapitalize="sentences"
            aria-label="Type your letter"
            className="pointer-events-none absolute h-px w-px opacity-0"
            onInput={onMobileInput}
            onKeyDown={(e) => {
              if (e.key === "Backspace" || e.key === "Enter") {
                e.preventDefault();
                e.stopPropagation();
                type(e.key);
              }
            }}
          />
        </div>

        {/* Ink */}
        <div role="group" aria-label="Ink colour" className="mt-24 flex flex-col gap-3 md:mt-40">
          {INKS.map((x, i) => (
            <button
              key={x.id}
              type="button"
              aria-pressed={ink === i}
              aria-label={x.label}
              onClick={() => setInk(i)}
              className={`h-8 w-8 rounded-full border-2 transition-transform md:h-9 md:w-9 ${ink === i ? "scale-110 border-paper ring-2 ring-ink" : "border-paper hover:scale-105"}`}
              style={{ background: x.hex }}
            />
          ))}
        </div>
      </div>

      {/* Done */}
      <div className="mt-10 flex flex-col items-center gap-3 text-center">
        <button type="button" onClick={download} className="rounded-full bg-forest px-10 py-3.5 font-display-wonk text-xl italic text-paper shadow-float transition-transform hover:-translate-y-0.5">
          done
        </button>
        <p className={`meta ${warn ? "text-[#9b2c1f]" : "text-ink-mute"}`} aria-live="polite">
          {warn ? "Write something first." : "Click done and your letter downloads as a PDF."}
        </p>
      </div>

      <button
        type="button"
        onClick={() => {
          setSound((s) => !s);
          if (!sound) tick();
        }}
        aria-pressed={sound}
        aria-label={sound ? "Sound on, click to mute" : "Sound off, click to turn on"}
        className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-card text-lg hover:border-ink"
      >
        <span aria-hidden>{sound ? "🔊" : "🔇"}</span>
      </button>
      <button
        type="button"
        onClick={() => setStarted(false)}
        className="meta absolute bottom-6 right-5 text-ink-mute underline underline-offset-4 hover:text-ink"
      >
        back
      </button>
    </div>
  );
}

function Clock({ date, time }: { date: string; time: string }) {
  return (
    <div className="meta absolute inset-x-5 top-5 flex justify-between tabular-nums text-ink-mute md:inset-x-8">
      <span>{date}</span>
      <span>{time}</span>
    </div>
  );
}
