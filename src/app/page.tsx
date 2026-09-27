import { notFound } from "next/navigation";
import { Portfolio } from "@/components/portfolio/portfolio";
import { themes } from "@/lib/content";

export default function Home() {
  const theme = themes.find((t) => t.path === "/");
  if (!theme) notFound();

  return <Portfolio theme={theme} />;
}
