import React, { useState } from 'react';
import { 
  Search, 
  Heart, 
  User, 
  ShoppingBag, 
  Menu, 
  X, 
  Settings, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS, CATEGORIES } from '../data/mockData';

export const Header: React.FC = () => {
  const {
    currentPage,
    navigateTo,
    cartCount,
    wishlist,
    settings,
    updateSettings,
    setIsCartDrawerOpen,
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    setIsOdooManagerOpen,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);

  const navLinks = [
    { label: 'Home', page: 'home' as const },
    { label: 'Shop', page: 'shop' as const, filter: null },
    { label: 'New Arrivals', page: 'shop' as const, filter: 'new-arrivals' },
    { label: 'Best Sellers', page: 'shop' as const, filter: 'best-sellers' },
    { label: 'Categories', page: 'categories' as const },
    { label: 'About', page: 'about' as const },
    { label: 'Contact', page: 'contact' as const },
  ];

  const handleNavClick = (page: any, filter?: any) => {
    navigateTo(page, undefined, filter);
    setMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('shop');
      setIsSearchOpen(false);
    }
  };

  const filteredSearchResults = searchQuery.trim()
    ? PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4)
    : [];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E8E8E8] transition-all">
      {/* Announcement Bar */}
      {settings.announcementActive && !announcementDismissed && (
        <div className="bg-[#111111] text-white text-[11px] md:text-xs font-medium tracking-widest uppercase py-2 px-4 relative flex items-center justify-between">
          <div className="w-6" /> {/* spacer */}
          <div className="text-center truncate px-2 font-mono">
            {settings.announcementText}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsOdooManagerOpen(true)}
              title="Manage in Odoo"
              className="text-[#999999] hover:text-white transition-colors text-[10px] hidden sm:flex items-center gap-1 border border-neutral-700 rounded px-1.5 py-0.5"
            >
              <Settings className="w-2.5 h-2.5" />
              <span>Odoo</span>
            </button>
            <button
              onClick={() => setAnnouncementDismissed(true)}
              className="text-[#999999] hover:text-white p-0.5 rounded transition-colors"
              aria-label="Dismiss announcement"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-[#171717] hover:text-black focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 stroke-[1.5]" />
              ) : (
                <Menu className="w-6 h-6 stroke-[1.5]" />
              )}
            </button>
          </div>

          {/* Clean Premium Text Logo */}
          <div className="flex-1 lg:flex-none text-center lg:text-left">
            <button
              onClick={() => navigateTo('home')}
              className="inline-block group text-left focus:outline-none"
            >
              <span className="font-heading font-extrabold text-2xl tracking-[0.25em] text-[#111111] uppercase block transition-opacity group-hover:opacity-80">
                SEEKANA
              </span>
              <span className="text-[9px] tracking-[0.3em] uppercase text-[#777777] block -mt-1 font-sans">
                Curated Living
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive =
                currentPage === link.page &&
                (!link.filter || true); // refined check
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.page, link.filter)}
                  className={`text-[13px] tracking-wider uppercase font-medium transition-colors hover:text-black relative py-1 ${
                    currentPage === link.page
                      ? 'text-[#111111] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#111111]'
                      : 'text-[#555555]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Side Utility Icons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-[#171717] hover:text-black transition-colors relative"
              aria-label="Search products"
              title="Search products"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => navigateTo('wishlist')}
              className="p-2 text-[#171717] hover:text-black transition-colors relative hidden sm:block"
              aria-label="View wishlist"
              title="Wishlist"
            >
              <Heart className="w-5 h-5 stroke-[1.5]" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#111111] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Customer Account / Portal */}
            <button
              onClick={() => navigateTo('account')}
              className="p-2 text-[#171717] hover:text-black transition-colors relative"
              aria-label="Customer account portal"
              title="Customer Account"
            >
              <User className="w-5 h-5 stroke-[1.5]" />
            </button>

            {/* Shopping Cart */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="p-2 text-[#171717] hover:text-black transition-colors flex items-center gap-1.5 focus:outline-none"
              aria-label="Open cart"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              <span className="text-xs font-semibold text-[#111111] bg-[#F7F7F5] border border-[#E8E8E8] px-2 py-0.5 rounded-full min-w-[22px] text-center">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Predictive Search Bar */}
      {isSearchOpen && (
        <div className="border-t border-[#E8E8E8] bg-[#F7F7F5] py-4 px-4 sm:px-6 transition-all animate-fadeIn">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-[#777777] stroke-[1.5]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, materials, styles (e.g. wool overshirt, leather, watch)..."
                autoFocus
                className="w-full pl-12 pr-24 py-3 bg-white border border-[#E8E8E8] rounded-none text-sm text-[#171717] placeholder-[#888888] focus:outline-none focus:border-[#111111] transition-colors"
              />
              <button
                type="submit"
                className="absolute right-2 px-4 py-1.5 bg-[#111111] text-white text-xs uppercase tracking-wider font-medium hover:bg-neutral-800 transition-colors"
              >
                Search
              </button>
            </form>

            {/* Live Search Quick Results */}
            {searchQuery.trim().length > 0 && (
              <div className="mt-3 bg-white border border-[#E8E8E8] p-3 shadow-sm">
                <div className="text-[11px] uppercase tracking-wider font-semibold text-[#777777] px-2 pb-2 border-b border-[#E8E8E8] flex justify-between items-center">
                  <span>Found {filteredSearchResults.length} match(es)</span>
                  <button
                    onClick={() => {
                      navigateTo('shop');
                      setIsSearchOpen(false);
                    }}
                    className="text-[#111111] hover:underline flex items-center gap-1 font-medium"
                  >
                    View all in Shop <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                {filteredSearchResults.length === 0 ? (
                  <p className="text-xs text-[#777777] p-3 text-center">
                    No products found for "{searchQuery}".
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {filteredSearchResults.map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => {
                          navigateTo('product', prod.id);
                          setIsSearchOpen(false);
                        }}
                        className="flex items-center gap-3 p-2 hover:bg-[#F7F7F5] cursor-pointer transition-colors"
                      >
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          className="w-12 h-14 object-cover border border-[#E8E8E8]"
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-[#111111] truncate">
                            {prod.name}
                          </p>
                          <p className="text-[11px] text-[#777777] font-mono">
                            Rs. {prod.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[110px] bg-white z-50 flex flex-col border-t border-[#E8E8E8] overflow-y-auto">
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.page, link.filter)}
                  className="flex items-center justify-between w-full text-left py-2.5 text-base tracking-wider uppercase font-medium text-[#171717] border-b border-[#F0F0EE] hover:text-black"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-[#777777]" />
                </button>
              ))}
            </div>

            {/* Mobile Account & Wishlist shortcuts */}
            <div className="pt-4 space-y-3">
              <button
                onClick={() => {
                  navigateTo('wishlist');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 w-full text-sm font-medium text-[#555555] py-2"
              >
                <Heart className="w-4 h-4" />
                <span>My Wishlist ({wishlist.length})</span>
              </button>
              <button
                onClick={() => {
                  navigateTo('account');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 w-full text-sm font-medium text-[#555555] py-2"
              >
                <User className="w-4 h-4" />
                <span>Customer Account & Orders</span>
              </button>
              <button
                onClick={() => {
                  setIsOdooManagerOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 w-full text-sm font-medium text-[#111111] py-2 border-t border-[#E8E8E8] mt-4"
              >
                <Settings className="w-4 h-4" />
                <span>Odoo Website & Store Settings</span>
              </button>
            </div>

            {/* Quick Contact Info */}
            <div className="pt-6 border-t border-[#E8E8E8] text-xs text-[#777777] space-y-1">
              <p className="font-semibold text-[#111111] uppercase tracking-wider">SEEKANA Concierge</p>
              <p>{settings.storePhone}</p>
              <p>{settings.storeEmail}</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
