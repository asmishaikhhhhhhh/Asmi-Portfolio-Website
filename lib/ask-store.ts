"use client";

import { useSyncExternalStore } from "react";

/**
 * Tiny global store for the Ask Asmi panel, so the nav, mobile bar, floating
 * button and in-page links can all open it (optionally with a question).
 */
type State = { open: boolean; pending?: string };
let state: State = { open: false };
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export const askStore = {
  open(question?: string) {
    state = { open: true, pending: question };
    emit();
  },
  close() {
    state = { ...state, open: false, pending: undefined };
    emit();
  },
  toggle() {
    if (state.open) askStore.close();
    else askStore.open();
  },
  consumePending() {
    const q = state.pending;
    if (q) state = { ...state, pending: undefined };
    return q;
  },
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  get: () => state,
};

const serverState: State = { open: false };
export function useAsk() {
  return useSyncExternalStore(askStore.subscribe, askStore.get, () => serverState);
}
