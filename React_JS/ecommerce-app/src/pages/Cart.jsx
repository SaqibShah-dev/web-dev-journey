import { Link, useNavigate } from "react-router-dom";
import useCartStore from "../store/useCartStore";
import CartItem from "../components/CartItem";

function Cart() {
    const items = useCartStore((state) => state.items);
    const clearCart = useCartStore((state) => state.clearCart);
    const navigate = useNavigate();

    const subtotal = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    if (items.length === 0) {
        return (
            <div className="text-center py-16">
                <p className="text-gray-600 mb-4">Your cart is empty.</p>
                <Link
                    to="/products"
                    className="inline-block bg-gray-900 text-white px-6 py-2 rounded-md text-sm"
                >
                    Continue shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row gap-8">
            {/* Cart items */}
            <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-medium">
                        Your cart ({items.length} items)
                    </h1>
                    <button
                        onClick={clearCart}
                        className="text-sm text-red-500 hover:underline"
                    >
                        Clear cart
                    </button>
                </div>

                {items.map(item => (
                    <CartItem key={item.id} item={item} />
                ))}
            </div>

            {/* Order summary */}
            <div className="md:w-72 bg-gray-50 rounded-xl p-5 h-fit">
                <h2 className="font-medium mb-4">Order summary</h2>

                <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mb-4">
                    <span className="text-gray-600">Shipping</span>
                    <span>Free</span>
                </div>

                <div className="flex justify-between font-medium border-t border-gray-200 pt-3 mb-4">
                    <span>Total</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>

                <button
                    onClick={() => navigate("/checkout")}
                    className="w-full bg-gray-900 text-white py-2 rounded-md text-sm"
                >
                    Proceed to checkout
                </button>
            </div>
        </div>
    );
}

export default Cart;