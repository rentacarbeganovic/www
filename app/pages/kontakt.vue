<script setup lang="ts">
import { PhArrowUpRight, PhMapPin, PhPhone, PhWhatsappLogo } from '@phosphor-icons/vue'

/*
 * Direct channels first — a phone call converts better than any form — then
 * the full enquiry form, then the map. The reservations email is never shown;
 * the form reaches it (see SiteEnquiryForm).
 *
 * The map is a lazy iframe to Google Maps' keyless embed, pinned to the
 * listing's coordinates.
 */
const { t, business } = useI18n()
useScrollReveal()

const trail = computed(() => [
  { name: t.value.breadcrumbHome, path: '/' },
  { name: t.value.nav.contact, path: '/kontakt' },
])

useSeo(() => ({
  title: t.value.contactPage.metaTitle,
  description: t.value.contactPage.metaDescription,
  path: '/kontakt',
}))

jsonLd(
  breadcrumbSchema(trail.value),
  { '@context': 'https://schema.org', '@type': 'ContactPage', name: t.value.contactPage.metaTitle, about: { '@id': `${absoluteUrl('/')}${ORGANIZATION_ID}` } },
)

const mapSrc = `https://maps.google.com/maps?q=${business.geo.lat},${business.geo.lng}&z=15&output=embed`
</script>

<template>
  <div>
    <SitePageHero :title="t.contactPage.title" :lead="t.contactPage.lead" :trail="trail" />

    <section class="reveal-group pb-20 md:pb-28">
      <div class="shell grid gap-6 lg:grid-cols-12">
        <div class="flex flex-col gap-4 lg:col-span-5">
          <a :href="business.phoneHref" class="reveal surface surface-hover group flex items-center gap-5 p-6">
            <span class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-flame-500 text-navy-950 transition-transform duration-300 group-hover:rotate-6">
              <PhPhone :size="26" weight="fill" aria-hidden="true" />
            </span>
            <span>
              <span class="block text-xs font-bold uppercase tracking-[0.16em] text-navy-500">{{ t.contactPage.callTitle }}</span>
              <span dir="ltr" class="block font-display text-2xl font-black text-navy-950 rtl:text-end">{{ business.phoneDisplay }}</span>
            </span>
          </a>

          <a :href="business.whatsappHref" target="_blank" rel="noopener noreferrer" class="reveal surface surface-hover group flex items-center gap-5 p-6">
            <span class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#25d366] text-white transition-transform duration-300 group-hover:rotate-6">
              <PhWhatsappLogo :size="28" weight="fill" aria-hidden="true" />
            </span>
            <span>
              <span class="block text-xs font-bold uppercase tracking-[0.16em] text-navy-500">{{ t.contactPage.whatsappTitle }}</span>
              <span class="block font-display text-lg font-bold text-navy-950">{{ t.contactPage.whatsappBody }}</span>
            </span>
          </a>

          <div class="reveal surface overflow-hidden">
            <div class="flex items-start gap-5 p-6">
              <span class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-navy-950 text-flame-400">
                <PhMapPin :size="26" weight="fill" aria-hidden="true" />
              </span>
              <span>
                <span class="block text-xs font-bold uppercase tracking-[0.16em] text-navy-500">{{ t.contactPage.addressTitle }}</span>
                <address class="mt-1 block font-display text-lg font-bold not-italic text-navy-950">{{ business.addressShort }}</address>
              </span>
            </div>
            <iframe
              :src="mapSrc"
              :title="business.addressShort"
              class="h-64 w-full border-0 grayscale-[30%]"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            />
            <a
              :href="business.googleShortUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center justify-between bg-paper-100 px-6 py-4 text-sm font-bold text-navy-950 transition-colors hover:bg-flame-50"
            >
              {{ t.contactPage.directions }}
              <PhArrowUpRight :size="16" weight="bold" class="rtl:-scale-x-100" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div class="reveal lg:col-span-7">
          <SiteEnquiryForm variant="full" />
        </div>
      </div>
    </section>
  </div>
</template>
