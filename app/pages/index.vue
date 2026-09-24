<script setup lang="ts">
import { BUSINESS } from '~/data/business'
import { LOCALES } from '~/i18n/routing'

/*
 * Section order follows the decision a renter makes:
 *   promise + "is a car free on my dates" (hero + form)
 *   -> why this agency (objections: price, location, gearbox, who you deal with)
 *   -> the cars
 *   -> who we are
 *   -> how renting works, stage by stage
 *   -> where we are and how far everything is
 *   -> the diaspora summer (Prijedor's particular market)
 *   -> remaining questions -> guides -> call.
 */
const { t, locale } = useI18n()

useScrollReveal()

useSeo(() => ({
  title: t.value.meta.title,
  description: t.value.meta.description,
  path: '/',
  imageAlt: t.value.meta.ogImageAlt,
  keywords: ['rent a car Prijedor', 'najam auta Prijedor', 'rent a car Kozarac', 'iznajmljivanje vozila Prijedor', 'automatik Prijedor'],
}))

jsonLd(
  autoRentalSchema(t.value.meta.description),
  fleetSchema(id => t.value.fleet.categories[id as keyof typeof t.value.fleet.categories] ?? id),
  faqSchema(t.value.faq.items),
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BUSINESS.name,
    url: absoluteUrl('/'),
    inLanguage: [...LOCALES],
    publisher: { '@id': `${absoluteUrl('/')}${ORGANIZATION_ID}` },
  },
)
</script>

<template>
  <div>
    <HomeHero />
    <HomeMarquee />
    <HomeWhy />
    <HomeFleet />
    <HomeStory />
    <HomeService />
    <HomeRoutes />
    <HomeDiaspora />
    <HomeFaq />
    <HomeBlog v-if="locale === 'bs'" />
    <SiteCtaBand />
  </div>
</template>
