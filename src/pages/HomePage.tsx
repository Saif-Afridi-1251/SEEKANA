import React, { useState } from 'react';
import { ArrowRight, Truck, ShieldCheck, RotateCcw, Headphones, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS, CATEGORIES } from '../data/mockData';

export const HomePage: React.FC = () => {
  const { navigateTo, showToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const newArrivals = PRODUCTS.filter((p) => p.isNew).slice(0, 4);
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    setNewsletterSubscribed(true);
    showToast('Thank you for subscribing to SEEKANA updates.');
  };

  return (
    <div className="space-y-0">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#F7F7F5] border-b border-[#E8E8E8] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#777777] block font-mono">
                The SEEKANA Collection 2026
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111111] leading-[1.1] tracking-tight">
                Find What Fits Your Style.
              </h1>
              <p className="text-sm sm:text-base text-[#555555] max-w-lg leading-relaxed font-sans">
                Discover carefully selected products from SEEKANA, combining quality, style and everyday convenience.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => navigateTo('shop')}
                  className="px-8 py-4 bg-[#111111] text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-neutral-800 transition-colors shadow-sm flex items-center gap-2 group"
                >
                  <span>SHOP NOW</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => navigateTo('categories')}
                  className="px-8 py-4 bg-transparent border border-[#111111] text-[#111111] text-xs font-bold uppercase tracking-[0.15em] hover:bg-white transition-colors"
                >
                  EXPLORE COLLECTION
                </button>
              </div>

              {/* Quiet Micro Trust Label */}
              <div className="pt-4 flex items-center gap-6 text-xs text-[#777777]">
                <span>Pure Materials</span>
                <span className="text-neutral-300">·</span>
                <span>Crafted Longevity</span>
                <span className="text-neutral-300">·</span>
                <span>Doorstep Delivery</span>
              </div>
            </div>

            {/* Hero Right Image */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] w-full overflow-hidden bg-neutral-200 border border-[#E8E8E8]">
                <img
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85"
                  alt="SEEKANA Minimalist Lifestyle"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SHOP BY CATEGORY */}
      <section className="py-20 bg-white border-b border-[#E8E8E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#E8E8E8]">
            <div>
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#777777] block font-mono mb-1">
                Curated Departments
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight">
                SHOP BY CATEGORY
              </h2>
            </div>
            <button
              onClick={() => navigateTo('categories')}
              className="mt-3 sm:mt-0 text-xs font-bold uppercase tracking-wider text-[#111111] hover:text-[#555555] flex items-center gap-1 group"
            >
              <span>View All Categories</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Category Cards (3-5 large responsive cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                onClick={() => navigateTo('shop', undefined, cat.slug)}
                className="group cursor-pointer flex flex-col bg-[#F7F7F5] border border-[#E8E8E8] transition-all duration-300"
              >
                <div className="aspect-[4/5] overflow-hidden bg-neutral-100 relative">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                </div>
                <div className="p-4 flex items-center justify-between bg-white border-t border-[#E8E8E8]">
                  <div>
                    <h3 className="font-heading text-sm font-semibold text-[#111111] group-hover:text-black">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-[#777777] mt-0.5">
                      {cat.itemCount} Items
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#777777] group-hover:text-[#111111] group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. NEW ARRIVALS */}
      <section className="py-20 bg-[#F7F7F5] border-b border-[#E8E8E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#E8E8E8]">
            <div>
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#777777] block font-mono mb-1">
                Just Released
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight">
                NEW ARRIVALS
              </h2>
            </div>
            <button
              onClick={() => navigateTo('shop', undefined, 'new-arrivals')}
              className="mt-3 sm:mt-0 text-xs font-bold uppercase tracking-wider text-[#111111] hover:text-[#555555] flex items-center gap-1 group"
            >
              <span>Explore New Arrivals</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newArrivals.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. PROMOTIONAL BANNER */}
      <section className="relative bg-[#111111] text-white overflow-hidden py-24 sm:py-28 border-b border-[#E8E8E8]">
        <div className="absolute inset-0 opacity-30 mix-blend-luminosity">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=80"
            alt="New Season Collection Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#CCCCCC] font-mono block">
            NEW SEASON / NEW COLLECTION
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-2xl mx-auto">
            Discover the latest from SEEKANA.
          </h2>
          <p className="text-sm text-[#AAAAAA] max-w-md mx-auto leading-relaxed">
            Thoughtfully designed essentials crafted with premium natural fibers and meticulous precision.
          </p>
          <div className="pt-4">
            <button
              onClick={() => navigateTo('shop')}
              className="px-8 py-4 bg-white text-[#111111] text-xs font-bold uppercase tracking-[0.15em] hover:bg-neutral-100 transition-colors shadow-lg"
            >
              SHOP COLLECTION
            </button>
          </div>
        </div>
      </section>

      {/* 5. BEST SELLERS */}
      <section className="py-20 bg-white border-b border-[#E8E8E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#E8E8E8]">
            <div>
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#777777] block font-mono mb-1">
                Customer Favorites
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight">
                BEST SELLERS
              </h2>
            </div>
            <button
              onClick={() => navigateTo('shop', undefined, 'best-sellers')}
              className="mt-3 sm:mt-0 text-xs font-bold uppercase tracking-wider text-[#111111] hover:text-[#555555] flex items-center gap-1 group"
            >
              <span>View All Best Sellers</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {bestSellers.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHY SHOP WITH SEEKANA */}
      <section className="py-16 bg-[#F7F7F5] border-b border-[#E8E8E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Feature 1 */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white border border-[#E8E8E8] text-[#111111]">
                <Truck className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div>
                <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                  FAST DELIVERY
                </h4>
                <p className="text-xs text-[#666666] leading-relaxed">
                  Complimentary delivery on orders above Rs. 5,000 across Pakistan.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white border border-[#E8E8E8] text-[#111111]">
                <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div>
                <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                  SECURE CHECKOUT
                </h4>
                <p className="text-xs text-[#666666] leading-relaxed">
                  Cash on Delivery or direct Bank Transfer verified via Odoo sales.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white border border-[#E8E8E8] text-[#111111]">
                <RotateCcw className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div>
                <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                  EASY RETURNS
                </h4>
                <p className="text-xs text-[#666666] leading-relaxed">
                  Simple 7-day exchange and return policy for complete peace of mind.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white border border-[#E8E8E8] text-[#111111]">
                <Headphones className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div>
                <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-[#111111] mb-1">
                  CUSTOMER SUPPORT
                </h4>
                <p className="text-xs text-[#666666] leading-relaxed">
                  Dedicated assistance via WhatsApp and email 6 days a week.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. NEWSLETTER */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#777777] block font-mono">
            SEEKANA Dispatch
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight">
            Stay Connected
          </h2>
          <p className="text-xs sm:text-sm text-[#666666] leading-relaxed max-w-md mx-auto">
            Be the first to discover new arrivals, offers and updates from SEEKANA.
          </p>

          {newsletterSubscribed ? (
            <div className="pt-4 flex items-center justify-center gap-2 text-xs font-semibold text-[#111111] bg-[#F7F7F5] border border-[#E8E8E8] py-3.5 px-6">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>You’re subscribed! Check your inbox for exclusive updates.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="pt-4 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-[#F7F7F5] border border-[#E8E8E8] text-xs text-[#111111] placeholder-[#888888] focus:outline-none focus:border-[#111111] transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#111111] text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors shadow-sm"
              >
                SUBSCRIBE
              </button>
            </form>
          )}

          <p className="text-[11px] text-[#888888] pt-2">
            No spam. Unsubscribe at any time. Standard Odoo newsletter integration.
          </p>
        </div>
      </section>
    </div>
  );
};
