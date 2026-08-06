import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-start overflow-hidden bg-[#0F172A] pt-24 pb-12">
      {/* 1. Cinematic Full-Height Backdrop: Denim Occupies Visual Focus (100vh) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          src="/images/thinc_hero_denim_1785955764023.png"
          alt="THINC Raw Selvedge Denim Craftsmanship"
          initial={{ scale: 1 }}
          animate={{ scale: 1.03 }}
          transition={{ duration: 14, ease: "easeOut" }}
          className="w-full h-full object-cover filter contrast-110 brightness-95 saturate-105"
        />
        {/* Soft Editorial Shadow for Left-Aligned Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent" />
      </div>

      {/* Asymmetrical Left-Aligned Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 w-full">
        <div className="max-w-xl text-left flex flex-col items-start">
          {/* Brand Name */}
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif font-extrabold text-sm md:text-base tracking-[0.35em] text-amber-300 uppercase mb-4"
          >
            THINC DENIM
          </motion.span>

          {/* Collection Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-[1.08] mb-6 drop-shadow-lg"
          >
            RAW SELVEDGE<br />COLLECTION
          </motion.h1>

          {/* Storytelling Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="space-y-1.5 text-base sm:text-lg font-sans text-slate-200 font-light leading-relaxed mb-8 drop-shadow"
          >
            <p className="font-medium text-white">Crafted by three generations of denim makers.</p>
            <p className="text-slate-300">Heavyweight fabrics that age beautifully with every wear.</p>
          </motion.div>

          {/* Single Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="mb-14"
          >
            <a
              href="#collection"
              className="px-9 py-4 bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-[0.25em] rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 inline-flex items-center gap-3 group border border-red-400/30"
            >
              SHOP NOW
              <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Understated Bottom Trust Strip */}
      <div className="absolute bottom-0 inset-x-0 z-20 py-4 bg-black/60 backdrop-blur-md border-t border-white/10 text-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <span className="text-slate-300 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            40 Years Manufacturing
          </span>
          <span className="text-slate-500 hidden sm:inline">•</span>
          <span className="text-slate-300 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Lifetime Free Repair Guarantee
          </span>
          <span className="text-slate-500 hidden sm:inline">•</span>
          <span className="text-slate-300 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Free Express Shipping Across India
          </span>
          <span className="text-slate-500 hidden sm:inline">•</span>
          <span className="text-slate-300 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Crafted by Three Generations
          </span>
        </div>
      </div>
    </section>
  );
};
