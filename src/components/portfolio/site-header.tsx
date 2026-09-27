import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import type { Theme } from "@/lib/content";
import { cn } from "@/lib/utils";
import { isExternal } from "./pill-link";

export function SiteHeader({
  profile,
  action,
}: {
  profile: Theme["profile"];
  action: { label: string; href: string };
}) {
  const external = isExternal(action.href);

  return (
    <header className="flex items-center justify-between gap-4 border-b border-line pt-11 pb-5 text-xs animate-in md:py-5 fade-in duration-500 ease-out">
      <div className="flex min-w-0 items-center gap-4">
        <Image
          src={profile.avatar}
          alt={profile.name}
          width={80}
          height={80}
          priority
          className="image-outline size-10 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0 leading-[1.4]">
          <h1 className="truncate font-medium">{profile.name}</h1>
          <p className="truncate text-muted-foreground">{profile.role}</p>
        </div>
      </div>
      <a
        href={action.href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className={cn(buttonVariants({ variant: "widget", size: "pill" }), "w-37 max-sm:w-auto")}
      >
        <span>{action.label}</span>
        <ArrowUpRight strokeWidth={1.5} aria-hidden="true" />
      </a>
    </header>
  );
}
