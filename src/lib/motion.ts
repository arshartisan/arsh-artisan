import type { Transition, Variants } from "framer-motion";

/** Strong ease-out (emil-design-eng) for entrances. */
export const easeOutStrong = [0.23, 1, 0.32, 1] as const;

/**
 * Staged page entrance: opacity + blur + translateY, staggered per widget.
 * Uses full `transform` strings so Motion can hardware-accelerate them.
 */
export const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, transform: "translateY(12px)", filter: "blur(4px)" },
  visible: {
    opacity: 1,
    transform: "translateY(0px)",
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: easeOutStrong },
  },
};

/** better-ui contextual swap: scale 0.25 → 1, opacity 0 → 1, blur 4px → 0. */
export const swapTransition: Transition = { type: "spring", duration: 0.3, bounce: 0 };

export const swapVariants = {
  initial: { opacity: 0, scale: 0.25, filter: "blur(4px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 0.25, filter: "blur(4px)" },
};

/** Softer swap for text labels, where scaling from 0.25 would read as a pop. */
export const labelSwapVariants = {
  initial: { opacity: 0, transform: "translateY(6px)", filter: "blur(4px)" },
  animate: { opacity: 1, transform: "translateY(0px)", filter: "blur(0px)" },
  exit: { opacity: 0, transform: "translateY(-6px)", filter: "blur(4px)" },
};
