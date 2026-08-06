import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../data/products';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, Gift, Truck, CheckCircle2, Lock } from 'lucide-react';

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [giftPackaging, setGiftPackaging] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const giftFee = giftPackaging ? 350 : 0;
  const shippingThreshold = 3000;
  const freeShipping = subtotal >= shippingThreshold || items.length === 0;
  const shippingCost = freeShipping ? 0 : 250;
  const total = subtotal - discount + giftFee + shippingCost;

  const progressPercent = Math.min(100, (subtotal / shippingThreshold) * 100);

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);
  const deliveryDateString = estimatedDelivery.toLocaleDateString('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'THINC10') {
      setPromoApplied(true);
    } else {
      alert('Invalid code. Use "THINC10" for 10% off!');
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutSuccess(true);
    }, 1800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Slide-over Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-white border-l border-gray-200 flex flex-col justify-between shadow-2xl"
          >
            {/* Header with Apple-Style Step Indicator */}
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#0F172A] tracking-wide">Atelier Bag</h3>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">{items.length} items selected</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-slate-500 hover:text-black rounded-full hover:bg-gray-200 transition-colors"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Step indicator */}
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-2 border-t border-gray-200">
                <span className="text-[#0F172A] font-bold flex items-center gap-1">
                  <span className="w-4 h-4 rounded-full bg-[#0F172A] text-white font-bold flex items-center justify-center text-[9px]">1</span> Bag
                </span>
                <span className="h-[1px] flex-1 bg-gray-300 mx-2" />
                <span className="flex items-center gap-1">
                  <span className="w-4 h-4 rounded-full bg-gray-200 text-slate-600 flex items-center justify-center text-[9px]">2</span> Shipping
                </span>
                <span className="h-[1px] flex-1 bg-gray-300 mx-2" />
                <span className="flex items-center gap-1">
                  <span className="w-4 h-4 rounded-full bg-gray-200 text-slate-600 flex items-center justify-center text-[9px]">3</span> Payment
                </span>
              </div>
            </div>

            {/* Free Shipping Progress Bar */}
            <div className="px-6 py-3 bg-[#0F172A] text-white border-b border-gray-200">
              <p className="text-xs font-mono mb-1.5 flex justify-between">
                {freeShipping ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Truck size={13} /> Free Express Shipping Unlocked!
                  </span>
                ) : (
                  <span>Add ₹{(shippingThreshold - subtotal).toLocaleString()} more for Free Express Shipping</span>
                )}
              </p>
              <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-600 to-emerald-400 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Checkout Success View */}
            {checkoutSuccess ? (
              <div className="p-8 text-center flex flex-col items-center justify-center flex-1">
                <CheckCircle2 size={64} className="text-emerald-600 mb-4 animate-bounce" />
                <h4 className="text-2xl font-serif font-bold text-[#0F172A] mb-2">Order Confirmed!</h4>
                <p className="text-sm text-slate-600 mb-6 font-light">
                  Your THINC raw selvage denim order has been logged. Estimated delivery: <strong className="text-[#0F172A]">{deliveryDateString}</strong>.
                </p>
                <p className="text-xs font-mono text-slate-500 mb-8">Tracking Order #: THINC-IND-{Math.floor(100000 + Math.random() * 900000)}</p>
                <button
                  onClick={() => {
                    setCheckoutSuccess(false);
                    onClose();
                  }}
                  className="px-8 py-3 bg-[#0F172A] text-white text-xs uppercase font-bold tracking-widest rounded-xl shadow-md"
                >
                  Continue Browsing
                </button>
              </div>
            ) : (
              /* Item List */
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="text-center py-16 text-slate-400">
                    <p className="font-serif italic text-lg text-slate-600 mb-2">Your bag is currently empty.</p>
                    <p className="text-xs font-mono">Explore our raw selvage collection to select garments.</p>
                  </div>
                ) : (
                  <>
                    {items.map((item) => (
                      <div
                        key={`${item.product.id}-${item.size}`}
                        className="flex gap-4 p-3 bg-gray-50 border border-gray-200 rounded-xl relative group"
                      >
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-20 h-24 object-cover rounded-lg"
                        />

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <h4 className="text-sm font-serif font-semibold text-[#0F172A] leading-tight">
                                {item.product.name}
                              </h4>
                              <button
                                onClick={() => onRemoveItem(item.product.id, item.size)}
                                className="text-slate-400 hover:text-red-600 p-1"
                                title="Remove item"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="px-2 py-0.5 bg-gray-200 text-slate-800 font-mono text-[10px] font-bold uppercase rounded">
                                Size: {item.size}
                              </span>
                              <span className="text-[10px] font-mono text-slate-500">
                                {item.product.targetAudience}
                              </span>
                            </div>
                          </div>

                          <div className="flex justify-between items-end mt-2">
                            <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-1 bg-white">
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.size, -1)}
                                className="p-1 text-slate-600 hover:text-black"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="text-xs font-mono text-[#0F172A] font-bold w-4 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.size, 1)}
                                className="p-1 text-slate-600 hover:text-black"
                              >
                                <Plus size={12} />
                              </button>
                            </div>

                            <span className="text-sm font-mono font-bold text-[#0F172A]">
                              ₹{(item.product.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Delivery Estimate Box */}
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between text-xs font-mono text-slate-700">
                      <div className="flex items-center gap-2">
                        <Truck size={16} className="text-indigo-900" />
                        <span>Estimated Delivery:</span>
                      </div>
                      <span className="font-bold text-[#0F172A]">{deliveryDateString}</span>
                    </div>

                    {/* Signature Gift Packaging Option */}
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-700">
                        <Gift size={16} className="text-amber-600" />
                        <div>
                          <p className="font-bold text-[#0F172A]">Signature Gift Box (+₹350)</p>
                          <p className="text-[10px] text-slate-500">Includes wooden hanger & care oil</p>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={giftPackaging}
                        onChange={(e) => setGiftPackaging(e.target.checked)}
                        className="w-4 h-4 accent-red-600 cursor-pointer"
                      />
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Footer Summary & Apple-Grade CTAs */}
            {!checkoutSuccess && items.length > 0 && (
              <div className="p-6 border-t border-gray-200 bg-gray-50 space-y-4">
                {/* Promo Code Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo Code (Try: THINC10)"
                    className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs font-mono text-[#0F172A] outline-none focus:border-black"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="px-4 py-2 bg-[#0F172A] text-white hover:bg-slate-800 text-xs font-mono uppercase font-bold rounded-lg"
                  >
                    Apply
                  </button>
                </div>

                {promoApplied && (
                  <p className="text-[11px] font-mono text-emerald-700 font-bold flex items-center gap-1">
                    <Tag size={12} /> 10% VIP Atelier Discount Applied!
                  </p>
                )}

                {/* Totals Breakdown */}
                <div className="space-y-1.5 text-xs font-mono text-slate-600 pt-2 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>VIP Discount</span>
                      <span>-₹{discount.toLocaleString()}</span>
                    </div>
                  )}
                  {giftPackaging && (
                    <div className="flex justify-between text-amber-700">
                      <span>Signature Gift Packaging</span>
                      <span>+₹{giftFee}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Express Shipping</span>
                    <span>{freeShipping ? 'FREE' : `₹${shippingCost}`}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#0F172A] pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Security Badges */}
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1">
                  <span className="flex items-center gap-1"><Lock size={12} className="text-emerald-600" /> 256-Bit Encrypted</span>
                  <span className="flex items-center gap-1"><ShieldCheck size={12} className="text-amber-600" /> Lifetime Repair</span>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full py-4 bg-[#0F172A] hover:bg-slate-800 text-white text-xs uppercase font-bold tracking-[0.2em] rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  {isCheckingOut ? (
                    <span className="animate-pulse">Encrypting Order...</span>
                  ) : (
                    <>
                      Proceed to Apple Pay / UPI / Card <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
