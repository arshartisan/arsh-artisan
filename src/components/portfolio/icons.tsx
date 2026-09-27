import { Mail } from "lucide-react";
import type { SVGProps } from "react";
import type { SocialPlatform } from "@/lib/content";

type IconProps = SVGProps<SVGSVGElement>;

function XIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77L17.75 3Zm-1.08 16.17h1.7L7.4 4.74H5.58l11.09 14.43Z" />
    </svg>
  );
}

function LinkedInIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A1.97 1.97 0 1 0 5.25 6.94 1.97 1.97 0 0 0 5.25 3ZM20.44 13.4c0-3.1-1.65-5.15-4.46-5.15-1.6 0-2.62.83-3.06 1.63V8.5H9.66V20h3.38v-5.93c0-1.56.3-3.08 2.23-3.08 1.9 0 1.93 1.78 1.93 3.18V20h3.38l-.14-6.6Z" />
    </svg>
  );
}

function InstagramIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.25" cy="6.75" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

function EmailIcon(props: IconProps) {
  return <Mail strokeWidth={1.5} aria-hidden="true" {...props} />;
}

export const socialIcons: Record<SocialPlatform, (props: IconProps) => React.ReactNode> = {
  x: XIcon,
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
  email: EmailIcon,
};
