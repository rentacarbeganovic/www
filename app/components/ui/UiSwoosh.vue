<script setup lang="ts">
/*
 * The orange road-curve from the logo, drawn under a headline's accent
 * phrase. `scroll` holds the draw until the enclosing .reveal-group arrives.
 */
withDefaults(defineProps<{ delay?: string, scroll?: boolean }>(), { delay: '0.5s', scroll: false })
</script>

<template>
  <svg
    class="swoosh pointer-events-none absolute -bottom-2 start-0 h-3 w-full overflow-visible md:-bottom-3 md:h-4 rtl:-scale-x-100"
    :class="scroll ? 'swoosh-scroll' : ''"
    :style="{ '--swoosh-delay': delay }"
    viewBox="0 0 300 16"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="swoosh-grad" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stop-color="#dc540a" />
        <stop offset="0.6" stop-color="#f76b0e" />
        <stop offset="1" stop-color="#f9a620" />
      </linearGradient>
    </defs>
    <path
      d="M3 12 C 70 3, 190 1, 297 7"
      pathLength="1"
      fill="none"
      stroke="url(#swoosh-grad)"
      stroke-width="5"
      stroke-linecap="round"
    />
  </svg>
</template>
