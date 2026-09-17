'use client';

import { useEffect, useState } from 'react';
import { Calculator, Menu, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const NAV_ITEMS = [
  { label: 'Kalkylator', href: '#kalkylator' },
  { label: 'Jämförelse', href: '#jamforelse' },
  { label: 'Dolda fällor', href: '#dolda-fallor' },
  { label: 'Guide', href: '#guide' },
  { label: 'FAQ', href: '#faq' },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-lg border-b border-slate-200 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#top" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 ring-1 ring-emerald-200 transition-colors group-hover:bg-emerald-100">
              <Calculator className="h-5 w-5 text-emerald-600" />
            </div>
            <span className="text-sm font-semibold tracking-tight text-slate-900">
              Privatleasingskalkylen<span className="text-emerald-600">.se</span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm text-slate-600 hover:text-slate-900 transition-colors rounded-md hover:bg-slate-100"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Badge
              variant="outline"
              className="border-emerald-200 bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-medium"
            >
              <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Gratis & oberoende
            </Badge>
            <Button
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              asChild
            >
              <a href="#kalkylator">Öppna kalkylatorn</a>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-slate-700"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Meny"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-lg">
          <nav className="mx-auto max-w-7xl px-4 py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 text-sm text-slate-600 hover:text-slate-900 transition-colors rounded-md hover:bg-slate-100"
              >
                {item.label}
              </a>
            ))}
            <Button
              size="sm"
              className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white w-full"
              asChild
            >
              <a href="#kalkylator" onClick={() => setMobileOpen(false)}>
                Öppna kalkylatorn
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
