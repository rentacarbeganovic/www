export type Locale = 'bs' | 'en' | 'ar' | 'de'

export interface LocaleOption {
  code: Locale
  label: string
  name: string
  dir: 'ltr' | 'rtl'
  /* BCP 47 tag for <html lang> and hreflang. */
  htmlLang: string
  /* Underscored form for og:locale. */
  ogLocale: string
}

/*
 * How a visitor shops this fleet: a compact hatchback, a seven-seat family
 * car, or the one SUV.
 */
export type FleetCategory = 'compact' | 'family' | 'suv'

export interface FleetCar {
  id: string
  /* URL segment for /vozila/[slug]. Stable — changing one breaks a live URL. */
  slug: string
  brand: string
  model: string
  year: number
  transmission: 'automatic' | 'manual'
  /*
   * Null where not confirmed by the client. The UI omits the figure rather
   * than printing a guess someone discovers at the counter.
   */
  seats: number | null
  category: FleetCategory
  /* 1280w, with a 640w `-sm` sibling. */
  image: string
}

type Item = { title: string, body: string }

export interface LocaleMessages {
  meta: { title: string, description: string, ogImageAlt: string }
  nav: {
    fleet: string
    about: string
    terms: string
    blog: string
    contact: string
    call: string
    openMenu: string
    closeMenu: string
    mainNav: string
    mobileNav: string
    langLabel: string
  }
  hero: {
    location: string
    titleLead: string
    /* Set in orange, with the swoosh drawn under it. */
    titleAccent: string
    subtitle: string
    ctaCall: string
    ctaForm: string
    proof: string[]
    lineupAlt: string
  }
  /* The enquiry form. Posts nowhere: it hands off to mail or WhatsApp. */
  form: {
    title: string
    note: string
    pickupDate: string
    returnDate: string
    car: string
    carAny: string
    name: string
    namePlaceholder: string
    phone: string
    phonePlaceholder: string
    message: string
    messagePlaceholder: string
    submit: string
    sending: string
    whatsapp: string
    sent: string
    errorRequired: string
    errorDates: string
    errorSend: string
    subject: string
    reassure: string
  }
  marquee: string[]
  why: { eyebrow: string, title: string, intro: string, items: Item[] }
  fleet: {
    eyebrow: string
    title: string
    intro: string
    filters: { all: string, automatic: string, manual: string }
    automatic: string
    manual: string
    /* `{n}` is substituted. */
    seats: string
    year: string
    book: string
    details: string
    categories: Record<FleetCategory, string>
    /* One line per car id: who this car is for. */
    audience: Record<string, string>
    /* `{car}` is substituted. */
    imageAlt: string
  }
  story: {
    eyebrow: string
    title: string
    paragraphs: string[]
    stats: { value: string, label: string }[]
    imageAlt: string
  }
  service: {
    eyebrow: string
    title: string
    intro: string
    tabs: { label: string, title: string, body: string, points: string[] }[]
  }
  routes: {
    eyebrow: string
    title: string
    intro: string
    items: { place: string, note: string, km: number, time: string }[]
    mapCta: string
    addressLabel: string
  }
  diaspora: { title: string, body: string, points: string[], cta: string }
  faq: { eyebrow: string, title: string, items: { q: string, a: string }[] }
  blog: {
    eyebrow: string
    title: string
    intro: string
    readMore: string
    backToBlog: string
    published: string
    readingTime: string
    ctaTitle: string
    ctaBody: string
  }
  cta: { title: string, body: string, whatsapp: string }
  about: {
    metaTitle: string
    metaDescription: string
    title: string
    lead: string
    sections: { title: string, body: string }[]
    valuesTitle: string
    values: Item[]
  }
  terms: {
    metaTitle: string
    metaDescription: string
    title: string
    lead: string
    pendingTitle: string
    pendingBody: string
    basicsTitle: string
    basics: string[]
  }
  contactPage: {
    metaTitle: string
    metaDescription: string
    title: string
    lead: string
    callTitle: string
    whatsappTitle: string
    whatsappBody: string
    addressTitle: string
    directions: string
    formTitle: string
  }
  vehicle: {
    metaTitle: string
    metaDescription: string
    specsTitle: string
    spec: { brand: string, year: string, transmission: string, seats: string, category: string, unknown: string }
    audienceTitle: string
    priceTitle: string
    priceBody: string
    similarTitle: string
    backToFleet: string
  }
  footer: {
    tagline: string
    navigation: string
    contact: string
    rights: string
    footerNav: string
    langs: string
  }
  whatsappFab: string
  skipToContent: string
  breadcrumbHome: string
  notFound: { title: string, body: string, cta: string }
}
