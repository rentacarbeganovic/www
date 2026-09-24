<script setup lang="ts">
/*
 * The opening block of every subpage: breadcrumb, H1 with the swoosh, lead.
 * Same sun wash as the home hero, so the site reads as one piece.
 */
defineProps<{
  title: string
  lead?: string
  trail: { name: string, path: string, raw?: boolean }[]
}>()
</script>

<template>
  <section class="reveal-onload relative overflow-hidden pb-12 pt-32 md:pb-16 md:pt-40">
    <div aria-hidden="true" class="sun-glow pointer-events-none absolute inset-0" />
    <div class="shell relative">
      <SiteBreadcrumb :trail="trail" />
      <h1 class="h-display reveal relative mt-6 inline-block max-w-4xl" style="--reveal-delay: 60ms">
        {{ title }}
        <UiSwoosh delay="0.6s" class="!-bottom-3 !w-24 md:!-bottom-4 md:!w-32" />
      </h1>
      <p v-if="lead" class="body-lg reveal mt-8 max-w-[62ch]" style="--reveal-delay: 120ms">
        {{ lead }}
      </p>
      <slot />
    </div>
  </section>
</template>
