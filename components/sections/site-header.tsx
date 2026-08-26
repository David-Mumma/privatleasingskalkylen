'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Menu, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const NAV_ITEMS = [
  { label: 'Privatleasing vs Köpa', href: '#jamforelse' },
  { label: 'Dolda Kostnader', href: '#dolda-kostnader' },
  { label: 'Övermil', href: '#overmil' },
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
          ? 'bg-background/80 backdrop-blur-lg border-b border-border/60'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#top" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/30 transition-colors group-hover:bg-primary/20">
              <Calculator className="h-5 w-5 text-primary" />
            </div>
            <span className="text-sm font-semibold tracking-tight text-foreground">
              Privatleasingskalkylen<span className="text-primary">.se</span>
            </span>
          </a>

          <Badge
            variant="outline"
            className="hidden md:inline-flex border-accent/40 bg-accent/10 text-accent px-3 py-1 text-xs font-medium"
          >
            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-accent animate-pulse-glow" />
            Kalkylator under utveckling – Lanseras snart
          </Badge>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary/50"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Meny"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden border-t border-border/60 bg-background/95 backdrop-blur-lg"
        >
          <nav className="mx-auto max-w-7xl px-4 py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary/50"
              >
                {item.label}
              </a>
            ))}
            <Badge
              variant="outline"
              className="mt-2 border-accent/40 bg-accent/10 text-accent px-3 py-1.5 text-xs font-medium w-fit"
            >
              <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-accent animate-pulse-glow" />
              Kalkylator under utveckling
            </Badge>
          </nav>
        </motion.div>
      )}
    </header>
  );
}
