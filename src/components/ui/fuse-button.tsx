"use client";

/**
 * Fuse Button, adapted from React Bits (https://reactbits.dev/micro/fuse-button).
 * Press to arm: the label crossfades to the undo label while a fuse burns around the
 * outline; when it runs out the action commits, and Undo or Escape cancels it.
 * Changes from upstream: Lucide icons instead of Hugeicons, an `xs` size, a
 * `fullWidth` option so it can stand in for the widgets' pill buttons, and `undoIcon`.
 */

import { Check, Undo2 } from "lucide-react";
import React, { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from "react";

export type FusePosition = "outline" | "bottom" | "top";
export type FuseCommitOn = "press" | "fuseEnd";
export type FuseSettle = "reset" | "stay";
export type FusePhase = "idle" | "armed" | "settled";
export type FuseSize = "xs" | "sm" | "md" | "lg";

export interface FuseButtonProps {
  label?: string;
  undoLabel?: string;
  /** Icon on the armed (undo) face; defaults to an undo arrow. */
  undoIcon?: ReactNode;
  doneLabel?: string;
  icon?: ReactNode;
  color?: string;
  background?: string;
  fuseColor?: string;
  size?: FuseSize;
  radius?: number;
  undoWindow?: number;
  fuse?: FusePosition;
  fuseThickness?: number;
  crossfadeMs?: number;
  commitOn?: FuseCommitOn;
  pauseOnHover?: boolean;
  settle?: FuseSettle;
  disabled?: boolean;
  fullWidth?: boolean;
  onCommit?: (reason: FuseCommitOn) => void;
  onUndo?: () => void;
  onFuseEnd?: () => void;
  onPhaseChange?: (phase: FusePhase) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

interface Latest {
  onCommit?: (reason: FuseCommitOn) => void;
  onUndo?: () => void;
  onFuseEnd?: () => void;
  onPhaseChange?: (phase: FusePhase) => void;
  commitOn: FuseCommitOn;
  settle: FuseSettle;
}

const LINE: Keyframe[] = [{ transform: "scaleX(1)" }, { transform: "scaleX(0)" }];
const OUTLINE: Keyframe[] = [{ strokeDashoffset: 0 }, { strokeDashoffset: -1 }];
const SIZES: Record<FuseSize, { height: number; font: number; icon: number; px: number }> = {
  xs: { height: 28, font: 12, icon: 12, px: 14 },
  sm: { height: 36, font: 13, icon: 14, px: 16 },
  md: { height: 44, font: 14, icon: 15, px: 20 },
  lg: { height: 52, font: 15, icon: 17, px: 24 },
};

const face =
  "relative [grid-area:1/1] inline-flex h-full w-full min-w-0 items-center justify-center gap-2 m-0 border-0 bg-transparent px-[var(--fb-px)] whitespace-nowrap cursor-pointer invisible opacity-0 [filter:blur(2px)] [color:inherit] [font:inherit] [letter-spacing:inherit] [transition:opacity_var(--fb-fade)_ease,filter_var(--fb-fade)_ease,visibility_0s_linear_var(--fb-fade),background-color_160ms_ease] motion-reduce:[filter:none] motion-reduce:[transition:opacity_var(--fb-fade)_ease,visibility_0s_linear_var(--fb-fade)] group-data-[instant]:[transition-duration:0s]";
const iconBox = "inline-flex h-[var(--fb-icon)] w-[var(--fb-icon)] [&>svg]:h-full [&>svg]:w-full";

export function FuseButton({
  label = "Archive",
  undoLabel = "Undo",
  undoIcon,
  doneLabel = "Archived",
  icon,
  color = "#f5f5f5",
  background = "#27272a",
  fuseColor = "#f5a524",
  size = "md",
  radius = 22,
  undoWindow = 4000,
  fuse = "outline",
  fuseThickness = 1.5,
  crossfadeMs = 200,
  commitOn = "press",
  pauseOnHover = true,
  settle = "reset",
  disabled = false,
  fullWidth = false,
  onCommit,
  onUndo,
  onFuseEnd,
  onPhaseChange,
  className = "",
  type = "button",
}: FuseButtonProps) {
  const [phase, setPhase] = useState<FusePhase>("idle");
  const [instant, setInstant] = useState(false);
  const rootRef = useRef<HTMLSpanElement>(null);
  const idleRef = useRef<HTMLButtonElement>(null);
  const undoRef = useRef<HTMLButtonElement>(null);
  const lineRef = useRef<HTMLElement>(null);
  const rimRef = useRef<SVGRectElement>(null);
  const anim = useRef<Animation | null>(null);
  const pause = useRef({ hover: false, hidden: false, canHoverPause: false });
  const lastInput = useRef<"pointer" | "keyboard">("pointer");
  const windowRef = useRef(undoWindow);
  const latest = useRef<Latest>({ commitOn, settle });
  const statusId = useId();
  const preset = SIZES[size] || SIZES.md;

  // Keep the latest callbacks for the animation's onfinish handler without re-lighting the fuse.
  useEffect(() => {
    latest.current = { onCommit, onUndo, onFuseEnd, onPhaseChange, commitOn, settle };
  });

  const go = (next: FusePhase) => {
    setInstant(lastInput.current === "keyboard");
    setPhase(next);
    latest.current.onPhaseChange?.(next);
  };

  const syncPlayState = () => {
    const a = anim.current;
    if (!a) return;
    const { hover, hidden } = pause.current;
    if (hover || hidden) {
      if (a.playState === "running") a.pause();
    } else if (a.playState === "paused") {
      a.play();
    }
  };

  const light = (from = 0) => {
    const el = fuse === "outline" ? rimRef.current : lineRef.current;
    if (!el) return;
    anim.current?.cancel();
    const a = el.animate(fuse === "outline" ? OUTLINE : LINE, {
      duration: windowRef.current,
      easing: "linear",
      fill: "forwards",
    });
    if (from) a.currentTime = from;
    a.onfinish = () => {
      const l = latest.current;
      l.onFuseEnd?.();
      if (l.commitOn === "fuseEnd") l.onCommit?.("fuseEnd");
      lastInput.current = "pointer";
      go(l.settle === "stay" ? "settled" : "idle");
    };
    anim.current = a;
    syncPlayState();
  };

  const arm = () => {
    if (disabled || phase !== "idle") return;
    windowRef.current = undoWindow;
    light();
    pause.current.canHoverPause = false;
    pause.current.hover = false;
    if (commitOn === "press") onCommit?.("press");
    go("armed");
  };

  const undo = () => {
    if (phase !== "armed") return;
    const a = anim.current;
    if (a) {
      a.onfinish = null;
      a.pause();
    }
    onUndo?.();
    go("idle");
  };

  useEffect(() => {
    const inside = rootRef.current?.contains(document.activeElement);
    if (phase === "armed") undoRef.current?.focus({ preventScroll: true });
    else if (inside) (phase === "idle" ? idleRef.current : rootRef.current)?.focus({ preventScroll: true });
  }, [phase]);

  useEffect(() => {
    const onVisibility = () => {
      pause.current.hidden = document.hidden;
      syncPlayState();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      anim.current?.cancel();
    };
     
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLSpanElement>) => {
    lastInput.current = "pointer";
    const pressable = phase === "armed" || (phase === "idle" && !disabled);
    if (e.button === 0 && pressable && rootRef.current) rootRef.current.dataset.pressed = "";
  };
  const release = () => {
    if (rootRef.current) delete rootRef.current.dataset.pressed;
  };
  const handlePointerEnter = (e: React.PointerEvent<HTMLSpanElement>) => {
    if (pauseOnHover && e.pointerType === "mouse" && pause.current.canHoverPause) {
      pause.current.hover = true;
      syncPlayState();
    }
  };
  const handlePointerLeave = (e: React.PointerEvent<HTMLSpanElement>) => {
    release();
    if (e.pointerType !== "mouse") return;
    pause.current.canHoverPause = true;
    pause.current.hover = false;
    syncPlayState();
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === "Enter" || e.key === " ") lastInput.current = "keyboard";
    if (e.key === "Escape" && phase === "armed") {
      e.preventDefault();
      lastInput.current = "keyboard";
      undo();
    }
  };

  const line = (
    <i
      ref={lineRef}
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[var(--fb-fuse-h)] origin-left [background:var(--fb-fuse)] [box-shadow:0_0_6px_color-mix(in_srgb,var(--fb-fuse)_55%,transparent)] group-data-[fuse=top]:top-0 group-data-[fuse=top]:bottom-auto forced-colors:[background:Highlight]"
      aria-hidden="true"
    />
  );

  return (
    <span
      ref={rootRef}
      tabIndex={-1}
      className={`group relative ${fullWidth ? "grid w-full" : "inline-grid"} h-[var(--fb-h)] grid-cols-[minmax(0,1fr)] isolate touch-manipulation select-none overflow-hidden rounded-[var(--fb-radius)] font-normal leading-none outline-none [font-family:inherit] [font-size:var(--fb-fs)] [background:var(--fb-bg)] [color:var(--fb-ink)] [-webkit-touch-callout:none] [-webkit-tap-highlight-color:transparent] [transition:transform_160ms_var(--fb-ease-out)] data-[pressed]:[transform:scale(var(--fb-press))] motion-reduce:data-[pressed]:[transform:none] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-solid has-[:focus-visible]:outline-offset-[3px] has-[:focus-visible]:[outline-color:color-mix(in_srgb,var(--fb-ink)_60%,transparent)] data-[phase=idle]:has-[.fb-idle:disabled]:opacity-[0.55] contrast-more:[box-shadow:inset_0_0_0_1px_color-mix(in_srgb,var(--fb-ink)_40%,transparent)] ${className}`}
      data-phase={phase}
      data-fuse={fuse}
      data-instant={instant ? "" : undefined}
      aria-disabled={phase === "settled" || undefined}
      style={
        {
          "--fb-ink": color,
          "--fb-bg": background,
          "--fb-fuse": fuseColor,
          "--fb-fuse-h": `${fuseThickness}px`,
          "--fb-radius": `${radius}px`,
          "--fb-fade": `${crossfadeMs}ms`,
          "--fb-h": `${preset.height}px`,
          "--fb-fs": `${preset.font}px`,
          "--fb-icon": `${preset.icon}px`,
          "--fb-px": `${preset.px}px`,
          "--fb-press": 0.97,
          "--fb-ease-out": "cubic-bezier(0.23, 1, 0.32, 1)",
        } as CSSProperties
      }
      onPointerDown={handlePointerDown}
      onPointerUp={release}
      onPointerCancel={release}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onKeyDown={handleKeyDown}
    >
      <button
        ref={idleRef}
        type={type}
        className={`fb-idle ${face} group-data-[phase=idle]:visible group-data-[phase=idle]:opacity-100 group-data-[phase=idle]:[filter:blur(0)] group-data-[phase=idle]:[transition-delay:0s] disabled:cursor-default focus-visible:outline-none [@media(hover:hover)_and_(pointer:fine)]:enabled:hover:[background:color-mix(in_srgb,var(--fb-ink)_7%,transparent)]`}
        disabled={disabled}
        inert={phase !== "idle"}
        onClick={arm}
      >
        {icon ? (
          <span className={iconBox} aria-hidden="true">
            {icon}
          </span>
        ) : null}
        {label}
      </button>
      <button
        ref={undoRef}
        type="button"
        className={`${face} group-data-[phase=armed]:visible group-data-[phase=armed]:opacity-100 group-data-[phase=armed]:[filter:blur(0)] group-data-[phase=armed]:[transition-delay:0s] focus-visible:outline-none [@media(hover:hover)_and_(pointer:fine)]:hover:[background:color-mix(in_srgb,var(--fb-ink)_7%,transparent)]`}
        aria-describedby={statusId}
        aria-keyshortcuts="Escape"
        inert={phase !== "armed"}
        onClick={undo}
      >
        <span
          className={`${iconBox} [transform:rotate(-70deg)] [transition:transform_var(--fb-fade)_var(--fb-ease-out)] group-data-[phase=armed]:[transform:rotate(0deg)] motion-reduce:transition-none motion-reduce:[transform:none]`}
          aria-hidden="true"
        >
          {undoIcon ?? <Undo2 strokeWidth={2} />}
        </span>
        {undoLabel}
        {fuse !== "outline" ? line : null}
      </button>
      <span
        className={`${face} group-data-[phase=settled]:visible group-data-[phase=settled]:opacity-100 group-data-[phase=settled]:[filter:blur(0)] group-data-[phase=settled]:[transition-delay:0s] cursor-default`}
        inert={phase !== "settled"}
      >
        <span className={iconBox} aria-hidden="true">
          <Check strokeWidth={2.2} />
        </span>
        {doneLabel}
      </span>
      {fuse === "outline" ? (
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible opacity-0 [filter:drop-shadow(0_0_3px_color-mix(in_srgb,var(--fb-fuse)_60%,transparent))] [transition:opacity_var(--fb-fade)_ease] group-data-[phase=armed]:opacity-100 group-data-[instant]:[transition-duration:0s]"
          aria-hidden="true"
        >
          <rect
            ref={rimRef}
            pathLength="1"
            className="fill-none [x:calc(var(--fb-fuse-h)/2)] [y:calc(var(--fb-fuse-h)/2)] [width:calc(100%-var(--fb-fuse-h))] [height:calc(100%-var(--fb-fuse-h))] [rx:max(0px,calc(var(--fb-radius)-var(--fb-fuse-h)/2))] [stroke:var(--fb-fuse)] [stroke-width:var(--fb-fuse-h)] [stroke-linecap:round] [stroke-dasharray:1] forced-colors:[stroke:Highlight]"
          />
        </svg>
      ) : null}
      <span className="sr-only" id={statusId} role="status" aria-live="polite">
        {phase === "idle" ? "" : doneLabel}
      </span>
    </span>
  );
}
