import { content } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-line py-5 text-xs text-muted-foreground animate-in fade-in duration-500 ease-out">
      <p>
        © {new Date().getFullYear()} {content.site.copyright}
      </p>
    </footer>
  );
}
