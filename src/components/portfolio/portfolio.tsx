import { content, themes, type Theme, type ThemeId } from "@/lib/content";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { ThemeSwitcher } from "./theme-switcher";
import { ThemeSync } from "./theme-sync";
import { WidgetGrid } from "./widget-grid";
import { AboutCard } from "./widgets/about-card";
import { ClockCard } from "./widgets/clock-card";
import { CVCard } from "./widgets/cv-card";
import { FeaturedCard } from "./widgets/featured-card";
import { NewsletterCard } from "./widgets/newsletter-card";
import { ProjectsCard } from "./widgets/projects-card";
import { SocialsCard } from "./widgets/socials-card";
import { StatCard } from "./widgets/stat-card";
import { StatusCard } from "./widgets/status-card";
import { TestimonialCard } from "./widgets/testimonial-card";
import { ExperienceCard, SideProjectsCard } from "./widgets/timeline-card";

/**
 * Widget order matters: the grid auto-places in DOM order, which reproduces the
 * bento layout at 6 columns and collapses cleanly to 4 and 2.
 */
export function Portfolio({ theme }: { theme: Theme & { id: ThemeId } }) {
  return (
    <div data-theme={theme.id} className="min-h-dvh bg-page text-fg">
      <ThemeSync theme={theme.id} />
      <ThemeSwitcher
        label={content.site.themeSwitcher.label}
        current={theme.id}
        themes={themes.map((t) => ({ id: t.id, label: t.label, path: t.path, avatar: t.profile.avatar }))}
      />

      <div className="mx-auto max-w-[calc(1124px+4rem)] px-4 md:px-8">
        <SiteHeader profile={theme.profile} />

        <main className="py-8">
          <WidgetGrid>
            <ClockCard time={theme.time} />
            <StatusCard status={theme.status} />
            <AboutCard about={theme.about} />
            <ExperienceCard experience={content.experience} />
            <ProjectsCard projects={content.projects} themePath={theme.path} />
            <SocialsCard socials={content.socials} />
            <FeaturedCard featured={theme.featured} />
            <SideProjectsCard sideProjects={content.sideProjects} />
            <NewsletterCard newsletter={content.newsletter} />
            <TestimonialCard testimonial={content.testimonial} />
            <StatCard stat={theme.stat} />
            <CVCard cv={content.cv} />
          </WidgetGrid>
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}
