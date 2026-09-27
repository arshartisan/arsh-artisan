"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll container that fades its edges into the card surface, and only while
 * there is more content in that direction, so the fade doubles as a scroll hint.
 */
export function FadeScroll({ children, className, label }: { children: ReactNode; className?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ top: false, bottom: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const top = el.scrollTop > 1;
      const bottom = el.scrollTop + el.clientHeight < el.scrollHeight - 1;
      setEdges((prev) => (prev.top === top && prev.bottom === bottom ? prev : { top, bottom }));
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative min-h-0 flex-1">
      <div
        ref={ref}
        tabIndex={0}
        role="region"
        aria-label={label}
        className={cn("thin-scrollbar absolute inset-0 overflow-y-auto overscroll-contain pe-2 outline-none", className)}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        data-visible={edges.top}
        className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-linear-to-b from-(--surface) to-transparent opacity-0 transition-opacity duration-150 ease-out data-[visible=true]:opacity-100"
      />
      <div
        aria-hidden="true"
        data-visible={edges.bottom}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-linear-to-t from-(--surface) to-transparent opacity-0 transition-opacity duration-150 ease-out data-[visible=true]:opacity-100"
      />
    </div>
  );
}
