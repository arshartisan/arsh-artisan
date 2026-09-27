import { PillLink } from "../pill-link";
import { WidgetCard } from "../widget-card";

type CV = {
  label: string;
  view: { label: string; href: string };
  download: { label: string; href: string; filename: string };
};

export function CVCard({ cv }: { cv: CV }) {
  return (
    <WidgetCard label={cv.label} tone="alt" bodyClassName="justify-end gap-2">
      <PillLink href={cv.view.href} target="_blank" rel="noreferrer" icon="arrow">
        {cv.view.label}
      </PillLink>
      <PillLink href={cv.download.href} download={cv.download.filename} icon="download">
        {cv.download.label}
      </PillLink>
    </WidgetCard>
  );
}
