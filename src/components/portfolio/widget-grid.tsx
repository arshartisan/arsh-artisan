"use client";

import { MotionConfig, motion } from "framer-motion";
import type { ReactNode } from "react";
import { gridVariants } from "@/lib/motion";

/**
 * 2 / 4 / 6 column bento grid. Row height equals column width (square units),
 * derived from the container width so widgets keep their proportions at every size.
 */
export function WidgetGrid({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <div className="@container">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={gridVariants}
          className="grid grid-cols-[repeat(var(--cols),minmax(0,1fr))] auto-rows-[minmax(var(--unit),auto)] gap-(--gap) [--cols:2] [--gap:16px] [--unit:calc((100cqw-(var(--cols)-1)*var(--gap))/var(--cols))] md:[--cols:4] md:[--gap:22px] lg:[--cols:6]"
        >
          {children}
        </motion.div>
      </div>
    </MotionConfig>
  );
}
