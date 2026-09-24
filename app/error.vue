<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{ error: NuxtError }>()

const { t, localeRoute } = useI18n()

useHead({ title: t.value.notFound.title, meta: [{ name: 'robots', content: 'noindex' }] })
</script>

<template>
  <NuxtLayout>
    <section class="relative overflow-hidden pb-24 pt-40">
      <div aria-hidden="true" class="sun-glow pointer-events-none absolute inset-0" />
      <div class="shell relative text-center">
        <p class="font-display text-[7rem] font-black leading-none text-gradient-flame md:text-[10rem]" style="font-stretch: 115%">
          {{ error.statusCode || 404 }}
        </p>
        <h1 class="h-section mx-auto mt-4 max-w-xl">
          {{ t.notFound.title }}
        </h1>
        <p class="body-lg mx-auto mt-4 max-w-md">
          {{ t.notFound.body }}
        </p>
        <UiButton :to="localeRoute('/')" size="lg" class="mt-8">
          {{ t.notFound.cta }}
        </UiButton>
      </div>
    </section>
  </NuxtLayout>
</template>
