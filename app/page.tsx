'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SiteHeader } from '@/components/sections/site-header';
import { CalculatorLogicSection } from '@/components/sections/calculator-logic';
import { ComparisonSection } from '@/components/sections/comparison';
import { FaqSection } from '@/components/sections/faq';
import { SiteFooter } from '@/components/sections/site-footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Sparkles,
  Car,
  Zap,
  Truck,
  Gauge,
  CalendarDays,
  Shield,
  Snowflake,
  Percent,
  Wrench,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Info,
  Wallet,
  Landmark,
  Banknote,
  ChevronRight,
} from 'lucide-react';

type Preset = {
  id: string;
  name: string;
  icon: typeof Zap;
  monthlyLease: number;
  carPrice: number;
  annualMiles: number;
  actualMiles: number;
  color: string;
};

const PRESETS: Preset[] = [
  {
    id: 'elbil',
    name: 'Populär Elbil',
    icon: Zap,
    monthlyLease: 4895,
    carPrice: 490000,
    annualMiles: 1500,
    actualMiles: 1700,
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  },
  {
    id: 'hybrid',
    name: 'Kompakt Bensin/Hybrid',
    icon: Car,
    monthlyLease: 3490,
    carPrice: 320000,
    annualMiles: 1000,
    actualMiles: 1200,
    color: 'text-indigo-700 bg-indigo-50 border-indigo-200',
  },
  {
    id: 'suv',
    name: 'Familje-SUV',
    icon: Truck,
    monthlyLease: 6200,
    carPrice: 540000,
    annualMiles: 2000,
    actualMiles: 2200,
    color: 'text-amber-700 bg-amber-50 border-amber-200',
  },
];

const fmt = (n: number) => Math.round(n).toLocaleString('sv-SE');
const fmtKr = (n: number) => `${fmt(n)} kr`;

