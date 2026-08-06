import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, ShieldCheck } from 'lucide-react';

export const FadeEvolutionGallery: React.FC = () => {
  const [activeStage, setActiveStage] = useState<0 | 1 | 2>(0);

  const stages = [
    {
      day: "Day 1",
      title: "Raw Rigid Perfection",
      subtitle: "Unwashed & Unbroken",
      image: "/images/thinc_jean_straight_1785955777595.png",
      description: "Rigid, deep indigo structure straight from our atelier. Crisp crease lines and heavy weight that begin molding to your body within hours of wear."
    },
    {
      day: "Day 180",
      title: "Natural Honeycombs & Whiskering",
      subtitle: "6 Months of Wear",
      image: "/images/thinc_macro_selvage_1785955846444.png",
      description: "Subtle indigo shedding reveals white core threads along knee creases (honeycombs) and lap folds (whiskers). The denim softens while keeping structure."
    },
    {
      day: "Day 365",
      title: "High-Contrast Electric Blue Fades",
      subtitle: "1 Year Personal Evolution",
      image: "/images/thinc_jean_tapered_1785955795434.png",
      description: "Stunning high-contrast electric blue contrast fades unique to your lifestyle. No two pairs ever age the same — making your THINC jean truly personal."
    }
  ];

  const current = stages[activeStage];

  return (
    <section className="py-16 md:py-20 bg-[#FAF8F5] border-t border-gray-200/80 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase font-mono tracking-[0.3em] text-[#1E3A8A] font-bold mb-2 block flex items-center justify-center gap-2">
            <Sparkles size={14} className="text-amber-500" /> Denim Fade Story
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0F172A] tracking-wide mb-4">
            Built to Age With You
          </h2>
          <p className="text-sm text-slate-600 font-light leading-relaxed">
            Raw denim is a living fabric. Explore how THINC organic denim evolves from Day 1 to Day 365.
          </p>
        </div>

        {/* Timeline Stage Switcher */}
        <div className="flex justify-center gap-3 mb-10">
          {stages.map((stage, idx) => (
            <button
              key={stage.day}
              onClick={() => setActiveStage(idx as any)}
              className={`px-6 py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all border ${
                activeStage === idx
                  ? 'bg-red-600 text-white border-red-600 shadow-md scale-105'
                  : 'bg-white text-slate-600 border-gray-200 hover:text-black hover:border-gray-400 shadow-sm'
              }`}
            >
              {stage.day}
            </button>
          ))}
        </div>

        {/* Active Stage Card */}
        <div className="grid lg:grid-cols-12 gap-10 items-center crisp-panel p-8 md:p-12 rounded-3xl">
          <div className="lg:col-span-6 relative h-[420px] rounded-2xl overflow-hidden shadow-sm border border-gray-200">
            <motion.img
              key={current.day}
              src={current.image}
              alt={current.title}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="px-3 py-1 bg-white/90 text-[#0F172A] font-mono text-xs uppercase font-bold tracking-widest rounded shadow-sm">
                <Calendar size={12} className="inline mr-1 text-red-600" /> {current.day} • {current.subtitle}
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold block mb-1">
                {current.day} Stage Evolution
              </span>
              <h3 className="text-3xl font-serif font-bold text-[#0F172A] mb-3">{current.title}</h3>
              <p className="text-sm text-slate-600 font-light leading-relaxed">{current.description}</p>
            </div>

            <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl space-y-2 text-xs font-mono">
              <p className="text-[#0F172A] font-bold flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-emerald-600" /> Why THINC Fades Superior
              </p>
              <p className="text-slate-600">
                14-dip organic indigo coats only yarn exteriors, allowing white cotton core exposure during natural friction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
