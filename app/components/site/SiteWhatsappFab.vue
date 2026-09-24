<script setup lang="ts">
import { PhWhatsappLogo } from '@phosphor-icons/vue'

/*
 * Floating WhatsApp button, bottom right (bottom left under RTL). It arrives
 * a beat after the page so it reads as an offer rather than part of the
 * layout, and the label slides out on hover on desktop.
 */
const { t, business } = useI18n()
</script>

<template>
  <a
    :href="business.whatsappHref"
    target="_blank"
    rel="noopener noreferrer"
    class="fab-in group fixed bottom-5 end-5 z-40 flex h-14 items-center rounded-pill bg-[#25d366] text-white shadow-lift transition-transform duration-200 ease-out active:scale-95 md:bottom-7 md:end-7"
    :aria-label="t.whatsappFab"
  >
    <span class="relative flex h-14 w-14 items-center justify-center">
      <span aria-hidden="true" class="absolute inset-0 animate-pulse-ring rounded-full bg-[#25d366]/60" />
      <PhWhatsappLogo :size="30" weight="fill" class="relative" aria-hidden="true" />
    </span>
    <span
      class="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-bold transition-[max-width,padding] duration-300 ease-out md:block md:group-hover:max-w-[16rem] md:group-hover:pe-5"
    >
      {{ t.whatsappFab }}
    </span>
  </a>
</template>

<style scoped>
.fab-in {
  animation: fab-in 0.6s cubic-bezier(0.23, 1, 0.32, 1) 1.2s both;
}

@keyframes fab-in {
  from { opacity: 0; transform: translateY(1rem) scale(0.9); }
  to { opacity: 1; transform: none; }
}

@media (prefers-reduced-motion: reduce) {
  .fab-in { animation: none; }
}
</style>
