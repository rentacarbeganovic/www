<script setup lang="ts">
import { PhMapPin, PhPhone, PhWhatsappLogo } from '@phosphor-icons/vue'

/*
 * Navy footer — the logo's dark, so the page ends on the brand. The address
 * is the same NAP string used in the schema, verbatim. The reservations
 * email is deliberately absent: the brief says never to render it.
 */
const { t, business, menuLinks, localeLinks, localeRoute } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="on-dark relative overflow-hidden bg-navy-950 text-navy-300">
    <!-- The sun arc from the logo, as a slow-turning halo behind the footer. -->
    <div
      aria-hidden="true"
      class="pointer-events-none absolute -end-40 -top-40 h-[28rem] w-[28rem] animate-sun-spin rounded-full opacity-[0.18]"
      style="background: conic-gradient(from 200deg, transparent 0deg, #f76b0e 60deg, #f9a620 110deg, transparent 160deg)"
    />

    <div class="shell relative grid gap-12 py-16 md:grid-cols-12 md:py-20">
      <div class="md:col-span-5">
        <NuxtLink :to="localeRoute('/')" :aria-label="business.name" class="inline-block">
          <SiteLogo dark lazy class="h-16" />
        </NuxtLink>
        <p class="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-navy-300">
          {{ t.footer.tagline }}
        </p>
      </div>

      <nav class="md:col-span-3" :aria-label="t.footer.footerNav">
        <h2 class="font-display text-sm font-bold uppercase tracking-[0.16em] text-paper-0">
          {{ t.footer.navigation }}
        </h2>
        <ul class="mt-5 space-y-3">
          <li v-for="link in menuLinks" :key="link.to">
            <NuxtLink :to="link.to" class="text-[0.9375rem] transition-colors duration-200 hover:text-flame-300">
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="md:col-span-4">
        <h2 class="font-display text-sm font-bold uppercase tracking-[0.16em] text-paper-0">
          {{ t.footer.contact }}
        </h2>
        <ul class="mt-5 space-y-4 text-[0.9375rem]">
          <li>
            <a :href="business.phoneHref" class="flex items-center gap-3 font-bold text-paper-0 transition-colors duration-200 hover:text-flame-300">
              <PhPhone :size="18" weight="fill" class="text-flame-400" aria-hidden="true" />
              <span dir="ltr">{{ business.phoneDisplay }}</span>
            </a>
          </li>
          <li>
            <a
              :href="business.whatsappHref"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 transition-colors duration-200 hover:text-flame-300"
            >
              <PhWhatsappLogo :size="18" weight="fill" class="text-flame-400" aria-hidden="true" />
              WhatsApp
            </a>
          </li>
          <li>
            <a
              :href="business.googleShortUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-start gap-3 transition-colors duration-200 hover:text-flame-300"
            >
              <PhMapPin :size="18" weight="fill" class="mt-0.5 shrink-0 text-flame-400" aria-hidden="true" />
              <address class="not-italic">{{ business.addressShort }}</address>
            </a>
          </li>
        </ul>

        <p class="mt-8 text-xs font-bold uppercase tracking-[0.16em] text-navy-400">
          {{ t.footer.langs }}
        </p>
        <ul class="mt-3 flex flex-wrap gap-2">
          <li v-for="opt in localeLinks" :key="opt.code">
            <NuxtLink
              :to="opt.to"
              :hreflang="opt.code"
              class="inline-flex h-9 items-center rounded-pill border px-3.5 text-sm font-semibold transition-colors duration-200"
              :class="opt.isCurrent ? 'border-flame-400 text-flame-300' : 'border-navy-700 hover:border-navy-400 hover:text-paper-0'"
            >
              <span :dir="opt.dir">{{ opt.name }}</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>

    <div class="relative border-t border-navy-800">
      <div class="shell flex flex-col gap-2 py-6 text-xs text-navy-400 sm:flex-row sm:items-center sm:justify-between">
        <p>© {{ year }} {{ business.name }}. {{ t.footer.rights }}</p>
        <p dir="ltr">rentacarbeganovic.com</p>
      </div>
    </div>
  </footer>
</template>
