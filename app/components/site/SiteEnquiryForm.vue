<script setup lang="ts">
import { PhCheckCircle, PhPaperPlaneTilt, PhWarningCircle, PhWhatsappLogo } from '@phosphor-icons/vue'
import { carName, FLEET_CARS, inboxHref, whatsappHref } from '~/data/business'

/*
 * The enquiry form: in the hero on the home page, and on /kontakt.
 *
 * Where it goes. The brief: reservations reach the client's inbox, but the
 * address is never shown. So:
 *  - with NUXT_PUBLIC_WEB3FORMS_KEY set, it posts to Web3Forms, which
 *    forwards to the inbox — nothing opens, the visitor just sees "sent";
 *  - without it, submit opens the visitor's mail app with a mailto: built at
 *    click time (the address is never in the HTML) and the enquiry typed out.
 * The WhatsApp button beside it carries whatever is typed, for everyone who
 * would rather message than email — which on a phone is most people.
 *
 * The chosen car is shared state: "Rezerviši" on a fleet card sets it and
 * scrolls here, so the visitor never has to pick the car twice.
 */
const props = withDefaults(defineProps<{ variant?: 'hero' | 'full' }>(), { variant: 'hero' })

const { t, business } = useI18n()
const { track } = useAnalytics()
const accessKey = String(useRuntimeConfig().public.web3formsKey || '')

const selectedCar = useState<string>('enquiry-car', () => '')

const form = reactive({ pickup: '', dropoff: '', name: '', phone: '', message: '' })
const touched = reactive({ pickup: false, dropoff: false, name: false, phone: false })
const botcheck = ref('')
const status = ref<'idle' | 'sending' | 'sent' | 'mailed' | 'error'>('idle')

/* Set after mount, so the prerendered HTML carries no build-day date. */
const today = ref('')
onMounted(() => {
  const d = new Date()
  today.value = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10)
})

const carOptions = computed(() => FLEET_CARS.map(car => ({
  value: carName(car),
  label: `${carName(car)} · ${car.year} · ${car.transmission === 'automatic' ? t.value.fleet.automatic : t.value.fleet.manual}`,
})))

const errors = computed(() => {
  const required = t.value.form.errorRequired
  return {
    pickup: touched.pickup && !form.pickup ? required : '',
    dropoff: touched.dropoff && !form.dropoff
      ? required
      : touched.dropoff && form.pickup && form.dropoff < form.pickup
        ? t.value.form.errorDates
        : '',
    name: touched.name && !form.name.trim() ? required : '',
    phone: touched.phone && !form.phone.trim() ? required : '',
  }
})

const isValid = computed(() =>
  !!form.pickup && !!form.dropoff && form.dropoff >= form.pickup
  && !!form.name.trim() && !!form.phone.trim(),
)

/* 2026-07-14 -> 14.07.2026, the way everyone in the region writes a date. */
function human(iso: string) {
  const [y, m, d] = iso.split('-')
  return y && m && d ? `${d}.${m}.${y}` : iso
}

function lines() {
  const f = t.value.form
  return [
    form.pickup && `${f.pickupDate}: ${human(form.pickup)}`,
    form.dropoff && `${f.returnDate}: ${human(form.dropoff)}`,
    `${f.car}: ${selectedCar.value || f.carAny}`,
    form.name.trim() && `${f.name}: ${form.name.trim()}`,
    form.phone.trim() && `${f.phone}: ${form.phone.trim()}`,
    form.message.trim() && `${f.message}: ${form.message.trim()}`,
  ].filter(Boolean) as string[]
}

const whatsappFormHref = computed(() =>
  whatsappHref([`${t.value.form.subject} — ${business.name}`, ...lines()].join('\n')),
)

async function submit() {
  touched.pickup = true
  touched.dropoff = true
  touched.name = true
  touched.phone = true
  if (!isValid.value || status.value === 'sending') return

  if (botcheck.value) {
    status.value = 'sent'
    return
  }

  const subject = `${t.value.form.subject}: ${human(form.pickup)} – ${human(form.dropoff)} · ${form.name.trim()}`

  if (!accessKey) {
    window.location.href = inboxHref(subject, lines().join('\n'))
    track('form_submit', { channel: 'mailto' })
    status.value = 'mailed'
    return
  }

  status.value = 'sending'
  try {
    const result = await $fetch<{ success: boolean }>('https://api.web3forms.com/submit', {
      method: 'POST',
      body: {
        access_key: accessKey,
        subject,
        from_name: business.name,
        message: lines().join('\n'),
      },
    })
    if (!result?.success) throw new Error('rejected')
    track('form_submit', { channel: 'web3forms' })
    status.value = 'sent'
  }
  catch {
    status.value = 'error'
  }
}

const isHero = computed(() => props.variant === 'hero')
</script>

