import React from 'react';
import { useStore } from '../context/StoreContext';

export const PrivacyPolicyPage: React.FC = () => {
  const { settings } = useStore();

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="pb-6 border-b border-[#E8E8E8]">
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#777777] font-mono block mb-1">
            SEEKANA Legal
          </span>
          <h1 className="font-heading text-3xl font-extrabold text-[#111111]">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#777777] mt-1">
            Last Updated: October 2026
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-[#555555] leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-[#111111]">
              1. Information We Collect
            </h2>
            <p>
              When you purchase products or browse SEEKANA, we collect personal details you voluntarily provide to us, such as your full name, email address, physical delivery address, and contact telephone number. This information is processed securely through standard Odoo eCommerce order workflows.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-[#111111]">
              2. How We Use Your Information
            </h2>
            <p>
              We use your information exclusively to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Process and fulfill your sales orders and dispatch deliveries</li>
              <li>Send transaction receipts and dispatch notifications via SMS or email</li>
              <li>Respond to inquiries submitted to our customer care team</li>
              <li>Provide optional updates regarding new arrivals when subscribed to our newsletter</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-[#111111]">
              3. Protection & Third Parties
            </h2>
            <p>
              We do not sell, rent, or trade your personal data. Your delivery address and telephone number are shared solely with authorized courier logistics partners for physical parcel transport.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-[#111111]">
              4. Contact Our Data Desk
            </h2>
            <p>
              For privacy-related questions or data updates, please contact us at <strong className="text-[#111111]">{settings.storeEmail}</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
