import { useState, useCallback, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import type { SearchFilters } from '@/types';

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
  activeFilters?: SearchFilters;
}

export default function SearchBar({ onSearch, activeFilters }: SearchBarProps) {
  const [searchInput, setSearchInput] = useState(activeFilters?.search || '');

  // Sync searchInput with activeFilters.search when it changes externally
  useEffect(() => {
    if (activeFilters?.search !== undefined) {
      setSearchInput(activeFilters.search);
    }
  }, [activeFilters?.search]);

  const handleSearch = useCallback(() => {
    onSearch({ ...activeFilters, search: searchInput });
  }, [searchInput, activeFilters, onSearch]);

  const handleClear = useCallback(() => {
    setSearchInput('');
    onSearch({ ...activeFilters, search: '' });
  }, [activeFilters, onSearch]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const filterCount = Object.values(activeFilters || {}).filter(
    (val) => val !== undefined && val !== '' && val !== 0
  ).length;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center gap-2">
        <div className="flex-1 relative">
          <div className="relative flex items-center bg-white border border-stone-300 rounded-lg shadow-sm hover:border-stone-400 focus-within:border-stone-500 focus-within:ring-1 focus-within:ring-stone-500">
            <Search className="w-5 h-5 text-stone-400 ml-3" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 px-3 py-2 outline-none text-sm text-stone-900 placeholder-stone-500"
            />
            {searchInput && (
              <button
                onClick={handleClear}
                className="px-2 py-2 hover:bg-stone-100 rounded"
                type="button"
              >
                <X className="w-4 h-4 text-stone-500" />
              </button>
            )}
          </div>
        </div>

        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 font-medium text-sm whitespace-nowrap transition-colors"
        >
          Search
        </button>
      </div>

      {filterCount > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {activeFilters?.search && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 rounded-full text-sm">
              <span className="text-stone-700">
                Search: <span className="font-medium">{activeFilters.search}</span>
              </span>
              <button
                onClick={() => onSearch({ ...activeFilters, search: '' })}
                className="hover:text-stone-900"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          {activeFilters?.category && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 rounded-full text-sm">
              <span className="text-stone-700">
                Category: <span className="font-medium">{activeFilters.category}</span>
              </span>
              <button
                onClick={() => onSearch({ ...activeFilters, category: '' })}
                className="hover:text-stone-900"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          {(activeFilters?.priceMin !== undefined || activeFilters?.priceMax !== undefined) && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 rounded-full text-sm">
              <span className="text-stone-700">
                Price: ${activeFilters?.priceMin || '0'} - $
                {activeFilters?.priceMax || '∞'}
              </span>
              <button
                onClick={() =>
                  onSearch({ ...activeFilters, priceMin: undefined, priceMax: undefined })
                }
                className="hover:text-stone-900"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          {activeFilters?.rating !== undefined && activeFilters?.rating > 0 && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 rounded-full text-sm">
              <span className="text-stone-700">
                Rating: <span className="font-medium">≥ {activeFilters.rating}★</span>
              </span>
              <button
                onClick={() => onSearch({ ...activeFilters, rating: undefined })}
                className="hover:text-stone-900"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
