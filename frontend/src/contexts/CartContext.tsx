import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from 'react';
import type { CartItem, CartContextType, Product } from '@/types';

const CartContext = createContext<CartContextType | null>(null);

const CART_KEY = 'eshop_cart';

// Lưu cart vào localStorage
function persistCart(items: CartItem[]) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
}

// Load cart từ localStorage
function loadCart(): CartItem[] {
    try {
        const stored = localStorage.getItem(CART_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>(loadCart);

    // Lưu mỗi khi items thay đổi - hỗ trợ cả value và callback
    const setItemsAndPersist = useCallback((updater: CartItem[] | ((prev: CartItem[]) => CartItem[])) => {
        setItems(prev => {
            const newItems = typeof updater === 'function' ? updater(prev) : updater;
            persistCart(newItems);
            return newItems;
        });
    }, []);

    // Thêm sản phẩm vào giỏ
    const addItem = useCallback((product: Product, quantity: number = 1) => {
        setItemsAndPersist(prev => {
            const existingIndex = prev.findIndex(item => item.product._id === product._id);
            if (existingIndex >= 0) {
                // Sản phẩm đã tồn tại → tăng quantity
                const updated = [...prev];
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    quantity: updated[existingIndex].quantity + quantity,
                };
                return updated;
            }
            // Sản phẩm mới → thêm vào
            return [...prev, { product, quantity, selected: true }];
        });
    }, [setItemsAndPersist]);

    // Xoá sản phẩm khỏi giỏ
    const removeItem = useCallback((productId: string) => {
        setItemsAndPersist(prev => prev.filter(item => item.product._id !== productId));
    }, [setItemsAndPersist]);

    // Cập nhật số lượng
    const updateQuantity = useCallback((productId: string, quantity: number) => {
        if (quantity < 1) return;
        setItemsAndPersist(prev =>
            prev.map(item =>
                item.product._id === productId
                    ? { ...item, quantity }
                    : item
            )
        );
    }, [setItemsAndPersist]);

    // Toggle chọn 1 sản phẩm
    const toggleSelect = useCallback((productId: string) => {
        setItemsAndPersist(prev =>
            prev.map(item =>
                item.product._id === productId
                    ? { ...item, selected: !item.selected }
                    : item
            )
        );
    }, [setItemsAndPersist]);

    // Toggle chọn tất cả
    const toggleSelectAll = useCallback(() => {
        setItemsAndPersist(prev => {
            const allSelected = prev.every(item => item.selected);
            return prev.map(item => ({ ...item, selected: !allSelected }));
        });
    }, [setItemsAndPersist]);

    // Xoá toàn bộ giỏ hàng
    const clearCart = useCallback(() => {
        setItemsAndPersist([]);
    }, [setItemsAndPersist]);

    // Các giá trị tính toán
    const derived = useMemo(() => {
        const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
        const selectedItems = items.filter(item => item.selected);
        const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
        const total = selectedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
        const selectedCount = selectedItems.reduce((sum, item) => sum + item.quantity, 0);

        return { totalItems, selectedItems, subtotal, total, selectedCount };
    }, [items]);

    const value = useMemo<CartContextType>(() => ({
        items,
        addItem,
        removeItem,
        updateQuantity,
        toggleSelect,
        toggleSelectAll,
        clearCart,
        totalItems: derived.totalItems,
        subtotal: derived.subtotal,
        total: derived.total,
        selectedItems: derived.selectedItems,
        selectedCount: derived.selectedCount,
    }), [items, addItem, removeItem, updateQuantity, toggleSelect, toggleSelectAll, clearCart, derived]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart(): CartContextType {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
