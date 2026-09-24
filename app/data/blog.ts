/*
 * Two SEO guides, Bosnian only (see LOCALE_SCOPES in i18n/routing.ts).
 *
 * Each targets a local query cluster, recorded in `keywords` so the intent
 * stays auditable. The claims policy from i18n/locales/bs.ts applies with
 * extra force here, because a guide is read as advice: no deposit figure, no
 * age limit, no price, no delivery. Where the reader needs one of those, the
 * guide tells them to ask — which is also the conversion action.
 *
 * Driving figures are real routes from the office (OSRM), rounded.
 */

export interface BlogPost {
  slug: string
  title: string
  /* <title>; kept near 60 characters. */
  metaTitle: string
  description: string
  excerpt: string
  published: string
  updated: string
  readingMinutes: number
  image: string
  imageAlt: string
  keywords: string[]
  sections: { heading: string, paragraphs?: string[], bullets?: string[] }[]
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'rent-a-car-prijedor-sta-trebate-znati',
    title: 'Rent a car Prijedor: šta trebate znati prije najma auta',
    metaTitle: 'Rent a car Prijedor — vodič za najam auta | Beganović',
    description:
      'Kako iznajmiti auto u Prijedoru bez iznenađenja: dokumenti, automatik ili manuelni, '
      + 'kako teče rezervacija i šta pitati agenciju prije potvrde.',
    excerpt:
      'Dokumenti, izbor vozila, rezervacija i pitanja koja vrijedi postaviti prije potvrde — '
      + 'sve na jednom mjestu.',
    published: '2026-09-24',
    updated: '2026-09-24',
    readingMinutes: 5,
    image: '/images/fleet/peugeot-308-2015-automatik.webp',
    imageAlt: 'Peugeot 308 automatik za najam u Prijedoru',
    keywords: ['rent a car prijedor', 'najam auta prijedor', 'iznajmljivanje vozila prijedor', 'rent a car kozarac'],
    sections: [
      {
        heading: 'Zašto iznajmiti auto u Prijedoru',
        paragraphs: [
          'Prijedor i okolina najljepši su kada ih obilazite svojim tempom. Autobuske linije prema Kozari, Sanskom Mostu ili manjim mjestima u okolini su rijetke, a taksi na duže relacije brzo postane skup. S iznajmljenim autom ujutro ste na Mrakovici, poslijepodne u Banjoj Luci, a navečer nazad u Kozarcu.',
          'Najam auta najčešće trebaju ljudi koji su ovdje poslom, naša dijaspora koja ljeti dolazi kući, porodice koje putuju na odmor i svi kojima je vlastiti auto na servisu.',
        ],
      },
      {
        heading: 'Koji dokumenti su potrebni',
        paragraphs: [
          'Za preuzimanje vozila ponesite:',
        ],
        bullets: [
          'ličnu kartu ili pasoš,',
          'važeću vozačku dozvolu.',
        ],
      },
      {
        heading: 'Automatik ili manuelni mjenjač?',
        paragraphs: [
          'Ako u inostranstvu vozite automatik ili jednostavno ne volite mijenjati brzine, tražite automatik na vrijeme — takvih vozila je u svakoj agenciji manje i prva se rezervišu, posebno ljeti.',
          'U našoj ponudi automatici su Peugeot 308, Peugeot 5008 i Ford Kuga, a manuelni mjenjač imaju Golf 7, Golf 6 i Mazda 5. Za grad i posao dovoljan je kompaktni auto poput Golfa ili 308-ice, za porodicu s prtljagom Mazda 5 sa sedam sjedišta ili Peugeot 5008, a za planinske ceste Kozare udobnija je Kuga s višim sjedištem.',
        ],
      },
      {
        heading: 'Kako teče rezervacija',
        bullets: [
          'Pošaljite upit s datumima preuzimanja i vraćanja — preko forme na sajtu, WhatsAppa ili poziva.',
          'Agencija vam javlja dostupnost i ukupnu cijenu za cijeli period.',
          'Tek kada potvrdite, rezervacija važi.',
          'Na dan preuzimanja zajedno pregledate vozilo i krećete.',
        ],
      },
      {
        heading: 'Pitanja koja vrijedi postaviti prije potvrde',
        paragraphs: [
          'Dobra agencija na ova pitanja odgovara jasno i prije nego što platite bilo šta. Ako odgovor nije jasan, pitajte ponovo:',
        ],
        bullets: [
          'Koliki je ukupan iznos za moj period, sa svim stavkama?',
          'Da li postoji depozit i kada se vraća?',
          'Da li je kilometraža ograničena?',
          'S koliko goriva preuzimam i vraćam auto?',
          'Mogu li s autom preći granicu i šta je za to potrebno?',
          'Šta se dešava ako kasnim s vraćanjem?',
        ],
      },
      {
        heading: 'Gdje preuzeti auto',
        paragraphs: [
          'Rent a Car Beganović nalazi se na magistralnom putu M4 u Brđanima, par minuta od Kozarca i oko četvrt sata od centra Prijedora. Prednost te lokacije je jednostavna: nakon preuzimanja ključeva odmah ste na glavnom putu prema Banjoj Luci, Kozari ili Novom Gradu, bez vožnje kroz gradsku gužvu.',
        ],
      },
    ],
  },
  {
    slug: 'nacionalni-park-kozara-autom-iz-prijedora',
    title: 'Nacionalni park Kozara autom: izlet iz Prijedora za jedan dan',
    metaTitle: 'Kozara autom iz Prijedora — izlet na Mrakovicu | Beganović',
    description:
      'Kako autom stići na Mrakovicu u Nacionalnom parku Kozara: ruta iz Prijedora i Kozarca, '
      + 'vrijeme vožnje, šta obići i koji auto izabrati ljeti i zimi.',
    excerpt:
      'Ruta, vrijeme vožnje, šta vidjeti na Mrakovici i koji auto izabrati — '
      + 'za jednodnevni izlet na Kozaru.',
    published: '2026-09-24',
    updated: '2026-09-24',
    readingMinutes: 4,
    image: '/images/fleet/ford-kuga-2012-automatik.webp',
    imageAlt: 'Ford Kuga automatik, idealan za izlet na Kozaru',
    keywords: ['kozara autom', 'mrakovica kako doći', 'nacionalni park kozara izlet', 'izlet iz prijedora'],
    sections: [
      {
        heading: 'Kozara — planina na pragu Prijedora',
        paragraphs: [
          'Nacionalni park Kozara zovu i „krajiškom ljepoticom“: guste šume bukve i jele, livade, potoci i vidikovci s pogledom na Potkozarje. Park je proglašen još 1967. godine, a njegovo središte je plato Mrakovica, na 700 do 800 metara nadmorske visine.',
        ],
      },
      {
        heading: 'Ruta i vrijeme vožnje',
        paragraphs: [
          'Na Kozaru se ide preko Kozarca. S magistrale M4 skrenete u Kozarcu i pratite asfaltni put koji vijuga kroz šumu oko 12 kilometara, do glavnog parkinga na Mrakovici.',
          'Od naše kancelarije u Brđanima to je oko 16 kilometara, odnosno 25-ak minuta vožnje. Iz centra Prijedora računajte još četvrt sata, a iz Banje Luke oko sat vremena.',
        ],
      },
      {
        heading: 'Šta obići na Mrakovici',
        bullets: [
          'Spomenik revoluciji na Mrakovici, djelo vajara Dušana Džamonje, i memorijalni kompleks.',
          'Obilježene planinarske i pješačke staze do vidikovaca.',
          'Biciklističke rute i prostor za piknik na livadama oko platoa.',
          'Zimi snijeg i sankanje — Kozara je omiljena i u hladnim mjesecima.',
        ],
        paragraphs: [
          'Aktuelne informacije o ulaznicama, stazama i događajima provjerite na zvaničnoj stranici parka prije polaska.',
        ],
      },
      {
        heading: 'Koji auto izabrati',
        paragraphs: [
          'Put do Mrakovice je asfaltiran, pa ljeti stiže svaki auto. Ako vas ide više, Mazda 5 sa sedam sjedišta ili Peugeot 5008 znače jedan auto za cijelu ekipu. Za vijugave planinske krivine mnogi radije biraju automatik, a Ford Kuga s višim sjedištem posebno je udobna na usponu.',
          'Zimi imajte na umu da je u BiH zimska oprema obavezna od 15. novembra do 15. aprila — pitajte nas kako je opremljeno vozilo koje rezervišete.',
        ],
      },
      {
        heading: 'Prijedlog za cijeli dan',
        bullets: [
          'Jutro: preuzimanje auta u Brđanima i kafa u Kozarcu.',
          'Prije podne: uspon na Mrakovicu, spomenik i kraća staza do vidikovca.',
          'Ručak: u prirodi na Kozari ili nazad u Kozarcu.',
          'Poslijepodne: šetnja uz Sanu u Prijedoru ili nastavak prema Banjoj Luci.',
        ],
      },
    ],
  },
]

export function findPost(slug: string) {
  return BLOG_POSTS.find(post => post.slug === slug)
}
