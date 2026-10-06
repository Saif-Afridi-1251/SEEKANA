import React from 'react';
import { useStore } from '../context/StoreContext';

export const ShippingPolicyPage: React.FC = () => {
  const { settings } = useStore();

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="pb-6 border-b border-[#E8E8E8]">
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#777777] font-mono block mb-1">
            SEEKANA Logistics
          </span>
          <h1 className="font-heading text-3xl font-extrabold text-[#111111]">
            Shipping Policy
          </h1>
          <p className="text-xs text-[#777777] mt-1">
            Nationwide Delivery Across Pakistan
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-[#555555] leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-[#111111]">
              1. Delivery Methods & Charges
            </h2>
            <div className="bg-[#F7F7F5] border border-[#E8E8E8] p-4 space-y-2 text-xs">
              <div className="flex justify-between font-bold text-[#111111]">
                <span>Standard Delivery</span>
                <span className="font-mono">Rs. {settings.standardShippingFee}</span>
              </div>
              <p className="text-[#666666]">
                Applies to all domestic orders below Rs. {settings.freeShippingThreshold.toLocaleString()}.
              </p>
              <div className="flex justify-between font-bold text-[#111111] pt-2 border-t border-[#E8E8E8]">
                <span>Free Delivery</span>
                <span className="font-mono text-emerald-800">FREE</span>
              </div>
              <p className="text-[#666666]">
                Automatically applied at checkout on all orders of Rs. {settings.freeShippingThreshold.toLocaleString()} or above.
              </p>
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-[#111111]">
              2. Delivery Timelines
            </h2>
            <p>
              Once your Odoo sales order is verified, processing takes 24 business hours:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li><strong>Lahore, Karachi, Islamabad & Rawalpindi:</strong> 2 to 3 business days.</li>
              <li><strong>Other Cities & Outlying Districts:</strong> 3 to 5 business days.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-[#111111]">
              3. Tracking Your Consignment
            </h2>
            <p>
              Once dispatched, you will receive courier tracking information via SMS, and live fulfillment milestones will update automatically within your SEEKANA Customer Account portal.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
