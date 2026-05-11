import { useState, useEffect } from 'react';
import { fetchCategories } from '@/services/api';

export default function useCategories() {
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                setLoading(true);
                const data = await fetchCategories();



                // Xử lý nhiều định dạng dữ liệu
                let categoryNames: string[];

                if (Array.isArray(data)) {
                    if (data.length > 0 && typeof data[0] === 'object') {
                        // Nếu là [{ _id: "...", name: "Category" }]
                        categoryNames = data.map((item: any) => item.name || item.title || item.category);
                    } else {
                        // Nếu đã là ["Category1", "Category2"]
                        categoryNames = data as string[];
                    }
                } else if (data.data && Array.isArray(data.data)) {
                    // Nếu response có cấu trúc { success: true, data: [...] }
                    categoryNames = data.data.map((item: any) => item.name || item.title || item.category);
                } else {
                    categoryNames = [];
                }

                // Loại bỏ duplicates và empty values
                setCategories([...new Set(categoryNames.filter(Boolean))]);
            } catch (err) {
                console.error('Failed to load categories:', err);
                setError(err instanceof Error ? err.message : 'Failed to load categories');
            } finally {
                setLoading(false);
            }
        };

        loadCategories();
    }, []);

    return { categories, loading, error };
}

