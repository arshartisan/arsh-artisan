import Image from "next/image";
import Link from "next/link";
import { getProjectHref, type Content } from "@/lib/content";
import { WidgetCard } from "../widget-card";

export function ProjectsCard({ projects, themePath }: { projects: Content["projects"]; themePath: string }) {
  return (
    <WidgetCard label={projects.label} span="2x2" bodyClassName="justify-end pt-2.5">
      <ul className="flex flex-col gap-2.5">
        {projects.items.map((project) => (
          <li key={project.slug}>
            <Link
              href={getProjectHref(themePath, project.slug)}
              className="flex items-center gap-4 rounded-item bg-item p-2.5 transition-colors duration-150 ease-out outline-none focus-visible:ring-2 focus-visible:ring-ring [@media(hover:hover)_and_(pointer:fine)]:hover:bg-item-hover"
            >
              <Image
                src={project.image}
                alt=""
                width={120}
                height={120}
                className="image-outline size-12 shrink-0 rounded-full object-cover sm:size-15"
              />
              <span className="min-w-0 leading-[1.45]">
                <span className="block truncate font-medium">{project.title}</span>
                <span className="line-clamp-2 block text-pretty text-muted-foreground">{project.description}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </WidgetCard>
  );
}
