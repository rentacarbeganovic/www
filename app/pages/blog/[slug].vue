<script setup lang="ts">
import { PhArrowLeft, PhCheckCircle, PhPhone, PhWhatsappLogo } from '@phosphor-icons/vue'
import { BLOG_POSTS, findPost } from '~/data/blog'
import { BUSINESS } from '~/data/business'

const route = useRoute()
const { t } = useI18n()

const post = findPost(String(route.params.slug))

if (!post) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

useScrollReveal()

/*
 * Formatted by hand rather than through Intl: many runtimes ship without
 * bs-BA CLDR data and fall back to "2026 M09 24".
 */
const BS_MONTHS = ['januar', 'februar', 'mart', 'april', 'maj', 'juni', 'juli', 'august', 'septembar', 'oktobar', 'novembar', 'decembar']
const date = new Date(post.published)
const publishedLabel = `${date.getUTCDate()}. ${BS_MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}.`

const otherPosts = BLOG_POSTS.filter(p => p.slug !== post.slug)

const trail = [
  { name: t.value.breadcrumbHome, path: '/' },
  { name: t.value.nav.blog, path: '/blog' },
  { name: post.title, path: `/blog/${post.slug}` },
]

useSeo(() => ({
  title: post.metaTitle,
  description: post.description,
  path: `/blog/${post.slug}`,
  image: post.image,
  imageAlt: post.imageAlt,
  type: 'article',
  keywords: post.keywords,
  published: post.published,
  modified: post.updated,
}))

jsonLd(
  {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: absoluteUrl(post.image),
    datePublished: post.published,
    dateModified: post.updated,
    inLanguage: 'bs',
    keywords: post.keywords.join(', '),
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    author: { '@id': `${absoluteUrl('/')}${ORGANIZATION_ID}` },
    publisher: {
      '@type': 'Organization',
      name: BUSINESS.name,
      logo: { '@type': 'ImageObject', url: absoluteUrl(BUSINESS.logo) },
    },
  },
  breadcrumbSchema(trail),
)
</script>

<template>
  <div v-if="post">
    <article>
      <header class="reveal-onload relative overflow-hidden pb-10 pt-32 md:pt-40">
        <div aria-hidden="true" class="sun-glow pointer-events-none absolute inset-0" />
        <div class="shell relative">
          <NuxtLink to="/blog" class="reveal inline-flex items-center gap-2 text-sm font-bold text-navy-500 transition-colors hover:text-flame-700">
            <PhArrowLeft :size="15" weight="bold" aria-hidden="true" />
            {{ t.blog.backToBlog }}
          </NuxtLink>
          <h1 class="reveal mt-6 max-w-4xl font-display text-[2.2rem] font-extrabold leading-[1.05] text-navy-950 md:text-5xl" style="--reveal-delay: 60ms; font-stretch: 108%">
            {{ post.title }}
          </h1>
          <p class="reveal mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold text-navy-500" style="--reveal-delay: 120ms">
            <span>{{ t.blog.published }} {{ publishedLabel }}</span>
            <span aria-hidden="true" class="h-1 w-1 rounded-full bg-flame-500" />
            <span>{{ fill(t.blog.readingTime, post.readingMinutes) }}</span>
          </p>
        </div>
      </header>

      <div class="shell">
        <figure class="reveal-lcp overflow-hidden rounded-[1.75rem] shadow-lift">
          <img
            :src="post.image"
            :srcset="fleetSrcset(post.image)"
            sizes="(max-width: 1320px) 100vw, 1240px"
            :alt="post.imageAlt"
            class="aspect-[16/8] w-full object-cover"
            width="1280"
            height="853"
            fetchpriority="high"
            decoding="async"
          >
        </figure>
      </div>

      <div class="shell reveal-group grid gap-12 py-16 lg:grid-cols-12 md:py-20">
        <div class="lg:col-span-8">
          <section v-for="section in post.sections" :key="section.heading" class="reveal mb-12">
            <h2 class="font-display text-2xl font-extrabold text-navy-950 md:text-[1.875rem]" style="font-stretch: 106%">
              {{ section.heading }}
            </h2>
            <p v-for="paragraph in section.paragraphs" :key="paragraph" class="mt-4 text-[1.0625rem] leading-[1.8] text-navy-600">
              {{ paragraph }}
            </p>
            <ul v-if="section.bullets" class="mt-5 space-y-3">
              <li v-for="bullet in section.bullets" :key="bullet" class="flex items-start gap-3 text-[1.0625rem] leading-[1.7] text-navy-600">
                <PhCheckCircle :size="20" weight="fill" class="mt-1 shrink-0 text-flame-500" aria-hidden="true" />
                <span>{{ bullet }}</span>
              </li>
            </ul>
          </section>
        </div>

        <aside class="lg:col-span-4">
          <div class="reveal on-dark sticky top-28 overflow-hidden rounded-card bg-navy-950 p-7 text-navy-300">
            <span aria-hidden="true" class="absolute -end-14 -top-14 h-40 w-40 rounded-full border-[14px] border-flame-500/80 border-b-transparent border-s-transparent" />
            <h2 class="relative font-display text-2xl font-bold text-paper-0">
              {{ t.blog.ctaTitle }}
            </h2>
            <p class="relative mt-3 leading-relaxed">
              {{ t.blog.ctaBody }}
            </p>
            <div class="relative mt-6 flex flex-col gap-3">
              <UiButton :href="BUSINESS.phoneHref" size="lg" block>
                <PhPhone :size="18" weight="fill" aria-hidden="true" />
                <span dir="ltr">{{ BUSINESS.phoneDisplay }}</span>
              </UiButton>
              <UiButton :href="BUSINESS.whatsappHref" variant="light" size="lg" block external>
                <PhWhatsappLogo :size="19" weight="fill" class="text-[#1fa855]" aria-hidden="true" />
                {{ t.cta.whatsapp }}
              </UiButton>
            </div>
          </div>
        </aside>
      </div>
    </article>

    <section v-if="otherPosts.length" class="reveal-group bg-paper-100 py-16">
      <div class="shell grid gap-6 md:grid-cols-2">
        <div v-for="other in otherPosts" :key="other.slug" class="reveal">
          <SiteBlogCard :post="other" />
        </div>
      </div>
    </section>

    <SiteCtaBand />
  </div>
</template>
