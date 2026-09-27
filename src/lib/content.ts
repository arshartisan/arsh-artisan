import data from "@/data/data.json";

export type Content = typeof data;
export type Theme = Content["themes"][number];
export type ThemeId = "dark" | "light" | "brutal";
export type SocialPlatform = "x" | "linkedin" | "instagram" | "email";

export const content = data;

export const themes = data.themes as (Theme & { id: ThemeId })[];

export function getTheme(id: string) {
  return themes.find((theme) => theme.id === id);
}

/** Themes that live on their own route segment (everything except "/"). */
export function getSegmentThemes() {
  return themes.filter((theme) => theme.path !== "/");
}
