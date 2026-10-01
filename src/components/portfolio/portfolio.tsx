import { content, themes, type Theme, type ThemeId } from "@/lib/content";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { ThemeSwitcher } from "./theme-switcher";
import { ThemeSync } from "./theme-sync";
import { WidgetGrid } from "./widget-grid";
import { AboutCard } from "./widgets/about-card";
import { ClockCard } from "./widgets/clock-card";
import { ContactCard } from "./widgets/contact-card";
import { CVCard } from "./widgets/cv-card";
import { ProjectsCard } from "./widgets/projects-card";
import { SocialsCard } from "./widgets/socials-card";
import { StatCard } from "./widgets/stat-card";
import { StatusCard } from "./widgets/status-card";
import { TestimonialCard } from "./widgets/testimonial-card";
import { ExperienceCard, SideProjectsCard } from "./widgets/timeline-card";

/**
 * Widget order matters: the grid auto-places in DOM order. At 6 columns this gives
 *   row 1:    Clock · Status · About       · Education
 *   rows 2-3: Experience     · Projects    · Research & Recognition
 *   row 4:    Contact · Quote · Get in touch · Stat · CV
 * and collapses cleanly to 4 and 2 columns.
 */
export function Portfolio({ theme }: { theme: Theme & { id: ThemeId } }) {
  // overflow-x-clip: card glows spill past the grid edges; clip (not hidden) keeps sticky/scroll intact.
  return (
    <div data-theme={theme.id} className="min-h-dvh overflow-x-clip bg-page text-fg">
      <ThemeSync theme={theme.id} />
      <ThemeSwitcher
        label={content.site.themeSwitcher.label}
        current={theme.id}
        themes={themes.map((t) => ({ id: t.id, label: t.label, path: t.path }))}
      />

      <div className="mx-auto max-w-[calc(1124px+4rem)] px-4 md:px-8">
        <SiteHeader profile={theme.profile} />

        <main className="py-8">
          <WidgetGrid>
            <ClockCard time={theme.time} className="max-md:order-1" />
            <StatusCard status={theme.status} className="max-md:order-2" />
            <AboutCard about={theme.about} className="max-md:order-3" />
            <ExperienceCard experience={content.education} tone="alt" span="2x1" className="max-md:order-6" />
            <ExperienceCard experience={content.experience} className="max-md:order-5" />
            <ProjectsCard projects={content.projects} themePath={theme.path} className="max-md:order-4" />
            <SideProjectsCard sideProjects={content.sideProjects} span="2x2" className="max-md:order-7" />
            <ContactCard contact={content.contact} className="max-md:order-8" />
            <TestimonialCard testimonial={content.testimonial} />
            <SocialsCard socials={content.socials} className="max-md:order-10" />
            <StatCard stats={content.stats} className="max-md:order-11" />
            <CVCard cv={content.cv} />
          </WidgetGrid>
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}
