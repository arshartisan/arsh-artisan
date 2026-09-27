import type { CSSProperties } from "react";
import type { Theme } from "@/lib/content";
import { WidgetCard } from "../widget-card";
import { PillLink } from "../pill-link";

export function StatusCard({ status }: { status: Theme["status"] }) {
  return (
    <WidgetCard
      label={status.label}
      meta={
        <span
          className="relative flex size-2"
          style={{ "--indicator": status.indicator } as CSSProperties}
        >
          <span className="absolute inset-0 rounded-full bg-(--indicator) opacity-60 animate-[status-ping_2.4s_cubic-bezier(0.23,1,0.32,1)_infinite]" />
          <span className="relative size-2 rounded-full bg-(--indicator)" />
          <span className="sr-only">Status</span>
        </span>
      }
      bodyClassName="justify-end gap-2.5"
    >
      <p className="text-pretty leading-[1.45] font-medium">{status.text}</p>
      <PillLink href={status.action.href} icon="arrow">
        {status.action.label}
      </PillLink>
    </WidgetCard>
  );
}
