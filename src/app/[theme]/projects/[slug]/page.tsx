import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectPage } from "@/components/portfolio/project-page";
import { content, getProject, getSegmentThemes } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getSegmentThemes().flatMap((theme) =>
    content.projects.items.map((project) => ({ theme: theme.path.slice(1), slug: project.slug })),
  );
}

export async function generateMetadata({ params }: PageProps<"/[theme]/projects/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return { title: `${project.title} · ${content.site.copyright}`, description: project.description };
}

export default async function Page({ params }: PageProps<"/[theme]/projects/[slug]">) {
  const { theme: segment, slug } = await params;
  const theme = getSegmentThemes().find((t) => t.path === `/${segment}`);
  const project = getProject(slug);
  if (!theme || !project) notFound();

  return <ProjectPage theme={theme} project={project} />;
}
