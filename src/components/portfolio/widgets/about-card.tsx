import type { Theme } from "@/lib/content";
import { WidgetCard } from "../widget-card";

export function AboutCard({ about }: { about: Theme["about"] }) {
  return (
    <WidgetCard label={about.label} meta={about.name} span="2x1" bodyClassName="justify-center pt-2.5">
      <p className="text-pretty leading-[1.5] font-medium">{about.text}</p>
    </WidgetCard>
  );
}
