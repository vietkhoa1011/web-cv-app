import { useQuery } from '@tanstack/react-query';
import { fetchSearchSuggestions } from '@/services/api';
import { useDebounce } from './useDebounce';

/**
 * Custom hook cho search suggestions (realtime).
 * - Debounce input 400ms
 * - Dùng TanStack Query với AbortSignal để cancel request cũ
 * - Chỉ fetch khi keyword có độ dài >= 2
 */
export function useSearchSuggestions(keyword: string) {
  const debouncedKeyword = useDebounce(keyword, 400);

  const shouldFetch = debouncedKeyword.trim().length >= 2;

  const query = useQuery({
    queryKey: ['search-suggestions', debouncedKeyword],
    queryFn: ({ signal }) => fetchSearchSuggestions(debouncedKeyword, signal),
    enabled: shouldFetch,
    staleTime: 60 * 1000, // 1 phút mới refetch
    gcTime: 5 * 60 * 1000, // giữ cache 5 phút
    retry: 1,
  });

  return {
    suggestions: query.data ?? [],
    isLoading: query.isLoading && shouldFetch,
    isError: query.isError,
    error: query.error,
    isFetching: query.isFetching,
  };
}
