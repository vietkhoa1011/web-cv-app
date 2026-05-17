import { useQuery } from '@tanstack/react-query';
import { fetchProductById } from '@/services/api';

export function useProduct(id: string) {
    return useQuery({
        queryKey: ['product', id],// key duy nhất cho từng sản phẩm theo id
        queryFn: () => fetchProductById(id),// gọi API lấy chi tiết sản phẩm theo id
        enabled: !!id, // chỉ chạy query khi có id, tránh lỗi khi id rỗng
        staleTime: 5 * 60 * 1000, // cache 5 phút
    });
}