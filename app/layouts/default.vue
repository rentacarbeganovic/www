<script setup lang="ts">
/*
 * Mounted once for the whole site: one delegated click listener classifies
 * every phone, WhatsApp and Maps link, and the analytics provider is warmed
 * up only after the browser goes idle.
 *
 * The chrome — header, footer, WhatsApp button — lives here so no page can
 * ship without it.
 */
useClickTracking()
useAnalyticsWarmup()

const { t } = useI18n()
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <a
      href="#sadrzaj"
      class="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:rounded-pill focus:bg-flame-500 focus:px-5 focus:py-3 focus:font-bold focus:text-navy-950"
    >
      {{ t.skipToContent }}
    </a>

    <SiteHeader />

    <main id="sadrzaj" class="flex-1">
      <slot />
    </main>

    <SiteFooter />
    <SiteWhatsappFab />
  </div>
</template>
