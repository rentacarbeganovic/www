<script setup lang="ts">
import { PhCar, PhHandshake, PhPhoneCall } from '@phosphor-icons/vue'
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

    <SiteCtaBand />
  </div>
</template>
