import React from 'react';
import { CheckCircle2, Package, ArrowRight, Printer, User, Home } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const OrderConfirmationPage: React.FC = () => {
  const { currentPlacedOrder, orders, navigateTo } = useStore();

  const order = currentPlacedOrder || orders[0];

  if (!order) {
    return (
      <div className="max-w-xl mx-auto py-24 px-4 text-center">
        <h2 className="font-heading text-lg font-bold text-[#111111]">
          No active order found
        </h2>
        <button
          onClick={() => navigateTo('shop')}
          className="mt-4 px-6 py-2.5 bg-[#111111] text-white text-xs uppercase tracking-wider font-semibold"
        >
          Explore Shop
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Success Banner */}
        <div className="text-center space-y-3 pb-10 border-b border-[#E8E8E8]">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
            <CheckCircle2 className="w-8 h-8 stroke-[1.75]" />
          </div>
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#777777] font-mono block">
            Thank You For Your Order
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
            Order Confirmed
          </h1>
          <p className="text-xs sm:text-sm text-[#555555] max-w-md mx-auto">
            Your Odoo sales order <strong className="font-mono text-[#111111]">{order.odooOrderNumber}</strong> has been generated and queued for packaging.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="mt-10 border border-[#E8E8E8] bg-[#F7F7F5] p-6 sm:p-8 space-y-8">
          
          {/* Metadata Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-[#E8E8E8] text-xs">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-[#777777]">Order Reference</p>
              <p className="font-mono font-bold text-sm text-[#111111] mt-0.5">{order.odooOrderNumber}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-[#777777]">Date</p>
              <p className="font-mono text-[#111111] mt-0.5">{order.date}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-[#777777]">Payment Method</p>
              <p className="capitalize font-medium text-[#111111] mt-0.5">
                {order.paymentMethod.replace(/_/g, ' ')}
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-[#777777]">Odoo Status</p>
              <p className="inline-block font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-blue-50 text-blue-800 border border-blue-200 mt-0.5">
                {order.status}
              </p>
            </div>
          </div>

          {/* Ordered Line Items */}
          <div>
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-[#111111] mb-4">
              Items Ordered
            </h3>
            <div className="border border-[#E8E8E8] bg-white divide-y divide-[#E8E8E8]">
              {order.items.map((item, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-16 object-cover border border-[#E8E8E8] bg-[#F7F7F5]"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#111111] truncate">{item.name}</p>
                      <p className="text-[11px] text-[#777777]">
                        {item.color} · {item.size} · Qty {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#111111]">
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Totals */}
          <div className="space-y-2 pt-2 border-t border-[#E8E8E8] text-xs">
            <div className="flex justify-between text-[#555555]">
              <span>Subtotal</span>
              <span className="font-mono text-[#111111]">Rs. {order.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-[#555555]">
              <span>Delivery Fee ({order.deliveryMethod})</span>
              <span className="font-mono text-[#111111]">
                {order.deliveryFee === 0 ? 'FREE' : `Rs. ${order.deliveryFee.toLocaleString()}`}
              </span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-800 font-medium">
                <span>Promotional Discount ({order.promoCode || 'PROMO'})</span>
                <span className="font-mono">- Rs. {order.discount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-bold text-[#111111] pt-3 border-t border-[#E8E8E8]">
              <span>Total Payable</span>
              <span className="font-mono">Rs. {order.total.toLocaleString()}</span>
            </div>
          </div>

          {/* Shipping & Payment Destination */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[#E8E8E8] text-xs">
            <div>
              <h4 className="font-bold uppercase tracking-wider text-[#111111] mb-1">
                Delivery Address
              </h4>
              <p className="text-[#555555] font-medium">{order.customer.name}</p>
              <p className="text-[#666666]">{order.customer.address}</p>
              <p className="text-[#666666]">{order.customer.city}, {order.customer.province}</p>
              <p className="text-[#666666]">{order.customer.phone}</p>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-wider text-[#111111] mb-1">
                Payment Guidance
              </h4>
              {order.paymentMethod === 'cash_on_delivery' ? (
                <p className="text-[#666666] leading-relaxed">
                  Your order is confirmed as <strong>Cash on Delivery</strong>. Please have Rs. {order.total.toLocaleString()} in cash ready for the courier.
                </p>
              ) : (
                <div className="text-[#666666] space-y-1 font-mono text-[11px]">
                  <p>Bank: Meezan Bank Ltd</p>
                  <p>Title: SEEKANA CURATED LIVING</p>
                  <p>A/C: 02010108849201</p>
                  <p className="font-sans text-[10px] text-[#888888]">
                    Send payment screenshot with Ref: {order.odooOrderNumber} via WhatsApp.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <button
            onClick={() => window.print()}
            className="text-xs text-[#777777] hover:text-[#111111] flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Order Receipt</span>
          </button>

          <div className="flex gap-3">
            <button
              onClick={() => navigateTo('account')}
              className="px-6 py-3 bg-[#F7F7F5] border border-[#E8E8E8] text-xs font-semibold uppercase tracking-wider text-[#111111] hover:bg-white flex items-center gap-2"
            >
              <User className="w-3.5 h-3.5" />
              <span>View in Customer Portal</span>
            </button>
            <button
              onClick={() => navigateTo('shop')}
              className="px-6 py-3 bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 flex items-center gap-2"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
