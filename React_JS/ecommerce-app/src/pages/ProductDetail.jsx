import { useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProducts";
import useCartStore from "../store/useCartStore";
import { useState } from "react";
import toast from "react-hot-toast";

function ProductDetail() {
    const { id } = useParams();
    const { data: product, isLoading, error } = useProduct(id);
    const addToCart = useCartStore((state) => state.addToCart); 
    const [quantity, setQuantity] = useState(1);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error.message}</p>;
    if (!product) return <p>Product not found.</p>;

    function handleAddToCart() { 
        addToCart(product, quantity);
        toast.success("Product added to cart!");
    }

    return (
        <div className="flex flex-col md:flex-row gap-8">
            <div className="bg-gray-50 rounded-xl p-8 flex items-center justify-center md:w-1/2">
                <img src={product.image} alt={product.title} className="h-64 object-contain" />
            </div>

            <div className="md:w-1/2">
                <h1 className="text-xl font-medium mb-2">{product.title}</h1>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <p className="text-lg font-medium mb-4">${product.price.toFixed(2)}</p>

                <div className="flex items-center gap-3 mb-4">
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="border px-3 py-1 rounded">-</button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantity(q => q + 1)} className="border px-3 py-1 rounded">+</button>
                </div>

                <button
                    onClick={handleAddToCart} 
                    className="bg-gray-900 text-white px-6 py-2 rounded-md"
                >
                    Add to cart
                </button>
            </div>
        </div>
    );
}

export default ProductDetail;