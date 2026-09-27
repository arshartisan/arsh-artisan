"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { SocialPlatform } from "@/lib/content";
import { socialIcons } from "../icons";
import { isExternal } from "../pill-link";
import { WidgetCard } from "../widget-card";

type Social = { platform: string; label: string; href: string };

export function SocialsCard({ socials }: { socials: { label: string; items: Social[] } }) {
  return (
    <WidgetCard label={socials.label} span="2x1" bodyClassName="items-center justify-center pt-2.5">
      {/* Delay only the first tooltip; neighbours open instantly (Base UI's provider handles this). */}
      <TooltipProvider delay={250} closeDelay={0}>
        <ul className="flex items-center justify-center gap-3 sm:gap-4">
          {socials.items.map((social) => {
            const Icon = socialIcons[social.platform as SocialPlatform];
            const external = isExternal(social.href);
            return (
              <li key={social.platform}>
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <a
                        href={social.href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noreferrer" : undefined}
                        aria-label={social.label}
                      />
                    }
                    className="flex size-13 items-center justify-center rounded-full text-muted-foreground shadow-[0_0_0_1px_var(--line-soft)] transition-[color,background-color,scale] duration-150 ease-out outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.96] sm:size-15 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-item-hover [@media(hover:hover)_and_(pointer:fine)]:hover:text-fg"
                  >
                    <Icon className="size-5" />
                  </TooltipTrigger>
                  <TooltipContent sideOffset={8}>{social.label}</TooltipContent>
                </Tooltip>
              </li>
            );
          })}
        </ul>
      </TooltipProvider>
    </WidgetCard>
  );
}
