import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../data/products';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedAudience: string;
  onSelectAudience: (audience: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  selectedCategory,
  onSelectCategory,
  selectedAudience,
  onSelectAudience
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  const categories = ['All', 'Jeans', 'Jackets', 'Shackets', 'Cargo', 'Shorts', 'Accessories'];
  const audienceOptions = ['All', 'Men', 'Women', 'Kids'];

  const filteredProducts = products
    .filter((p) => selectedAudience === 'All' || p.targetAudience === selectedAudience)
    .filter((p) => selectedCategory === 'All' || p.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <section id="collection" className="py-16 md:py-24 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <span className="text-xs uppercase font-mono tracking-[0.3em] text-[#1E3A8A] font-bold mb-2 block">
              Flagship Catalog • {selectedAudience === 'All' ? 'All Editions' : `${selectedAudience}'s Collection`}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0F172A] tracking-wide">
              {selectedCategory === 'All' ? 'All Garments' : selectedCategory} ({filteredProducts.length})
            </h2>
          </div>

          {/* Sort Select */}
          <div className="relative self-start md:self-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-gray-200 text-xs text-slate-700 px-4 py-3 rounded-xl outline-none font-mono uppercase tracking-wider cursor-pointer hover:border-gray-400 shadow-sm"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Dual Filter Controls Bar */}
        <div className="crisp-panel p-5 rounded-2xl mb-10 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-sm">
          {/* Audience Filter Pills (All, Men, Women, Kids) */}
          <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
            <span className="text-xs font-mono uppercase text-slate-500 mr-2 flex-shrink-0 font-bold">Audience:</span>
            {audienceOptions.map((aud) => (
              <button
                key={aud}
                onClick={() => onSelectAudience(aud)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex-shrink-0 ${
                  selectedAudience === aud
                    ? 'bg-red-600 text-white shadow-sm font-bold scale-105'
                    : 'bg-gray-100 text-slate-700 hover:text-black hover:bg-gray-200'
                }`}
              >
                {aud === 'All' ? 'All Editions' : aud === 'Kids' ? 'Kids (Children)' : aud}
              </button>
            ))}
          </div>

          {/* Category Filter Pills (All, Jeans, Jackets, Shackets, Cargo, Shorts, Accessories) */}
          <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
            <span className="text-xs font-mono uppercase text-slate-500 mr-2 flex-shrink-0 font-bold">Category:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex-shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#0F172A] text-white shadow-sm font-bold scale-105'
                    : 'bg-gray-100 text-slate-700 hover:text-black hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence>
            {filteredProducts.length === 0 ? (
              <div className="col-span-full text-center py-24 text-slate-500 font-mono">
                No items available in this selection. Try choosing another filter above.
              </div>
            ) : (
              filteredProducts.map((p, i) => {
                const isWishlisted = wishlistIds.includes(p.id);

                return (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: i * 0.03 }}
                    className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Image Container with Crossfade on Hover */}
                    <div
                      onClick={() => onSelectProduct(p)}
                      className="relative h-80 overflow-hidden cursor-pointer bg-gray-100"
                    >
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />

                      {/* Audience & Product Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        <span className="px-2.5 py-0.5 bg-white/90 backdrop-blur-md text-[#0F172A] border border-gray-200 text-[9px] font-mono font-bold uppercase tracking-widest rounded shadow-sm">
                          {p.targetAudience}
                        </span>
                        {p.isBestSeller && (
                          <span className="px-2.5 py-0.5 bg-red-600 text-white text-[9px] font-mono font-bold uppercase tracking-widest rounded shadow-sm">
                            Best Seller
                          </span>
                        )}
                        {p.isNewArrival && (
                          <span className="px-2.5 py-0.5 bg-emerald-600 text-white text-[9px] font-mono font-bold uppercase tracking-widest rounded shadow-sm">
                            New Drop
                          </span>
                        )}
                      </div>

                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWishlist(p.id);
                        }}
                        className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                          isWishlisted
                            ? 'bg-red-600 text-white'
                            : 'bg-white/80 text-slate-700 hover:bg-black hover:text-white border border-gray-200'
                        }`}
                      >
                        <Heart size={15} fill={isWishlisted ? 'currentColor' : 'none'} />
                      </button>

                      {/* Visible THINC Brand Watermark on Image */}
                      <div className="absolute bottom-3 right-3 pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
                        <span className="px-2.5 py-1 bg-black/80 backdrop-blur-md text-white border border-white/20 text-[10px] font-mono font-extrabold tracking-[0.25em] uppercase rounded shadow-lg flex items-center gap-1">
                          THINC
                        </span>
                      </div>

                      {/* Quick View Hover Bar */}
                      <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectProduct(p);
                          }}
                          className="w-full py-2.5 bg-[#0F172A] text-white text-[11px] uppercase font-bold tracking-widest rounded-xl backdrop-blur-md flex items-center justify-center gap-2 shadow-lg hover:bg-slate-800"
                        >
                          <Eye size={14} /> Quick View
                        </button>
                      </div>
                    </div>

                    {/* Card Info & Color Swatches */}
                    <div className="p-5 flex flex-col justify-between flex-1 gap-3">
                      <div>
                        {/* Rating & Color Indicator */}
                        <div className="flex items-center justify-between text-xs text-slate-500 font-mono mb-1">
                          <div className="flex items-center gap-1.5">
                            <span
                              className="w-3 h-3 rounded-full border border-gray-300 shadow-sm"
                              style={{ backgroundColor: p.colorHex }}
                              title={p.colorName}
                            />
                            <span className="text-[11px] text-slate-600 font-sans">{p.colorName}</span>
                          </div>
                          <div className="flex items-center gap-1 text-amber-500">
                            <Star size={12} fill="currentColor" />
                            <span className="text-[11px]">{p.rating}</span>
                          </div>
                        </div>

                        <h3
                          onClick={() => onSelectProduct(p)}
                          className="text-base font-serif font-bold text-[#0F172A] hover:text-red-600 transition-colors cursor-pointer mb-1 leading-snug"
                        >
                          {p.name}
                        </h3>

                        {/* Specs Badges */}
                        <div className="flex flex-wrap gap-1 mt-2 font-mono text-[9px]">
                          <span className="px-1.5 py-0.5 bg-gray-100 border border-gray-200 text-slate-700 rounded flex items-center gap-1">
                            <Check size={10} className="text-emerald-600" /> {p.fit}
                          </span>
                          <span className="px-1.5 py-0.5 bg-gray-100 border border-gray-200 text-slate-700 rounded flex items-center gap-1">
                            <Check size={10} className="text-emerald-600" /> {p.weight.split(' ')[0]}
                          </span>
                        </div>
                      </div>

                      {/* Price & Add CTA */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div>
                          <span className="text-base font-bold text-[#0F172A]">₹{p.price.toLocaleString()}</span>
                          {p.originalPrice && (
                            <span className="text-[11px] text-slate-400 line-through ml-1.5">
                              ₹{p.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => onAddToCart(p, p.availableSizes[0])}
                          className="px-3.5 py-1.5 bg-[#0F172A] hover:bg-red-600 text-white text-[11px] uppercase font-semibold tracking-wider rounded-lg transition-all flex items-center gap-1 shadow-sm"
                        >
                          <ShoppingBag size={13} /> Add
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
