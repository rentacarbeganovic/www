import { BLOG_POSTS } from '../../app/data/blog'
import { FLEET_CARS, TERMS_COMPLETE } from '../../app/data/business'
import { DEFAULT_LOCALE, localePath, localesForPath } from '../../app/i18n/routing'

/*
 * Generated at prerender time so it can never drift from the routes that
 * actually exist. Every language variant gets its own <url>, each carrying
 * the full xhtml:link alternate set including itself. Bosnian-only pages
 * (the blog) carry no alternates.
 */

interface SitemapEntry {
  base: string
  lastmod: string
  changefreq: string
  priority: string
}

const today = () => new Date().toISOString().slice(0, 10)

export default defineEventHandler((event) => {
  const origin = String(useRuntimeConfig(event).public.siteUrl).replace(/\/$/, '')
  const now = today()

  const entries: SitemapEntry[] = [
    { base: '/', lastmod: now, changefreq: 'weekly', priority: '1.0' },
    ...FLEET_CARS.map(car => ({
      base: `/vozila/${car.slug}`,
      lastmod: now,
      changefreq: 'monthly',
      priority: '0.8',
    })),
    { base: '/kontakt', lastmod: now, changefreq: 'monthly', priority: '0.8' },
    { base: '/o-nama', lastmod: now, changefreq: 'yearly', priority: '0.6' },
    /* noindex until the client's terms are on the page; see TERMS_COMPLETE. */
    ...(TERMS_COMPLETE ? [{ base: '/uslovi', lastmod: now, changefreq: 'monthly', priority: '0.5' }] : []),
    { base: '/blog', lastmod: now, changefreq: 'weekly', priority: '0.6' },
    ...BLOG_POSTS.map(post => ({
      base: `/blog/${post.slug}`,
      lastmod: post.updated,
      changefreq: 'monthly',
      priority: '0.7',
    })),
  ]

  const urls = entries.flatMap((entry) => {
    const published = localesForPath(entry.base)

    const alternates = published.length > 1
      ? [
          ...published.map(code =>
            `    <xhtml:link rel="alternate" hreflang="${code}" href="${origin}${localePath(entry.base, code)}"/>`,
          ),
          `    <xhtml:link rel="alternate" hreflang="x-default" href="${origin}${localePath(entry.base, DEFAULT_LOCALE)}"/>`,
        ].join('\n')
      : ''

    return published.map(code => `  <url>
    <loc>${origin}${localePath(entry.base, code)}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>${alternates ? `\n${alternates}` : ''}
  </url>`)
  })

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`
})
