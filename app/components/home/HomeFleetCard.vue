<script setup lang="ts">
import { PhArrowUpRight, PhCalendarBlank, PhGearSix, PhUsers } from '@phosphor-icons/vue'
import { carName } from '~/data/business'
import type { FleetCar } from '~/i18n/types'

/*
 * "Rezerviši" does not leave the page: it writes the car into the shared
 * enquiry state and scrolls to the form, which already shows it selected.
 * On pages without the form (a vehicle page), it links home to the form.
 */
const props = defineProps<{ car: FleetCar }>()

const { t, localeRoute } = useI18n()
const selectedCar = useState<string>('enquiry-car', () => '')

const name = computed(() => carName(props.car))
const gearbox = computed(() =>
  props.car.transmission === 'automatic' ? t.value.fleet.automatic : t.value.fleet.manual,
)

function book(event: MouseEvent) {
  selectedCar.value = name.value
  const target = document.getElementById('upit')
  if (!target) return
  event.preventDefault()
  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  target.querySelector<HTMLInputElement>('input[name="pickup"]')?.focus({ preventScroll: true })
}
</script>

<template>
  <article class="surface group relative flex flex-col overflow-hidden transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-lift">
    <NuxtLink :to="localeRoute(`/vozila/${car.slug}`)" class="relative block overflow-hidden bg-paper-100" tabindex="-1" aria-hidden="true">
      <img
        :src="car.image"
        :srcset="fleetSrcset(car.image)"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
        :alt="fill(t.fleet.imageAlt, { car: name })"
        class="aspect-[3/2] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        width="1280"
        height="853"
        loading="lazy"
        decoding="async"
      >
      <span
        class="absolute start-4 top-4 inline-flex items-center gap-1.5 rounded-pill px-3 py-1 text-xs font-extrabold uppercase tracking-wide shadow-card"
        :class="car.transmission === 'automatic' ? 'bg-flame-500 text-navy-950' : 'bg-paper-0 text-navy-950'"
      >
        <PhGearSix :size="13" weight="bold" aria-hidden="true" />
        {{ gearbox }}
      </span>
      <span class="absolute end-4 top-4 rounded-pill bg-navy-950/80 px-3 py-1 text-xs font-bold text-paper-0 backdrop-blur">
        {{ t.fleet.categories[car.category] }}
      </span>
    </NuxtLink>

    <div class="flex flex-1 flex-col p-6">
      <p class="text-xs font-bold uppercase tracking-[0.16em] text-flame-700">
        {{ car.brand }}
      </p>
      <h3 class="mt-1 font-display text-[1.75rem] font-extrabold leading-none text-navy-950" style="font-stretch: 110%">
        <NuxtLink :to="localeRoute(`/vozila/${car.slug}`)" class="after:absolute after:inset-0 focus-visible:outline-none">
          {{ car.model }}
        </NuxtLink>
      </h3>

      <p class="body-base mt-3 flex-1">
        {{ t.fleet.audience[car.id] }}
      </p>

      <ul class="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-paper-200 pt-4 text-[0.8125rem] font-semibold text-navy-700">
        <li class="flex items-center gap-1.5">
          <PhCalendarBlank :size="16" class="text-navy-400" aria-hidden="true" />
          {{ car.year }}
        </li>
        <li v-if="car.seats" class="flex items-center gap-1.5">
          <PhUsers :size="16" class="text-navy-400" aria-hidden="true" />
          {{ seatsLabel(car, t.fleet.seats) }}
        </li>
        <li class="flex items-center gap-1.5">
          <PhGearSix :size="16" class="text-navy-400" aria-hidden="true" />
          {{ gearbox }}
        </li>
      </ul>

      <div class="relative z-10 mt-5 flex gap-2.5">
        <UiButton :href="`${localeRoute('/')}#upit`" size="md" class="flex-1" @click="book">
          {{ t.fleet.book }}
        </UiButton>
        <UiButton :to="localeRoute(`/vozila/${car.slug}`)" variant="ghost" size="md" :aria-label="`${t.fleet.details}: ${name}`">
          {{ t.fleet.details }}
          <PhArrowUpRight :size="15" weight="bold" class="rtl:-scale-x-100" aria-hidden="true" />
        </UiButton>
      </div>
    </div>
  </article>
</template>
