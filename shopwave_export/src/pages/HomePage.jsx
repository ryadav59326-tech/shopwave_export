import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiStar, FiChevronRight } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import ProductCard from '../components/ProductCard';
import { ProductCardSkeleton } from '../components/Skeleton';
import { products, categories, testimonials } from '../data/products';

// --- Hero Section ---
const Hero = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden bg-stone-950">
    {/* Background image */}
    <div className="absolute inset-0">
      <img
        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80"
        alt="Hero"
        className="w-full h-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/70 to-transparent" />
    </div>

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[#e85d26] font-semibold text-sm uppercase tracking-[0.3em] mb-4"
        >
          New Collection — 2025
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6"
        >
          Crafted to
          <br />
          <span className="text-[#e85d26]">Endure.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-stone-300 text-lg leading-relaxed mb-10 max-w-lg"
        >
          Goods made with intention, materials sourced with care. 
          Each piece is designed to last decades, not seasons.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap gap-4"
        >
          <Link
            to="/shop"
            className="accent-gradient text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity group"
          >
            Shop Now
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#featured"
            className="border border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors"
          >
            Explore
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex gap-8 mt-16"
        >
          {[
            { value: '2,400+', label: 'Happy Customers' },
            { value: '100%', label: 'Natural Materials' },
            { value: '5yr', label: 'Quality Guarantee' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl font-display font-bold text-white">{stat.value}</p>
              <p className="text-stone-400 text-xs">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  </section>
);

// --- Categories Section ---
const CategoriesSection = () => (
  <section className="py-24 bg-stone-50 dark:bg-stone-950">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="text-[#e85d26] font-semibold text-sm uppercase tracking-widest mb-2">Browse</p>
          <h2 className="font-display text-4xl font-bold text-stone-900 dark:text-stone-100">Shop by Category</h2>
        </div>
        <Link to="/shop" className="hidden sm:flex items-center gap-2 text-sm font-semibold text-stone-500 dark:text-stone-400 hover:text-[#e85d26] transition-colors">
          View All <FiChevronRight />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
          >
            <Link
              to={`/shop?category=${cat.name}`}
              className="group block relative rounded-2xl overflow-hidden aspect-[3/4]"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-display font-semibold text-base">{cat.name}</p>
                <p className="text-stone-300 text-xs">{cat.count} items</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// --- Featured Products ---
const FeaturedProducts = ({ isLoading }) => {
  const featured = products.slice(0, 4);

  return (
    <section id="featured" className="py-24 bg-white dark:bg-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[#e85d26] font-semibold text-sm uppercase tracking-widest mb-2">Hand-picked</p>
            <h2 className="font-display text-4xl font-bold text-stone-900 dark:text-stone-100">Featured Pieces</h2>
          </div>
          <Link to="/shop" className="hidden sm:flex items-center gap-2 text-sm font-semibold text-stone-500 dark:text-stone-400 hover:text-[#e85d26] transition-colors">
            All Products <FiArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? [...Array(4)].map((_, i) => <ProductCardSkeleton key={i} />)
            : featured.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))
          }
        </div>
      </div>
    </section>
  );
};

// --- Promo Banner ---
const PromoBanner = () => (
  <section className="py-24 bg-stone-900 dark:bg-stone-950 relative overflow-hidden">
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#e85d26] blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-amber-400 blur-3xl" />
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-[#e85d26] font-semibold text-sm uppercase tracking-widest mb-3">Our Philosophy</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Buy less.<br />Choose well.<br />Make it last.
          </h2>
          <p className="text-stone-400 leading-relaxed text-lg mb-8">
            Every ShopWave product is vetted for quality, durability, and honest materials. 
            We don't sell disposable goods.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 accent-gradient text-white px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-opacity group"
          >
            Our Story
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4"
        >
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80"
            alt="Quality"
            className="rounded-2xl aspect-[3/4] object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
            alt="Craftsmanship"
            className="rounded-2xl aspect-[3/4] object-cover mt-8"
          />
        </motion.div>
      </div>
    </div>
  </section>
);

// --- Testimonials ---
const TestimonialsSection = () => (
  <section className="py-24 bg-stone-50 dark:bg-stone-950">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-14">
        <p className="text-[#e85d26] font-semibold text-sm uppercase tracking-widest mb-2">What people say</p>
        <h2 className="font-display text-4xl font-bold text-stone-900 dark:text-stone-100">Worn, Loved, Trusted</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-stone-900 rounded-2xl p-8 border border-stone-100 dark:border-stone-800 shadow-sm"
          >
            <div className="flex mb-4">
              {[...Array(t.rating)].map((_, i) => (
                <FiStar key={i} size={14} className="text-amber-400 fill-amber-400" />
              ))}
            </div>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-6 italic">
              "{t.text}"
            </p>
            <div className="flex items-center gap-3">
              <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="font-semibold text-stone-900 dark:text-stone-100 text-sm">{t.name}</p>
                <p className="text-stone-400 text-xs">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// --- Newsletter ---
const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success('Welcome! Check your inbox.', { icon: '✉️', style: { borderRadius: '12px', fontFamily: 'DM Sans, sans-serif' } });
    setEmail('');
  };

  return (
    <section className="py-24 bg-white dark:bg-stone-900">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-[#e85d26] font-semibold text-sm uppercase tracking-widest mb-3">Stay Connected</p>
          <h2 className="font-display text-4xl font-bold text-stone-900 dark:text-stone-100 mb-4">
            The Good Stuff, in Your Inbox
          </h2>
          <p className="text-stone-500 dark:text-stone-400 mb-8 leading-relaxed">
            New arrivals, care guides, stories behind our makers. No spam, ever.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-5 py-3.5 rounded-full border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#e85d26] transition-colors placeholder-stone-400"
            />
            <button
              type="submit"
              className="accent-gradient text-white px-8 py-3.5 rounded-full font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

// --- Main Home Page ---
const HomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="bg-stone-50 dark:bg-stone-950">
      <Hero />
      <CategoriesSection />
      <FeaturedProducts isLoading={loading} />
      <PromoBanner />
      <TestimonialsSection />
      <Newsletter />
    </div>
  );
};

export default HomePage;
