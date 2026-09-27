import { content } from "@/lib/content";

export function SiteFooter() {
  const { copyright, credit } = content.site;

  return (
    <footer className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-line py-5 text-xs text-muted-foreground animate-in fade-in duration-500 ease-out">
      <p>
        © {new Date().getFullYear()} {copyright}
      </p>
      <p>
        {credit.label}{" "}
        <a
          href={credit.href}
          target="_blank"
          rel="noreferrer"
          className="transition-colors duration-150 ease-out hover:text-fg"
        >
          {credit.text}
        </a>
      </p>
    </footer>
  );
}
