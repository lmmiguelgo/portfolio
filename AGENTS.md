<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project: Miguel González — Portfolio

## Stack
- **Next.js 16.2.6** — App Router, Turbopack (default). No Pages Router.
- **React 19**
- **TypeScript**
- **Tailwind CSS v4** — uses `@import "tailwindcss"` and `@custom-variant`, NOT the old `tailwind.config.js` approach
- **Framer Motion** — for entrance animations (`whileInView`, `initial/animate`)
- **react-pdf** — inline PDF viewer, loaded client-side only via `ResumeLazy.tsx`
- **googleapis** — Google Calendar API (server-side, API route only)
- **react-hook-form + zod + @hookform/resolvers** — form validation

## Key conventions

### Turbopack (Next.js 16 default)
- Do NOT use `webpack` config in `next.config.ts` — use `turbopack` key instead
- `ssr: false` in `dynamic()` is **not allowed in Server Components** — wrap it in a `"use client"` component first (see `ResumeLazy.tsx`)
- API routes use Web `Request`/`Response` — not `req/res`. See `src/app/api/schedule/route.ts`

### Theming
- Dark by default. Light mode toggled via `.light` class on `<html>`
- Theme is stored in `localStorage` and applied before hydration via an inline `<script>` in `layout.tsx` (no flash)
- CSS variables: `--background`, `--foreground`, `--accent`, `--accent-hover`, `--muted`, `--border`, `--card`, `--card-hover`
- Always use `bg-[var(--background)]` style references — do NOT use Tailwind `dark:` prefix classes

### Component rules
- All interactive components must be `"use client"`
- Server Components: `page.tsx`, `layout.tsx`, `Footer.tsx`
- Client Components: everything else (Navbar, Hero, About, TechStack, FeaturedProjects, Resume, Contact, ThemeProvider)

## File structure
```
src/
  app/
    layout.tsx          # Root layout — ThemeProvider, no-flash script, metadata
    page.tsx            # Composes all sections (Server Component)
    globals.css         # Tailwind v4 + CSS variables + dark/light vars
    api/
      schedule/
        route.ts        # POST — creates Google Calendar event + sends invites
  components/
    ThemeProvider.tsx   # Context + toggle logic, saves to localStorage
    Navbar.tsx          # Fixed header, nav links, EN/ES badges, theme toggle
    Hero.tsx            # Full-height landing — name, tagline, CTA buttons
    About.tsx           # Bio section, no profile photo
    TechStack.tsx       # Categorized tech tags grid
    FeaturedProjects.tsx # 5 project cards with gradient thumbnails + View Site links
    Resume.tsx          # react-pdf Document/Page viewer + Download button
    ResumeLazy.tsx      # "use client" wrapper for ssr:false dynamic import
    Contact.tsx         # Schedule form → POST /api/schedule
    Footer.tsx          # Links, EN/ES note, copyright
  lib/                  # (reserved for shared utilities)
public/
  resume.pdf            # Placeholder — replace with real PDF
empty-module.ts         # Canvas alias stub for react-pdf + Turbopack
```

## Google Calendar integration
- `POST /api/schedule` — requires `GOOGLE_SERVICE_ACCOUNT_JSON` and `GOOGLE_CALENDAR_ID` env vars
- See `.env.example` for setup instructions
- Creates a 1-hour event, sends email invites to both visitor and owner, includes Google Meet link
- Timezone: `America/Puerto_Rico`

## Content to update
- **Bio text** — `About.tsx` has placeholder copy
- **Tech stack** — `TechStack.tsx` categories are a starting point; update to match real tools
- **Project descriptions** — `FeaturedProjects.tsx` has placeholder descriptions for each of the 5 sites
- **Resume** — replace `public/resume.pdf` with the real PDF
- **Metadata** — update `title` and `description` in `layout.tsx`
- **Name/location** — update `About.tsx` highlights (currently "Puerto Rico") and `Hero.tsx` name
