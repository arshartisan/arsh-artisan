import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import type { Theme } from "@/lib/content";
import { isExternal } from "../pill-link";
import { WidgetCard, WidgetHeader } from "../widget-card";

export function FeaturedCard({ featured }: { featured: Theme["featured"] }) {
  const external = isExternal(featured.href);

  return (
    <WidgetCard span="2x2" className="group/featured isolate">
      <Image
        src={featured.image}
        alt={featured.imageAlt}
        fill
        sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
        className="-z-10 object-cover transition-transform duration-700 ease-out-strong [@media(hover:hover)_and_(pointer:fine)]:group-hover/featured:scale-[1.03]"
      />
      <WidgetHeader
        className="border-(--media-line) text-(--media-fg) [&_div]:text-(--media-fg)"
        label={featured.label}
        meta={
          <a
            href={featured.href}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            className="inline-flex items-center gap-1 outline-none after:absolute after:inset-0 after:rounded-card focus-visible:after:ring-2 focus-visible:after:ring-(--media-fg) focus-visible:after:ring-inset"
          >
            {featured.linkLabel}
            <ArrowUpRight strokeWidth={1.5} className="size-3" aria-hidden="true" />
          </a>
        }
      />
    </WidgetCard>
  );
}
