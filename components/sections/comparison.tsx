'use client';

import { motion } from 'framer-motion';
import {
  Check,
  X,
  Car,
  Landmark,
  Wallet,
  TrendingDown,
  Clock,
  ShieldAlert,
  Banknote,
} from 'lucide-react';
import { Reveal } from './reveal';
import { Badge } from '@/components/ui/badge';

type Option = {
  icon: typeof Car;
  title: string;
  subtitle: string;
  accentClass: string;
  pros: string[];
  cons: string[];
  totalLabel: string;
  totalValue: string;
  note: string;
};

const OPTIONS: Option[] = [
  {
    icon: Car,
    title: 'Privatleasing',
    subtitle: 'Fast eller rörlig månadshyra',
    accentClass: 'from-primary/20 to-primary/5 text-primary',
    pros: [
      'Ingen kontantinsats (0 kr)',
      'Inget andrahandsvärdes-risk',
      'Fast förutsägbar månadskostnad',
      'Service ofta inkluderat',
    ],
    cons: [
      'Begränsad körsträcka per år',
      'Risk för onormalt slitage vid återlämning',
      'Rörlig ränta kan höja kostnaden',
      'Du äger aldrig bilen',
    ],
    totalLabel: 'Total utgift 36 mån',
    totalValue: '~180 000–360 000 kr',
    note: 'Inklusive övermil & försäkring',
  },
  {
    icon: Landmark,
    title: 'Billån (med restvärde)',
    subtitle: 'Amortering + ränta',
    accentClass: 'from-accent/20 to-accent/5 text-accent',
    pros: [
      'Flexibel körsträcka utan övermil',
      'Ränteavdrag (30 %) i deklarationen',
      'Full frihet vid försäljning',
      'Du behåller bilens restvärde',
    ],
    cons: [
      'Kräver 20 % kontantinsats',
      'Amortering varje månad',
      'Du bär andrahandsvärdes-risk',
      'Hög månadskostnad vid hög ränta',
    ],
    totalLabel: 'Total utgift 36 mån',
    totalValue: '~210 000–390 000 kr',
    note: 'Netto efter ränteavdrag',
  },
  {
    icon: Wallet,
    title: 'Kontantköp',
    subtitle: 'Full äganderätt',
    accentClass: 'from-chart-3/20 to-chart-3/5 text-chart-3',
    pros: [
      'Ingen räntekostnad alls',
      'Full äganderätt från dag 1',
      'Inga avtalsrestriktioner',
      'Fri att sälja när som helst',
    ],
    cons: [
      'Binder eget kapital (40 000–600 000 kr)',
      'Bär 100 % av värdeminskningen',
      'Ingen ränteavdragsgilla kostnad',
      'Service & försäkring helt eget ansvar',
    ],
    totalLabel: 'Total utgift 36 mån',
    totalValue: '~150 000–300 000 kr',
    note: 'Exklusive värdeminskning',
  },
];

export function ComparisonSection() {
  return (
    <section id="jamforelse" className="relative py-20 sm:py-28 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center mb-14">
          <Badge
            variant="outline"
            className="mb-4 border-primary/30 bg-primary/10 text-primary"
          >
            Jämförelse
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">
            Privatleasing vs Billån vs Kontantköp 2026
          </h2>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            En ärlig nedbrytning av fördelar, nackdelar och total utgift över 36
            månader — så att du kan fatta ett välgrundat beslut.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {OPTIONS.map((opt, i) => {
            const Icon = opt.icon;
            return (
              <Reveal key={opt.title} delay={i * 0.12}>
                <div className="group relative h-full rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm overflow-hidden transition-all hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
                  <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="p-6">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${opt.accentClass} ring-1 ring-border/40 mb-4`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    <h3 className="text-xl font-semibold text-foreground">
                      {opt.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {opt.subtitle}
                    </p>

                    <div className="mt-5 space-y-2.5">
                      {opt.pros.map((pro) => (
                        <div key={pro} className="flex items-start gap-2.5">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15">
                            <Check className="h-3 w-3 text-accent" />
                          </span>
                          <span className="text-sm text-foreground/90">{pro}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-border/40 space-y-2.5">
                      {opt.cons.map((con) => (
                        <div key={con} className="flex items-start gap-2.5">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-destructive/15">
                            <X className="h-3 w-3 text-destructive" />
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {con}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 pt-4 border-t border-border/40">
                      <div className="flex items-baseline justify-between">
                        <span className="text-xs text-muted-foreground">
                          {opt.totalLabel}
                        </span>
                        <span className="text-xs text-muted-foreground/70">
                          {opt.note}
                        </span>
                      </div>
                      <p className="mt-1 text-lg font-bold text-foreground font-mono">
                        {opt.totalValue}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.4} className="mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <InsightCard
              icon={TrendingDown}
              title="Värdeminskning"
              text="Leasing skyddar mot oväntade fall i andrahandsvärde — särskilt värdefullt för elbilar."
            />
            <InsightCard
              icon={Clock}
              title="Bindningstid"
              text="Billån blir ofta billigare per mil om du behåller bilen längre än 3 år."
            />
            <InsightCard
              icon={ShieldAlert}
              title="Riskfördelning"
              text="Kontantköp binder kapital men ger total kontroll över försäljningstidpunkt."
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function InsightCard({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof Banknote;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-border/50 bg-secondary/20 p-5">
      <Icon className="h-5 w-5 text-primary mb-3" />
      <h4 className="text-sm font-semibold text-foreground mb-1">{title}</h4>
      <p className="text-xs text-muted-foreground leading-relaxed">{text}</p>
    </div>
  );
}
