<script setup lang="ts">
import { PhPlus } from '@phosphor-icons/vue'

/*
 * FAQ on <details>, so every answer is in the prerendered HTML and matches
 * the FAQPage structured data emitted by the page.
 */
const { t, business } = useI18n()
</script>

<template>
  <section id="pitanja" class="reveal-group section-y scroll-mt-16 bg-paper-100">
    <div class="shell grid gap-12 lg:grid-cols-12">
      <div class="lg:col-span-4">
        <UiSectionHeading :eyebrow="t.faq.eyebrow" :title="t.faq.title" />
        <UiButton :href="business.phoneHref" variant="dark" class="reveal mt-8">
          {{ t.nav.call }} <span dir="ltr">{{ business.phoneDisplay }}</span>
        </UiButton>
      </div>

      <div class="reveal space-y-3 lg:col-span-8">
        <details
          v-for="item in t.faq.items"
          :key="item.q"
          class="faq group rounded-2xl border border-paper-200 bg-paper-0 transition-[border-color,box-shadow] duration-300 open:border-navy-950 open:shadow-lift"
        >
          <summary class="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 [&::-webkit-details-marker]:hidden">
            <h3 class="font-display text-[1.0625rem] font-bold text-navy-950">
              {{ item.q }}
            </h3>
            <span
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-paper-100 text-navy-950 transition-[transform,background-color] duration-300 ease-out group-open:rotate-45 group-open:bg-flame-500"
              aria-hidden="true"
            >
              <PhPlus :size="14" weight="bold" />
            </span>
          </summary>
          <p class="faq-body body-base max-w-[68ch] px-6 pb-6">
            {{ item.a }}
          </p>
        </details>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq[open] .faq-body {
  animation: faq-open 0.35s cubic-bezier(0.23, 1, 0.32, 1);
}

@keyframes faq-open {
  from { opacity: 0; transform: translateY(-0.5rem); }
  to { opacity: 1; transform: none; }
}

@media (prefers-reduced-motion: reduce) {
  .faq[open] .faq-body { animation: none; }
}
</style>
