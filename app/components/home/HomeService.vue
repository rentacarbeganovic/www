<script setup lang="ts">
import { PhArrowRight, PhCheck } from '@phosphor-icons/vue'

/*
 * "Naš servis": the rental in six stages, as tabs. Every panel is in the
 * prerendered HTML (v-show, not v-if), so crawlers read all six; only the
 * visible one changes on click. Arrow keys move between tabs, per the ARIA
 * tabs pattern.
 */
const { t, localeRoute } = useI18n()

const active = ref(0)
const tabRefs = ref<HTMLButtonElement[]>([])

function onKey(event: KeyboardEvent, index: number) {
  const count = t.value.service.tabs.length
  const rtl = document.documentElement.dir === 'rtl'
  const next = (event.key === 'ArrowRight') !== rtl ? 1 : -1
  if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft' && event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
  event.preventDefault()
  const step = event.key === 'ArrowDown' ? 1 : event.key === 'ArrowUp' ? -1 : next
  active.value = (index + step + count) % count
  tabRefs.value[active.value]?.focus()
}
</script>

<template>
  <section class="reveal-group section-y bg-paper-100">
    <div class="shell">
      <UiSectionHeading :eyebrow="t.service.eyebrow" :title="t.service.title" :intro="t.service.intro" />

      <div class="reveal mt-12 grid gap-6 lg:grid-cols-12">
        <div
          role="tablist"
          :aria-label="t.service.title"
          class="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0 lg:col-span-4 lg:flex-col lg:overflow-visible"
        >
          <button
            v-for="(tab, i) in t.service.tabs"
            :id="`tab-${i}`"
            :key="tab.label"
            ref="tabRefs"
            type="button"
            role="tab"
            :aria-selected="active === i"
            :aria-controls="`panel-${i}`"
            :tabindex="active === i ? 0 : -1"
            class="group relative flex shrink-0 items-center gap-4 rounded-2xl border px-5 py-4 text-start transition-[background-color,border-color,color,box-shadow] duration-300 ease-out"
            :class="active === i
              ? 'border-navy-950 bg-navy-950 text-paper-0 shadow-lift'
              : 'border-paper-200 bg-paper-0 text-navy-700 hover:border-paper-300'"
            @click="active = i"
            @keydown="onKey($event, i)"
          >
            <span
              class="font-display text-sm font-black tabular-nums transition-colors duration-300"
              :class="active === i ? 'text-flame-400' : 'text-navy-400'"
            >0{{ i + 1 }}</span>
            <span class="font-display text-[1.0625rem] font-bold">{{ tab.label }}</span>
            <PhArrowRight
              :size="16"
              weight="bold"
              class="ms-auto hidden transition-transform duration-300 lg:block rtl:-scale-x-100"
              :class="active === i ? 'translate-x-0 text-flame-400 rtl:-translate-x-0' : '-translate-x-1 opacity-0'"
              aria-hidden="true"
            />
          </button>
        </div>

        <div class="relative lg:col-span-8">
          <div
            v-for="(tab, i) in t.service.tabs"
            v-show="active === i"
            :id="`panel-${i}`"
            :key="tab.label"
            role="tabpanel"
            :aria-labelledby="`tab-${i}`"
            tabindex="0"
            class="panel surface h-full p-7 md:p-10"
          >
            <p class="font-display text-sm font-black text-flame-700">
              0{{ i + 1 }} / 0{{ t.service.tabs.length }}
            </p>
            <h3 class="mt-3 font-display text-2xl font-extrabold text-navy-950 md:text-3xl" style="font-stretch: 108%">
              {{ tab.title }}
            </h3>
            <p class="body-lg mt-4 max-w-[60ch]">
              {{ tab.body }}
            </p>
            <ul class="mt-7 grid gap-3 sm:grid-cols-3">
              <li
                v-for="point in tab.points"
                :key="point"
                class="flex items-start gap-2.5 rounded-xl bg-paper-100 p-4 text-sm font-semibold text-navy-800"
              >
                <span class="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-flame-500 text-navy-950">
                  <PhCheck :size="12" weight="bold" aria-hidden="true" />
                </span>
                {{ point }}
              </li>
            </ul>
            <div v-if="i === t.service.tabs.length - 1" class="mt-7 flex flex-wrap gap-3">
              <UiButton :to="localeRoute('/uslovi')" variant="dark" size="md">
                {{ t.nav.terms }}
              </UiButton>
              <UiButton href="#pitanja" variant="ghost" size="md">
                {{ t.faq.eyebrow }}
              </UiButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.panel {
  animation: panel-in 0.45s cubic-bezier(0.23, 1, 0.32, 1);
}

@keyframes panel-in {
  from { opacity: 0; transform: translateY(0.75rem); }
  to { opacity: 1; transform: none; }
}

@media (prefers-reduced-motion: reduce) {
  .panel { animation: none; }
}
</style>
