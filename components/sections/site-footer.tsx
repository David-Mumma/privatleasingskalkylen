'use client';

import { Calculator, Heart, ExternalLink } from 'lucide-react';
import { Reveal } from './reveal';

const NAV_LINKS = [
  { label: 'Kalkylator', href: '#kalkylator' },
  { label: 'Jämförelse', href: '#jamforelse' },
  { label: 'Dolda fällor', href: '#dolda-fallor' },
  { label: 'Guide', href: '#guide' },
  { label: 'FAQ', href: '#faq' },
];

const SISTER_LINKS = [
  { label: 'Milkostnadskalkylen', href: 'https://www.milkostnadskalkylen.se', desc: 'Räkna ut din totala milkostnad inklusive drivmedel' },
  { label: 'Förmånsbilskalkylen', href: 'https://www.formansbilskalkylen.se', desc: 'Funderar du på förmånsbil via jobbet istället? Se förmånsvärde' },
  { label: 'Reseavdragskalkylen', href: 'https://www.reseavdragskalkylen.se', desc: 'Gör skatteavdrag för resor till och från arbetet' },
];

export function SiteFooter() {
  return (
    <footer className="relative border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 ring-1 ring-emerald-200">
                  <Calculator className="h-5 w-5 text-emerald-600" />
                </div>
                <span className="text-sm font-semibold tracking-tight text-slate-900">
                  Privatleasingskalkylen<span className="text-emerald-600">.se</span>
                </span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed max-w-xs">
                Oberoende kalkylator för privatleasing i Sverige. Vi hjälper dig
                räkna ut den verkliga månadskostnaden — utan dolda överraskningar.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-4">
                Navigation
              </h4>
              <ul className="space-y-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-4">
                Relaterade kalkylatorer
              </h4>
              <ul className="space-y-3">
                {SISTER_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="group block"
                    >
                      <span className="flex items-center gap-1 text-sm font-medium text-slate-900 group-hover:text-emerald-600 transition-colors">
                        {link.label}
                        <ExternalLink className="h-3 w-3 opacity-50 group-hover:opacity-100" />
                      </span>
                      <span className="text-xs text-slate-500 leading-relaxed">
                        {link.desc}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-4">
                Transparens
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Sidan innehåller samarbetslänkar. Kalkylatorn är helt oberoende och
                kostnadsfri. Vi får ersättning om du klickar vidare till våra
                partners — det påverkar aldrig kalkylatorns resultat.
              </p>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-slate-500">
              © 2026 Privatleasingskalkylen.se. Alla rättigheter förbehållna.
            </p>
            <p className="text-xs text-slate-500 flex items-center gap-1.5">
              Byggd med
              <Heart className="h-3 w-3 text-emerald-600 fill-emerald-600" />
              i Sverige
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
