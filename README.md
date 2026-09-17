# Arizona Sound System

Landing page and quote form for **Arizona Sound System**, a turn-key sound rental for events across Arizona. High-end line array tops and subs, booth monitors and a battery power station for silent power where generators can't go, sized for crowds up to a thousand.

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · DynamoDB · SES · deployed on AWS Amplify Hosting.

| Route          | What it is                                                   |
| -------------- | ------------------------------------------------------------ |
| `/`            | The landing page, with the quote form at `#contact`          |
| `/privacy`     | Privacy policy, written to match what the code actually does |
| `/api/inquiry` | `POST` target for the form                                   |

Contact details live in one place, `contact` in [`content/site.ts`](content/site.ts): **(804) 517-8968** and **hello@azsoundsystem.com**.

---

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

**No AWS account needed to develop.** With no environment variables set, form submissions are written to `.data/inquiries.json` and no email goes out. That fallback is hard-disabled when `NODE_ENV=production`.

### Scripts

| Command                           | What it does                                                     |
| --------------------------------- | ---------------------------------------------------------------- |
| `npm run dev`                     | Dev server with hot reload                                       |
| `npm run build` / `npm start`     | Production build and serve                                       |
| `npm run typecheck`               | `tsc --noEmit`                                                   |
| `npm run lint`                    | ESLint (Next core-web-vitals + TypeScript)                       |
| `npm run format` / `format:check` | Prettier, with Tailwind class sorting                            |
| `npm run test`                    | Unit tests. Node's built-in runner, no test framework to install |
| **`npm run check`**               | **All of the above. Run this before pushing.**                   |

Node 22.18+ is required (`.nvmrc` pins 24.11.0). Tests are written in TypeScript and run through Node's native type stripping, so there is no compile step.

### Deploying

See [DEPLOY.md](DEPLOY.md). One CloudFormation command creates the DynamoDB tables and the SES identity; Amplify builds from Git.

```
push / PR ──> GitHub Actions (.github/workflows/ci.yml)
                typecheck · lint · format · test · build · cfn-lint
          └──> Amplify Hosting (main branch)
                npm install → next build → CloudFront + Lambda
```

Amplify's own build is the deploy step; GitHub Actions is the gate that catches a broken build before it ships. Infrastructure changes are manual: `.github/workflows/infra.yml` → **Run workflow** deploys the CloudFormation stack via OIDC (no long-lived AWS keys), printing the change set first.

---

## Architecture

```
Browser ──> Amplify Hosting (CloudFront + Lambda, Next.js SSR)
              │
              ├─ /              landing page, static
              ├─ /privacy       static
              │
              └─ POST /api/inquiry ──> DynamoDB (submissions, ratelimit)
                                   └─> SES (acknowledgement + team alert)
```

- **Copy lives in [`content/site.ts`](content/site.ts)**: headline, the gear list, the power section, the process steps, event types on the form, footer links and contact details. Components carry no wording of their own.
- **Photographs** live in `public/media/`. Point a slot at one (`image: "/media/rig-01.jpg"`) and it renders as an optimized `next/image`; leave it `null` and a designed gradient shows instead, with the shot note as a caption.
- **The form** posts to `/api/inquiry`. Validation rules in [`lib/validation.ts`](lib/validation.ts) run in the browser and again on the server, so a crafted payload can't bypass the client. The route also has a honeypot field and a per-IP sliding-window rate limit stored in DynamoDB so it holds across Lambda instances.
- **Email** is best-effort and runs after the DynamoDB write inside its own try/catch, so a bad SES setup can never lose an inquiry. The person who asked gets an acknowledgement; the team gets the inquiry with Reply-To set to the sender, so hitting reply answers them directly.
- **No cookies, no analytics, no third-party scripts.** The privacy page says so and there is nothing to consent to, so there is no banner.

---

## Where to edit things

**Contact details.** `contact` in `content/site.ts`. The phone is stored twice on purpose: once as displayed, once in E.164 for `tel:` links and structured data.

**The gear.** `gear` in `content/site.ts` is the three cards under "What shows up". `crowd.max` is the one number the page claims.

**Photographs.** Drop the file in `public/media/` and set the path on the slot. The originals from the camera stay in `media/`, which is git-ignored; the web-sized copies are the ones that ship. Slots: `hero.image`, `power.image`, `image` on each entry in `gear`, and the two entries in `gallerySlots`. Photographs fill their frame; the four product cutouts (`sub.png`, `top.png`, `booth.png`, `power.png`, transparent backgrounds) render contained over the tone gradient instead, so nothing gets cropped off.

**Who gets the inquiry.** `notifications.inquiry` in `content/site.ts`, or `INQUIRY_NOTIFY_ADDRESS` per environment.

