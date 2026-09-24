import type { FleetCar, LocaleOption } from '~/i18n/types'

/*
 * Single source of truth for everything factual about the business.
 *
 * Nothing here is invented. Where a fact is not confirmed it is null and the
 * UI omits it. Open items are marked TODO(client):
 *
 *   grep -rn "TODO(client)" app/
 *
 * Location: resolved from the client's own Google share link
 * (maps.app.goo.gl/a2eyGNc18L17Ydnf8) to the listing "Rent a car Beganovic
 * Prijedor" at 44.9632, 16.8657 — on the M4 in Brđani, just east of Kozarac,
 * between Prijedor and Banja Luka.
 */

const PHONE_E164 = '+38762269229'
const PHONE_DISPLAY = '062 269 229'

/*
 * The reservations inbox. The brief: enquiries go here too, but the address
 * is never rendered on the page. It is assembled at click time and only ever
 * used as a mailto: target, so it is not in the prerendered HTML for scrapers
 * or for Cloudflare's email obfuscation to rewrite into a dead link.
 */
const INBOX = ['rentacarbeganovic', 'gmail.com'] as const

export function inboxHref(subject: string, body: string) {
  return `mailto:${INBOX.join('@')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export const BUSINESS = {
  name: 'Rent a Car Beganović',
  shortName: 'Beganović',

  phone: PHONE_E164,
  phoneDisplay: PHONE_DISPLAY,
  phoneHref: `tel:${PHONE_E164}`,
  whatsappHref: `https://wa.me/${PHONE_E164.replace('+', '')}`,

  street: 'M4, Brđani',
  city: 'Prijedor',
  postalCode: '79101',
  country: 'BA',
  /* One NAP string, used verbatim everywhere the address is rendered. */
  addressShort: 'M4, Brđani, 79101 Prijedor',

  /* CID from the share link's 0x54712e65a49cb62d feature id. */
  googleMapsUrl: 'https://www.google.com/maps?cid=6084695585642559021',
  googleShortUrl: 'https://maps.app.goo.gl/a2eyGNc18L17Ydnf8',
  geo: { lat: 44.9632035, lng: 16.8657269 },

  logo: '/images/brand/logo.webp',
  logoDark: '/images/brand/logo-dark.webp',
  ogImage: '/images/og-image.jpg',

  /* TODO(client): social profiles. Empty means "do not render". */
  facebookUrl: '',
  instagramUrl: '',
} as const

/* WhatsApp deep link with the message already typed. */
export function whatsappHref(message?: string) {
  if (!message) return BUSINESS.whatsappHref
  return `${BUSINESS.whatsappHref}?text=${encodeURIComponent(message)}`
}

export const LOCALE_OPTIONS: LocaleOption[] = [
  { code: 'bs', label: 'BS', name: 'Bosanski', dir: 'ltr', htmlLang: 'bs-BA', ogLocale: 'bs_BA' },
  { code: 'en', label: 'EN', name: 'English', dir: 'ltr', htmlLang: 'en', ogLocale: 'en_US' },
  { code: 'de', label: 'DE', name: 'Deutsch', dir: 'ltr', htmlLang: 'de', ogLocale: 'de_DE' },
  { code: 'ar', label: 'AR', name: 'العربية', dir: 'rtl', htmlLang: 'ar', ogLocale: 'ar_AR' },
]

/*
 * The fleet, exactly as the client listed it: six cars, model year and
 * gearbox confirmed. Automatics first, since that is what most visitors from
 * abroad filter for.
 *
 * Seats: the Mazda5 of this generation is a seven-seater as standard. The
 * first-generation Peugeot 5008 was sold with five or seven seats.
 * TODO(client): confirm the 5008's seat count.
 */
export const FLEET_CARS: FleetCar[] = [
  {
    id: 'peugeot-308',
    slug: 'peugeot-308-2015-automatik',
    brand: 'Peugeot',
    model: '308',
    year: 2015,
    transmission: 'automatic',
    seats: 5,
    category: 'compact',
    image: '/images/fleet/peugeot-308-2015-automatik.webp',
  },
  {
    id: 'peugeot-5008',
    slug: 'peugeot-5008-2014-automatik',
    brand: 'Peugeot',
    model: '5008',
    year: 2014,
    transmission: 'automatic',
    seats: null,
    category: 'family',
    image: '/images/fleet/peugeot-5008-2014-automatik.webp',
  },
  {
    id: 'ford-kuga',
    slug: 'ford-kuga-2012-automatik',
    brand: 'Ford',
    model: 'Kuga',
    year: 2012,
    transmission: 'automatic',
    seats: 5,
    category: 'suv',
    image: '/images/fleet/ford-kuga-2012-automatik.webp',
  },
  {
    id: 'golf-7',
    slug: 'vw-golf-7-2016',
    brand: 'Volkswagen',
    model: 'Golf 7',
    year: 2016,
    transmission: 'manual',
    seats: 5,
    category: 'compact',
    image: '/images/fleet/vw-golf-7-2016.webp',
  },
  {
    id: 'mazda-5',
    slug: 'mazda-5-2013',
    brand: 'Mazda',
    model: '5',
    year: 2013,
    transmission: 'manual',
    seats: 7,
    category: 'family',
    image: '/images/fleet/mazda-5-2013.webp',
  },
  {
    id: 'golf-6',
    slug: 'vw-golf-6-2012',
    brand: 'Volkswagen',
    model: 'Golf 6',
    year: 2012,
    transmission: 'manual',
    seats: 5,
    category: 'compact',
    image: '/images/fleet/vw-golf-6-2012.webp',
  },
]

export function carName(car: FleetCar) {
  return `${car.brand} ${car.model}`
}

export function findCarBySlug(slug: string) {
  return FLEET_CARS.find(car => car.slug === slug)
}

/* Same category first, then the rest, so the related rail is never empty. */
export function similarCars(car: FleetCar, count = 3): FleetCar[] {
  const same = FLEET_CARS.filter(o => o.id !== car.id && o.category === car.category)
  const rest = FLEET_CARS.filter(o => o.id !== car.id && o.category !== car.category)
  return [...same, ...rest].slice(0, count)
}

export const HERO_IMAGES = {
  wide: '/images/hero/lineup.webp',
  small: '/images/hero/lineup-sm.webp',
  portrait: '/images/hero/lineup-portrait.webp',
  scene: '/images/hero/prijedor.webp',
} as const
