import React, { useState } from 'react';
import { Heart, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigateTo, addToCart, isInWishlist, toggleWishlist } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultColor = product.colors[0]?.name || 'Standard';
    const defaultSize = product.sizes[0] || 'Standard';
    addToCart(product, defaultColor, defaultSize, 1, true);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={() => navigateTo('product', product.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer flex flex-col h-full bg-white transition-all duration-300"
    >
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F7F7F5] border border-[#E8E8E8]">
        <img
          src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Quiet Minimal Badges (Top Left) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start z-10 pointer-events-none">
          {product.isNew && (
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#111111] bg-white/90 backdrop-blur-sm px-2 py-0.5 border border-[#E8E8E8]">
              NEW
            </span>
          )}
          {hasDiscount && (
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#9E2A2B] bg-white/90 backdrop-blur-sm px-2 py-0.5 border border-[#E8E8E8]">
              SALE
            </span>
          )}
          {product.isBestSeller && !product.isNew && (
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#555555] bg-white/90 backdrop-blur-sm px-2 py-0.5 border border-[#E8E8E8]">
              BEST SELLER
            </span>
          )}
        </div>

        {/* Wishlist Button (Top Right) */}
        <button
          onClick={handleWishlistToggle}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
          className={`absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm border border-[#E8E8E8] transition-all duration-200 z-10 hover:bg-white ${
            isFavorited ? 'text-[#111111]' : 'text-[#777777] hover:text-[#111111]'
          }`}
        >
          <Heart
            className="w-4 h-4 stroke-[1.5]"
            fill={isFavorited ? '#111111' : 'none'}
          />
        </button>

        {/* Quick Add To Cart Bar (Slide up on hover / visible on tap) */}
        <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/40 to-transparent transition-opacity duration-300 opacity-0 group-hover:opacity-100 sm:opacity-0 focus-within:opacity-100">
          <button
            onClick={handleQuickAdd}
            className="w-full py-2.5 px-3 bg-[#111111] text-white text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors shadow-sm"
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to Cart</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 stroke-[1.5]" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="pt-3 pb-2 flex flex-col flex-1 justify-between">
        <div>
          <div className="text-[11px] text-[#777777] uppercase tracking-wider mb-1 font-sans">
            {product.category}
          </div>
          <h3 className="font-heading text-sm font-semibold text-[#171717] group-hover:text-black line-clamp-1 transition-colors">
            {product.name}
          </h3>
        </div>

        {/* Pricing */}
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-sm font-bold text-[#111111] font-mono">
            Rs. {product.price.toLocaleString()}
          </span>
          {hasDiscount && (
            <span className="text-xs text-[#888888] line-through font-mono">
              Rs. {product.compareAtPrice?.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
