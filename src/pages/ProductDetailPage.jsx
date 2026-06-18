import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiShoppingBag, FiStar, FiTruck, FiRefreshCw, FiShield, FiArrowLeft, FiMinus, FiPlus } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { useApp } from '../context/AppContext';
import { products } from '../data/products';
import { ProductDetailSkeleton } from '../components/Skeleton';
import ProductCard from '../components/ProductCard';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart, toggleWishlist, isInWishlist } = useApp();
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const product = products.find(p => p.id === Number(id));
  const relatedProducts = products.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4);
  const inWishlist = product ? isInWishlist(product.id) : false;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedImage(0);
    setSelectedSize(null);
    setSelectedColor(null);
    setQuantity(1);
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, [id]);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  if (!product && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-950 pt-20">
        <div className="text-center">
          <p className="text-5xl mb-4">🔍</p>
          <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-stone-100 mb-3">Product not found</h2>
          <Link to="/shop" className="text-[#e85d26] font-semibold">← Back to Shop</Link>
        </div>
      </div>
    );
  }

  if (loading) return (
    <div className="bg-stone-50 dark:bg-stone-950 min-h-screen pt-20">
      <ProductDetailSkeleton />
    </div>
  );

  const discount = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    if (!selectedSize) { toast.error('Please select a size'); return; }
    addToCart({ ...product, selectedSize, selectedColor, quantity });
    toast.success(`${product.name} added to cart!`, { icon: '🛍️', style: { borderRadius: '12px', fontFamily: 'DM Sans' } });
  };

  return (
    <div className="bg-stone-50 dark:bg-stone-950 min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-stone-400 mb-8">
          <Link to="/" className="hover:text-[#e85d26] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#e85d26] transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-stone-600 dark:text-stone-300">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Image Gallery */}
          <div className="space-y-4">
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative rounded-2xl overflow-hidden aspect-square bg-stone-100 dark:bg-stone-800"
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <span className={`absolute top-4 left-4 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full ${
                  product.badge === 'Sale' ? 'bg-red-500 text-white'
                  : product.badge === 'New' ? 'bg-emerald-500 text-white'
                  : 'accent-gradient text-white'
                }`}>
                  {product.badge}
                </span>
              )}
            </motion.div>

            {/* Thumbnails */}
            <div className="grid grid-cols-3 gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`rounded-xl overflow-hidden aspect-square border-2 transition-colors ${
                    selectedImage === i
                      ? 'border-[#e85d26]'
                      : 'border-transparent hover:border-stone-300 dark:hover:border-stone-600'
                  }`}
                >
                  <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-[#e85d26] font-semibold text-sm uppercase tracking-widest mb-2">
              {product.category}
            </p>
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-3">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} size={14} className={
                    i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-stone-300'
                  } />
                ))}
              </div>
              <span className="text-sm text-stone-500 dark:text-stone-400">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="font-display text-3xl font-bold text-stone-900 dark:text-stone-100">
                ${product.price}
              </span>
              {discount && (
                <>
                  <span className="text-lg text-stone-400 line-through">${product.originalPrice}</span>
                  <span className="text-sm font-bold text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded-full">
                    -{discount}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-semibold text-stone-700 dark:text-stone-300 mb-3">
                  Color: <span className="font-normal text-stone-500">{selectedColor}</span>
                </p>
                <div className="flex gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                        selectedColor === color ? 'border-stone-900 dark:border-stone-100 scale-110' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-semibold text-stone-700 dark:text-stone-300 mb-3">
                  Size: <span className="font-normal text-stone-500">{selectedSize}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                        selectedSize === size
                          ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 border-stone-900 dark:border-stone-100'
                          : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-stone-400 dark:hover:border-stone-500'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-stone-700 dark:text-stone-300 mb-3">Quantity</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-full border border-stone-200 dark:border-stone-700 flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                >
                  <FiMinus size={14} />
                </button>
                <span className="w-8 text-center font-semibold text-stone-900 dark:text-stone-100">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                  className="w-10 h-10 rounded-full border border-stone-200 dark:border-stone-700 flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                >
                  <FiPlus size={14} />
                </button>
                <span className="text-xs text-stone-400">{product.stock} in stock</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 accent-gradient text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                <FiShoppingBag size={18} />
                Add to Cart
              </button>
              <button
                onClick={() => {
                  toggleWishlist(product.id);
                  toast.success(inWishlist ? 'Removed from wishlist' : 'Added to wishlist!', {
                    icon: inWishlist ? '💔' : '❤️',
                    style: { borderRadius: '12px', fontFamily: 'DM Sans' }
                  });
                }}
                className={`w-14 h-14 rounded-xl border flex items-center justify-center transition-colors ${
                  inWishlist
                    ? 'bg-[#e85d26] border-[#e85d26] text-white'
                    : 'border-stone-200 dark:border-stone-700 text-stone-500 dark:text-stone-400 hover:border-[#e85d26] hover:text-[#e85d26]'
                }`}
              >
                <FiHeart size={18} className={inWishlist ? 'fill-current' : ''} />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-100 dark:border-stone-800">
              {[
                { icon: FiTruck, label: 'Free Shipping', sub: 'On orders over $100' },
                { icon: FiRefreshCw, label: 'Free Returns', sub: 'Within 30 days' },
                { icon: FiShield, label: '5-Year Warranty', sub: 'Quality guaranteed' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="text-center">
                  <Icon className="mx-auto mb-2 text-[#e85d26]" size={20} />
                  <p className="text-xs font-semibold text-stone-700 dark:text-stone-300">{label}</p>
                  <p className="text-xs text-stone-400">{sub}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tabs: Description + Reviews */}
        <div className="mt-20">
          <div className="flex gap-8 border-b border-stone-200 dark:border-stone-700 mb-8">
            {['description', 'reviews'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-semibold capitalize border-b-2 -mb-px transition-colors ${
                  activeTab === tab
                    ? 'border-[#e85d26] text-[#e85d26]'
                    : 'border-transparent text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
                }`}
              >
                {tab} {tab === 'reviews' && `(${product.reviewsList.length})`}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'description' ? (
              <motion.div
                key="desc"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="max-w-2xl"
              >
                <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-base">
                  {product.description}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6 max-w-2xl"
              >
                {product.reviewsList.map(review => (
                  <div key={review.id} className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-100 dark:border-stone-800">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold text-stone-900 dark:text-stone-100 text-sm">{review.user}</p>
                        <p className="text-xs text-stone-400">{review.date}</p>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <FiStar key={i} size={12} className={i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-stone-300'} />
                        ))}
                      </div>
                    </div>
                    <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-3xl font-bold text-stone-900 dark:text-stone-100 mb-8">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
