import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, Truck, RotateCcw, CreditCard } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useStore();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#111111] text-white border-t border-neutral-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand & Philosophy */}
          <div className="space-y-4">
            <span className="font-heading font-extrabold text-2xl tracking-[0.25em] text-white uppercase block">
              SEEKANA
            </span>
            <p className="text-xs text-[#999999] leading-relaxed max-w-sm">
              A modern destination for carefully selected products designed around quality, style and everyday living.
            </p>
            <div className="pt-2 text-xs text-[#777777] font-mono">
              Designed on Odoo eCommerce
            </div>
          </div>

          {/* Column 2: SHOP */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-5">
              Shop
            </h4>
            <ul className="space-y-2.5 text-xs text-[#AAAAAA]">
              <li>
                <button
                  onClick={() => navigateTo('shop')}
                  className="hover:text-white transition-colors"
                >
                  All Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', undefined, 'new-arrivals')}
                  className="hover:text-white transition-colors"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', undefined, 'best-sellers')}
                  className="hover:text-white transition-colors"
                >
                  Best Sellers
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('categories')}
                  className="hover:text-white transition-colors"
                >
                  Categories
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: HELP */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-5">
              Help
            </h4>
            <ul className="space-y-2.5 text-xs text-[#AAAAAA]">
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shipping-policy')}
                  className="hover:text-white transition-colors"
                >
                  Shipping Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('return-policy')}
                  className="hover:text-white transition-colors"
                >
                  Returns & Refunds
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('terms')}
                  className="hover:text-white transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('privacy-policy')}
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: FOLLOW US & PAYMENTS */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-5">
              Follow Us
            </h4>
            <div className="flex items-center space-x-4 mb-8">
              <a
                href="#instagram"
                onClick={(e) => e.preventDefault()}
                className="text-xs text-[#AAAAAA] hover:text-white transition-colors"
              >
                Instagram
              </a>
              <span className="text-neutral-700">/</span>
              <a
                href="#facebook"
                onClick={(e) => e.preventDefault()}
                className="text-xs text-[#AAAAAA] hover:text-white transition-colors"
              >
                Facebook
              </a>
              <span className="text-neutral-700">/</span>
              <a
                href="#tiktok"
                onClick={(e) => e.preventDefault()}
                className="text-xs text-[#AAAAAA] hover:text-white transition-colors"
              >
                TikTok
              </a>
            </div>

            {/* Payment Methods Configured */}
            <div>
              <p className="text-[11px] uppercase tracking-wider text-[#777777] mb-2 font-medium">
                Accepted Payment Methods
              </p>
              <div className="flex flex-wrap gap-2 text-[11px] text-[#BBBBBB]">
                <span className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 text-xs">
                  Cash on Delivery
                </span>
                <span className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 text-xs">
                  Bank Transfer
                </span>
                <span className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 text-xs">
                  Direct Odoo Invoicing
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#777777] gap-4">
          <p>© {currentYear} SEEKANA. All Rights Reserved.</p>
          <div className="flex items-center space-x-6 text-[11px]">
            <button onClick={() => navigateTo('privacy-policy')} className="hover:text-[#AAAAAA]">
              Privacy
            </button>
            <button onClick={() => navigateTo('terms')} className="hover:text-[#AAAAAA]">
              Terms
            </button>
            <button onClick={() => navigateTo('shipping-policy')} className="hover:text-[#AAAAAA]">
              Shipping
            </button>
            <button onClick={() => navigateTo('return-policy')} className="hover:text-[#AAAAAA]">
              Returns
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
