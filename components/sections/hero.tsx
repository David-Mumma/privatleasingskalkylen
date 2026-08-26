'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Gauge, Percent, CalendarDays, ShieldCheck, Snowflake, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const TEASERS = [
  { icon: ArrowRight, label: 'Månadskostnad', value: 'SEK', placeholder: 't.ex. 4 995 kr/mån' },
  { icon: Gauge, label: 'Körsträcka', value: '1 000–3 000 mil/år', placeholder: 'Mils/år' },
  { icon: Percent, label: 'Rörlig ränta', value: '%', placeholder: 'STIBOR + påslag' },
  { icon: CalendarDays, label: 'Avtalstid', value: '12–36 mån', placeholder: 'Månader' },
  { icon: ShieldCheck, label: 'Försäkring', value: 'Fullkasko', placeholder: 'Tillägg' },
  { icon: Snowflake, label: 'Vinterhjul', value: 'Inkl. / extra', placeholder: 'Säsong' },
];

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="absolute inset-0 bg-radial-fade" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge
              variant="outline"
              className="mb-6 border-primary/30 bg-primary/10 text-primary px-4 py-1.5 text-xs font-medium"
            >
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Sveriges smartaste privatleasingskalkylator
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance leading-[1.1]"
          >
            Privatleasingskalkylen — Jämför privatleasing mot lån & räkna ut{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              verklig månadskostnad
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed text-balance max-w-3xl mx-auto"
          >
            Oberoende guide och beräkningsverktyg för billeasing. Snart lanserar
            vi Sveriges smartaste privatleasingskalkylator för att räkna på fast
            vs rörlig ränta, övermilsavgifter, serviceavtal, försäkring och
            slutbesiktning.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <a href="#jamforelse">
                Jämför leasing vs köp
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-border bg-secondary/50"
              asChild
            >
              <a href="#dolda-kostnader">Se dolda kostnader</a>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 mx-auto max-w-5xl"
        >
          <div className="relative rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl shadow-2xl shadow-primary/5 overflow-hidden">
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <div className="flex items-center gap-2 border-b border-border/60 px-5 py-3.5 bg-secondary/30">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-destructive/60" />
                <div className="h-3 w-3 rounded-full bg-chart-3/60" />
                <div className="h-3 w-3 rounded-full bg-accent/60" />
              </div>
              <span className="ml-2 text-xs text-muted-foreground font-mono">
                privatleasingskalkylen.se/kalkylator
              </span>
              <Badge
                variant="outline"
                className="ml-auto border-accent/40 bg-accent/10 text-accent text-[10px] px-2 py-0.5"
              >
                <span className="mr-1 h-1.5 w-1.5 rounded-full bg-accent animate-pulse-glow" />
                Snart
              </Badge>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/30">
                  <Gauge className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-foreground">
                    Interaktiv leasingkalkylator lanseras inom kort
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Förhandsvisning av inmatningsfälten
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {TEASERS.map((t, i) => {
                  const Icon = t.icon;
                  return (
                    <motion.div
                      key={t.label}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                      className="group rounded-lg border border-border/60 bg-background/40 p-4 hover:border-primary/40 hover:bg-secondary/30 transition-all"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="h-4 w-4 text-primary/70" />
                        <span className="text-xs font-medium text-muted-foreground">
                          {t.label}
                        </span>
                      </div>
                      <div className="h-9 rounded-md bg-secondary/40 border border-border/40 px-3 flex items-center text-sm text-muted-foreground/70">
                        {t.placeholder}
                      </div>
                      <span className="mt-1.5 block text-[10px] text-muted-foreground/60">
                        {t.value}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-6 flex items-center justify-between rounded-lg bg-secondary/20 border border-border/40 px-4 py-3">
                <span className="text-xs text-muted-foreground">
                  Uppskattad total månadskostnad
                </span>
                <span className="text-sm font-semibold text-accent font-mono">
                  — kr/mån
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
