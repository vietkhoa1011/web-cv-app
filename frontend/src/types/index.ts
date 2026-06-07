// types/index.ts

export interface Product {
    _id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
    createdAt?: string;
}

export interface Pagination {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
}

export interface FilterMetadata {
    categories: string[];
    priceRange: {
        minPrice: number;
        maxPrice: number;
    };
}

// Response từ /api/products
export interface ProductsResponse {
    success: boolean;
    data: Product[];
    pagination: Pagination;
    filters?: FilterMetadata;
}

// Response từ /api/category (đơn giản là mảng string)
export type CategoriesResponse = string[];

// Search/Filter params
export interface SearchFilters {
    search?: string;
    category?: string;
    priceMin?: number;
    priceMax?: number;
    rating?: number;
}

// Params gửi lên khi fetch products
export interface FetchProductsParams extends SearchFilters {
    page?: number;
    limit?: number;
    sort?: string;
}

// Các type cho hook/component
export interface CategorySectionProps {
    categories: string[];
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
}
// Type cho chi tiết sản phẩm
export interface ProductDetailResponse {
    success: boolean;
    data: Product; // chi tiết 1 sản phẩm
}

// Type cho search suggestions
export interface SearchSuggestionsResponse {
    success: boolean;
    data: Product[];
}

// ----- AUTH TYPES -----
export interface AuthUser {
    id: string;
    username: string;
    email: string;
    role: 'admin' | 'user';
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: AuthUser;
}

export interface AuthErrorResponse {
    message: string;
}

// ----- CART TYPES -----
export interface CartItem {
    product: Product;
    quantity: number;
    selected: boolean;
}

export interface CartContextType {
    items: CartItem[];
    addItem: (product: Product, quantity?: number) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    toggleSelect: (productId: string) => void;
    toggleSelectAll: () => void;
    clearCart: () => void;
    totalItems: number;
    subtotal: number;
    total: number;
    selectedItems: CartItem[];
    selectedCount: number;
}

// ----- ORDER TYPES -----
export interface OrderItem {
    product: string;
    quantity: number;
    price: number;
    snapshot: {
        title: string;
        image: string;
    };
}

export interface Order {
    _id: string;
    user: string | { _id: string; username: string; email: string };
    items: OrderItem[];
    total: number;
    status: 'pending' | 'completed' | 'cancelled';
    createdAt: string;
    updatedAt: string;
}

export interface CreateOrderPayload {
    items: Array<{
        productId: string;
        quantity: number;
    }>;
}

export interface OrdersResponse {
    success: boolean;
    data: Order[];
    pagination: Pagination;
}

export interface SingleOrderResponse {
    success: boolean;
    data: Order;
    message?: string;
}