**The logo.** `components/Wordmark.tsx` redraws the mark as SVG from the supplied PNG, so it scales and sits on light and dark surfaces. The bar outlines cut through the sun using `--mark-cutout`, which `.on-light` sections set to bone. The raster copy at `public/media/logo.png` is for emails and the share card only.

---

## Design system

| Token                | Value                 | Use                                       |
| -------------------- | --------------------- | ----------------------------------------- |
| `night` / `char`     | `#0b0a09` / `#1e1a16` | The resting surface, off the logo's black |
| `bone` / `bone-soft` | `#f4ede2` / `#faf6ee` | Light sections and form fields            |
| `sand`               | `#e8dcc6`             | Warm alternate light surface              |
| `ink`                | `#191713`             | Text on light surfaces                    |
| `sun` / `sun-soft`   | `#e2a233` / `#f0c66e` | Primary accent, the top of the sun        |
| `ember`              | `#e4592c`             | The bottom of the sun, in gradients       |
| `terracotta`         | `#c25a3a`             | The bars; `terracotta-deep` for errors    |

Type pairs **Bricolage Grotesque** (display) with **Inter Tight** (UI/body), both self-hosted via `next/font`, no external font requests at runtime.

---

## Accessibility

- Semantic landmarks, ordered headings, skip link
- The mobile menu uses a native `<dialog>`: real focus trapping, Escape, top layer
- Visible focus rings that flip colour on light surfaces
- `prefers-reduced-motion` disables every transition, reveal and animation
- Form: persistent labels, `aria-invalid`, `aria-describedby`, `role="alert"` errors, focus moved to the first invalid field on submit

## What gets logged with an inquiry

| Captured                       | From                                                                                         |
| ------------------------------ | -------------------------------------------------------------------------------------------- |
| IP address                     | `x-forwarded-for` (first entry), falling back to `x-real-ip` and CloudFront's viewer address |
| Device, browser, OS            | Parsed from the user agent                                                                   |
| Country                        | CloudFront's `cloudfront-viewer-country` header                                              |
| Landing page and campaign tags | The page URL the form was submitted from                                                     |
| Referrer                       | The browser, falling back to the `referer` header                                            |

Every value is length-capped and stripped of control characters before storage, because a header is attacker-controlled and ends up in an email. Disclosed in `/privacy`. If you add a field, add it there too.

## Search

What the code does, and what only the owner can do.

**In the code.** The title leads with the search phrase and the place ("Sound System Rental in Phoenix, AZ | Arizona Sound System"), the description stays under 160 characters, and both live in `seo` in `content/site.ts`. Three JSON-LD graphs on the home page, linked by `@id`: `LocalBusiness` (phone, email, Phoenix address, coordinates, Instagram as `sameAs`, every city in `serviceArea.cities` as `areaServed`, three `Service` offers), `WebSite`, and `FAQPage` built from `faq.items` word for word. A visible FAQ section and a service-area section carry the same words in real headings, so the structured data never says something the page does not. Icons come from `app/icon.svg` (simplified six-bar mark for the tab), `app/favicon.ico` (16, 32, 48), `app/icon.png` and `app/apple-icon.png` (full mark, for the manifest and home screens); `app/manifest.ts` publishes the web app manifest. `sitemap.xml` and `robots.txt` are generated; `/api/` is disallowed. Old-style `geo.*` meta tags point at Phoenix. Every image has alt text, the hero image is the LCP and loads with priority, fonts are self-hosted, no third-party scripts.

**Only the owner can do.** Claim a Google Business Profile for Arizona Sound System with the same phone, email and city as the footer (that is the single biggest local-search lever and no code can do it). Verify the domain in Google Search Console and Bing Webmaster Tools and submit `https://azsoundsystem.com/sitemap.xml`. Put the site link in the Instagram bio. Get listed on the venues' and promoters' pages that already link to Arizona events. Photographs of real shows, captioned with the venue and city, are worth more than any tag.

**Do not.** Do not add keywords the page cannot back up, do not add a `priceRange`, opening hours or star ratings to the structured data unless they are true, and do not list a city in `serviceArea.cities` the crew would refuse to drive to.

---

## Notes

- The privacy page describes exactly what the site does and is kept in step with the code. Change it in the same commit as any change to what the form collects or sends.
- The page names no gear models and no specs, on purpose. It says high-end gear and how many people the system plays for. That number is `crowd.max` in `content/site.ts`, used in the hero and the system cards. It is 1,000, and the comment above it says where the figure comes from (BASSBOSS's own sizing copy and a Front of House road test of the QSC L Class). No prices, runtimes or client names have been invented.
- The share card is generated at build time from `app/opengraph-image.tsx`. To use a photo instead, drop `opengraph-image.jpg` into `app/` and delete that file.
