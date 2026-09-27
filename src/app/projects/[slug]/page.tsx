import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectPage } from "@/components/portfolio/project-page";
import { content, getProject, themes } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return content.projects.items.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return { title: `${project.title} · ${content.site.copyright}`, description: project.description };
}

export default async function Page({ params }: PageProps<"/projects/[slug]">) {
  const theme = themes.find((t) => t.path === "/");
  const project = getProject((await params).slug);
  if (!theme || !project) notFound();

  return <ProjectPage theme={theme} project={project} />;
}
