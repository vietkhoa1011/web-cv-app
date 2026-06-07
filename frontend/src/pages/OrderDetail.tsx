import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Package, Clock } from 'lucide-react';
import { fetchOrderById } from '@/services/api';
import type { Order } from '@/types';

const STATUS_BADGE: Record<string, string> = {
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    completed: 'bg-green-50 text-green-700 border-green-200',
    cancelled: 'bg-red-50 text-red-700 border-red-200',
};

const STATUS_LABEL: Record<string, string> = {
    pending: 'Pending',
    completed: 'Completed',
    cancelled: 'Cancelled',
};

export default function OrderDetail() {
    const { id } = useParams<{ id: string }>();
    const [order, setOrder] = useState<Order | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const loadOrder = useCallback(async () => {
        if (!id) return;
        setIsLoading(true);
        setError('');
        try {
            const response = await fetchOrderById(id);
            setOrder(response.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load order');
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    useEffect(() => {
        loadOrder();
    }, [loadOrder]);

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12 animate-pulse">
                <div className="h-6 w-32 bg-stone-200 rounded mb-8" />
                <div className="h-48 bg-stone-100 rounded-2xl mb-6" />
                <div className="h-64 bg-stone-100 rounded-2xl" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-20 text-center">
                <div className="bg-red-50 p-4 rounded-xl inline-block mb-4">
                    <Package className="w-8 h-8 text-red-400" />
                </div>
                <h2 className="text-xl font-bold text-stone-900 mb-2">Error loading order</h2>
                <p className="text-stone-500 text-sm mb-6">{error}</p>
                <div className="flex items-center justify-center gap-3">
                    <Link
                        to="/orders"
                        className="px-6 py-2.5 bg-stone-900 text-white rounded-xl text-sm font-medium hover:bg-stone-800 transition-colors"
                    >
                        Back to Orders
                    </Link>
                    <button
                        onClick={loadOrder}
                        className="px-6 py-2.5 border border-stone-300 rounded-xl text-sm font-medium hover:bg-stone-50 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-20 text-center">
                <Package className="w-12 h-12 text-stone-300 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-stone-900 mb-2">Order not found</h2>
                <Link to="/orders" className="text-sm text-stone-500 hover:text-stone-900 underline underline-offset-2">
                    Back to orders
                </Link>
            </div>
        );
    }

    const userInfo = typeof order.user === 'object' ? order.user : null;

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            {/* Back */}
            <Link
                to="/orders"
                className="inline-flex items-center text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors mb-6 group"
            >
                <ArrowLeft className="w-4 h-4 mr-1.5 group-hover:-translate-x-0.5 transition-transform" />
                Back to Orders
            </Link>

            {/* Order Header Card */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-xl font-bold text-stone-900">
                                Order #{order._id.slice(-8).toUpperCase()}
                            </h1>
                            <span className={`px-3 py-0.5 text-xs font-medium rounded-full border ${STATUS_BADGE[order.status] || 'bg-stone-50 text-stone-600 border-stone-200'}`}>
                                {STATUS_LABEL[order.status] || order.status}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-stone-500">
                            <Clock className="w-3.5 h-3.5" />
                            <span>
                                Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </span>
                        </div>
                        {userInfo && (
                            <p className="text-sm text-stone-400 mt-1">
                                {userInfo.username} · {userInfo.email}
                            </p>
                        )}
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-stone-500">Total Amount</p>
                        <p className="text-3xl font-bold text-stone-900">${order.total.toFixed(2)}</p>
                    </div>
                </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-stone-100 bg-stone-50">
                    <h2 className="text-sm font-semibold text-stone-900">
                        Items ({order.items.length})
                    </h2>
                </div>
                <div className="divide-y divide-stone-100">
                    {order.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-4 px-6 py-4">
                            {/* Image */}
                            <div className="w-16 h-16 bg-stone-50 rounded-lg border border-stone-100 overflow-hidden flex-shrink-0">
                                <img
                                    src={item.snapshot?.image || '/placeholder.png'}
                                    alt={item.snapshot?.title || 'Product'}
                                    className="w-full h-full object-contain p-2"
                                    loading="lazy"
                                />
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-stone-900 truncate">
                                    {item.snapshot?.title || 'Product'}
                                </p>
                                <p className="text-xs text-stone-400 mt-0.5">
                                    ${item.price.toFixed(2)} × {item.quantity}
                                </p>
                            </div>

                            {/* Total */}
                            <p className="text-sm font-bold text-stone-900 flex-shrink-0">
                                ${(item.price * item.quantity).toFixed(2)}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="px-6 py-4 bg-stone-50 border-t border-stone-200">
                    <div className="flex justify-between text-sm">
                        <span className="text-stone-500">Subtotal</span>
                        <span className="font-medium text-stone-900">${order.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                        <span className="text-stone-500">Shipping</span>
                        <span className="font-medium text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between text-base font-bold mt-3 pt-3 border-t border-stone-200">
                        <span className="text-stone-900">Total</span>
                        <span className="text-stone-900">${order.total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
