import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Trash2 } from 'lucide-react';
import CartItem from '@/components/CartItem';
import CartSummary from '@/components/CartSummary';
import { useCart } from '@/contexts/CartContext';

export default function CartPage() {
    const navigate = useNavigate();
    const { items, toggleSelectAll, clearCart, totalItems } = useCart();
    const [error, setError] = useState('');

    const allSelected = items.length > 0 && items.every(item => item.selected);
    const someSelected = items.some(item => item.selected);

    const handleCheckout = useCallback(() => {
        const selected = items.filter(item => item.selected);
        if (selected.length === 0) {
            setError('Please select at least one item to checkout');
            setTimeout(() => setError(''), 3000);
            return;
        }
        // Điều hướng sang trang checkout (sẽ tạo sau)
        navigate('/checkout', { state: { selectedItems: selected } });
    }, [items, navigate]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <Link
                        to="/"
                        className="inline-flex items-center text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors mb-2"
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Continue Shopping
                    </Link>
                    <h1 className="text-2xl lg:text-3xl font-bold text-stone-900 flex items-center gap-3">
                        <ShoppingCart className="w-7 h-7" />
                        Shopping Cart
                        {totalItems > 0 && (
                            <span className="text-base font-normal text-stone-400">
                                ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                            </span>
                        )}
                    </h1>
                </div>

                {items.length > 0 && (
                    <button
                        onClick={clearCart}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-stone-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                        <span className="hidden sm:inline">Clear Cart</span>
                    </button>
                )}
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                    {error}
                </div>
            )}

            {items.length === 0 ? (
                /* Empty Cart */
                <div className="flex flex-col items-center justify-center py-20 bg-stone-50 rounded-2xl border border-stone-200">
                    <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-4">
                        <ShoppingCart className="w-8 h-8 text-stone-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-stone-900 mb-2">Your cart is empty</h2>
                    <p className="text-stone-500 text-sm mb-6">Looks like you haven't added anything yet</p>
                    <Link
                        to="/"
                        className="px-6 py-3 bg-stone-900 text-white rounded-xl font-medium text-sm hover:bg-stone-800 transition-colors"
                    >
                        Start Shopping
                    </Link>
                </div>
            ) : (
                /* Cart Content */
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* Select All */}
                        <div className="flex items-center justify-between px-1">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={allSelected}
                                    onChange={toggleSelectAll}
                                    className="w-5 h-5 rounded border-stone-300 text-stone-900 focus:ring-stone-900 cursor-pointer"
                                />
                                <span className="text-sm font-medium text-stone-700">
                                    {allSelected ? 'Deselect All' : 'Select All'}
                                </span>
                                {someSelected && !allSelected && (
                                    <span className="text-xs text-stone-400">({items.filter(i => i.selected).length} selected)</span>
                                )}
                            </label>
                        </div>

                        {/* Items List */}
                        {items.map(item => (
                            <CartItem key={item.product._id} item={item} />
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-1">
                        <CartSummary onCheckout={handleCheckout} />
                    </div>
                </div>
            )}
        </div>
    );
}
