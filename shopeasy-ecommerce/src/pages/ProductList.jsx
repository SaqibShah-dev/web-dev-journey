import { useState, useMemo } from "react";
import { useProducts, useCategories } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";

function ProductList() {
    const { data: products, isLoading, error } = useProducts();
    const { data: categories } = useCategories();

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [maxPrice, setMaxPrice] = useState(1000);

    // useMemo — only recalculates when products or filters change
    const filteredProducts = useMemo(() => {
        if (!products) return [];

        return products.filter(product => {
            const matchesSearch = product.title
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchesCategory =
                category === "all" || product.category === category;

            const matchesPrice = product.price <= maxPrice;

            return matchesSearch && matchesCategory && matchesPrice;
        });
    }, [products, search, category, maxPrice]);

    if (isLoading) return <p>Loading products...</p>;
    if (error) return <p style={{ color: "red" }}>{error.message}</p>;

    return (
        <div>
            <h1 className="text-xl font-medium mb-4">Products</h1>

            {/* Filter bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products..."
                    className="border rounded-md px-3 py-2 text-sm flex-1"
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border rounded-md px-3 py-2 text-sm"
                >
                    <option value="all">All categories</option>
                    {categories?.map(cat => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600 whitespace-nowrap">
                        Max ${maxPrice}
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="1000"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        className="w-32"
                    />
                </div>
            </div>

            {/* Results count */}
            <p className="text-sm text-gray-500 mb-4">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
            </p>

            {/* Product grid */}
            {filteredProducts.length === 0 ? (
                <p className="text-gray-600">No products match your filters.</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductList;