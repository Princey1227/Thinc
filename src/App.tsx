import React, { useState } from 'react';
import { PRODUCTS, Product } from './data/products';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { TrustStoryline } from './components/TrustStoryline';
import { AboutUsStoryline } from './components/AboutUsStoryline';
import { DenimInspector } from './components/DenimInspector';
import { ProductGrid } from './components/ProductGrid';
import { AtelierCraftsmanship } from './components/AtelierCraftsmanship';
import { InstagramLightbox } from './components/InstagramLightbox';
import { Footer } from './components/Footer';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { Heart, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedAudience, setSelectedAudience] = useState<string>('All');

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddToCart = (product: Product, size: string) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [...prev, { product, size, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, size: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId && item.size === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (productId: string, size: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.size === size))
    );
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const wishlistedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#0F172A] selection:bg-red-600 selection:text-white font-sans">
      {/* Navigation */}
      <Nav
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onSelectProduct={(p) => setSelectedProduct(p)}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        selectedAudience={selectedAudience}
        onSelectAudience={(aud) => setSelectedAudience(aud)}
        products={PRODUCTS}
      />

      {/* Hero Section */}
      <Hero />

      {/* Trust Storyline & Pricing Transparency */}
      <TrustStoryline />

      {/* About Us & Punit Creations 1996 Heritage Story */}
      <AboutUsStoryline />

      {/* Interactive Macro Denim Loupe Inspector */}
      <DenimInspector />

      {/* Product Collection Grid with Premium Badges */}
      <ProductGrid
        products={PRODUCTS}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        wishlistIds={wishlistIds}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        selectedAudience={selectedAudience}
        onSelectAudience={(aud) => setSelectedAudience(aud)}
      />

      {/* Atelier Craftsmanship Timeline */}
      <AtelierCraftsmanship />

      {/* Instagram Community Lightbox */}
      <InstagramLightbox />

      {/* Footer */}
      <Footer />

      {/* Quick View Modal */}
      <ProductQuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
      />

      {/* Apple-Grade Checkout Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      {/* Wishlist Drawer */}
      <AnimatePresence>
        {isWishlistOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsWishlistOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-white border-l border-gray-200 p-6 flex flex-col justify-between shadow-2xl"
            >
              <div>
                <div className="flex justify-between items-center pb-6 border-b border-gray-200">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-[#0F172A] flex items-center gap-2">
                      <Heart size={20} className="text-red-600 fill-current" /> Your Wishlist
                    </h3>
                    <p className="text-xs text-slate-500 font-mono">{wishlistIds.length} saved garments</p>
                  </div>
                  <button onClick={() => setIsWishlistOpen(false)} className="p-2 text-slate-500 hover:text-black">
                    <X size={22} />
                  </button>
                </div>

                <div className="space-y-4 pt-6 max-h-[70vh] overflow-y-auto">
                  {wishlistedProducts.length === 0 ? (
                    <p className="text-sm text-slate-500 text-center py-12">No saved items in your wishlist.</p>
                  ) : (
                    wishlistedProducts.map((p) => (
                      <div
                        key={p.id}
                        className="flex gap-4 p-3 bg-gray-50 border border-gray-200 rounded-xl items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <img src={p.images[0]} alt={p.name} className="w-14 h-14 object-cover rounded-lg" />
                          <div>
                            <p className="text-sm font-semibold text-[#0F172A]">{p.name}</p>
                            <p className="text-xs font-mono text-slate-500">₹{p.price.toLocaleString()}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            handleAddToCart(p, p.availableSizes[0]);
                            setIsWishlistOpen(false);
                          }}
                          className="px-3 py-1.5 bg-[#0F172A] text-white text-xs font-mono font-bold uppercase rounded hover:bg-slate-800"
                        >
                          Add
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <button
                onClick={() => setIsWishlistOpen(false)}
                className="w-full py-3.5 bg-gray-100 text-[#0F172A] text-xs uppercase font-bold tracking-widest rounded-xl border border-gray-200 hover:bg-gray-200"
              >
                Close Wishlist
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
