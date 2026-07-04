import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../store/useCartStore";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

function Checkout() {
    const items = useCartStore((state) => state.items);
    const clearCart = useCartStore((state) => state.clearCart);
    const { user } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullName: user?.name || "",
        address: "",
        city: "",
        postalCode: "",
        cardNumber: "",
        expiry: "",
        cvv: ""
    });
    const [errors, setErrors] = useState({});
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    const subtotal = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    }

    function validate() {
        const newErrors = {};

        if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
        if (!form.address.trim()) newErrors.address = "Address is required";
        if (!form.city.trim()) newErrors.city = "City is required";
        if (!/^\d{4,10}$/.test(form.postalCode)) newErrors.postalCode = "Enter a valid postal code";

        if (!/^\d{16}$/.test(form.cardNumber.replace(/\s/g, ""))) {
            newErrors.cardNumber = "Card number must be 16 digits";
        }
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry)) {
            newErrors.expiry = "Use MM/YY format";
        }
        if (!/^\d{3,4}$/.test(form.cvv)) {
            newErrors.cvv = "Enter a valid CVV";
        }

        return newErrors;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            toast.error("Please fix the errors below");
            return;
        }

        if (items.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        setIsPlacingOrder(true);

        // simulate order processing
        await new Promise(resolve => setTimeout(resolve, 1500));

        toast.success("Order placed successfully!");
        clearCart();
        setIsPlacingOrder(false);
        navigate("/");
    }

    if (items.length === 0) {
        return (
            <div className="text-center py-16">
                <p className="text-gray-600 mb-4">Your cart is empty.</p>
                <button
                    onClick={() => navigate("/products")}
                    className="bg-gray-900 text-white px-6 py-2 rounded-md text-sm"
                >
                    Continue shopping
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row gap-8">
            {/* Form */}
            <form onSubmit={handleSubmit} className="flex-1 space-y-6">
                <div>
                    <h2 className="font-medium mb-3">Shipping information</h2>
                    <div className="space-y-3">
                        <div>
                            <input
                                name="fullName"
                                value={form.fullName}
                                onChange={handleChange}
                                placeholder="Full name"
                                className="w-full border rounded-md px-3 py-2 text-sm"
                            />
                            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                        </div>

                        <div>
                            <input
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                placeholder="Street address"
                                className="w-full border rounded-md px-3 py-2 text-sm"
                            />
                            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                        </div>

                        <div className="flex gap-3">
                            <div className="flex-1">
                                <input
                                    name="city"
                                    value={form.city}
                                    onChange={handleChange}
                                    placeholder="City"
                                    className="w-full border rounded-md px-3 py-2 text-sm"
                                />
                                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                            </div>
                            <div className="flex-1">
                                <input
                                    name="postalCode"
                                    value={form.postalCode}
                                    onChange={handleChange}
                                    placeholder="Postal code"
                                    className="w-full border rounded-md px-3 py-2 text-sm"
                                />
                                {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>}
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="font-medium mb-3">Payment details</h2>
                    <div className="space-y-3">
                        <div>
                            <input
                                name="cardNumber"
                                value={form.cardNumber}
                                onChange={handleChange}
                                placeholder="Card number"
                                className="w-full border rounded-md px-3 py-2 text-sm"
                            />
                            {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                        </div>

                        <div className="flex gap-3">
                            <div className="flex-1">
                                <input
                                    name="expiry"
                                    value={form.expiry}
                                    onChange={handleChange}
                                    placeholder="MM/YY"
                                    className="w-full border rounded-md px-3 py-2 text-sm"
                                />
                                {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>}
                            </div>
                            <div className="flex-1">
                                <input
                                    name="cvv"
                                    value={form.cvv}
                                    onChange={handleChange}
                                    placeholder="CVV"
                                    className="w-full border rounded-md px-3 py-2 text-sm"
                                />
                                {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isPlacingOrder}
                    className="w-full bg-gray-900 text-white py-3 rounded-md text-sm disabled:opacity-50"
                >
                    {isPlacingOrder ? "Placing order..." : `Place order — $${subtotal.toFixed(2)}`}
                </button>
            </form>

            {/* Order summary */}
            <div className="md:w-72 bg-gray-50 rounded-xl p-5 h-fit">
                <h2 className="font-medium mb-4">Order summary</h2>

                <div className="space-y-3 mb-4">
                    {items.map(item => (
                        <div key={item.id} className="flex justify-between text-sm">
                            <span className="text-gray-600 line-clamp-1 pr-2">
                                {item.title} × {item.quantity}
                            </span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                </div>

                <div className="flex justify-between font-medium border-t border-gray-200 pt-3">
                    <span>Total</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
}

export default Checkout;