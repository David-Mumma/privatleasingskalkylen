'use client';

import {
  Calculator,
  Percent,
  Gauge,
  Search,
  TrendingUp,
  Info,
} from 'lucide-react';
import { Reveal } from './reveal';
import { Badge } from '@/components/ui/badge';

const FORMULA_PARTS = [
  { label: 'Annonserad hyra', color: 'text-slate-900' },
  { label: '+ Aviavgifter', color: 'text-indigo-700' },
  { label: '+ Försäkring', color: 'text-emerald-600' },
  { label: '+ Vinterhjul & däck', color: 'text-amber-600' },
  { label: '+ Räntehöjning', color: 'text-red-600' },
  { label: '+ Övermilsbuffert', color: 'text-purple-600' },
  { label: '+ Slitagebuffert', color: 'text-pink-600' },
];

const COST_GUIDES = [
  {
    icon: Percent,
    title: 'Rörlig ränta vs fast ränta',
    body: 'De flesta privatleasingavtal har rörlig ränta kopplad till STIBOR eller styrräntan. När Riksbanken höjer räntan ökar din månadskostnad direkt på nästa faktura. Kalkylatorn simulerar räntehöjningar på +1 %, +2 % och +3 % så att du ser effekten på din hyra innan du skriver på.',
  },
  {
    icon: Gauge,
    title: 'Övermilsdebitering 12–25 kr/mil',
    body: 'Kör du mer än den avtalade körsträckan debiteras övermil. Avgiften varierar mellan 12 och 25 kr per överrullad mil beroende på märke och bilmodell. Vid 500 övermil och 20 kr/mil blir det 10 000 kr extra per år — en dold kostnad många missar.',
  },
  {
    icon: Search,
    title: 'Slutbesiktning & MRF-standard',
    body: 'Vid återlämning bedöms bilen enligt MRF-kalkyler för normalt vs onormalt slitage. Djupare repor, bucklor, kantstötta fälgar och stenskott i synfältet debiteras. En oberoende besiktning i förväg kan minska överraskningar och ge dig förhandlingsunderlag.',
  },
];

export function CalculatorLogicSection() {
  return (
    <section
      id="dolda-fallor"
      className="relative py-20 sm:py-28 scroll-mt-16 border-t border-slate-200 bg-slate-50"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center mb-14">
          <Badge
            variant="outline"
            className="mb-4 border-emerald-200 bg-emerald-50 text-emerald-700"
          >
            Dolda kostnader
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
            Kalkylatorns logik &amp; dolda leasingkostnader
          </h2>
          <p className="mt-4 text-slate-600 text-lg leading-relaxed">
            Så beräknas din verkliga månadskostnad — och vilka kostnader som ofta
            göms i det finstilta.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="p-6 sm:p-10">
              <div className="flex items-center gap-2 mb-6">
                <Calculator className="h-5 w-5 text-emerald-600" />
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
                  Formel: Verklig Månadskostnad (TCO)
                </h3>
              </div>

              <div className="overflow-x-auto">
                <div className="flex flex-col items-center gap-3 min-w-max">
                  <div className="text-base sm:text-xl font-mono font-semibold text-center leading-relaxed">
                    <span className="text-slate-900">Verklig Månadskostnad = </span>
                    {FORMULA_PARTS.map((p, i) => (
                      <span key={p.label}>
                        <span className={p.color}>{p.label}</span>
                        {i < FORMULA_PARTS.length - 1 && (
                          <span className="text-slate-400"> </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-start gap-2.5 rounded-lg bg-slate-50 border border-slate-200 p-4">
                <Info className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-600 leading-relaxed">
                  Engångskostnader som vinterhjul, servicepaket och övermil
                  fördelas jämnt över avtalstiden (t.ex. 36 månader) för att ge en
                  rättvis jämförelse med leasinghyran. Bufferten för onormalt
                  slitage baseras på MRF-standard vid återlämning.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {COST_GUIDES.map((guide, i) => {
            const Icon = guide.icon;
            return (
              <Reveal key={guide.title} delay={0.15 + i * 0.1}>
                <div className="h-full rounded-2xl border border-slate-200 bg-white shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-200 mb-4">
                    <Icon className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 mb-2">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {guide.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.5} className="mt-10">
          <div
            id="overmil"
            className="scroll-mt-16 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6 sm:p-8"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 ring-1 ring-emerald-300 shrink-0">
                <TrendingUp className="h-6 w-6 text-emerald-700" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Övermil — den vanligaste dolda kostnaden
                </h3>
                <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                  Övermilsavgiften varierar mellan 12 och 25 kr per mil. En familj
                  som kör 500 mil mer än avtalet kan få en slutnota på 6 000–12 500
                  kr. Kalkylatorn visar automatiskt vad din förväntade övermil
                  kostar per månad, fördelat över avtalstiden.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
