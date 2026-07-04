import { Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts.js";
import ProductCard from "../components/ProductCard";

function Home() {
    const { data: products, isLoading ,error} = useProducts();
    const featured = products?.slice(0, 4); 

    const categories = [
        { name: "Clothing", icon: "👕", path: "/products?category=clothing" },
        { name: "Jewelry", icon: "💍", path: "/products?category=jewelry" },
        { name: "Electronics", icon: "💻", path: "/products?category=electronics" },
        { name: "Women's", icon: "👗", path: "/products?category=women" }
    ];
  

    return (
        <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            
            {/* 1. Enhanced Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-orange-100 to-amber-50 rounded-2xl p-8 sm:p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
                <div className="max-w-md text-center md:text-left space-y-4 z-10">
                    <span className="inline-block text-xs font-semibold tracking-wider text-orange-600 uppercase bg-orange-200/50 px-2.5 py-1 rounded-full">
                        New Season Drop
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-none">
                        Everything you need, <br />
                        <span className="text-orange-600">all in one place.</span>
                    </h1>
                    <p className="text-base text-gray-600 max-w-sm mx-auto md:mx-0">
                        Browse thousands of curated products across premium categories with lightning-fast shipping.
                    </p>
                    <div className="pt-2">
                        <Link
                            to="/products"
                            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white shadow-md transition-all rounded-lg px-6 py-3 text-sm font-medium group"
                        >
                            Shop the collection
                            <span className="transition-transform group-hover:translate-x-1">→</span>
                        </Link>
                    </div>
                </div>
                
                {/* Hero Graphic Element */}
                <div className="relative w-full max-w-xs md:max-w-md aspect-square bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/60 shadow-inner">
                    <span className="text-8xl sm:text-9xl animate-bounce duration-1000">🛍️</span>
                    <div className="absolute -top-4 -left-4 bg-white p-3 rounded-lg shadow-md text-xs font-semibold transform -rotate-12">🔥 Best Sellers</div>
                    <div className="absolute -bottom-2 -right-4 bg-white p-3 rounded-lg shadow-md text-xs font-semibold transform rotate-6 text-green-600">✨ 20% OFF</div>
                </div>
            </div>

            {/* 2. Interactive Categories Section */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">Browse by Category</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {categories.map((cat) => (
                        <Link
                            to={cat.path}
                            key={cat.name}
                            className="group flex flex-col items-center justify-center bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 rounded-xl p-5 text-center shadow-sm transition-all hover:shadow-md cursor-pointer"
                        >
                            <span className="text-3xl mb-2 transition-transform group-hover:scale-110 duration-200">{cat.icon}</span>
                            <p className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">{cat.name}</p>
                        </Link>
                    ))}
                </div>
            </div>

            {/* 3. Featured Products Grid */}
            <div className="space-y-6">
                <div className="flex items-end justify-between border-b border-gray-100 pb-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 tracking-tight">Featured Products</h2>
                        <p className="text-xs text-gray-500 mt-1">Our most popular items this week</p>
                    </div>
                    <Link to="/products" className="text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors flex items-center gap-1">
                        View all items <span>&rarr;</span>
                    </Link>
                </div>

                {/* Loading State Skeletons */}
                {isLoading && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="animate-pulse bg-gray-50 rounded-xl p-4 space-y-4 border border-gray-100">
                                <div className="bg-gray-200 rounded-lg aspect-square w-full"></div>
                                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Product Grid */}
                {!isLoading && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                        {featured?.map(product => (
                            <div key={product.id} className="transition-transform duration-300 hover:-translate-y-1">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
        </div>
    );
}

export default Home;