<script setup lang="ts">
import { PhCar, PhHandshake, PhMotorcycle, PhPhoneCall, PhTractor, PhWrench } from '@phosphor-icons/vue'
import { HERO_IMAGES } from '~/data/business'

const { t, business, localeRoute } = useI18n()
useScrollReveal()

const trail = computed(() => [
  { name: t.value.breadcrumbHome, path: '/' },
  { name: t.value.nav.about, path: '/o-nama' },
])

useSeo(() => ({
  title: t.value.about.metaTitle,
  description: t.value.about.metaDescription,
  path: '/o-nama',
}))

jsonLd(
  breadcrumbSchema(trail.value),
  { '@context': 'https://schema.org', '@type': 'AboutPage', name: t.value.about.metaTitle, about: { '@id': `${absoluteUrl('/')}${ORGANIZATION_ID}` } },
)

const VALUE_ICONS = [PhHandshake, PhCar, PhPhoneCall]
const SERVICE_ICONS = [PhWrench, PhMotorcycle, PhTractor]
</script>

<template>
  <div>
    <SitePageHero :title="t.about.title" :lead="t.about.lead" :trail="trail" />

    <section class="reveal-group pb-20 md:pb-28">
      <div class="shell">
        <div class="reveal-scale overflow-hidden rounded-[1.75rem] shadow-lift">
          <img
            :src="HERO_IMAGES.wide"
            :alt="t.hero.lineupAlt"
            class="parallax-slow aspect-[1916/376] min-h-[12rem] w-full object-cover"
            width="1916"
            height="376"
            loading="lazy"
            decoding="async"
          >
        </div>

        <div class="mt-16 grid gap-10 md:grid-cols-3">
          <article v-for="(section, i) in t.about.sections" :key="section.title" class="reveal">
            <p class="font-display text-5xl font-black text-transparent [-webkit-text-stroke:1.5px_theme(colors.flame.500)]">
              0{{ i + 1 }}
            </p>
            <h2 class="h-card mt-3 text-2xl">
              {{ section.title }}
            </h2>
            <p class="body-base mt-3 text-base">
              {{ section.body }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <section class="reveal-group section-y bg-paper-100">
      <div class="shell">
        <UiSectionHeading :title="t.about.valuesTitle" />
        <div class="mt-10 grid gap-5 md:grid-cols-3">
          <div v-for="(value, i) in t.about.values" :key="value.title" class="reveal">
            <div class="surface surface-hover h-full p-7">
              <span class="flex h-12 w-12 items-center justify-center rounded-2xl bg-flame-500 text-navy-950">
                <component :is="VALUE_ICONS[i]" :size="24" weight="duotone" aria-hidden="true" />
              </span>
              <h3 class="h-card mt-5">
                {{ value.title }}
              </h3>
              <p class="body-base mt-2">
                {{ value.body }}
              </p>
            </div>
          </div>
        </div>
        <div class="reveal mt-10 flex flex-wrap gap-3">
          <UiButton :href="business.phoneHref" size="lg">
            {{ t.nav.call }} <span dir="ltr">{{ business.phoneDisplay }}</span>
          </UiButton>
          <UiButton :to="`${localeRoute('/')}#vozila`" variant="ghost" size="lg">
            {{ t.nav.fleet }}
          </UiButton>
        </div>
      </div>
    </section>

    <!-- The owner's other trades: proof the fleet is looked after, and a lead for each. -->
    <section class="reveal-group section-y">
      <div class="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-5">
          <div class="lg:sticky lg:top-28">
            <UiSectionHeading :eyebrow="t.about.servicesEyebrow" :title="t.about.servicesTitle" :intro="t.about.servicesIntro" />
            <UiButton :href="business.phoneHref" variant="dark" size="lg" class="reveal mt-8">
              {{ t.about.servicesCta }} · <span dir="ltr">{{ business.phoneDisplay }}</span>
            </UiButton>
          </div>
        </div>
        <ul class="flex flex-col gap-4 lg:col-span-7">
          <li v-for="(service, i) in t.about.services" :key="service.title" class="reveal">
            <article class="surface surface-hover group flex gap-5 p-6 md:p-7">
              <span class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-navy-950 text-flame-400 transition-transform duration-300 ease-out group-hover:-rotate-6">
                <component :is="SERVICE_ICONS[i]" :size="26" weight="duotone" aria-hidden="true" />
              </span>
              <div>
                <h3 class="h-card">
                  {{ service.title }}
                </h3>
                <p class="body-base mt-2">
                  {{ service.body }}
                </p>
              </div>
            </article>
          </li>
        </ul>
      </div>
    </section>

    <SiteCtaBand />
  </div>
</template>
