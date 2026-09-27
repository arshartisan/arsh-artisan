import data from "@/data/data.json";

export type Content = typeof data;
export type Theme = Content["themes"][number];
export type ThemeId = "dark" | "light" | "brutal";
export type SocialPlatform = "x" | "github" | "linkedin" | "instagram" | "email";

export const content = data;

export const themes = data.themes as (Theme & { id: ThemeId })[];

export function getTheme(id: string) {
  return themes.find((theme) => theme.id === id);
}

/** Themes that live on their own route segment (everything except "/"). */
export function getSegmentThemes() {
  return themes.filter((theme) => theme.path !== "/");
}

export type Project = Content["projects"]["items"][number];

export function getProject(slug: string) {
  return content.projects.items.find((project) => project.slug === slug);
}

/** The project after `slug`, wrapping around to the first. */
export function getNextProject(slug: string) {
  const items = content.projects.items;
  const index = items.findIndex((project) => project.slug === slug);
  return items[(index + 1) % items.length];
}

/** Project URLs live under the current theme so the page keeps its look. */
export function getProjectHref(themePath: string, slug: string) {
  return `${themePath === "/" ? "" : themePath}/projects/${slug}`;
}
