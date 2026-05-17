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