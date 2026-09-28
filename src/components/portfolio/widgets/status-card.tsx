import type { CSSProperties } from "react";
import type { Theme } from "@/lib/content";
import { WidgetCard } from "../widget-card";

export function StatusCard({ status }: { status: Theme["status"] }) {
  return (
    <WidgetCard
      label={status.label}
      meta={
        <span className="flex items-center gap-1.5" style={{ "--indicator": status.indicator } as CSSProperties}>
          {status.mode}
          <span aria-hidden="true" className="relative flex size-2">
            <span className="absolute inset-0 rounded-full bg-(--indicator) opacity-60 animate-[status-ping_2.4s_cubic-bezier(0.23,1,0.32,1)_infinite]" />
            <span className="relative size-2 rounded-full bg-(--indicator)" />
          </span>
        </span>
      }
      bodyClassName="justify-end gap-2.5"
    >
      <p className="text-pretty leading-[1.45] font-medium">{status.text}</p>
    </WidgetCard>
  );
}
