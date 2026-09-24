import type { LocaleMessages } from '../types'

/*
 * Master copy. en, de and ar are translations of this file.
 *
 * Claims policy — what the copy may and may not say:
 *  - Safe: the six cars, their year and gearbox; the address on the M4 in
 *    Brđani; real driving times from the office (OSRM, rounded); that the
 *    total price is quoted before the customer confirms.
 *  - Never: delivery of any kind (the client asked not to mention it),
 *    Google reviews or ratings (there are none), a deposit figure, prices,
 *    insurance packages, minimum age, mileage or cross-border rules. Those
 *    arrive with the client's Uslovi; until then the copy points there.
 */
export const bs: LocaleMessages = {
  meta: {
    title: 'Rent a Car Prijedor — Beganović | Automatik i manuelni',
    description:
      'Rent a car Beganović, Prijedor: šest vozila s automatskim i manuelnim mjenjačem, '
      + 'porodični sedmosjed i SUV. Preuzimanje na M4 u Brđanima kod Kozarca. Pozovite 062 269 229.',
    ogImageAlt: 'Vozila Rent a Car Beganović ispred Prijedora u zalasku sunca',
  },
  nav: {
    fleet: 'Automobili',
    about: 'O nama',
    terms: 'Uslovi',
    blog: 'Blog',
    contact: 'Kontakt',
    call: 'Pozovi',
    openMenu: 'Otvori meni',
    closeMenu: 'Zatvori meni',
    mainNav: 'Glavna navigacija',
    mobileNav: 'Mobilna navigacija',
    langLabel: 'Promijeni jezik',
  },
  hero: {
    location: 'M4, Brđani kod Kozarca · Prijedor',
    titleLead: 'Rent a car Prijedor.',
    titleAccent: 'Sjednite i vozite.',
    subtitle:
      'Šest vozila — automatik i manuelni, gradski, porodični i SUV — na magistrali M4. '
      + 'Javite datume, dobijete ukupnu cijenu unaprijed i auto spreman za put.',
    ctaCall: 'Pozovi',
    ctaForm: 'Pošalji upit',
    proof: [
      'Ukupna cijena prije potvrde',
      'Tri automatika u ponudi',
      'Odmah na magistrali, bez gradske gužve',
    ],
    lineupAlt: 'Peugeot 5008, Golf 6, Peugeot 308, Golf 7 i Mazda 5 — vozila Rent a Car Beganović',
  },
  form: {
    title: 'Provjerite slobodan termin',
    note: 'Odgovaramo telefonom ili porukom.',
    pickupDate: 'Preuzimanje',
    returnDate: 'Vraćanje',
    car: 'Vozilo',
    carAny: 'Svejedno — predložite mi',
    name: 'Ime i prezime',
    namePlaceholder: 'Vaše ime',
    phone: 'Telefon',
    phonePlaceholder: '06x xxx xxx',
    message: 'Napomena',
    messagePlaceholder: 'Npr. broj putnika, vrijeme preuzimanja…',
    submit: 'Pošalji upit',
    sending: 'Šaljem…',
    whatsapp: 'Pošalji na WhatsApp',
    sent: 'Hvala! Upit je stigao — javljamo se uskoro.',
    sentMail: 'Otvorili smo e-mail s vašim upitom. Samo pritisnite „Pošalji“ i javljamo se uskoro.',
    errorRequired: 'Obavezno polje',
    errorDates: 'Vraćanje mora biti nakon preuzimanja',
    errorSend: 'Slanje nije uspjelo. Pozovite nas ili pišite na WhatsApp.',
    subject: 'Upit za najam vozila',
    reassure: 'Upit ne obavezuje. Rezervacija važi tek kada je vi potvrdite.',
  },
  marquee: [
    'Rent a car Prijedor',
    'Automatik i manuelni',
    'Sedmosjed za porodicu',
    'Na magistrali M4',
    'Kozara za 25 minuta',
    'Banja Luka za 45 minuta',
    'Cijena poznata unaprijed',
  ],
  why: {
    eyebrow: 'Zašto baš mi',
    title: 'Najam kakav biste i sami htjeli',
    intro: 'Mala lokalna agencija i jasna pravila. Evo šta dobijate kada auto uzmete kod nas.',
    items: [
      {
        title: 'Fer cijena, bez sitnih slova',
        body: 'Ukupan iznos znate prije nego što išta potvrdite. Nema doplata koje se pojave tek kod preuzimanja ključeva.',
      },
      {
        title: 'Odmah ste na putu',
        body: 'Nalazimo se na magistrali M4 u Brđanima, između Prijedora i Kozarca. Uzmete ključeve i već ste na glavnom putu — bez gradske gužve i traženja parkinga.',
      },
      {
        title: 'Automatik ili manuelni',
        body: 'Tri automatika i tri manuelca: od Golfa za grad, preko sedmosjeda za cijelu porodicu, do Kuge za planinske ceste Kozare.',
      },
      {
        title: 'Razgovarate s nama, ne s call centrom',
        body: 'Pozovete ili pošaljete WhatsApp poruku i dogovarate direktno s ljudima koji vam predaju auto. Brzo i bez zamršenih procedura.',
      },
    ],
  },
  fleet: {
    eyebrow: 'Automobili',
    title: 'Izaberite auto za svoj put',
    intro: 'Šest vozila, svako za drugačiju priliku — gradska vožnja, poslovni put do Banje Luke ili porodični odmor.',
    filters: { all: 'Sva vozila', automatic: 'Automatik', manual: 'Manuelni' },
    automatic: 'Automatik',
    manual: 'Manuelni',
    seats: '{n} sjedišta',
    year: 'Godište',
    book: 'Rezerviši',
    details: 'Detalji',
    categories: { compact: 'Kompaktni', family: 'Porodični', suv: 'SUV' },
    audience: {
      'peugeot-308': 'Automatik za opuštenu vožnju gradom i magistralom — pravi izbor ako ne volite mijenjati brzine.',
      'peugeot-5008': 'Prostrani porodični automatik s puno mjesta za prtljag — za odmor, aerodrom i duže relacije.',
      'ford-kuga': 'SUV s automatikom i višim sjedištem — udoban na planinskim cestama Kozare i na dugim putevima.',
      'golf-7': 'Provjereni klasik koji se vozi sam od sebe — za posao, grad i svakodnevne obaveze.',
      'mazda-5': 'Sedam sjedišta i klizna vrata — cijela porodica i prtljag u jednom autu.',
      'golf-6': 'Jednostavan za vožnju i lagan za parkiranje — najpametniji izbor za kraći najam.',
    },
    imageAlt: '{car} — rent a car Beganović, Prijedor',
  },
  story: {
    eyebrow: 'Ko smo',
    title: 'Najam auta treba biti jednostavan',
    paragraphs: [
      'U Rent a Car Beganović vjerujemo da najam vozila treba biti brz, jasan i bez skrivenih troškova. Zato vam cijenu kažemo unaprijed, auto predajemo čist i spreman, a na telefonu smo cijelo vrijeme trajanja najma.',
      'Nalazimo se na magistralnom putu M4 u Brđanima — par minuta od Kozarca, oko četvrt sata od centra Prijedora i na putu prema Banjoj Luci i Nacionalnom parku Kozara. Bilo da ste ovdje poslom, dolazite kući iz dijaspore ili vam je auto na servisu, imamo vozilo koje odgovara vašem putu.',
    ],
    stats: [
      { value: '6', label: 'vozila u ponudi' },
      { value: '3', label: 'automatika' },
      { value: '7', label: 'sjedišta u Mazdi 5' },
      { value: 'M4', label: 'odmah na magistrali' },
    ],
    imageAlt: 'Prijedor, rijeka i crkveni toranj u zalasku sunca',
  },
  service: {
    eyebrow: 'Naš servis',
    title: 'Sve što treba znati prije i tokom najma',
    intro: 'Od prvog upita do vraćanja ključeva — ovako izgleda najam kod nas, korak po korak.',
    tabs: [
      {
        label: 'Prije najma',
        title: 'Izaberite auto i period',
        body: 'Recite nam kada vam treba vozilo, koliko vas putuje i kuda idete. Predložićemo auto koji odgovara vašem putu — ne najskuplji, nego pravi.',
        points: ['Automatik ili manuelni', 'Kompaktni, porodični ili SUV', 'Kraći i duži najam po dogovoru'],
      },
      {
        label: 'Rezervacija',
        title: 'Upit za dvije minute',
        body: 'Pošaljite upit preko forme, WhatsAppa ili nas jednostavno pozovite. Javljamo dostupnost i ukupnu cijenu, a rezervacija važi tek kada je vi potvrdite.',
        points: ['Forma na sajtu, WhatsApp ili poziv', 'Ukupna cijena prije potvrde', 'Bez obaveze dok ne potvrdite'],
      },
      {
        label: 'Preuzimanje',
        title: 'Ključevi na M4 u Brđanima',
        body: 'Vozilo preuzimate na našoj adresi, uz kratak zajednički pregled auta. Ponesite ličnu kartu ili pasoš i važeću vozačku dozvolu.',
        points: ['Lična karta ili pasoš', 'Važeća vozačka dozvola', 'Zajednički pregled vozila'],
      },
      {
        label: 'Tokom najma',
        title: 'Tu smo ako zatreba',
        body: 'Ako vas na putu bilo šta iznenadi — lampica na satu, guma ili pitanje o autu — pozovite ili pišite na WhatsApp. Javljamo se i zajedno rješavamo.',
        points: ['Kontakt telefonom i WhatsAppom', 'Pomoć oko bilo kojeg pitanja', 'Produženje najma po dogovoru'],
      },
      {
        label: 'Vraćanje',
        title: 'Vratite auto i to je to',
        body: 'Auto vraćate na istu adresu u dogovoreno vrijeme. Zajedno ga pogledamo i gotovi ste — bez čekanja i komplikacija.',
        points: ['Ista adresa, dogovoreno vrijeme', 'Kratak zajednički pregled', 'Kasnite? Samo javite na vrijeme'],
      },
      {
        label: 'Pitanja',
        title: 'Imate još pitanja?',
        body: 'Detaljne uslove najma pronađite na stranici Uslovi, a odgovore na najčešća pitanja malo niže na ovoj stranici. Za sve ostalo dovoljan je jedan poziv.',
        points: ['Uslovi najma', 'Česta pitanja', 'Poziv ili WhatsApp poruka'],
      },
    ],
  },
  routes: {
    eyebrow: 'Lokacija',
    title: 'Iz Brđana ste brzo gdje god krenuli',
    intro: 'Kancelarija je na magistralnom putu M4, pa ne morate kroz centar grada. Okvirna vremena vožnje od nas:',
    items: [
      { place: 'Kozarac', note: 'Najbliže mjesto, odmah do nas', km: 4, time: '10 min' },
      { place: 'NP Kozara — Mrakovica', note: 'Šume, vidikovci i staze', km: 16, time: '25 min' },
      { place: 'Prijedor, centar', note: 'Grad na rijeci Sani', km: 15, time: '20 min' },
      { place: 'Banja Luka', note: 'Najveći grad Krajine', km: 42, time: '45 min' },
      { place: 'Aerodrom Banja Luka', note: 'Najbliži aerodrom', km: 56, time: '1 h 5 min' },
      { place: 'Sanski Most', note: 'Sana i Dabarsko vrelo', km: 46, time: '55 min' },
      { place: 'Novi Grad — granica', note: 'Prelaz prema Hrvatskoj', km: 59, time: '1 h 10 min' },
      { place: 'Aerodrom Zagreb', note: 'Letovi iz cijele Evrope', km: 169, time: '2 h 25 min' },
    ],
    mapCta: 'Otvori u Google Maps',
    addressLabel: 'Naša adresa',
  },
  diaspora: {
    title: 'Dolazite kući na odmor?',
    body: 'Svako ljeto Kozarac i Prijedor ožive od naših ljudi iz Austrije, Njemačke, Švedske, Švicarske i Amerike. Ako ne dolazite svojim autom, rezervišite naš na vrijeme — ljetni termini se brzo popune.',
    points: [
      'Rezervacija unaprijed, iz inostranstva',
      'Sajt i upit i na njemačkom i engleskom',
      'Dogovor preko WhatsAppa, bez skupih poziva',
    ],
    cta: 'Rezerviši za ljeto',
  },
  faq: {
    eyebrow: 'Česta pitanja',
    title: 'Pitanja koja dobijamo najčešće',
    items: [
      {
        q: 'Kako da rezervišem auto?',
        a: 'Pošaljite upit preko forme na vrhu stranice, pišite na WhatsApp ili pozovite 062 269 229. Javimo dostupnost i ukupnu cijenu, a rezervacija važi kada je vi potvrdite.',
      },
      {
        q: 'Koji dokumenti su mi potrebni?',
        a: 'Lična karta ili pasoš i važeća vozačka dozvola. Ostale uslove najma objavljujemo na stranici Uslovi, a rado ih objasnimo i telefonom.',
      },
      {
        q: 'Imate li vozila s automatskim mjenjačem?',
        a: 'Da. Peugeot 308, Peugeot 5008 i Ford Kuga su automatici. Golf 7, Golf 6 i Mazda 5 imaju manuelni mjenjač.',
      },
      {
        q: 'Imate li auto za sedam osoba?',
        a: 'Mazda 5 ima sedam sjedišta i klizna vrata. Za porodična putovanja pogledajte i Peugeot 5008 — pitajte nas za raspored sjedišta.',
      },
      {
        q: 'Gdje preuzimam vozilo?',
        a: 'Na našoj adresi: magistralni put M4, Brđani, kod Kozarca (79101 Prijedor). Tačnu lokaciju pronađite na Google Maps.',
      },
      {
        q: 'Mogu li iznajmiti auto na duži period?',
        a: 'Da, kraći i duži najam dogovaramo pojedinačno. Navedite datume u upitu i dobićete ponudu za cijeli period.',
      },
    ],
  },
  blog: {
    eyebrow: 'Blog',
    title: 'Savjeti za put po Krajini',
    intro: 'Praktični vodiči za najam auta u Prijedoru i izlete u okolinu.',
    readMore: 'Pročitaj',
    backToBlog: 'Nazad na blog',
    published: 'Objavljeno',
    readingTime: '{n} min čitanja',
    ctaTitle: 'Treba vam auto za ovaj put?',
    ctaBody: 'Pošaljite datume — javljamo dostupnost i ukupnu cijenu prije potvrde.',
  },
  cta: {
    title: 'Vaš auto čeka na M4.',
    body: 'Pozovite, pošaljite poruku ili upit — dogovor traje par minuta.',
    whatsapp: 'Piši na WhatsApp',
  },
  about: {
    metaTitle: 'O nama | Rent a Car Beganović, Prijedor',
    metaDescription:
      'Rent a Car Beganović je lokalna agencija za najam vozila na magistrali M4 u Brđanima kod Kozarca, Prijedor. '
      + 'Šest vozila, jasna cijena unaprijed i direktan kontakt.',
    title: 'Lokalna agencija, jasan dogovor',
    lead: 'Rent a Car Beganović je agencija za najam vozila iz Prijedora. Radimo jednostavno: pravi auto, poštena cijena unaprijed i ljudi s kojima razgovarate direktno.',
    sections: [
      {
        title: 'Ko smo',
        body: 'Mala smo lokalna agencija i to nam je prednost. Svako vozilo iz naše ponude poznajemo, a svaki najam dogovaramo lično — bez call centra, formulara na pet strana i skrivenih stavki na računu.',
      },
      {
        title: 'Gdje smo',
        body: 'Nalazimo se na magistralnom putu M4 u Brđanima, par minuta od Kozarca i oko četvrt sata od centra Prijedora. Lokacija je odmah na glavnom putu prema Banjoj Luci, pa ste nakon preuzimanja ključeva odmah na putu — bez vožnje kroz grad.',
      },
      {
        title: 'Kome iznajmljujemo',
        body: 'Ljudima koji su u Prijedoru poslom, našoj dijaspori koja ljeti dolazi kući, porodicama koje idu na odmor i svima kojima je vlastiti auto na servisu. Imamo gradske automobile, dva porodična vozila i SUV — s automatskim i manuelnim mjenjačem.',
      },
    ],
    valuesTitle: 'Do čega nam je stalo',
    values: [
      { title: 'Jasna cijena', body: 'Ukupan iznos znate prije potvrde. Bez naknadnih iznenađenja.' },
      { title: 'Spreman auto', body: 'Vozilo dobijate čisto, pregledano i spremno za put.' },
      { title: 'Dostupnost', body: 'Tokom najma smo na telefonu i WhatsAppu kad god zatreba.' },
    ],
  },
  terms: {
    metaTitle: 'Uslovi najma | Rent a Car Beganović, Prijedor',
    metaDescription: 'Uslovi najma vozila kod Rent a Car Beganović u Prijedoru: dokumenti, preuzimanje i vraćanje vozila.',
    title: 'Uslovi najma',
    lead: 'Jasna pravila čine najam jednostavnim za obje strane. Ovdje ćete pronaći sve što je važno prije nego što preuzmete ključeve.',
    pendingTitle: 'Kompletni uslovi uskoro',
    pendingBody: 'Detaljne uslove najma (depozit, starost vozača, kilometraža, gorivo, izlazak iz zemlje) objavljujemo uskoro. Do tada nas slobodno pozovite ili pišite na WhatsApp — sve ćemo vam objasniti prije rezervacije.',
    basicsTitle: 'Osnovno što trebate znati',
    basics: [
      'Za preuzimanje vozila potrebni su lična karta ili pasoš i važeća vozačka dozvola.',
      'Rezervacija važi tek kada je potvrdite, nakon što vam javimo ukupnu cijenu.',
      'Vozilo se preuzima i vraća na našoj adresi: M4, Brđani, 79101 Prijedor.',
      'Pri preuzimanju i vraćanju vozilo zajedno pregledamo.',
    ],
  },
  contactPage: {
    metaTitle: 'Kontakt | Rent a Car Beganović, Prijedor — 062 269 229',
    metaDescription: 'Kontaktirajte Rent a Car Beganović: telefon i WhatsApp 062 269 229, adresa M4, Brđani, 79101 Prijedor. Pošaljite upit za najam vozila.',
    title: 'Javite se, dogovor je brz',
    lead: 'Najbrže do nas — telefonom ili WhatsAppom. Za rezervaciju možete poslati i upit preko forme.',
    callTitle: 'Telefon',
    whatsappTitle: 'WhatsApp',
    whatsappBody: 'Pošaljite poruku, odgovaramo brzo.',
    addressTitle: 'Adresa',
    directions: 'Upute na Google Maps',
    formTitle: 'Pošaljite upit za najam',
  },
  vehicle: {
    metaTitle: '{car} {year}, {gearbox} — rent a car Prijedor | Beganović',
    metaDescription:
      'Iznajmite {car} ({year}, {gearbox}) u Prijedoru. Preuzimanje na M4 u Brđanima kod Kozarca. '
      + 'Pošaljite upit i dobijte ukupnu cijenu unaprijed.',
    specsTitle: 'Osnovni podaci',
    spec: {
      brand: 'Marka i model',
      year: 'Godište',
      transmission: 'Mjenjač',
      seats: 'Sjedišta',
      category: 'Kategorija',
      unknown: 'Na upit',
    },
    audienceTitle: 'Za koga je ovaj auto',
    priceTitle: 'Cijena',
    priceBody: 'Cijena zavisi od perioda najma i sezone. Pošaljite datume i javljamo tačan iznos prije nego što bilo šta potvrdite.',
    similarTitle: 'Pogledajte i ova vozila',
    backToFleet: 'Sva vozila',
  },
  footer: {
    tagline: 'Rent a car u Prijedoru — vozila s automatskim i manuelnim mjenjačem, odmah na magistrali M4 u Brđanima.',
    navigation: 'Stranice',
    contact: 'Kontakt',
    rights: 'Sva prava zadržana.',
    footerNav: 'Navigacija u podnožju',
    langs: 'Jezik',
  },
  whatsappFab: 'Pišite nam na WhatsApp',
  skipToContent: 'Preskoči na sadržaj',
  breadcrumbHome: 'Početna',
  notFound: {
    title: 'Ova stranica je skrenula s puta',
    body: 'Stranica koju tražite ne postoji ili je premještena.',
    cta: 'Nazad na početnu',
  },
}