<template>
  <form
    id="upit"
    class="relative scroll-mt-28 rounded-[1.5rem] border border-paper-200 bg-paper-0 p-5 shadow-lift sm:p-7"
    novalidate
    @submit.prevent="submit"
  >
    <!-- Orange speed-bar across the top edge, from the "B" of the wordmark. -->
    <span aria-hidden="true" class="absolute inset-x-7 -top-px h-[3px] rounded-pill bg-gradient-to-r from-flame-600 via-flame-500 to-sun" />

    <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
      <component :is="isHero ? 'h2' : 'h3'" class="h-card text-[1.375rem]">
        {{ t.form.title }}
      </component>
      <p class="text-[0.8125rem] font-medium text-navy-500">
        {{ t.form.note }}
      </p>
    </div>

    <div class="mt-5 grid grid-cols-2 gap-x-3 gap-y-3.5">
      <label class="block">
        <span class="field-label">{{ t.form.pickupDate }}</span>
        <input
          v-model="form.pickup"
          type="date"
          name="pickup"
          :min="today || undefined"
          class="field"
          :aria-invalid="!!errors.pickup"
          @blur="touched.pickup = true"
        >
        <span v-if="errors.pickup" class="mt-1 block text-xs font-semibold text-red-600">{{ errors.pickup }}</span>
      </label>

      <label class="block">
        <span class="field-label">{{ t.form.returnDate }}</span>
        <input
          v-model="form.dropoff"
          type="date"
          name="return"
          :min="form.pickup || today || undefined"
          class="field"
          :aria-invalid="!!errors.dropoff"
          @blur="touched.dropoff = true"
        >
        <span v-if="errors.dropoff" class="mt-1 block text-xs font-semibold text-red-600">{{ errors.dropoff }}</span>
      </label>

      <label class="col-span-2 block">
        <span class="field-label">{{ t.form.car }}</span>
        <select v-model="selectedCar" name="car" class="field appearance-none bg-[length:14px] bg-[position:right_1rem_center] bg-no-repeat pe-10 rtl:bg-[position:left_1rem_center]" style="background-image: url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M3 6l5 5 5-5' fill='none' stroke='%2307101c' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E&quot;)">
          <option value="">
            {{ t.form.carAny }}
          </option>
          <option v-for="opt in carOptions" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>
      </label>

      <label class="col-span-2 block sm:col-span-1">
        <span class="field-label">{{ t.form.name }}</span>
        <input
          v-model="form.name"
          type="text"
          name="name"
          autocomplete="name"
          :placeholder="t.form.namePlaceholder"
          class="field"
          :aria-invalid="!!errors.name"
          @blur="touched.name = true"
        >
        <span v-if="errors.name" class="mt-1 block text-xs font-semibold text-red-600">{{ errors.name }}</span>
      </label>

      <label class="col-span-2 block sm:col-span-1">
        <span class="field-label">{{ t.form.phone }}</span>
        <input
          v-model="form.phone"
          type="tel"
          name="phone"
          autocomplete="tel"
          dir="ltr"
          :placeholder="t.form.phonePlaceholder"
          class="field rtl:text-end"
          :aria-invalid="!!errors.phone"
          @blur="touched.phone = true"
        >
        <span v-if="errors.phone" class="mt-1 block text-xs font-semibold text-red-600">{{ errors.phone }}</span>
      </label>

      <label v-if="!isHero" class="col-span-2 block">
        <span class="field-label">{{ t.form.message }}</span>
        <textarea
          v-model="form.message"
          name="message"
          rows="3"
          :placeholder="t.form.messagePlaceholder"
          class="field h-auto resize-none py-3"
        />
      </label>
    </div>

    <!-- Honeypot: off-screen, out of the tab order and the accessibility tree. -->
    <div class="absolute -start-[9999px] top-0" aria-hidden="true">
      <label>Ne popunjavaj <input v-model="botcheck" type="text" name="botcheck" tabindex="-1" autocomplete="off"></label>
    </div>

    <div class="mt-5 flex flex-col gap-2.5 sm:flex-row">
      <UiButton type="submit" size="lg" class="sm:flex-1" :disabled="status === 'sending'">
        <PhPaperPlaneTilt :size="18" weight="fill" class="rtl:-scale-x-100" aria-hidden="true" />
        {{ status === 'sending' ? t.form.sending : t.form.submit }}
      </UiButton>
      <UiButton :href="whatsappFormHref" variant="ghost" size="lg" external>
        <PhWhatsappLogo :size="19" weight="fill" class="text-[#1fa855]" aria-hidden="true" />
        {{ t.form.whatsapp }}
      </UiButton>
    </div>

    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="translate-y-1 opacity-0"
    >
      <p
        v-if="status === 'sent' || status === 'mailed'"
        class="mt-4 flex items-start gap-2 rounded-xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-800"
        role="status"
      >
        <PhCheckCircle :size="18" weight="fill" class="mt-px shrink-0" aria-hidden="true" />
        {{ status === 'sent' ? t.form.sent : t.form.sentMail }}
      </p>
      <p
        v-else-if="status === 'error'"
        class="mt-4 flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700"
        role="alert"
      >
        <PhWarningCircle :size="18" weight="fill" class="mt-px shrink-0" aria-hidden="true" />
        {{ t.form.errorSend }}
      </p>
    </Transition>

    <p class="mt-4 text-center text-xs text-navy-500">
      {{ t.form.reassure }}
    </p>
  </form>
</template>
