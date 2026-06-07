import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface CartSummaryProps {
    onCheckout: () => void;
}

export default function CartSummary({ onCheckout }: CartSummaryProps) {
    const { items, totalItems, subtotal, total, selectedCount, selectedItems } = useCart();

    const hasSelectedItems = selectedItems.length > 0;

    return (
        <div className="bg-white rounded-xl border border-stone-200 p-6 sticky top-24">
            <h3 className="text-lg font-bold text-stone-900 mb-6">Order Summary</h3>

            {/* Stats */}
            <div className="space-y-3 pb-6 border-b border-stone-100">
                <div className="flex justify-between text-sm">
                    <span className="text-stone-500">Total Items</span>
                    <span className="font-medium text-stone-900">{totalItems}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-stone-500">Selected Items</span>
                    <span className="font-medium text-stone-900">{selectedCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-stone-500">Subtotal ({items.length} items)</span>
                    <span className="font-medium text-stone-900">${subtotal.toFixed(2)}</span>
                </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center py-6">
                <span className="text-base font-bold text-stone-900">Total</span>
                <span className="text-xl font-bold text-stone-900">${total.toFixed(2)}</span>
            </div>

            {/* Checkout button */}
            <button
                onClick={onCheckout}
                disabled={!hasSelectedItems}
                className="w-full py-3 bg-stone-900 text-white rounded-xl font-medium text-sm hover:bg-stone-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
                <ShoppingBag className="w-4 h-4" />
                {hasSelectedItems
                    ? `Proceed to Checkout (${selectedItems.length})`
                    : 'Select items to checkout'}
            </button>

            {!hasSelectedItems && items.length > 0 && (
                <p className="text-xs text-stone-400 text-center mt-3">
                    Please select at least one item to proceed
                </p>
            )}

            {/* Empty cart hint */}
            {items.length === 0 && (
                <p className="text-xs text-stone-400 text-center mt-3">
                    Your cart is empty. Start shopping!
                </p>
            )}
        </div>
    );
}
