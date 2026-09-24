<script setup lang="ts">
import { PhArrowRight } from '@phosphor-icons/vue'
import type { BlogPost } from '~/data/blog'

defineProps<{ post: BlogPost }>()
const { t } = useI18n()
</script>

<template>
  <NuxtLink
    :to="`/blog/${post.slug}`"
    class="surface group flex h-full flex-col overflow-hidden transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-lift sm:flex-row"
  >
    <div class="overflow-hidden sm:w-2/5">
      <img
        :src="post.image"
        :srcset="fleetSrcset(post.image)"
        sizes="(max-width: 640px) 100vw, 260px"
        :alt="post.imageAlt"
        class="aspect-[16/10] h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        width="1280"
        height="853"
        loading="lazy"
        decoding="async"
      >
    </div>
    <div class="flex flex-1 flex-col p-6">
      <p class="text-xs font-bold uppercase tracking-[0.14em] text-flame-700">
        {{ fill(t.blog.readingTime, post.readingMinutes) }}
      </p>
      <h3 class="h-card mt-2 transition-colors duration-200 group-hover:text-flame-700">
        {{ post.title }}
      </h3>
      <p class="body-base mt-2.5 flex-1">
        {{ post.excerpt }}
      </p>
      <span class="mt-4 inline-flex items-center gap-2 text-sm font-bold text-navy-950">
        {{ t.blog.readMore }}
        <PhArrowRight :size="15" weight="bold" class="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </div>
  </NuxtLink>
</template>
