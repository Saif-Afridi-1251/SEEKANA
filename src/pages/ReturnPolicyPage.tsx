import React from 'react';
import { useStore } from '../context/StoreContext';

export const ReturnPolicyPage: React.FC = () => {
  const { settings, navigateTo } = useStore();

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="pb-6 border-b border-[#E8E8E8]">
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#777777] font-mono block mb-1">
            SEEKANA Care
          </span>
          <h1 className="font-heading text-3xl font-extrabold text-[#111111]">
            Return & Refund Policy
          </h1>
          <p className="text-xs text-[#777777] mt-1">
            7-Day Seamless Return & Exchange
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-[#555555] leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-[#111111]">
              1. 7-Day Exchange Window
            </h2>
            <p>
              We want you to feel fully satisfied with every SEEKANA design. You may request an exchange or return for any unwashed, unworn item with all original tags attached within 7 calendar days of physical delivery.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-[#111111]">
              2. How to Initiate a Return
            </h2>
            <p>
              Initiating a return is simple:
            </p>
            <ol className="list-decimal pl-5 space-y-1 text-xs">
              <li>Contact our concierge team via WhatsApp ({settings.storeWhatsApp}) or Email ({settings.storeEmail}) with your Odoo Sales Order number (e.g. SO00102).</li>
              <li>Specify your reason and whether you require an exchange in another size/color or a refund.</li>
              <li>Pack the item in its protective box; our logistics team will guide you through drop-off or pickup.</li>
            </ol>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-[#111111]">
              3. Refund Processing
            </h2>
            <p>
              Once your returned parcel is inspected at our central warehouse, refunds are disbursed within 3–5 business days via Bank Transfer directly to your account.
            </p>
          </section>

          <div className="pt-4">
            <button
              onClick={() => navigateTo('contact')}
              className="px-6 py-3 bg-[#111111] text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
            >
              Contact Support Desk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
