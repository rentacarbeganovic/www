<script setup lang="ts">
import { PhCheckCircle, PhHourglassMedium, PhPhone, PhWhatsappLogo } from '@phosphor-icons/vue'

import { TERMS_COMPLETE } from '~/data/business'

const { t, business } = useI18n()
useScrollReveal()

const trail = computed(() => [
  { name: t.value.breadcrumbHome, path: '/' },
  { name: t.value.nav.terms, path: '/uslovi' },
])

useSeo(() => ({
  title: t.value.terms.metaTitle,
  description: t.value.terms.metaDescription,
  path: '/uslovi',
  noindex: !TERMS_COMPLETE,
}))

jsonLd(breadcrumbSchema(trail.value))
</script>

<template>
  <div>
    <SitePageHero :title="t.terms.title" :lead="t.terms.lead" :trail="trail" />

    <section class="reveal-group pb-20 md:pb-28">
      <div class="shell grid gap-6 lg:grid-cols-12">
        <div class="reveal surface p-7 md:p-10 lg:col-span-7">
          <h2 class="h-card text-2xl">
            {{ t.terms.basicsTitle }}
          </h2>
          <ul class="mt-6 space-y-4">
            <li v-for="line in t.terms.basics" :key="line" class="flex items-start gap-3 text-base leading-relaxed text-navy-700">
              <PhCheckCircle :size="22" weight="fill" class="shrink-0 text-flame-500" aria-hidden="true" />
              {{ line }}
            </li>
          </ul>
        </div>

        <aside class="reveal on-dark relative overflow-hidden rounded-card bg-navy-950 p-7 text-navy-300 md:p-10 lg:col-span-5">
          <span aria-hidden="true" class="absolute -end-16 -top-16 h-48 w-48 rounded-full border-[18px] border-flame-500/70 border-b-transparent border-s-transparent" />
          <PhHourglassMedium :size="32" weight="duotone" class="relative text-flame-400" aria-hidden="true" />
          <h2 class="relative mt-4 font-display text-2xl font-bold text-paper-0">
            {{ t.terms.pendingTitle }}
          </h2>
          <p class="relative mt-3 leading-relaxed">
            {{ t.terms.pendingBody }}
          </p>
          <div class="relative mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <UiButton :href="business.phoneHref" size="md">
              <PhPhone :size="17" weight="fill" aria-hidden="true" />
              <span dir="ltr">{{ business.phoneDisplay }}</span>
            </UiButton>
            <UiButton :href="business.whatsappHref" variant="light" size="md" external>
              <PhWhatsappLogo :size="18" weight="fill" class="text-[#1fa855]" aria-hidden="true" />
              WhatsApp
            </UiButton>
          </div>
        </aside>
      </div>
    </section>

    <SiteCtaBand />
  </div>
</template>
