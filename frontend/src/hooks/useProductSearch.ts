import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchProducts } from '@/services/api';
import type { FetchProductsParams } from '@/types';
import { useMemo } from 'react';

export function useProductSearch(params: FetchProductsParams = {}) {
  // Memoize params để tránh re-fetch không cần thiết
  const queryParams = useMemo(() => params, [
    params.search,
    params.category,
    params.priceMin,
    params.priceMax,
    params.rating,
    params.page,
    params.limit,
    params.sort,
  ]);

  return useQuery({
    queryKey: ['products-search', queryParams],
    queryFn: () => fetchProducts(queryParams),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

