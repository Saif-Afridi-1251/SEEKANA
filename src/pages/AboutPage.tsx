import React from 'react';
import { ArrowRight, Compass, Feather, CheckCircle, Shield } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <section className="bg-[#F7F7F5] border-b border-[#E8E8E8] py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#777777] font-mono block">
            About The Brand
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] tracking-tight">
            SEEKANA
          </h1>
          <p className="text-sm sm:text-base text-[#555555] leading-relaxed max-w-xl mx-auto">
            A modern shopping destination built around carefully selected products, quality and convenience.
          </p>
        </div>
      </section>

      {/* Brand Story & Philosophy */}
      <section className="py-20 border-b border-[#E8E8E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#777777] font-mono block">
                Brand Story
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#111111]">
                Simplicity, Proportion and Daily Purpose
              </h2>
              <div className="space-y-4 text-xs sm:text-sm text-[#555555] leading-relaxed">
                <p>
                  SEEKANA was founded on an enduring conviction: everyday objects and apparel should deliver quiet confidence, tactile excellence, and uncomplicated longevity.
                </p>
                <p>
                  In a marketplace overflowing with temporary trends and fragile materials, we focus strictly on what lasts. Each piece in our catalog is chosen with intentional discipline—utilizing natural wools, organic long-staple cotton, full-grain vegetable tanned leathers, and precision-engineered accents.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="aspect-[4/3] bg-neutral-200 border border-[#E8E8E8] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1200&q=80"
                  alt="SEEKANA Design Studio"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Our 3 Pillars: Our Approach, Quality, Customer Experience */}
      <section className="py-20 bg-[#F7F7F5] border-b border-[#E8E8E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#777777] font-mono block mb-1">
              Core Principles
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#111111]">
              How We Operate
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Approach */}
            <div className="bg-white border border-[#E8E8E8] p-8 space-y-4">
              <div className="w-10 h-10 border border-[#E8E8E8] bg-[#F7F7F5] flex items-center justify-center text-[#111111]">
                <Compass className="w-5 h-5 stroke-[1.5]" />
              </div>
              <h3 className="font-heading text-base font-bold uppercase tracking-wider text-[#111111]">
                Our Approach
              </h3>
              <p className="text-xs text-[#555555] leading-relaxed">
                We believe in curation over quantity. Instead of thousands of indistinguishable products, we curate a concise selection where each design earns its spot through functional utility and aesthetic restraint.
              </p>
            </div>

            {/* Quality */}
            <div className="bg-white border border-[#E8E8E8] p-8 space-y-4">
              <div className="w-10 h-10 border border-[#E8E8E8] bg-[#F7F7F5] flex items-center justify-center text-[#111111]">
                <Feather className="w-5 h-5 stroke-[1.5]" />
              </div>
              <h3 className="font-heading text-base font-bold uppercase tracking-wider text-[#111111]">
                Uncompromising Quality
              </h3>
              <p className="text-xs text-[#555555] leading-relaxed">
                We partner with dedicated artisan workshops who respect their craft. From reinforced seam bindings and heavy gauge hardware to natural vegetable tanning, our standard is durable longevity.
              </p>
            </div>

            {/* Customer Experience */}
            <div className="bg-white border border-[#E8E8E8] p-8 space-y-4">
              <div className="w-10 h-10 border border-[#E8E8E8] bg-[#F7F7F5] flex items-center justify-center text-[#111111]">
                <Shield className="w-5 h-5 stroke-[1.5]" />
              </div>
              <h3 className="font-heading text-base font-bold uppercase tracking-wider text-[#111111]">
                Customer Experience
              </h3>
              <p className="text-xs text-[#555555] leading-relaxed">
                Seamless shopping powered by standard Odoo order processing, swift doorstep delivery with Cash on Delivery options, and clear, respectful customer support at every turn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lifestyle Call To Action */}
      <section className="py-20 text-center bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-6">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#111111]">
            Experience SEEKANA
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
            Discover pieces created to integrate seamlessly into your day.
          </p>
          <div>
            <button
              onClick={() => navigateTo('shop')}
              className="px-8 py-4 bg-[#111111] text-white text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors"
            >
              Shop The Collection
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
