import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Globe, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#0F172A] text-white pt-20 pb-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Newsletter Section */}
        <div className="bg-[#1E293B] p-8 md:p-12 rounded-3xl border border-slate-700 mb-16 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div>
            <span className="text-xs uppercase font-mono tracking-[0.3em] text-red-500 mb-2 block font-bold">
              THINC VIP Membership
            </span>
            <h3 className="text-3xl font-serif font-bold text-white mb-2">Join the Private Drop List</h3>
            <p className="text-sm text-slate-300 font-light">
              Receive private invitations to limited Indian denim drops and brand releases.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
            {subscribed ? (
              <div className="flex items-center gap-2 px-6 py-4 bg-emerald-600/20 border border-emerald-500 text-emerald-400 rounded-xl font-mono text-xs">
                <CheckCircle2 size={16} /> VIP Invitation Sent! Check your inbox.
              </div>
            ) : (
              <>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  required
                  className="px-5 py-4 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white outline-none focus:border-white min-w-[280px]"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-white text-[#0F172A] text-xs font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  Subscribe <ArrowRight size={14} />
                </button>
              </>
            )}
          </form>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 pb-16 border-b border-slate-800 text-slate-300">
          <div className="col-span-2">
            <h4 className="font-serif font-bold text-2xl tracking-[0.25em] text-white mb-4">THINC</h4>
            <p className="text-xs text-slate-400 font-light leading-relaxed max-w-sm mb-6">
              Homegrown Indian Raw Selvage Denim Brand. Premium jeans engineered for modern confidence.
            </p>
            <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
              <MapPin size={14} className="text-red-500" />
              <span>Crafted & Designed in India</span>
            </div>
          </div>

          <div>
            <h5 className="text-xs font-mono uppercase tracking-widest text-white font-bold mb-4">Collections</h5>
            <ul className="space-y-2.5 text-xs text-slate-400 font-light">
              <li><a href="#collection" className="hover:text-white transition-colors">Men's Raw Denim</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">Women's Curved Fits</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">Kids' Denim</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">Trucker Jackets & Shackets</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-mono uppercase tracking-widest text-white font-bold mb-4">Craftsmanship</h5>
            <ul className="space-y-2.5 text-xs text-slate-400 font-light">
              <li><a href="#inspector" className="hover:text-white transition-colors">Macro Fabric Loupe</a></li>
              <li><a href="#fit-studio" className="hover:text-white transition-colors">Fit Guide</a></li>
              <li><a href="#craftsmanship" className="hover:text-white transition-colors">Raw Denim Process</a></li>
              <li><a href="#craftsmanship" className="hover:text-white transition-colors">Lifetime Repair Guarantee</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-mono uppercase tracking-widest text-white font-bold mb-4">Client Care</h5>
            <ul className="space-y-2.5 text-xs text-slate-400 font-light">
              <li><a href="#" className="hover:text-white transition-colors">Free Shipping across India</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Easy Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Denim Care Manual</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Concierge</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} THINC DENIM. CRAFTED IN INDIA.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><Globe size={13} /> India / INR (₹)</span>
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
