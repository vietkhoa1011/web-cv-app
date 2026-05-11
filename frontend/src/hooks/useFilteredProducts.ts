import { useState, useEffect, useCallback } from "react";
import { Product, Pagination } from "@/types/index";
import { fetchProducts, fetchCategories } from "@/services/api";

interface UseFilteredProductsReturn {
    products: Product[];
    pagination: Pagination;
    loading: boolean;
    error: string | null;
    categories: string[];
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalPages: number;
}

export function useFilteredProducts(itemsPerPage: number = 12): UseFilteredProductsReturn {
    const [categories, setCategories] = useState<string[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [pagination, setPagination] = useState<Pagination>({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // Load categories từ API
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await fetchCategories();

                let categoryList: string[] = [];

                // Xử lý nhiều format response
                if (Array.isArray(data)) {
                    // Nếu API trả về array trực tiếp
                    if (data.length > 0 && typeof data[0] === 'object' && data[0].name) {
                        // Nếu là array of objects với field 'name'
                        categoryList = data.map((item: any) => item.name);
                    } else {
                        // Nếu là array of strings
                        categoryList = data as string[];
                    }
                } else if (data?.data && Array.isArray(data.data)) {
                    // Nếu response có cấu trúc { success: true, data: [...] }
                    const categoryData = data.data;
                    if (categoryData.length > 0 && typeof categoryData[0] === 'object' && categoryData[0].name) {
                        categoryList = categoryData.map((item: any) => item.name);
                    } else {
                        categoryList = categoryData as string[];
                    }
                }

                // Loại bỏ duplicates và empty values
                categoryList = [...new Set(categoryList.filter(Boolean))];


                setCategories(categoryList);
            } catch (err) {
                console.error('Failed to load categories:', err);
            }
        };

        loadCategories();
    }, []);

    // Load products with filter
    const loadProducts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const params: Record<string, string | number> = {
                page: currentPage,
                limit: itemsPerPage,
            };

            // Chỉ thêm category nếu có giá trị
            if (selectedCategory && selectedCategory.trim() !== '') {
                params.category = selectedCategory;
            }

            const response = await fetchProducts(params);


            if (response && response.success && response.data) {
                setProducts(response.data);
                setPagination(response.pagination);

            } else if (response && response.data) {
                setProducts(response.data);
                setPagination(response.pagination || {
                    currentPage: 1,
                    totalPages: 1,
                    totalItems: response.data.length,
                    itemsPerPage: response.data.length,
                });
            } else {
                console.warn('Unexpected response format:', response);
                setProducts([]);
            }
        } catch (err) {
            console.error('Failed to load products:', err);
            setError(err instanceof Error ? err.message : 'Failed to load products');
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, [selectedCategory, currentPage, itemsPerPage]);

    // Reload products khi category hoặc page thay đổi
    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    // Handle category change - reset page về 1
    const handleSetCategory = useCallback((category: string) => {

        // Force update
        setSelectedCategory(category);
        setCurrentPage(1);
    }, []);

    return {
        products,
        pagination,
        loading,
        error,
        categories,
        selectedCategory,
        setSelectedCategory: handleSetCategory,
        currentPage,
        setCurrentPage,
        totalPages: pagination.totalPages,
    };
}

