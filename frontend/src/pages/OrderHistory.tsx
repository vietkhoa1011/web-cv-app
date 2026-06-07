import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronRight, Clock } from 'lucide-react';
import { fetchMyOrders } from '@/services/api';
import type { Order } from '@/types';

const STATUS_COLORS: Record<string, string> = {
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    completed: 'bg-green-50 text-green-700 border-green-200',
    cancelled: 'bg-red-50 text-red-700 border-red-200',
};

const STATUS_LABELS: Record<string, string> = {
    pending: 'Pending',
    completed: 'Completed',
    cancelled: 'Cancelled',
};

export default function OrderHistory() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const loadOrders = useCallback(async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await fetchMyOrders(1, 20);
            setOrders(response.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load orders');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadOrders();
    }, [loadOrders]);

    // Loading skeleton
    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="h-8 w-48 bg-stone-200 rounded animate-pulse mb-8" />
                {[1, 2, 3].map(i => (
                    <div key={i} className="h-32 bg-stone-100 rounded-xl animate-pulse mb-4" />
                ))}
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-20 text-center">
                <div className="bg-red-50 p-4 rounded-xl inline-block mb-4">
                    <Package className="w-8 h-8 text-red-400" />
                </div>
                <h2 className="text-xl font-bold text-stone-900 mb-2">Failed to load orders</h2>
                <p className="text-stone-500 text-sm mb-6">{error}</p>
                <button
                    onClick={loadOrders}
                    className="px-6 py-2.5 bg-stone-900 text-white rounded-xl text-sm font-medium hover:bg-stone-800 transition-colors"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-stone-100 rounded-xl flex items-center justify-center">
                    <Package className="w-5 h-5 text-stone-700" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-stone-900">My Orders</h1>
                    <p className="text-sm text-stone-500">
                        {orders.length === 0
                            ? 'No orders yet'
                            : `${orders.length} order${orders.length !== 1 ? 's' : ''} placed`}
                    </p>
                </div>
            </div>

            {/* Empty state */}
            {orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-stone-50 rounded-2xl border border-stone-200">
                    <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-4">
                        <Package className="w-8 h-8 text-stone-400" />
                    </div>
                    <h2 className="text-lg font-semibold text-stone-900 mb-2">No orders yet</h2>
                    <p className="text-stone-500 text-sm mb-6">Looks like you haven't placed any orders</p>
                    <Link
                        to="/"
                        className="px-6 py-3 bg-stone-900 text-white rounded-xl font-medium text-sm hover:bg-stone-800 transition-colors"
                    >
                        Start Shopping
                    </Link>
                </div>
            ) : (
                /* Order list */
                <div className="space-y-4">
                    {orders.map(order => (
                        <Link
                            key={order._id}
                            to={`/orders/${order._id}`}
                            className="block bg-white rounded-xl border border-stone-200 p-5 hover:border-stone-300 hover:shadow-sm transition-all group"
                        >
                            <div className="flex items-start justify-between gap-4">
                                {/* Left: Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-sm font-semibold text-stone-900 truncate">
                                            Order #{order._id.slice(-8).toUpperCase()}
                                        </h3>
                                        <span className={`px-2.5 py-0.5 text-[11px] font-medium rounded-full border ${STATUS_COLORS[order.status] || 'bg-stone-50 text-stone-600 border-stone-200'}`}>
                                            {STATUS_LABELS[order.status] || order.status}
                                        </span>
                                    </div>

                                    {/* Items preview */}
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="flex -space-x-2">
                                            {order.items.slice(0, 4).map((item, idx) => (
                                                <div
                                                    key={idx}
                                                    className="w-8 h-8 bg-stone-100 rounded-lg border-2 border-white overflow-hidden"
                                                >
                                                    <img
                                                        src={item.snapshot?.image || '/placeholder.png'}
                                                        alt={item.snapshot?.title || 'Product'}
                                                        className="w-full h-full object-contain p-1"
                                                        loading="lazy"
                                                    />
                                                </div>
                                            ))}
                                            {order.items.length > 4 && (
                                                <div className="w-8 h-8 bg-stone-100 rounded-lg border-2 border-white flex items-center justify-center">
                                                    <span className="text-[10px] font-medium text-stone-500">+{order.items.length - 4}</span>
                                                </div>
                                            )}
                                        </div>
                                        <span className="text-xs text-stone-400">
                                            {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                                        </span>
                                    </div>

                                    {/* Date */}
                                    <div className="flex items-center gap-1.5 text-xs text-stone-400">
                                        <Clock className="w-3 h-3" />
                                        <span>{new Date(order.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}</span>
                                    </div>
                                </div>

                                {/* Right: Total + Arrow */}
                                <div className="flex items-center gap-3 flex-shrink-0">
                                    <div className="text-right">
                                        <p className="text-xs text-stone-500">Total</p>
                                        <p className="text-lg font-bold text-stone-900">${order.total.toFixed(2)}</p>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-stone-300 group-hover:text-stone-500 transition-colors" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
