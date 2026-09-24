# Rent a Car Beganović — Prijedor

Static marketing site for a car rental agency on the M4 in Brđani, Prijedor
(Bosnia and Herzegovina). Nuxt 4 + Tailwind, fully prerendered, deployed to
Cloudflare Pages at **rentacarbeganovic.com**.

Four languages, each on its own crawlable URL: Bosnian at the root, English
under `/en`, German under `/de`, Arabic (RTL) under `/ar`. The blog is Bosnian
only.

## Commands

```bash
npm install
npm run dev            # http://localhost:3000
npm run generate       # static build -> .output/public
npm run pages:deploy   # generate + wrangler pages deploy
python3 scripts/build-images.py   # rebuild every image from source-images/
```

## Cloudflare Pages

- Build command: `npm run generate` · Output: `.output/public` · Node 20+
- Environment variables (Production **and** Preview): see `.env.example`.
  `NUXT_PUBLIC_SITE_URL=https://rentacarbeganovic.com` is the only one required.

## Where things live

```
app/data/business.ts     every fact: phone, address, map, fleet, TERMS_COMPLETE
app/data/blog.ts         the two Bosnian guides
app/i18n/locales/*.ts    all copy; bs.ts is the master, en/de/ar translate it
app/i18n/routing.ts      per-language slugs and which pages exist in which language
app/components/home/     home-page sections
app/components/site/     header, footer, enquiry form, shared blocks
app/components/ui/       button, swoosh, section heading, count-up
server/routes/           sitemap.xml, robots.txt, llms.txt (generated)
```

## Enquiries

The form never shows the reservations email. Without a Web3Forms key it opens
the visitor's mail app (`mailto:`) with the enquiry typed out; with
`NUXT_PUBLIC_WEB3FORMS_KEY` set it posts straight to the inbox. A WhatsApp
button beside it carries the same details.

## Open items from the client

```bash
grep -rn "TODO(client)" app/
```

- **Uslovi (rental terms)** — the page is a placeholder, `noindex` and out of
  the sitemap. When the terms arrive, write them into `terms` in each locale
  and set `TERMS_COMPLETE = true` in `app/data/business.ts`.
- **Peugeot 5008 seat count** (5 or 7) — `seats: null` in `business.ts`.
- Opening hours, social profiles.

## Copy rules

Not mentioned anywhere, by the client's instruction or because unconfirmed:
vehicle delivery, Google reviews/ratings, prices, deposit amount, insurance
packages, driver age, mileage, cross-border rules.

## Design

Light theme sampled from the logo: paper ground, navy type (`navy-*`), the
logo orange as the action colour (`flame-500`, always with navy text — orange
text on paper uses `flame-700`), and the sun-arc amber (`sun`) in gradients
only. Headlines are Archivo at an expanded width, echoing the wordmark; body
is Manrope. Motion is transform/opacity only and respects
`prefers-reduced-motion`.
