import React, { useState } from 'react';
import { Feather, Cpu, Droplets, Hammer } from 'lucide-react';

export const AtelierCraftsmanship: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "1. Premium Cotton Selection",
      sub: "Handpicked Long-Staple Cotton",
      icon: Feather,
      image: "/images/thinc_hero_denim_1785955764023.png",
      desc: "Every THINC jean begins with 100% long-staple organic cotton, chosen for exceptional strength, breathability, and natural slub texture."
    },
    {
      title: "2. Precision Shuttle Weaving",
      sub: "Authentic Selvage Loom",
      icon: Cpu,
      image: "/images/thinc_macro_selvage_1785955846444.png",
      desc: "Woven at low tension to create an uncut selvage edge. This traditional weave ensures your denim holds shape while molding naturally to your body."
    },
    {
      title: "3. Deep Indigo Vatting",
      sub: "Natural Organic Indigo",
      icon: Droplets,
      image: "/images/thinc_jean_straight_1785955777595.png",
      desc: "Rope-dyed multiple times in pure indigo. The color penetrates deep into the yarn while leaving a white core that creates rich contrast fades over time."
    },
    {
      title: "4. Hand-Finished Hardware",
      sub: "Atelier Artisans",
      icon: Hammer,
      image: "/images/thinc_jean_onyx_1785955816324.png",
      desc: "Finished by hand with solid copper rivets, reinforced stress stitching, and genuine leather waist patches stamped with batch details."
    }
  ];

  const current = steps[activeStep];

  return (
    <section id="craftsmanship" className="py-16 md:py-20 bg-[#FAF8F5] border-t border-gray-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase font-mono tracking-[0.3em] text-red-600 font-bold mb-2 block">
            Crafted In India
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0F172A] tracking-wide mb-3">
            The Art of Raw Denim
          </h2>
          <p className="text-sm text-slate-600 font-light leading-relaxed">
            Restraint is the highest form of luxury. Explore the four pillars behind every pair of THINC jeans.
          </p>
        </div>

        {/* Stepper Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isActive = activeStep === idx;

            return (
              <button
                key={s.title}
                onClick={() => setActiveStep(idx)}
                className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between h-36 ${
                  isActive
                    ? 'bg-white border-red-600 shadow-md'
                    : 'bg-white/60 border-gray-200 hover:border-gray-400'
                }`}
              >
                <div className="flex justify-between items-start">
                  <Icon size={20} className={isActive ? 'text-red-600' : 'text-slate-400'} />
                  <span className="text-xs font-mono text-slate-400">0{idx + 1}</span>
                </div>
                <div>
                  <p className="text-xs font-mono text-slate-500 uppercase">{s.sub}</p>
                  <p className={`text-sm font-serif font-bold ${isActive ? 'text-[#0F172A]' : 'text-slate-700'}`}>
                    {s.title.split('. ')[1]}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Showcase */}
        <div className="grid lg:grid-cols-12 gap-10 items-center crisp-panel p-8 md:p-12 rounded-3xl">
          <div className="lg:col-span-6 relative h-[380px] rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <img
              src={current.image}
              alt={current.title}
              className="w-full h-full object-cover filter contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="px-3 py-1 bg-red-600 text-white font-mono text-xs uppercase font-bold tracking-widest rounded shadow-sm">
                Phase 0{activeStep + 1} • {current.sub}
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col gap-6">
            <h3 className="text-3xl font-serif font-bold text-[#0F172A]">{current.title}</h3>
            <p className="text-base text-slate-700 font-light leading-relaxed">{current.desc}</p>
            <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl">
              <p className="text-xs font-mono text-amber-700 font-bold uppercase mb-1">
                THINC Quality Guarantee
              </p>
              <p className="text-xs text-slate-600">
                Crafted to last for years of wear. Free lifetime re-stitching and repairs at the THINC atelier.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
