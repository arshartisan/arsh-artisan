"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { getProjectHref, type Content, type Project } from "@/lib/content";
import { cn } from "@/lib/utils";
import { FadeScroll } from "../fade-scroll";
import { WidgetCard } from "../widget-card";

export function ProjectsCard({
  projects,
  themePath,
  className,
}: {
  projects: Content["projects"];
  themePath: string;
  className?: string;
}) {
  return (
    <WidgetCard label={projects.label} span="2x2" className={className} bodyClassName="pt-2.5">
      <FadeScroll label={projects.label}>
        {/* Cursor-following "View more" hint; like the socials, only the first tooltip waits. */}
        <TooltipProvider delay={250} closeDelay={0}>
          <ul className="flex flex-col gap-2.5">
            {projects.items.map((project) => (
              <li key={project.slug}>
                <Tooltip trackCursorAxis="both">
                  <TooltipTrigger
                    render={<Link href={getProjectHref(themePath, project.slug)} />}
                    className="flex items-center gap-4 rounded-item bg-item p-2.5 transition-colors duration-150 ease-out outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset [@media(hover:hover)_and_(pointer:fine)]:hover:bg-item-hover"
                  >
                    <ProjectThumb project={project} />
                    <span className="min-w-0 leading-[1.45]">
                      <span className="block truncate font-medium">{project.title}</span>
                      <span className="line-clamp-2 block text-pretty text-muted-foreground">{project.description}</span>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent sideOffset={14}>
                    {projects.viewLabel}
                    <ArrowUpRight strokeWidth={1.5} className="size-3" aria-hidden="true" />
                  </TooltipContent>
                </Tooltip>
              </li>
            ))}
          </ul>
        </TooltipProvider>
      </FadeScroll>
    </WidgetCard>
  );
}

/** Round thumbnail: the project's app icon, else its cover image, else a monogram. */
export function ProjectThumb({ project, className }: { project: Project; className?: string }) {
  const base = "image-outline size-12 shrink-0 rounded-lg sm:size-15";
  const src = project.icon ?? project.image;

  if (src) {
    // SVG icons skip the optimizer, which only handles raster formats by default.
    return (
      <Image
        src={src}
        alt=""
        width={120}
        height={120}
        unoptimized={src.endsWith(".svg")}
        className={cn(base, "object-cover", className)}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={cn(base, "flex items-center justify-center bg-btn text-sm font-medium text-btn-fg", className)}
    >
      {project.title.slice(0, 2)}
    </span>
  );
}
