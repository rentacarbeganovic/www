<script setup lang="ts">
import { PhArrowRight, PhSteeringWheel } from '@phosphor-icons/vue'

/*
 * One band pointing from the fleet to passenger transport: for the visitor
 * who scrolled the cars and realised they would rather not drive. Rendered
 * only when TRANSPORT_LIVE (see index.vue).
 */
const { t, localeRoute } = useI18n()
</script>

<template>
  <section class="reveal-group pb-20 md:pb-28">
    <div class="shell">
      <NuxtLink
        :to="localeRoute('/prevoz-putnika')"
        class="reveal on-dark group relative flex flex-col gap-6 overflow-hidden rounded-[1.75rem] bg-navy-950 p-8 text-navy-300 shadow-lift md:flex-row md:items-center md:justify-between md:p-12"
      >
        <span aria-hidden="true" class="absolute -bottom-24 -end-24 h-64 w-64 rounded-full border-[22px] border-flame-500/70 border-s-transparent border-t-transparent transition-transform duration-700 ease-out group-hover:rotate-45" />
        <div class="relative flex items-start gap-5">
          <span class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-flame-500 text-navy-950 transition-transform duration-500 ease-out group-hover:rotate-[60deg]">
            <PhSteeringWheel :size="28" weight="duotone" aria-hidden="true" />
          </span>
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.16em] text-flame-400">
              {{ t.transport.teaserEyebrow }}
            </p>
            <h2 class="mt-2 font-display text-2xl font-black text-paper-0 md:text-4xl" style="font-stretch: 110%">
              {{ t.transport.teaserTitle }}
            </h2>
            <p class="mt-3 max-w-xl leading-relaxed">
              {{ t.transport.teaserBody }}
            </p>
          </div>
        </div>
        <span class="relative inline-flex shrink-0 items-center gap-2 self-start rounded-pill bg-flame-500 px-6 py-3.5 font-bold text-navy-950 transition-colors duration-200 group-hover:bg-flame-400 md:self-center">
          {{ t.transport.teaserCta }}
          <PhArrowRight :size="18" weight="bold" class="transition-transform duration-200 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" aria-hidden="true" />
        </span>
      </NuxtLink>
    </div>
  </section>
</template>
