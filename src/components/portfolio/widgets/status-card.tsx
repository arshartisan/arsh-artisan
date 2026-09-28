import type { CSSProperties } from "react";
import type { Theme } from "@/lib/content";
import { WidgetCard } from "../widget-card";

export function StatusCard({ status }: { status: Theme["status"] }) {
  return (
    <WidgetCard
      label={status.label}
      meta={<span className="pr-3.5">{status.mode}</span>}
      metaIndicator={
        <span
          aria-hidden="true"
          className="relative flex size-2"
          style={{ "--indicator": status.indicator } as CSSProperties}
        >
          <span className="absolute inset-0 rounded-full bg-(--indicator) opacity-60 animate-[status-ping_2.4s_cubic-bezier(0.23,1,0.32,1)_infinite]" />
          <span className="relative size-2 rounded-full bg-(--indicator)" />
        </span>
      }
      bodyClassName="justify-end gap-2.5"
    >
      <p className="text-pretty leading-[1.45] font-medium">{status.text}</p>
    </WidgetCard>
  );
}
