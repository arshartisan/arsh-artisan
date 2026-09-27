# FF Widgets — Portfolio

A widget-grid ("bento") portfolio built with Next.js 16, shadcn/ui (Base UI), Tailwind CSS v4 and Framer Motion. It ships three themes, each on its own route:

| Route     | Theme  |
| --------- | ------ |
| `/`       | Dark   |
| `/light`  | Light  |
| `/brutal` | Brutal |

## Editing content

**All content lives in [`src/data/data.json`](src/data/data.json).** Nothing is hard-coded in the components.

- `site`: page title and description, footer, the header button, and the theme switcher label.
- `themes[]`: the per-theme persona. That covers the profile, clock (`timezone` is an IANA zone such as `Europe/London`), status, about text, featured work, and the stat counter. The `path` field sets the route. Add or remove themes here; the matching token block also needs to exist in `globals.css`.
- `experience`, `projects`, `socials`, `sideProjects`, `newsletter`, `testimonial`, `cv`: content shared by every theme.

Images live in `public/images/`, and the CV is `public/cv.pdf`. The images are the template's placeholders, so replace them with your own.

The newsletter form validates the email address on the client and shows a success state. To actually collect addresses, connect it to your provider in `onSubmit` in `src/components/portfolio/widgets/newsletter-card.tsx`.

## Structure

```
src/
  data/data.json                 ← single source of content
  lib/content.ts                 ← typed accessors over data.json
  lib/motion.ts                  ← shared easing / variants
  app/page.tsx, app/[theme]/     ← routes (statically generated)
  components/portfolio/          ← header, footer, grid, card shell, theme switcher
  components/portfolio/widgets/  ← one file per widget
  components/ui/                 ← shadcn primitives
```

Theme colors are CSS custom properties keyed on `[data-theme]` in `src/app/globals.css`.

## Design skills

The `better-ui` and `emil-design-eng` skills are installed in `.claude/skills/`. The UI follows them in these ways:

- Strong custom ease-out curves and a staggered entrance of opacity, blur and translate.
- `scale(0.96)` when buttons are pressed, and every transition names its properties explicitly.
- Transitions are switched off during a theme swap, and the switcher opens with a `clip-path` reveal.
- Label and icon changes use a blur crossfade, and hover effects only apply to devices with a fine pointer.
- Cards use a shadow instead of a border, and images get a 1px outline.
- Motion is reduced when the user asks for it.

## Scripts

```bash
npm run dev     # http://localhost:3000
npm run build
npm run lint
```
