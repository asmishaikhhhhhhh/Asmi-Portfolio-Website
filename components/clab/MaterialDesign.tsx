"use client";

import { useState } from "react";
import { poppins } from "./font";

const ICONS = [
  ["calendar", "Calendar"],
  ["chat", "Messages"],
  ["user-settings", "Account preferences"],
  ["settings", "Settings"],
  ["upload-file", "Upload file"],
  ["notes", "Notes"],
  ["home", "Home"],
  ["add", "Create"],
  ["lock", "Security"],
  ["bookmark", "Save"],
  ["layout", "Design"],
  ["search", "Search"],
  ["list", "Explore"],
  ["widgets", "Activity"],
  ["security", "Data privacy"],
  ["text", "Text"],
  ["shapes", "Shape"],
  ["pen-nib", "Pen"],
  ["user", "Account"],
  ["admin", "Professional"],
  ["privacy", "Visibility"],
  ["cloud-upload", "Upload"],
  ["bell", "Remind me"],
  ["clab", "Clab"],
  ["edit", "Edit"],
  ["sign", "Pencil"],
  ["back", "Back"],
  ["forward", "Next"],
  ["close", "Close"],
  ["done", "Done"],
] as const;

const PURPLE = "#8F49CD";
const NAVY = "#003466";

function Demo({ children, tone, size, onPress }: { children: string; tone: "purple" | "navy"; size: "lg" | "md" | "sm"; onPress: (s: string) => void }) {
  const s = { lg: "h-10 w-full px-4 text-[13px]", md: "h-10 px-5 text-[13px]", sm: "h-8 px-3.5 text-[11.5px]" }[size];
  return (
    <button
      type="button"
      onClick={() => onPress(`${children} · ${tone === "purple" ? "primary" : "premium"} · ${size === "lg" ? "large" : size === "md" ? "medium" : "small"}`)}
      className={`${s} rounded-lg font-semibold text-white shadow-[0_2px_0_rgba(0,0,0,.12)] transition-[transform,filter,box-shadow] duration-150 hover:-translate-y-px hover:brightness-110 hover:shadow-[0_6px_14px_rgba(61,26,110,.25)] active:translate-y-0 active:scale-[0.98] active:brightness-95`}
      style={{ background: tone === "purple" ? PURPLE : NAVY }}
    >
      {children}
    </button>
  );
}

/**
 * CLAB's material design as a live component sheet: the icon set, the three
 * button sizes in their real colours and fonts, and inactive versus active.
 */
export function MaterialDesign({ heading }: { heading?: string }) {
  const [icon, setIcon] = useState(23);
  const [pressed, setPressed] = useState<string | null>(null);
  const [active, setActive] = useState(true);
  return (
    <div>
      {heading && <h3 className="mb-6 font-display-soft text-h3">{heading}</h3>}
      <div className={`${poppins.className} grid gap-4 lg:grid-cols-5`}>
        {/* Icons */}
        <section className="rounded-media border border-line bg-card p-5 md:p-7 lg:col-span-2">
          <div className="flex items-baseline justify-between gap-3">
            <p className="meta text-ink-mute">Icons · 30</p>
            <p className="text-[13px] font-semibold" style={{ color: PURPLE }} aria-live="polite">
              {ICONS[icon][1]}
            </p>
          </div>
          <ul className="mt-5 grid grid-cols-6 gap-1.5">
            {ICONS.map(([k, label], i) => (
              <li key={k}>
                <button
                  type="button"
                  aria-label={label}
                  aria-pressed={i === icon}
                  onPointerEnter={() => setIcon(i)}
                  onFocus={() => setIcon(i)}
                  onClick={() => setIcon(i)}
                  className={`grid aspect-square w-full place-items-center rounded-xl transition-[background,transform] duration-200 hover:scale-110 ${i === icon ? "bg-[#F0E5FA]" : "hover:bg-[#F7F3FC]"}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/images/projects/clab/icons/${k}.webp`} alt="" className="h-[52%] w-[52%] object-contain" />
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Buttons */}
        <section className="rounded-media border border-line bg-card p-5 md:p-7 lg:col-span-3">
          <div className="flex items-baseline justify-between gap-3">
            <p className="meta text-ink-mute">Buttons</p>
            <p className="truncate text-[12px] text-ink-mute" aria-live="polite">
              {pressed ?? "Press any button"}
            </p>
          </div>
          <div className="mt-5 grid gap-6 sm:grid-cols-[1fr_1fr_auto]">
            <div className="space-y-2.5">
              <p className="text-[12px] font-semibold text-[#3D1A6E]">Large · primary</p>
              {["Sign in", "Continue", "Next", "Agree & Join", "View Project"].map((t) => (
                <Demo key={t} tone="purple" size="lg" onPress={setPressed}>
                  {t}
                </Demo>
              ))}
            </div>
            <div className="space-y-2.5">
              <p className="text-[12px] font-semibold text-[#3D1A6E]">Large · premium</p>
              {["View", "Start Membership", "Try 1 month free", "Upgrade to CLAB Premium", "Continue with 1 month free trial"].map((t) => (
                <Demo key={t} tone="navy" size="lg" onPress={setPressed}>
                  {t}
                </Demo>
              ))}
            </div>
            <div className="space-y-2.5">
              <p className="text-[12px] font-semibold text-[#3D1A6E]">Medium</p>
              {["Join Now", "Verify Now", "Create Project"].map((t) => (
                <div key={t}>
                  <Demo tone="purple" size="md" onPress={setPressed}>
                    {t}
                  </Demo>
                </div>
              ))}
              <p className="pt-3 text-[12px] font-semibold text-[#3D1A6E]">Small</p>
              <div className="flex flex-wrap gap-2">
                {["Team Projects", "Allow"].map((t) => (
                  <Demo key={t} tone="purple" size="sm" onPress={setPressed}>
                    {t}
                  </Demo>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* States */}
        <section className="rounded-media border border-line bg-card p-5 md:p-7 lg:col-span-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="meta text-ink-mute">States</p>
              <p className="mt-1 text-[13px] text-ink-soft">A button stays inactive until the form is ready, then fills with colour.</p>
            </div>
            <div role="radiogroup" aria-label="Button state" className="flex rounded-full bg-[#F0E5FA] p-1">
              {(["Inactive", "Active"] as const).map((l) => {
                const on = (l === "Active") === active;
                return (
                  <button
                    key={l}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => setActive(l === "Active")}
                    className={`rounded-full px-4 py-1.5 text-[12.5px] font-semibold transition-colors ${on ? "bg-white text-[#3D1A6E] shadow-sm" : "text-[#63328D]"}`}
                  >
                    {l}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled={!active}
              onClick={() => setPressed("Create Project · active")}
              className="h-10 rounded-lg px-5 text-[13px] font-semibold text-white transition-[background,transform] duration-300 enabled:hover:-translate-y-px disabled:cursor-not-allowed"
              style={{ background: active ? PURPLE : "#C9A6E8" }}
            >
              Create Project
            </button>
            <button
              type="button"
              disabled={!active}
              onClick={() => setPressed("Add Project · active")}
              className="h-10 rounded-lg px-5 text-[13px] font-semibold text-white transition-[background,transform] duration-300 enabled:hover:-translate-y-px disabled:cursor-not-allowed"
              style={{ background: active ? NAVY : "#8FA3B8" }}
            >
              Add Project
            </button>
            <span className="text-[12px] text-ink-mute">{active ? "Ready: tap to continue" : "Disabled: fill in the required fields first"}</span>
          </div>
        </section>
      </div>
    </div>
  );
}
