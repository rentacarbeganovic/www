<script setup lang="ts">
import { PhCaretRight } from '@phosphor-icons/vue'

/*
 * Takes base (Bosnian) paths and renders links for the active locale, so it
 * matches the BreadcrumbList JSON-LD built from the same trail. `raw` marks a
 * path that is already final (an anchor like /#vozila).
 */
defineProps<{ trail: { name: string, path: string, raw?: boolean }[] }>()

const { localeRoute } = useI18n()
</script>

<template>
  <nav class="reveal" aria-label="Breadcrumb">
    <ol class="flex flex-wrap items-center gap-1.5 text-[0.8125rem] font-semibold text-navy-500">
      <li v-for="(crumb, index) in trail" :key="crumb.path" class="flex items-center gap-1.5">
        <NuxtLink
          v-if="index < trail.length - 1"
          :to="crumb.raw ? crumb.path : localeRoute(crumb.path)"
          class="transition-colors duration-200 hover:text-flame-700"
        >
          {{ crumb.name }}
        </NuxtLink>
        <span v-else class="text-navy-950" aria-current="page">{{ crumb.name }}</span>
        <PhCaretRight v-if="index < trail.length - 1" :size="11" weight="bold" class="shrink-0 rtl:rotate-180" aria-hidden="true" />
      </li>
    </ol>
  </nav>
</template>
