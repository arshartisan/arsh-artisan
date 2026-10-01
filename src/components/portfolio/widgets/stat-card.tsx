"use client";

import { AnimatePresence, animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Content } from "@/lib/content";
import { easeOutStrong, labelSwapVariants, swapTransition } from "@/lib/motion";
import { WidgetCard } from "../widget-card";

/**
 * Rotates through stats on a timer: the label swaps with a blur/slide and the
 * number counts from the previous value to the next. Pauses while hovered.
 */
export function StatCard({ stats, className }: { stats: Content["stats"]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  // Start from 0 on both server and client; reduced motion jumps straight to each value.
  const count = useMotionValue(0);
  const rounded = useTransform(count, (value) => Math.round(value));
  const stat = stats.items[index];

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      count.set(stat.value);
      return;
    }
    const controls = animate(count, stat.value, { duration: 1.2, ease: easeOutStrong, delay: index === 0 ? 0.3 : 0 });
    return () => controls.stop();
  }, [inView, reduceMotion, stat.value, index, count]);

  useEffect(() => {
    if (!inView || paused || stats.items.length < 2) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % stats.items.length), stats.interval);
    return () => clearInterval(timer);
  }, [inView, paused, stats.items.length, stats.interval]);

  const label = (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={stat.label}
        variants={labelSwapVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={swapTransition}
        className="block"
      >
        {stat.label}
      </motion.span>
    </AnimatePresence>
  );

  return (
    <div className="contents" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
      <WidgetCard label={label} className={className} bodyClassName="@container items-center justify-center">
        <div ref={ref} className="leading-none font-normal tracking-[-0.08em] tabular-nums text-[58cqw]">
          <motion.span aria-hidden="true">{rounded}</motion.span>
          <span className="sr-only">
            {stat.label}: {stat.value}
          </span>
        </div>
      </WidgetCard>
    </div>
  );
}
