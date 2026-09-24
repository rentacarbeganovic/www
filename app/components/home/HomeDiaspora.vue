<script setup lang="ts">
import { PhAirplaneTilt, PhCheck } from '@phosphor-icons/vue'

/*
 * Prijedor's particular advantage: every summer the Kozarac and Prijedor
 * diaspora comes home from Austria, Germany, Sweden, Switzerland and the US.
 * That is who the German and English versions of the site are for, so they
 * get a section speaking to them directly.
 */
const { t } = useI18n()
</script>

<template>
  <section class="reveal-group pb-20 md:pb-28">
    <div class="shell">
      <div class="reveal-scale relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-flame-500 via-flame-500 to-sun p-8 text-navy-950 md:p-14">
        <!-- Contrail: a dashed flight path looping across the card. -->
        <svg aria-hidden="true" class="contrail pointer-events-none absolute inset-0 h-full w-full opacity-40" viewBox="0 0 800 300" preserveAspectRatio="none" fill="none">
          <path d="M-20 260 C 180 120, 360 300, 560 140 S 760 40, 840 60" stroke="#07101c" stroke-width="2" stroke-dasharray="8 10" />
        </svg>
        <PhAirplaneTilt
          :size="220"
          weight="thin"
          class="pointer-events-none absolute -bottom-10 -end-6 text-navy-950/10 rtl:-scale-x-100"
          aria-hidden="true"
        />

        <div class="relative grid gap-8 lg:grid-cols-12 lg:items-center">
          <div class="lg:col-span-7">
            <h2 class="font-display text-[2rem] font-black uppercase leading-[1.02] md:text-5xl" style="font-stretch: 112%">
              {{ t.diaspora.title }}
            </h2>
            <p class="mt-5 max-w-[56ch] text-[1.0625rem] font-medium leading-relaxed text-navy-900">
              {{ t.diaspora.body }}
            </p>
          </div>
          <div class="lg:col-span-5">
            <ul class="space-y-3">
              <li
                v-for="point in t.diaspora.points"
                :key="point"
                class="flex items-center gap-3 rounded-2xl bg-paper-0/85 px-4 py-3.5 text-[0.9375rem] font-bold shadow-card backdrop-blur"
              >
                <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy-950 text-flame-400">
                  <PhCheck :size="13" weight="bold" aria-hidden="true" />
                </span>
                {{ point }}
              </li>
            </ul>
            <UiButton href="#upit" variant="dark" size="lg" block class="mt-5">
              {{ t.diaspora.cta }}
            </UiButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contrail path {
  animation: contrail 22s linear infinite;
}

@keyframes contrail {
  to { stroke-dashoffset: -360; }
}

@media (prefers-reduced-motion: reduce) {
  .contrail path { animation: none; }
}
</style>
