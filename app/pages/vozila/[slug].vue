<script setup lang="ts">
import { PhCalendarBlank, PhCheckCircle, PhGearSix, PhPhone, PhUsers } from '@phosphor-icons/vue'
import { carName, findCarBySlug, similarCars } from '~/data/business'
import { stripLocale } from '~/i18n/routing'

/*
 * One page per car, for searches like "rent a car Prijedor automatik" or
 * "Golf 7 najam Prijedor". The slug is the same in every language: a model
 * name is a proper noun.
 *
 * The enquiry form is on this page too, pre-selected with this car, so the
 * visitor can ask about it without going back.
 */
const route = useRoute()
const { t, business, localeRoute } = useI18n()

const car = findCarBySlug(String(route.params.slug))

if (!car) {
  throw createError({ statusCode: 404, statusMessage: 'Vehicle not found', fatal: true })
}

useScrollReveal()

const name = carName(car)
useState<string>('enquiry-car', () => '').value = name

const basePath = computed(() => stripLocale(route.path).base)
const gearbox = computed(() => car.transmission === 'automatic' ? t.value.fleet.automatic : t.value.fleet.manual)
const category = computed(() => t.value.fleet.categories[car.category])
const vars = computed(() => ({ car: name, year: car.year, gearbox: gearbox.value.toLowerCase() }))

const specs = computed(() => [
  { label: t.value.vehicle.spec.brand, value: name },
  { label: t.value.vehicle.spec.year, value: String(car.year) },
  { label: t.value.vehicle.spec.transmission, value: gearbox.value },
  { label: t.value.vehicle.spec.seats, value: car.seats === null ? t.value.vehicle.spec.unknown : String(car.seats) },
  { label: t.value.vehicle.spec.category, value: category.value },
])

const related = similarCars(car)

const trail = computed(() => [
  { name: t.value.breadcrumbHome, path: '/' },
  { name: t.value.nav.fleet, path: `${localeRoute('/')}#vozila`, raw: true },
  { name, path: `/vozila/${car.slug}` },
])

useSeo(() => ({
  title: fill(t.value.vehicle.metaTitle, vars.value),
  description: fill(t.value.vehicle.metaDescription, vars.value),
  path: basePath.value,
  image: car.image,
  imageAlt: fill(t.value.fleet.imageAlt, { car: name }),
}))

jsonLd(
  breadcrumbSchema([
    { name: t.value.breadcrumbHome, path: '/' },
    { name, path: `/vozila/${car.slug}` },
  ]),
  vehicleSchema({
    car,
    path: basePath.value,
    description: t.value.fleet.audience[car.id] ?? '',
    categoryLabel: category.value,
  }),
)
</script>

