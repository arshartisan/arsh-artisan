"use client";

import { Mail } from "lucide-react";
import { FuseButton } from "@/components/ui/fuse-button";
import type { Content } from "@/lib/content";
import { WidgetCard } from "../widget-card";

/** Press "Contact Me": a fuse burns while it offers Cancel, then the mail client opens. */
export function ContactCard({ contact }: { contact: Content["contact"] }) {
  return (
    <WidgetCard label={contact.label} bodyClassName="justify-end gap-2.5">
      <p className="text-pretty leading-[1.45] font-medium">{contact.text}</p>
      <FuseButton
        fullWidth
        size="xs"
        radius={14}
        label={contact.action.label}
        undoLabel={contact.action.cancelLabel}
        doneLabel={contact.action.doneLabel}
        icon={<Mail strokeWidth={1.5} />}
        color="var(--btn-fg)"
        background="var(--btn)"
        undoWindow={contact.action.delay}
        commitOn="fuseEnd"
        onCommit={() => {
          window.location.href = contact.action.href;
        }}
      />
    </WidgetCard>
  );
}
