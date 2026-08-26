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
    q: 'Vad händer med leasingavgiften när räntan ändras?',
    a: 'De flesta leasingavtal har rörlig ränta kopplad till STIBOR; höjs räntan ökar din månadskostnad direkt på nästa faktura. Vissa avtal erbjuder fast ränta men då oftast till en något högre ingångshyra. Kalkylatorn hjälper dig att simulera olika räntescenarier innan du skriver på.',
  },
  {
    q: 'Vad kostar det att köra över den avtalade körsträckan (övermil)?',
    a: 'Övermilsavgiften varierar mellan ca 10 och 25 kr per överrullad mil beroende på märke och bilmodell. Premiummärken ligger ofta i övre spannet. Om du vet att du kör mycket kan det löna sig att teckna ett avtal med högre ingångsmils-utrymme, även om månadshyran blir något högre.',
  },
  {
    q: 'Vad räknas som onormalt slitage vid återlämning?',
    a: 'Djupare repor genom lacken, dörruppslag/bucklor, kantstötta fälgar, fläckar i klädseln och stenskott i synfältet bedöms som onormalt slitage enligt MRF-standard och debiteras vid återlämning. Normalt slitage — små ytliga repor och stenskott utanför synfältet — accepteras utan kostnad.',
  },
  {
    q: 'Är privatleasing mer lönsamt än att köpa elbil med lån?',
    a: 'Privatleasing skyddar dig helt mot oväntade fall i elbilars andrahandsvärde och teknisk degradering, medan billån ofta blir billigare per mil om du behåller bilen längre än 3 år. Elbilar har visat stora värdeminsknings-svängningar, vilket gör leasing extra intressant för kortare perioder.',
  },
];

export function FaqSection() {
  return (
    <section
      id="faq"
      className="relative py-20 sm:py-28 scroll-mt-16 border-t border-border/40"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12">
          <Badge
            variant="outline"
            className="mb-4 border-primary/30 bg-primary/10 text-primary"
          >
            <HelpCircle className="mr-1.5 h-3.5 w-3.5" />
            Vanliga frågor
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">
            Frågor och svar om privatleasing
          </h2>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            Det svenska folkets vanligaste frågor om leasing, ränta och övermil.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <Accordion
            type="single"
            collapsible
            className="rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm px-6"
          >
            {FAQS.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-border/50"
              >
                <AccordionTrigger className="text-left text-base font-medium text-foreground hover:no-underline py-5">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-sm pb-5">
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
