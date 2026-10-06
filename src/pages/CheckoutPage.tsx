import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Banknote, 
  Building, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CustomerInfo } from '../types';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    deliveryFee,
    discountAmount,
    cartTotal,
    appliedPromo,
    placeOrder,
    navigateTo,
    settings,
  } = useStore();

  // Form State
  const [customer, setCustomer] = useState<CustomerInfo>({
    name: 'Hamza Malik',
    email: 'hamza.malik@example.com',
    phone: '+92 300 4567890',
    country: 'Pakistan',
    province: 'Punjab',
    city: 'Lahore',
    address: 'Suit 14, Phase 5, DHA',
    postalCode: '54000',
    orderNotes: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'cash_on_delivery' | 'bank_transfer'>('cash_on_delivery');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h2 className="font-heading text-xl font-bold text-[#111111]">
          No items in cart to checkout
        </h2>
        <button
          onClick={() => navigateTo('shop')}
          className="mt-4 px-6 py-3 bg-[#111111] text-white text-xs font-bold uppercase tracking-wider"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!customer.name.trim()) errors.name = 'Full name is required';
    if (!customer.email.trim() || !customer.email.includes('@')) errors.email = 'Valid email is required';
    if (!customer.phone.trim()) errors.phone = 'Phone number is required';
    if (!customer.address.trim()) errors.address = 'Street address is required';
    if (!customer.city.trim()) errors.city = 'City is required';
    if (!customer.province.trim()) errors.province = 'Province is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const deliveryMethodTitle =
        deliveryFee === 0
          ? 'Free Delivery (Above Rs. 5,000)'
          : `Standard Delivery (Rs. ${settings.standardShippingFee})`;

      placeOrder(customer, deliveryMethodTitle, paymentMethod);
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-6">
          <button
            onClick={() => navigateTo('cart')}
            className="text-xs text-[#777777] hover:text-[#111111] flex items-center gap-1.5 font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Shopping Cart</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Checkout Form: Odoo Steps */}
          <div className="flex-1 space-y-10">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#777777] font-mono block mb-1">
                Standard Odoo Checkout Flow
              </span>
              <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">
                Complete Your Order
              </h1>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-10">
              
              {/* Step 1: Customer & Delivery Address */}
              <div className="border border-[#E8E8E8] p-6 space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-[#E8E8E8]">
                  <span className="w-6 h-6 rounded-full bg-[#111111] text-white text-xs font-bold flex items-center justify-center font-mono">
                    1
                  </span>
                  <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-[#111111]">
                    Customer & Shipping Address
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#555555] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={customer.name}
                      onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                      className={`w-full text-xs p-3 border ${
                        formErrors.name ? 'border-[#9E2A2B]' : 'border-[#E8E8E8]'
                      } focus:outline-none focus:border-[#111111]`}
                    />
                    {formErrors.name && (
                      <p className="text-[11px] text-[#9E2A2B] mt-1">{formErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#555555] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={customer.email}
                      onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                      className={`w-full text-xs p-3 border ${
                        formErrors.email ? 'border-[#9E2A2B]' : 'border-[#E8E8E8]'
                      } focus:outline-none focus:border-[#111111]`}
                    />
                    {formErrors.email && (
                      <p className="text-[11px] text-[#9E2A2B] mt-1">{formErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#555555] mb-1">
                      Phone Number * (for delivery SMS)
                    </label>
                    <input
                      type="tel"
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      className={`w-full text-xs p-3 border ${
                        formErrors.phone ? 'border-[#9E2A2B]' : 'border-[#E8E8E8]'
                      } focus:outline-none focus:border-[#111111]`}
                    />
                    {formErrors.phone && (
                      <p className="text-[11px] text-[#9E2A2B] mt-1">{formErrors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#555555] mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      disabled
                      value={customer.country}
                      className="w-full text-xs p-3 border border-[#E8E8E8] bg-[#F7F7F5] text-[#555555] cursor-not-allowed"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#555555] mb-1">
                      Street Address & Apartment / House # *
                    </label>
                    <input
                      type="text"
                      value={customer.address}
                      onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                      className={`w-full text-xs p-3 border ${
                        formErrors.address ? 'border-[#9E2A2B]' : 'border-[#E8E8E8]'
                      } focus:outline-none focus:border-[#111111]`}
                    />
                    {formErrors.address && (
                      <p className="text-[11px] text-[#9E2A2B] mt-1">{formErrors.address}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#555555] mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      value={customer.city}
                      onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                      className={`w-full text-xs p-3 border ${
                        formErrors.city ? 'border-[#9E2A2B]' : 'border-[#E8E8E8]'
                      } focus:outline-none focus:border-[#111111]`}
                    />
                    {formErrors.city && (
                      <p className="text-[11px] text-[#9E2A2B] mt-1">{formErrors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#555555] mb-1">
                      Province / State *
                    </label>
                    <input
                      type="text"
                      value={customer.province}
                      onChange={(e) => setCustomer({ ...customer, province: e.target.value })}
                      className={`w-full text-xs p-3 border ${
                        formErrors.province ? 'border-[#9E2A2B]' : 'border-[#E8E8E8]'
                      } focus:outline-none focus:border-[#111111]`}
                    />
                    {formErrors.province && (
                      <p className="text-[11px] text-[#9E2A2B] mt-1">{formErrors.province}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#555555] mb-1">
                      Special Delivery Notes (Optional)
                    </label>
                    <input
                      type="text"
                      value={customer.orderNotes || ''}
                      onChange={(e) => setCustomer({ ...customer, orderNotes: e.target.value })}
                      placeholder="e.g. Ring bell or leave at front reception"
                      className="w-full text-xs p-3 border border-[#E8E8E8] focus:outline-none focus:border-[#111111]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Delivery Method */}
              <div className="border border-[#E8E8E8] p-6 space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-[#E8E8E8]">
                  <span className="w-6 h-6 rounded-full bg-[#111111] text-white text-xs font-bold flex items-center justify-center font-mono">
                    2
                  </span>
                  <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-[#111111]">
                    Delivery Method
                  </h2>
                </div>

                <div className="p-4 bg-[#F7F7F5] border border-[#E8E8E8] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-[#111111] stroke-[1.5]" />
                    <div>
                      <p className="text-xs font-bold text-[#111111]">
                        {deliveryFee === 0
                          ? 'Complimentary Free Delivery'
                          : 'Standard Nationwide Delivery'}
                      </p>
                      <p className="text-[11px] text-[#777777]">
                        Tracked door-to-door courier service (2–4 business days)
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold font-mono text-[#111111]">
                    {deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee.toLocaleString()}`}
                  </span>
                </div>
              </div>

              {/* Step 3: Payment Method */}
              <div className="border border-[#E8E8E8] p-6 space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-[#E8E8E8]">
                  <span className="w-6 h-6 rounded-full bg-[#111111] text-white text-xs font-bold flex items-center justify-center font-mono">
                    3
                  </span>
                  <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-[#111111]">
                    Payment Method
                  </h2>
                </div>

                <div className="space-y-3">
                  {/* Option A: Cash on Delivery */}
                  <label
                    className={`block p-4 border cursor-pointer transition-all ${
                      paymentMethod === 'cash_on_delivery'
                        ? 'border-[#111111] bg-[#F7F7F5]'
                        : 'border-[#E8E8E8] hover:border-[#CCCCCC]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'cash_on_delivery'}
                          onChange={() => setPaymentMethod('cash_on_delivery')}
                          className="w-4 h-4 text-[#111111] focus:ring-[#111111]"
                        />
                        <div className="flex items-center gap-2">
                          <Banknote className="w-4 h-4 text-[#111111]" />
                          <span className="text-xs font-bold text-[#111111]">
                            Cash on Delivery (COD)
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] text-[#777777]">Pay upon physical parcel receipt</span>
                    </div>

                    {paymentMethod === 'cash_on_delivery' && (
                      <p className="text-[11px] text-[#555555] mt-3 pt-3 border-t border-[#E8E8E8]">
                        Please keep the exact amount (Rs. {cartTotal.toLocaleString()}) ready in cash for the courier agent upon parcel arrival.
                      </p>
                    )}
                  </label>

                  {/* Option B: Bank Transfer */}
                  <label
                    className={`block p-4 border cursor-pointer transition-all ${
                      paymentMethod === 'bank_transfer'
                        ? 'border-[#111111] bg-[#F7F7F5]'
                        : 'border-[#E8E8E8] hover:border-[#CCCCCC]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'bank_transfer'}
                          onChange={() => setPaymentMethod('bank_transfer')}
                          className="w-4 h-4 text-[#111111] focus:ring-[#111111]"
                        />
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-[#111111]" />
                          <span className="text-xs font-bold text-[#111111]">
                            Direct Bank Transfer / Wire
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] text-[#777777]">Online banking / ATM transfer</span>
                    </div>

                    {paymentMethod === 'bank_transfer' && (
                      <div className="text-xs text-[#555555] mt-3 pt-3 border-t border-[#E8E8E8] space-y-1.5 font-mono">
                        <p className="font-bold text-[#111111] font-sans">
                          SEEKANA Corporate Account Details:
                        </p>
                        <p>Bank: Meezan Bank Ltd.</p>
                        <p>Account Title: SEEKANA CURATED LIVING</p>
                        <p>Account #: 02010108849201</p>
                        <p>IBAN: PK45MEZN0002010108849201</p>
                        <p className="text-[10px] text-[#777777] font-sans pt-1">
                          Please use your Odoo Sales Order number as payment reference.
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Submit CTA */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#111111] text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Processing Sales Order...</span>
                  ) : (
                    <span>Confirm & Place Order (Rs. {cartTotal.toLocaleString()})</span>
                  )}
                </button>
                <p className="text-[11px] text-[#777777] text-center mt-3">
                  By confirming, an official Odoo sales order quotation will be registered.
                </p>
              </div>

            </form>
          </div>

          {/* Right Side: Order Summary Sticky Box */}
          <div className="w-full lg:w-96 flex-shrink-0">
            <div className="bg-[#F7F7F5] border border-[#E8E8E8] p-6 sticky top-28 space-y-6">
              <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-[#111111] pb-3 border-b border-[#E8E8E8]">
                Summary ({cart.reduce((a, b) => a + b.quantity, 0)} Items)
              </h3>

              {/* Line items mini list */}
              <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3 text-xs">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-16 object-cover border border-[#E8E8E8] bg-white flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#111111] truncate">{item.name}</p>
                      <p className="text-[11px] text-[#777777]">
                        {item.color} · {item.size} · Qty {item.quantity}
                      </p>
                      <p className="font-mono text-xs font-bold text-[#111111] mt-0.5">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Calculation Breakdown */}
              <div className="space-y-2 pt-4 border-t border-[#E8E8E8] text-xs">
                <div className="flex justify-between text-[#555555]">
                  <span>Subtotal</span>
                  <span className="font-mono text-[#111111]">Rs. {cartSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#555555]">
                  <span>Delivery</span>
                  <span className="font-mono text-[#111111]">
                    {deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee.toLocaleString()}`}
                  </span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-emerald-800 font-medium">
                    <span>Discount ({appliedPromo.code})</span>
                    <span className="font-mono">- Rs. {discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-[#111111] pt-3 border-t border-[#E8E8E8]">
                  <span>Total Due</span>
                  <span className="font-mono">Rs. {cartTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-[#777777] space-y-1">
                <p className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Odoo Order Protection</span>
                </p>
                <p>Tracked delivery & 7-day hassle-free exchange.</p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
