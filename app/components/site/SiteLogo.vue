<script setup lang="ts">
/*
 * The logo, keyed off its white ground by scripts/build-images.py. `dark`
 * swaps to the version with the navy redrawn near-white, for the footer.
 * Intrinsic size reserves the box so the header never shifts on decode.
 */
withDefaults(defineProps<{ dark?: boolean, lazy?: boolean }>(), { dark: false, lazy: false })

const { business } = useI18n()
</script>

<template>
  <img
    :src="dark ? business.logoDark : business.logo"
    :alt="business.name"
    class="w-auto"
    width="480"
    height="199"
    :loading="lazy ? 'lazy' : undefined"
    decoding="async"
  >
</template>
