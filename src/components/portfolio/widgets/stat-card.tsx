"use client";

import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import type { Theme } from "@/lib/content";
import { easeOutStrong } from "@/lib/motion";
import { WidgetCard } from "../widget-card";

export function StatCard({ stat }: { stat: Theme["stat"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  // Start from 0 on both server and client; reduced motion jumps straight to the value once in view.
  const count = useMotionValue(0);
  const rounded = useTransform(count, (value) => Math.round(value));

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      count.set(stat.value);
      return;
    }
    const controls = animate(count, stat.value, { duration: 1.4, ease: easeOutStrong, delay: 0.3 });
    return () => controls.stop();
  }, [inView, reduceMotion, stat.value, count]);

  return (
    <WidgetCard label={stat.label} bodyClassName="@container items-center justify-center">
      <div ref={ref} className="leading-none font-normal tracking-[-0.08em] tabular-nums text-[58cqw]">
        <motion.span aria-hidden="true">{rounded}</motion.span>
        <span className="sr-only">{stat.value}</span>
      </div>
    </WidgetCard>
  );
}
