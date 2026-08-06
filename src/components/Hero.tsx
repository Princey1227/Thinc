import React from 'react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] w-full flex items-center justify-start overflow-hidden bg-[#050608] pt-20 sm:pt-24 pb-8">
      {/* 1. Background Studio Image (White Tee Campaign Photo) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/images/thinc_hero_studio_white.png"
          alt="THINC Denim Collection Campaign"
          className="w-full h-full object-cover object-[65%_center] filter contrast-110 brightness-95 saturate-105"
        />
        
        {/* 2. Precise Dark Studio Gradient Overlay */}
        <div
          className="absolute inset-0 z-1"
          style={{
            background: 'linear-gradient(90deg, rgba(5,7,10,0.88) 0%, rgba(5,7,10,0.65) 50%, rgba(5,7,10,0.25) 100%)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-transparent opacity-90" />
      </div>

      {/* 3. Text Container - Perfectly Aligned Vertically on Mobile & Desktop */}
      <div className="relative z-10 w-full pl-6 sm:pl-16 md:pl-24 lg:pl-[150px] pr-6 mt-4 sm:mt-8">
        <div className="max-w-[540px] text-left flex flex-col items-start">
          
          {/* Eyebrow Text: THINC DENIM */}
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="block uppercase font-sans font-semibold mb-3 sm:mb-[20px] text-xs sm:text-base text-[#C8A46A] tracking-[4px] sm:tracking-[6px]"
          >
            THINC DENIM
          </motion.span>

          {/* Main Heading: DENIM COLLECTION */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-serif font-medium text-white mb-4 sm:mb-[28px] tracking-[-1px] sm:tracking-[-2px] leading-[0.92] text-4xl sm:text-6xl md:text-7xl lg:text-[88px]"
          >
            DENIM <br />
            COLLECTION
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-sans text-[#E2E8F0] font-normal leading-[1.6] mb-6 sm:mb-[32px] max-w-[480px] text-sm sm:text-lg md:text-[20px]"
          >
            <strong className="font-semibold text-white">Crafted by three generations of pattern masters.</strong>{' '}
            Zero-synthetic, 100% organic cotton Indian denim built to last decades.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <a
              href="#collection"
              className="inline-flex items-center justify-center px-8 sm:px-10 h-[50px] sm:h-[56px] rounded-full bg-white text-[#050608] font-sans font-medium text-xs sm:text-base tracking-[0.05em] hover:bg-[#F1F5F9] transition-all duration-300 shadow-xl hover:scale-105 active:scale-95"
            >
              SHOP NOW →
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
