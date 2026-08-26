'use client';

import { Calculator, Heart } from 'lucide-react';
import { Reveal } from './reveal';

const NAV_LINKS = [
  { label: 'Privatleasing vs Köpa', href: '#jamforelse' },
  { label: 'Dolda Kostnader', href: '#dolda-kostnader' },
  { label: 'Övermil', href: '#overmil' },
  { label: 'FAQ', href: '#faq' },
];

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border/40 bg-secondary/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/30">
                  <Calculator className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-semibold tracking-tight text-foreground">
                  Privatleasingskalkylen
                  <span className="text-primary">.se</span>
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                Oberoende jämförelseportal för privatleasing i Sverige. Vi hjälper
                dig räkna ut den verkliga månadskostnaden.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
                Navigation
              </h4>
              <ul className="space-y-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
                Transparens
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Privatleasingskalkylen.se är en oberoende jämförelseportal. Sidan
                innehåller annonslänkar via affiliatenätverk.
              </p>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              © 2026 Privatleasingskalkylen.se. Alla rättigheter förbehållna.
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              Byggd med
              <Heart className="h-3 w-3 text-primary fill-primary" />
              i Sverige
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
