<script setup lang="ts">
/*
 * Every interactive control is a full pill. Press state is scale(0.97) — the
 * only confirmation on a phone that the tap landed while tel: hands off.
 *
 * Contrast per variant:
 *  primary  flame-500 fill + navy-950 text  ~6.8:1  (never white text on it)
 *  dark     navy-950 fill + white text      ~19:1
 *  ghost    paper fill + navy text          ~17:1
 *  light    white on the navy CTA band
 */
const props = withDefaults(defineProps<{
  href?: string
  to?: string
  variant?: 'primary' | 'dark' | 'ghost' | 'light'
  size?: 'sm' | 'md' | 'lg'
  external?: boolean
  block?: boolean
  type?: 'button' | 'submit'
  disabled?: boolean
}>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
})

const VARIANTS = {
  primary: 'btn-shine bg-flame-500 text-navy-950 shadow-flame hover:bg-flame-400',
  dark: 'bg-navy-950 text-paper-0 shadow-card hover:bg-navy-800',
  ghost: 'border border-paper-300 bg-paper-0 text-navy-950 hover:border-navy-950',
  light: 'bg-paper-0 text-navy-950 hover:bg-flame-50',
} as const

const SIZES = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-[0.9375rem]',
  lg: 'h-14 px-7 text-base',
} as const

const classes = computed(() => [
  'inline-flex items-center justify-center gap-2 rounded-pill font-bold whitespace-nowrap',
  'transition-[transform,background-color,border-color,box-shadow] duration-200 ease-out active:scale-[0.97]',
  'disabled:pointer-events-none disabled:opacity-60',
  VARIANTS[props.variant],
  SIZES[props.size],
  props.block ? 'w-full' : '',
])

const externalAttrs = computed(() =>
  props.external ? { target: '_blank', rel: 'noopener noreferrer' } : {},
)
</script>

<template>
  <NuxtLink v-if="to" :to="to" :class="classes">
    <slot />
  </NuxtLink>
  <a v-else-if="href" :href="href" :class="classes" v-bind="externalAttrs">
    <slot />
  </a>
  <button v-else :type="type" :class="classes" :disabled="disabled">
    <slot />
  </button>
</template>
