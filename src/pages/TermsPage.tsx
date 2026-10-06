import React from 'react';
import { useStore } from '../context/StoreContext';

export const TermsPage: React.FC = () => {
  const { settings } = useStore();

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="pb-6 border-b border-[#E8E8E8]">
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#777777] font-mono block mb-1">
            SEEKANA Legal
          </span>
          <h1 className="font-heading text-3xl font-extrabold text-[#111111]">
            Terms & Conditions
          </h1>
          <p className="text-xs text-[#777777] mt-1">
            Effective as of 2026
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-[#555555] leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-[#111111]">
              1. General Store Terms
            </h2>
            <p>
              By accessing the SEEKANA website and placing orders, you agree to comply with and be bound by these standard terms. We reserve the right to review product pricing and catalog availability periodically in accordance with standard Odoo inventory governance.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-[#111111]">
              2. Orders & Quotations
            </h2>
            <p>
              Placing an order creates a formal Sales Order quotation. Orders are confirmed once verified by our logistics team. For Cash on Delivery orders, confirmation may involve a brief telephone or SMS verification.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-[#111111]">
              3. Pricing & Promotions
            </h2>
            <p>
              All prices are listed in Pakistani Rupees (Rs.). Promotional codes (such as WELCOME10) may not be combined with other promotional discounts unless explicitly specified.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-[#111111]">
              4. Governing Law & Inquiries
            </h2>
            <p>
              These terms are governed by the applicable commercial laws of Pakistan. For inquiries, contact <strong className="text-[#111111]">{settings.storeEmail}</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
