'use client';

import { Reveal } from './reveal';
import { Badge } from '@/components/ui/badge';
import { BookOpen, AlertTriangle, TrendingDown, Shield, Scale } from 'lucide-react';

const GUIDE_SECTIONS = [
  {
    icon: TrendingDown,
    title: 'Rörlig ränta — den största fällan',
    body: 'De flesta privatleasingavtal har rörlig ränta kopplad till STIBOR. När Riksbanken höjer styrräntan ökar din månadskostnad direkt på nästa faktura. En höjning på 2 % kan lägga 300–600 kr/mån på en bil till 490 000 kr. Vissa avtal erbjuder fast ränta, men då till en högre ingångshyra. Fråga alltid om räntan är fast eller rörlig innan du skriver på — och använd kalkylatorns stresstest för att se effekten av upp till +3 % räntehöjning.',
  },
  {
    icon: AlertTriangle,
    title: 'Övermilsavgifter — 12 till 25 kr per mil',
    body: 'Kör du mer än den avtalade körsträckan debiteras övermil. Avgiften varierar mellan 12 och 25 kr per överrullad mil beroende på märke och modell. En familj som kör 500 mil mer än avtalet kan få en slutnota på 6 000–12 500 kr vid återlämning. Mätaren i kalkylatorn visar automatiskt din förväntade övermilskostnad baserat på faktisk vs avtalad körsträcka.',
  },
  {
    icon: Shield,
    title: 'Besiktning & onormalt slitage vid återlämning',
    body: 'Vid återlämning genomgår bilen en besiktning enligt MRF-standard. Djupare repor genom lacken, dörruppslag, bucklor, kantstötta fälgar, fläckar i klädseln och stenskott i synfältet bedöms som onormalt slitage och debiteras. Normalt slitage — små ytliga repor och stenskott utanför synfältet — accepteras utan kostnad. En oberoende besiktning i förväg kan minska överraskningar. Budgetera 300 kr/mån som buffert.',
  },
  {
    icon: Scale,
    title: 'Billån vs leasing — när är vilket bäst?',
    body: 'Privatleasing skyddar dig helt mot oväntade fall i andrahandsvärde — särskilt värdefullt för elbilar som degraderas snabbt. Billån blir ofta billigare per mil om du behåller bilen längre än 3 år, eftersom du behåller restvärdet vid försäljning. Kontantköp binder kapital men ger full äganderätt och noll räntekostnad. Kalkylatorn visar den totala 3-årskostnaden för alla tre alternativ sida vid sida.',
  },
];

export function ComparisonSection() {
  return (
    <section id="guide" className="relative py-20 sm:py-28 scroll-mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center mb-14">
          <Badge
            variant="outline"
            className="mb-4 border-indigo-200 bg-indigo-50 text-indigo-700"
          >
            <BookOpen className="mr-1.5 h-3.5 w-3.5" />
            Komplett guide
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
            Privatleasing vs Köpa bil 2026 — Fällorna du måste se upp för
          </h2>
          <p className="mt-4 text-slate-600 text-lg leading-relaxed">
            En ärlig genomgång av de dolda kostnaderna som bilhandlare sällan
            nämner — och hur du undviker dem.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GUIDE_SECTIONS.map((section, i) => {
            const Icon = section.icon;
            return (
              <Reveal key={section.title} delay={i * 0.1}>
                <div className="h-full rounded-2xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 hover:shadow-md transition-shadow">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-200 mb-4">
                    <Icon className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {section.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {section.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.4} className="mt-10">
          <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 ring-1 ring-emerald-300 shrink-0">
                <AlertTriangle className="h-6 w-6 text-emerald-700" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Stresstest vid återlämning
                </h3>
                <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                  Kalkylatorn visar tydligt hur mycket en räntehöjning på 2 % kostar
                  per månad, och vad din förväntade övermil kan debiteras till vid
                  återlämning. Använd stresstestet för att se ditt värstafallsscenario
                  innan du skriver på avtalet.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
