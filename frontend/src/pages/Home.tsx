import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import BannerSlider from '@/components/BannerSlider';
import Pagination from '@/components/Pagination';
import ProductGrid from '@/components/ProductGrid';
import FilterSidebar from '@/components/FilterSidebar';
import ProductSidebar from '@/components/ProductSidebar';
import { useProductSearch } from '@/hooks/useProductSearch';
import type { SearchFilters } from '@/types';

function Home() {
    const [searchParams] = useSearchParams();
    const urlKeyword = searchParams.get('q') || '';

    // Search and filter state
    const [searchFilters, setSearchFilters] = useState<SearchFilters>({
        search: urlKeyword,
        category: '',
        priceMin: undefined,
        priceMax: undefined,
        rating: undefined,
    });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    // Sync URL keyword với searchFilters khi URL thay đổi
    useEffect(() => {
        setSearchFilters(prev => ({
            ...prev,
            search: urlKeyword,
        }));
        setCurrentPage(1);
    }, [urlKeyword]);

    // Fetch products based on search/filters & page
    const {
        data: productsResponse,
        isLoading: prodLoading,
        isError: prodError,
        error: prodErrorObj,
    } = useProductSearch({
        ...searchFilters,
        page: currentPage,
        limit: itemsPerPage,
    });

    // Extract data from response
    const products = productsResponse?.data ?? [];
    const pagination = productsResponse?.pagination;
    const filterMetadata = productsResponse?.filters;
    const totalPages = pagination?.totalPages ?? 1;

    // When filters change, reset to page 1
    const handleFilterChange = (filters: SearchFilters) => {
        setSearchFilters(filters);
        setCurrentPage(1);
    };

    const handleClearAllFilters = () => {
        setSearchFilters({
            search: urlKeyword,
            category: '',
            priceMin: undefined,
            priceMax: undefined,
            rating: undefined,
        });
        setCurrentPage(1);
    };

    // Error state
    if (prodError) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500">
                    Error: {(prodErrorObj as Error)?.message || 'Something went wrong'}
                </p>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white antialiased">
            <BannerSlider />

            {/* Main content with sidebar */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar */}
                    <div className="lg:col-span-1 flex flex-col gap-6">
                        {/* Filter Sidebar - category/price/rating từ API */}
                        {filterMetadata && (
                            <FilterSidebar
                                filters={filterMetadata}
                                activeFilters={searchFilters}
                                onFilterChange={handleFilterChange}
                                onClearAll={handleClearAllFilters}
                            />
                        )}
                        {/* Product Sidebar - promo + shipping */}
                        <ProductSidebar />
                    </div>

                    {/* Products Grid */}
                    <div className="lg:col-span-3">
                        {/* Search result info */}
                        {searchFilters.search && (
                            <div className="mb-6 flex items-center justify-between">
                                <p className="text-sm text-stone-600">
                                    Search results for: <span className="font-semibold text-stone-900">"{searchFilters.search}"</span>
                                    {!prodLoading && <span className="text-stone-400 ml-2">({pagination?.totalItems || 0} products)</span>}
                                </p>
                            </div>
                        )}

                        <ProductGrid
                            products={products}
                            loading={prodLoading}
                        />
                        {prodError && (
                            <p className="text-red-500">
                                Failed to load products: {(prodErrorObj as Error)?.message}
                            </p>
                        )}
                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="mt-8">
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={setCurrentPage}
                                />
                            </div>
                        )}

                        {/* No results state */}
                        {!prodLoading && products.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-12">
                                <p className="text-lg text-stone-600 mb-4">No products found</p>
                                <button
                                    onClick={handleClearAllFilters}
                                    className="px-4 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 text-sm font-medium"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Home;