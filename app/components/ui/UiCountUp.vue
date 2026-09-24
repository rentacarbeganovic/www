<script setup lang="ts">
/*
 * Counts a number up from zero the first time it scrolls into view. Values
 * that are not plain integers ("M4") render as-is. The final value is what
 * is prerendered, so crawlers and no-JS visitors see the real figure.
 */
const props = defineProps<{ value: string }>()

const target = Number.parseInt(props.value, 10)
const isNumber = String(target) === props.value
const display = ref(props.value)
const el = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!isNumber || !el.value) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const observer = new IntersectionObserver(([entry]) => {
    if (!entry?.isIntersecting) return
    observer.disconnect()
    const start = performance.now()
    const duration = 1100
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      const eased = 1 - (1 - p) ** 3
      display.value = String(Math.round(target * eased))
      if (p < 1) requestAnimationFrame(tick)
    }
    display.value = '0'
    requestAnimationFrame(tick)
  }, { threshold: 0.6 })

  observer.observe(el.value)
  onUnmounted(() => observer.disconnect())
})
</script>

<template>
  <span ref="el" class="tabular-nums">{{ display }}</span>
</template>
