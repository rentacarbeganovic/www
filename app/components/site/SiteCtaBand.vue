<script setup lang="ts">
import { PhPhone, PhWhatsappLogo } from '@phosphor-icons/vue'

/*
 * The closing band on every page: navy, the phone number set as large as the
 * headline, and the sun arc rising behind it.
 */
const { t, business } = useI18n()
</script>

<template>
  <section class="reveal-group on-dark relative overflow-hidden bg-navy-900">
    <div
      aria-hidden="true"
      class="pointer-events-none absolute -bottom-[26rem] start-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full border-[36px] border-flame-500/80 [border-bottom-color:transparent] [border-left-color:#f9a620cc] rtl:translate-x-1/2"
    />
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_120%,rgb(247_107_14/0.35),transparent_70%)]" />

    <div class="shell relative py-20 text-center md:py-28">
      <h2 class="reveal mx-auto max-w-3xl font-display text-[2.2rem] font-black uppercase leading-[1.02] text-paper-0 md:text-6xl" style="font-stretch: 112%">
        {{ t.cta.title }}
      </h2>
      <p class="reveal mx-auto mt-5 max-w-xl text-lg text-navy-300">
        {{ t.cta.body }}
      </p>

      <a
        :href="business.phoneHref"
        class="reveal group mt-10 inline-flex items-center gap-4 font-display text-4xl font-black text-flame-400 transition-colors duration-200 hover:text-flame-300 md:text-6xl"
        style="font-stretch: 112%"
      >
        <span class="flex h-14 w-14 items-center justify-center rounded-full bg-flame-500 text-navy-950 transition-transform duration-300 group-hover:rotate-12 md:h-16 md:w-16">
          <PhPhone :size="28" weight="fill" aria-hidden="true" />
        </span>
        <span dir="ltr">{{ business.phoneDisplay }}</span>
      </a>

      <div class="reveal mt-8 flex justify-center">
        <UiButton :href="business.whatsappHref" variant="light" size="lg" external>
          <PhWhatsappLogo :size="20" weight="fill" class="text-[#1fa855]" aria-hidden="true" />
          {{ t.cta.whatsapp }}
        </UiButton>
      </div>
    </div>
  </section>
</template>