export default function Home() {
  // Preset state
  const [activePreset, setActivePreset] = useState<string>('elbil');

  // Leasing inputs
  const [monthlyLease, setMonthlyLease] = useState(4895);
  const [annualMiles, setAnnualMiles] = useState(1500);
  const [actualMiles, setActualMiles] = useState(1700);
  const [contractMonths, setContractMonths] = useState(36);
  const [overmilCost, setOvermilCost] = useState(20);

  // Hidden costs
  const [aviFee, setAviFee] = useState(69);
  const [insurance, setInsurance] = useState(700);
  const [winterTires, setWinterTires] = useState(425);
  const [wearBuffer, setWearBuffer] = useState(300);
  const [rateType, setRateType] = useState<'rorlig' | 'fast'>('rorlig');
  const [rateHike, setRateHike] = useState(2);

  // Loan comparison
  const [carPrice, setCarPrice] = useState(490000);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [loanRate, setLoanRate] = useState(6.5);
  const [depreciationRate, setDepreciationRate] = useState(13);

  // Mobile sticky bar
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 600);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Apply preset
  const applyPreset = (p: Preset) => {
    setActivePreset(p.id);
    setMonthlyLease(p.monthlyLease);
    setAnnualMiles(p.annualMiles);
    setActualMiles(p.actualMiles + 200);
    setCarPrice(p.carPrice);
  };

  // ===== Calculations =====
  const calc = useMemo(() => {
    // Overmil
    const overmilPerYear = Math.max(0, actualMiles - annualMiles);
    const overmilMonthly = (overmilPerYear * overmilCost) / 12;

    // Rate hike impact (approximate: monthly lease * rateHike% * factor)
    // Roughly: the rate portion of lease is ~40% of car value over term
    const rateImpactMonthly = rateType === 'rorlig'
      ? (monthlyLease * rateHike) / 100 * 0.35
      : 0;

    // Total monthly leasing TCO
    const totalLeaseMonthly =
      monthlyLease +
      aviFee +
      insurance +
      winterTires +
      rateImpactMonthly +
      overmilMonthly +
      wearBuffer;

    // Total over contract
    const totalLeaseCost = totalLeaseMonthly * contractMonths;

    // Advertised comparison
    const advertisedMonthly = monthlyLease;
    const hiddenMonthly = totalLeaseMonthly - monthlyLease;
    const hiddenPct = Math.round((hiddenMonthly / advertisedMonthly) * 100);

    // ===== Loan calculation =====
    const downPayment = (carPrice * downPaymentPct) / 100;
    const loanAmount = carPrice - downPayment;
    const monthlyRate = loanRate / 100 / 12;
    // Annuity payment
    const loanMonthly =
      monthlyRate === 0
        ? loanAmount / contractMonths
        : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, contractMonths)) /
          (Math.pow(1 + monthlyRate, contractMonths) - 1);

    // Insurance + tires for loan (same as lease)
    const loanTotalMonthly = loanMonthly + insurance + winterTires + wearBuffer;
    const loanTotalCost = loanTotalMonthly * contractMonths + downPayment;

    // Depreciation
    const depreciationPerYear = (carPrice * depreciationRate) / 100;
    const totalDepreciation = (depreciationPerYear * contractMonths) / 12;
    const residualValue = carPrice - totalDepreciation;

    // Net wealth loss for loan = total paid - residual value recovered
    const loanNetWealthLoss = loanTotalCost - residualValue;

    // ===== Cash purchase =====
    const cashTotalCost = carPrice - residualValue + (insurance + winterTires + wearBuffer) * contractMonths;
    const cashMonthlyEquivalent = cashTotalCost / contractMonths;

    // Comparison verdict
    const leaseIsCheapest = totalLeaseMonthly <= loanTotalMonthly && totalLeaseMonthly <= cashMonthlyEquivalent;
    const loanIsCheapest = loanTotalMonthly <= totalLeaseMonthly && loanTotalMonthly <= cashMonthlyEquivalent;

    // Stress test: 2% rate hike
    const stressTestImpact = (monthlyLease * 2) / 100 * 0.35;

    return {
      overmilPerYear,
      overmilMonthly,
      rateImpactMonthly,
      totalLeaseMonthly,
      totalLeaseCost,
      advertisedMonthly,
      hiddenMonthly,
      hiddenPct,
      loanMonthly,
      loanTotalMonthly,
      loanTotalCost,
      loanNetWealthLoss,
      residualValue,
      totalDepreciation,
      cashTotalCost,
      cashMonthlyEquivalent,
      leaseIsCheapest,
      loanIsCheapest,
      stressTestImpact,
      downPayment,
      loanAmount,
    };
  }, [
    monthlyLease, annualMiles, actualMiles, contractMonths, overmilCost,
    aviFee, insurance, winterTires, wearBuffer, rateType, rateHike,
    carPrice, downPaymentPct, loanRate, depreciationRate,
  ]);

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-slate-50">
        {/* ===== HERO ===== */}
        <section id="top" className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          <div className="absolute inset-0 bg-radial-fade" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto max-w-4xl text-center"
            >
              <Badge
                variant="outline"
                className="mb-6 border-emerald-200 bg-emerald-50 text-emerald-700 px-4 py-1.5 text-xs font-medium"
              >
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                Sveriges smartaste privatleasingskalkylator
              </Badge>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 text-balance leading-[1.1]">
                Räkna ut din{' '}
                <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                  verkliga månadskostnad
                </span>{' '}
                för privatleasing
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed text-balance max-w-3xl mx-auto">
                Jämför privatleasing mot billån och kontantköp — inklusive dolda
                kostnader som rörlig ränta, övermil, aviavgifter och onormalt
                slitage. Helt gratis och oberoende.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white w-full sm:w-auto" asChild>
                  <a href="#kalkylator">
                    Starta kalkylatorn
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-slate-300 bg-white text-slate-700 hover:bg-slate-50" asChild>
                  <a href="#jamforelse">Se jämförelsen</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== CALCULATOR ===== */}
        <section id="kalkylator" className="relative py-12 sm:py-16 scroll-mt-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Presets */}
            <div className="mb-8">
              <p className="text-sm font-medium text-slate-500 mb-3 text-center">
                Snabbstart — välj en förvald bil:
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {PRESETS.map((p) => {
                  const Icon = p.icon;
                  const active = activePreset === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => applyPreset(p)}
                      className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                        active
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm ring-1 ring-emerald-200'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {p.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* ===== INPUT PANEL ===== */}
              <div className="lg:col-span-3 space-y-6">
                {/* Leasing details */}
                <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 ring-1 ring-emerald-200">
                      <Gauge className="h-5 w-5 text-emerald-600" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900">Leasinguppgifter</h3>
                  </div>

                  <div className="space-y-5">
                    {/* Monthly lease */}
                    <SliderInput
                      label="Annonserad månadshyra"
                      value={monthlyLease}
                      onChange={setMonthlyLease}
                      min={2000}
                      max={12000}
                      step={50}
                      suffix="kr/mån"
                    />

                    {/* Annual miles */}
                    <div>
                      <label className="flex items-center justify-between text-sm font-medium text-slate-700 mb-2">
                        <span>Avtalad körsträcka per år</span>
                        <span className="text-emerald-600 font-semibold">{fmt(annualMiles)} mil/år</span>
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {[1000, 1500, 2000, 2500].map((m) => (
                          <button
                            key={m}
                            onClick={() => setAnnualMiles(m)}
                            className={`rounded-lg border py-2 text-sm font-medium transition-all ${
                              annualMiles === m
                                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            {fmt(m)}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Actual miles */}
                    <SliderInput
                      label="Uppskattad faktisk körsträcka"
                      value={actualMiles}
                      onChange={setActualMiles}
                      min={500}
                      max={4000}
                      step={50}
                      suffix="mil/år"
                    />

                    {/* Overmil cost */}
                    <SliderInput
                      label="Övermilsavgift"
                      value={overmilCost}
                      onChange={setOvermilCost}
                      min={12}
                      max={25}
                      step={1}
                      suffix="kr/övermil"
                    />

                    {/* Contract months */}
                    <div>
                      <label className="flex items-center justify-between text-sm font-medium text-slate-700 mb-2">
                        <span>Avtalslängd</span>
                        <span className="text-emerald-600 font-semibold">{contractMonths} månader</span>
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {[12, 24, 36, 48].map((m) => (
                          <button
                            key={m}
                            onClick={() => setContractMonths(m)}
                            className={`rounded-lg border py-2 text-sm font-medium transition-all ${
                              contractMonths === m
                                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            {m} mån
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hidden costs */}
                <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 ring-1 ring-amber-200">
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900">Dolda &amp; tillkommande kostnader</h3>
                  </div>

                  <div className="space-y-5">
                    {/* Avi fee */}
                    <SliderInput
                      label="Uppläggnings- & aviavgifter"
                      value={aviFee}
                      onChange={setAviFee}
                      min={0}
                      max={150}
                      step={1}
                      suffix="kr/mån"
                    />

                    {/* Rate type toggle */}
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">Ränteklausul</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setRateType('rorlig')}
                          className={`flex items-center justify-center gap-2 rounded-lg border py-2.5 text-sm font-medium transition-all ${
                            rateType === 'rorlig'
                              ? 'border-red-400 bg-red-50 text-red-700'
                              : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <Percent className="h-4 w-4" />
                          Rörlig ränta
                        </button>
                        <button
                          onClick={() => setRateType('fast')}
                          className={`flex items-center justify-center gap-2 rounded-lg border py-2.5 text-sm font-medium transition-all ${
                            rateType === 'fast'
                              ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
                              : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <Shield className="h-4 w-4" />
                          Fast ränta
                        </button>
                      </div>
                    </div>

                    {/* Rate hike slider */}
                    {rateType === 'rorlig' && (
                      <div className="animate-fade-in">
                        <SliderInput
                          label="Simulerad räntehöjning"
                          value={rateHike}
                          onChange={setRateHike}
                          min={0}
                          max={3}
                          step={0.5}
                          suffix="%"
                        />
                      </div>
                    )}

                    {/* Insurance */}
                    <SliderInput
                      label="Försäkring (om ej inkluderat)"
                      value={insurance}
                      onChange={setInsurance}
                      min={0}
                      max={1200}
                      step={50}
                      suffix="kr/mån"
                    />

                    {/* Winter tires */}
                    <SliderInput
                      label="Vinterhjul & däckskifte"
                      value={winterTires}
                      onChange={setWinterTires}
                      min={0}
                      max={800}
                      step={25}
                      suffix="kr/mån"
                    />

                    {/* Wear buffer */}
                    <SliderInput
                      label="Buffert för onormalt slitage"
                      value={wearBuffer}
                      onChange={setWearBuffer}
                      min={0}
                      max={800}
                      step={50}
                      suffix="kr/mån"
                    />
                  </div>
                </div>

                {/* Loan comparison */}
                <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 ring-1 ring-indigo-200">
                      <Landmark className="h-5 w-5 text-indigo-600" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900">Jämförelse: Köpa med Billån</h3>
                  </div>

                  <div className="space-y-5">
                    <SliderInput
                      label="Bilens nypris / köppris"
                      value={carPrice}
                      onChange={setCarPrice}
                      min={100000}
                      max={1000000}
                      step={10000}
                      suffix="kr"
                    />

                    <SliderInput
                      label="Kontantinsats"
                      value={downPaymentPct}
                      onChange={setDownPaymentPct}
                      min={20}
                      max={100}
                      step={5}
                      suffix="%"
                    />

                    <SliderInput
                      label="Låneränta"
                      value={loanRate}
                      onChange={setLoanRate}
                      min={2}
                      max={12}
                      step={0.25}
                      suffix="%"
                    />

                    <SliderInput
                      label="Värdeminskning per år"
                      value={depreciationRate}
                      onChange={setDepreciationRate}
                      min={8}
                      max={20}
                      step={1}
                      suffix="%"
                    />
                  </div>
                </div>
              </div>

              {/* ===== RESULTS PANEL ===== */}
              <div className="lg:col-span-2 space-y-6">
                {/* Main result */}
                <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white shadow-sm p-6 sticky top-20">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 ring-1 ring-emerald-300">
                      <TrendingUp className="h-5 w-5 text-emerald-700" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900">Verklig Månadskostnad</h3>
                  </div>

                  <div className="text-center py-4">
                    <p className="text-4xl sm:text-5xl font-bold text-emerald-600 font-mono">
                      {fmtKr(calc.totalLeaseMonthly)}
                    </p>
                    <p className="text-sm text-slate-500 mt-1">per månad (TCO)</p>
                  </div>

                  <div className="mt-4 space-y-2 text-sm">
                    <ResultRow label="Annonserad hyra" value={fmtKr(calc.advertisedMonthly)} />
                    <ResultRow label="Aviavgifter" value={fmtKr(aviFee)} />
                    <ResultRow label="Försäkring" value={fmtKr(insurance)} />
                    <ResultRow label="Vinterhjul & däck" value={fmtKr(winterTires)} />
                    {calc.rateImpactMonthly > 0 && (
                      <ResultRow
                        label={`Räntehöjning (+${rateHike}%)`}
                        value={`+${fmtKr(calc.rateImpactMonthly)}`}
                        highlight="red"
                      />
                    )}
                    {calc.overmilMonthly > 0 && (
                      <ResultRow
                        label={`Övermil (${fmt(calc.overmilPerYear)} mil/år)`}
                        value={`+${fmtKr(calc.overmilMonthly)}`}
                        highlight="red"
                      />
                    )}
                    <ResultRow label="Slitagebuffert" value={fmtKr(wearBuffer)} />
                  </div>

                  <div className="mt-4 pt-4 border-t border-emerald-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Dolda kostnader/mån</span>
                      <span className="font-semibold text-red-600">+{fmtKr(calc.hiddenMonthly)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-1">
                      <span className="text-slate-600">Påslag mot annons</span>
                      <span className="font-semibold text-red-600">+{calc.hiddenPct}%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-1">
                      <span className="text-slate-600">Total {contractMonths} mån</span>
                      <span className="font-semibold text-slate-900">{fmtKr(calc.totalLeaseCost)}</span>
                    </div>
                  </div>

                  {/* Affiliate CTA: Insurance */}
                  {insurance > 0 && (
                    <div className="mt-5 rounded-xl border border-indigo-200 bg-indigo-50 p-4">
                      <p className="text-xs text-indigo-700 font-medium mb-2">
                        Försäkring ej inkluderad?
                      </p>
                      <a
                        href="https://www.compricer.se"
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="flex items-center justify-between text-sm font-semibold text-indigo-700 hover:text-indigo-800 transition-colors"
                      >
                        Jämför bilförsäkring &amp; spara upp till 3 000 kr/år hos Compricer
                        <ExternalLink className="h-4 w-4 shrink-0 ml-2" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Stress test */}
                <div className="rounded-2xl border border-red-200 bg-red-50 shadow-sm p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-100 ring-1 ring-red-200">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900">Stresstest vid återlämning</h3>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Räntehöjning +2 %/mån</span>
                      <span className="font-semibold text-red-600">+{fmtKr(calc.stressTestImpact)}</span>
                    </div>
                    {calc.overmilPerYear > 0 ? (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Övermil vid återlämning</span>
                        <span className="font-semibold text-red-600">
                          {fmtKr(calc.overmilPerYear * overmilCost)}/år
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Övermil</span>
                        <span className="font-semibold text-emerald-600">Inga övermil</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 rounded-lg bg-white border border-red-100 p-3">
                    <p className="text-xs text-slate-600 leading-relaxed">
                      <Info className="inline h-3 w-3 text-red-500 mr-1" />
                      Vid en räntehöjning på 2 % och {fmt(calc.overmilPerYear)} övermil/år
                      kan din slutnota bli{' '}
                      <span className="font-semibold text-red-600">
                        {fmtKr(calc.stressTestImpact * contractMonths + calc.overmilPerYear * overmilCost * (contractMonths / 12))}
                      </span>{' '}
                      extra under avtalstiden.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ===== COMPARISON TABLE ===== */}
            <div id="jamforelse" className="mt-16 scroll-mt-16">
              <h3 className="text-2xl font-bold text-slate-900 text-center mb-2">
                Sidenvid-sida jämförelse över {contractMonths} månader
              </h3>
              <p className="text-slate-600 text-center mb-8 max-w-2xl mx-auto">
                Månatlig likviditet kontra total förmögenhetsförlust efter {contractMonths / 12} år
                (restvärde inräknat).
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className="text-left p-4 font-semibold text-slate-900">Jämförelse</th>
                      <th className="text-right p-4 font-semibold text-slate-900">
                        <span className="flex items-center justify-end gap-1.5">
                          <Car className="h-4 w-4 text-emerald-600" />
                          Privatleasing
                        </span>
                      </th>
                      <th className="text-right p-4 font-semibold text-slate-900">
                        <span className="flex items-center justify-end gap-1.5">
                          <Landmark className="h-4 w-4 text-indigo-600" />
                          Billån
                        </span>
                      </th>
                      <th className="text-right p-4 font-semibold text-slate-900">
                        <span className="flex items-center justify-end gap-1.5">
                          <Wallet className="h-4 w-4 text-amber-600" />
                          Kontantköp
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-4 text-slate-600">Månadskostnad</td>
                      <td className="p-4 text-right font-mono font-semibold text-slate-900">{fmtKr(calc.totalLeaseMonthly)}</td>
                      <td className="p-4 text-right font-mono font-semibold text-slate-900">{fmtKr(calc.loanTotalMonthly)}</td>
                      <td className="p-4 text-right font-mono font-semibold text-slate-900">{fmtKr(calc.cashMonthlyEquivalent)}</td>
                    </tr>
                    <tr>
                      <td className="p-4 text-slate-600">Kontantinsats</td>
                      <td className="p-4 text-right text-slate-500">0 kr</td>
                      <td className="p-4 text-right font-mono text-slate-900">{fmtKr(calc.downPayment)}</td>
                      <td className="p-4 text-right font-mono text-slate-900">{fmtKr(carPrice)}</td>
                    </tr>
                    <tr>
                      <td className="p-4 text-slate-600">Total utgift {contractMonths} mån</td>
                      <td className="p-4 text-right font-mono text-slate-900">{fmtKr(calc.totalLeaseCost)}</td>
                      <td className="p-4 text-right font-mono text-slate-900">{fmtKr(calc.loanTotalCost)}</td>
                      <td className="p-4 text-right font-mono text-slate-900">{fmtKr(calc.cashTotalCost)}</td>
                    </tr>
                    <tr>
                      <td className="p-4 text-slate-600">Restvärde efter {contractMonths / 12} år</td>
                      <td className="p-4 text-right text-slate-500">—</td>
                      <td className="p-4 text-right font-mono text-emerald-600">+{fmtKr(calc.residualValue)}</td>
                      <td className="p-4 text-right font-mono text-emerald-600">+{fmtKr(calc.residualValue)}</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-4 font-semibold text-slate-900">Netto förmögenhetsförlust</td>
                      <td className="p-4 text-right font-mono font-bold text-slate-900">{fmtKr(calc.totalLeaseCost)}</td>
                      <td className="p-4 text-right font-mono font-bold text-slate-900">{fmtKr(calc.loanNetWealthLoss)}</td>
                      <td className="p-4 text-right font-mono font-bold text-slate-900">{fmtKr(calc.cashTotalCost)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Verdict badge */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                {calc.loanIsCheapest ? (
                  <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3">
                    <TrendingDown className="h-5 w-5 text-emerald-600" />
                    <span className="text-sm font-medium text-emerald-700">
                      Billån är billigast — {fmtKr(calc.loanNetWealthLoss)} netto över {contractMonths} mån
                    </span>
                  </div>
                ) : calc.leaseIsCheapest ? (
                  <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3">
                    <TrendingDown className="h-5 w-5 text-emerald-600" />
                    <span className="text-sm font-medium text-emerald-700">
                      Privatleasing är billigast — {fmtKr(calc.totalLeaseCost)} över {contractMonths} mån
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-3">
                    <Info className="h-5 w-5 text-amber-600" />
                    <span className="text-sm font-medium text-amber-700">
                      Kontantköp har lägst netto — men binder {fmtKr(carPrice)} kapital
                    </span>
                  </div>
                )}
              </div>

              {/* Affiliate CTA: Loan comparison */}
              {calc.loanIsCheapest && (
                <div className="mt-6 max-w-2xl mx-auto rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-white p-6 text-center">
                  <p className="text-sm font-medium text-indigo-700 mb-3">
                    Billån visar lägre total {contractMonths / 2}-årskostnad än leasing
                  </p>
                  <a
                    href="https://www.sambla.se"
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
                  >
                    Jämför över 30 långivare — Hitta lägsta billåneräntan
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              )}

              {/* Affiliate CTA: Insurance in comparison */}
              {insurance > 0 && (
                <div className="mt-4 max-w-2xl mx-auto rounded-xl border border-indigo-100 bg-indigo-50/50 p-4 text-center">
                  <a
                    href="https://www.compricer.se"
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 hover:text-indigo-800 transition-colors"
                  >
                    Jämför bilförsäkring &amp; spara upp till 3 000 kr/år hos Compricer
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              )}
            </div>

            {/* Cross-links */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <CrossLinkCard
                href="https://www.milkostnadskalkylen.se"
                title="Milkostnadskalkylen"
                desc="Räkna ut din totala milkostnad inklusive drivmedel"
              />
              <CrossLinkCard
                href="https://www.formansbilskalkylen.se"
                title="Förmånsbilskalkylen"
                desc="Funderar du på förmånsbil via jobbet istället? Se förmånsvärde"
              />
              <CrossLinkCard
                href="https://www.reseavdragskalkylen.se"
                title="Reseavdragskalkylen"
                desc="Gör skatteavdrag för resor till och från arbetet"
              />
            </div>

            {/* Transparency declaration */}
            <div className="mt-8 text-center">
              <p className="text-xs text-slate-500 max-w-2xl mx-auto">
                Sidan innehåller samarbetslänkar. Kalkylatorn är helt oberoende och
                kostnadsfri.
              </p>
            </div>
          </div>
        </section>

        {/* ===== COMPARISON/GUIDE ===== */}
        <ComparisonSection />

        {/* ===== DOLDA FALLOR ===== */}
        <CalculatorLogicSection />

        {/* ===== FAQ ===== */}
        <FaqSection />
      </main>

      {/* ===== MOBILE STICKY BAR ===== */}
      {showSticky && (
        <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden animate-slide-up">
          <div className="bg-white border-t border-slate-200 shadow-lg px-4 py-3 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs text-slate-500 truncate">
                Verklig leasingkostnad
              </p>
              <p className="text-lg font-bold text-emerald-600 font-mono leading-tight">
                {fmtKr(calc.totalLeaseMonthly)}<span className="text-xs text-slate-400 font-sans">/mån</span>
              </p>
              <p className="text-xs text-slate-400 truncate">
                Annonserat: {fmtKr(calc.advertisedMonthly)}
              </p>
            </div>
            <Button
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 text-white shrink-0"
              asChild
            >
              <a href="#jamforelse">
                Jämför med billån
                <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </Button>
          </div>
        </div>
      )}

      <SiteFooter />
    </>
  );
}

// ===== Helper Components =====

function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  suffix: string;
}) {
  return (
    <div>
      <label className="flex items-center justify-between text-sm font-medium text-slate-700 mb-2">
        <span>{label}</span>
        <span className="text-emerald-600 font-semibold font-mono">
          {fmt(value)} {suffix}
        </span>
      </label>
      <div className="flex items-center gap-3">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 h-2 rounded-full appearance-none cursor-pointer bg-slate-200 accent-emerald-600"
        />
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-20 rounded-lg border border-slate-200 px-2 py-1.5 text-sm text-slate-900 text-right focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>
    </div>
  );
}

function ResultRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: 'red' | 'green';
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-600">{label}</span>
      <span
        className={`font-mono font-medium ${
          highlight === 'red'
            ? 'text-red-600'
            : highlight === 'green'
            ? 'text-emerald-600'
            : 'text-slate-900'
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function CrossLinkCard({
  href,
  title,
  desc,
}: {
  href: string;
  title: string;
  desc: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl border border-slate-200 bg-white p-5 hover:border-emerald-300 hover:shadow-sm transition-all"
    >
      <div className="flex items-center gap-2 mb-2">
        <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
        <span className="text-sm font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">
          {title}
        </span>
      </div>
      <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
    </a>
  );
}
