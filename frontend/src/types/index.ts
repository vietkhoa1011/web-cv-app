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

// Response từ /api/products
export interface ProductsResponse {
    success: boolean;
    data: Product[];
    pagination: Pagination;
}

// Response từ /api/category (đơn giản là mảng string)
export type CategoriesResponse = string[];

// Params gửi lên khi fetch products
export interface FetchProductsParams {
    category?: string;
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