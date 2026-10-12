/* Adománybolt — product catalogue.
   Single source for the shop grid (Adomanybolt.dc.html), the product page
   (Termek.dc.html?p=<slug>) and the checkout (Penztar.dc.html).

   Mirrors the live WooCommerce store (amigos.hu, checked 2026-10-07):
     price    minimum donation in Ft. Every product is a Name Your Price
              product, so the shopper may pay more; WooCommerce receives
              the amount as the `nyp` field.
     wcId     WooCommerce product ID (all are simple products).
     max      add_to_cart.maximum from the Store API (= stock). WooCommerce
              enforces it again at checkout; this copy only keeps the UI
              honest and goes stale as stock moves.
     variants AdományoZokni sizes are separate simple products in
              WooCommerce, so each size carries its own wcId and max. A
              size must be chosen before adding to the cart.
     body     one entry per paragraph. */
window.AMIGOS_PRODUCTS = [
  {
    "slug": "egy-vilagraszolo-felfedezes",
    "name": "Egy világraszóló felfedezés",
    "cat": "konyv",
    "catLabel": "Könyv",
    "price": 3990,
    "wcId": 17784,
    "max": 20,
    "img": "assets/community/photos/korhaz-felolvasas-agynal.jpg",
    "alt": "Munkafüzet egy kórházi ágy mellett",
    "badge": "Népszerű",
    "badgeTone": "green",
    "body": [
      "Készen állsz egy különleges kalandra? Ezzel a könyvvel bejárhatod a világot az Amigókkal, miközben izgalmas országokat, kultúrákat, nyelveket és szokásokat ismersz meg játékos, kreatív formában.",
      "Az utazás során olyan helyekre látogatsz el, mint Kanada, az Egyesült Királyság, Portugália, Hollandia, Ausztria, Olaszország, Jordánia és Ausztrália — felfedezheted a hagyományaikat, ételeiket és látványosságaikat, és a nyelveikbe is bepillantasz.",
      "Az útitársad Matyi Kalandor, aki végigvezet a felfedezésen. Rajzolhatsz, színezhetsz, alkothatsz, és a készségfejlesztő feladatokon keresztül még közelebb kerülsz az utazás élményéhez.",
      "Eredetileg azért készítettük, hogy a kórházban gyógyuló gyerekekhez is elvigyük a felfedezés örömét. Az adományodból a programjainkat és a foglalkozásainkat valósítjuk meg."
    ],
    "stock": 20
  },
  {
    "slug": "amigos-parparade",
    "name": "Amigos PárParádé",
    "cat": "jatek",
    "catLabel": "Játék",
    "price": 4990,
    "wcId": 17779,
    "max": 10,
    "img": "https://amigos-20546.kxcdn.com/wp-content/uploads/2026/05/ParParade.jpg",
    "alt": "Amigos PárParádé",
    "badge": null,
    "badgeTone": null,
    "body": [
      "A PárParádé egy pörgős kártyajáték, amely játékosan segíti az angol és a német nyelv gyakorlását. Az Egy világraszóló felfedezés könyv alapján készült, iskolás korú gyerekeknek.",
      "Gyorsasági játék, ami fejleszt is: miközben a figyelem, a reakcióidő és a koncentráció erősödik, új szavakkal és kifejezésekkel ismerkedtek meg két idegen nyelven.",
      "5 éves kor felett ajánljuk, és minimum 2 fő játszhatja — jó választás családi játékhoz, baráti összejövetelhez vagy tanulás mellé."
    ],
    "stock": 10
  },
  {
    "slug": "amigos-vilagutazo-memoriajatek",
    "name": "Amigos Világutazó memóriajáték",
    "cat": "jatek",
    "catLabel": "Játék",
    "price": 2790,
    "wcId": 17153,
    "max": 55,
    "img": "https://amigos-20546.kxcdn.com/wp-content/uploads/2026/03/Vilagutazo-memoria-1.jpg",
    "alt": "Amigos Világutazó memóriajáték",
    "badge": null,
    "badgeTone": null,
    "body": [
      "Ez a memóriajáték nemcsak szórakoztató, hanem tanulságos is: a kártyák segítségével megismerheted a világ országait, zászlóit és érdekességeit.",
      "Tökéletes választás gyerekeknek és felnőtteknek egyaránt — közös családi játékhoz vagy ajándékba.",
      "Az adományodból a programjainkat és a foglalkozásainkat valósítjuk meg, hogy még több élményt és tanulási lehetőséget adhassunk a gyerekeknek."
    ],
    "stock": 55
  },
  {
    "slug": "amigos-vilagutazo-kartyajatek",
    "name": "Amigos Világutazó kártyajáték",
    "cat": "jatek",
    "catLabel": "Játék",
    "price": 2990,
    "wcId": 17162,
    "max": 58,
    "img": "https://amigos-20546.kxcdn.com/wp-content/uploads/2026/03/Vilagutazo.jpg",
    "alt": "Amigos Világutazó kártyajáték",
    "badge": null,
    "badgeTone": null,
    "body": [
      "Készen állsz egy világ körüli kártyapartira? Ebben a pörgős játékban a lapok segítségével ismeritek meg a világ országait, zászlóit és érdekességeit.",
      "Mindenki igyekszik minél több párt összegyűjteni, és elkerülni, hogy nála maradjon az utolsó lap. Nevetés, izgalom és egy kis földrajz egy pakliban.",
      "Az adományoddal a kórházi foglalkozásainkat is segíted, így a játék öröme másokhoz is eljut."
    ],
    "stock": 58
  },
  {
    "slug": "nemet-nyelvgyakorlo-fuzet-ismerkedo-szint",
    "name": "Német nyelvgyakorló füzet — ismerkedő szint",
    "cat": "fuzet",
    "catLabel": "Munkafüzet",
    "price": 1990,
    "wcId": 17679,
    "max": 10,
    "img": "https://amigos-20546.kxcdn.com/wp-content/uploads/2026/05/Nemet-ismerkedo-munkafuzet-scaled.png",
    "alt": "Német nyelvgyakorló füzet — ismerkedő szint",
    "badge": null,
    "badgeTone": null,
    "body": [
      "Ez a munkafüzet azoknak a gyerekeknek készült, akik most kezdenek ismerkedni a német nyelvvel, és az első lépéseket játékos formában tennék meg.",
      "A feladatok segítenek az alapok elsajátításában, bővítik a szókincset, és megszerettetik a nyelvtanulást már egészen kicsi kortól.",
      "Eredetileg kórházban lévő gyerekeknek készítettük, hogy vidámabbá tegyük a gyógyulás időszakát. Most szeretnénk, ha még több tanulni vágyó gyerekhez eljutna."
    ],
    "stock": 10
  },
  {
    "slug": "nemet-nyelvgyakorlo-fuzet-halado-szint",
    "name": "Német nyelvgyakorló füzet — haladó szint",
    "cat": "fuzet",
    "catLabel": "Munkafüzet",
    "price": 1990,
    "wcId": 17670,
    "max": 10,
    "img": "https://amigos-20546.kxcdn.com/wp-content/uploads/2026/05/Nemet-halado-munkafuzet-1.jpg",
    "alt": "Német nyelvgyakorló füzet — haladó szint",
    "badge": null,
    "badgeTone": null,
    "body": [
      "Azoknak a gyerekeknek, akik már ismerkednek a német nyelvvel, és szeretnének többet tanulni játékos formában.",
      "A feladatok bővítik a szókincset és fejlesztik a nyelvi készségeket, miközben a tanulás valóban élménnyé válik.",
      "Eredetileg kórházi foglalkozásokra készült. Az adományodból a programjainkat valósítjuk meg."
    ],
    "stock": 10
  },
  {
    "slug": "angol-nyelvgyakorlo-fuzet-ismerkedo-szint",
    "name": "Angol nyelvgyakorló füzet — ismerkedő szint",
    "cat": "fuzet",
    "catLabel": "Munkafüzet",
    "price": 1990,
    "wcId": 17739,
    "max": 10,
    "img": "https://amigos-20546.kxcdn.com/wp-content/uploads/2026/05/Angol-ismerkedo-munkafuzet-1.jpg",
    "alt": "Angol nyelvgyakorló füzet — ismerkedő szint",
    "badge": null,
    "badgeTone": null,
    "body": [
      "Hiszünk benne, hogy a nyelvtanulás új világokat nyit meg. Az angollal való ismerkedés lehet játékos és inspiráló — különösen, ha az első lépéseket örömmel tesszük meg.",
      "A feladatok segítenek az alapok elsajátításában, bővítik a szókincset, és megszerettetik a nyelvtanulást a kezdetektől.",
      "Eredetileg kórházban lévő gyerekeknek készítettük, hogy a gyógyulás ideje is tartalmasabb legyen."
    ],
    "stock": 10
  },
  {
    "slug": "angol-nyelvgyakorlo-fuzet-halado-szint",
    "name": "Angol nyelvgyakorló füzet — haladó szint",
    "cat": "fuzet",
    "catLabel": "Munkafüzet",
    "price": 1990,
    "wcId": 17749,
    "max": 10,
    "img": "https://amigos-20546.kxcdn.com/wp-content/uploads/2026/05/Angol-halado-munkafuzet-2.-kiadas-1.jpg",
    "alt": "Angol nyelvgyakorló füzet — haladó szint",
    "badge": null,
    "badgeTone": null,
    "body": [
      "Ez a haladó szintű füzet azoknak szól, akik már ismerik az alapokat, és tovább fejlesztenék a tudásukat.",
      "A feladatok bővítik a szókincset, elmélyítik a nyelvi készségeket, és magabiztosabbá teszik az angol használatát.",
      "Eredetileg kórházi foglalkozásokra készült — most szeretnénk, ha még több gyerekhez eljutna."
    ],
    "stock": 10
  },
  {
    "slug": "nyelvi-kavalkad-munkafuzet",
    "name": "Nyelvi kavalkád munkafüzet",
    "cat": "fuzet",
    "catLabel": "Munkafüzet",
    "price": 1990,
    "wcId": 17731,
    "max": 10,
    "img": "https://amigos-20546.kxcdn.com/wp-content/uploads/2026/05/Nyelvi-kavalkad.jpg",
    "alt": "Nyelvi kavalkád munkafüzet",
    "badge": null,
    "badgeTone": null,
    "body": [
      "Ismerd meg velünk, mennyire színes a világ! Ebben a füzetben többféle nyelvvel találkozhatsz — a franciától és a spanyoltól egészen a törökig vagy a vietnámiig.",
      "A játékos feladatokkal új szavakat tanulhatsz, bepillantasz különböző kultúrákba, és felfedezheted, milyen sokféleképpen kommunikálnak az emberek.",
      "Eredetileg kórházban lévő gyerekeknek készítettük, hogy megmutassuk: a tanulás egyszerre lehet izgalmas és örömteli."
    ],
    "stock": 10
  },
  {
    "slug": "egy-palyan-a-nagyokkal-focis-munkafuzet-angol",
    "name": "Egy pályán a nagyokkal — focis munkafüzet (angol)",
    "cat": "fuzet",
    "catLabel": "Munkafüzet",
    "price": 2490,
    "wcId": 17758,
    "max": 10,
    "img": "https://amigos-20546.kxcdn.com/wp-content/uploads/2026/05/focis-munkafuzet-angol-1-scaled.png",
    "alt": "Egy pályán a nagyokkal — focis munkafüzet (angol)",
    "badge": null,
    "badgeTone": null,
    "body": [
      "Ez a munkafüzet a labdarúgás világába vezet be — játékosan, kreatívan, élményekkel teli feladatokon keresztül.",
      "Készíthetsz saját címert, megtalálhatod a hozzád illő posztot, megírhatod a csapatod indulóját, és közben egyre többet tudsz meg a sportágról.",
      "A feladatok során az angol nyelvvel is találkozol, így a tanulás még színesebb élménnyé válik. Eredetileg kórházi foglalkozásokra készült."
    ],
    "stock": 10
  },
  {
    "slug": "egy-palyan-a-nagyokkal-focis-munkafuzet-nemet",
    "name": "Egy pályán a nagyokkal — focis munkafüzet (német)",
    "cat": "fuzet",
    "catLabel": "Munkafüzet",
    "price": 2490,
    "wcId": 17770,
    "max": 10,
    "img": "https://amigos-20546.kxcdn.com/wp-content/uploads/2026/05/nemet_UEFA-x-Amigos-munkafuzet_VEGLEGES.png",
    "alt": "Egy pályán a nagyokkal — focis munkafüzet (német)",
    "badge": null,
    "badgeTone": null,
    "body": [
      "Ez a füzet a labdarúgást és a német nyelvet hozza össze egy játékos kalandban.",
      "Saját címer, a hozzád illő poszt, saját induló — és közben egyre többet tudsz meg a sportág különlegességeiről.",
      "A kaland során Abigél és Aladár, az Amigo kalandorok is végigkísérnek, videós és extra tartalmakkal. Eredetileg kórházban lévő gyerekeknek készítettük."
    ],
    "stock": 10
  },
  {
    "slug": "husveti-adomanyozokni-2026",
    "name": "Húsvéti AdományoZokni 2026",
    "cat": "zokni",
    "catLabel": "Zokni",
    "price": 3490,
    "variants": [
      {
        "label": "31–34",
        "wcId": 17272,
        "max": 39
      },
      {
        "label": "35–38",
        "wcId": 17298,
        "max": 66
      },
      {
        "label": "39–42",
        "wcId": 17299,
        "max": 74
      },
      {
        "label": "43–46",
        "wcId": 17301,
        "max": 4
      }
    ],
    "img": "https://amigos-20546.kxcdn.com/wp-content/uploads/2026/03/Husveti-zokni-2026-1-1-1.jpg",
    "alt": "Húsvéti AdományoZokni 2026",
    "badge": "Kampány",
    "badgeTone": "plum",
    "body": [
      "Lepd meg magad vagy egy szerettedet egy vidám, tavaszi mintás zoknival, miközben egy jó ügyet is támogatsz.",
      "A csomag egy pár zoknit tartalmaz, 31–34, 35–38, 39–42 és 43–46 méretben. A designt Varsányi Orsi grafikusnak köszönhetjük.",
      "Az adományoddal hozzájárulsz ahhoz, hogy az Amigók még több kórházban fekvő gyerekhez eljuthassanak."
    ],
    "stock": 183
  },
  {
    "slug": "husveti-nosztalgia-adomanyozokni-2025",
    "name": "Húsvéti Nosztalgia AdományoZokni 2025",
    "cat": "zokni",
    "catLabel": "Zokni",
    "price": 3490,
    "variants": [
      {
        "label": "36–39",
        "wcId": 17122,
        "max": 43
      },
      {
        "label": "39–42",
        "wcId": 14742,
        "max": 40
      }
    ],
    "img": "https://amigos-20546.kxcdn.com/wp-content/uploads/2025/04/zokni-2-3-scaled.jpg",
    "alt": "Húsvéti Nosztalgia AdományoZokni 2025",
    "badge": null,
    "badgeTone": null,
    "body": [
      "Lemaradtál a korábbi AdományoZoknikról? Visszahoztuk tavaszi meglepetésként a 2025-ös kollekciót.",
      "A csomag egy pár zoknit tartalmaz, 36–39 és 39–42 méretben. A designt Varsányi Orsi grafikusnak köszönhetjük.",
      "Ez a zokni nemcsak a lábadat melengeti: az adományoddal a kórházi foglalkozásainkat támogatod."
    ],
    "stock": 83
  },
  {
    "slug": "husveti-nosztalgia-adomanyozokni-2022",
    "name": "Húsvéti Nosztalgia AdományoZokni 2022",
    "cat": "zokni",
    "catLabel": "Zokni",
    "price": 3490,
    "variants": [
      {
        "label": "36–39",
        "wcId": 17152,
        "max": 2
      },
      {
        "label": "40–44",
        "wcId": 17143,
        "max": 12
      }
    ],
    "img": "https://amigos-20546.kxcdn.com/wp-content/uploads/2026/03/Husveti-zokni2022-1.jpg",
    "alt": "Húsvéti Nosztalgia AdományoZokni 2022",
    "badge": null,
    "badgeTone": null,
    "body": [
      "Visszahoztuk a 2022-es AdományoZoknit is — a régi kedvenc újra kapható.",
      "A csomag egy pár zoknit tartalmaz, 36–39 és 40–44 méretben. A designt Varsányi Orsi grafikusnak köszönhetjük.",
      "Az adományoddal a kórházi foglalkozásainkat támogatod."
    ],
    "stock": 14
  }
];

/* Non-product lines the cart can send to WooCommerce. */
window.AMIGOS_SHOP_EXTRAS = {
  // "Kiegészítem 500 Ft adománnyal" → the "Egyedi Támogatás" NYP product.
  roundUp: { wcId: 11351, amount: 500, name: 'Kiegészítő adomány' }
};
