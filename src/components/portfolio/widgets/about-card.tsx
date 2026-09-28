import type { Theme } from "@/lib/content";
import { WidgetCard } from "../widget-card";

export function AboutCard({ about }: { about: Theme["about"] }) {
  return (
    <WidgetCard label={about.label} meta={about.name} span="2x1" fitOnMobile bodyClassName="justify-start pt-2.5 md:justify-center">
      <p className="text-pretty leading-[1.5] font-medium">{about.text}</p>
    </WidgetCard>
  );
}
