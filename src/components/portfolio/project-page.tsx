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

const dateFormat = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

/** Entrance: fade + rise, staggered by `delay`; skipped for reduced motion. */
const enter = "animate-in fade-in slide-in-from-bottom-3 fill-mode-both duration-700 ease-out-strong motion-reduce:animate-none";

export function ProjectPage({ theme, project }: { theme: Theme & { id: ThemeId }; project: Project }) {
  const next = getNextProject(project.slug);
  const external = isExternal(project.link.href);
  const labels = content.projects;

  return (
    <div data-theme={theme.id} className="min-h-dvh bg-page text-fg">
      <ThemeSync theme={theme.id} />

      <header className="sticky top-0 z-40 border-b border-line bg-page/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[calc(1124px+4rem)] items-center justify-between gap-4 px-4 text-xs md:px-8">
          <Link
            href={theme.path}
            className="-ms-2 flex items-center gap-1.5 rounded-full px-2 py-1.5 transition-colors duration-150 ease-out outline-none hover:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
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
            {project.category} · <time dateTime={project.date}>{dateFormat.format(new Date(project.date))}</time>
          </p>
          <h1 className="text-[clamp(2rem,7vw,4.5rem)] leading-[1.05] font-medium tracking-tight text-balance">
            {project.title}
          </h1>
        </div>

        <div className={cn(enter, "delay-100 mt-8 md:mt-12")}>
          <Image
            src={project.image}
            alt={project.title}
            width={1600}
            height={900}
            priority
            sizes="(min-width: 1188px) 1124px, 100vw"
            className="image-outline aspect-4/3 w-full rounded-card object-cover sm:aspect-video"
          />
        </div>

        <section className={cn(enter, "delay-200 mt-10 grid gap-10 md:mt-16 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:gap-16")}>
          <p className="text-lg leading-[1.5] text-pretty md:text-xl">{project.intro}</p>

          <div className="flex flex-col gap-6">
            <dl className="grid grid-cols-3 gap-4 text-xs md:grid-cols-1 md:gap-0">
              {project.meta.map((item) => (
                <div key={item.label} className="flex flex-col gap-1 md:flex-row md:justify-between md:border-b md:border-line md:py-3">
                  <dt className="text-muted-foreground">{item.label}</dt>
                  <dd className="font-medium">{item.value}</dd>
                </div>
              ))}
            </dl>
            <a
              href={project.link.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              className={cn(buttonVariants({ variant: "widget", size: "pill" }), "h-9 w-full sm:w-auto md:w-full")}
            >
              <span>{project.link.label}</span>
              <ArrowUpRight strokeWidth={1.5} aria-hidden="true" />
            </a>
          </div>
        </section>

        {project.gallery.length > 0 ? (
          <div className="mt-16 flex flex-col gap-4 md:mt-24 md:gap-6">
            {project.gallery.map((image) => (
              <Image
                key={image.src}
                src={image.src}
                alt={image.alt}
                width={1024}
                height={682}
                sizes="(min-width: 1188px) 1124px, 100vw"
                className="image-outline aspect-4/3 w-full rounded-card object-cover sm:aspect-3/2"
              />
            ))}
          </div>
        ) : null}

        <div className="mt-16 md:mt-24">
          {project.sections.map((section) => (
            <section
              key={section.title}
              className="grid gap-3 border-t border-line py-8 md:grid-cols-2 md:gap-16 md:py-12"
            >
              <h2 className="text-sm font-medium">{section.title}</h2>
              <p className="text-base leading-[1.6] text-pretty text-muted-foreground md:text-lg md:text-fg">{section.text}</p>
            </section>
          ))}
        </div>

        <Link
          href={getProjectHref(theme.path, next.slug)}
          className="group mt-8 flex items-center gap-4 rounded-card bg-card p-3 shadow-(--card-shadow) outline-none transition-colors duration-150 ease-out focus-visible:ring-2 focus-visible:ring-ring sm:gap-6 sm:p-4 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-item-hover"
        >
          <Image
            src={next.image}
            alt=""
            width={160}
            height={160}
            className="image-outline size-16 shrink-0 rounded-item object-cover sm:size-20"
          />
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
