import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/mockData';

export const WishlistPage: React.FC = () => {
  const {
    wishlist,
    toggleWishlist,
    moveToCartFromWishlist,
    navigateTo,
  } = useStore();

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  if (wishlistedProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 mx-auto bg-[#F7F7F5] border border-[#E8E8E8] flex items-center justify-center">
            <Heart className="w-8 h-8 text-[#999999] stroke-[1.5]" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-[#111111]">
            Your wishlist is empty
          </h1>
          <p className="text-xs sm:text-sm text-[#777777] leading-relaxed">
            Keep track of items you admire by clicking the heart icon on any product.
          </p>
          <div className="pt-4">
            <button
              onClick={() => navigateTo('shop')}
              className="px-8 py-3.5 bg-[#111111] text-white text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors"
            >
              Discover Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="pb-6 mb-8 border-b border-[#E8E8E8] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#777777] font-mono block mb-1">
              Saved Collection
            </span>
            <h1 className="font-heading text-3xl font-extrabold text-[#111111] tracking-tight">
              My Wishlist ({wishlistedProducts.length})
            </h1>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="text-xs text-[#555555] hover:text-[#111111] font-medium"
          >
            Continue Browsing
          </button>
        </div>

        {/* Grid of Wishlist Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistedProducts.map((product) => (
            <div
              key={product.id}
              className="border border-[#E8E8E8] bg-white flex flex-col justify-between group"
            >
              {/* Image */}
              <div
                onClick={() => navigateTo('product', product.id)}
                className="relative aspect-[3/4] bg-[#F7F7F5] overflow-hidden cursor-pointer"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  className="absolute top-3 right-3 p-2 bg-white/90 border border-[#E8E8E8] text-[#111111] hover:text-[#9E2A2B] transition-colors"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4 stroke-[1.5]" />
                </button>
              </div>

              {/* Info & Move to Cart */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-[11px] text-[#777777] uppercase tracking-wider">
                    {product.category}
                  </p>
                  <h3
                    onClick={() => navigateTo('product', product.id)}
                    className="font-heading text-sm font-semibold text-[#111111] hover:underline cursor-pointer line-clamp-1 mt-0.5"
                  >
                    {product.name}
                  </h3>
                  <p className="font-mono text-sm font-bold text-[#111111] mt-1">
                    Rs. {product.price.toLocaleString()}
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => moveToCartFromWishlist(product)}
                    className="w-full py-2.5 px-3 bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
