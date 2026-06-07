import { useState, useCallback, type FormEvent } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { createOrder } from '@/services/api';
import type { CartItem } from '@/types';

interface LocationState {
    selectedItems: CartItem[];
}

export default function CheckoutPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { clearCart } = useCart();

    // Lấy selected items từ CartPage (hoặc fallback về items đã chọn)
    const state = location.state as LocationState | null;
    const selectedItems = state?.selectedItems || [];

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const calculateTotal = useCallback(() => {
        return selectedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    }, [selectedItems]);

    const handlePlaceOrder = useCallback(async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        if (selectedItems.length === 0) {
            setError('No items selected. Please go back to cart.');
            return;
        }

        setIsSubmitting(true);
        try {
            const payload = {
                items: selectedItems.map(item => ({
                    productId: item.product._id,
                    quantity: item.quantity,
                })),
            };

            const response = await createOrder(payload);

            if (response.success) {
                // Clear cart sau khi đặt hàng thành công
                clearCart();

                setSuccess(true);
                setTimeout(() => {
                    navigate('/orders');
                }, 2000);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to place order');
        } finally {
            setIsSubmitting(false);
        }
    }, [selectedItems, clearCart, navigate]);

    // Nếu không có items
    if (selectedItems.length === 0 && !success) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-20 text-center">
                <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="w-8 h-8 text-stone-400" />
                </div>
                <h2 className="text-xl font-semibold text-stone-900 mb-2">No items to checkout</h2>
                <p className="text-stone-500 text-sm mb-6">Please select items in your cart first.</p>
                <Link
                    to="/cart"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 text-white rounded-xl font-medium text-sm hover:bg-stone-800 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Cart
                </Link>
            </div>
        );
    }

    const total = calculateTotal();

    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            {/* Back */}
            <Link
                to="/cart"
                className="inline-flex items-center text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors mb-6 group"
            >
                <ArrowLeft className="w-4 h-4 mr-1.5 group-hover:-translate-x-0.5 transition-transform" />
                Back to Cart
            </Link>

            <h1 className="text-2xl font-bold text-stone-900 mb-8">Checkout</h1>

            {/* Success state */}
            {success ? (
                <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-green-200">
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h2 className="text-xl font-bold text-stone-900 mb-2">Order Placed Successfully!</h2>
                    <p className="text-stone-500 text-sm">Redirecting to your orders...</p>
                </div>
            ) : (
                <form onSubmit={handlePlaceOrder} className="space-y-6">
                    {/* Error */}
                    {error && (
                        <div className="flex items-start gap-2 p-4 bg-red-50 border border-red-200 rounded-xl">
                            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    {/* Order Summary */}
                    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-stone-100 bg-stone-50">
                            <h2 className="text-sm font-semibold text-stone-900">
                                Order Summary ({selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''})
                            </h2>
                        </div>
                        <div className="divide-y divide-stone-100">
                            {selectedItems.map((item, index) => (
                                <div key={`${item.product._id}-${index}`} className="flex items-center gap-4 px-6 py-4">
                                    <div className="w-14 h-14 bg-stone-50 rounded-lg border border-stone-100 overflow-hidden flex-shrink-0">
                                        <img
                                            src={item.product.image}
                                            alt={item.product.title}
                                            className="w-full h-full object-contain p-2"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-stone-900 truncate">
                                            {item.product.title}
                                        </p>
                                        <p className="text-xs text-stone-400">
                                            ${item.product.price.toFixed(2)} × {item.quantity}
                                        </p>
                                    </div>
                                    <p className="text-sm font-bold text-stone-900">
                                        ${(item.product.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Totals */}
                        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200">
                            <div className="flex justify-between text-sm">
                                <span className="text-stone-500">Subtotal</span>
                                <span className="font-medium text-stone-900">${total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm mt-2">
                                <span className="text-stone-500">Shipping</span>
                                <span className="font-medium text-green-600">Free</span>
                            </div>
                            <div className="flex justify-between text-base font-bold mt-3 pt-3 border-t border-stone-200">
                                <span className="text-stone-900">Total</span>
                                <span className="text-stone-900">${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Place Order Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 bg-stone-900 text-white rounded-xl font-semibold text-sm hover:bg-stone-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Placing Order...
                            </>
                        ) : (
                            <>
                                <ShoppingBag className="w-4 h-4" />
                                Place Order — ${total.toFixed(2)}
                            </>
                        )}
                    </button>
                </form>
            )}
        </div>
    );
}
