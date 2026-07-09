import useCartStore from "../store/useCartStore";

function CartItem({ item }) {
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const removeFromCart = useCartStore((state) => state.removeFromCart);

    return (
        <div className="flex items-center gap-4 border-b border-gray-200 py-4">
            <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-contain bg-gray-50 rounded-lg"
            />

            <div className="flex-1">
                <p className="text-sm font-medium line-clamp-1">{item.title}</p>
                <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="border px-2 py-1 rounded text-sm"
                >
                    -
                </button>
                <span className="w-6 text-center text-sm">{item.quantity}</span>
                <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="border px-2 py-1 rounded text-sm"
                >
                    +
                </button>
            </div>

            <p className="text-sm font-medium w-16 text-right">
                ${(item.price * item.quantity).toFixed(2)}
            </p>

            <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 text-sm hover:underline"
            >
                Remove
            </button>
        </div>
    );
}

export default CartItem;