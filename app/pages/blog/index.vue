<script setup lang="ts">
import { BLOG_POSTS } from '~/data/blog'

const { t, business } = useI18n()
useScrollReveal()

const posts = [...BLOG_POSTS].sort((a, b) => b.published.localeCompare(a.published))

const trail = computed(() => [
  { name: t.value.breadcrumbHome, path: '/' },
  { name: t.value.nav.blog, path: '/blog' },
])

useSeo(() => ({
  title: `${t.value.blog.title} | ${business.name}`,
  description: t.value.blog.intro,
  path: '/blog',
}))

jsonLd(
  breadcrumbSchema(trail.value),
  {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: t.value.blog.title,
    url: absoluteUrl('/blog'),
    inLanguage: 'bs',
    blogPost: BLOG_POSTS.map(post => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: absoluteUrl(`/blog/${post.slug}`),
      datePublished: post.published,
    })),
  },
)
</script>

<template>
  <div>
    <SitePageHero :title="t.blog.title" :lead="t.blog.intro" :trail="trail" />

    <section class="reveal-group pb-20 md:pb-28">
      <div class="shell grid gap-6 md:grid-cols-2">
        <div v-for="post in posts" :key="post.slug" class="reveal">
          <SiteBlogCard :post="post" />
        </div>
      </div>
    </section>

    <SiteCtaBand />
  </div>
</template>
