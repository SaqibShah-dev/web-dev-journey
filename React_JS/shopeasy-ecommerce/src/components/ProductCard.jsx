import { Link } from "react-router-dom";
import useCartStore from "../store/useCartStore";
import toast from "react-hot-toast";

function ProductCard({ product }) {
    const addToCart = useCartStore((state) => state.addToCart);

    function handleAddToCart(e) {
        e.preventDefault();
        addToCart(product, 1);
        toast.success("Product added to cart!");
    }

    return (
        <Link
            to={`/products/${product.id}`}
            className="bg-white border border-gray-200 rounded-xl p-3 flex flex-col gap-2 hover:shadow-md transition-shadow"
        >
            <div className="bg-gray-50 rounded-lg h-32 flex items-center justify-center">
                <img
                    src={product.image}
                    alt={product.title}
                    className="h-24 object-contain"
                />
            </div>

            <p className="text-sm font-medium line-clamp-2">
                {product.title}
            </p>

            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                    ${product.price.toFixed(2)}
                </p>
                <span className="text-xs text-yellow-600">
                    ⭐ {product.rating?.rate ?? "N/A"}
                </span>
            </div>

            <button
                onClick={handleAddToCart}
                className="text-xs bg-gray-900 text-white rounded-md py-2 mt-1 hover:bg-gray-700"
            >
                Add to cart
            </button>
        </Link>
    );
}

export default ProductCard;