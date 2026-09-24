import { BUSINESS, carName, FLEET_CARS, LOCALE_OPTIONS } from '~/data/business'
import { DEFAULT_LOCALE, localePath, localesForPath } from '~/i18n/routing'
import type { FleetCar } from '~/i18n/types'

/*
 * Central SEO helper.
 *
 * Everything a crawler or a language model needs is emitted server-side into
 * the prerendered HTML: canonical, hreflang, Open Graph, Twitter, and JSON-LD.
 * Nothing here depends on hydration.
 */

export function useSiteUrl() {
  const config = useRuntimeConfig()
  return String(config.public.siteUrl).replace(/\/$/, '')
}

function join(base: string, path: string) {
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}

/*
 * Must be called during setup. Head resolvers run lazily and outside the Nuxt
 * instance, so anything they touch has to close over a value captured here
 * rather than reach for useRuntimeConfig() at resolve time.
 */
export function absoluteUrl(path = '/') {
  return join(useSiteUrl(), path)
}

interface SeoInput {
  title: string
  description: string
  /*
   * The *base* path: the Bosnian one, with no locale prefix. The canonical and
   * the hreflang set are derived from it, so a page never has to know which
   * language it is being rendered in to describe itself correctly.
   */
  path?: string
  image?: string
  imageAlt?: string
  type?: 'website' | 'article'
  keywords?: string[]
  /* Article-only */
  published?: string
  modified?: string
  noindex?: boolean
}

export function useSeo(input: MaybeRefOrGetter<SeoInput>) {
  const { locale } = useI18n()
  // Captured once, during setup, so the lazy resolvers below stay context-free.
  const origin = useSiteUrl()

  const resolved = computed(() => {
    const value = toValue(input)
    const path = value.path ?? '/'
    const option = LOCALE_OPTIONS.find(o => o.code === locale.value) ?? LOCALE_OPTIONS[0]!

    return {
      ...value,
      path,
      option,
      /*
       * Self-referencing, and pointing at this locale's own URL. The whole
       * site previously declared one canonical for every page and language.
       */
      url: join(origin, localePath(path, locale.value)),
      image: join(origin, value.image ?? BUSINESS.ogImage),
      type: value.type ?? 'website',
    }
  })

  useSeoMeta({
    title: () => resolved.value.title,
    description: () => resolved.value.description,
    ogTitle: () => resolved.value.title,
    ogDescription: () => resolved.value.description,
    ogType: () => resolved.value.type,
    ogUrl: () => resolved.value.url,
    ogImage: () => resolved.value.image,
    ogImageAlt: () => resolved.value.imageAlt,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogSiteName: BUSINESS.name,
    ogLocale: () => resolved.value.option.ogLocale,
    twitterCard: 'summary_large_image',
    twitterTitle: () => resolved.value.title,
    twitterDescription: () => resolved.value.description,
    twitterImage: () => resolved.value.image,
    articlePublishedTime: () => resolved.value.published,
    articleModifiedTime: () => resolved.value.modified,
    keywords: () => resolved.value.keywords?.join(', '),
    robots: () => (resolved.value.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'),
  })

  useHead(() => {
    const link: Record<string, string>[] = [
      { rel: 'canonical', href: resolved.value.url },
    ]

    /*
     * hreflang lists only the languages this particular page is actually
     * published in — pointing at a URL that does not exist invalidates the
     * whole annotation set. Language-only codes (bs, not bs-BA): there is one
     * Bosnian version, not a per-country split.
     *
     * Single-language pages get no alternates at all, which is correct: the
     * Bosnian-only guides have nothing to alternate with.
     */
    const published = localesForPath(resolved.value.path)

    if (published.length > 1) {
      for (const code of published) {
        link.push({
          rel: 'alternate',
          hreflang: code,
          href: join(origin, localePath(resolved.value.path, code)),
        })
      }
      link.push({
        rel: 'alternate',
        hreflang: 'x-default',
        href: join(origin, localePath(resolved.value.path, DEFAULT_LOCALE)),
      })
    }

    return { link }
  })
}

/* ---- Structured data ----------------------------------------------------- */

/*
 * The business entity. Every other block points at this @id rather than
 * restating the organisation, so search engines can merge the graph.
 *
 * Deliberately absent: opening hours (TODO(client): not supplied), any rating
 * or review (the listing has none, and the brief says not to mention reviews),
 * and any price (none published).
 */
export const ORGANIZATION_ID = '#organization'

export function autoRentalSchema(description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoRental',
    '@id': `${absoluteUrl('/')}${ORGANIZATION_ID}`,
    name: BUSINESS.name,
    description,
    url: absoluteUrl('/'),
    telephone: BUSINESS.phone,
    image: absoluteUrl(BUSINESS.ogImage),
    logo: absoluteUrl(BUSINESS.logo),
    currenciesAccepted: 'BAM, EUR',
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.street,
      addressLocality: BUSINESS.city,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS.geo.lat,
      longitude: BUSINESS.geo.lng,
    },
    areaServed: [
      { '@type': 'City', name: 'Prijedor' },
      { '@type': 'Place', name: 'Kozarac' },
      { '@type': 'City', name: 'Banja Luka' },
      { '@type': 'Country', name: 'Bosnia and Herzegovina' },
    ],
    hasMap: BUSINESS.googleMapsUrl,
    knowsLanguage: ['bs', 'en', 'de', 'ar'],
    ...(BUSINESS.facebookUrl || BUSINESS.instagramUrl
      ? { sameAs: [BUSINESS.facebookUrl, BUSINESS.instagramUrl].filter(Boolean) }
      : {}),
  }
}

export function fleetSchema(categoryLabel: (id: string) => string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${BUSINESS.name} - vozila`,
    numberOfItems: FLEET_CARS.length,
    itemListElement: FLEET_CARS.map((car, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: vehicleNode(car, categoryLabel(car.category)),
    })),
  }
}

function vehicleNode(car: FleetCar, category: string) {
  return {
    '@type': 'Car',
    name: carName(car),
    brand: { '@type': 'Brand', name: car.brand },
    model: car.model,
    vehicleModelDate: String(car.year),
    vehicleTransmission: car.transmission === 'automatic' ? 'AutomaticTransmission' : 'ManualTransmission',
    ...(car.seats !== null ? { seatingCapacity: car.seats } : {}),
    image: absoluteUrl(car.image),
    vehicleConfiguration: category,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${absoluteUrl('/')}${ORGANIZATION_ID}` },
    },
  }
}

/* A single vehicle, for /vozila/[slug]. Price omitted: none is published. */
export function vehicleSchema(input: { car: FleetCar, path: string, description: string, categoryLabel: string }) {
  const { locale } = useI18n()
  const origin = useSiteUrl()
  return {
    '@context': 'https://schema.org',
    ...vehicleNode(input.car, input.categoryLabel),
    description: input.description,
    url: join(origin, localePath(input.path, locale.value)),
  }
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
}

/* Trail entries carry base paths; URLs are emitted for the active locale. */
export function breadcrumbSchema(trail: { name: string, path: string }[]) {
  const { locale } = useI18n()
  const origin = useSiteUrl()

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: join(origin, localePath(crumb.path, locale.value)),
    })),
  }
}

export function jsonLd(...blocks: Record<string, unknown>[]) {
  useHead({
    script: blocks.map(block => ({
      type: 'application/ld+json',
      innerHTML: JSON.stringify(block),
    })),
  })
}
