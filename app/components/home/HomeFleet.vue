<script setup lang="ts">
import { FLEET_CARS } from '~/data/business'

/*
 * "Automobili" — the fleet lives on the home page (the menu links here), with
 * a detail page per car for search.
 *
 * Filter by gearbox, since that is the one hard constraint most renters
 * have. The prerendered HTML carries all six cards; filtering is a client
 * nicety. Cards re-flow with a FLIP move transition rather than jumping.
 */
const { t } = useI18n()

type Filter = 'all' | 'automatic' | 'manual'
const filter = ref<Filter>('all')
const FILTERS: Filter[] = ['all', 'automatic', 'manual']

const cars = computed(() =>
  filter.value === 'all' ? FLEET_CARS : FLEET_CARS.filter(car => car.transmission === filter.value),
)

const counts = computed(() => ({
  all: FLEET_CARS.length,
  automatic: FLEET_CARS.filter(c => c.transmission === 'automatic').length,
  manual: FLEET_CARS.filter(c => c.transmission === 'manual').length,
}))
</script>

<template>
  <section id="vozila" class="reveal-group section-y scroll-mt-16 bg-paper-100">
    <div class="shell">
      <div class="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <UiSectionHeading :eyebrow="t.fleet.eyebrow" :title="t.fleet.title" :intro="t.fleet.intro" />

        <div
          class="reveal inline-flex self-start rounded-pill border border-paper-200 bg-paper-0 p-1.5 shadow-card lg:self-auto"
          role="group"
          :aria-label="t.fleet.eyebrow"
        >
          <button
            v-for="key in FILTERS"
            :key="key"
            type="button"
            class="relative flex h-10 items-center gap-2 rounded-pill px-4 text-sm font-bold transition-colors duration-300"
            :class="filter === key ? 'text-paper-0' : 'text-navy-700 hover:text-navy-950'"
            :aria-pressed="filter === key"
            @click="filter = key"
          >
            <span
              v-if="filter === key"
              aria-hidden="true"
              class="filter-pill absolute inset-0 rounded-pill bg-navy-950"
            />
            <span class="relative">{{ t.fleet.filters[key] }}</span>
            <span
              class="relative rounded-pill px-1.5 text-[0.6875rem] tabular-nums"
              :class="filter === key ? 'bg-flame-500 text-navy-950' : 'bg-paper-100 text-navy-500'"
            >{{ counts[key] }}</span>
          </button>
        </div>
      </div>

      <TransitionGroup
        tag="div"
        class="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        move-class="transition-transform duration-500 ease-out"
        enter-active-class="transition duration-500 ease-out"
        enter-from-class="scale-[0.96] opacity-0"
        leave-active-class="absolute transition duration-200 ease-out"
        leave-to-class="scale-[0.96] opacity-0"
      >
        <div v-for="car in cars" :key="car.id">
          <div class="reveal h-full">
            <HomeFleetCard :car="car" class="h-full" />
          </div>
        </div>
      </TransitionGroup>
    </div>
  </section>
</template>

<style scoped>
.filter-pill {
  animation: pill-in 0.35s cubic-bezier(0.23, 1, 0.32, 1);
}

@keyframes pill-in {
  from { transform: scale(0.85); opacity: 0.4; }
  to { transform: none; opacity: 1; }
}
</style>
