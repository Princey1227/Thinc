import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, ShoppingBag, Menu, X, ArrowRight, Sparkles, ChevronDown } from 'lucide-react';
import { Product } from '../data/products';

interface NavProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onSelectProduct: (p: Product) => void;
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedAudience: string;
  onSelectAudience: (audience: string) => void;
}

export const Nav: React.FC<NavProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onSelectProduct,
  products,
  selectedCategory,
  onSelectCategory,
  selectedAudience,
  onSelectAudience
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collectionsDropdownOpen, setCollectionsDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredSearch = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.targetAudience.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.fit.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const subCategories = ['Jeans', 'Jackets', 'Shackets', 'Shorts', 'Cargo'];

  const handleShopClick = () => {
    onSelectAudience('All');
    onSelectCategory('All');
    const collectionEl = document.getElementById('collection');
    if (collectionEl) {
      collectionEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAboutClick = () => {
    const aboutEl = document.getElementById('about-us');
    if (aboutEl) {
      aboutEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAccessoriesClick = () => {
    onSelectAudience('All');
    onSelectCategory('Accessories');
    setCollectionsDropdownOpen(false);
    setMobileMenuOpen(false);
    const collectionEl = document.getElementById('collection');
    if (collectionEl) {
      collectionEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubCategorySelect = (audience: string, category: string) => {
    onSelectAudience(audience);
    onSelectCategory(category);
    setCollectionsDropdownOpen(false);
    setMobileMenuOpen(false);
    const collectionEl = document.getElementById('collection');
    if (collectionEl) {
      collectionEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isNavActive = scrolled || collectionsDropdownOpen;

  const marqueeText = (
    <div className="flex items-center gap-8 font-mono text-[11px] text-slate-300 tracking-wider whitespace-nowrap px-4">
      <span>✦ COMPLIMENTARY EXPRESS SHIPPING ACROSS INDIA</span>
      <span className="text-amber-400">•</span>
      <span className="text-white font-bold">40 YEARS OF DENIM MANUFACTURING EXPERTISE</span>
      <span className="text-amber-400">•</span>
      <span>FREE LIFETIME REPAIR GUARANTEE ON ALL RAW SELVEDGE</span>
      <span className="text-amber-400">•</span>
      <span className="text-emerald-400 font-bold">100% ORGANIC LONG-STAPLE COTTON • HANDCRAFTED IN INDIA</span>
      <span className="text-amber-400">•</span>
      <span>14-DAY HASSLE-FREE SIZE EXCHANGES</span>
      <span className="text-amber-400">•</span>
    </div>
  );

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
        {/* Rolling Announcement Bar */}
        <div
          className={`bg-[#0F172A] text-white overflow-hidden relative transition-all duration-300 ${
            scrolled
              ? 'max-h-0 opacity-0 py-0 border-none pointer-events-none'
              : 'max-h-12 opacity-100 py-2 border-b border-gray-800'
          }`}
        >
          <div className="animate-marquee">
            {marqueeText}
            {marqueeText}
          </div>
        </div>

        {/* Dynamic Background Navbar */}
        <div
          className={`transition-all duration-300 ${
            isNavActive
              ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-md py-3.5'
              : 'border-b border-white/10 py-4.5'
          }`}
          style={
            !isNavActive
              ? {
                  background: 'rgba(0, 0, 0, 0.25)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)'
                }
              : undefined
          }
        >
          <div className="w-full px-4 sm:px-8 lg:px-10 flex items-center justify-between relative">
            
            {/* LEFT CORNER: MOBILE HAMBURGER MENU / DESKTOP SHOP, COLLECTIONS & ABOUT */}
            <div className="flex items-center gap-6 z-10">
              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className={`lg:hidden p-2 rounded-lg transition-colors ${
                  isNavActive ? 'text-slate-800 hover:bg-gray-100' : 'text-white'
                }`}
                aria-label="Open Navigation Menu"
              >
                <Menu size={22} strokeWidth={1.5} />
              </button>

              {/* Desktop Only Navigation Links - FULL LEFT ALIGNED */}
              <div className="hidden lg:flex items-center gap-5 xl:gap-7">
                {/* SHOP button */}
                <button
                  onClick={handleShopClick}
                  className={`text-xs xl:text-sm uppercase tracking-[1.5px] xl:tracking-[2px] font-medium transition-colors py-1 cursor-pointer ${
                    isNavActive
                      ? 'text-[#0F172A] hover:text-[#C8A46A]'
                      : 'text-white hover:text-[#C8A46A] drop-shadow-md'
                  }`}
                >
                  SHOP
                </button>

                {/* COLLECTIONS Dropdown Trigger */}
                <div className="relative">
                  <button
                    onClick={() => setCollectionsDropdownOpen(!collectionsDropdownOpen)}
                    className={`text-xs xl:text-sm uppercase tracking-[1.5px] xl:tracking-[2px] font-medium transition-colors py-1 cursor-pointer flex items-center gap-1 ${
                      isNavActive
                        ? 'text-[#0F172A] hover:text-[#C8A46A]'
                        : 'text-white hover:text-[#C8A46A] drop-shadow-md'
                    }`}
                  >
                    COLLECTIONS
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-300 ${
                        collectionsDropdownOpen
                          ? 'rotate-180 text-[#C8A46A]'
                          : isNavActive
                          ? 'text-slate-400'
                          : 'text-white/80'
                      }`}
                    />
                  </button>

                  {/* COLLECTIONS MEGA DROPDOWN */}
                  <AnimatePresence>
                    {collectionsDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-[660px] bg-white border border-gray-200 rounded-2xl shadow-2xl p-5 z-50 grid grid-cols-4 gap-4 text-left"
                      >
                        {/* MEN COLUMN */}
                        <div>
                          <h4 className="text-xs font-mono font-extrabold text-[#0F172A] border-b border-gray-200 pb-2 mb-3 tracking-widest uppercase">
                            MEN
                          </h4>
                          <div className="flex flex-col gap-2">
                            {subCategories.map((sub) => (
                              <button
                                key={`men-${sub}`}
                                onClick={() => handleSubCategorySelect('Men', sub)}
                                className="text-xs text-left text-slate-600 hover:text-[#C8A46A] font-medium py-1 transition-colors hover:translate-x-1 duration-200 flex items-center justify-between"
                              >
                                <span>{sub}</span>
                                <span className="text-[10px] font-mono text-slate-400">→</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* WOMEN COLUMN */}
                        <div>
                          <h4 className="text-xs font-mono font-extrabold text-[#0F172A] border-b border-gray-200 pb-2 mb-3 tracking-widest uppercase">
                            WOMEN
                          </h4>
                          <div className="flex flex-col gap-2">
                            {subCategories.map((sub) => (
                              <button
                                key={`women-${sub}`}
                                onClick={() => handleSubCategorySelect('Women', sub)}
                                className="text-xs text-left text-slate-600 hover:text-[#C8A46A] font-medium py-1 transition-colors hover:translate-x-1 duration-200 flex items-center justify-between"
                              >
                                <span>{sub}</span>
                                <span className="text-[10px] font-mono text-slate-400">→</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* KIDS (CHILDREN) COLUMN */}
                        <div>
                          <h4 className="text-xs font-mono font-extrabold text-[#0F172A] border-b border-gray-200 pb-2 mb-3 tracking-widest uppercase">
                            KIDS (CHILDREN)
                          </h4>
                          <div className="flex flex-col gap-2">
                            {subCategories.map((sub) => (
                              <button
                                key={`kids-${sub}`}
                                onClick={() => handleSubCategorySelect('Kids', sub)}
                                className="text-xs text-left text-slate-600 hover:text-[#C8A46A] font-medium py-1 transition-colors hover:translate-x-1 duration-200 flex items-center justify-between"
                              >
                                <span>{sub}</span>
                                <span className="text-[10px] font-mono text-slate-400">→</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* ACCESSORIES COLUMN */}
                        <div>
                          <h4 className="text-xs font-mono font-extrabold text-[#0F172A] border-b border-gray-200 pb-2 mb-3 tracking-widest uppercase flex items-center justify-between">
                            <span>ACCESSORIES</span>
                          </h4>
                          <div className="flex flex-col gap-2">
                            {['Tote Bags', 'Laptop Sleeves', 'Utility Pouches', 'Notebook Covers', 'Card & Keychains'].map((acc) => (
                              <button
                                key={`dropdown-acc-${acc}`}
                                onClick={handleAccessoriesClick}
                                className="text-xs text-left text-slate-600 hover:text-[#C8A46A] font-medium py-1 transition-colors hover:translate-x-1 duration-200 flex items-center justify-between"
                              >
                                <span>{acc}</span>
                                <span className="text-[10px] font-mono text-slate-400">→</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* ACCESSORIES button */}
                <button
                  onClick={handleAccessoriesClick}
                  className={`text-xs xl:text-sm uppercase tracking-[1.5px] xl:tracking-[2px] font-medium transition-colors py-1 cursor-pointer ${
                    isNavActive
                      ? selectedCategory === 'Accessories'
                        ? 'text-[#C8A46A] font-bold'
                        : 'text-[#0F172A] hover:text-[#C8A46A]'
                      : selectedCategory === 'Accessories'
                      ? 'text-[#C8A46A] font-bold drop-shadow-md'
                      : 'text-white hover:text-[#C8A46A] drop-shadow-md'
                  }`}
                >
                  ACCESSORIES
                </button>

                {/* ABOUT US button */}
                <button
                  onClick={handleAboutClick}
                  className={`text-xs xl:text-sm uppercase tracking-[1.5px] xl:tracking-[2px] font-medium transition-colors py-1 cursor-pointer ${
                    isNavActive
                      ? 'text-[#0F172A] hover:text-[#C8A46A]'
                      : 'text-white hover:text-[#C8A46A] drop-shadow-md'
                  }`}
                >
                  ABOUT
                </button>
              </div>
            </div>

            {/* CENTER / MIDDLE: THINC LOGO */}
            <div className="absolute left-1/2 -translate-x-1/2 z-10">
              <a
                href="#"
                className={`flex items-center gap-2 text-2xl sm:text-3xl lg:text-4xl font-serif font-extrabold tracking-[0.3em] transition-colors ${
                  isNavActive
                    ? 'text-[#0F172A] hover:text-[#C8A46A]'
                    : 'text-[#F8F8F8] hover:text-[#C8A46A] drop-shadow-lg'
                }`}
              >
                THINC
              </a>
            </div>

            {/* RIGHT CORNER: BAG ICON (Mobile) / SEARCH, WISHLIST, BAG (Desktop) */}
            <div className="flex items-center gap-1 sm:gap-3 z-10">
              {/* Search button - Desktop only */}
              <button
                onClick={() => setSearchOpen(true)}
                className={`hidden sm:flex p-2 rounded-full transition-all ${
                  isNavActive
                    ? 'text-slate-700 hover:text-black hover:bg-gray-100'
                    : 'text-white hover:bg-white/10 drop-shadow-md'
                }`}
                title="Search Collection"
              >
                <Search size={19} strokeWidth={1.5} />
              </button>

              {/* Wishlist button - Desktop only */}
              <button
                onClick={onOpenWishlist}
                className={`hidden sm:flex relative p-2 rounded-full transition-all ${
                  isNavActive
                    ? 'text-slate-700 hover:text-black hover:bg-gray-100'
                    : 'text-white hover:bg-white/10 drop-shadow-md'
                }`}
                title="Wishlist"
              >
                <Heart size={19} strokeWidth={1.5} />
                {wishlistCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Shopping Bag Button - Displayed on Mobile & Desktop */}
              <button
                onClick={onOpenCart}
                className={`relative flex items-center justify-center p-2.5 sm:px-4 sm:py-2 rounded-full transition-all text-xs tracking-wider uppercase font-semibold shadow-sm ${
                  isNavActive
                    ? 'bg-[#0F172A] hover:bg-slate-800 text-white'
                    : 'bg-white text-[#0F172A] hover:bg-zinc-200'
                }`}
                title="View Shopping Bag"
              >
                <ShoppingBag size={18} strokeWidth={1.5} />
                <span className="hidden sm:inline ml-1">Bag</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 sm:relative sm:top-auto sm:right-auto sm:ml-1.5 w-4 h-4 bg-red-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-white flex flex-col justify-between p-8 overflow-y-auto"
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-gray-200">
                <span className="font-serif text-2xl font-bold tracking-[0.2em] text-[#0F172A]">THINC DENIM</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-slate-600">
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Search Button */}
              <div className="mt-4">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setSearchOpen(true);
                  }}
                  className="w-full py-3 px-4 bg-gray-100 border border-gray-200 rounded-xl text-slate-500 flex items-center gap-3 text-xs font-mono font-semibold"
                >
                  <Search size={16} className="text-slate-400" />
                  <span>Search THINC Denim Collection...</span>
                </button>
              </div>

              {/* Mobile Quick Links */}
              <div className="grid grid-cols-3 gap-2 mt-3">
                <button
                  onClick={() => {
                    handleShopClick();
                    setMobileMenuOpen(false);
                  }}
                  className="py-2.5 px-2 bg-[#0F172A] text-white font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-xl text-center"
                >
                  SHOP ALL
                </button>
                <button
                  onClick={handleAccessoriesClick}
                  className="py-2.5 px-2 bg-amber-500 text-slate-900 font-mono text-[10px] sm:text-xs font-extrabold uppercase tracking-wider rounded-xl text-center shadow-sm"
                >
                  ACCESSORIES
                </button>
                <button
                  onClick={() => {
                    handleAboutClick();
                    setMobileMenuOpen(false);
                  }}
                  className="py-2.5 px-2 bg-gray-100 text-[#0F172A] font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-xl border border-gray-200 text-center"
                >
                  ABOUT US
                </button>
              </div>

              {/* Mobile Collections Menu */}
              <div className="mt-6 space-y-6">
                {['Men', 'Women', 'Kids', 'Accessories'].map((aud) => (
                  <div key={`mob-${aud}`}>
                    <h4 className="text-sm font-mono font-bold text-[#0F172A] uppercase border-b border-gray-100 pb-2 mb-2 flex items-center justify-between">
                      <span>
                        {aud === 'Kids'
                          ? 'KIDS (CHILDREN)'
                          : aud === 'Accessories'
                          ? 'UPCYCLED ACCESSORIES'
                          : aud.toUpperCase()}
                      </span>
                      {aud === 'Accessories' && (
                        <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-mono font-bold">
                          ZERO WASTE
                        </span>
                      )}
                    </h4>
                    {aud === 'Accessories' ? (
                      <div className="grid grid-cols-2 gap-2 text-xs font-sans text-slate-700">
                        {[
                          'Tote Bags',
                          'Laptop Sleeves',
                          'Utility Pouches',
                          'Notebook Covers',
                          'Card Holders',
                          'Keychains & Scrunchies'
                        ].map((accItem) => (
                          <button
                            key={`mob-acc-${accItem}`}
                            onClick={handleAccessoriesClick}
                            className="text-left py-1 hover:text-amber-600 font-medium flex items-center gap-1.5"
                          >
                            <span className="text-amber-500 text-[10px]">✦</span> {accItem}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2 text-xs font-sans text-slate-700">
                        {subCategories.map((sub) => (
                          <button
                            key={`mob-${aud}-${sub}`}
                            onClick={() => handleSubCategorySelect(aud, sub)}
                            className="text-left py-1 hover:text-red-600"
                          >
                            {sub}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200 mt-6">
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">Punit Creations • Est. 1996</p>
              <p className="text-sm font-serif italic text-slate-800">"Premier Garment Manufacturing."</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center pt-24 px-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20 }}
              className="w-full max-w-2xl bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl flex flex-col gap-6 h-fit"
            >
              <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <div className="flex items-center gap-3 flex-1">
                  <Search size={22} className="text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search THINC denim collection..."
                    autoFocus
                    className="w-full bg-transparent text-[#0F172A] text-lg placeholder:text-slate-400 outline-none font-sans"
                  />
                </div>
                <button onClick={() => setSearchOpen(false)} className="p-2 text-slate-400 hover:text-black">
                  <X size={22} />
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto flex flex-col gap-3 pr-2">
                {searchQuery.trim() === '' ? (
                  <div className="text-center py-8 text-slate-400 text-sm">
                    <Sparkles size={24} className="mx-auto mb-2 opacity-50" />
                    Search raw denim jeans, jackets, shackets, cargo...
                  </div>
                ) : filteredSearch.length === 0 ? (
                  <div className="text-center py-8 text-slate-500 text-sm">
                    No items matching "{searchQuery}"
                  </div>
                ) : (
                  filteredSearch.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        onSelectProduct(p);
                        setSearchOpen(false);
                      }}
                      className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-100 cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <img src={p.images[0]} alt={p.name} className="w-14 h-14 object-cover rounded-lg" />
                        <div>
                          <p className="font-semibold text-[#0F172A] text-sm">{p.name}</p>
                          <p className="text-xs text-slate-500 font-mono">{p.targetAudience} • {p.category}</p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-[#0F172A]">₹{p.price.toLocaleString()}</span>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
