import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const SITE_URL = 'https://www.privatleasingskalkylen.se';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Privatleasingkalkylator 2026 – Räkna ut verklig månadskostnad & jämför med lån',
  description:
    'Vad kostar privatleasing egentligen? Beräkna dolda kostnader, rörlig ränta, övermil och jämför direkt mot billån och kontantköp i kalkylatorn.',
  keywords: [
    'privatleasing kalkylator räkna ut',
    'privatleasing vs köpa bil kalkyl',
    'verklig kostnad privatleasing per månad',
    'privatleasing rörlig ränta kalkyl',
    'övermil privatleasing kostnad räkna',
    'jämföra privatleasing och billån',
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'Privatleasingkalkylator 2026 – Räkna ut verklig månadskostnad & jämför med lån',
    description:
      'Vad kostar privatleasing egentligen? Beräkna dolda kostnader, rörlig ränta, övermil och jämför direkt mot billån och kontantköp i kalkylatorn.',
    url: SITE_URL,
    siteName: 'Privatleasingskalkylen.se',
    locale: 'sv_SE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privatleasingkalkylator 2026 – Räkna ut verklig månadskostnad & jämför med lån',
    description:
      'Vad kostar privatleasing egentligen? Beräkna dolda kostnader, rörlig ränta, övermil och jämför direkt mot billån och kontantköp i kalkylatorn.',
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'tradedoubler-verification': '3496015',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Vad kostar privatleasing egentligen per månad?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Den annonserade leasinghyran är sällan den verkliga månadskostnaden. Lägg till aviavgifter, försäkring, vinterhjul, eventuell räntehöjning och en buffert för övermil och onormalt slitage. I kalkylatorn ser du direkt vad dessa dolda kostnader gör med din totala månadskostnad.',
      },
    },
    {
      '@type': 'Question',
      name: 'Vad händer med månadskostnaden om räntan höjs under leasingperioden?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'De flesta privatleasingavtal har rörlig ränta kopplad till STIBOR. Om räntan höjs med 1–3 % ökar din månadskostnad direkt på nästa faktura. En höjning på 2 % kan innebära flera hundralappar extra per månad, vilket kalkylatorns stresstest visar.',
      },
    },
    {
      '@type': 'Question',
      name: 'Hur fungerar övermil vid privatleasing och vad kostar det?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Övermilsavgiften debiteras när du kör mer än den avtalade körsträckan. Avgiften varierar mellan ca 12 och 25 kr per överrullad mil beroende på märke och modell. Vid 500 övermil och 20 kr/mil blir det 10 000 kr extra per år — en dold kostnad många missar.',
      },
    },
    {
      '@type': 'Question',
      name: 'Är det billigare att leasa eller köpa bil med lån 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Privatleasing skyddar dig mot oväntade fall i andrahandsvärde och teknisk degradering, medan billån ofta blir billigare per mil om du behåller bilen längre än 3 år. Kalkylatorn jämför de totala kostnaderna sida vid sida så att du ser vilket alternativ som är mest lönsamt för din situation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Vad räknas som onormalt slitage vid återlämning av privatleasingbil?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Djupare repor genom lacken, dörruppslag och bucklor, kantstötta fälgar, fläckar i klädseln och stenskott i synfältet bedöms som onormalt slitage enligt MRF-standard och debiteras vid återlämning. Normalt slitage — små ytliga repor och stenskott utanför synfältet — accepteras utan kostnad.',
      },
    },
  ],
};

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Privatleasingskalkylen',
  url: SITE_URL,
  description:
    'Oberoende privatleasingkalkylator. Beräkna total månadskostnad för privatleasing inklusive rörlig ränta, försäkring, övermil och jämför mot billån och kontantköp.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  inLanguage: 'sv-SE',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'SEK',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Privatleasingskalkylen.se',
    url: SITE_URL,
  },
};

const financialProductSchema = {
  '@context': 'https://schema.org',
  '@type': 'FinancialProduct',
  name: 'Privatleasingkalkylator',
  url: SITE_URL,
  description:
    'Kalkylator för privatleasing som beräknar verklig månadskostnad inklusive dolda avgifter och jämför mot billån och kontantköp.',
  category: 'Leasing',
  currency: 'SEK',
  provider: {
    '@type': 'Organization',
    name: 'Privatleasingskalkylen.se',
    url: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv" className={inter.variable}>
      <head>
        <meta name="tradedoubler-verification" content="3496015" />
      </head>
      <body className="font-sans antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(financialProductSchema) }}
        />
      </body>
    </html>
  );
}
