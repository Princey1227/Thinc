import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, X, Heart } from 'lucide-react';

export const InstagramLightbox: React.FC = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const posts = [
    { src: "/images/thinc_hero_denim_1785955764023.png", handle: "@thinc.raw_tokyo", likes: "2,420" },
    { src: "/images/thinc_jean_straight_1785955777595.png", handle: "@atelier_thinc", likes: "3,890" },
    { src: "/images/thinc_jean_tapered_1785955795434.png", handle: "@thinc_selvage_journal", likes: "4,110" },
    { src: "/images/thinc_jean_onyx_1785955816324.png", handle: "@thinc_street_okayama", likes: "1,980" },
    { src: "/images/thinc_macro_selvage_1785955846444.png", handle: "@thinc_denim_couture", likes: "5,500" },
    { src: "/images/thinc_hero_denim_1785955764023.png", handle: "@thinc.denim", likes: "6,120" }
  ];

  return (
    <section className="py-16 md:py-20 bg-[#FAF8F5] border-t border-gray-200/80 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-mono tracking-[0.3em] text-[#1E3A8A] font-bold mb-2 block flex items-center justify-center gap-2">
            <Instagram size={15} /> @thinc.denim
          </span>
          <h2 className="text-4xl font-serif font-bold text-[#0F172A]">THINC Denim Purists</h2>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {posts.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelectedImg(p.src)}
              className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group border border-gray-200 shadow-sm"
            >
              <img src={p.src} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 text-white">
                <span className="text-[11px] font-mono font-bold">{p.handle}</span>
                <span className="text-[10px] text-slate-200 flex items-center gap-1">
                  <Heart size={10} fill="currentColor" className="text-red-500" /> {p.likes}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <div className="relative max-w-2xl max-h-[85vh] rounded-2xl overflow-hidden border border-gray-200 shadow-2xl">
              <button
                onClick={() => setSelectedImg(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/70 text-white flex items-center justify-center"
              >
                <X size={20} />
              </button>
              <img src={selectedImg} alt="" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
