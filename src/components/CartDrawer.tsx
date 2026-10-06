import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    deliveryFee,
    cartTotal,
    navigateTo,
    settings,
  } = useStore();

  if (!isCartDrawerOpen) return null;

  const freeShippingThreshold = settings.freeShippingThreshold;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const handleCheckoutClick = () => {
    setIsCartDrawerOpen(false);
    navigateTo('checkout');
  };

  const handleViewCartClick = () => {
    setIsCartDrawerOpen(false);
    navigateTo('cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[#E8E8E8] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-[#E8E8E8] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 stroke-[1.5] text-[#111111]" />
              <h2 className="font-heading text-base font-bold tracking-wider uppercase text-[#111111]">
                Your Cart ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 text-[#777777] hover:text-[#111111] transition-colors"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3 bg-[#F7F7F5] border-b border-[#E8E8E8]">
            {amountToFreeShipping > 0 ? (
              <p className="text-xs text-[#555555]">
                Add <span className="font-bold text-[#111111] font-mono">Rs. {amountToFreeShipping.toLocaleString()}</span> more for <span className="font-semibold text-[#111111]">Free Delivery</span>.
              </p>
            ) : (
              <p className="text-xs text-[#111111] font-semibold">
                ✓ You have qualified for Free Delivery!
              </p>
            )}
            <div className="w-full bg-[#E0E0DE] h-1.5 mt-2 rounded-full overflow-hidden">
              <div
                className="bg-[#111111] h-full transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Line Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <ShoppingBag className="w-12 h-12 text-[#CCCCCC] stroke-[1] mb-4" />
                <p className="font-heading text-base font-semibold text-[#111111] mb-1">
                  Your cart is empty
                </p>
                <p className="text-xs text-[#777777] max-w-xs mb-6">
                  Discover refined essentials crafted with purpose and longevity.
                </p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigateTo('shop');
                  }}
                  className="px-6 py-3 bg-[#111111] text-white text-xs uppercase tracking-wider font-semibold hover:bg-neutral-800 transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4 pb-6 border-b border-[#F0F0EE]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover border border-[#E8E8E8] bg-[#F7F7F5]"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-heading text-sm font-semibold text-[#171717] line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-xs text-[#777777] mt-0.5">
                        {item.color} · {item.size}
                      </p>
                      <p className="text-xs font-mono font-bold text-[#111111] mt-1">
                        Rs. {item.price.toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#E8E8E8]">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 text-[#555555] hover:text-[#111111] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-mono font-medium text-[#111111]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 text-[#555555] hover:text-[#111111] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#888888] hover:text-[#111111] p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4 stroke-[1.5]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout button */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#E8E8E8] bg-[#F7F7F5] space-y-4">
              <div className="space-y-1.5 text-xs">
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
                <div className="flex justify-between text-sm font-bold text-[#111111] pt-2 border-t border-[#E8E8E8]">
                  <span>Total</span>
                  <span className="font-mono">Rs. {cartTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={handleCheckoutClick}
                  className="w-full py-3.5 bg-[#111111] text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors shadow-sm"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={handleViewCartClick}
                  className="w-full py-2.5 bg-transparent border border-[#CCCCCC] text-[#111111] text-xs font-semibold uppercase tracking-wider hover:bg-white transition-colors"
                >
                  View Full Cart
                </button>
              </div>

              <p className="text-[11px] text-[#777777] text-center pt-1">
                Taxes included · Standard Odoo Sales Order processing
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
