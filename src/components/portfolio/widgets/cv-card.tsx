import type { Content } from "@/lib/content";
import { PillLink } from "../pill-link";
import { WidgetCard } from "../widget-card";

export function CVCard({ cv }: { cv: Content["cv"] }) {
  return (
    <WidgetCard label={cv.label} tone="alt" bodyClassName="justify-end">
      <PillLink href={cv.download.href} download={cv.download.filename} icon="download">
        {cv.download.label}
      </PillLink>
    </WidgetCard>
  );
}
