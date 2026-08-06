import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ZoomIn, Eye, Layers, Shield } from 'lucide-react';

export const DenimInspector: React.FC = () => {
  const [activePreset, setActivePreset] = useState<'weave' | 'selvage' | 'rivet'>('weave');
  const [loupePos, setLoupePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const presets = {
    weave: {
      name: "14.5oz Raw Selvage Weave",
      image: "/images/thinc_macro_selvage_1785955846444.png",
      headline: "Pure Long-Staple Cotton",
      description: "Low-tension weaving creates a rich slub texture that fades into crisp electric blue honeycombs over years of wear.",
      tag: "Raw Denim Weave",
      specs: ["14.5 oz/sq.yd Heavyweight", "100% Organic Ring-Spun Cotton", "Deep Indigo Dip"]
    },
    selvage: {
      name: "Crimson Selvage Ticking ID",
      image: "/images/thinc_jean_straight_1785955777595.png",
      headline: "Authentic Shuttle Edge",
      description: "The signature crimson seam ticker is THINC's mark of authentic Indian denim weaving, preventing unraveling and giving every fold a clean line.",
      tag: "Signature Ticking",
      specs: ["Shuttle Loom Woven", "Self-Edge Anti-Fray Stitch", "Hand-Inspected Edge"]
    },
    rivet: {
      name: "Solid Copper Hardware",
      image: "/images/thinc_jean_onyx_1785955816324.png",
      headline: "Solid Brass & Copper Rivets",
      description: "Custom engraved THINC hardware punched through heavy canvas pocket liners for maximum durability.",
      tag: "Custom Hardware",
      specs: ["Solid Copper Punch Rivets", "Hidden Pocket Back Rivets", "Gunmetal Wash"]
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setLoupePos({ x, y });
  };

  const current = presets[activePreset];

  return (
    <section id="inspector" className="py-8 md:py-10 bg-[#FAF8F5] relative overflow-hidden border-y border-gray-200/80">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase font-mono tracking-[0.3em] text-red-600 font-bold mb-2">
              <ZoomIn size={15} />
              <span>Interactive Fabric Macro Loupe</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0F172A] tracking-wide">
              Inspect Raw Craftsmanship
            </h2>
          </div>

          {/* Preset Selector Buttons */}
          <div className="flex items-center gap-2 p-1.5 bg-white border border-gray-200 rounded-xl self-start md:self-auto shadow-sm">
            {(['weave', 'selvage', 'rivet'] as const).map((key) => (
              <button
                key={key}
                onClick={() => setActivePreset(key)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                  activePreset === key
                    ? 'bg-[#0F172A] text-white shadow-md'
                    : 'text-slate-600 hover:text-black hover:bg-gray-100'
                }`}
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        {/* Loupe Inspector Card Layout */}
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Interactive Loupe Image Viewport */}
          <div className="lg:col-span-7 relative">
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative h-[400px] sm:h-[480px] rounded-2xl overflow-hidden cursor-crosshair border border-gray-200 shadow-md group"
            >
              <img
                src={current.image}
                alt={current.name}
                className="w-full h-full object-cover filter contrast-105"
              />

              {/* Red Selvage Edge Ticking Overlay */}
              <div className="absolute top-0 bottom-0 right-0 w-3 bg-gradient-to-l from-red-600 to-transparent opacity-80" />

              {/* Magnifying Loupe Effect Window */}
              {isHovered && (
                <div
                  className="absolute pointer-events-none w-44 h-44 rounded-full border-2 border-red-600 shadow-xl overflow-hidden transition-transform duration-75 z-20"
                  style={{
                    left: `${loupePos.x}%`,
                    top: `${loupePos.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div
                    className="w-[1000px] h-[1000px] absolute"
                    style={{
                      backgroundImage: `url(${current.image})`,
                      backgroundSize: 'cover',
                      left: `-${loupePos.x * 4}px`,
                      top: `-${loupePos.y * 4}px`,
                    }}
                  />
                  <div className="absolute inset-0 border border-white/40 rounded-full" />
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold uppercase tracking-widest bg-black/80 px-2 py-0.5 text-white rounded">
                    4X MAGNIFICATION
                  </span>
                </div>
              )}

              {/* Hint Overlay */}
              {!isHovered && (
                <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-center pointer-events-none">
                  <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-[#0F172A] text-white text-xs font-mono tracking-widest uppercase animate-pulse shadow-lg">
                    <Eye size={16} className="text-red-500" />
                    Move cursor over fabric to inspect denim texture
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Details & Specs Side Panel */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-6">
            <motion.div
              key={activePreset}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="crisp-panel p-8 rounded-2xl flex flex-col gap-6"
            >
              <div>
                <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-xs font-mono uppercase tracking-widest font-bold rounded mb-3">
                  {current.tag}
                </span>
                <h3 className="text-3xl font-serif font-bold text-[#0F172A] mb-2">{current.name}</h3>
                <p className="text-lg font-serif italic text-slate-700 mb-4">{current.headline}</p>
                <p className="text-sm text-slate-600 font-light leading-relaxed">{current.description}</p>
              </div>

              {/* Spec Checklist */}
              <div className="space-y-3 pt-4 border-t border-gray-100">
                <p className="text-xs uppercase tracking-widest font-bold text-[#0F172A] flex items-center gap-2">
                  <Layers size={14} className="text-indigo-900" /> Technical Specifications
                </p>
                <ul className="space-y-2">
                  {current.specs.map((spec, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs text-slate-700 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Guarantee Badge */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 mt-2">
                <Shield className="text-amber-600 flex-shrink-0" size={20} />
                <p className="text-xs text-slate-700">
                  <strong className="text-[#0F172A]">Lifetime Re-stitching Guarantee:</strong> Bring any THINC jean for complimentary repairs.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
