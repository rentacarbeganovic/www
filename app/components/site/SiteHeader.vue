<script setup lang="ts">
import { PhList, PhPhone, PhX } from '@phosphor-icons/vue'

/*
 * Sticky header. The phone number is the loudest thing in it — rendered as
 * readable digits in the orange pill, not hidden behind an icon, because a
 * visible number is what a traveller screenshots before losing signal.
 *
 * Transparent over the hero's sun wash, then a paper bar with a hairline once
 * the page scrolls. Driven by an IntersectionObserver on a sentinel, so
 * nothing runs per frame.
 */
const { t, business, menuLinks, localeRoute } = useI18n()

const isMenuOpen = ref(false)
const isScrolled = ref(false)
const sentinel = ref<HTMLElement | null>(null)

let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!sentinel.value) return
  observer = new IntersectionObserver(
    ([entry]) => { isScrolled.value = !entry?.isIntersecting },
    { threshold: 0 },
  )
  observer.observe(sentinel.value)
})

onUnmounted(() => observer?.disconnect())

watch(() => useRoute().fullPath, () => { isMenuOpen.value = false })
</script>

<template>
  <div>
    <span ref="sentinel" aria-hidden="true" class="absolute top-0 h-8 w-full" />

    <header
      class="fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,box-shadow] duration-300 ease-out"
      :class="isScrolled || isMenuOpen
        ? 'border-b border-paper-200 bg-paper-50/90 shadow-card backdrop-blur-md'
        : 'border-b border-transparent'"
    >
      <div class="shell flex h-[4.25rem] items-center justify-between gap-4 md:h-20">
        <NuxtLink :to="localeRoute('/')" class="shrink-0" :aria-label="business.name">
          <SiteLogo class="h-10 md:h-12" />
        </NuxtLink>

        <nav class="hidden items-center gap-7 lg:flex" :aria-label="t.nav.mainNav">
          <NuxtLink
            v-for="link in menuLinks"
            :key="link.to"
            :to="link.to"
            class="group relative py-2 text-[0.9375rem] font-semibold text-navy-700 transition-colors duration-200 hover:text-navy-950"
          >
            {{ link.label }}
            <span
              aria-hidden="true"
              class="absolute inset-x-0 -bottom-0.5 h-[3px] origin-left scale-x-0 rounded-pill bg-gradient-to-r from-flame-500 to-sun transition-transform duration-300 ease-out group-hover:scale-x-100 rtl:origin-right"
            />
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-2">
          <SiteLangSwitcher />

          <a
            :href="business.phoneHref"
            class="btn-shine hidden h-11 items-center gap-2 rounded-pill bg-flame-500 px-5 text-[0.9375rem] font-extrabold text-navy-950 shadow-flame transition-[transform,background-color] duration-200 ease-out hover:bg-flame-400 active:scale-[0.97] sm:inline-flex"
          >
            <span class="relative flex h-5 w-5 items-center justify-center" aria-hidden="true">
              <span class="absolute inset-0 animate-pulse-ring rounded-full bg-navy-950/25" />
              <PhPhone :size="17" weight="fill" class="relative" />
            </span>
            <span dir="ltr">{{ business.phoneDisplay }}</span>
          </a>

          <a
            :href="business.phoneHref"
            class="flex h-11 w-11 items-center justify-center rounded-pill bg-flame-500 text-navy-950 sm:hidden"
            :aria-label="`${t.nav.call} ${business.phoneDisplay}`"
          >
            <PhPhone :size="20" weight="fill" aria-hidden="true" />
          </a>

          <button
            type="button"
            class="flex h-11 w-11 items-center justify-center rounded-pill border border-paper-300 bg-paper-0 text-navy-950 transition-colors duration-200 hover:border-navy-950 lg:hidden"
            :aria-label="isMenuOpen ? t.nav.closeMenu : t.nav.openMenu"
            :aria-expanded="isMenuOpen"
            aria-controls="mobile-nav"
            @click="isMenuOpen = !isMenuOpen"
          >
            <PhX v-if="isMenuOpen" :size="20" aria-hidden="true" />
            <PhList v-else :size="20" aria-hidden="true" />
          </button>
        </div>
      </div>

      <Transition
        enter-active-class="transition duration-300 ease-drawer"
        enter-from-class="-translate-y-3 opacity-0"
        leave-active-class="transition duration-200 ease-out"
        leave-to-class="-translate-y-2 opacity-0"
      >
        <nav
          v-show="isMenuOpen"
          id="mobile-nav"
          class="border-t border-paper-200 bg-paper-50 lg:hidden"
          :aria-label="t.nav.mobileNav"
        >
          <div class="shell flex flex-col py-3">
            <NuxtLink
              v-for="(link, i) in menuLinks"
              :key="link.to"
              :to="link.to"
              class="flex items-center justify-between border-b border-paper-200 py-4 font-display text-xl font-bold text-navy-950"
              :style="{ transitionDelay: `${i * 30}ms` }"
              @click="isMenuOpen = false"
            >
              {{ link.label }}
              <span aria-hidden="true" class="h-[3px] w-6 rounded-pill bg-gradient-to-r from-flame-500 to-sun" />
            </NuxtLink>

            <UiButton :href="business.phoneHref" size="lg" block class="my-5">
              <PhPhone :size="18" weight="fill" aria-hidden="true" />
              <span dir="ltr">{{ business.phoneDisplay }}</span>
            </UiButton>
          </div>
        </nav>
      </Transition>
    </header>
  </div>
</template>
