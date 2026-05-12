import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchProducts } from '@/services/api';
import type { FetchProductsParams } from '@/types';

export function useProducts(params: FetchProductsParams = {}) {
  const { category, page = 1, limit = 12, sort } = params;
  return useQuery({
    queryKey: ['products', { category, page, limit, sort }],
    queryFn: () => fetchProducts({ category, page, limit, sort }),
    placeholderData: keepPreviousData, // giữ data cũ khi chuyển trang, tránh loading trắng
  });
}