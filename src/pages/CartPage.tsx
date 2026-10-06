import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  Heart, 
  ArrowRight, 
  ArrowLeft, 
  Tag, 
  Check, 
  X 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/mockData';

export const CartPage: React.FC = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    deliveryFee,
    discountAmount,
    cartTotal,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    navigateTo,
    toggleWishlist,
    settings,
  } = useStore();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (!promoInput.trim()) return;

    const res = applyPromoCode(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoInput('');
    }
  };

  const handleSaveToWishlist = (productId: string, cartItemId: string) => {
    toggleWishlist(productId);
    removeFromCart(cartItemId);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 mx-auto bg-[#F7F7F5] border border-[#E8E8E8] flex items-center justify-center">
            <ShoppingBag className="w-8 h-8 text-[#999999] stroke-[1.5]" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-[#111111]">
            Your shopping cart is empty
          </h1>
          <p className="text-xs sm:text-sm text-[#777777] leading-relaxed">
            There are currently no items in your cart. Discover thoughtfully curated pieces from SEEKANA.
          </p>
          <div className="pt-4">
            <button
              onClick={() => navigateTo('shop')}
              className="px-8 py-3.5 bg-[#111111] text-white text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 mb-8 border-b border-[#E8E8E8] gap-4">
          <div>
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#777777] font-mono block mb-1">
              Odoo Order Bag
            </span>
            <h1 className="font-heading text-3xl font-extrabold text-[#111111] tracking-tight">
              Shopping Cart ({cart.reduce((a, b) => a + b.quantity, 0)})
            </h1>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="text-xs text-[#555555] hover:text-[#111111] flex items-center gap-1 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Cart Table / Items List */}
          <div className="lg:col-span-8 space-y-6">
            <div className="border border-[#E8E8E8] divide-y divide-[#E8E8E8]">
              {/* Header row on desktop */}
              <div className="hidden sm:grid grid-cols-12 p-4 bg-[#F7F7F5] text-[11px] font-bold uppercase tracking-wider text-[#777777] font-mono">
                <span className="col-span-6">Product</span>
                <span className="col-span-2 text-center">Quantity</span>
                <span className="col-span-2 text-right">Unit Price</span>
                <span className="col-span-2 text-right">Total</span>
              </div>

              {cart.map((item) => {
                const lineTotal = item.price * item.quantity;
                return (
                  <div key={item.id} className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                    
                    {/* Product Info */}
                    <div className="sm:col-span-6 flex gap-4 items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-24 object-cover border border-[#E8E8E8] bg-[#F7F7F5] flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <h3 className="font-heading text-sm font-semibold text-[#111111] truncate">
                          {item.name}
                        </h3>
                        <p className="text-xs text-[#777777] mt-0.5">
                          Variant: <span className="text-[#111111]">{item.color}</span> · Size: <span className="text-[#111111]">{item.size}</span>
                        </p>
                        <div className="flex items-center gap-4 mt-3">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-xs text-[#888888] hover:text-[#111111] flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                          <button
                            onClick={() => handleSaveToWishlist(item.productId, item.id)}
                            className="text-xs text-[#888888] hover:text-[#111111] flex items-center gap-1"
                          >
                            <Heart className="w-3.5 h-3.5" />
                            <span>Save for later</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="sm:col-span-2 flex items-center justify-start sm:justify-center">
                      <div className="flex items-center border border-[#E8E8E8]">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 text-[#555555] hover:text-[#111111]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-mono font-bold text-[#111111]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 text-[#555555] hover:text-[#111111]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Unit Price */}
                    <div className="sm:col-span-2 text-left sm:text-right font-mono text-xs text-[#777777]">
                      <span className="sm:hidden font-sans text-[11px] text-[#888888] mr-2">Unit:</span>
                      Rs. {item.price.toLocaleString()}
                    </div>

                    {/* Line Total */}
                    <div className="sm:col-span-2 text-left sm:text-right font-mono text-sm font-bold text-[#111111]">
                      <span className="sm:hidden font-sans text-[11px] text-[#888888] mr-2">Total:</span>
                      Rs. {lineTotal.toLocaleString()}
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Clear Cart Button */}
            <div className="flex justify-between items-center pt-2">
              <button
                onClick={clearCart}
                className="text-xs text-[#888888] hover:text-[#111111] underline"
              >
                Clear shopping cart
              </button>
            </div>
          </div>

          {/* Cart Summary & Checkout */}
          <div className="lg:col-span-4">
            <div className="bg-[#F7F7F5] border border-[#E8E8E8] p-6 space-y-6">
              <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-[#111111] pb-3 border-b border-[#E8E8E8]">
                Order Summary
              </h2>

              {/* Promo Code Input */}
              <div>
                <form onSubmit={handleApplyPromo} className="space-y-2">
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#555555]">
                    Promo / Discount Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="e.g. WELCOME10"
                      className="flex-1 px-3 py-2 bg-white border border-[#E8E8E8] text-xs font-mono uppercase focus:outline-none focus:border-[#111111]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#111111] text-white text-xs font-bold uppercase hover:bg-neutral-800 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                </form>

                {promoError && (
                  <p className="text-xs text-[#9E2A2B] mt-1.5">{promoError}</p>
                )}

                {appliedPromo && (
                  <div className="mt-2.5 p-2.5 bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-900">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-emerald-700" />
                      <span className="font-mono font-bold">{appliedPromo.code}</span>
                      <span>({appliedPromo.discountPercent}% OFF)</span>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-emerald-700 hover:text-emerald-950 p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Financial Calculation */}
              <div className="space-y-3 pt-3 border-t border-[#E8E8E8] text-xs">
                <div className="flex justify-between text-[#555555]">
                  <span>Subtotal</span>
                  <span className="font-mono text-[#111111]">Rs. {cartSubtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-[#555555]">
                  <div>
                    <span>Delivery</span>
                    {cartSubtotal < settings.freeShippingThreshold && (
                      <p className="text-[10px] text-[#888888]">
                        Free on orders over Rs. {settings.freeShippingThreshold.toLocaleString()}
                      </p>
                    )}
                  </div>
                  <span className="font-mono text-[#111111]">
                    {deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee.toLocaleString()}`}
                  </span>
                </div>

                {appliedPromo && (
                  <div className="flex justify-between text-emerald-800 font-medium">
                    <span>Discount ({appliedPromo.discountPercent}%)</span>
                    <span className="font-mono">- Rs. {discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-base font-bold text-[#111111] pt-3 border-t border-[#E8E8E8]">
                  <span>Total</span>
                  <span className="font-mono text-lg">Rs. {cartTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => navigateTo('checkout')}
                  className="w-full py-4 bg-[#111111] text-white text-xs font-bold uppercase tracking-[0.15em] flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors shadow-sm"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-[11px] text-[#777777] text-center pt-2 space-y-1">
                <p>Odoo eCommerce Native Checkout</p>
                <p>Cash on Delivery & Bank Wire Transfer accepted</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
