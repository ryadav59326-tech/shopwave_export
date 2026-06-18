import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCreditCard, FiLock, FiCheck, FiPackage } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { useApp } from '../context/AppContext';

const steps = ['Shipping', 'Payment', 'Review'];

const CheckoutPage = () => {
  const { cart, cartTotal, clearCart } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [shipping, setShipping] = useState({
    firstName: '', lastName: '', email: '',
    phone: '', address: '', city: '', state: '', zip: '', country: 'India'
  });

  const [payment, setPayment] = useState({
    cardNumber: '', expiry: '', cvv: '', name: ''
  });

  const shippingCost = cartTotal > 100 ? 0 : 12;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shippingCost + tax;

  const handleShippingChange = e => setShipping(s => ({ ...s, [e.target.name]: e.target.value }));
  const handlePaymentChange = e => setPayment(p => ({ ...p, [e.target.name]: e.target.value }));

  const validateShipping = () => {
    const required = ['firstName', 'lastName', 'email', 'address', 'city', 'zip'];
    return required.every(f => shipping[f].trim());
  };

  const handlePlaceOrder = async () => {
    setProcessing(true);
    await new Promise(r => setTimeout(r, 2000));
    setProcessing(false);
    setOrderPlaced(true);
    clearCart();
  };

  const formatCard = (val) => {
    return val.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
  };

  const formatExpiry = (val) => {
    return val.replace(/\D/g, '').replace(/^(\d{2})(\d)/, '$1/$2').slice(0, 5);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 pt-20 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 20 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-20 h-20 rounded-full accent-gradient flex items-center justify-center mx-auto mb-6"
          >
            <FiCheck className="text-white" size={36} />
          </motion.div>
          <h2 className="font-display text-3xl font-bold text-stone-900 dark:text-stone-100 mb-3">
            Order Confirmed!
          </h2>
          <p className="text-stone-500 dark:text-stone-400 mb-2">
            Thank you, {shipping.firstName || 'there'}! Your order has been placed successfully.
          </p>
          <p className="text-stone-400 dark:text-stone-500 text-sm mb-8">
            Order #SW{Math.floor(Math.random() * 90000) + 10000} · Confirmation sent to {shipping.email || 'your email'}
          </p>
          <button
            onClick={() => navigate('/shop')}
            className="accent-gradient text-white px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-opacity"
          >
            Continue Shopping
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="font-display text-3xl font-bold text-stone-900 dark:text-stone-100 mb-8">Checkout</h1>

        {/* Step Indicators */}
        <div className="flex items-center mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center">
              <div className={`flex items-center gap-2 ${i <= step ? 'text-[#e85d26]' : 'text-stone-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
                  i < step ? 'accent-gradient border-transparent text-white'
                  : i === step ? 'border-[#e85d26] text-[#e85d26]'
                  : 'border-stone-200 dark:border-stone-700 text-stone-400'
                }`}>
                  {i < step ? <FiCheck size={14} /> : i + 1}
                </div>
                <span className="hidden sm:block text-sm font-medium">{s}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-3 min-w-[40px] transition-colors ${i < step ? 'bg-[#e85d26]' : 'bg-stone-200 dark:bg-stone-700'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Area */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Step 0: Shipping */}
              {step === 0 && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-100 dark:border-stone-800"
                >
                  <h2 className="font-display font-bold text-xl text-stone-900 dark:text-stone-100 mb-6">
                    Shipping Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { name: 'firstName', label: 'First Name', col: 1 },
                      { name: 'lastName', label: 'Last Name', col: 1 },
                      { name: 'email', label: 'Email Address', col: 2, type: 'email' },
                      { name: 'phone', label: 'Phone Number', col: 1, type: 'tel' },
                      { name: 'address', label: 'Street Address', col: 2 },
                      { name: 'city', label: 'City', col: 1 },
                      { name: 'state', label: 'State', col: 1 },
                      { name: 'zip', label: 'ZIP Code', col: 1 },
                    ].map(field => (
                      <div key={field.name} className={field.col === 2 ? 'sm:col-span-2' : ''}>
                        <label className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1.5 block">
                          {field.label}
                        </label>
                        <input
                          type={field.type || 'text'}
                          name={field.name}
                          value={shipping[field.name]}
                          onChange={handleShippingChange}
                          className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#e85d26] transition-colors text-sm placeholder-stone-300"
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      if (!validateShipping()) { toast.error('Please fill all required fields'); return; }
                      setStep(1);
                    }}
                    className="mt-6 w-full accent-gradient text-white py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity"
                  >
                    Continue to Payment
                  </button>
                </motion.div>
              )}

              {/* Step 1: Payment */}
              {step === 1 && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-100 dark:border-stone-800"
                >
                  <h2 className="font-display font-bold text-xl text-stone-900 dark:text-stone-100 mb-2">
                    Payment Details
                  </h2>
                  <div className="flex items-center gap-2 text-xs text-stone-400 mb-6">
                    <FiLock size={12} />
                    <span>Secured by 256-bit SSL encryption</span>
                  </div>

                  {/* Card visual */}
                  <div className="accent-gradient rounded-2xl p-5 mb-6 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/10 -translate-y-10 translate-x-10" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/5 translate-y-10 -translate-x-10" />
                    <FiCreditCard size={28} className="mb-4 relative z-10" />
                    <p className="font-mono text-lg tracking-[0.2em] mb-4 relative z-10">
                      {payment.cardNumber || '•••• •••• •••• ••••'}
                    </p>
                    <div className="flex justify-between text-sm relative z-10">
                      <span>{payment.name || 'CARDHOLDER NAME'}</span>
                      <span>{payment.expiry || 'MM/YY'}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1.5 block">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={payment.cardNumber}
                        onChange={e => setPayment(p => ({ ...p, cardNumber: formatCard(e.target.value) }))}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#e85d26] transition-colors text-sm font-mono placeholder-stone-300"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1.5 block">Cardholder Name</label>
                      <input
                        type="text"
                        name="name"
                        value={payment.name}
                        onChange={handlePaymentChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#e85d26] transition-colors text-sm placeholder-stone-300"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1.5 block">Expiry Date</label>
                        <input
                          type="text"
                          name="expiry"
                          value={payment.expiry}
                          onChange={e => setPayment(p => ({ ...p, expiry: formatExpiry(e.target.value) }))}
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#e85d26] transition-colors text-sm font-mono placeholder-stone-300"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1.5 block">CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          value={payment.cvv}
                          onChange={e => setPayment(p => ({ ...p, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                          placeholder="•••"
                          className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#e85d26] transition-colors text-sm font-mono placeholder-stone-300"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button onClick={() => setStep(0)} className="px-6 py-4 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 font-semibold text-sm hover:border-stone-400 transition-colors">
                      Back
                    </button>
                    <button
                      onClick={() => {
                        if (!payment.cardNumber || !payment.name) { toast.error('Please fill card details'); return; }
                        setStep(2);
                      }}
                      className="flex-1 accent-gradient text-white py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity"
                    >
                      Review Order
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Review */}
              {step === 2 && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-100 dark:border-stone-800"
                >
                  <h2 className="font-display font-bold text-xl text-stone-900 dark:text-stone-100 mb-6">
                    Review Your Order
                  </h2>

                  {/* Items */}
                  <div className="space-y-4 mb-6">
                    {cart.map(item => (
                      <div key={`${item.id}-${item.selectedSize}`} className="flex gap-3 items-center">
                        <img src={item.images[0]} alt={item.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-stone-900 dark:text-stone-100 text-sm truncate">{item.name}</p>
                          <p className="text-xs text-stone-400">{item.selectedSize} · Qty {item.quantity}</p>
                        </div>
                        <p className="font-bold text-stone-900 dark:text-stone-100 text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  {/* Shipping info */}
                  <div className="border-t border-stone-100 dark:border-stone-800 pt-4 mb-6">
                    <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Shipping to</p>
                    <p className="text-sm text-stone-700 dark:text-stone-300">
                      {shipping.firstName} {shipping.lastName}, {shipping.address}, {shipping.city} {shipping.zip}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="px-6 py-4 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 font-semibold text-sm hover:border-stone-400 transition-colors">
                      Back
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      disabled={processing}
                      className="flex-1 accent-gradient text-white py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {processing ? (
                        <>
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeOpacity="0.2" />
                            <path fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          <FiLock size={15} />
                          Place Order · ${total.toFixed(2)}
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-100 dark:border-stone-800">
              <h3 className="font-display font-bold text-lg text-stone-900 dark:text-stone-100 mb-5">Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-stone-600 dark:text-stone-400">
                  <span>Subtotal ({cart.length} items)</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-600 dark:text-stone-400">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? <span className="text-emerald-500">Free</span> : `$${shippingCost}`}</span>
                </div>
                <div className="flex justify-between text-stone-600 dark:text-stone-400">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-stone-100 dark:border-stone-800 pt-3 flex justify-between font-bold text-stone-900 dark:text-stone-100">
                  <span>Total</span>
                  <span className="font-display text-xl">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
