import Image from "next/image";
import { WidgetCard } from "../widget-card";
import { isExternal } from "../pill-link";

type Project = { title: string; description: string; image: string; href: string };

export function ProjectsCard({ projects }: { projects: { label: string; items: Project[] } }) {
  return (
    <WidgetCard label={projects.label} span="2x2" bodyClassName="justify-end pt-2.5">
      <ul className="flex flex-col gap-2.5">
        {projects.items.map((project) => {
          const external = isExternal(project.href);
          return (
            <li key={project.title}>
              <a
                href={project.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                className="flex items-center gap-4 rounded-item bg-item p-2.5 transition-colors duration-150 ease-out outline-none focus-visible:ring-2 focus-visible:ring-ring [@media(hover:hover)_and_(pointer:fine)]:hover:bg-item-hover"
              >
                <Image
                  src={project.image}
                  alt=""
                  width={120}
                  height={120}
                  className="image-outline size-15 shrink-0 rounded-full object-cover"
                />
                <span className="min-w-0 leading-[1.45]">
                  <span className="block font-medium">{project.title}</span>
                  <span className="block text-pretty text-muted-foreground">{project.description}</span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </WidgetCard>
  );
}
