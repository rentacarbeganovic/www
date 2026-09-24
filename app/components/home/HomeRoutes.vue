<script setup lang="ts">
import { PhArrowUpRight, PhMapPin, PhNavigationArrow } from '@phosphor-icons/vue'

/*
 * The geography, as a road. The office is the start of the line and every
 * destination is a stop along it, nearest first. The orange fill runs down
 * the road on a native scroll timeline where supported, and the dashed centre
 * line scrolls on its own like road markings passing under the car.
 *
 * Distances are real driving routes from the office (OSRM), rounded. No
 * delivery is implied anywhere: the brief is explicit that it is not offered
 * on the site.
 */
const { t, business } = useI18n()
</script>

<template>
  <section class="reveal-group section-y">
    <div class="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div class="lg:col-span-5">
        <div class="lg:sticky lg:top-28">
          <UiSectionHeading :eyebrow="t.routes.eyebrow" :title="t.routes.title" :intro="t.routes.intro" />

          <div class="reveal surface mt-8 overflow-hidden">
            <div class="flex items-start gap-4 p-6">
              <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-flame-500 text-navy-950">
                <PhMapPin :size="24" weight="fill" aria-hidden="true" />
              </span>
              <div>
                <p class="text-xs font-bold uppercase tracking-[0.16em] text-navy-500">
                  {{ t.routes.addressLabel }}
                </p>
                <address class="mt-1 font-display text-lg font-bold not-italic text-navy-950">
                  {{ business.addressShort }}
                </address>
              </div>
            </div>
            <a
              :href="business.googleShortUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center justify-between border-t border-paper-200 bg-paper-100 px-6 py-4 text-sm font-bold text-navy-950 transition-colors duration-200 hover:bg-flame-50"
            >
              <span class="flex items-center gap-2">
                <PhNavigationArrow :size="17" weight="fill" class="text-flame-600" aria-hidden="true" />
                {{ t.routes.mapCta }}
              </span>
              <PhArrowUpRight :size="16" weight="bold" class="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div class="relative lg:col-span-7">
        <!-- The road -->
        <div aria-hidden="true" class="absolute bottom-6 start-[1.125rem] top-6 w-3 overflow-hidden rounded-pill bg-navy-950">
          <div class="road-dash absolute inset-x-[5px] -top-10 bottom-0" />
          <div class="road-progress absolute inset-y-0 start-0 w-full origin-top bg-gradient-to-b from-flame-500 to-sun opacity-90" />
        </div>

        <ol class="relative space-y-3">
          <li class="reveal relative flex items-center gap-5 ps-0">
            <span class="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-paper-50 bg-flame-500 text-navy-950 shadow-flame">
              <PhMapPin :size="20" weight="fill" aria-hidden="true" />
            </span>
            <p class="font-display text-lg font-extrabold uppercase text-navy-950" style="font-stretch: 110%">
              {{ business.shortName }} · M4
            </p>
          </li>
          <li
            v-for="stop in t.routes.items"
            :key="stop.place"
            class="reveal group relative flex items-center gap-5"
          >
            <span class="relative z-10 ms-[0.875rem] h-5 w-5 shrink-0 rounded-full border-4 border-paper-50 bg-navy-950 transition-colors duration-300 group-hover:bg-flame-500" />
            <div class="surface flex flex-1 items-center justify-between gap-4 px-5 py-4 transition-[transform,box-shadow] duration-300 ease-out group-hover:translate-x-1 group-hover:shadow-lift rtl:group-hover:-translate-x-1">
              <div>
                <h3 class="font-display text-[1.0625rem] font-bold text-navy-950">
                  {{ stop.place }}
                </h3>
                <p class="mt-0.5 text-[0.8125rem] text-navy-500">
                  {{ stop.note }}
                </p>
              </div>
              <div class="shrink-0 text-end">
                <p class="font-display text-xl font-black tabular-nums text-navy-950" dir="ltr">
                  {{ stop.km }}<span class="ms-0.5 text-sm font-bold text-navy-400">km</span>
                </p>
                <p class="text-[0.8125rem] font-semibold text-flame-700">
                  ~{{ stop.time }}
                </p>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<style scoped>
.road-dash {
  background: repeating-linear-gradient(to bottom, #fff 0 14px, transparent 14px 28px);
  opacity: 0.55;
  animation: road-move 1.4s linear infinite;
  z-index: 1;
}

@keyframes road-move {
  from { transform: translateY(0); }
  to { transform: translateY(28px); }
}

/* Scroll-driven fill of the road, top to bottom, where supported. */
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .road-progress {
      animation: road-grow linear both;
      animation-timeline: view();
      animation-range: entry 30% cover 70%;
    }
  }
}

@keyframes road-grow {
  from { transform: scaleY(0); }
  to { transform: scaleY(1); }
}

@media (prefers-reduced-motion: reduce) {
  .road-dash { animation: none; }
}
</style>
