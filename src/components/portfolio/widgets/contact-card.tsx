"use client";

import { Mail, Send } from "lucide-react";
import { FuseButton } from "@/components/ui/fuse-button";
import type { Content } from "@/lib/content";
import { WidgetCard } from "../widget-card";

/**
 * "Contact Me" opens the mail client on press (inside the click, so the browser
 * allows it); the fuse then burns as a brief "Opening email" confirmation.
 */
export function ContactCard({ contact }: { contact: Content["contact"] }) {
  return (
    <WidgetCard label={contact.label} bodyClassName="justify-end gap-2.5">
      <p className="text-pretty leading-[1.45] font-medium">{contact.text}</p>
      <FuseButton
        fullWidth
        size="xs"
        radius={14}
        label={contact.action.label}
        undoLabel={contact.action.openingLabel}
        doneLabel={contact.action.openingLabel}
        icon={<Mail strokeWidth={1.5} />}
        undoIcon={<Send strokeWidth={1.5} />}
        color="var(--btn-fg)"
        background="var(--btn)"
        undoWindow={1500}
        commitOn="press"
        onCommit={() => {
          window.location.href = contact.action.href;
        }}
      />
    </WidgetCard>
  );
}
