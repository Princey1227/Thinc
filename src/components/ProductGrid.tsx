import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../data/products';
import { Heart, Eye, ShoppingBag, Star, Check, Sparkles, Tag, SlidersHorizontal, RotateCcw, LayoutGrid } from 'lucide-react';

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
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [selectedFitFilter, setSelectedFitFilter] = useState<string>('All');
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(10000);

  const categories = ['All', 'Jeans', 'Cargo', 'Jackets', 'Shackets', 'Shorts'];
  const garmentTypes: Array<'Jeans' | 'Cargo' | 'Jackets' | 'Shackets' | 'Shorts'> = ['Jeans', 'Cargo', 'Jackets', 'Shackets', 'Shorts'];
  const fitOptions = ['All', 'Straight Leg', 'Tapered Cut', 'Oversized Boxy', 'Relaxed Fit'];

  const audienceSections = [
    { title: "Men's Collection", id: 'Men', subtitle: 'Pattern-Engineered Denim for Men' },
    { title: "Women's Collection", id: 'Women', subtitle: 'Luxury Tailored Fits for Women' },
    { title: "Children's (Kids) Collection", id: 'Kids', subtitle: 'Durable Organic Cotton Denim for Kids' },
    { title: "Upcycled Denim Accessories", id: 'Accessories', subtitle: 'Zero-Waste Handcrafted Accessories' }
  ];

  const resetAllFilters = () => {
    onSelectAudience('All');
    onSelectCategory('All');
    setSelectedFitFilter('All');
    setMaxPriceFilter(10000);
  };

  const isFilterActive = selectedAudience !== 'All' || selectedCategory !== 'All' || selectedFitFilter !== 'All' || maxPriceFilter < 10000;

  // Helper to render a single product card
  const renderProductCard = (p: Product, i: number) => {
    const isWishlisted = wishlistIds.includes(p.id);
    const discountPct = p.originalPrice
      ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
      : 0;

    return (
      <motion.div
        key={p.id}
        layout
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, delay: i * 0.02 }}
        className="group relative bg-white border border-gray-200/90 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-500/30 transition-all duration-300 flex flex-col justify-between"
      >
        {/* Image Container */}
        <div
          onClick={() => onSelectProduct(p)}
          className="relative h-56 sm:h-72 md:h-80 overflow-hidden cursor-pointer bg-gray-100"
        >
          <img
            src={p.images[0]}
            alt={p.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1 z-10">
            <span className="px-1.5 sm:px-2.5 py-0.5 bg-white/95 backdrop-blur-md text-[#0F172A] border border-gray-200 text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-wider rounded shadow-sm">
              {p.category}
            </span>
            {discountPct > 0 && (
              <span className="px-1.5 sm:px-2.5 py-0.5 bg-amber-500 text-slate-900 text-[8px] sm:text-[9px] font-mono font-extrabold uppercase tracking-wider rounded shadow-sm flex items-center gap-0.5">
                <Tag size={9} /> -{discountPct}%
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(p.id);
            }}
            className={`absolute top-2 right-2 sm:top-3 sm:right-3 z-10 w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
              isWishlisted
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-white/80 text-slate-700 hover:bg-black hover:text-white border border-gray-200'
            }`}
          >
            <Heart size={13} className="sm:hidden" fill={isWishlisted ? 'currentColor' : 'none'} />
            <Heart size={15} className="hidden sm:block" fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>

          {/* Visible THINC Brand Watermark */}
          <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 z-10 pointer-events-none">
            <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-black/85 backdrop-blur-md text-white border border-white/20 text-[8px] sm:text-[10px] font-mono font-extrabold tracking-[0.2em] uppercase rounded shadow-md">
              THINC
            </span>
          </div>

          {/* Quick View Button */}
          <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 hidden sm:block">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectProduct(p);
              }}
              className="w-full py-2 bg-[#0F172A] hover:bg-slate-800 text-white text-[10px] sm:text-[11px] font-mono uppercase font-bold tracking-widest rounded-xl flex items-center justify-center gap-1.5 shadow-lg border border-white/10"
            >
              <Eye size={13} /> Quick View
            </button>
          </div>
        </div>

        {/* Card Info */}
        <div className="p-2.5 sm:p-4 flex flex-col justify-between flex-1 gap-2">
          <div>
            {/* Color & Rating Header */}
            <div className="flex items-center justify-between text-[10px] sm:text-xs text-slate-500 font-mono mb-1">
              <div className="flex items-center gap-1">
                <span
                  className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full border border-gray-300 shadow-inner"
                  style={{ backgroundColor: p.colorHex }}
                  title={p.colorName}
                />
                <span className="text-[10px] sm:text-[11px] text-slate-600 font-medium truncate max-w-[70px] sm:max-w-none">
                  {p.colorName}
                </span>
              </div>
              <div className="flex items-center gap-0.5 text-amber-500 font-bold text-[10px] sm:text-[11px]">
                <Star size={11} fill="currentColor" />
                <span>{p.rating}</span>
              </div>
            </div>

            {/* Title */}
            <h3
              onClick={() => onSelectProduct(p)}
              className="text-xs sm:text-base font-serif font-bold text-[#0F172A] hover:text-red-600 transition-colors cursor-pointer mb-1 leading-tight line-clamp-1"
            >
              {p.name}
            </h3>

            {/* Specs */}
            <div className="flex flex-wrap gap-1 font-mono text-[8px] sm:text-[9px]">
              <span className="px-1.5 py-0.5 bg-gray-100 border border-gray-200/80 text-slate-700 rounded flex items-center gap-0.5">
                <Check size={9} className="text-emerald-600" /> {p.fit}
              </span>
            </div>
          </div>

          {/* Price & Add CTA */}
          <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-1">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-sm sm:text-lg font-extrabold text-[#0F172A] font-sans">
                  ₹{p.price.toLocaleString()}
                </span>
                {p.originalPrice && (
                  <span className="text-[10px] sm:text-xs text-slate-400 line-through font-sans hidden sm:inline">
                    ₹{p.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(p, p.availableSizes[0]);
              }}
              className="px-2.5 sm:px-3.5 py-1.5 bg-[#0F172A] hover:bg-red-600 text-white text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider rounded-lg sm:rounded-xl transition-all flex items-center gap-1 shadow-sm shrink-0"
            >
              <ShoppingBag size={11} className="sm:hidden" />
              <ShoppingBag size={13} className="hidden sm:block" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="collection" className="py-6 md:py-10 bg-[#FAF8F5] relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-amber-500/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-red-600/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* Main Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-900 rounded-full text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase mb-2">
              <Sparkles size={12} className="text-amber-600" />
              <span>Flagship Atelier Catalog</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-[#0F172A] tracking-tight">
              THINC Collections <span className="text-lg font-mono text-slate-400 font-normal">({products.length} Garments)</span>
            </h2>
          </div>

          {/* Sort Select */}
          <div className="relative self-start md:self-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-gray-300 text-[10px] sm:text-xs font-bold text-slate-800 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl outline-none font-mono uppercase tracking-wider cursor-pointer hover:border-black shadow-sm transition-all"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated ⭐</option>
            </select>
          </div>
        </div>

        {/* Global Navigation Bar */}
        <div className="bg-white/80 backdrop-blur-md border border-gray-200/90 p-3 sm:p-4 rounded-2xl mb-6 flex items-center justify-between gap-3 overflow-x-auto shadow-sm scrollbar-none">
          <div className="flex items-center gap-2">
            
            {/* ALL COLLECTIONS BUTTON */}
            <button
              onClick={resetAllFilters}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 flex-shrink-0 ${
                selectedAudience === 'All' && selectedCategory === 'All' && selectedFitFilter === 'All' && maxPriceFilter === 10000
                  ? 'bg-[#0F172A] text-white shadow-md'
                  : 'bg-gray-100 text-slate-700 hover:bg-gray-200'
              }`}
            >
              <LayoutGrid size={14} />
              <span>All Collections ({products.length})</span>
            </button>

            {/* Filter Options Button */}
            <button
              onClick={() => setFilterPanelOpen(!filterPanelOpen)}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 flex-shrink-0 ${
                filterPanelOpen || isFilterActive
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-gray-100 text-slate-700 hover:bg-gray-200'
              }`}
            >
              <SlidersHorizontal size={14} />
              <span>Filter Options</span>
              {isFilterActive && (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              )}
            </button>

            {/* Audience Tabs */}
            {audienceSections.map((sec) => (
              <button
                key={`tab-${sec.id}`}
                onClick={() => {
                  if (sec.id === 'Accessories') {
                    onSelectAudience('All');
                    onSelectCategory('Accessories');
                  } else {
                    onSelectAudience(sec.id);
                    onSelectCategory('All');
                  }
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex-shrink-0 ${
                  (selectedAudience === sec.id && selectedCategory !== 'Accessories') ||
                  (sec.id === 'Accessories' && selectedCategory === 'Accessories')
                    ? 'bg-[#0F172A] text-white shadow-md'
                    : 'bg-gray-100 text-slate-700 hover:bg-gray-200'
                }`}
              >
                {sec.title}
              </button>
            ))}
          </div>
        </div>

        {/* Expandable Filter Options Drawer */}
        <AnimatePresence>
          {filterPanelOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-10"
            >
              <div className="bg-white border border-gray-200 p-5 sm:p-6 rounded-2xl shadow-lg space-y-5">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-[#0F172A] flex items-center gap-2">
                    <SlidersHorizontal size={16} className="text-red-600" />
                    Custom Filter Options
                  </h4>
                  {isFilterActive && (
                    <button
                      onClick={resetAllFilters}
                      className="text-xs font-mono text-slate-500 hover:text-red-600 flex items-center gap-1"
                    >
                      <RotateCcw size={12} /> Reset Filters
                    </button>
                  )}
                </div>

                <div className="grid sm:grid-cols-3 gap-6">
                  {/* Category Filter */}
                  <div>
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block mb-2">Category</span>
                    <div className="flex flex-wrap gap-1.5">
                      {['All', 'Jeans', 'Cargo', 'Jackets', 'Shackets', 'Shorts', 'Accessories'].map((cat) => (
                        <button
                          key={`flt-cat-${cat}`}
                          onClick={() => onSelectCategory(cat)}
                          className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all ${
                            selectedCategory === cat
                              ? 'bg-[#0F172A] text-white font-bold'
                              : 'bg-gray-100 text-slate-700 hover:bg-gray-200'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Fit Filter */}
                  <div>
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block mb-2">Fit Style</span>
                    <div className="flex flex-wrap gap-1.5">
                      {fitOptions.map((ft) => (
                        <button
                          key={`flt-fit-${ft}`}
                          onClick={() => setSelectedFitFilter(ft)}
                          className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all ${
                            selectedFitFilter === ft
                              ? 'bg-[#0F172A] text-white font-bold'
                              : 'bg-gray-100 text-slate-700 hover:bg-gray-200'
                          }`}
                        >
                          {ft}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Filter */}
                  <div>
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block mb-2">
                      Max Price: <strong className="text-[#0F172A]">₹{maxPriceFilter.toLocaleString()}</strong>
                    </span>
                    <input
                      type="range"
                      min="399"
                      max="10000"
                      step="250"
                      value={maxPriceFilter}
                      onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                      className="w-full accent-red-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                      <span>₹399</span>
                      <span>₹10,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* DISTINCT COLLECTION SECTIONS WITH ALL PRODUCTS DISPLAYED */}
        <div className="space-y-8">
          {audienceSections
            .filter((sec) => {
              if (selectedAudience !== 'All' && sec.id !== selectedAudience) return false;
              if (selectedCategory === 'Accessories' && sec.id !== 'Accessories') return false;
              if (selectedCategory !== 'All' && selectedCategory !== 'Accessories' && sec.id === 'Accessories') return false;
              return true;
            })
            .map((sec) => {
              // Accessories section handling
              if (sec.id === 'Accessories') {
                const accProducts = products
                  .filter((p) => p.category === 'Accessories')
                  .filter((p) => p.price <= maxPriceFilter)
                  .sort((a, b) => {
                    if (sortBy === 'price-low') return a.price - b.price;
                    if (sortBy === 'price-high') return b.price - a.price;
                    if (sortBy === 'rating') return b.rating - a.rating;
                    return 0;
                  });

                if (accProducts.length === 0) return null;

                return (
                  <div key={sec.id} id={`section-${sec.id.toLowerCase()}`} className="bg-white/60 backdrop-blur-sm border border-gray-200/80 p-4 sm:p-8 rounded-3xl shadow-sm">
                    <div className="border-b border-gray-200 pb-4 mb-6">
                      <span className="text-xs font-mono font-bold text-red-600 uppercase tracking-widest block mb-1">
                        {sec.subtitle}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#0F172A]">
                        {sec.title} <span className="text-lg font-mono text-slate-400 font-normal">({accProducts.length})</span>
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
                      {accProducts.map((p, i) => renderProductCard(p, i))}
                    </div>
                  </div>
                );
              }

              // Garment sections (Men's, Women's, Kids')
              const sectionTotalProducts = products
                .filter((p) => p.targetAudience === sec.id && p.category !== 'Accessories')
                .filter((p) => selectedFitFilter === 'All' || p.fit.toLowerCase().includes(selectedFitFilter.toLowerCase()))
                .filter((p) => p.price <= maxPriceFilter);

              if (sectionTotalProducts.length === 0) return null;

              return (
                <div key={sec.id} id={`section-${sec.id.toLowerCase()}`} className="bg-white/60 backdrop-blur-sm border border-gray-200/80 p-4 sm:p-6 rounded-3xl shadow-sm space-y-6">
                  
                  {/* Section Main Header */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-6 gap-4">
                    <div>
                      <span className="text-xs font-mono font-bold text-red-600 uppercase tracking-widest block mb-1">
                        {sec.subtitle}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#0F172A]">
                        {sec.title} <span className="text-lg font-mono text-slate-400 font-normal">({sectionTotalProducts.length} Items)</span>
                      </h3>
                    </div>

                    {/* Sub-category Quick Filter Pills */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                      <button
                        onClick={() => {
                          onSelectAudience(sec.id);
                          onSelectCategory('All');
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold uppercase tracking-wider transition-all flex-shrink-0 ${
                          selectedCategory === 'All'
                            ? 'bg-[#0F172A] text-white shadow-sm font-bold'
                            : 'bg-gray-100 text-slate-700 hover:bg-gray-200'
                        }`}
                      >
                        All {sec.id}'s
                      </button>
                      {categories.filter(c => c !== 'All').map((cat) => {
                        const isCatActive = selectedCategory === cat;
                        return (
                          <button
                            key={`sub-${sec.id}-${cat}`}
                            onClick={() => {
                              onSelectAudience(sec.id);
                              onSelectCategory(cat);
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold uppercase tracking-wider transition-all flex-shrink-0 ${
                              isCatActive
                                ? 'bg-[#0F172A] text-white shadow-sm font-bold'
                                : 'bg-gray-100 text-slate-700 hover:bg-gray-200'
                            }`}
                          >
                            {cat}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Render Subcategory Groups (Jeans, Cargo, Jackets, Shackets, Shorts) */}
                  {garmentTypes.map((gType) => {
                    if (selectedCategory !== 'All' && selectedCategory !== gType) return null;

                    const typeProducts = sectionTotalProducts
                      .filter((p) => p.category === gType)
                      .sort((a, b) => {
                        if (sortBy === 'price-low') return a.price - b.price;
                        if (sortBy === 'price-high') return b.price - a.price;
                        if (sortBy === 'rating') return b.rating - a.rating;
                        return 0;
                      });

                    if (typeProducts.length === 0) return null;

                    return (
                      <div key={`group-${sec.id}-${gType}`} className="space-y-4 pt-2">
                        <div className="flex items-center gap-3">
                          <h4 className="text-base sm:text-lg font-serif font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-2">
                            <span>{sec.id}'s {gType}</span>
                            <span className="text-xs font-mono font-normal text-slate-400">({typeProducts.length})</span>
                          </h4>
                          <div className="h-[1px] bg-gray-200 flex-1" />
                        </div>

                        {/* 2-PRODUCT MOBILE GRID / 4-PRODUCT DESKTOP GRID */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
                          {typeProducts.map((p, i) => renderProductCard(p, i))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
        </div>

      </div>
    </section>
  );
};
