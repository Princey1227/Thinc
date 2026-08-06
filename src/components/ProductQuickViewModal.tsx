import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../data/products';
import { X, Heart, ShoppingBag, Ruler, Check, Star } from 'lucide-react';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.availableSizes[0]);
  const [added, setAdded] = useState<boolean>(false);

  const handleAdd = () => {
    onAddToCart(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-2xl my-auto grid md:grid-cols-12 max-h-[90vh]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-slate-800 flex items-center justify-center border border-gray-200 transition-all"
          >
            <X size={20} />
          </button>

          {/* Left Gallery Section */}
          <div className="md:col-span-6 flex flex-col bg-gray-50 p-6">
            <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden mb-4 border border-gray-200">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 px-3 py-1 bg-[#0F172A] text-white font-mono text-[10px] uppercase font-bold tracking-widest rounded shadow-sm">
                {product.weight}
              </span>
              <span className="absolute bottom-4 right-4 px-3 py-1 bg-black/80 backdrop-blur-md text-white border border-white/20 font-mono text-[10px] uppercase font-extrabold tracking-[0.25em] rounded shadow-md">
                THINC
              </span>
            </div>

            {/* Thumbnail selector */}
            <div className="flex items-center gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === i ? 'border-red-600 scale-105 shadow-sm' : 'border-gray-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Product Specs & Purchase Section */}
          <div className="md:col-span-6 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 font-mono mb-2">
                <span className="text-indigo-900 uppercase font-bold">{product.targetAudience} • {product.category}</span>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star size={14} fill="currentColor" />
                  <span>{product.rating} ({product.reviewsCount} reviews)</span>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F172A] mb-2">{product.name}</h2>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xl font-bold text-[#0F172A]">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-xs text-slate-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                )}
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold rounded">
                  Direct Atelier Pricing
                </span>
              </div>

              {/* Emotional Description */}
              <p className="text-xs text-slate-600 font-light leading-relaxed mb-4">
                {product.description} This raw denim develops a personal fade pattern unique to your lifestyle over years of wear, making every pair personal.
              </p>

              {/* Size Selector */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2 text-xs uppercase font-mono tracking-wider">
                  <span className="text-slate-700 font-bold">Select Size</span>
                  <span className="text-slate-500 flex items-center gap-1 cursor-pointer hover:text-black">
                    <Ruler size={13} /> Size Guide
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all border ${
                        selectedSize === size
                          ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-md'
                          : 'bg-white text-slate-700 border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Craft Highlights */}
              <div className="space-y-2 mb-6 pt-4 border-t border-gray-100">
                <p className="text-[11px] uppercase font-mono text-slate-500 font-bold">Atelier Quality Promise</p>
                {product.details.map((d, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-700 font-mono">
                    <Check size={13} className="text-red-600 flex-shrink-0" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
              <button
                onClick={handleAdd}
                className={`flex-1 py-4 rounded-xl text-xs uppercase tracking-[0.15em] font-bold transition-all flex items-center justify-center gap-2 shadow-md ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#0F172A] hover:bg-slate-800 text-white'
                }`}
              >
                <ShoppingBag size={16} />
                {added ? 'Added to Bag!' : `Add to Bag — ₹${product.price.toLocaleString()}`}
              </button>

              <button
                onClick={() => onToggleWishlist(product.id)}
                className={`p-4 rounded-xl border transition-all ${
                  isWishlisted
                    ? 'bg-red-50 border-red-200 text-red-600'
                    : 'bg-white border-gray-200 text-slate-600 hover:text-black'
                }`}
              >
                <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
