import { Product, ProductsResponse, FetchProductsParams, CategoriesResponse, ProductDetailResponse, SearchSuggestionsResponse } from '@/types';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ----- PRODUCTS -----
export async function fetchProducts(params: FetchProductsParams = {}): Promise<ProductsResponse> {
    const searchParams = new URLSearchParams();

    // Chỉ gửi params nếu có giá trị (không gửi empty strings)
    if (params.search && params.search.trim()) searchParams.set('search', params.search.trim());
    if (params.category && params.category.trim()) searchParams.set('category', params.category.trim());
    if (params.priceMin !== undefined && params.priceMin > 0) searchParams.set('priceMin', params.priceMin.toString());
    if (params.priceMax !== undefined && params.priceMax > 0) searchParams.set('priceMax', params.priceMax.toString());
    if (params.rating !== undefined && params.rating > 0) searchParams.set('rating', params.rating.toString());
    if (params.page) searchParams.set('page', params.page.toString());
    if (params.limit) searchParams.set('limit', params.limit.toString());
    if (params.sort) searchParams.set('sort', params.sort);

    const url = `${BASE_URL}/products${searchParams.toString() ? `?${searchParams}` : ''}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    const json: ProductsResponse = await response.json();
    if (!json.success || !Array.isArray(json.data)) {
        throw new Error('Invalid API response structure');
    }
    return json;
}

// ----- SEARCH SUGGESTIONS (realtime) -----
export async function fetchSearchSuggestions(q: string, signal?: AbortSignal): Promise<Product[]> {
    if (!q.trim()) return [];

    const url = `${BASE_URL}/products/search?q=${encodeURIComponent(q.trim())}`;
    const response = await fetch(url, { signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    const json: SearchSuggestionsResponse = await response.json();
    if (!json.success || !Array.isArray(json.data)) {
        throw new Error('Invalid search suggestions response');
    }
    return json.data;
}

// ----- CATEGORIES -----
export async function fetchCategories(): Promise<string[]> {
    const url = `${BASE_URL}/category`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    const json: CategoriesResponse = await response.json();
    if (!Array.isArray(json)) {
        throw new Error('Invalid categories response');
    }
    return json;
}

// ----- PRODUCT DETAIL -----
export async function fetchProductById(id: string): Promise<Product> {
    const url = `${BASE_URL}/products/${id}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    const json: ProductDetailResponse = await res.json();
    if (json.success && json.data) {
        return json.data;
    }
    throw new Error('Invalid product detail response');
}

