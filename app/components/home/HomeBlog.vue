<script setup lang="ts">
import { BLOG_POSTS } from '~/data/blog'

/* Rendered only in Bosnian: the guides are published in Bosnian only. */
const { t } = useI18n()
</script>

<template>
  <section class="reveal-group section-y">
    <div class="shell">
      <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <UiSectionHeading :eyebrow="t.blog.eyebrow" :title="t.blog.title" :intro="t.blog.intro" />
        <UiButton to="/blog" variant="ghost" class="reveal self-start md:self-auto">
          {{ t.nav.blog }}
        </UiButton>
      </div>

      <div class="mt-12 grid gap-6 md:grid-cols-2">
        <div v-for="post in BLOG_POSTS" :key="post.slug" class="reveal">
          <SiteBlogCard :post="post" />
        </div>
      </div>
    </div>
  </section>
</template>
