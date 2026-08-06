import React from 'react';
import { Award, MapPin, Globe, Phone, Users, ShieldCheck, Quote } from 'lucide-react';

export const AboutUsStoryline: React.FC = () => {
  return (
    <section id="about-us" className="py-8 md:py-10 bg-[#FAF8F5] border-t border-gray-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-mono tracking-[0.3em] text-red-600 font-bold mb-3 block flex items-center justify-center gap-2">
            <Award size={15} className="text-amber-500" /> Established 1996 • Mumbai, India
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0F172A] tracking-wide mb-4">
            The Story of Punit Creations
          </h2>
          <p className="text-base text-slate-600 font-light leading-relaxed">
            Founded by <strong className="text-[#0F172A]">Manoj Agrawal</strong> in 1996 — Three decades of mastery in woven fabrics, garment manufacturing, and pure denim engineering.
          </p>
        </div>

        {/* Founder Story & Editorial Portrait Layout */}
        <div className="grid lg:grid-cols-12 gap-12 items-center crisp-panel p-8 md:p-14 rounded-3xl mb-16">
          {/* Left Column: Founder Photo Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
              <img
                src="/images/punit_creations_founder.png"
                alt="Manoj Agrawal - Founder & Managing Director, Punit Creations"
                className="w-full h-[450px] object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="px-3 py-1 bg-red-600 font-mono text-[10px] font-bold uppercase tracking-widest rounded shadow-sm mb-2 inline-block">
                  Founder & Managing Director
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">Manoj Agrawal</h3>
                <p className="text-xs font-mono text-amber-300 mt-1 font-semibold">Founder, Punit Creations (Est. 1996)</p>
              </div>
            </div>

            {/* Decorative Heritage Badge */}
            <div className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-3 p-4 bg-[#0F172A] text-white rounded-2xl border border-gray-700 shadow-2xl">
              <Award className="text-amber-400 flex-shrink-0" size={32} />
              <div>
                <p className="text-xs font-mono font-bold uppercase text-white">Premier Woven Manufacturer</p>
                <p className="text-[10px] text-slate-400 font-mono">Led by Manoj Agrawal</p>
              </div>
            </div>
          </div>

          {/* Right Column: Founder Narrative & Credentials */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-indigo-900 font-bold block mb-2">
                Leadership & Vision
              </span>
              <h3 className="text-3xl font-serif font-bold text-[#0F172A] mb-4">
                Pioneering Woven Apparel & Denim Manufacturing Since 1996
              </h3>
              
              {/* Founder Quote Card */}
              <div className="p-5 bg-gray-50 border-l-4 border-red-600 rounded-r-2xl mb-5 shadow-sm">
                <Quote size={20} className="text-red-600 mb-2" />
                <p className="text-sm font-serif italic text-slate-800 leading-relaxed mb-2">
                  "When we established Punit Creations in 1996, our vision was simple — to engineer woven fabrics and garments that stand the test of time through uncompromising craftsmanship."
                </p>
                <p className="text-xs font-mono font-bold text-[#0F172A] uppercase">
                  — Manoj Agrawal, Founder & MD
                </p>
              </div>

              <p className="text-sm text-slate-700 font-light leading-relaxed mb-4">
                Under the leadership of <strong className="text-[#0F172A] font-semibold">Manoj Agrawal</strong>, Punit Creations has operated out of Mumbai, Maharashtra for nearly 30 years. Today, the atelier specializes in premium woven apparel, organic ring-spun cotton, and heavy organic Indian denim.
              </p>
            </div>

            {/* Company Spec Checklist Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-start gap-3">
                <MapPin className="text-red-600 flex-shrink-0 mt-0.5" size={18} />
                <div>
                  <h4 className="text-xs font-mono font-bold text-[#0F172A] uppercase">Headquarters</h4>
                  <p className="text-xs text-slate-600">Mumbai, Maharashtra, India</p>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-start gap-3">
                <Users className="text-indigo-900 flex-shrink-0 mt-0.5" size={18} />
                <div>
                  <h4 className="text-xs font-mono font-bold text-[#0F172A] uppercase">Company Scale</h4>
                  <p className="text-xs text-slate-600">11-50 Core Team • 70+ Artisans</p>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-start gap-3">
                <Globe className="text-emerald-600 flex-shrink-0 mt-0.5" size={18} />
                <div>
                  <h4 className="text-xs font-mono font-bold text-[#0F172A] uppercase">Official Portal</h4>
                  <a href="http://www.punitcreations.in" target="_blank" rel="noreferrer" className="text-xs text-red-600 font-bold hover:underline">
                    www.punitcreations.in
                  </a>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-start gap-3">
                <Phone className="text-amber-600 flex-shrink-0 mt-0.5" size={18} />
                <div>
                  <h4 className="text-xs font-mono font-bold text-[#0F172A] uppercase">Headquarters Tel</h4>
                  <p className="text-xs text-slate-600 font-mono">+91 (022) 40518000</p>
                </div>
              </div>
            </div>

            {/* Quality Promise */}
            <div className="p-4 bg-[#0F172A] text-white rounded-xl border border-gray-800 flex items-center gap-3">
              <ShieldCheck className="text-emerald-400 flex-shrink-0" size={24} />
              <p className="text-xs text-slate-300">
                <strong className="text-white">Direct Atelier Manufacturing:</strong> Every THINC garment is manufactured under the direct supervision of Manoj Agrawal and master craftsmen at Punit Creations facilities in Mumbai.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
