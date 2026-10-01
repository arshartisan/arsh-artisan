import Image from "next/image";
import { isExternal } from "../pill-link";
import { WidgetCard } from "../widget-card";

type Testimonial = { quote: string; author: string; role: string; avatar: string; href?: string };

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { href } = testimonial;
  const external = href ? isExternal(href) : false;

  return (
    <WidgetCard tone="alt" className="transition-colors duration-150 ease-out has-[a:hover]:bg-item-hover max-md:order-9">
      <figure className="flex flex-1 flex-col justify-between gap-3">
        <blockquote className="line-clamp-5 pt-1 text-pretty leading-[1.45] font-medium">
          {href ? (
            <a
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              className="outline-none after:absolute after:inset-0 after:rounded-card focus-visible:after:ring-2 focus-visible:after:ring-ring focus-visible:after:ring-inset"
            >
              “{testimonial.quote}”
            </a>
          ) : (
            <>“{testimonial.quote}”</>
          )}
        </blockquote>
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
