import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '@/services/api';

export function useCategories() {
    return useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
        staleTime: 10 * 60 * 1000, // 10 phút, categories ít thay đổi
    });
}