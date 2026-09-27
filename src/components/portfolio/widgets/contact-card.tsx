import type { Content } from "@/lib/content";
import { PillLink } from "../pill-link";
import { WidgetCard } from "../widget-card";

export function ContactCard({ contact }: { contact: Content["contact"] }) {
  return (
    <WidgetCard label={contact.label} bodyClassName="justify-end gap-2.5">
      <p className="text-pretty leading-[1.45] font-medium">{contact.text}</p>
      <PillLink href={contact.action.href} icon="arrow">
        {contact.action.label}
      </PillLink>
    </WidgetCard>
  );
}
