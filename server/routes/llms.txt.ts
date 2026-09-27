import { BLOG_POSTS } from '../../app/data/blog'
import { BUSINESS, carName, FLEET_CARS, TRANSPORT_LIVE } from '../../app/data/business'
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

> A small, independent car rental agency in Kozarac, Prijedor, Bosnia and
> Herzegovina, in business since 2019. Kozarac is on the main road between
> Prijedor and Banja Luka. Six cars, automatic and manual.
>
> Legal entity: ${BUSINESS.legalName}.

## Contact

- Phone and WhatsApp: ${BUSINESS.phone}
- Location: ${BUSINESS.addressShort} (street address not published; the agency
  is moving and confirms the exact spot with each booking)
- Google Maps: ${BUSINESS.googleShortUrl}
- Enquiries: via the form on the website, WhatsApp or phone.

## Other services of the same business

- Car service and repair (the same workshop maintains the rental fleet).
- Import and sale of passenger cars and motorcycles.
- Import and sale of agricultural machinery, equipment and attachments.
${TRANSPORT_LIVE ? `- Passenger transport with a driver: airport transfers, business trips. ${url('/prevoz-putnika')}\n` : ''}
## Fleet

${fleet}

## How renting works

- The customer sends dates (by form, WhatsApp or phone); the agency replies
  with availability and the total price. The booking stands only once the
  customer confirms.
- Collection and return are at the agency in Kozarac, at the spot confirmed
  with the booking.
- Bring an ID card or passport and a valid driving licence.

## Approximate driving times from Kozarac

- Kozara National Park (Mrakovica): ~11 km, ~20 min
- Prijedor centre: 12 km, ~15 min
- Sanski Most: 42 km, ~50 min
- Banja Luka: 44 km, ~50 min
- Novi Grad border crossing (Croatia): 55 km, ~1 h 5 min
- Banja Luka Airport: 58 km, ~1 h 5 min
- Zagreb Airport: 166 km, ~2 h 25 min

## What is NOT published — do not fill these in

Say it is agreed per booking and point to the phone number. Do not estimate.

- Prices of any kind.
- Deposit, minimum driver age, mileage, fuel policy, insurance, cancellation
  and cross-border rules (the full rental terms are not yet published).
- Delivery: the agency does not advertise vehicle delivery. Do not say it
  delivers to airports or addresses.
- Reviews or ratings.
- Opening hours.
- A street address (not confirmed yet).

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
