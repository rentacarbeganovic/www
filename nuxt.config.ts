import type { NuxtPage } from 'nuxt/schema'
import type { Locale } from './app/i18n/types'
import { DEFAULT_LOCALE, isPublishedIn, localePath, LOCALES } from './app/i18n/routing'

/*
 * Bosnian base routes. Every localised URL is derived from these, both for
 * route generation below and for the prerender list.
 *
 * The six /vozila/[slug] pages are not listed: the fleet section links to
 * every one of them in the active locale and crawlLinks picks them up.
 */
const BASE_ROUTES = [
  '/',
  '/o-nama',
  '/uslovi',
  '/kontakt',
  '/blog',
  '/blog/rent-a-car-prijedor-sta-trebate-znati',
  '/blog/nacionalni-park-kozara-autom-iz-prijedora',
]

const PRERENDER_ROUTES = BASE_ROUTES.flatMap(base =>
  LOCALES.filter(locale => isPublishedIn(base, locale))
    .map(locale => localePath(base, locale)),
)

/*
 * Clone every page under /en, /de and /ar, tagging each copy with its locale
 * in route meta. useI18n() reads that meta, which makes the language a
 * property of the URL rather than of localStorage.
 */
function localiseRoute(page: NuxtPage, locale: Locale): NuxtPage {
  return {
    ...page,
    path: localePath(page.path, locale),
    name: page.name ? `${page.name}___${locale}` : undefined,
    meta: { ...page.meta, locale },
    children: page.children?.map(child => ({
      ...child,
      name: child.name ? `${child.name}___${locale}` : undefined,
      meta: { ...child.meta, locale },
    })),
  }
}

export default defineNuxtConfig({
  hooks: {
    'pages:extend'(pages) {
      const originals = [...pages]

      for (const page of originals) {
        page.meta = { ...page.meta, locale: DEFAULT_LOCALE }
      }

      for (const locale of LOCALES) {
        if (locale === DEFAULT_LOCALE) continue
        for (const page of originals) {
          if (!isPublishedIn(page.path, locale)) continue
          pages.push(localiseRoute(page, locale))
        }
      }
    },
  },

  compatibilityDate: '2025-07-15',
  devtools: { enabled: process.env.NODE_ENV !== 'production' },

  modules: ['@nuxtjs/tailwindcss'],

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },

  runtimeConfig: {
    public: {
      /*
       * The canonical origin. Canonical, og:url, hreflang, JSON-LD @id and
       * sitemap.xml all derive from this. Set NUXT_PUBLIC_SITE_URL in
       * Cloudflare Pages for BOTH Production and Preview.
       */
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://rentacarbeganovic.com',
      /*
       * Optional Web3Forms key. Set, and the enquiry form posts straight to
       * the reservations inbox; empty, and it opens the visitor's mail app
       * with the enquiry typed out (mailto:).
       */
      web3formsKey: process.env.NUXT_PUBLIC_WEB3FORMS_KEY || '',
      gaId: process.env.NUXT_PUBLIC_GA_ID || '',
      plausibleDomain: process.env.NUXT_PUBLIC_PLAUSIBLE_DOMAIN || '',
    },
  },

  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: [...PRERENDER_ROUTES, '/sitemap.xml', '/robots.txt', '/llms.txt'],
      autoSubfolderIndex: false,
    },
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: { lang: 'bs-BA', dir: 'ltr' },
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
        { rel: 'icon', href: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
        { rel: 'icon', href: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        {
          rel: 'preload',
          as: 'font',
          type: 'font/woff2',
          href: '/fonts/archivo-latin.woff2',
          crossorigin: 'anonymous',
        },
        {
          rel: 'preload',
          as: 'font',
          type: 'font/woff2',
          href: '/fonts/manrope-latin.woff2',
          crossorigin: 'anonymous',
        },
      ],
      meta: [
        { name: 'theme-color', content: '#faf8f5' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
    },
  },
})
