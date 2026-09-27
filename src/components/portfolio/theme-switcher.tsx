"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import type { ThemeId } from "@/lib/content";
import { labelSwapVariants, swapTransition } from "@/lib/motion";
import { cn } from "@/lib/utils";

type SwitcherTheme = { id: ThemeId; label: string; path: string; avatar: string };

export function ThemeSwitcher({
  themes,
  current,
  label,
}: {
  themes: SwitcherTheme[];
  current: ThemeId;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<ThemeId | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const activeLabel = open ? themes.find((t) => t.id === (hovered ?? current))?.label ?? label : label;

  return (
    <div ref={rootRef} className="fixed top-0 left-1/2 z-50 w-28 -translate-x-1/2">
      <div
        data-open={open}
        className={cn(
          "overflow-hidden bg-[#1e1e1e] text-white shadow-[inset_0_0_0_1px_oklch(1_0_0/0.1)]",
          // Collapsed: only the 28px label row shows. Exit is quicker than enter.
          "[clip-path:inset(0_0_calc(100%-28px)_0_round_0_0_14px_14px)] transition-[clip-path] duration-150 ease-out-strong",
          "data-[open=true]:[clip-path:inset(0_0_0_0_round_0_0_14px_14px)] data-[open=true]:duration-250",
        )}
      >
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          className="relative flex h-7 w-full items-center justify-center text-xs outline-none focus-visible:underline focus-visible:underline-offset-4"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={activeLabel}
              variants={labelSwapVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={swapTransition}
              className="whitespace-nowrap"
            >
              {activeLabel}
            </motion.span>
          </AnimatePresence>
        </button>

        <ul
          id={panelId}
          inert={!open}
          aria-label="Themes"
          className="flex items-center justify-center gap-1.5 px-2 pt-1.5 pb-2"
          onPointerLeave={() => setHovered(null)}
        >
          {themes.map((theme) => {
            const isCurrent = theme.id === current;
            return (
              <li key={theme.id}>
                <Link
                  href={theme.path}
                  aria-label={`${theme.label} theme`}
                  aria-current={isCurrent ? "page" : undefined}
                  onPointerEnter={() => setHovered(theme.id)}
                  onFocus={() => setHovered(theme.id)}
                  onBlur={() => setHovered(null)}
                  onClick={() => setOpen(false)}
                  className="group/avatar block rounded-full outline-none"
                >
                  <Image
                    src={theme.avatar}
                    alt=""
                    width={52}
                    height={52}
                    className={cn(
                      "image-outline size-6.5 rounded-full object-cover transition-[opacity,scale,box-shadow] duration-150 ease-out group-active/avatar:scale-[0.96]",
                      "group-focus-visible/avatar:shadow-[0_0_0_2px_#1e1e1e,0_0_0_3px_white]",
                      isCurrent
                        ? "shadow-[0_0_0_2px_#1e1e1e,0_0_0_3px_white]"
                        : "opacity-60 group-hover/avatar:opacity-100 group-focus-visible/avatar:opacity-100",
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
