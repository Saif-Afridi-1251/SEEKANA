import React, { useState } from 'react';
import { 
  User, 
  Package, 
  MapPin, 
  RotateCcw, 
  ChevronRight, 
  FileText, 
  ExternalLink,
  CheckCircle,
  Truck
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Order } from '../types';

export const CustomerPortalPage: React.FC = () => {
  const { orders, reorder, navigateTo } = useStore();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const activeUser = {
    name: 'Hamza Malik',
    email: 'hamza.malik@example.com',
    phone: '+92 300 4567890',
    memberSince: 'August 2026',
    defaultAddress: 'Suit 14, Phase 5, DHA, Lahore, Punjab',
  };

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Portal Header */}
        <div className="pb-8 mb-8 border-b border-[#E8E8E8] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#777777] font-mono block mb-1">
              Odoo Customer Portal
            </span>
            <h1 className="font-heading text-3xl font-extrabold text-[#111111] tracking-tight">
              My Account & Quotations
            </h1>
          </div>
          <div className="text-xs text-[#777777] flex items-center gap-2">
            <span>Signed in as <strong className="text-[#111111]">{activeUser.name}</strong></span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Account Profile Summary */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#F7F7F5] border border-[#E8E8E8] p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#111111] text-white flex items-center justify-center font-bold text-base">
                  HM
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm text-[#111111]">
                    {activeUser.name}
                  </h3>
                  <p className="text-xs text-[#777777]">{activeUser.email}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8E8E8] space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#777777] flex-shrink-0 mt-0.5" />
                  <span className="text-[#555555]">{activeUser.defaultAddress}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#777777] flex-shrink-0" />
                  <span className="text-[#555555]">
                    Total Orders Placed: <strong className="text-[#111111]">{orders.length}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Policies Help */}
            <div className="border border-[#E8E8E8] p-6 space-y-3 text-xs">
              <h4 className="font-heading font-bold uppercase tracking-wider text-[#111111]">
                Quick Concierge
              </h4>
              <p className="text-[#666666]">
                Need to modify an active order or arrange an exchange? Contact our team with your Sales Order reference number.
              </p>
              <button
                onClick={() => navigateTo('contact')}
                className="text-xs font-semibold text-[#111111] hover:underline flex items-center gap-1 pt-1"
              >
                <span>Open Support Ticket</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Order History Table */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E8]">
              <h2 className="font-heading text-base font-bold uppercase tracking-wider text-[#111111]">
                Sales Orders & History
              </h2>
              <span className="text-xs text-[#777777] font-mono">
                {orders.length} Records
              </span>
            </div>

            {orders.length === 0 ? (
              <div className="p-12 text-center border border-[#E8E8E8] bg-[#F7F7F5]">
                <Package className="w-10 h-10 text-[#CCCCCC] mx-auto mb-2" />
                <p className="font-heading font-bold text-sm text-[#111111]">No order history found</p>
                <p className="text-xs text-[#777777] mt-1">Start by browsing our shop.</p>
                <button
                  onClick={() => navigateTo('shop')}
                  className="mt-4 px-6 py-2.5 bg-[#111111] text-white text-xs uppercase tracking-wider font-semibold"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              <div className="border border-[#E8E8E8] overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F7F7F5] border-b border-[#E8E8E8] text-[#555555] uppercase text-[10px] tracking-wider font-semibold">
                    <tr>
                      <th className="py-3 px-4">Sales Order #</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Items</th>
                      <th className="py-3 px-4">Total</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E8E8]">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-[#FAF9F7] transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-[#111111]">
                          {ord.odooOrderNumber}
                        </td>
                        <td className="py-3.5 px-4 text-[#777777] font-mono">
                          {ord.date}
                        </td>
                        <td className="py-3.5 px-4 text-[#555555]">
                          {ord.items.length} item(s)
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-[#111111]">
                          Rs. {ord.total.toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4">
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
                        <td className="py-3.5 px-4 text-right space-x-2">
                          <button
                            onClick={() => setSelectedOrder(ord)}
                            className="px-2.5 py-1 text-xs border border-[#CCCCCC] hover:border-[#111111] text-[#111111] transition-colors"
                          >
                            Details
                          </button>
                          <button
                            onClick={() => reorder(ord)}
                            className="px-2.5 py-1 text-xs bg-[#111111] text-white hover:bg-neutral-800 transition-colors inline-flex items-center gap-1"
                            title="Reorder items into cart"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Reorder</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Selected Order Detail Modal / Drilldown */}
            {selectedOrder && (
              <div className="border border-[#111111] p-6 bg-[#F7F7F5] mt-6 space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E8]">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#111111]" />
                    <h3 className="font-heading font-bold text-sm text-[#111111]">
                      Order Details: {selectedOrder.odooOrderNumber}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-xs text-[#777777] hover:text-[#111111] underline"
                  >
                    Close Details
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="text-[#777777]">Destination Address:</p>
                    <p className="font-medium text-[#111111] mt-0.5">{selectedOrder.customer.address}</p>
                    <p className="text-[#666666]">{selectedOrder.customer.city}, {selectedOrder.customer.province}</p>
                  </div>
                  <div>
                    <p className="text-[#777777]">Payment & Method:</p>
                    <p className="font-medium text-[#111111] capitalize mt-0.5">
                      {selectedOrder.paymentMethod.replace(/_/g, ' ')} ({selectedOrder.paymentStatus})
                    </p>
                    <p className="text-[#666666]">{selectedOrder.deliveryMethod}</p>
                  </div>
                </div>

                <div className="border border-[#E8E8E8] bg-white divide-y divide-[#E8E8E8] mt-3">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="p-3 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-12 object-cover border border-[#E8E8E8]"
                        />
                        <div>
                          <p className="font-semibold text-[#111111]">{item.name}</p>
                          <p className="text-[11px] text-[#777777]">{item.color} · {item.size} · Qty {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-mono font-bold text-[#111111]">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs font-bold text-[#111111]">
                    Total Amount: Rs. {selectedOrder.total.toLocaleString()}
                  </span>
                  <button
                    onClick={() => reorder(selectedOrder)}
                    className="px-4 py-2 bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reorder All Items</span>
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
