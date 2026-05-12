import { ProductsResponse, FetchProductsParams, CategoriesResponse } from '@/types';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ----- PRODUCTS -----
export async function fetchProducts(params: FetchProductsParams = {}): Promise<ProductsResponse> {
    const searchParams = new URLSearchParams();
    if (params.category) searchParams.set('category', params.category);
    if (params.page) searchParams.set('page', params.page.toString());
    if (params.limit) searchParams.set('limit', params.limit.toString());
    if (params.sort) searchParams.set('sort', params.sort);

    const url = `${BASE_URL}/products${searchParams.toString() ? `?${searchParams}` : ''}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    const json: ProductsResponse = await response.json();
    // Đảm bảo data và pagination luôn có
    if (!json.success || !Array.isArray(json.data)) {
        throw new Error('Invalid API response structure');
    }
    return json;
}

// ----- CATEGORIES -----
export async function fetchCategories(): Promise<string[]> {
    const url = `${BASE_URL}/category`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    const json: CategoriesResponse = await response.json();
    // API trả về mảng string trực tiếp
    if (!Array.isArray(json)) {
        throw new Error('Invalid categories response');
    }
    return json; // đã là string[]
}