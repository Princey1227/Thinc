import React from 'react';
import { ShieldCheck, CheckCircle2, XCircle, Award, Truck, RefreshCw } from 'lucide-react';

export const TrustStoryline: React.FC = () => {
  const comparison = [
    {
      feature: "Fabric & Weight",
      ordinary: "Thin 9-11oz Poly-Stretch Blend",
      thinc: "14.5oz - 18oz Pure Organic Selvage",
      advantage: "Heavyweight structural drape that ages gracefully"
    },
    {
      feature: "Hardware & Rivets",
      ordinary: "Mass-produced Zinc Zipper",
      thinc: "Solid Copper Rivets & Brass Button Fly",
      advantage: "Unbreakable construction under tension"
    },
    {
      feature: "Lifespan & Fading",
      ordinary: "Fades dull in 6-12 months",
      thinc: "5-10+ Years of High-Contrast Fades",
      advantage: "Molds uniquely to your body over time"
    },
    {
      feature: "Atelier Guarantee",
      ordinary: "No warranty after 30 days",
      thinc: "Lifetime Free Repair & Re-stitching",
      advantage: "Complimentary repair service for life"
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-[#FAF8F5] border-t border-gray-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Quick Trust Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 crisp-panel rounded-2xl mb-14 text-center">
          <div className="flex flex-col items-center">
            <Award className="text-red-600 mb-2" size={24} />
            <h4 className="text-sm font-bold text-[#0F172A] font-mono uppercase">40 Years Expertise</h4>
            <p className="text-xs text-slate-500 font-light">Denim manufacturing legacy</p>
          </div>

          <div className="flex flex-col items-center">
            <ShieldCheck className="text-indigo-900 mb-2" size={24} />
            <h4 className="text-sm font-bold text-[#0F172A] font-mono uppercase">Lifetime Repair</h4>
            <p className="text-xs text-slate-500 font-light">Free restitching guarantee</p>
          </div>

          <div className="flex flex-col items-center">
            <Truck className="text-emerald-600 mb-2" size={24} />
            <h4 className="text-sm font-bold text-[#0F172A] font-mono uppercase">Free Express Shipping</h4>
            <p className="text-xs text-slate-500 font-light">Across India on ₹3000+</p>
          </div>

          <div className="flex flex-col items-center">
            <RefreshCw className="text-amber-600 mb-2" size={24} />
            <h4 className="text-sm font-bold text-[#0F172A] font-mono uppercase">14-Day Free Exchange</h4>
            <p className="text-xs text-slate-500 font-light">Hassle-free size swaps</p>
          </div>
        </div>

        {/* Storyline & Why ₹4999 */}
        <div className="grid lg:grid-cols-12 gap-10 items-center mb-14">
          <div className="lg:col-span-6">
            <span className="text-xs uppercase font-mono tracking-[0.3em] text-red-600 font-bold mb-3 block">
              Direct From Atelier
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#0F172A] tracking-wide mb-6">
              40 Years of Denim Craft. Delivered Direct to You.
            </h2>
            <p className="text-sm text-slate-700 font-light leading-relaxed mb-6">
              For four decades, our artisans have crafted raw selvage denim for international luxury houses. By cutting out middleman markups, we deliver ₹12,000-grade raw denim directly to Indian denim purists for ₹4,999.
            </p>
            
            <div className="flex flex-col gap-3 font-mono text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600" />
                <span>100% Organic Ring-Spun Long-Staple Cotton</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600" />
                <span>Traditional Low-Tension Shuttle Loom Weaving</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600" />
                <span>Zero Chemical Mass Washing • Pure Organic Indigo</span>
              </div>
            </div>
          </div>

          {/* Transparent Price Breakdown Card */}
          <div className="lg:col-span-6">
            <div className="crisp-panel p-8 rounded-3xl relative">
              <span className="px-3 py-1 bg-[#0F172A] text-white font-mono text-[10px] uppercase font-bold tracking-widest rounded absolute top-6 right-6">
                Transparent Value
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#0F172A] mb-2">Why ₹4,999?</h3>
              <p className="text-xs text-slate-500 mb-6 font-mono">Traditional Retail vs THINC Direct-to-Consumer</p>

              <div className="space-y-4 font-mono text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200 text-slate-600">
                  <span>Traditional Retail Store Price</span>
                  <span className="line-through text-red-600 font-bold">₹12,500</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-200 text-slate-600">
                  <span>Retail Store Rent & Distributor Margin</span>
                  <span className="text-red-600">-₹5,500 Markup</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-200 text-slate-600">
                  <span>Brand Celebrity Endorsement Markup</span>
                  <span className="text-red-600">-₹2,000 Markup</span>
                </div>
                <div className="flex justify-between items-center pt-2 text-sm font-bold text-[#0F172A]">
                  <span>THINC Atelier Direct Price</span>
                  <span className="text-emerald-700 text-lg">₹4,999</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ordinary Jeans vs THINC Comparison Matrix */}
        <div className="crisp-panel p-8 md:p-10 rounded-3xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase font-mono tracking-[0.3em] text-indigo-900 font-bold mb-2 block">
              The Quality Benchmark
            </span>
            <h3 className="text-3xl font-serif font-bold text-[#0F172A]">Ordinary Jeans vs. THINC Raw Selvage</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-xs font-mono uppercase text-slate-500">
                  <th className="py-4 px-4">Feature</th>
                  <th className="py-4 px-4 text-slate-400">Ordinary Mall Jeans</th>
                  <th className="py-4 px-4 text-[#0F172A] font-bold">THINC Raw Selvage</th>
                  <th className="py-4 px-4 text-indigo-900">Your Advantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs font-mono">
                {comparison.map((c, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 font-bold text-[#0F172A]">{c.feature}</td>
                    <td className="py-4 px-4 text-slate-500 flex items-center gap-1.5">
                      <XCircle size={14} className="text-red-500 flex-shrink-0" />
                      <span>{c.ordinary}</span>
                    </td>
                    <td className="py-4 px-4 text-emerald-700 font-bold flex items-center gap-1.5">
                      <CheckCircle2 size={14} className="text-emerald-600 flex-shrink-0" />
                      <span>{c.thinc}</span>
                    </td>
                    <td className="py-4 px-4 text-slate-700 font-light">{c.advantage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
