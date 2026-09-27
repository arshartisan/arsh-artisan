import { WidgetCard } from "../widget-card";
import { FadeScroll } from "../fade-scroll";

type TimelineRow = {
  key: string;
  aside: React.ReactNode;
  title: string;
  subtitle: string;
};

/** Shared layout for "Experience", "Education" and "Research & Recognition". */
function TimelineCard({
  label,
  rows,
  span,
  tone,
}: {
  label: string;
  rows: TimelineRow[];
  span: "2x1" | "2x2";
  tone?: "default" | "alt";
}) {
  return (
    <WidgetCard label={label} span={span} tone={tone}>
      <FadeScroll label={label}>
        <ol>
          {rows.map((row) => (
            <li
              key={row.key}
              className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-x-3 border-b border-line py-3 leading-[1.45] last:border-b-0"
            >
              <div className="text-muted-foreground tabular-nums">{row.aside}</div>
              <div>
                <h3 className="font-medium">{row.title}</h3>
                <p className="text-pretty text-muted-foreground">{row.subtitle}</p>
              </div>
            </li>
          ))}
        </ol>
      </FadeScroll>
    </WidgetCard>
  );
}

/** Dated timeline (start to end); used for both Experience and Education. */
export function ExperienceCard({
  experience,
  tone = "default",
}: {
  experience: { label: string; items: { start: string; end: string; title: string; subtitle: string }[] };
  tone?: "default" | "alt";
}) {
  return (
    <TimelineCard
      label={experience.label}
      span="2x2"
      tone={tone}
      rows={experience.items.map((item, i) => ({
        key: `${item.title}-${i}`,
        title: item.title,
        subtitle: item.subtitle,
        aside: (
          <span className="flex items-center gap-2">
            <span>{item.start}</span>
            <span aria-hidden="true" className="h-px w-4 bg-current opacity-60" />
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
}: {
  sideProjects: { label: string; items: { since: string; title: string; subtitle: string }[] };
}) {
  return (
    <TimelineCard
      label={sideProjects.label}
      span="2x1"
      rows={sideProjects.items.map((item) => ({
        key: item.title,
        title: item.title,
        subtitle: item.subtitle,
        aside: item.since,
      }))}
    />
  );
}
