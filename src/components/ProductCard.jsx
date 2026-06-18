import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingBag, FiStar } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { useApp } from '../context/AppContext';

const ProductCard = ({ product, index = 0 }) => {
  const { addToCart, toggleWishlist, isInWishlist, isInCart } = useApp();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const inWishlist = isInWishlist(product.id);
  const inCart = isInCart(product.id);
  const discount = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      ...product,
      selectedSize: product.sizes?.[0],
      selectedColor: product.colors?.[0],
      quantity: 1,
    });
    toast.success(`${product.name} added to cart!`, {
      icon: '🛍️',
      style: {
        borderRadius: '12px',
        fontFamily: 'DM Sans, sans-serif',
      }
    });
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    toast.success(inWishlist ? 'Removed from wishlist' : 'Added to wishlist!', {
      icon: inWishlist ? '💔' : '❤️',
      style: {
        borderRadius: '12px',
        fontFamily: 'DM Sans, sans-serif',
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/product/${product.id}`}>
        <div
          className="group bg-white dark:bg-stone-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-stone-100 dark:border-stone-800"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Image Container */}
          <div className="relative overflow-hidden aspect-[4/5] bg-stone-100 dark:bg-stone-800">
            {!imgLoaded && (
              <div className="absolute inset-0 skeleton" />
            )}

            <motion.img
              src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
              alt={product.name}
              onLoad={() => setImgLoaded(true)}
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.badge && (
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                  product.badge === 'Sale'
                    ? 'bg-red-500 text-white'
                    : product.badge === 'New'
                    ? 'bg-emerald-500 text-white'
                    : 'accent-gradient text-white'
                }`}>
                  {product.badge}
                </span>
              )}
              {discount && (
                <span className="text-[10px] font-bold bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 px-2.5 py-1 rounded-full">
                  -{discount}%
                </span>
              )}
            </div>

            {/* Wishlist button */}
            <button
              onClick={handleToggleWishlist}
              className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                inWishlist
                  ? 'bg-[#e85d26] text-white'
                  : 'bg-white/80 dark:bg-stone-900/80 text-stone-500 opacity-0 group-hover:opacity-100'
              }`}
            >
              <FiHeart size={14} className={inWishlist ? 'fill-current' : ''} />
            </button>

            {/* Quick add - appears on hover */}
            <motion.button
              onClick={handleAddToCart}
              initial={{ y: 20, opacity: 0 }}
              animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`absolute bottom-3 left-3 right-3 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
                inCart
                  ? 'bg-emerald-500 text-white'
                  : 'accent-gradient text-white hover:opacity-90'
              }`}
            >
              <FiShoppingBag size={14} />
              {inCart ? 'In Cart' : 'Quick Add'}
            </motion.button>
          </div>

          {/* Product Info */}
          <div className="p-4">
            <p className="text-xs text-[#e85d26] font-semibold uppercase tracking-wider mb-1">
              {product.category}
            </p>
            <h3 className="font-display font-semibold text-stone-900 dark:text-stone-100 mb-2 leading-tight line-clamp-1">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    size={11}
                    className={i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-stone-300'}
                  />
                ))}
              </div>
              <span className="text-xs text-stone-500 dark:text-stone-400">({product.reviews})</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-stone-900 dark:text-stone-100 text-lg">
                ${product.price}
              </span>
              {discount && (
                <span className="text-sm text-stone-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
