import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { content, getNextProject, getProjectHref, type Project, type Theme, type ThemeId } from "@/lib/content";
import { cn } from "@/lib/utils";
import { LocalTime } from "./local-time";
import { isExternal } from "./pill-link";
import { SiteFooter } from "./site-footer";
import { ThemeSync } from "./theme-sync";
import { ProjectThumb } from "./widgets/projects-card";

/** Entrance: fade + rise, staggered with delay utilities; skipped for reduced motion. */
const enter = "animate-in fade-in slide-in-from-bottom-3 fill-mode-both duration-700 ease-out-strong motion-reduce:animate-none";

export function ProjectPage({ theme, project }: { theme: Theme & { id: ThemeId }; project: Project }) {
  const next = getNextProject(project.slug);
  const labels = content.projects;

  return (
    <div data-theme={theme.id} className="min-h-dvh bg-page text-fg">
      <ThemeSync theme={theme.id} />

      <header className="sticky top-0 z-40 border-b border-line bg-page/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[calc(1124px+4rem)] items-center justify-between gap-4 px-4 text-xs md:px-8">
          <Link
            href={theme.path}
            className="-ms-2 flex shrink-0 items-center gap-1.5 rounded-full px-2 py-1.5 transition-colors duration-150 ease-out outline-none hover:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
            {labels.backLabel}
          </Link>
          <p className="hidden truncate text-muted-foreground sm:block">
            {theme.profile.name} · {theme.profile.role}
          </p>
          <p className="truncate text-muted-foreground">
            {theme.time.location} · <LocalTime timeZone={theme.time.timezone} />
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-[calc(1124px+4rem)] px-4 pt-10 pb-16 md:px-8 md:pt-16 md:pb-24">
        <div className={cn(enter, "flex flex-col gap-3")}>
          <p className="text-xs text-muted-foreground">
            {project.category} · {project.period}
          </p>
          <h1 className="text-[clamp(2rem,7vw,4.5rem)] leading-[1.05] font-medium tracking-tight text-balance">
            {project.title}
          </h1>
        </div>

        <div className={cn(enter, "mt-8 delay-100 md:mt-12")}>
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              width={1600}
              height={900}
              priority
              sizes="(min-width: 1188px) 1124px, 100vw"
              className="image-outline aspect-video w-full rounded-card object-cover"
            />
          ) : (
            <TypeCover project={project} />
          )}
        </div>

        <section
          className={cn(enter, "mt-10 grid gap-10 delay-200 md:mt-16 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:gap-16")}
        >
          <div className="flex flex-col gap-6">
            <p className="text-lg leading-[1.5] text-pretty md:text-xl">{project.intro}</p>
            <div>
              <h2 className="sr-only">{labels.stackLabel}</h2>
              <ul className="flex flex-wrap gap-1.5 text-xs">
                {project.stack.map((item) => (
                  <li key={item} className="rounded-full bg-item px-2.5 py-1 text-muted-foreground shadow-[0_0_0_1px_var(--line)]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <dl className="grid grid-cols-3 gap-4 text-xs md:grid-cols-1 md:gap-0">
              {project.meta.map((item) => (
                <div
                  key={item.label}
                  className="flex min-w-0 flex-col gap-1 md:flex-row md:justify-between md:gap-4 md:border-b md:border-line md:py-3"
                >
                  <dt className="text-muted-foreground">{item.label}</dt>
                  <dd className="font-medium text-pretty md:text-end">
                    {item.label === "Status" ? (
                      <StatusBadge value={item.value} />
                    ) : (
                      <CompanyValue value={item.value} logos={labels.companyLogos} theme={theme.id} />
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            {project.link ? <ProjectLink link={project.link} /> : null}
          </div>
        </section>

        {project.gallery.length > 0 ? (
          <div className="mt-16 flex flex-col gap-4 md:mt-24 md:gap-6">
            {project.gallery.map((image) => (
              <Image
                key={image.src}
                src={image.src}
                alt={image.alt}
                width={1600}
                height={900}
                sizes="(min-width: 1188px) 1124px, 100vw"
                className="image-outline h-auto w-full rounded-card bg-card"
              />
            ))}
          </div>
        ) : null}

        <div className="mt-16 md:mt-24">
          {project.sections.map((section) => (
            <section key={section.title} className="grid gap-3 border-t border-line py-8 md:grid-cols-2 md:gap-16 md:py-12">
              <h2 className="text-sm font-medium">{section.title}</h2>
              <p className="text-base leading-[1.6] text-pretty text-muted-foreground md:text-lg md:text-fg">{section.text}</p>
            </section>
          ))}
        </div>

        <Link
          href={getProjectHref(theme.path, next.slug)}
          className="group mt-8 flex items-center gap-4 rounded-card bg-card p-3 shadow-(--card-shadow) transition-colors duration-150 ease-out outline-none focus-visible:ring-2 focus-visible:ring-ring sm:gap-6 sm:p-4 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-item-hover"
        >
          <ProjectThumb project={next} className="sm:size-20" />
          <span className="min-w-0 flex-1">
            <span className="block text-xs text-muted-foreground">{labels.nextLabel}</span>
            <span className="block truncate text-lg font-medium sm:text-2xl">{next.title}</span>
          </span>
          <ArrowRight
            className="size-5 shrink-0 transition-transform duration-200 ease-out-strong group-hover:translate-x-1"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </Link>
      </main>

      <div className="mx-auto max-w-[calc(1124px+4rem)] px-4 md:px-8">
        <SiteFooter />
      </div>
    </div>
  );
}

function ProjectLink({ link }: { link: { label: string; href: string } }) {
  const external = isExternal(link.href);
  return (
    <a
      href={link.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={cn(buttonVariants({ variant: "widget", size: "pill" }), "h-9 w-full sm:w-auto md:w-full")}
    >
      <span className="truncate">{link.label}</span>
      <ArrowUpRight strokeWidth={1.5} aria-hidden="true" />
    </a>
  );
}

/** Stand-in cover for projects without imagery: app icon and title set large on a card surface with a dot grid. */
function TypeCover({ project }: { project: Project }) {
  return (
    <div
      aria-hidden="true"
      className="relative flex aspect-4/3 w-full flex-col justify-between overflow-hidden rounded-card bg-card p-5 shadow-(--card-shadow) sm:aspect-video md:p-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(var(--line)_1px,transparent_1px)] bg-size-[18px_18px] mask-[radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="relative flex items-center gap-3">
        {project.icon ? (
          <Image
            src={project.icon}
            alt=""
            width={96}
            height={96}
            unoptimized
            className="image-outline size-10 rounded-lg object-cover md:size-12 md:rounded-xl"
          />
        ) : null}
        <p className="text-xs text-muted-foreground">{project.category}</p>
      </div>
      <p className="relative text-[clamp(2.5rem,12vw,9rem)] leading-none font-medium tracking-tighter text-balance">
        {project.title}
      </p>
      <p className="relative max-w-md text-sm text-pretty text-muted-foreground">{project.description}</p>
    </div>
  );
}

/** Status pill: amber with a pulsing dot while in progress, green once done. */
const statusTones = {
  active: "bg-amber-500/15 text-amber-600 dark:text-amber-400 [--dot:var(--color-amber-500)]",
  done: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 [--dot:var(--color-emerald-500)]",
} as const;

function StatusBadge({ value }: { value: string }) {
  const done = /complete|live|shipped|launched/i.test(value);
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 leading-normal", statusTones[done ? "done" : "active"])}>
      <span className="relative flex size-1.5" aria-hidden="true">
        {done ? null : (
          <span className="absolute inset-0 animate-[status-ping_2.4s_cubic-bezier(0.23,1,0.32,1)_infinite] rounded-full bg-(--dot)" />
        )}
        <span className="relative size-1.5 rounded-full bg-(--dot)" />
      </span>
      {value}
    </span>
  );
}

/** Company name with its emblem, when we have one; picks the emblem made for the current theme. */
function CompanyValue({
  value,
  logos,
  theme,
}: {
  value: string;
  logos: Record<string, Record<ThemeId, string>>;
  theme: ThemeId;
}) {
  const logo = logos[value]?.[theme];
  if (!logo) return value;

  return (
    <span className="inline-flex items-center gap-1.5">
      <Image src={logo} alt="" width={32} height={32} className="size-4 shrink-0 object-contain" />
      {value}
    </span>
  );
}
