import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Portfolio } from "@/components/portfolio/portfolio";
import { getSegmentThemes } from "@/lib/content";

export const dynamicParams = false;

function findTheme(segment: string) {
  return getSegmentThemes().find((theme) => theme.path === `/${segment}`);
}

export function generateStaticParams() {
  return getSegmentThemes().map((theme) => ({ theme: theme.path.slice(1) }));
}

export async function generateMetadata({ params }: PageProps<"/[theme]">): Promise<Metadata> {
  const theme = findTheme((await params).theme);
  if (!theme) return {};
  return { title: `${theme.profile.name} - ${theme.profile.role}` };
}

export default async function ThemePage({ params }: PageProps<"/[theme]">) {
  const theme = findTheme((await params).theme);
  if (!theme) notFound();

  return <Portfolio theme={theme} />;
}