<template>
  <div v-if="car">
    <section class="reveal-onload relative overflow-hidden pb-16 pt-28 md:pt-36">
      <div aria-hidden="true" class="sun-glow pointer-events-none absolute inset-0" />
      <div class="shell relative">
        <SiteBreadcrumb :trail="trail" />

        <div class="mt-8 grid gap-10 lg:grid-cols-12 lg:items-center">
          <figure class="reveal-lcp relative lg:col-span-7">
            <div class="overflow-hidden rounded-[1.75rem] shadow-lift">
              <img
                :src="car.image"
                :srcset="fleetSrcset(car.image)"
                sizes="(max-width: 1024px) 100vw, 760px"
                :alt="fill(t.fleet.imageAlt, { car: name })"
                class="aspect-[3/2] w-full object-cover"
                width="1280"
                height="853"
                fetchpriority="high"
                decoding="async"
              >
            </div>
            <span
              class="absolute start-5 top-5 inline-flex items-center gap-1.5 rounded-pill px-4 py-1.5 text-sm font-extrabold uppercase tracking-wide shadow-card"
              :class="car.transmission === 'automatic' ? 'bg-flame-500 text-navy-950' : 'bg-paper-0 text-navy-950'"
            >
              <PhGearSix :size="15" weight="bold" aria-hidden="true" />
              {{ gearbox }}
            </span>
          </figure>

          <div class="lg:col-span-5">
            <p class="reveal text-sm font-bold uppercase tracking-[0.16em] text-flame-700">
              {{ car.brand }} · {{ category }}
            </p>
            <h1 class="h-display reveal relative mt-3 inline-block" style="--reveal-delay: 60ms">
              {{ name }}
              <UiSwoosh delay="0.6s" class="!w-2/3" />
            </h1>

            <ul class="reveal mt-8 flex flex-wrap gap-2.5" style="--reveal-delay: 120ms">
              <li class="flex items-center gap-2 rounded-pill border border-paper-200 bg-paper-0 px-4 py-2 text-sm font-bold text-navy-950">
                <PhCalendarBlank :size="17" class="text-flame-600" aria-hidden="true" /> {{ car.year }}
              </li>
              <li class="flex items-center gap-2 rounded-pill border border-paper-200 bg-paper-0 px-4 py-2 text-sm font-bold text-navy-950">
                <PhGearSix :size="17" class="text-flame-600" aria-hidden="true" /> {{ gearbox }}
              </li>
              <li v-if="car.seats" class="flex items-center gap-2 rounded-pill border border-paper-200 bg-paper-0 px-4 py-2 text-sm font-bold text-navy-950">
                <PhUsers :size="17" class="text-flame-600" aria-hidden="true" /> {{ seatsLabel(car, t.fleet.seats) }}
              </li>
            </ul>

            <h2 class="h-card reveal mt-8" style="--reveal-delay: 160ms">
              {{ t.vehicle.audienceTitle }}
            </h2>
            <p class="body-lg reveal mt-2" style="--reveal-delay: 180ms">
              {{ t.fleet.audience[car.id] }}
            </p>

            <div class="reveal mt-8 flex flex-col gap-3 sm:flex-row" style="--reveal-delay: 220ms">
              <UiButton href="#upit" size="lg">
                {{ t.fleet.book }}
              </UiButton>
              <UiButton :href="business.phoneHref" variant="dark" size="lg">
                <PhPhone :size="18" weight="fill" aria-hidden="true" />
                <span dir="ltr">{{ business.phoneDisplay }}</span>
              </UiButton>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="reveal-group pb-20 md:pb-28">
      <div class="shell grid gap-6 lg:grid-cols-12">
        <div class="flex flex-col gap-6 lg:col-span-5">
          <div class="reveal surface p-7">
            <h2 class="h-card">
              {{ t.vehicle.specsTitle }}
            </h2>
            <dl class="mt-5 divide-y divide-paper-200 border-t border-paper-200">
              <div v-for="spec in specs" :key="spec.label" class="flex items-baseline justify-between gap-5 py-3">
                <dt class="text-sm text-navy-500">
                  {{ spec.label }}
                </dt>
                <dd class="text-[0.9375rem] font-bold text-navy-950">
                  {{ spec.value }}
                </dd>
              </div>
            </dl>
          </div>
          <div class="reveal surface p-7">
            <h2 class="h-card">
              {{ t.vehicle.priceTitle }}
            </h2>
            <p class="body-base mt-3 flex gap-3">
              <PhCheckCircle :size="20" weight="fill" class="shrink-0 text-flame-500" aria-hidden="true" />
              {{ t.vehicle.priceBody }}
            </p>
          </div>
        </div>
        <div class="reveal lg:col-span-7">
          <SiteEnquiryForm variant="full" />
        </div>
      </div>
    </section>

    <section class="reveal-group section-y bg-paper-100">
      <div class="shell">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <UiSectionHeading :title="t.vehicle.similarTitle" />
          <UiButton :to="`${localeRoute('/')}#vozila`" variant="ghost" class="reveal">
            {{ t.vehicle.backToFleet }}
          </UiButton>
        </div>
        <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="other in related" :key="other.id" class="reveal">
            <HomeFleetCard :car="other" class="h-full" />
          </div>
        </div>
      </div>
    </section>

    <SiteCtaBand />
  </div>
</template>
