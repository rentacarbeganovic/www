import type { Locale } from './types'

/*
 * Locale routing.
 *
 * Every locale gets a real, crawlable URL: Bosnian on the root, the rest under
 * a path prefix. Imported from nuxt.config.ts (route generation), the app
 * (links, canonical, hreflang) and the Nitro sitemap route, so it holds
 * nothing but plain functions over strings.
 *
 * Paths here are always the *base* path: the Bosnian one, with no prefix.
 */

export const LOCALES = ['bs', 'en', 'de', 'ar'] as const

export const DEFAULT_LOCALE: Locale = 'bs'

/*
 * The blog is Bosnian only: both guides answer local, Bosnian-language
 * searches ("rent a car Prijedor", "Kozara autom"). Cloning them under
 * /en, /de and /ar would publish Bosnian prose in translated chrome — thin
 * duplicate content. Matching is by prefix.
 */
const LOCALE_SCOPES: { prefix: string, locales: Locale[] }[] = [
  { prefix: '/blog', locales: ['bs'] },
]

/*
 * Per-language slugs. Arabic reuses the English ones: an Arabic-script URL is
 * percent-encoded into noise wherever it is pasted.
 */
const PATH_OVERRIDES: { base: string, paths: Partial<Record<Locale, string>> }[] = [
  { base: '/vozila', paths: { en: '/cars', de: '/fahrzeuge', ar: '/cars' } },
  { base: '/o-nama', paths: { en: '/about', de: '/ueber-uns', ar: '/about' } },
  { base: '/uslovi', paths: { en: '/terms', de: '/mietbedingungen', ar: '/terms' } },
  { base: '/kontakt', paths: { en: '/contact', de: '/kontakt', ar: '/contact' } },
]

function overrideFor(base: string, locale: Locale): string {
  const entry = PATH_OVERRIDES.find(
    item => base === item.base || base.startsWith(`${item.base}/`),
  )
  const replacement = entry?.paths[locale]
  if (!entry || !replacement) return base
  return `${replacement}${base.slice(entry.base.length)}`
}

function baseFromOverride(path: string, locale: Locale): string {
  for (const entry of PATH_OVERRIDES) {
    const localised = entry.paths[locale]
    if (!localised) continue
    if (path === localised || path.startsWith(`${localised}/`)) {
      return `${entry.base}${path.slice(localised.length)}`
    }
  }
  return path
}

export function localesForPath(base: string): Locale[] {
  const scope = LOCALE_SCOPES.find(
    entry => base === entry.prefix || base.startsWith(`${entry.prefix}/`),
  )
  return scope ? [...scope.locales] : [...LOCALES]
}

export function isPublishedIn(base: string, locale: Locale): boolean {
  return localesForPath(base).includes(locale)
}

/* Base path -> the URL for one locale. No trailing slash on the prefix. */
export function localePath(base: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return base || '/'
  const path = overrideFor(base, locale)
  return `/${locale}${path === '/' ? '' : path}`
}

export function stripLocale(path: string): { locale: Locale, base: string } {
  const match = /^\/([a-z]{2})(?=\/|$)/.exec(path)
  const code = match?.[1] as Locale | undefined

  if (code && code !== DEFAULT_LOCALE && (LOCALES as readonly string[]).includes(code)) {
    const localised = path.slice(code.length + 1) || '/'
    return { locale: code, base: baseFromOverride(localised, code) }
  }

  return { locale: DEFAULT_LOCALE, base: path || '/' }
}
