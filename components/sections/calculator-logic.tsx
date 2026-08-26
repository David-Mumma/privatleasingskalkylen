'use client';

import { motion } from 'framer-motion';
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
  { label: 'Leasingavgift', color: 'text-primary' },
  { label: 'Räntejustering', color: 'text-chart-3' },
  { label: 'Försäkring', color: 'text-accent' },
  { label: 'Fordonsskatt', color: 'text-chart-4' },
  { label: '(Vinterhjul + Service + Övermil) / 36', color: 'text-chart-5' },
];

const COST_GUIDES = [
  {
    icon: Percent,
    title: 'STIBOR & rörlig leasinghyra',
    body: 'De flesta privatleasingavtal har rörlig ränta kopplad till STIBOR eller styrräntan. När Riksbanken höjer räntan ökar din månadskostnad direkt på nästa faktura. Kalkylatorn simulerar olika räntescenarier så att du ser effekten av +1 %, +2 % och +3 % på din hyra.',
  },
  {
    icon: Gauge,
    title: 'Övermilsdebitering 10–25 kr/mil',
    body: 'Kör du mer än den avtalade körsträckan debiteras övermil. Avgiften varierar mellan ca 10 och 25 kr per överrullad mil beroende på märke och bilmodell. Vid 500 övermil och 20 kr/mil blir det 10 000 kr extra per år — en dold kostnad många missar.',
  },
  {
    icon: Search,
    title: 'Slutbesiktning & MRF-standard',
    body: 'Vid återlämning bedöms bilen enligt MRF-kalkyler för normalt vs onormalt slitage. Djupare repor, bucklor, kantstötta fälgar och stenskott i synfältet debiteras. En oberoende besiktning i förväg kan minska överraskningar.',
  },
];

export function CalculatorLogicSection() {
  return (
    <section
      id="dolda-kostnader"
      className="relative py-20 sm:py-28 scroll-mt-16 border-t border-border/40"
    >
      <div className="absolute inset-0 bg-radial-fade opacity-50" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center mb-14">
          <Badge
            variant="outline"
            className="mb-4 border-accent/30 bg-accent/10 text-accent"
          >
            SEO-guide
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">
            Kalkylatorns logik &amp; dolda leasingkostnader
          </h2>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            Så beräknas din verkliga månadskostnad — och vilka kostnader som ofta
            göms i det finstilta.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mx-auto max-w-4xl rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm overflow-hidden">
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <div className="p-6 sm:p-10">
              <div className="flex items-center gap-2 mb-6">
                <Calculator className="h-5 w-5 text-primary" />
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                  Formel: Total Månadskostnad
                </h3>
              </div>

              <div className="overflow-x-auto">
                <div className="flex flex-col items-center gap-3 min-w-max">
                  <div className="text-lg sm:text-2xl font-mono font-semibold text-center">
                    <span className="text-foreground">Total Månadskostnad = </span>
                    {FORMULA_PARTS.map((p, i) => (
                      <span key={p.label}>
                        <span className={p.color}>{p.label}</span>
                        {i < FORMULA_PARTS.length - 1 && (
                          <span className="text-muted-foreground"> + </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-start gap-2.5 rounded-lg bg-secondary/30 border border-border/40 p-4">
                <Info className="h-4 w-4 text-primary/70 shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Engångskostnader som vinterhjul, servicepaket och övermil
                  fördelas jämnt över avtalstiden (36 månader) för att ge en rättvis
                  jämförelse med leasinghyran.
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
                <div className="h-full rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm p-6 hover:border-primary/40 transition-all">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20 mb-4">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
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
            className="scroll-mt-16 rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/10 to-transparent p-6 sm:p-8"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 ring-1 ring-accent/30 shrink-0">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Övermil — den vanligaste dolda kostnaden
                </h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  Övermilsavgiften varierar mellan ca 10 och 25 kr per mil. En
                  familj som kör 500 mil mer än avtalet kan därmed få en
                  slutnota på 5 000–12 500 kr. Kalkylatorn visar automatiskt vad
                  din förväntade övermil kostar per månad.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
