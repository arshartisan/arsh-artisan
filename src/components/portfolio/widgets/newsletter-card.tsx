"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { labelSwapVariants, swapTransition, swapVariants } from "@/lib/motion";
import { WidgetCard } from "../widget-card";

type Newsletter = { label: string; placeholder: string; action: string; success: string; invalid: string };
type Status = "idle" | "invalid" | "success";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterCard({ newsletter }: { newsletter: Newsletter }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const inputId = useId();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "success") return;
    if (!EMAIL.test(email.trim())) {
      setStatus("invalid");
      return;
    }
    // Wire up your email provider here (e.g. a Server Action or API route).
    setStatus("success");
    setEmail("");
  }

  const label = status === "success" ? newsletter.success : status === "invalid" ? newsletter.invalid : newsletter.action;

  return (
    <WidgetCard label={newsletter.label} bodyClassName="justify-end">
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-2">
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <Input
          id={inputId}
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          placeholder={newsletter.placeholder}
          value={email}
          disabled={status === "success"}
          aria-invalid={status === "invalid" || undefined}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === "invalid") setStatus("idle");
          }}
          className="h-7.5 rounded-full border-0 bg-field px-3.5 text-xs shadow-(--field-shadow) placeholder:text-faint md:text-xs dark:bg-field"
        />
        <Button type="submit" variant="widget" size="pill" className="justify-center" aria-live="polite">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={status}
              variants={labelSwapVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={swapTransition}
              className="inline-flex items-center gap-1.5"
            >
              {status === "success" ? (
                <motion.span variants={swapVariants} transition={swapTransition} className="inline-flex">
                  <Check strokeWidth={2} className="size-3" aria-hidden="true" />
                </motion.span>
              ) : null}
              {label}
            </motion.span>
          </AnimatePresence>
        </Button>
      </form>
    </WidgetCard>
  );
}
