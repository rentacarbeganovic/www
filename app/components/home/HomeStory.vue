<script setup lang="ts">
import { HERO_IMAGES } from '~/data/business'

/*
 * Who we are, in two paragraphs, beside the town itself. The photograph
 * drifts on a native scroll timeline (no listeners), and the stats count up
 * once as they arrive.
 */
const { t, localeRoute } = useI18n()
</script>

<template>
  <section class="reveal-group section-y relative overflow-hidden">
    <div aria-hidden="true" class="dot-grid pointer-events-none absolute inset-y-0 start-0 w-1/2 opacity-70 [mask-image:linear-gradient(to_right,#000,transparent)]" />

    <div class="shell relative grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
      <div class="reveal-scale relative lg:col-span-6">
        <div class="overflow-hidden rounded-[1.75rem] shadow-lift">
          <img
            :src="HERO_IMAGES.scene"
            :alt="t.story.imageAlt"
            class="parallax-slow aspect-[4/3] w-full object-cover"
            width="936"
            height="410"
            loading="lazy"
            decoding="async"
          >
        </div>
        <!-- The sun, again: a small arc tucked behind the corner of the photo. -->
        <span
          aria-hidden="true"
          class="absolute -end-5 -top-5 -z-10 h-28 w-28 rounded-full border-[10px] border-flame-500 border-b-transparent border-s-transparent"
        />
        <div class="absolute -bottom-6 start-6 flex items-center gap-3 rounded-2xl bg-navy-950 px-5 py-4 text-paper-0 shadow-lift">
          <span class="font-display text-4xl font-black text-flame-400" style="font-stretch: 112%">M4</span>
          <span class="max-w-[10rem] text-sm font-semibold leading-snug text-navy-300">{{ t.hero.location }}</span>
        </div>
      </div>

      <div class="lg:col-span-6">
        <UiSectionHeading :eyebrow="t.story.eyebrow" :title="t.story.title" />

        <p
          v-for="paragraph in t.story.paragraphs"
          :key="paragraph"
          class="body-lg reveal mt-5"
        >
          {{ paragraph }}
        </p>

        <dl class="reveal mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-paper-200 bg-paper-200 sm:grid-cols-4">
          <div v-for="stat in t.story.stats" :key="stat.label" class="bg-paper-0 p-4">
            <dt class="sr-only">
              {{ stat.label }}
            </dt>
            <dd>
              <span class="block font-display text-4xl font-black text-navy-950" style="font-stretch: 112%">
                <UiCountUp :value="stat.value" />
              </span>
              <span class="mt-1 block text-[0.8125rem] font-semibold leading-snug text-navy-500" aria-hidden="true">{{ stat.label }}</span>
            </dd>
          </div>
        </dl>

        <UiButton :to="localeRoute('/o-nama')" variant="dark" class="reveal mt-8">
          {{ t.nav.about }}
        </UiButton>
      </div>
    </div>
  </section>
</template>
