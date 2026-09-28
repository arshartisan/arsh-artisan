import Image from "next/image";
import { WidgetCard } from "../widget-card";
import { cn } from "@/lib/utils";
import { FadeScroll } from "../fade-scroll";

type TimelineRow = {
  key: string;
  aside: React.ReactNode;
  title: string;
  subtitle: string;
  logo?: string;
};

/**
 * Shared layout for "Experience", "Education" and "Research & Recognition".
 * `compact` drops the scroll area and tightens rows for short lists that must fit a 2x1 card.
 */
function TimelineCard({
  label,
  rows,
  span,
  tone,
  compact = false,
}: {
  label: string;
  rows: TimelineRow[];
  span: "2x1" | "2x2";
  tone?: "default" | "alt";
  compact?: boolean;
}) {
  const list = (
    <ol>
      {rows.map((row) => (
        <li
          key={row.key}
          className={cn(
            "grid gap-x-3 border-b border-line leading-[1.45] last:border-b-0",
            compact ? "grid-cols-[6.5rem_minmax(0,1fr)] py-2 last:pb-0" : "grid-cols-[6.5rem_minmax(0,1fr)] py-3",
          )}
        >
          <div className="text-muted-foreground tabular-nums">{row.aside}</div>
          <div className="min-w-0">
            <h3 className="flex items-center gap-2 mb-2 font-medium">
              {row.logo && (
                <span className="flex size-5 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-0.5 ring-1 ring-black/5">
                  <Image src={row.logo} alt="" width={40} height={40} className="size-full object-contain" />
                </span>
              )}
              <span className="min-w-0">{row.title}</span>
            </h3>
            <p className={cn("text-pretty text-muted-foreground", compact && "truncate")}>{row.subtitle}</p>
          </div>
        </li>
      ))}
    </ol>
  );

  return (
    <WidgetCard
      label={label}
      span={span}
      tone={tone}
      // On mobile the list isn't scrolled, so the card grows to fit its content.
      fitOnMobile={!compact}
      bodyClassName={compact ? "justify-center" : undefined}
    >
      {compact ? list : <FadeScroll label={label}>{list}</FadeScroll>}
    </WidgetCard>
  );
}

/** Dated timeline (start to end); used for both Experience and Education. */
export function ExperienceCard({
  experience,
  tone = "default",
  span = "2x2",
}: {
  experience: { label: string; items: { start: string; end: string; title: string; subtitle: string; logo?: string }[] };
  tone?: "default" | "alt";
  span?: "2x1" | "2x2";
}) {
  return (
    <TimelineCard
      label={experience.label}
      span={span}
      compact={span === "2x1"}
      tone={tone}
      rows={experience.items.map((item, i) => ({
        key: `${item.title}-${i}`,
        title: item.title,
        subtitle: item.subtitle,
        logo: item.logo,
        aside: (
          <span className="flex items-center gap-1.5">
            <span>{item.start}</span>
            <span aria-hidden="true" className="h-px w-1.5 bg-current opacity-60" />
            <span className="sr-only">to</span>
            <span>{item.end}</span>
          </span>
        ),
      }))}
    />
  );
}

export function SideProjectsCard({
  sideProjects,
  span = "2x1",
}: {
  sideProjects: { label: string; items: { since: string; title: string; subtitle: string }[] };
  span?: "2x1" | "2x2";
}) {
  return (
    <TimelineCard
      label={sideProjects.label}
      span={span}
      rows={sideProjects.items.map((item) => ({
        key: item.title,
        title: item.title,
        subtitle: item.subtitle,
        aside: item.since,
      }))}
    />
  );
}
