'use client';

import { Reveal } from './reveal';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: 'Vad kostar privatleasing egentligen per månad?',
    a: 'Den annonserade leasinghyran är sällan den verkliga månadskostnaden. Lägg till aviavgifter (ofta ca 69 kr/mån), försäkring (400–1 200 kr/mån), vinterhjul och däckskifte (350–500 kr/mån), eventuell räntehöjning om du har rörlig ränta, samt en buffert för övermil och onormalt slitage vid återlämning. I kalkylatorn ser du direkt vad dessa dolda kostnader gör med din totala månadskostnad — ofta 1 500–3 000 kr mer än den annonserade hyran.',
  },
  {
    q: 'Vad händer med månadskostnaden om räntan höjs under leasingperioden?',
    a: 'De flesta privatleasingavtal har rörlig ränta kopplad till STIBOR eller styrräntan. Om Riksbanken höjer räntan ökar din månadskostnad direkt på nästa faktura. En höjning på 2 % kan innebära flera hundralappar extra per månad beroende på bilens värde. Vissa avtal erbjuder fast ränta, men då oftast till en något högre ingångshyra. Kalkylatorns stresstest simulerar +1 %, +2 % och +3 % så att du ser effekten innan du skriver på.',
  },
  {
    q: 'Hur fungerar övermil vid privatleasing och vad kostar det?',
    a: 'Övermilsavgiften debiteras när du kör mer än den avtalade körsträckan per år. Avgiften varierar mellan ca 12 och 25 kr per överrullad mil beroende på märke och modell — premiummärken ligger ofta i övre spannet. Vid 500 övermil och 20 kr/mil blir det 10 000 kr extra per år, vilket motsvarar över 800 kr/mån. Om du vet att du kör mycket kan det löna sig att teckna ett avtal med högre ingångsmils-utrymme, även om månadshyran blir något högre.',
  },
  {
    q: 'Är det billigare att leasa eller köpa bil med lån 2026?',
    a: 'Privatleasing skyddar dig mot oväntade fall i andrahandsvärde och teknisk degradering — särskilt värdefullt för elbilar som har visat stora värdeminsknings-svängningar. Billån blir ofta billigare per mil om du behåller bilen längre än 3 år, eftersom du behåller restvärdet vid försäljning. Kalkylatorn jämför de totala kostnaderna sida vid sida över 36 månader, inklusive värdeminskning och restvärde, så att du ser vilket alternativ som är mest lönsamt för just din situation.',
  },
  {
    q: 'Vad räknas som onormalt slitage vid återlämning av privatleasingbil?',
    a: 'Enligt MRF-standard (Motorbranschens Riksförbunds kalkyler) bedöms bilen vid återlämning med en besiktning. Djupare repor genom lacken, dörruppslag och bucklor, kantstötta fälgar, fläckar i klädseln och stenskott i synfältet bedöms som onormalt slitage och debiteras. Normalt slitage — små ytliga repor och stenskott utanför synfältet — accepteras utan kostnad. En oberoende besiktning i förväg kan minska överraskningar. Vi rekommenderar en buffert på ca 300 kr/mån för onormalt slitage.',
  },
];

export function FaqSection() {
  return (
    <section
      id="faq"
      className="relative py-20 sm:py-28 scroll-mt-16 border-t border-slate-200"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12">
          <Badge
            variant="outline"
            className="mb-4 border-emerald-200 bg-emerald-50 text-emerald-700"
          >
            <HelpCircle className="mr-1.5 h-3.5 w-3.5" />
            Vanliga frågor
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
            Frågor och svar om privatleasing
          </h2>
          <p className="mt-4 text-slate-600 text-lg leading-relaxed">
            Det svenska folkets vanligaste frågor om leasing, ränta och övermil.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <Accordion
            type="single"
            collapsible
            className="rounded-2xl border border-slate-200 bg-white shadow-sm px-6"
          >
            {FAQS.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-slate-200"
              >
                <AccordionTrigger className="text-left text-base font-medium text-slate-900 hover:no-underline py-5">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed text-sm pb-5">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
