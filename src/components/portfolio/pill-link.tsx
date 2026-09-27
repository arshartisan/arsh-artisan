import { ArrowDown, ArrowUpRight } from "lucide-react";
import type { ComponentProps } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const icons = { arrow: ArrowUpRight, download: ArrowDown };

export function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

type PillLinkProps = ComponentProps<"a"> & {
  href: string;
  icon?: keyof typeof icons;
};

/** Full-width pill with a trailing icon; the widgets' primary action style. */
export function PillLink({ href, icon = "arrow", className, children, ...props }: PillLinkProps) {
  const Icon = icons[icon];
  const external = isExternal(href);

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={cn(buttonVariants({ variant: "widget", size: "pill" }), "w-full", className)}
      {...props}
    >
      <span>{children}</span>
      <Icon strokeWidth={1.5} aria-hidden="true" />
    </a>
  );
}
