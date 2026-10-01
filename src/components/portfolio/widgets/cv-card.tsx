import { FileText } from "lucide-react";
import type { Content } from "@/lib/content";
import { PillLink } from "../pill-link";
import { WidgetCard } from "../widget-card";

const page = "absolute inset-0 rounded-md bg-item shadow-[0_0_0_1px_var(--line)] transition-transform duration-300 ease-out-strong";

export function CVCard({ cv }: { cv: Content["cv"] }) {
  return (
    <WidgetCard label={cv.label} meta={cv.meta} tone="alt" className="group/cv max-md:order-12" bodyClassName="justify-between gap-2 pt-2.5">
      {/* A small stack of pages that fans out on hover. */}
      <div aria-hidden="true" className="flex flex-1 items-center justify-center">
        <div className="relative h-16 w-12.5">
          <div className={`${page} -rotate-8 [@media(hover:hover)_and_(pointer:fine)]:group-hover/cv:-translate-x-1.5 [@media(hover:hover)_and_(pointer:fine)]:group-hover/cv:-rotate-12`} />
          <div className={`${page} rotate-6 [@media(hover:hover)_and_(pointer:fine)]:group-hover/cv:translate-x-1.5 [@media(hover:hover)_and_(pointer:fine)]:group-hover/cv:rotate-12`} />
          <div className="absolute inset-0 flex flex-col gap-1 rounded-md bg-(--surface) p-2 shadow-[0_0_0_1px_var(--line-soft)] transition-transform duration-300 ease-out-strong [@media(hover:hover)_and_(pointer:fine)]:group-hover/cv:-translate-y-1">
            <FileText className="mb-0.5 size-3.5 text-fg" strokeWidth={1.5} />
            <span className="h-0.5 w-full rounded-full bg-faint" />
            <span className="h-0.5 w-4/5 rounded-full bg-faint" />
            <span className="h-0.5 w-full rounded-full bg-faint" />
            <span className="h-0.5 w-3/5 rounded-full bg-faint" />
          </div>
        </div>
      </div>
      <PillLink href={cv.download.href} icon="download">
        {cv.download.label}
      </PillLink>
    </WidgetCard>
  );
}
