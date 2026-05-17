import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchProducts } from '@/services/api';
import type { FetchProductsParams } from '@/types';
import { useMemo } from 'react';

interface UseProductSearchOptions extends FetchProductsParams {
  debounceMs?: number;
}

export function useProductSearch(params: UseProductSearchOptions = {}) {
  const { debounceMs = 500, ...queryParams } = params;

  // Debounce search parameter
  const debouncedParams = useMemo(() => {
    return queryParams;
  }, [
    queryParams.search,
    queryParams.category,
    queryParams.priceMin,
    queryParams.priceMax,
    queryParams.rating,
    queryParams.page,
    queryParams.limit,
    queryParams.sort,
  ]);

  return useQuery({
    queryKey: ['products-search', debouncedParams],
    queryFn: () => fetchProducts(debouncedParams),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
