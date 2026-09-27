<script setup lang="ts">
import { PhAirplaneLanding, PhBriefcase, PhConfetti, PhHouseLine, PhPhone, PhWhatsappLogo } from '@phosphor-icons/vue'
import { TRANSPORT_LIVE, whatsappHref } from '~/data/business'

/*
 * Passenger transport. Built and prerendered so the client can review it,
 * but noindex and unlinked until TRANSPORT_LIVE — see the note on the flag.
 * No form: a ride is a route, a time and a head count, which is a phone call
 * or a WhatsApp message, pre-typed here so the visitor only fills the blanks.
 */
const { t, business } = useI18n()
useScrollReveal()

const trail = computed(() => [
  { name: t.value.breadcrumbHome, path: '/' },
  { name: t.value.nav.transport, path: '/prevoz-putnika' },
])

useSeo(() => ({
  title: t.value.transport.metaTitle,
  description: t.value.transport.metaDescription,
  path: '/prevoz-putnika',
  noindex: !TRANSPORT_LIVE,
  keywords: ['prevoz putnika Prijedor', 'transfer aerodrom Banja Luka', 'transfer Zagreb aerodrom', 'prevoz Kozarac'],
}))

jsonLd(
  breadcrumbSchema(trail.value),
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Passenger transport',
    name: t.value.transport.metaTitle,
    description: t.value.transport.metaDescription,
    provider: { '@id': `${absoluteUrl('/')}${ORGANIZATION_ID}` },
    areaServed: [
      { '@type': 'City', name: 'Prijedor' },
      { '@type': 'Place', name: 'Kozarac' },
      { '@type': 'City', name: 'Banja Luka' },
    ],
  },
)

const waHref = computed(() => whatsappHref(t.value.transport.whatsappMessage))
const ICONS = [PhAirplaneLanding, PhHouseLine, PhBriefcase, PhConfetti]
</script>

<template>
  <div>
    <SitePageHero :title="t.transport.title" :lead="t.transport.lead" :trail="trail">
      <div class="reveal mt-9 flex flex-col gap-3 sm:flex-row" style="--reveal-delay: 180ms">
        <UiButton :href="business.phoneHref" size="lg">
          <PhPhone :size="18" weight="fill" aria-hidden="true" />
          <span dir="ltr">{{ business.phoneDisplay }}</span>
        </UiButton>
        <UiButton :href="waHref" variant="ghost" size="lg" external>
          <PhWhatsappLogo :size="19" weight="fill" class="text-[#1fa855]" aria-hidden="true" />
          WhatsApp
        </UiButton>
      </div>
    </SitePageHero>

    <section class="reveal-group pb-20 md:pb-28">
      <div class="shell">
        <UiSectionHeading :title="t.transport.useCasesTitle" />
        <div class="mt-10 grid gap-5 sm:grid-cols-2">
          <div v-for="(item, i) in t.transport.useCases" :key="item.title" class="reveal">
            <article class="surface surface-hover group flex h-full gap-5 p-7">
              <span class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-flame-500 text-navy-950 transition-transform duration-300 ease-out group-hover:-rotate-6">
                <component :is="ICONS[i]" :size="26" weight="duotone" class="rtl:-scale-x-100" aria-hidden="true" />
              </span>
              <div>
                <h3 class="h-card">
                  {{ item.title }}
                </h3>
                <p class="body-base mt-2">
                  {{ item.body }}
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="reveal-group on-dark relative overflow-hidden bg-navy-950 text-navy-300">
      <div
        aria-hidden="true"
        class="pointer-events-none absolute -end-40 -top-40 h-[28rem] w-[28rem] animate-sun-spin rounded-full opacity-[0.16]"
        style="background: conic-gradient(from 200deg, transparent 0deg, #f76b0e 60deg, #f9a620 110deg, transparent 160deg)"
      />
      <div class="shell relative section-y">
        <h2 class="reveal font-display text-3xl font-black uppercase text-paper-0 md:text-5xl" style="font-stretch: 112%">
          {{ t.transport.stepsTitle }}
        </h2>
        <ol class="mt-12 grid gap-8 md:grid-cols-3">
          <li v-for="(step, i) in t.transport.steps" :key="step.title" class="reveal relative border-t border-navy-700 pt-6" :style="`--reveal-delay: ${i * 90}ms`">
            <span aria-hidden="true" class="absolute -top-px start-0 h-[3px] w-16 bg-gradient-to-r from-flame-500 to-sun rtl:bg-gradient-to-l" />
            <span class="font-display text-5xl font-black text-flame-400" style="font-stretch: 112%">0{{ i + 1 }}</span>
            <h3 class="mt-3 font-display text-xl font-bold text-paper-0">
              {{ step.title }}
            </h3>
            <p class="mt-2 leading-relaxed">
              {{ step.body }}
            </p>
          </li>
        </ol>

        <div class="reveal mt-16 flex flex-col items-start gap-6 rounded-card border border-navy-700 bg-navy-900/60 p-7 md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <p class="font-display text-2xl font-bold text-paper-0 md:text-3xl">
              {{ t.transport.ctaTitle }}
            </p>
            <p class="mt-2 max-w-xl">
              {{ t.transport.ctaBody }}
            </p>
          </div>
          <div class="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <UiButton :href="business.phoneHref" size="lg">
              <PhPhone :size="18" weight="fill" aria-hidden="true" />
              <span dir="ltr">{{ business.phoneDisplay }}</span>
            </UiButton>
            <UiButton :href="waHref" variant="light" size="lg" external>
              <PhWhatsappLogo :size="19" weight="fill" class="text-[#1fa855]" aria-hidden="true" />
              WhatsApp
            </UiButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
