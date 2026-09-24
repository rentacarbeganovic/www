import type { LocaleMessages } from '../types'

/*
 * Translation of bs.ts. The claims policy at the top of that file applies.
 * German matters here: much of the summer demand is the Prijedor/Kozarac
 * diaspora living in Germany, Austria and Switzerland.
 */
export const de: LocaleMessages = {
  meta: {
    title: 'Mietwagen Prijedor — Beganović | Automatik & Schaltung',
    description:
      'Rent a Car Beganović in Prijedor, Bosnien: sechs Autos mit Automatik oder Schaltung, '
      + 'ein Siebensitzer und ein SUV. Abholung an der M4 in Brđani bei Kozarac. Tel. +387 62 269 229.',
    ogImageAlt: 'Die Fahrzeuge von Rent a Car Beganović über Prijedor im Sonnenuntergang',
  },
  nav: {
    fleet: 'Fahrzeuge',
    about: 'Über uns',
    terms: 'Mietbedingungen',
    blog: 'Blog',
    contact: 'Kontakt',
    call: 'Anrufen',
    openMenu: 'Menü öffnen',
    closeMenu: 'Menü schließen',
    mainNav: 'Hauptnavigation',
    mobileNav: 'Mobile Navigation',
    langLabel: 'Sprache wechseln',
  },
  hero: {
    location: 'M4, Brđani bei Kozarac · Prijedor',
    titleLead: 'Mietwagen in Prijedor.',
    titleAccent: 'Einsteigen und los.',
    subtitle:
      'Sechs Autos — Automatik und Schaltung, Kompakt, Familie und SUV — direkt an der Hauptstraße M4. '
      + 'Schicken Sie uns Ihre Daten: Sie bekommen den Gesamtpreis vorab und ein Auto, das bereitsteht.',
    ctaCall: 'Anrufen',
    ctaForm: 'Anfrage senden',
    proof: [
      'Gesamtpreis vor der Bestätigung',
      'Drei Automatik-Autos im Angebot',
      'Direkt auf der Hauptstraße, ohne Stadtverkehr',
    ],
    lineupAlt: 'Peugeot 5008, Golf 6, Peugeot 308, Golf 7 und Mazda 5 — die Flotte von Rent a Car Beganović',
  },
  form: {
    title: 'Verfügbarkeit prüfen',
    note: 'Wir antworten per Telefon oder Nachricht.',
    pickupDate: 'Abholung',
    returnDate: 'Rückgabe',
    car: 'Fahrzeug',
    carAny: 'Egal — bitte vorschlagen',
    name: 'Vor- und Nachname',
    namePlaceholder: 'Ihr Name',
    phone: 'Telefon',
    phonePlaceholder: '+49 …',
    message: 'Hinweis',
    messagePlaceholder: 'Z. B. Anzahl der Personen, Abholzeit…',
    submit: 'Anfrage senden',
    sending: 'Wird gesendet…',
    whatsapp: 'Per WhatsApp senden',
    sent: 'Danke! Ihre Anfrage ist angekommen — wir melden uns in Kürze.',
    sentMail: 'Wir haben eine E-Mail mit Ihrer Anfrage geöffnet. Einfach auf „Senden“ drücken — wir melden uns in Kürze.',
    errorRequired: 'Pflichtfeld',
    errorDates: 'Die Rückgabe muss nach der Abholung liegen',
    errorSend: 'Senden fehlgeschlagen. Bitte rufen Sie uns an oder schreiben Sie per WhatsApp.',
    subject: 'Mietwagen-Anfrage',
    reassure: 'Unverbindlich. Eine Buchung gilt erst, wenn Sie sie bestätigen.',
  },
  marquee: [
    'Mietwagen Prijedor',
    'Automatik & Schaltung',
    'Siebensitzer für Familien',
    'Direkt an der M4',
    'Kozara in 25 Minuten',
    'Banja Luka in 45 Minuten',
    'Preis vorab bekannt',
  ],
  why: {
    eyebrow: 'Warum wir',
    title: 'Autovermietung, wie Sie sie sich wünschen',
    intro: 'Eine kleine lokale Agentur mit klaren Regeln. Das bekommen Sie, wenn Sie bei uns mieten.',
    items: [
      {
        title: 'Fairer Preis, kein Kleingedrucktes',
        body: 'Sie kennen den Gesamtbetrag, bevor Sie irgendetwas bestätigen. Keine Zusatzkosten, die erst bei der Schlüsselübergabe auftauchen.',
      },
      {
        title: 'Sofort unterwegs',
        body: 'Wir liegen an der Hauptstraße M4 in Brđani, zwischen Prijedor und Kozarac. Schlüssel nehmen und Sie sind schon auf der Hauptstraße — ohne Stadtverkehr und Parkplatzsuche.',
      },
      {
        title: 'Automatik oder Schaltung',
        body: 'Drei Automatik- und drei Schaltwagen: vom Golf für die Stadt über den Siebensitzer für die ganze Familie bis zum Kuga für die Bergstraßen der Kozara.',
      },
      {
        title: 'Sie sprechen mit uns, nicht mit einem Callcenter',
        body: 'Anrufen oder per WhatsApp schreiben und alles direkt mit den Menschen klären, die Ihnen das Auto übergeben. Schnell und ohne komplizierte Abläufe.',
      },
    ],
  },
  fleet: {
    eyebrow: 'Fahrzeuge',
    title: 'Wählen Sie das Auto für Ihre Reise',
    intro: 'Sechs Autos für unterschiedliche Anlässe — Stadtfahrt, Geschäftsreise nach Banja Luka oder Familienurlaub.',
    filters: { all: 'Alle Autos', automatic: 'Automatik', manual: 'Schaltung' },
    automatic: 'Automatik',
    manual: 'Schaltung',
    seats: '{n} Sitze',
    year: 'Baujahr',
    book: 'Anfragen',
    details: 'Details',
    categories: { compact: 'Kompakt', family: 'Familie', suv: 'SUV' },
    audience: {
      'peugeot-308': 'Automatik für entspanntes Fahren in der Stadt und auf der Hauptstraße — ideal, wenn Sie nicht schalten möchten.',
      'peugeot-5008': 'Geräumiger Familien-Automatik mit viel Platz für Gepäck — für Urlaub, Flughafenfahrten und lange Strecken.',
      'ford-kuga': 'SUV mit Automatik und erhöhter Sitzposition — bequem auf den Bergstraßen der Kozara und auf langen Fahrten.',
      'golf-7': 'Der bewährte Klassiker, der sich wie von selbst fährt — für Arbeit, Stadt und Alltag.',
      'mazda-5': 'Sieben Sitze und Schiebetüren — die ganze Familie samt Gepäck in einem Auto.',
      'golf-6': 'Einfach zu fahren und leicht zu parken — die kluge Wahl für eine kurze Miete.',
    },
    imageAlt: '{car} — Rent a Car Beganović, Prijedor',
  },
  story: {
    eyebrow: 'Wer wir sind',
    title: 'Ein Auto mieten sollte einfach sein',
    paragraphs: [
      'Bei Rent a Car Beganović finden wir, dass eine Automiete schnell, klar und ohne versteckte Kosten sein sollte. Deshalb nennen wir Ihnen den Preis vorab, übergeben das Auto sauber und fahrbereit und sind während der ganzen Mietzeit telefonisch erreichbar.',
      'Wir liegen an der Hauptstraße M4 in Brđani — wenige Minuten von Kozarac, etwa eine Viertelstunde vom Zentrum Prijedors und auf dem Weg nach Banja Luka und in den Nationalpark Kozara. Ob Sie geschäftlich hier sind, aus dem Ausland nach Hause kommen oder Ihr eigenes Auto in der Werkstatt steht: Wir haben das passende Fahrzeug.',
    ],
    stats: [
      { value: '6', label: 'Autos im Angebot' },
      { value: '3', label: 'mit Automatik' },
      { value: '7', label: 'Sitze im Mazda 5' },
      { value: 'M4', label: 'direkt an der Hauptstraße' },
    ],
    imageAlt: 'Prijedor, der Fluss und ein Kirchturm im Sonnenuntergang',
  },
  service: {
    eyebrow: 'Unser Service',
    title: 'Alles, was Sie vor und während der Miete wissen sollten',
    intro: 'Von der ersten Anfrage bis zur Schlüsselrückgabe — so läuft die Miete bei uns, Schritt für Schritt.',
    tabs: [
      {
        label: 'Vorher',
        title: 'Auto und Zeitraum wählen',
        body: 'Sagen Sie uns, wann Sie ein Auto brauchen, wie viele Personen reisen und wohin es geht. Wir schlagen das passende Auto vor — nicht das teuerste, sondern das richtige.',
        points: ['Automatik oder Schaltung', 'Kompakt, Familie oder SUV', 'Kurz- und Langzeitmiete nach Absprache'],
      },
      {
        label: 'Buchung',
        title: 'Anfrage in zwei Minuten',
        body: 'Senden Sie eine Anfrage über das Formular, per WhatsApp oder rufen Sie einfach an. Wir nennen Verfügbarkeit und Gesamtpreis — gebucht ist erst, wenn Sie bestätigen.',
        points: ['Formular, WhatsApp oder Anruf', 'Gesamtpreis vor der Bestätigung', 'Unverbindlich bis zur Bestätigung'],
      },
      {
        label: 'Abholung',
        title: 'Schlüssel an der M4 in Brđani',
        body: 'Sie holen das Auto an unserer Adresse ab, mit einem kurzen gemeinsamen Rundgang ums Fahrzeug. Bitte Personalausweis oder Reisepass und gültigen Führerschein mitbringen.',
        points: ['Personalausweis oder Reisepass', 'Gültiger Führerschein', 'Gemeinsame Fahrzeugprüfung'],
      },
      {
        label: 'Unterwegs',
        title: 'Wir sind da, wenn Sie uns brauchen',
        body: 'Wenn unterwegs etwas unklar ist — eine Warnleuchte, ein Reifen oder eine Frage zum Auto — rufen Sie an oder schreiben Sie per WhatsApp. Wir melden uns und lösen es gemeinsam.',
        points: ['Erreichbar per Telefon und WhatsApp', 'Hilfe bei jeder Frage', 'Verlängerung nach Absprache'],
      },
      {
        label: 'Rückgabe',
        title: 'Auto zurück, fertig',
        body: 'Sie geben das Auto zur vereinbarten Zeit an derselben Adresse zurück. Kurzer gemeinsamer Blick aufs Auto und fertig — ohne Warten und Umstände.',
        points: ['Gleiche Adresse, vereinbarte Zeit', 'Kurze gemeinsame Prüfung', 'Verspätung? Einfach Bescheid geben'],
      },
      {
        label: 'Fragen',
        title: 'Noch Fragen?',
        body: 'Die ausführlichen Mietbedingungen finden Sie auf der Seite Mietbedingungen, Antworten auf häufige Fragen weiter unten. Für alles andere genügt ein Anruf.',
        points: ['Mietbedingungen', 'Häufige Fragen', 'Anruf oder WhatsApp'],
      },
    ],
  },
  routes: {
    eyebrow: 'Standort',
    title: 'Von Brđani aus sind Sie schnell überall',
    intro: 'Unser Büro liegt an der Hauptstraße M4 — keine Fahrt durchs Stadtzentrum. Ungefähre Fahrzeiten ab uns:',
    items: [
      { place: 'Kozarac', note: 'Der nächste Ort, direkt nebenan', km: 4, time: '10 Min.' },
      { place: 'NP Kozara — Mrakovica', note: 'Wälder, Aussichtspunkte, Wanderwege', km: 16, time: '25 Min.' },
      { place: 'Prijedor Zentrum', note: 'Die Stadt an der Sana', km: 15, time: '20 Min.' },
      { place: 'Banja Luka', note: 'Größte Stadt der Region', km: 42, time: '45 Min.' },
      { place: 'Flughafen Banja Luka', note: 'Der nächste Flughafen', km: 56, time: '1 Std. 5 Min.' },
      { place: 'Sanski Most', note: 'Die Sana und die Dabar-Quelle', km: 46, time: '55 Min.' },
      { place: 'Novi Grad — Grenze', note: 'Übergang nach Kroatien', km: 59, time: '1 Std. 10 Min.' },
      { place: 'Flughafen Zagreb', note: 'Flüge aus ganz Europa', km: 169, time: '2 Std. 25 Min.' },
    ],
    mapCta: 'In Google Maps öffnen',
    addressLabel: 'Unsere Adresse',
  },
  diaspora: {
    title: 'Im Sommer nach Hause?',
    body: 'Jeden Sommer werden Kozarac und Prijedor lebendig — mit unseren Leuten aus Österreich, Deutschland, Schweden, der Schweiz und den USA. Wenn Sie nicht mit dem eigenen Auto kommen, reservieren Sie unseres rechtzeitig — Sommertermine sind schnell weg.',
    points: [
      'Buchung im Voraus, direkt aus dem Ausland',
      'Website und Anfrage auch auf Deutsch',
      'Absprache per WhatsApp, ohne teure Anrufe',
    ],
    cta: 'Für den Sommer anfragen',
  },
  faq: {
    eyebrow: 'Häufige Fragen',
    title: 'Was wir am häufigsten gefragt werden',
    items: [
      {
        q: 'Wie buche ich ein Auto?',
        a: 'Senden Sie eine Anfrage über das Formular oben auf der Seite, schreiben Sie per WhatsApp oder rufen Sie +387 62 269 229 an. Wir nennen Verfügbarkeit und Gesamtpreis — gebucht ist, sobald Sie bestätigen.',
      },
      {
        q: 'Welche Dokumente brauche ich?',
        a: 'Personalausweis oder Reisepass und einen gültigen Führerschein. Die vollständigen Mietbedingungen veröffentlichen wir auf der Seite Mietbedingungen und erklären sie gern auch telefonisch.',
      },
      {
        q: 'Haben Sie Autos mit Automatik?',
        a: 'Ja. Peugeot 308, Peugeot 5008 und Ford Kuga haben Automatik. Golf 7, Golf 6 und Mazda 5 haben Schaltgetriebe.',
      },
      {
        q: 'Haben Sie ein Auto für sieben Personen?',
        a: 'Der Mazda 5 hat sieben Sitze und Schiebetüren. Für Familienreisen lohnt auch ein Blick auf den Peugeot 5008 — fragen Sie uns nach der Sitzanordnung.',
      },
      {
        q: 'Wo hole ich das Auto ab?',
        a: 'An unserer Adresse: Hauptstraße M4, Brđani, bei Kozarac (79101 Prijedor). Den genauen Standort finden Sie auf Google Maps.',
      },
      {
        q: 'Kann ich ein Auto für längere Zeit mieten?',
        a: 'Ja, Kurz- und Langzeitmieten vereinbaren wir individuell. Nennen Sie Ihre Daten in der Anfrage und Sie bekommen ein Angebot für den ganzen Zeitraum.',
      },
    ],
  },
  blog: {
    eyebrow: 'Blog',
    title: 'Tipps für unterwegs',
    intro: 'Praktische Ratgeber zur Automiete in Prijedor und zu Ausflügen in der Umgebung.',
    readMore: 'Lesen',
    backToBlog: 'Zurück zum Blog',
    published: 'Veröffentlicht',
    readingTime: '{n} Min. Lesezeit',
    ctaTitle: 'Brauchen Sie ein Auto für diese Fahrt?',
    ctaBody: 'Schicken Sie uns Ihre Daten — wir nennen Verfügbarkeit und Gesamtpreis vorab.',
  },
  cta: {
    title: 'Ihr Auto wartet an der M4.',
    body: 'Anrufen, Nachricht oder Anfrage senden — in wenigen Minuten ist alles geklärt.',
    whatsapp: 'Per WhatsApp schreiben',
  },
  about: {
    metaTitle: 'Über uns | Rent a Car Beganović, Prijedor',
    metaDescription:
      'Rent a Car Beganović ist eine lokale Autovermietung an der Hauptstraße M4 in Brđani bei Kozarac, Prijedor. '
      + 'Sechs Autos, klarer Preis vorab und direkter Kontakt.',
    title: 'Lokale Agentur, klare Absprachen',
    lead: 'Rent a Car Beganović ist eine Autovermietung aus Prijedor. Wir machen es einfach: das richtige Auto, ein ehrlicher Preis vorab und Menschen, mit denen Sie direkt sprechen.',
    sections: [
      {
        title: 'Wer wir sind',
        body: 'Wir sind eine kleine lokale Agentur — und das ist unser Vorteil. Wir kennen jedes Auto in unserer Flotte und vereinbaren jede Miete persönlich: kein Callcenter, keine fünfseitigen Formulare, keine versteckten Posten auf der Rechnung.',
      },
      {
        title: 'Wo wir sind',
        body: 'Wir liegen an der Hauptstraße M4 in Brđani, wenige Minuten von Kozarac und etwa eine Viertelstunde vom Zentrum Prijedors entfernt. Das Büro liegt direkt an der Straße nach Banja Luka — mit dem Schlüssel in der Hand sind Sie sofort unterwegs, ohne durch die Stadt zu fahren.',
      },
      {
        title: 'An wen wir vermieten',
        body: 'An Menschen, die geschäftlich in Prijedor sind, an unsere Diaspora, die im Sommer nach Hause kommt, an Familien auf dem Weg in den Urlaub und an alle, deren eigenes Auto in der Werkstatt steht. Wir haben Kompaktwagen, zwei Familienautos und einen SUV — mit Automatik und Schaltung.',
      },
    ],
    valuesTitle: 'Was uns wichtig ist',
    values: [
      { title: 'Klarer Preis', body: 'Sie kennen den Gesamtbetrag vor der Bestätigung. Keine Überraschungen danach.' },
      { title: 'Fahrbereites Auto', body: 'Sie bekommen das Auto sauber, geprüft und startklar.' },
      { title: 'Erreichbarkeit', body: 'Während der Miete sind wir per Telefon und WhatsApp für Sie da.' },
    ],
  },
  terms: {
    metaTitle: 'Mietbedingungen | Rent a Car Beganović, Prijedor',
    metaDescription: 'Mietbedingungen bei Rent a Car Beganović in Prijedor: Dokumente, Abholung und Rückgabe des Fahrzeugs.',
    title: 'Mietbedingungen',
    lead: 'Klare Regeln machen die Miete für beide Seiten einfach. Hier finden Sie, was vor der Schlüsselübergabe wichtig ist.',
    pendingTitle: 'Vollständige Bedingungen folgen in Kürze',
    pendingBody: 'Die ausführlichen Mietbedingungen (Kaution, Mindestalter, Kilometer, Kraftstoff, Fahrten ins Ausland) veröffentlichen wir in Kürze. Bis dahin rufen Sie uns gern an oder schreiben per WhatsApp — wir erklären alles vor der Buchung.',
    basicsTitle: 'Das Wichtigste vorab',
    basics: [
      'Für die Abholung benötigen Sie Personalausweis oder Reisepass und einen gültigen Führerschein.',
      'Eine Buchung gilt, sobald Sie sie bestätigen, nachdem wir Ihnen den Gesamtpreis genannt haben.',
      'Abholung und Rückgabe erfolgen an unserer Adresse: M4, Brđani, 79101 Prijedor.',
      'Bei Abholung und Rückgabe prüfen wir das Auto gemeinsam.',
    ],
  },
  contactPage: {
    metaTitle: 'Kontakt | Rent a Car Beganović, Prijedor — +387 62 269 229',
    metaDescription: 'Kontakt zu Rent a Car Beganović: Telefon und WhatsApp +387 62 269 229, Adresse M4, Brđani, 79101 Prijedor. Mietwagen-Anfrage senden.',
    title: 'Melden Sie sich — es geht schnell',
    lead: 'Am schnellsten erreichen Sie uns per Telefon oder WhatsApp. Für eine Buchung können Sie auch das Formular nutzen.',
    callTitle: 'Telefon',
    whatsappTitle: 'WhatsApp',
    whatsappBody: 'Schreiben Sie uns, wir antworten schnell.',
    addressTitle: 'Adresse',
    directions: 'Route in Google Maps',
    formTitle: 'Mietwagen-Anfrage senden',
  },
  vehicle: {
    metaTitle: '{car} {year}, {gearbox} — Mietwagen Prijedor | Beganović',
    metaDescription:
      '{car} ({year}, {gearbox}) in Prijedor, Bosnien mieten. Abholung an der M4 in Brđani bei Kozarac. '
      + 'Anfrage senden und den Gesamtpreis vorab erhalten.',
    specsTitle: 'Eckdaten',
    spec: {
      brand: 'Marke und Modell',
      year: 'Baujahr',
      transmission: 'Getriebe',
      seats: 'Sitze',
      category: 'Kategorie',
      unknown: 'Auf Anfrage',
    },
    audienceTitle: 'Für wen dieses Auto passt',
    priceTitle: 'Preis',
    priceBody: 'Der Preis hängt von Mietdauer und Saison ab. Schicken Sie uns Ihre Daten und wir nennen Ihnen den genauen Betrag, bevor Sie etwas bestätigen.',
    similarTitle: 'Das könnte Ihnen auch gefallen',
    backToFleet: 'Alle Autos',
  },
  footer: {
    tagline: 'Mietwagen in Prijedor — Autos mit Automatik und Schaltung, direkt an der Hauptstraße M4 in Brđani.',
    navigation: 'Seiten',
    contact: 'Kontakt',
    rights: 'Alle Rechte vorbehalten.',
    footerNav: 'Fußzeilen-Navigation',
    langs: 'Sprache',
  },
  whatsappFab: 'Schreiben Sie uns per WhatsApp',
  skipToContent: 'Zum Inhalt springen',
  breadcrumbHome: 'Startseite',
  notFound: {
    title: 'Diese Seite ist falsch abgebogen',
    body: 'Die gesuchte Seite existiert nicht oder wurde verschoben.',
    cta: 'Zur Startseite',
  },
}
