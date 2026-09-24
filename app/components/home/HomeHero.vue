<script setup lang="ts">
import { PhArrowDown, PhCheckCircle, PhMapPin, PhPhone } from '@phosphor-icons/vue'
import { HERO_IMAGES } from '~/data/business'

/*
 * Copy left, enquiry form right, the fleet line-up running underneath.
 *
 * The form sits in the hero (not below it) because the decision a visitor
 * came to make is "is a car free on my dates" — answering that should not
 * need a scroll. On a phone the order is copy -> cars -> form, so the first
 * screen still carries the headline, the phone number and the proof.
 *
 * The line-up is the bottom of the client's hero artwork, cropped under its
 * baked-in text (see scripts/build-images.py).
 *
 * Signature motion: the logo's sun arc draws itself behind the form, and the
 * swoosh draws under the accent line. Both are stroke-dashoffset on SVG
 * paths — no layout, no JS.
 */
const { t, business } = useI18n()
</script>

<template>
  <section class="reveal-onload relative overflow-hidden pb-14 pt-28 md:pb-20 md:pt-36">
    <div aria-hidden="true" class="sun-glow pointer-events-none absolute inset-0" />

    <!-- The sun arc from the logo, drawn once on load. -->
    <svg
      aria-hidden="true"
      class="hero-arc pointer-events-none absolute -end-24 top-10 hidden h-[40rem] w-[40rem] lg:block rtl:-scale-x-100"
      viewBox="0 0 400 400"
      fill="none"
    >
      <defs>
        <linearGradient id="arc-grad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stop-color="#dc540a" />
          <stop offset="0.55" stop-color="#f76b0e" />
          <stop offset="1" stop-color="#f9a620" />
        </linearGradient>
      </defs>
      <path d="M40 300 A 170 170 0 0 1 360 140" pathLength="1" stroke="url(#arc-grad)" stroke-width="22" stroke-linecap="round" />
      <path d="M92 330 A 130 130 0 0 1 330 205" pathLength="1" stroke="url(#arc-grad)" stroke-width="3" stroke-linecap="round" opacity="0.5" />
    </svg>

    <div class="shell relative">
      <div class="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <!-- Copy ------------------------------------------------------------ -->
        <div class="lg:col-span-7 lg:pt-6">
          <a
            :href="business.googleShortUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="reveal inline-flex items-center gap-2 rounded-pill border border-paper-200 bg-paper-0/80 py-1.5 pe-4 ps-1.5 text-[0.8125rem] font-semibold text-navy-700 shadow-card backdrop-blur transition-colors duration-200 hover:border-flame-300"
            style="--reveal-delay: 0ms"
          >
            <span class="flex h-7 w-7 items-center justify-center rounded-full bg-flame-100 text-flame-700">
              <PhMapPin :size="15" weight="fill" aria-hidden="true" />
            </span>
            {{ t.hero.location }}
          </a>

          <h1 class="h-display reveal mt-6" style="--reveal-delay: 70ms">
            <span class="block">{{ t.hero.titleLead }}</span>
            <span class="relative mt-1 inline-block">
              <span class="text-gradient-flame">{{ t.hero.titleAccent }}</span>
              <UiSwoosh delay="0.75s" />
            </span>
          </h1>

          <p class="body-lg reveal mt-7 max-w-[52ch]" style="--reveal-delay: 140ms">
            {{ t.hero.subtitle }}
          </p>

          <div class="reveal mt-8 flex flex-col gap-3 sm:flex-row sm:items-center" style="--reveal-delay: 210ms">
            <UiButton :href="business.phoneHref" size="lg">
              <PhPhone :size="19" weight="fill" aria-hidden="true" />
              {{ t.hero.ctaCall }}
              <span dir="ltr">{{ business.phoneDisplay }}</span>
            </UiButton>
            <UiButton href="#upit" variant="ghost" size="lg" class="lg:hidden">
              {{ t.hero.ctaForm }}
              <PhArrowDown :size="17" weight="bold" aria-hidden="true" />
            </UiButton>
          </div>

          <ul class="reveal mt-8 grid gap-2.5 sm:grid-cols-3 sm:gap-4" style="--reveal-delay: 280ms">
            <li
              v-for="line in t.hero.proof"
              :key="line"
              class="flex items-start gap-2 text-[0.875rem] font-semibold leading-snug text-navy-700"
            >
              <PhCheckCircle :size="19" weight="fill" class="shrink-0 text-flame-500" aria-hidden="true" />
              {{ line }}
            </li>
          </ul>
        </div>

        <!-- Form ------------------------------------------------------------ -->
        <div class="reveal-scale order-last lg:order-none lg:col-span-5" style="--reveal-delay: 260ms">
          <SiteEnquiryForm />
        </div>

        <!-- Line-up ---------------------------------------------------------- -->
        <div class="relative lg:col-span-12">
          <div class="overflow-hidden rounded-[1.75rem] bg-navy-900 shadow-lift">
            <picture>
              <source media="(max-width: 639px)" :srcset="HERO_IMAGES.portrait">
              <source media="(max-width: 1023px)" :srcset="HERO_IMAGES.small">
              <img
                :src="HERO_IMAGES.wide"
                :alt="t.hero.lineupAlt"
                class="reveal-lcp aspect-[900/280] w-full object-cover sm:aspect-[1916/376]"
                width="1916"
                height="376"
                fetchpriority="high"
                decoding="async"
              >
            </picture>
          </div>
          <!-- Speed lines trailing off the line-up's leading edge. -->
          <div aria-hidden="true" class="speed-lines pointer-events-none absolute -start-2 top-1/2 hidden -translate-y-1/2 flex-col gap-2 md:flex">
            <span class="h-[3px] w-16 rounded-pill bg-flame-500" />
            <span class="ms-5 h-[3px] w-10 rounded-pill bg-sun" />
            <span class="ms-2 h-[3px] w-20 rounded-pill bg-navy-950" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-arc path {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: arc-draw 1.6s cubic-bezier(0.77, 0, 0.175, 1) 0.2s forwards;
}

.hero-arc path + path {
  animation-delay: 0.55s;
}

@keyframes arc-draw {
  to { stroke-dashoffset: 0; }
}

.speed-lines span {
  animation: speed 2.8s cubic-bezier(0.23, 1, 0.32, 1) infinite;
  transform-origin: right;
}

.speed-lines span:nth-child(2) { animation-delay: 0.25s; }
.speed-lines span:nth-child(3) { animation-delay: 0.5s; }

@keyframes speed {
  0% { transform: translateX(1.5rem) scaleX(0.2); opacity: 0; }
  30% { opacity: 1; }
  100% { transform: translateX(-2.5rem) scaleX(1); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .hero-arc path { stroke-dashoffset: 0; animation: none; }
  .speed-lines span { animation: none; opacity: 0.6; }
}
</style>
