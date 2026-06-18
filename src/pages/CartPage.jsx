import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrash2, FiMinus, FiPlus, FiArrowRight, FiShoppingBag } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { useApp } from '../context/AppContext';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useApp();

  const shipping = cartTotal > 100 ? 0 : 12;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 pt-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center px-4"
        >
          <FiShoppingBag className="mx-auto mb-6 text-stone-300 dark:text-stone-700" size={64} />
          <h2 className="font-display text-3xl font-bold text-stone-900 dark:text-stone-100 mb-3">
            Your cart is empty
          </h2>
          <p className="text-stone-500 dark:text-stone-400 mb-8">
            Looks like you haven't added anything yet.
          </p>
          <Link
            to="/shop"
            className="accent-gradient text-white px-8 py-4 rounded-full font-semibold inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            Start Shopping <FiArrowRight />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-stone-900 dark:text-stone-100">
              Your Cart
            </h1>
            <p className="text-stone-500 dark:text-stone-400 mt-1">{cart.length} item{cart.length !== 1 ? 's' : ''}</p>
          </div>
          <button
            onClick={() => { clearCart(); toast.success('Cart cleared'); }}
            className="text-sm text-stone-400 hover:text-red-500 transition-colors flex items-center gap-1"
          >
            <FiTrash2 size={14} /> Clear all
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cart.map(item => (
                <motion.div
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-100 dark:border-stone-800 flex gap-4"
                >
                  {/* Image */}
                  <Link to={`/product/${item.id}`} className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-full h-full rounded-xl object-cover"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <Link to={`/product/${item.id}`}>
                        <h3 className="font-display font-semibold text-stone-900 dark:text-stone-100 text-sm sm:text-base hover:text-[#e85d26] transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <button
                        onClick={() => {
                          removeFromCart(item.id, item.selectedSize, item.selectedColor);
                          toast.success('Item removed', { style: { borderRadius: '12px' } });
                        }}
                        className="text-stone-400 hover:text-red-500 transition-colors flex-shrink-0"
                      >
                        <FiTrash2 size={15} />
                      </button>
                    </div>

                    <div className="flex gap-3 mt-1 mb-3">
                      {item.selectedSize && (
                        <span className="text-xs bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 px-2 py-0.5 rounded-full">
                          {item.selectedSize}
                        </span>
                      )}
                      {item.selectedColor && (
                        <span className="text-xs flex items-center gap-1 text-stone-500 dark:text-stone-400">
                          <span className="w-3 h-3 rounded-full border border-stone-300" style={{ backgroundColor: item.selectedColor }} />
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                          className="w-7 h-7 rounded-full border border-stone-200 dark:border-stone-700 flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                        >
                          <FiMinus size={10} />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold text-stone-900 dark:text-stone-100">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                          className="w-7 h-7 rounded-full border border-stone-200 dark:border-stone-700 flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                        >
                          <FiPlus size={10} />
                        </button>
                      </div>

                      {/* Price */}
                      <p className="font-bold text-stone-900 dark:text-stone-100">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-100 dark:border-stone-800">
              <h2 className="font-display font-bold text-lg text-stone-900 dark:text-stone-100 mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm text-stone-600 dark:text-stone-400">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-stone-600 dark:text-stone-400">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <span className="text-emerald-500 font-semibold">Free</span> : `$${shipping}`}</span>
                </div>
                <div className="flex justify-between text-sm text-stone-600 dark:text-stone-400">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-stone-100 dark:border-stone-800 pt-3 flex justify-between font-bold text-stone-900 dark:text-stone-100">
                  <span>Total</span>
                  <span className="font-display text-lg">${total.toFixed(2)}</span>
                </div>
              </div>

              {cartTotal < 100 && (
                <p className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-xl mb-4">
                  Add ${(100 - cartTotal).toFixed(2)} more for free shipping!
                </p>
              )}

              {/* Promo code */}
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Promo code"
                  className="flex-1 px-3 py-2.5 text-sm rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#e85d26] placeholder-stone-400"
                />
                <button
                  onClick={() => toast.error('Invalid promo code')}
                  className="px-4 py-2.5 text-sm font-semibold border border-stone-200 dark:border-stone-700 rounded-lg text-stone-600 dark:text-stone-400 hover:border-[#e85d26] hover:text-[#e85d26] transition-colors"
                >
                  Apply
                </button>
              </div>

              <Link
                to="/checkout"
                className="w-full accent-gradient text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                Checkout <FiArrowRight />
              </Link>

              <Link
                to="/shop"
                className="w-full mt-3 py-3 rounded-xl font-medium text-sm text-center block text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
