import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  X, 
  ChevronDown, 
  SlidersHorizontal, 
  Search, 
  Check, 
  RotateCcw 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS, CATEGORIES } from '../data/mockData';

export const ShopPage: React.FC = () => {
  const { selectedCategoryFilter, navigateTo } = useStore();

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState<string>(
    selectedCategoryFilter === 'new-arrivals' || selectedCategoryFilter === 'best-sellers'
      ? 'all'
      : selectedCategoryFilter || 'all'
  );
  const [quickTab, setQuickTab] = useState<'all' | 'new-arrivals' | 'best-sellers'>(
    selectedCategoryFilter === 'new-arrivals'
      ? 'new-arrivals'
      : selectedCategoryFilter === 'best-sellers'
      ? 'best-sellers'
      : 'all'
  );

  const [searchFilter, setSearchFilter] = useState('');
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceMax, setPriceMax] = useState<number>(20000);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const itemsPerPage = 8;

  // Extract unique colors & sizes across all products
  const availableColors = useMemo(() => {
    const map = new Map<string, string>();
    PRODUCTS.forEach((p) => {
      p.colors.forEach((c) => {
        if (!map.has(c.name)) map.set(c.name, c.hex);
      });
    });
    return Array.from(map.entries()).map(([name, hex]) => ({ name, hex }));
  }, []);

  const availableSizes = useMemo(() => {
    const set = new Set<string>();
    PRODUCTS.forEach((p) => {
      p.sizes.forEach((s) => set.add(s));
    });
    return Array.from(set);
  }, []);

  // Filter products logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.categorySlug !== selectedCategory) {
        return false;
      }
      // Quick tabs
      if (quickTab === 'new-arrivals' && !product.isNew) return false;
      if (quickTab === 'best-sellers' && !product.isBestSeller) return false;

      // Search keyword
      if (searchFilter.trim()) {
        const query = searchFilter.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        const matchesDesc = product.shortDescription.toLowerCase().includes(query);
        if (!matchesName && !matchesCat && !matchesDesc) return false;
      }

      // Price filter
      if (product.price > priceMax) return false;

      // Color filter
      if (selectedColors.length > 0) {
        const hasColor = product.colors.some((c) => selectedColors.includes(c.name));
        if (!hasColor) return false;
      }

      // Size filter
      if (selectedSizes.length > 0) {
        const hasSize = product.sizes.some((s) => selectedSizes.includes(s));
        if (!hasSize) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (sortBy === 'best-selling') return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      return 0; // featured default
    });
  }, [selectedCategory, quickTab, searchFilter, priceMax, selectedColors, selectedSizes, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPageNum - 1) * itemsPerPage,
    currentPageNum * itemsPerPage
  );

  const toggleColor = (name: string) => {
    setSelectedColors((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
    setCurrentPageNum(1);
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
    setCurrentPageNum(1);
  };

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setQuickTab('all');
    setSearchFilter('');
    setSelectedColors([]);
    setSelectedSizes([]);
    setPriceMax(20000);
    setSortBy('featured');
    setCurrentPageNum(1);
  };

  const activeFilterCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (quickTab !== 'all' ? 1 : 0) +
    (searchFilter ? 1 : 0) +
    selectedColors.length +
    selectedSizes.length +
    (priceMax < 20000 ? 1 : 0);

  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner */}
      <div className="bg-[#F7F7F5] border-b border-[#E8E8E8] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#777777] block font-mono mb-1">
                SEEKANA eCommerce Catalog
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
                {selectedCategory !== 'all'
                  ? CATEGORIES.find((c) => c.slug === selectedCategory)?.name || 'Shop'
                  : quickTab === 'new-arrivals'
                  ? 'New Arrivals'
                  : quickTab === 'best-sellers'
                  ? 'Best Sellers'
                  : 'Shop Collection'}
              </h1>
            </div>
            <p className="text-xs text-[#777777]">
              Showing <span className="font-bold text-[#111111]">{filteredProducts.length}</span> results
            </p>
          </div>

          {/* Quick Segmented Nav */}
          <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => {
                setQuickTab('all');
                setSelectedCategory('all');
                setCurrentPageNum(1);
              }}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors border ${
                quickTab === 'all' && selectedCategory === 'all'
                  ? 'bg-[#111111] text-white border-[#111111]'
                  : 'bg-white text-[#555555] border-[#E8E8E8] hover:text-[#111111]'
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => {
                setQuickTab('new-arrivals');
                setSelectedCategory('all');
                setCurrentPageNum(1);
              }}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors border ${
                quickTab === 'new-arrivals'
                  ? 'bg-[#111111] text-white border-[#111111]'
                  : 'bg-white text-[#555555] border-[#E8E8E8] hover:text-[#111111]'
              }`}
            >
              New Arrivals
            </button>
            <button
              onClick={() => {
                setQuickTab('best-sellers');
                setSelectedCategory('all');
                setCurrentPageNum(1);
              }}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors border ${
                quickTab === 'best-sellers'
                  ? 'bg-[#111111] text-white border-[#111111]'
                  : 'bg-white text-[#555555] border-[#E8E8E8] hover:text-[#111111]'
              }`}
            >
              Best Sellers
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#E8E8E8]">
          {/* Mobile Filter Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden px-4 py-2 bg-[#F7F7F5] border border-[#E8E8E8] text-xs font-bold uppercase tracking-wider text-[#111111] flex items-center gap-2"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
            </button>

            {activeFilterCount > 0 && (
              <button
                onClick={resetAllFilters}
                className="text-xs text-[#777777] hover:text-[#111111] flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset ({activeFilterCount})</span>
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <label htmlFor="sortBySelect" className="text-xs text-[#777777] uppercase tracking-wider font-semibold">
              Sort By:
            </label>
            <div className="relative">
              <select
                id="sortBySelect"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-[#E8E8E8] text-xs font-medium text-[#111111] py-2 pl-3 pr-8 focus:outline-none focus:border-[#111111] cursor-pointer"
              >
                <option value="featured">Featured / Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
                <option value="best-selling">Best Selling</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#777777] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          
          {/* Desktop Left Sidebar Filters */}
          <aside className="hidden lg:block space-y-8 pr-4">
            
            {/* Search within shop */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-3">
                Search
              </h3>
              <div className="relative">
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => {
                    setSearchFilter(e.target.value);
                    setCurrentPageNum(1);
                  }}
                  placeholder="Filter by name..."
                  className="w-full text-xs p-2.5 pl-8 border border-[#E8E8E8] focus:outline-none focus:border-[#111111]"
                />
                <Search className="w-3.5 h-3.5 text-[#777777] absolute left-2.5 top-1/2 -translate-y-1/2" />
                {searchFilter && (
                  <button
                    onClick={() => setSearchFilter('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[#777777] hover:text-[#111111]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-3">
                Categories
              </h3>
              <div className="space-y-1.5">
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setCurrentPageNum(1);
                  }}
                  className={`w-full text-left py-1 text-xs transition-colors flex justify-between ${
                    selectedCategory === 'all'
                      ? 'font-bold text-[#111111]'
                      : 'text-[#666666] hover:text-[#111111]'
                  }`}
                >
                  <span>All Categories</span>
                  <span className="text-[#888888] font-mono">{PRODUCTS.length}</span>
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.slug);
                      setCurrentPageNum(1);
                    }}
                    className={`w-full text-left py-1 text-xs transition-colors flex justify-between ${
                      selectedCategory === cat.slug
                        ? 'font-bold text-[#111111]'
                        : 'text-[#666666] hover:text-[#111111]'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[#888888] font-mono">{cat.itemCount}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter Slider */}
            <div>
              <div className="flex justify-between items-baseline mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                  Max Price
                </h3>
                <span className="text-xs font-mono font-bold text-[#111111]">
                  Rs. {priceMax.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="2000"
                max="20000"
                step="500"
                value={priceMax}
                onChange={(e) => {
                  setPriceMax(Number(e.target.value));
                  setCurrentPageNum(1);
                }}
                className="w-full accent-[#111111] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#888888] font-mono mt-1">
                <span>Rs. 2,000</span>
                <span>Rs. 20,000</span>
              </div>
            </div>

            {/* Color Filter */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-3">
                Color
              </h3>
              <div className="flex flex-wrap gap-2">
                {availableColors.map((color) => {
                  const isSelected = selectedColors.includes(color.name);
                  return (
                    <button
                      key={color.name}
                      onClick={() => toggleColor(color.name)}
                      className={`text-xs px-2.5 py-1.5 border transition-all flex items-center gap-2 ${
                        isSelected
                          ? 'border-[#111111] bg-[#111111] text-white'
                          : 'border-[#E8E8E8] text-[#555555] hover:border-[#CCCCCC]'
                      }`}
                      title={color.name}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-neutral-300"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Filter */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-3">
                Size
              </h3>
              <div className="flex flex-wrap gap-2">
                {availableSizes.map((size) => {
                  const isSelected = selectedSizes.includes(size);
                  return (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`min-w-[36px] h-9 px-2 text-xs font-medium border flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'border-[#111111] bg-[#111111] text-white'
                          : 'border-[#E8E8E8] text-[#555555] hover:border-[#111111]'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-3">
            {paginatedProducts.length === 0 ? (
              <div className="text-center py-20 bg-[#F7F7F5] border border-[#E8E8E8] p-8">
                <SlidersHorizontal className="w-10 h-10 text-[#CCCCCC] stroke-[1] mx-auto mb-3" />
                <h3 className="font-heading text-base font-bold text-[#111111] mb-1">
                  No matching products
                </h3>
                <p className="text-xs text-[#777777] max-w-sm mx-auto mb-6">
                  Try adjusting your filters or resetting them to view our full collection.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="px-6 py-2.5 bg-[#111111] text-white text-xs uppercase tracking-wider font-semibold"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 pt-6 border-t border-[#E8E8E8] flex items-center justify-center gap-2">
                    {Array.from({ length: totalPages }).map((_, idx) => {
                      const page = idx + 1;
                      return (
                        <button
                          key={page}
                          onClick={() => {
                            setCurrentPageNum(page);
                            window.scrollTo({ top: 300, behavior: 'smooth' });
                          }}
                          className={`w-9 h-9 text-xs font-semibold font-mono border transition-colors ${
                            currentPageNum === page
                              ? 'bg-[#111111] text-white border-[#111111]'
                              : 'bg-white text-[#555555] border-[#E8E8E8] hover:border-[#111111]'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </main>

        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xs bg-white p-6 overflow-y-auto space-y-6">
              <div className="flex items-center justify-between border-b border-[#E8E8E8] pb-4">
                <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-[#111111]">
                  Filter Products
                </h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-[#777777]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-3">
                  Categories
                </h4>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`block text-xs ${
                      selectedCategory === 'all' ? 'font-bold text-[#111111]' : 'text-[#666666]'
                    }`}
                  >
                    All Categories
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`block text-xs ${
                        selectedCategory === cat.slug ? 'font-bold text-[#111111]' : 'text-[#666666]'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Max */}
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="font-bold">Max Price</span>
                  <span className="font-mono">Rs. {priceMax.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="20000"
                  step="500"
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-[#111111]"
                />
              </div>

              {/* Apply & Reset */}
              <div className="pt-4 space-y-2">
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full py-3 bg-[#111111] text-white text-xs font-bold uppercase tracking-wider"
                >
                  Apply Filters
                </button>
                <button
                  onClick={resetAllFilters}
                  className="w-full py-2.5 bg-[#F7F7F5] border border-[#E8E8E8] text-xs font-medium text-[#777777]"
                >
                  Reset All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
