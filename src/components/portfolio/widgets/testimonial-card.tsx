import Image from "next/image";
import { WidgetCard } from "../widget-card";

type Testimonial = { quote: string; author: string; role: string; avatar: string };

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <WidgetCard tone="alt">
      <figure className="flex flex-1 flex-col justify-between gap-3">
        <blockquote className="pt-1 text-pretty leading-[1.45] font-medium">„{testimonial.quote}“</blockquote>
        <figcaption className="flex items-center gap-2.5">
          <Image
            src={testimonial.avatar}
            alt=""
            width={60}
            height={60}
            className="image-outline size-7.5 shrink-0 rounded-full object-cover"
          />
          <span className="min-w-0 leading-[1.35] text-muted-foreground">
            <span className="block truncate">{testimonial.author}</span>
            <span className="block truncate">{testimonial.role}</span>
          </span>
        </figcaption>
      </figure>
    </WidgetCard>
  );
}
