"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { itemVariants } from "@/lib/motion";
import { cn } from "@/lib/utils";

const spans = {
  "1x1": "col-span-1 row-span-1",
  "2x1": "col-span-2 row-span-1",
  "2x2": "col-span-2 row-span-2",
} as const;

type WidgetCardProps = {
  span?: keyof typeof spans;
  /** "alt" surfaces stand out from regular cards (white cards in the Brutal theme). */
  tone?: "default" | "alt";
  label?: ReactNode;
  meta?: ReactNode;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
};

export function WidgetCard({
  span = "1x1",
  tone = "default",
  label,
  meta,
  className,
  bodyClassName,
  children,
}: WidgetCardProps) {
  const surface = tone === "alt" ? "var(--card-alt)" : "var(--card)";

  return (
    <motion.section
      variants={itemVariants}
      style={{ "--surface": surface } as CSSProperties}
      className={cn(
        "relative flex min-w-0 flex-col overflow-hidden rounded-card bg-(--surface) p-2.5 text-xs shadow-(--card-shadow)",
        spans[span],
        className,
      )}
    >
      {label ? <WidgetHeader label={label} meta={meta} /> : null}
      <div className={cn("flex min-h-0 flex-1 flex-col", bodyClassName)}>{children}</div>
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
