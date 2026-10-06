import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  ShoppingBag, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  ChevronRight, 
  Plus, 
  Minus, 
  Check, 
  Share2 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS } from '../data/mockData';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProductId,
    navigateTo,
    addToCart,
    isInWishlist,
    toggleWishlist,
    settings,
    showToast,
  } = useStore();

  const product = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Standard');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'delivery' | 'returns'>('desc');
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Reset when product changes
  useEffect(() => {
    setSelectedImageIndex(0);
    setSelectedColor(product.colors[0]?.name || 'Standard');
    setSelectedSize(product.sizes[0] || 'Standard');
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product.id]);

  const isFavorited = isInWishlist(product.id);
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;

  const handleAddToCart = (buyNow = false) => {
    addToCart(product, selectedColor, selectedSize, quantity, !buyNow);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
    if (buyNow) {
      navigateTo('checkout');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Product link copied to clipboard.');
  };

  // Related products from the same category or overall catalog
  const relatedProducts = PRODUCTS.filter(
    (p) => p.categorySlug === product.categorySlug && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="bg-white">
      {/* Breadcrumb Bar */}
      <div className="bg-[#F7F7F5] border-b border-[#E8E8E8] py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center space-x-2 text-xs text-[#777777] overflow-x-auto">
          <button onClick={() => navigateTo('home')} className="hover:text-[#111111] transition-colors">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
          <button onClick={() => navigateTo('shop')} className="hover:text-[#111111] transition-colors">
            Shop
          </button>
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
          <button
            onClick={() => navigateTo('shop', undefined, product.categorySlug)}
            className="hover:text-[#111111] transition-colors"
          >
            {product.category}
          </button>
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="text-[#111111] font-medium truncate">{product.name}</span>
        </div>
      </div>

      {/* Main Product Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Side: Images & Gallery */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[640px] scrollbar-none">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-20 h-24 flex-shrink-0 border bg-[#F7F7F5] overflow-hidden transition-all ${
                    selectedImageIndex === idx
                      ? 'border-[#111111] ring-1 ring-[#111111]'
                      : 'border-[#E8E8E8] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} angle ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Primary Image */}
            <div className="flex-1 relative aspect-[4/5] bg-[#F7F7F5] border border-[#E8E8E8] overflow-hidden">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-300"
              />
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
                {product.isNew && (
                  <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#111111] bg-white/90 px-2.5 py-1 border border-[#E8E8E8]">
                    NEW ARRIVAL
                  </span>
                )}
                {hasDiscount && (
                  <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#9E2A2B] bg-white/90 px-2.5 py-1 border border-[#E8E8E8]">
                    SALE
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right Side: Product Details & Purchase Actions */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#777777] font-mono">
                {product.category} · SKU: {product.sku}
              </span>
              <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#111111] mt-1 tracking-tight">
                {product.name}
              </h1>

              {/* Price Row */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl font-bold font-mono text-[#111111]">
                  Rs. {product.price.toLocaleString()}
                </span>
                {hasDiscount && (
                  <span className="text-base text-[#888888] line-through font-mono">
                    Rs. {product.compareAtPrice?.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed border-t border-b border-[#F0F0EE] py-4">
              {product.shortDescription}
            </p>

            {/* Variants: Color */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <div className="flex justify-between items-center text-xs mb-2.5">
                  <span className="font-bold uppercase tracking-wider text-[#111111]">
                    Color: <span className="font-normal text-[#555555]">{selectedColor}</span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        selectedColor === color.name
                          ? 'ring-2 ring-offset-2 ring-[#111111]'
                          : 'hover:scale-105'
                      }`}
                      title={color.name}
                    >
                      <span
                        className="w-full h-full rounded-full border border-black/10"
                        style={{ backgroundColor: color.hex }}
                      />
                      {selectedColor === color.name && (
                        <Check
                          className={`w-3.5 h-3.5 absolute ${
                            color.name.toLowerCase().includes('white') || color.name.toLowerCase().includes('chalk')
                              ? 'text-black'
                              : 'text-white'
                          }`}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Variants: Size */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div className="flex justify-between items-center text-xs mb-2.5">
                  <span className="font-bold uppercase tracking-wider text-[#111111]">
                    Size: <span className="font-normal text-[#555555]">{selectedSize}</span>
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[44px] h-11 px-3 text-xs font-semibold uppercase tracking-wider border transition-colors ${
                        selectedSize === size
                          ? 'bg-[#111111] text-white border-[#111111]'
                          : 'bg-white text-[#171717] border-[#E8E8E8] hover:border-[#111111]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-2.5">
                Quantity
              </span>
              <div className="flex items-center w-36 border border-[#E8E8E8] bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-[#555555] hover:text-[#111111] transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="flex-1 text-center font-mono text-xs font-bold text-[#111111]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-[#555555] hover:text-[#111111] transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Actions: Add to Cart, Buy Now, Wishlist */}
            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
                <button
                  onClick={() => handleAddToCart(false)}
                  className="flex-1 py-4 px-6 bg-[#111111] text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Cart</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
                      <span>ADD TO CART</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Wishlist toggle"
                  className={`p-4 border border-[#E8E8E8] transition-colors ${
                    isFavorited
                      ? 'bg-neutral-100 text-[#111111]'
                      : 'bg-white text-[#777777] hover:text-[#111111] hover:border-[#111111]'
                  }`}
                  title="Save to Wishlist"
                >
                  <Heart
                    className="w-5 h-5 stroke-[1.5]"
                    fill={isFavorited ? '#111111' : 'none'}
                  />
                </button>
              </div>

              <button
                onClick={() => handleAddToCart(true)}
                className="w-full py-3.5 px-6 bg-[#F7F7F5] border border-[#111111] text-[#111111] text-xs font-bold uppercase tracking-[0.15em] hover:bg-white transition-colors"
              >
                BUY NOW
              </button>
            </div>

            {/* Stock & Delivery Micro Info */}
            <div className="pt-4 space-y-2.5 text-xs text-[#555555]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-semibold text-[#111111]">
                  In Stock ({product.stockCount} units available in Odoo warehouse)
                </span>
              </div>
              <div className="flex items-start gap-2.5 pt-1">
                <Truck className="w-4 h-4 text-[#777777] flex-shrink-0 mt-0.5" />
                <span>
                  Standard Delivery: <strong className="text-[#111111]">Rs. {settings.standardShippingFee}</strong> (2-4 business days).{' '}
                  <strong className="text-[#111111]">Free Delivery</strong> on orders over Rs. {settings.freeShippingThreshold.toLocaleString()}.
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#777777] flex-shrink-0" />
                <span>Cash on Delivery & Direct Bank Transfer available.</span>
              </div>
            </div>

            {/* Share link button */}
            <div className="pt-2">
              <button
                onClick={handleCopyLink}
                className="text-xs text-[#777777] hover:text-[#111111] flex items-center gap-1.5 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share this product</span>
              </button>
            </div>

          </div>

        </div>

        {/* Detailed Tabs / Accordion Below Product Area */}
        <div className="mt-20 border-t border-[#E8E8E8] pt-12">
          {/* Tab Navigation */}
          <div className="flex border-b border-[#E8E8E8] overflow-x-auto space-x-8 scrollbar-none">
            <button
              onClick={() => setActiveTab('desc')}
              className={`pb-4 text-xs font-bold uppercase tracking-wider transition-colors relative ${
                activeTab === 'desc'
                  ? 'text-[#111111] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#111111]'
                  : 'text-[#777777] hover:text-[#111111]'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-4 text-xs font-bold uppercase tracking-wider transition-colors relative ${
                activeTab === 'specs'
                  ? 'text-[#111111] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#111111]'
                  : 'text-[#777777] hover:text-[#111111]'
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab('delivery')}
              className={`pb-4 text-xs font-bold uppercase tracking-wider transition-colors relative ${
                activeTab === 'delivery'
                  ? 'text-[#111111] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#111111]'
                  : 'text-[#777777] hover:text-[#111111]'
              }`}
            >
              Delivery Information
            </button>
            <button
              onClick={() => setActiveTab('returns')}
              className={`pb-4 text-xs font-bold uppercase tracking-wider transition-colors relative ${
                activeTab === 'returns'
                  ? 'text-[#111111] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#111111]'
                  : 'text-[#777777] hover:text-[#111111]'
              }`}
            >
              Return Information
            </button>
          </div>

          {/* Tab Panels */}
          <div className="py-8 max-w-3xl text-xs sm:text-sm text-[#555555] leading-relaxed">
            {activeTab === 'desc' && (
              <div className="space-y-4">
                <p>{product.description}</p>
                <p>
                  Every SEEKANA piece is produced in limited batches with an emphasis on durable stitching, pure fibers, and timeless proportion. Designed to look effortlessly elevated in modern living environments.
                </p>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="border border-[#E8E8E8] divide-y divide-[#E8E8E8]">
                {Object.entries(product.specifications).map(([key, val]) => (
                  <div key={key} className="grid grid-cols-3 p-3 text-xs">
                    <span className="font-semibold text-[#111111]">{key}</span>
                    <span className="col-span-2 text-[#666666]">{val}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'delivery' && (
              <div className="space-y-3">
                <p>
                  <strong>Standard Dispatch:</strong> Orders are processed via our central Odoo warehouse and dispatched within 24–48 business hours.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li>Lahore, Karachi, Islamabad: 2–3 business days</li>
                  <li>Other major cities across Pakistan: 3–5 business days</li>
                  <li>Tracking number is provided via SMS and accessible inside your Customer Account portal</li>
                </ul>
              </div>
            )}

            {activeTab === 'returns' && (
              <div className="space-y-3">
                <p>
                  <strong>7-Day Seamless Exchange Policy:</strong> If your item does not fit or meets unexpected defects, we offer simple size exchanges and returns within 7 calendar days of receipt.
                </p>
                <p>
                  Items must be returned unworn, unwashed, and in original SEEKANA packaging with tags intact.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-16 border-t border-[#E8E8E8]">
            <div className="flex items-center justify-between mb-10 pb-4 border-b border-[#E8E8E8]">
              <div>
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#777777] font-mono block mb-1">
                  Complementary Styles
                </span>
                <h3 className="font-heading text-2xl font-bold text-[#111111]">
                  You May Also Like
                </h3>
              </div>
              <button
                onClick={() => navigateTo('shop', undefined, product.categorySlug)}
                className="text-xs font-bold uppercase tracking-wider text-[#111111] hover:text-[#555555]"
              >
                View Category
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
