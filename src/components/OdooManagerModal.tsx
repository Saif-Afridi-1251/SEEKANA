import React, { useState } from 'react';
import { X, Check, Save, Settings, FileText, ShoppingBag, Truck, Tag, Shield } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PROMO_CODES } from '../data/mockData';

export const OdooManagerModal: React.FC = () => {
  const {
    isOdooManagerOpen,
    setIsOdooManagerOpen,
    settings,
    updateSettings,
    orders,
    showToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'website' | 'ecommerce' | 'orders'>('website');

  // Local form state
  const [announcementText, setAnnouncementText] = useState(settings.announcementText);
  const [announcementActive, setAnnouncementActive] = useState(settings.announcementActive);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(settings.freeShippingThreshold);
  const [standardShippingFee, setStandardShippingFee] = useState(settings.standardShippingFee);
  const [storePhone, setStorePhone] = useState(settings.storePhone);
  const [storeEmail, setStoreEmail] = useState(settings.storeEmail);
  const [storeWhatsApp, setStoreWhatsApp] = useState(settings.storeWhatsApp);

  if (!isOdooManagerOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      announcementText,
      announcementActive,
      freeShippingThreshold: Number(freeShippingThreshold),
      standardShippingFee: Number(standardShippingFee),
      storePhone,
      storeEmail,
      storeWhatsApp,
    });
    setIsOdooManagerOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsOdooManagerOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white w-full max-w-3xl border border-[#E8E8E8] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Odoo Backend Style Top Header */}
        <div className="bg-[#714B67] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center font-bold font-mono text-sm">
              odoo
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm tracking-wide">
                Odoo Website & eCommerce Functional Manager
              </h3>
              <p className="text-[11px] text-purple-200">
                SEEKANA · Live Storefront Parameters & Backend Sync
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOdooManagerOpen(false)}
            className="text-white/80 hover:text-white p-1 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E8E8E8] bg-[#F7F7F5] px-6">
          <button
            onClick={() => setActiveTab('website')}
            className={`py-3 px-4 text-xs font-semibold tracking-wider uppercase border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'website'
                ? 'border-[#714B67] text-[#714B67] bg-white'
                : 'border-transparent text-[#777777] hover:text-[#111111]'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Website Customizer</span>
          </button>
          <button
            onClick={() => setActiveTab('ecommerce')}
            className={`py-3 px-4 text-xs font-semibold tracking-wider uppercase border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'ecommerce'
                ? 'border-[#714B67] text-[#714B67] bg-white'
                : 'border-transparent text-[#777777] hover:text-[#111111]'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Delivery & Pricing Rules</span>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-4 text-xs font-semibold tracking-wider uppercase border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'border-[#714B67] text-[#714B67] bg-white'
                : 'border-transparent text-[#777777] hover:text-[#111111]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Odoo Sales Orders ({orders.length})</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'website' && (
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-2 flex items-center gap-2">
                  <span>Announcement Banner Configuration</span>
                </h4>
                <p className="text-xs text-[#777777] mb-4">
                  Manage the top announcement bar without touching frontend code. Can be enabled/disabled anytime.
                </p>

                <div className="space-y-4 bg-[#F7F7F5] p-4 border border-[#E8E8E8]">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="announcementActive"
                      checked={announcementActive}
                      onChange={(e) => setAnnouncementActive(e.target.checked)}
                      className="w-4 h-4 text-[#714B67] focus:ring-[#714B67] border-gray-300"
                    />
                    <label htmlFor="announcementActive" className="text-xs font-semibold text-[#111111] cursor-pointer">
                      Enable Announcement Bar on Storefront
                    </label>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#555555] mb-1">
                      Announcement Message Text
                    </label>
                    <input
                      type="text"
                      value={announcementText}
                      onChange={(e) => setAnnouncementText(e.target.value)}
                      className="w-full text-xs p-2.5 bg-white border border-[#E8E8E8] focus:border-[#714B67] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-2">
                  Store Contact & WhatsApp Configuration
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#F7F7F5] p-4 border border-[#E8E8E8]">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#555555] mb-1">
                      Store Contact Phone
                    </label>
                    <input
                      type="text"
                      value={storePhone}
                      onChange={(e) => setStorePhone(e.target.value)}
                      className="w-full text-xs p-2.5 bg-white border border-[#E8E8E8] focus:border-[#714B67] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#555555] mb-1">
                      Store Support Email
                    </label>
                    <input
                      type="email"
                      value={storeEmail}
                      onChange={(e) => setStoreEmail(e.target.value)}
                      className="w-full text-xs p-2.5 bg-white border border-[#E8E8E8] focus:border-[#714B67] focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#555555] mb-1">
                      WhatsApp Concierge Number (with Country Code)
                    </label>
                    <input
                      type="text"
                      value={storeWhatsApp}
                      onChange={(e) => setStoreWhatsApp(e.target.value)}
                      className="w-full text-xs p-2.5 bg-white border border-[#E8E8E8] focus:border-[#714B67] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#714B67] text-white text-xs uppercase tracking-wider font-semibold flex items-center gap-2 hover:bg-[#5f3c55] transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          )}

          {activeTab === 'ecommerce' && (
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-2 flex items-center gap-2">
                  <span>Odoo Delivery Methods & Rates</span>
                </h4>
                <p className="text-xs text-[#777777] mb-4">
                  Standard delivery charges are managed here dynamically rather than hard-coded into storefront markup.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#F7F7F5] p-4 border border-[#E8E8E8]">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#555555] mb-1">
                      Standard Delivery Fee (Rs.)
                    </label>
                    <input
                      type="number"
                      value={standardShippingFee}
                      onChange={(e) => setStandardShippingFee(Number(e.target.value))}
                      className="w-full text-xs p-2.5 bg-white border border-[#E8E8E8] focus:border-[#714B67] focus:outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#555555] mb-1">
                      Free Delivery Threshold (Rs.)
                    </label>
                    <input
                      type="number"
                      value={freeShippingThreshold}
                      onChange={(e) => setFreeShippingThreshold(Number(e.target.value))}
                      className="w-full text-xs p-2.5 bg-white border border-[#E8E8E8] focus:border-[#714B67] focus:outline-none font-mono"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-2 flex items-center gap-2">
                  <span>Configured Promotional Discount Codes</span>
                </h4>
                <div className="bg-[#F7F7F5] p-4 border border-[#E8E8E8] space-y-2">
                  {PROMO_CODES.map((promo) => (
                    <div key={promo.code} className="bg-white p-3 border border-[#E8E8E8] flex items-center justify-between">
                      <div>
                        <span className="font-mono text-xs font-bold text-[#111111] bg-neutral-100 px-2 py-0.5 border border-[#E8E8E8]">
                          {promo.code}
                        </span>
                        <p className="text-xs text-[#777777] mt-1">{promo.description}</p>
                      </div>
                      <span className="text-xs font-semibold text-[#714B67] font-mono">
                        {promo.discountPercent}% OFF
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#714B67] text-white text-xs uppercase tracking-wider font-semibold flex items-center gap-2 hover:bg-[#5f3c55] transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Update Pricing Rules</span>
                </button>
              </div>
            </form>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                    Backend Sales Orders (SO)
                  </h4>
                  <p className="text-xs text-[#777777]">
                    Orders created on SEEKANA automatically generate standard Odoo Sales Orders.
                  </p>
                </div>
              </div>

              <div className="border border-[#E8E8E8] overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F7F7F5] border-b border-[#E8E8E8] text-[#555555] uppercase text-[10px] tracking-wider font-semibold">
                    <tr>
                      <th className="py-2.5 px-3">Order Number</th>
                      <th className="py-2.5 px-3">Customer</th>
                      <th className="py-2.5 px-3">Date</th>
                      <th className="py-2.5 px-3">Total</th>
                      <th className="py-2.5 px-3">Payment</th>
                      <th className="py-2.5 px-3">Odoo Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E8E8]">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-neutral-50 transition-colors">
                        <td className="py-2.5 px-3 font-mono font-bold text-[#111111]">
                          {ord.odooOrderNumber}
                        </td>
                        <td className="py-2.5 px-3 text-[#171717]">
                          <p className="font-medium">{ord.customer.name}</p>
                          <p className="text-[10px] text-[#777777]">{ord.customer.city}, {ord.customer.province}</p>
                        </td>
                        <td className="py-2.5 px-3 text-[#777777] font-mono">
                          {ord.date}
                        </td>
                        <td className="py-2.5 px-3 font-mono font-semibold text-[#111111]">
                          Rs. {ord.total.toLocaleString()}
                        </td>
                        <td className="py-2.5 px-3 text-[#555555] capitalize">
                          {ord.paymentMethod.replace('_', ' ')}
                        </td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 border ${
                              ord.status === 'Delivered'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : ord.status === 'Sales Order'
                                ? 'bg-blue-50 text-blue-800 border-blue-200'
                                : 'bg-amber-50 text-amber-800 border-amber-200'
                            }`}
                          >
                            {ord.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
