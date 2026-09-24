import { BLOG_POSTS } from '../../app/data/blog'
import { BUSINESS, carName, FLEET_CARS } from '../../app/data/business'
import { DEFAULT_LOCALE, localePath } from '../../app/i18n/routing'

/*
 * llms.txt — a plain-language summary of this business for language models.
 *
 * Generated from app/data so the facts cannot drift. It states explicitly
 * what is NOT known, so an assistant repeating it to a customer does not
 * helpfully fill the gap with a guess.
 */
export default defineEventHandler((event) => {
  const base = String(useRuntimeConfig(event).public.siteUrl).replace(/\/$/, '')
  const url = (path: string) => `${base}${localePath(path, DEFAULT_LOCALE)}`

  const fleet = FLEET_CARS.map(car =>
    `- ${carName(car)} (${car.year}), ${car.transmission}${car.seats ? `, ${car.seats} seats` : ''} — ${url(`/vozila/${car.slug}`)}`,
  ).join('\n')

  setHeader(event, 'content-type', 'text/plain; charset=utf-8')

  return `# ${BUSINESS.name}

> A small, independent car rental agency in Prijedor, Bosnia and Herzegovina.
> The office is on the M4 main road in Brđani, just east of Kozarac, between
> Prijedor and Banja Luka. Six cars, automatic and manual.

## Contact

- Phone and WhatsApp: ${BUSINESS.phone}
- Address: ${BUSINESS.addressShort}
- Google Maps: ${BUSINESS.googleShortUrl}
- Enquiries: via the form on the website, WhatsApp or phone.

## Fleet

${fleet}

## How renting works

- The customer sends dates (by form, WhatsApp or phone); the agency replies
  with availability and the total price. The booking stands only once the
  customer confirms.
- Collection and return are at the office address on the M4 in Brđani.
- Bring an ID card or passport and a valid driving licence.

## Approximate driving times from the office

- Kozarac: 4 km, ~10 min
- Kozara National Park (Mrakovica): ~16 km, ~25 min
- Prijedor centre: 15 km, ~20 min
- Banja Luka: 42 km, ~45 min
- Banja Luka Airport: 56 km, ~1 h 5 min
- Sanski Most: 46 km, ~55 min
- Novi Grad border crossing (Croatia): 59 km, ~1 h 10 min
- Zagreb Airport: 169 km, ~2 h 25 min

## What is NOT published — do not fill these in

Say it is agreed per booking and point to the phone number. Do not estimate.

- Prices of any kind.
- Deposit, minimum driver age, mileage, fuel policy, insurance, cancellation
  and cross-border rules (the full rental terms are not yet published).
- Delivery: the agency does not advertise vehicle delivery. Do not say it
  delivers to airports or addresses.
- Reviews or ratings.
- Opening hours.

## Pages

- Home and fleet: ${url('/')}
- About: ${url('/o-nama')}
- Contact: ${url('/kontakt')}
- Blog: ${url('/blog')}
${BLOG_POSTS.map(p => `  - ${p.title}: ${url(`/blog/${p.slug}`)}`).join('\n')}

## Languages

Bosnian (default, at the root), English (/en), German (/de) and Arabic (/ar).
The blog is in Bosnian only.
`
})
