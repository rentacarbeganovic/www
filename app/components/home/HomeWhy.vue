<script setup lang="ts">
import { PhChatsCircle, PhGearSix, PhRoadHorizon, PhTag } from '@phosphor-icons/vue'

/*
 * Four reasons, each answering an objection: price, location, gearbox,
 * who you deal with. Big outlined index numbers give the grid a rhythm and
 * the icon tile tilts on hover like a steering input.
 */
const { t } = useI18n()
const ICONS = [PhTag, PhRoadHorizon, PhGearSix, PhChatsCircle]
</script>

<template>
  <section class="reveal-group section-y">
    <div class="shell">
      <div class="grid gap-10 lg:grid-cols-12 lg:items-end">
        <UiSectionHeading class="lg:col-span-7" :eyebrow="t.why.eyebrow" :title="t.why.title" />
        <p class="body-lg reveal lg:col-span-5">
          {{ t.why.intro }}
        </p>
      </div>

      <div class="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="(item, i) in t.why.items" :key="item.title" class="reveal">
          <article class="surface surface-hover group relative h-full overflow-hidden p-7">
          <span
            aria-hidden="true"
            class="absolute -end-2 -top-5 font-display text-[6.5rem] font-black leading-none text-transparent [-webkit-text-stroke:1.5px_theme(colors.paper.200)] transition-colors duration-500 group-hover:[-webkit-text-stroke-color:theme(colors.flame.200)]"
          >0{{ i + 1 }}</span>
          <span class="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-950 text-flame-400 transition-transform duration-300 ease-out group-hover:-rotate-6">
            <component :is="ICONS[i]" :size="24" weight="duotone" aria-hidden="true" />
          </span>
          <h3 class="h-card relative mt-6">
            {{ item.title }}
          </h3>
          <p class="body-base relative mt-3">
            {{ item.body }}
          </p>
          <span aria-hidden="true" class="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-flame-500 to-sun transition-transform duration-500 ease-out group-hover:scale-x-100 rtl:origin-right" />
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
