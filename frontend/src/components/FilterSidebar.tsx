import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { SearchFilters, FilterMetadata } from '@/types';

interface FilterSidebarProps {
  filters: FilterMetadata;
  activeFilters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
  onClearAll: () => void;
}

export default function FilterSidebar({
  filters,
  activeFilters,
  onFilterChange,
  onClearAll,
}: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    category: true,
    price: true,
    rating: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCategoryChange = (category: string) => {
    onFilterChange({
      ...activeFilters,
      category: activeFilters.category === category ? '' : category,
    });
  };

  const handlePriceMinChange = (value: string) => {
    onFilterChange({
      ...activeFilters,
      priceMin: value ? parseFloat(value) : undefined,
    });
  };

  const handlePriceMaxChange = (value: string) => {
    onFilterChange({
      ...activeFilters,
      priceMax: value ? parseFloat(value) : undefined,
    });
  };

  const handleRatingChange = (rating: number) => {
    onFilterChange({
      ...activeFilters,
      rating: activeFilters.rating === rating ? undefined : rating,
    });
  };

  const hasActiveFilters =
    activeFilters.category ||
    activeFilters.priceMin ||
    activeFilters.priceMax ||
    activeFilters.rating;

  return (
    <aside className="w-full px-4 py-6 bg-stone-50 border border-stone-200 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-stone-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={onClearAll}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="mb-6 border-b border-stone-200 pb-6">
        <button
          onClick={() => toggleSection('category')}
          className="w-full flex items-center justify-between mb-4 hover:text-stone-700"
        >
          <h4 className="font-medium text-stone-900">Category</h4>
          <ChevronDown
            className={`w-4 h-4 text-stone-400 transition-transform ${expandedSections.category ? '' : '-rotate-90'
              }`}
          />
        </button>

        {expandedSections.category && (
          <div className="space-y-2 pl-2">
            {filters.categories && filters.categories.length > 0 ? (
              filters.categories.map((category) => (
                <label key={category} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activeFilters.category === category}
                    onChange={() => handleCategoryChange(category)}
                    className="w-4 h-4 rounded border-stone-300 cursor-pointer"
                  />
                  <span className="ml-2 text-sm text-stone-700">{category}</span>
                </label>
              ))
            ) : (
              <p className="text-sm text-stone-500">No categories available</p>
            )}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="mb-6 border-b border-stone-200 pb-6">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between mb-4 hover:text-stone-700"
        >
          <h4 className="font-medium text-stone-900">Price Range</h4>
          <ChevronDown
            className={`w-4 h-4 text-stone-400 transition-transform ${expandedSections.price ? '' : '-rotate-90'
              }`}
          />
        </button>

        {expandedSections.price && (
          <div className="space-y-3 pl-2">
            <div>
              <label className="text-sm text-stone-600">Min Price</label>
              <input
                type="number"
                value={activeFilters.priceMin || ''}
                onChange={(e) => handlePriceMinChange(e.target.value)}
                placeholder={`$${filters.priceRange?.minPrice || 0}`}
                className="w-full px-2 py-1 mt-1 text-sm border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-stone-500"
              />
            </div>
            <div>
              <label className="text-sm text-stone-600">Max Price</label>
              <input
                type="number"
                value={activeFilters.priceMax || ''}
                onChange={(e) => handlePriceMaxChange(e.target.value)}
                placeholder={`$${filters.priceRange?.maxPrice || 10000}`}
                className="w-full px-2 py-1 mt-1 text-sm border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-stone-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('rating')}
          className="w-full flex items-center justify-between mb-4 hover:text-stone-700"
        >
          <h4 className="font-medium text-stone-900">Rating</h4>
          <ChevronDown
            className={`w-4 h-4 text-stone-400 transition-transform ${expandedSections.rating ? '' : '-rotate-90'
              }`}
          />
        </button>

        {expandedSections.rating && (
          <div className="space-y-2 pl-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={activeFilters.rating === rating}
                  onChange={() => handleRatingChange(rating)}
                  className="w-4 h-4 rounded border-stone-300 cursor-pointer"
                />
                <span className="ml-2 text-sm text-stone-700">
                  {rating}★ & up
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
