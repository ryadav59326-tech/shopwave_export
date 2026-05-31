import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiSliders, FiX, FiGrid, FiList } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import { ProductCardSkeleton } from '../components/Skeleton';
import { products, categories } from '../data/products';
import { useDebounce } from '../hooks/useDebounce';

const SORT_OPTIONS = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Best Rated' },
  { value: 'newest', label: 'Newest' },
];

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [priceRange, setPriceRange] = useState(400);
  const [sort, setSort] = useState('default');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const debouncedSearch = useDebounce(searchInput, 300);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Search filter
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    // Price filter
    result = result.filter(p => p.price <= priceRange);

    // Sort
    switch (sort) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'newest': result.reverse(); break;
      default: break;
    }

    return result;
  }, [debouncedSearch, selectedCategory, priceRange, sort]);

  const allCategories = ['All', ...categories.map(c => c.name)];

  const FilterPanel = () => (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-4 text-sm uppercase tracking-widest">
          Categories
        </h3>
        <div className="space-y-2">
          {allCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#e85d26] text-white font-semibold'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              {cat}
              {cat !== 'All' && (
                <span className={`float-right text-xs ${selectedCategory === cat ? 'text-white/70' : 'text-stone-400'}`}>
                  {products.filter(p => p.category === cat).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-4 text-sm uppercase tracking-widest">
          Max Price
        </h3>
        <input
          type="range"
          min={50}
          max={400}
          step={10}
          value={priceRange}
          onChange={e => setPriceRange(Number(e.target.value))}
        />
        <div className="flex justify-between mt-2 text-sm text-stone-500 dark:text-stone-400">
          <span>$50</span>
          <span className="font-semibold text-[#e85d26]">${priceRange}</span>
          <span>$400</span>
        </div>
      </div>

      {/* Clear filters */}
      <button
        onClick={() => { setSelectedCategory('All'); setPriceRange(400); setSearchInput(''); }}
        className="w-full py-2 text-sm text-stone-500 dark:text-stone-400 border border-stone-200 dark:border-stone-700 rounded-lg hover:border-[#e85d26] hover:text-[#e85d26] transition-colors"
      >
        Clear Filters
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <p className="text-[#e85d26] font-semibold text-sm uppercase tracking-widest mb-2">Browse</p>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-stone-900 dark:text-stone-100">
            All Products
          </h1>
        </motion.div>

        {/* Search & Sort Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
            <input
              type="text"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#e85d26] transition-colors placeholder-stone-400 text-sm"
            />
            {searchInput && (
              <button onClick={() => setSearchInput('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600">
                <FiX size={14} />
              </button>
            )}
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#e85d26] text-sm min-w-[180px]"
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 text-sm font-medium"
          >
            <FiSliders size={16} />
            Filters
          </button>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-28 bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-100 dark:border-stone-800">
              <FilterPanel />
            </div>
          </aside>

          {/* Mobile Filter Drawer */}
          <AnimatePresence>
            {filtersOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setFiltersOpen(false)}
                  className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                />
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'spring', damping: 30 }}
                  className="fixed inset-y-0 left-0 w-72 bg-white dark:bg-stone-900 z-50 p-6 overflow-y-auto lg:hidden"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-display font-bold text-lg text-stone-900 dark:text-stone-100">Filters</h2>
                    <button onClick={() => setFiltersOpen(false)}>
                      <FiX size={20} className="text-stone-500" />
                    </button>
                  </div>
                  <FilterPanel />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="flex-1 min-w-0">
            {/* Results count */}
            <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
              {loading ? '...' : `${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''} found`}
            </p>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => <ProductCardSkeleton key={i} />)}
              </div>
            ) : filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-24"
              >
                <p className="text-5xl mb-4">🔍</p>
                <h3 className="font-display text-xl font-semibold text-stone-900 dark:text-stone-100 mb-2">No products found</h3>
                <p className="text-stone-500 dark:text-stone-400 text-sm">Try adjusting your search or filters</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
