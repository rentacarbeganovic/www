<script setup lang="ts">
withDefaults(defineProps<{
  eyebrow?: string
  title: string
  intro?: string
  align?: 'start' | 'center'
  as?: 'h1' | 'h2'
}>(), { align: 'start', as: 'h2' })
</script>

<template>
  <div :class="align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'">
    <p v-if="eyebrow" class="eyebrow reveal">
      {{ eyebrow }}
    </p>
    <component :is="as" class="h-section reveal mt-4">
      {{ title }}
    </component>
    <p v-if="intro" class="body-lg reveal mt-4">
      {{ intro }}
    </p>
  </div>
</template>
