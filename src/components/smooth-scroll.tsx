"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState, type ReactNode } from "react";

/**
 * Page-level Lenis smooth scroll. Skipped entirely for reduced-motion users,
 * who keep native scrolling. Nested scrollers opt out with `data-lenis-prevent`.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(!query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <>
      {enabled ? <ReactLenis root options={{ lerp: 0.1, anchors: true }} /> : null}
      {children}
    </>
  );
}
