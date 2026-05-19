import { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Loader2 } from 'lucide-react';
import { useSearchSuggestions } from '@/hooks/useSearchSuggestions';
import { useClickOutside } from '@/hooks/useClickOutside';
import type { Product } from '@/types';

interface HeaderSearchProps {
  initialKeyword?: string;
  onSearchChange?: (keyword: string) => void;
}

/**
 * HeaderSearch - Component search realtime trong Header.
 * 
 * Features:
 * - Gõ là search realtime (debounce 400ms)
 * - Dropdown suggestions như Shopee/Amazon
 * - Click outside / ESC để đóng
 * - Highlight keyword matching
 * - Loading spinner
 * - Responsive mobile
 */
export default function HeaderSearch({ initialKeyword = '', onSearchChange }: HeaderSearchProps) {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const { suggestions, isLoading, isFetching } = useSearchSuggestions(keyword);

  // Click outside => đóng dropdown
  const dropdownRef = useClickOutside<HTMLDivElement>(() => {
    setIsOpen(false);
  });

  // Sync với URL khi có initialKeyword thay đổi
  useEffect(() => {
    setKeyword(initialKeyword);
  }, [initialKeyword]);

  // Báo cho parent component biết keyword thay đổi (để sync URL)
  const handleInputChange = useCallback((value: string) => {
    setKeyword(value);
    onSearchChange?.(value);
    if (value.trim()) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [onSearchChange]);

  const handleClear = useCallback(() => {
    setKeyword('');
    onSearchChange?.('');
    setIsOpen(false);
    inputRef.current?.focus();
  }, [onSearchChange]);

  const handleSelectProduct = useCallback((productId: string) => {
    setIsOpen(false);
    setKeyword('');
    navigate(`/product/${productId}`);
  }, [navigate]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  }, []);

  const handleFocus = useCallback(() => {
    if (keyword.trim().length >= 2) {
      setIsOpen(true);
    }
  }, [keyword]);

  const showDropdown = isOpen && keyword.trim().length >= 2;
  const showLoading = isFetching || isLoading;

  // Highlight keyword trong text
  const highlightMatch = (text: string) => {
    if (!keyword.trim()) return text;
    const regex = new RegExp(`(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) => 
      regex.test(part) ? (
        <span key={i} className="font-semibold text-stone-900">{part}</span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <div ref={dropdownRef} className="relative flex-1 max-w-2xl hidden md:block">
      <div className="relative group">
        <input
          ref={inputRef}
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={keyword}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          className="w-full bg-white border border-slate-200 rounded-full py-2.5 pl-5 pr-12 text-sm transition-all 
            focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-400"
        />
        <div className="absolute right-1.5 top-1.5 flex items-center gap-1">
          {showLoading && (
            <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
          )}
          {keyword && !showLoading && (
            <button
              onClick={handleClear}
              className="p-1 hover:bg-slate-100 rounded-full transition-colors"
              type="button"
              aria-label="Clear search"
            >
              <X size={14} className="text-slate-400" />
            </button>
          )}
        </div>
      </div>

      {/* Dropdown Suggestions */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-50">
          {suggestions.length > 0 ? (
            <ul className="py-2 max-h-96 overflow-y-auto">
              {suggestions.map((product: Product) => (
                <li key={product._id}>
                  <button
                    onClick={() => handleSelectProduct(product._id)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left"
                  >
                    {/* Product Image */}
                    <div className="w-12 h-12 flex-shrink-0 bg-slate-100 rounded-lg overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-stone-800 line-clamp-1">
                        {highlightMatch(product.title)}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-semibold text-sky-600">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.rating?.rate && (
                          <span className="text-xs text-stone-400">
                            ★ {product.rating.rate.toFixed(1)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Category tag */}
                    {product.category && (
                      <span className="text-[10px] text-stone-400 uppercase tracking-wider flex-shrink-0 hidden sm:block">
                        {product.category}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            !showLoading && (
              <div className="px-4 py-8 text-center">
                <Search className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                <p className="text-sm text-stone-500">No products found</p>
                <p className="text-xs text-stone-400 mt-1">
                  Try different keywords
                </p>
              </div>
            )
          )}

          {/* Loading skeleton */}
          {showLoading && suggestions.length === 0 && (
            <div className="px-4 py-4 space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 animate-pulse">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-slate-100 rounded w-3/4" />
                    <div className="h-3 bg-slate-100 rounded w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
