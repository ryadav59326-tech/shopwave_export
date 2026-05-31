import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiYoutube, FiArrowRight } from 'react-icons/fi';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 dark:bg-stone-950 text-stone-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full accent-gradient flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-display font-bold text-xl text-white">ShopWave</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Curated goods built to last. We believe in owning fewer, better things.
            </p>
            <div className="flex gap-4">
              {[FiInstagram, FiTwitter, FiYoutube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full border border-stone-700 flex items-center justify-center hover:border-[#e85d26] hover:text-[#e85d26] transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-widest">Shop</h4>
            <ul className="space-y-3 text-sm">
              {['All Products', 'Clothing', 'Bags', 'Accessories', 'Home', 'Footwear'].map(item => (
                <li key={item}>
                  <Link to="/shop" className="hover:text-white transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-widest">Company</h4>
            <ul className="space-y-3 text-sm">
              {['About Us', 'Sustainability', 'Careers', 'Press', 'Contact'].map(item => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-widest">Stay in the loop</h4>
            <p className="text-sm mb-4">New arrivals, early access, and thoughts on good craft.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-stone-800 text-white px-4 py-2.5 text-sm rounded-l-lg border border-stone-700 focus:outline-none focus:border-[#e85d26] placeholder-stone-600"
              />
              <button className="accent-gradient px-4 rounded-r-lg hover:opacity-90 transition-opacity">
                <FiArrowRight className="text-white" size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-stone-800 pt-8 flex flex-col sm:flex-row justify-between gap-4 text-xs">
          <p>© {year} ShopWave. All rights reserved.</p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
              <a key={item} href="#" className="hover:text-white transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
