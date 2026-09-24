<script setup lang="ts">
import { PhCaretDown, PhCheck, PhGlobeSimple } from '@phosphor-icons/vue'

/*
 * Each language is a real link to a real URL, so a crawler following these
 * discovers every language version of the page it is on.
 */
const { t, localeLinks } = useI18n()

const isOpen = ref(false)
const root = ref<HTMLElement | null>(null)

const current = computed(
  () => localeLinks.value.find(o => o.isCurrent) ?? localeLinks.value[0]!,
)

function onPointerDown(event: PointerEvent) {
  if (!root.value?.contains(event.target as Node)) isOpen.value = false
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') isOpen.value = false
}

onMounted(() => {
  document.addEventListener('pointerdown', onPointerDown)
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('pointerdown', onPointerDown)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div ref="root" class="relative">
    <button
      type="button"
      class="flex h-11 items-center gap-1.5 rounded-pill border border-paper-300 bg-paper-0 px-3 text-sm font-bold text-navy-950 transition-colors duration-200 hover:border-navy-950"
      :aria-label="t.nav.langLabel"
      :aria-expanded="isOpen"
      aria-haspopup="menu"
      @click="isOpen = !isOpen"
    >
      <PhGlobeSimple :size="17" aria-hidden="true" />
      <span>{{ current.label }}</span>
      <PhCaretDown
        :size="12"
        class="transition-transform duration-200"
        :class="isOpen ? 'rotate-180' : ''"
        aria-hidden="true"
      />
    </button>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-1 scale-[0.97] opacity-0"
      leave-active-class="transition duration-150 ease-out"
      leave-to-class="opacity-0"
    >
      <div
        v-show="isOpen"
        role="menu"
        class="absolute end-0 top-[3.25rem] z-50 min-w-[11rem] origin-top-right overflow-hidden rounded-2xl border border-paper-200 bg-paper-0 p-1.5 shadow-lift"
      >
        <NuxtLink
          v-for="opt in localeLinks"
          :key="opt.code"
          :to="opt.to"
          role="menuitem"
          :hreflang="opt.code"
          :lang="opt.code"
          :aria-current="opt.isCurrent ? 'true' : undefined"
          class="flex w-full items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-start text-sm font-semibold transition-colors duration-150 hover:bg-paper-100"
          :class="opt.isCurrent ? 'text-flame-700' : 'text-navy-700'"
          @click="isOpen = false"
        >
          <span :dir="opt.dir">{{ opt.name }}</span>
          <PhCheck v-if="opt.isCurrent" :size="14" weight="bold" aria-hidden="true" />
        </NuxtLink>
      </div>
    </Transition>
  </div>
</template>
