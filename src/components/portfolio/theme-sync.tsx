"use client";

import { useLayoutEffect } from "react";
import type { ThemeId } from "@/lib/content";

/**
 * Mirrors the route's theme onto <html> so portalled UI (tooltips) and the
 * overscroll background pick up the right tokens.
 *
 * better-ui: suppress every transition for the swap so the theme snaps
 * instead of smearing color transitions across the whole page.
 */
export function ThemeSync({ theme }: { theme: ThemeId }) {
  useLayoutEffect(() => {
    const root = document.documentElement;
    if (root.dataset.theme === theme) return;

    const style = document.createElement("style");
    style.append(document.createTextNode("*,*::before,*::after{transition:none !important}"));
    document.head.append(style);

    root.dataset.theme = theme;
    void document.body.offsetHeight; // force a style flush while transitions are off

    requestAnimationFrame(() => {
      requestAnimationFrame(() => style.remove());
    });
  }, [theme]);

  return null;
}
