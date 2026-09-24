import { BUSINESS, LOCALE_OPTIONS } from '~/data/business'
import { locales } from '~/i18n'
import { DEFAULT_LOCALE, localePath, localesForPath, stripLocale } from '~/i18n/routing'
import type { Locale } from '~/i18n/types'

/*
 * The language is a property of the URL, not of the browser: nuxt.config's
 * pages:extend hook stamps `locale` into each route's meta and this composable
 * reads it, so the prerendered HTML for /en is English before any JS runs.
 *
 * No automatic Accept-Language redirect: it would bounce crawlers between
 * locales. The switcher offers links instead.
 */
export function useI18n() {
  const route = useRoute()

  const locale = computed<Locale>(
    () => (route.meta.locale as Locale | undefined) ?? DEFAULT_LOCALE,
  )

  const basePath = computed(() => stripLocale(route.path).base)

  const t = computed(() => locales[locale.value])
  const option = computed(
    () => LOCALE_OPTIONS.find(o => o.code === locale.value) ?? LOCALE_OPTIONS[0]!,
  )
  const dir = computed(() => option.value.dir)
  const isRtl = computed(() => dir.value === 'rtl')

  function localeRoute(base: string) {
    return localePath(base, locale.value)
  }

  /*
   * The menu, as specified: Automobili, O nama, Uslovi, Blog, Kontakt.
   * Automobili is a section of the home page, not a page of its own. Blog is
   * published in Bosnian only, so it appears only in that locale.
   */
  const menuLinks = computed(() => [
    { label: t.value.nav.fleet, to: `${localePath('/', locale.value)}#vozila` },
    { label: t.value.nav.about, to: localePath('/o-nama', locale.value) },
    { label: t.value.nav.terms, to: localePath('/uslovi', locale.value) },
    ...(locale.value === 'bs' ? [{ label: t.value.nav.blog, to: '/blog' }] : []),
    { label: t.value.nav.contact, to: localePath('/kontakt', locale.value) },
  ])

  /* Every language variant of the current page; unpublished ones fall back to home. */
  const localeLinks = computed(() => {
    const published = localesForPath(basePath.value)
    return LOCALE_OPTIONS.map(opt => ({
      ...opt,
      to: published.includes(opt.code)
        ? localePath(basePath.value, opt.code)
        : localePath('/', opt.code),
      isCurrent: opt.code === locale.value,
    }))
  })

  /* lang/dir in the prerendered HTML, so Arabic never flashes left-to-right. */
  useHead(computed(() => ({
    htmlAttrs: { lang: option.value.htmlLang, dir: dir.value },
  })))

  return {
    locale,
    basePath,
    t,
    dir,
    isRtl,
    business: BUSINESS,
    menuLinks,
    localeRoute,
    localeLinks,
    localeOptions: LOCALE_OPTIONS,
  }
}
