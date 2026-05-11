const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

interface FetchProductsParams {
    category?: string;
    page?: number;
    limit?: number;
    sort?: string;
}

export async function fetchProducts(params: FetchProductsParams = {}): Promise<any> {
    const searchParams = new URLSearchParams();

    // Chỉ thêm params khi có giá trị
    if (params.category && params.category.trim() !== '') {
        searchParams.set("category", params.category);

    }
    if (params.page) {
        searchParams.set("page", params.page.toString());
    }
    if (params.limit) {
        searchParams.set("limit", params.limit.toString());
    }
    if (params.sort) {
        searchParams.set("sort", params.sort);
    }

    const queryString = searchParams.toString();
    const url = `${API_BASE_URL}/products${queryString ? `?${queryString}` : ""}`;



    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();

        return result;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

export async function fetchCategories(): Promise<any> {
    const url = `${API_BASE_URL}/category`;


    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        return result;
    } catch (error) {
        console.error('Fetch categories error:', error);
        throw error;
    }
}