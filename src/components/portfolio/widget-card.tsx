"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { BorderGlowLayers, useBorderGlow } from "@/components/ui/border-glow";
import { itemVariants } from "@/lib/motion";
import { cn } from "@/lib/utils";

const spans = {
  "1x1": "col-span-1 row-span-1",
  "2x1": "col-span-2 row-span-1",
  "2x2": "col-span-2 row-span-2",
} as const;

/**
 * On mobile the grid rows size to content, so each card carries its own square-unit minimum
 * (the grid defines --unit and --gap). Cards that opt into `fitOnMobile` skip it and hug their content.
 */
const mobileMinHeights = {
  "1x1": "max-md:min-h-(--unit)",
  "2x1": "max-md:min-h-(--unit)",
  "2x2": "max-md:min-h-[calc(2*var(--unit)+var(--gap))]",
} as const;

type WidgetCardProps = {
  span?: keyof typeof spans;
  /** "alt" surfaces can be styled to stand out from regular cards via --card-alt. */
  tone?: "default" | "alt";
  /** On mobile, drop the square minimum and let the card be exactly as tall as its content. */
  fitOnMobile?: boolean;
  label?: ReactNode;
  meta?: ReactNode;
  /**
   * Sits at the header's right edge, outside the clipping wrapper, so effects like a ping
   * can spill past the header. Pad `meta` on the right (pr-3.5) to leave room for it.
   */
  metaIndicator?: ReactNode;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
};

export function WidgetCard({
  span = "1x1",
  tone = "default",
  fitOnMobile = false,
  label,
  meta,
  metaIndicator,
  className,
  bodyClassName,
  children,
}: WidgetCardProps) {
  const surface = tone === "alt" ? "var(--card-alt)" : "var(--card)";
  const glow = useBorderGlow();

  return (
    <motion.section
      variants={itemVariants}
      style={{ "--surface": surface } as CSSProperties}
      {...glow}
      className={cn(
        // The border glow spills outside the card, so clipping lives on the inner wrapper,
        // and a hovered card lifts above its neighbours so they don't cover the glow.
        "relative isolate flex min-w-0 flex-col rounded-card bg-(--surface) p-2.5 text-xs shadow-(--card-shadow) hover:z-10",
        spans[span],
        fitOnMobile ? "max-md:row-span-1" : mobileMinHeights[span],
        className,
      )}
    >
      <BorderGlowLayers />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        {label ? <WidgetHeader label={label} meta={meta} /> : null}
        <div className={cn("flex min-h-0 flex-1 flex-col", bodyClassName)}>{children}</div>
      </div>
      {/* Centred on the header's 12px line: 10px card padding + 6px, minus half the 8px dot. */}
      {label && metaIndicator ? <span className="absolute top-3 right-2.5 flex">{metaIndicator}</span> : null}
    </motion.section>
  );
}

export function WidgetHeader({
  label,
  meta,
  className,
}: {
  label: ReactNode;
  meta?: ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "flex shrink-0 items-center justify-between gap-3 border-b border-line pb-2 leading-none",
        className,
      )}
    >
      <h2 className="truncate font-medium">{label}</h2>
      {meta ? <div className="truncate text-muted-foreground">{meta}</div> : null}
    </header>
  );
}
