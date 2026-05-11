export interface Product {
    _id: string;
    title: string;
    price: number;
    category: string;
    image: string;
    createdAt: string;
    // ... các field khác
}

export interface Pagination {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
}

export interface ProductsResponse {
    success: boolean;
    data: Product[];
    pagination: Pagination;
}
export interface CategorySectionProps {
    categories: string[];
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
}
export interface FetchProductsParams {
    category?: string;
    page?: number;
    limit?: number;
    sort?: string;
}