<script setup lang="ts">
/*
 * A navy ribbon of short claims, running continuously. Tilted a degree so it
 * reads as a road sign flashing past rather than a table row. The list is
 * rendered twice and the track slides by exactly half its width, so the loop
 * has no seam. Decorative duplicate is aria-hidden.
 */
const { t, isRtl } = useI18n()
</script>

<template>
  <div class="relative z-10 -my-2 overflow-hidden py-4" dir="ltr">
    <div class="-rotate-1 bg-navy-950 py-4 shadow-lift">
      <div class="flex w-max animate-marquee hover:[animation-play-state:paused]">
        <ul v-for="copy in 2" :key="copy" class="flex shrink-0 items-center" :aria-hidden="copy === 2 ? 'true' : undefined">
          <li
            v-for="item in t.marquee"
            :key="item"
            class="flex items-center gap-6 pe-6 font-display text-lg font-extrabold uppercase tracking-wide text-paper-0 md:text-xl"
            style="font-stretch: 112%"
          >
            <span :dir="isRtl ? 'rtl' : undefined">{{ item }}</span>
            <span aria-hidden="true" class="h-2.5 w-2.5 rotate-45 bg-gradient-to-br from-flame-500 to-sun" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
