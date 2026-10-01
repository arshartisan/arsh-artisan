"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import type { Theme } from "@/lib/content";
import { WidgetCard } from "../widget-card";

/** Milliseconds to add to UTC to get wall-clock time in `timeZone`. */
function getZoneOffset(timeZone: string) {
  const now = new Date();
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone,
      hourCycle: "h23",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    })
      .formatToParts(now)
      .map((part) => [part.type, Number(part.value)]),
  );
  const zoned = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
  return zoned - (now.getTime() - now.getMilliseconds());
}

const TICKS = Array.from({ length: 60 }, (_, i) => i);

export function ClockCard({ time, className }: { time: Theme["time"]; className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const hourRef = useRef<SVGGElement>(null);
  const minuteRef = useRef<SVGGElement>(null);
  const secondRef = useRef<SVGGElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let offset = getZoneOffset(time.timezone);
    let frame = 0;
    let timer: ReturnType<typeof setInterval> | undefined;
    let lastMinute = -1;

    const render = () => {
      const zoned = new Date(Date.now() + offset);
      const ms = zoned.getUTCMilliseconds();
      const s = zoned.getUTCSeconds() + (reduceMotion ? 0 : ms / 1000);
      const m = zoned.getUTCMinutes() + s / 60;
      const h = (zoned.getUTCHours() % 12) + m / 60;

      hourRef.current?.setAttribute("transform", `rotate(${h * 30} 50 50)`);
      minuteRef.current?.setAttribute("transform", `rotate(${m * 6} 50 50)`);
      secondRef.current?.setAttribute("transform", `rotate(${s * 6} 50 50)`);

      if (zoned.getUTCMinutes() !== lastMinute) {
        lastMinute = zoned.getUTCMinutes();
        offset = getZoneOffset(time.timezone); // stays correct across DST changes
        const hh = String(zoned.getUTCHours()).padStart(2, "0");
        const mm = String(lastMinute).padStart(2, "0");
        svgRef.current?.setAttribute("aria-label", `Local time in ${time.location}: ${hh}:${mm}`);
      }
    };

    render();
    svgRef.current?.setAttribute("data-ready", "true");

    if (reduceMotion) {
      timer = setInterval(render, 1000);
    } else {
      const loop = () => {
        render();
        frame = requestAnimationFrame(loop);
      };
      frame = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(frame);
      clearInterval(timer);
    };
  }, [time.timezone, time.location, reduceMotion]);

  return (
    <WidgetCard label={time.label} meta={time.location} className={className} bodyClassName="items-center justify-center pt-2">
      <svg
        ref={svgRef}
        viewBox="0 0 100 100"
        role="img"
        aria-label={`Clock for ${time.location}`}
        className="aspect-square h-full max-h-28 w-auto text-fg opacity-0 transition-opacity duration-300 ease-out data-[ready=true]:opacity-100"
      >
        {TICKS.map((i) => {
          const major = i % 5 === 0;
          return (
            <line
              key={i}
              x1="50"
              y1="2"
              x2="50"
              y2={major ? 13 : 8}
              stroke="currentColor"
              strokeWidth={major ? 1.1 : 0.6}
              strokeOpacity={major ? 0.9 : 0.45}
              transform={`rotate(${i * 6} 50 50)`}
            />
          );
        })}
        <g ref={hourRef}>
          <line x1="50" y1="55" x2="50" y2="28" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </g>
        <g ref={minuteRef}>
          <line x1="50" y1="56" x2="50" y2="12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </g>
        <g ref={secondRef}>
          <line x1="50" y1="60" x2="50" y2="8" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
        </g>
        <circle cx="50" cy="50" r="2.2" fill="currentColor" />
        <circle cx="50" cy="50" r="0.9" fill="var(--surface)" />
      </svg>
    </WidgetCard>
  );
}
