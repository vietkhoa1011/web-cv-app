import { Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { CartItem as CartItemType } from '@/types';
import { useCart } from '@/contexts/CartContext';

interface CartItemProps {
    item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
    const { updateQuantity, removeItem, toggleSelect } = useCart();
    const { product, quantity, selected } = item;

    const lineTotal = product.price * quantity;

    return (
        <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-stone-200 hover:border-stone-300 transition-colors">
            {/* Checkbox */}
            <div className="pt-2">
                <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => toggleSelect(product._id)}
                    className="w-5 h-5 rounded border-stone-300 text-stone-900 focus:ring-stone-900 cursor-pointer"
                />
            </div>

            {/* Image */}
            <Link to={`/product/${product._id}`} className="flex-shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-stone-50 rounded-lg overflow-hidden border border-stone-100">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain p-2"
                        loading="lazy"
                    />
                </div>
            </Link>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <Link
                    to={`/product/${product._id}`}
                    className="text-sm font-medium text-stone-900 hover:text-stone-600 line-clamp-2 transition-colors"
                >
                    {product.title}
                </Link>
                <p className="text-xs text-stone-400 mt-1 uppercase tracking-wider">{product.category}</p>
                <p className="text-sm font-semibold text-stone-900 mt-1">${product.price.toFixed(2)}</p>

                {/* Quantity controls */}
                <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden">
                        <button
                            onClick={() => updateQuantity(product._id, quantity - 1)}
                            disabled={quantity <= 1}
                            className="p-1.5 hover:bg-stone-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            aria-label="Decrease quantity"
                        >
                            <Minus className="w-3.5 h-3.5 text-stone-600" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-stone-900 select-none">
                            {quantity}
                        </span>
                        <button
                            onClick={() => updateQuantity(product._id, quantity + 1)}
                            className="p-1.5 hover:bg-stone-50 transition-colors"
                            aria-label="Increase quantity"
                        >
                            <Plus className="w-3.5 h-3.5 text-stone-600" />
                        </button>
                    </div>

                    <button
                        onClick={() => removeItem(product._id)}
                        className="p-1.5 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label="Remove item"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Line Total - Desktop */}
            <div className="hidden sm:block text-right flex-shrink-0 pt-2">
                <p className="text-sm font-bold text-stone-900">${lineTotal.toFixed(2)}</p>
            </div>
        </div>
    );
}
