import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FIT_SILHOUETTES, FitSilhouette } from '../data/products';
import { Ruler, Check, ArrowRight } from 'lucide-react';

export const FitStudio: React.FC = () => {
  const [selectedFit, setSelectedFit] = useState<FitSilhouette>(FIT_SILHOUETTES[0]);

  return (
    <section id="fit-studio" className="py-16 md:py-20 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase font-mono tracking-[0.3em] text-[#1E3A8A] font-bold mb-2 block">
            Silhouette & Fit Engineering
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0F172A] tracking-wide mb-3">
            The Atelier Fit Studio
          </h2>
          <p className="text-sm text-slate-600 font-light leading-relaxed">
            Pattern-engineered for Indian body proportions. Compare rise, taper ratio, leg opening, and denim weight.
          </p>
        </div>

        {/* Fit Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {FIT_SILHOUETTES.map((fit) => (
            <button
              key={fit.id}
              onClick={() => setSelectedFit(fit)}
              className={`px-5 py-3 rounded-xl text-xs font-semibold uppercase tracking-[0.15em] transition-all flex items-center gap-2 border ${
                selectedFit.id === fit.id
                  ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-md scale-105 font-bold'
                  : 'bg-white text-slate-600 border-gray-200 hover:border-gray-400 hover:text-black shadow-sm'
              }`}
            >
              {fit.name}
              {selectedFit.id === fit.id && <Check size={14} className="text-white" />}
            </button>
          ))}
        </div>

        {/* Selected Fit Interactive Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedFit.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-12 gap-10 items-center crisp-panel p-8 md:p-10 rounded-3xl"
          >
            {/* Fit Image View */}
            <div className="lg:col-span-6 relative h-[420px] rounded-2xl overflow-hidden group shadow-sm border border-gray-200">
              <img
                src={selectedFit.image}
                alt={selectedFit.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded text-[11px] font-mono text-[#0F172A] uppercase font-bold tracking-wider shadow-sm">
                  {selectedFit.name}
                </span>
              </div>
            </div>

            {/* Spec Matrix */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div>
                <p className="text-xs uppercase font-mono tracking-widest text-red-600 font-bold mb-2">{selectedFit.tagline}</p>
                <h3 className="text-3xl font-serif font-bold text-[#0F172A] mb-3">{selectedFit.name}</h3>
                <p className="text-sm text-slate-600 font-light leading-relaxed">{selectedFit.description}</p>
              </div>

              {/* Measurement Specs Table */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <p className="text-[11px] font-mono uppercase text-slate-500 mb-1 flex items-center gap-1.5">
                    <Ruler size={13} className="text-[#1E3A8A]" /> Leg Opening Width
                  </p>
                  <p className="text-base font-bold text-[#0F172A] font-serif">{selectedFit.legOpening}</p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <p className="text-[11px] font-mono uppercase text-slate-500 mb-1">Thigh & Seat Contour</p>
                  <p className="text-base font-bold text-[#0F172A] font-serif">{selectedFit.thighFit}</p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <p className="text-[11px] font-mono uppercase text-slate-500 mb-1">Waist Rise Position</p>
                  <p className="text-base font-bold text-[#0F172A] font-serif">{selectedFit.rise}</p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <p className="text-[11px] font-mono uppercase text-slate-500 mb-1">Recommended Fabric</p>
                  <p className="text-base font-bold text-amber-600 font-serif">{selectedFit.recommendedWeight}</p>
                </div>
              </div>

              <a
                href="#collection"
                className="mt-2 py-4 px-8 bg-[#0F172A] hover:bg-slate-800 text-white text-xs uppercase tracking-[0.2em] font-bold rounded-xl transition-all text-center flex items-center justify-center gap-2 group shadow-sm"
              >
                Shop {selectedFit.name}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
