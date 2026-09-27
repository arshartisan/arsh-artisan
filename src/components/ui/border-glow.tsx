"use client";

/**
 * Border Glow, adapted from React Bits (https://reactbits.dev/components/border-glow):
 * a mesh-gradient border and outer glow that follow the cursor's direction from the
 * card's centre and intensify near the edges.
 *
 * Unlike upstream (React state on every pointermove), this writes three CSS variables
 * straight onto the card, so hovering never re-renders the card's contents:
 *   --glow-angle   direction of the cursor from the centre
 *   --glow-border  opacity of the gradient border / edge fill
 *   --glow-outer   opacity of the outer glow
 * Theme-dependent blend modes come from --glow-blend / --glow-fill-blend (globals.css).
 */

import { useCallback, type CSSProperties, type PointerEvent } from "react";

const EDGE_SENSITIVITY = 30;
const COLOR_SENSITIVITY = EDGE_SENSITIVITY + 20;
const CONE_SPREAD = 25;
const GLOW_RADIUS = 40;
const FILL_OPACITY = 0.5;
const COLORS = ["#c084fc", "#f472b6", "#38bdf8"];
const GLOW_COLOR = "40deg 80% 80%";

const GRADIENT_POSITIONS = ["80% 55%", "69% 34%", "8% 6%", "41% 38%", "86% 85%", "82% 18%", "51% 4%"];
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];
const MESH = [
  ...GRADIENT_POSITIONS.map((pos, i) => `radial-gradient(at ${pos}, ${COLORS[COLOR_MAP[i]]} 0px, transparent 50%)`),
  `linear-gradient(${COLORS[0]} 0 100%)`,
];

const GLOW_SHADOW = (
  [
    [0, 0, 0, 1, 100, true], [0, 0, 1, 0, 60, true], [0, 0, 3, 0, 50, true], [0, 0, 6, 0, 40, true],
    [0, 0, 15, 0, 30, true], [0, 0, 25, 2, 20, true], [0, 0, 50, 2, 10, true],
    [0, 0, 1, 0, 60, false], [0, 0, 3, 0, 50, false], [0, 0, 6, 0, 40, false],
    [0, 0, 15, 0, 30, false], [0, 0, 25, 2, 20, false], [0, 0, 50, 2, 10, false],
  ] as const
)
  .map(([x, y, blur, spread, alpha, inset]) => `${inset ? "inset " : ""}${x}px ${y}px ${blur}px ${spread}px hsl(${GLOW_COLOR} / ${alpha}%)`)
  .join(", ");

const angle = "var(--glow-angle, 45deg)";
const fade = "opacity var(--glow-fade, 0.75s) ease-out";

function conicMask(spread: number) {
  return `conic-gradient(from ${angle} at center, black ${spread}%, transparent ${spread + 15}%, transparent ${100 - spread - 15}%, black ${100 - spread}%)`;
}

const borderStyle: CSSProperties = {
  border: "1px solid transparent",
  background: [
    "linear-gradient(var(--surface) 0 100%) padding-box",
    "linear-gradient(transparent 0 100%) border-box",
    ...MESH.map((g) => `${g} border-box`),
  ].join(", "),
  opacity: "var(--glow-border, 0)",
  maskImage: conicMask(CONE_SPREAD),
  WebkitMaskImage: conicMask(CONE_SPREAD),
  transition: fade,
};

const fillMask = [
  "linear-gradient(to bottom, black, black)",
  "radial-gradient(ellipse at 50% 50%, black 40%, transparent 65%)",
  "radial-gradient(ellipse at 66% 66%, black 5%, transparent 40%)",
  "radial-gradient(ellipse at 33% 33%, black 5%, transparent 40%)",
  "radial-gradient(ellipse at 66% 33%, black 5%, transparent 40%)",
  "radial-gradient(ellipse at 33% 66%, black 5%, transparent 40%)",
  `conic-gradient(from ${angle} at center, transparent 5%, black 15%, black 85%, transparent 95%)`,
].join(", ");

const fillStyle: CSSProperties = {
  border: "1px solid transparent",
  background: MESH.map((g) => `${g} padding-box`).join(", "),
  maskImage: fillMask,
  WebkitMaskImage: fillMask,
  maskComposite: "subtract, add, add, add, add, add",
  WebkitMaskComposite: "source-out, source-over, source-over, source-over, source-over, source-over",
  opacity: `calc(var(--glow-border, 0) * ${FILL_OPACITY})`,
  mixBlendMode: "var(--glow-fill-blend, soft-light)" as CSSProperties["mixBlendMode"],
  transition: fade,
};

const outerMask = `conic-gradient(from ${angle} at center, black 2.5%, transparent 10%, transparent 90%, black 97.5%)`;
const outerStyle: CSSProperties = {
  inset: -GLOW_RADIUS,
  maskImage: outerMask,
  WebkitMaskImage: outerMask,
  opacity: "var(--glow-outer, 0)",
  mixBlendMode: "var(--glow-blend, plus-lighter)" as CSSProperties["mixBlendMode"],
  transition: fade,
};

/** Pointer handlers that drive the glow variables on the element they're attached to. */
export function useBorderGlow() {
  const onPointerMove = useCallback((e: PointerEvent<HTMLElement>) => {
    if (e.pointerType === "touch") return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = e.clientX - rect.left - cx;
    const dy = e.clientY - rect.top - cy;

    const kx = dx === 0 ? Infinity : cx / Math.abs(dx);
    const ky = dy === 0 ? Infinity : cy / Math.abs(dy);
    const proximity = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1) * 100;

    let degrees = dx === 0 && dy === 0 ? 0 : Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    if (degrees < 0) degrees += 360;

    el.style.setProperty("--glow-fade", "0.25s");
    el.style.setProperty("--glow-angle", `${degrees.toFixed(2)}deg`);
    el.style.setProperty("--glow-border", String(Math.max(0, (proximity - COLOR_SENSITIVITY) / (100 - COLOR_SENSITIVITY))));
    el.style.setProperty("--glow-outer", String(Math.max(0, (proximity - EDGE_SENSITIVITY) / (100 - EDGE_SENSITIVITY))));
  }, []);

  const onPointerLeave = useCallback((e: PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    el.style.setProperty("--glow-fade", "0.75s");
    el.style.setProperty("--glow-border", "0");
    el.style.setProperty("--glow-outer", "0");
  }, []);

  return { onPointerMove, onPointerLeave };
}

/** The glow layers, all behind the card content. Render inside a `relative isolate` card with the `rounded-card` radius. */
export function BorderGlowLayers() {
  // Hover-only effect: skip it entirely on touch devices, where it can never activate.
  return (
    <div aria-hidden="true" className="contents [@media(hover:none)]:hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-1 rounded-card" style={borderStyle} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-1 rounded-card" style={fillStyle} />
      <span aria-hidden="true" className="pointer-events-none absolute -z-1 rounded-card" style={outerStyle}>
        <span className="absolute rounded-card" style={{ inset: GLOW_RADIUS, boxShadow: GLOW_SHADOW }} />
      </span>
    </div>
  );
}
