import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const SITE_URL = 'https://www.privatleasingskalkylen.se';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Privatleasingskalkylen 2026 – Jämför privatleasing, lån & milkostnad',
  description:
    'Är privatleasing lönsamt? Beräkna total månadskostnad för privatleasing inklusive rörlig ränta, försäkring, övermil och jämför mot billån.',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'Privatleasingskalkylen 2026 – Jämför privatleasing, lån & milkostnad',
    description:
      'Är privatleasing lönsamt? Beräkna total månadskostnad för privatleasing inklusive rörlig ränta, försäkring, övermil och jämför mot billån.',
    url: SITE_URL,
    siteName: 'Privatleasingskalkylen.se',
    locale: 'sv_SE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privatleasingskalkylen 2026 – Jämför privatleasing, lån & milkostnad',
    description:
      'Är privatleasing lönsamt? Beräkna total månadskostnad för privatleasing inklusive rörlig ränta, försäkring, övermil och jämför mot billån.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Vad händer med leasingavgiften när räntan ändras?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'De flesta leasingavtal har rörlig ränta kopplad till STIBOR; höjs räntan ökar din månadskostnad direkt på nästa faktura.',
      },
    },
    {
      '@type': 'Question',
      name: 'Vad kostar det att köra över den avtalade körsträckan (övermil)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Övermilsavgiften varierar mellan ca 10 och 25 kr per överrullad mil beroende på märke och bilmodell.',
      },
    },
    {
      '@type': 'Question',
      name: 'Vad räknas som onormalt slitage vid återlämning?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Djupare repor genom lacken, dörruppslag/bucklor, kantstötta fälgar, fläckar i klädseln och stenskott i synfältet bedöms som onormalt slitage enligt MRF-standard och debiteras vid återlämning.',
      },
    },
    {
      '@type': 'Question',
      name: 'Är privatleasing mer lönsamt än att köpa elbil med lån?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Privatleasing skyddar dig helt mot oväntade fall i elbilars andrahandsvärde och teknisk degradering, medan billån ofta blir billigare per mil om du behåller bilen längre än 3 år.',
      },
    },
  ],
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Privatleasingskalkylen',
  url: SITE_URL,
  description:
    'Oberoende guide och beräkningsverktyg för billeasing. Beräkna total månadskostnad för privatleasing inklusive rörlig ränta, försäkring, övermil och jämför mot billån.',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />
      </body>
    </html>
  );
}
