import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LOOKBOOK_SLIDES, Product, PRODUCTS } from '../data/products';
import { ShoppingBag, ChevronLeft, ChevronRight, Tag } from 'lucide-react';

interface LookbookHotspotsProps {
  onSelectProduct: (product: Product) => void;
}

export const LookbookHotspots: React.FC<LookbookHotspotsProps> = ({ onSelectProduct }) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);

  const currentSlide = LOOKBOOK_SLIDES[activeSlideIndex];

  const handleNext = () => {
    setActiveSlideIndex((prev) => (prev + 1) % LOOKBOOK_SLIDES.length);
    setActiveHotspotId(null);
  };

  const handlePrev = () => {
    setActiveSlideIndex((prev) => (prev - 1 + LOOKBOOK_SLIDES.length) % LOOKBOOK_SLIDES.length);
    setActiveHotspotId(null);
  };

  return (
    <section id="lookbook" className="py-16 md:py-20 bg-[#FAF8F5] border-t border-gray-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-xs uppercase font-mono tracking-[0.3em] text-red-600 font-bold mb-2 block">
              Editorial Campaign Lookbook
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0F172A] tracking-wide">
              Interactive Lookbook
            </h2>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-gray-300 bg-white hover:bg-gray-100 flex items-center justify-center text-[#0F172A] shadow-sm transition-all"
              title="Previous Look"
            >
              <ChevronLeft size={22} />
            </button>
            <span className="text-xs font-mono text-slate-500">
              0{activeSlideIndex + 1} / 0{LOOKBOOK_SLIDES.length}
            </span>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-gray-300 bg-white hover:bg-gray-100 flex items-center justify-center text-[#0F172A] shadow-sm transition-all"
              title="Next Look"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* Interactive Image Slide Viewport */}
        <div className="relative h-[550px] md:h-[620px] rounded-3xl overflow-hidden border border-gray-200 shadow-md group">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentSlide.id}
              src={currentSlide.image}
              alt={currentSlide.title}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

          {/* Hotspot Pins */}
          {currentSlide.hotspots.map((hs) => {
            const product = PRODUCTS.find((p) => p.id === hs.productId);
            const isOpen = activeHotspotId === hs.id;

            return (
              <div
                key={hs.id}
                className="absolute z-20"
                style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
              >
                {/* Hotspot Pulsing Button */}
                <button
                  onClick={() => setActiveHotspotId(isOpen ? null : hs.id)}
                  className="relative group/pin flex items-center justify-center"
                >
                  <span className="w-8 h-8 rounded-full bg-red-600/80 animate-ping absolute" />
                  <span className="w-6 h-6 rounded-full bg-white text-[#0F172A] font-bold text-xs flex items-center justify-center shadow-lg border border-red-600">
                    <Tag size={12} />
                  </span>
                </button>

                {/* Hotspot Popover Card */}
                <AnimatePresence>
                  {isOpen && product && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      className="absolute left-1/2 -translate-x-1/2 bottom-10 w-64 bg-white p-4 rounded-xl border border-gray-200 shadow-2xl z-30 flex flex-col gap-3"
                    >
                      <div className="flex gap-3">
                        <img src={product.images[0]} alt={product.name} className="w-14 h-14 object-cover rounded-lg" />
                        <div>
                          <p className="text-xs font-bold text-[#0F172A] leading-snug">{product.name}</p>
                          <p className="text-[11px] text-slate-500 font-mono mt-1">₹{product.price.toLocaleString()}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => onSelectProduct(product)}
                        className="w-full py-2 bg-[#0F172A] text-white text-[11px] font-semibold uppercase tracking-wider rounded transition-all hover:bg-slate-800 flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag size={12} /> Inspect & Order
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {/* Slide Footer Information */}
          <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end text-white">
            <div>
              <span className="text-xs font-mono text-slate-300 uppercase tracking-widest block mb-1">
                {currentSlide.season}
              </span>
              <h3 className="text-2xl md:text-3xl font-serif font-bold">{currentSlide.title}</h3>
            </div>
            <span className="text-xs font-mono text-slate-300 hidden sm:block">
              Click pins to inspect items worn on campaign
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
