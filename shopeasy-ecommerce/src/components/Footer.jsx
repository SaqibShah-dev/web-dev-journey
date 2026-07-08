import { Link } from "react-router-dom";
import Logo from "./Logo";

function Footer() {
    const categories = [
        { name: "Clothing", path: "/products?category=clothing" },
        { name: "Jewelry", path: "/products?category=jewelry" },
        { name: "Electronics", path: "/products?category=electronics" },
        { name: "Women's", path: "/products?category=women" }
    ];

    return (
        <footer className="bg-gray-900 text-gray-400 mt-20 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    
                    {/* Company Info column */}
                    <div className="space-y-4">
                        {/* Overriding the default dark text colors of Logo for the dark footer */}
                        <Logo className="[&_span.text-gray-900]:text-white" />
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Bringing you premium quality items curated right to your screen. Speed, reliance, and easy returns guaranteed.
                        </p>
                    </div>

                    {/* Quick Navigation Links */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Shop Links</h3>
                        <ul className="space-y-2 text-sm">
                            {categories.map((cat) => (
                                <li key={cat.name}>
                                    <Link to={cat.path} className="hover:text-white transition-colors">
                                        {cat.name} Collection
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Service Column */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Support</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping Info</Link></li>
                            <li><Link to="/returns" className="hover:text-white transition-colors">Track Returns</Link></li>
                            <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter Signup Form */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Stay Updated</h3>
                        <p className="text-sm text-gray-400">Subscribe for exclusive discounts and launches.</p>
                        <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
                            <input 
                                type="email" 
                                placeholder="Your email address" 
                                className="w-full bg-gray-800 text-white rounded-md px-3 py-2 text-sm border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
                            />
                            <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-md px-4 py-2 text-sm transition-colors shadow-xs">
                                Join
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Legal bar */}
                <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
                    <p>&copy; {new Date().getFullYear()} ShopEasy Ecosystem. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link to="/privacy" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-gray-400 transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;