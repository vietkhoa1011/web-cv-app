import { useState } from 'react';
import BannerSlider from '@/components/BannerSlider';
import CategorySection from '@/components/CategorySection';
import Pagination from '@/components/Pagination';
import ProductGrid from '@/components/ProductGrid';
import { useCategories } from '@/hooks/useCategories';
import { useProducts } from '@/hooks/useProducts';

function Home() {
    // State for filtering and pagination
    const [selectedCategory, setSelectedCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    // Fetch categories
    const {
        data: categories = [],
        isLoading: catLoading,
        isError: catError,
        error: catErrorObj,
    } = useCategories();

    // Fetch products based on filter & page
    const {
        data: productsResponse,
        isLoading: prodLoading,
        isError: prodError,
        error: prodErrorObj,
    } = useProducts({
        category: selectedCategory || undefined, // bỏ qua param nếu rỗng
        page: currentPage,
        limit: itemsPerPage,
    });

    // Extract data from response
    const products = productsResponse?.data ?? [];
    const pagination = productsResponse?.pagination;
    const totalPages = pagination?.totalPages ?? 1;

    // Combine loading/error states for simplicity
    const loading = catLoading || prodLoading;
    const error = catError || prodError;

    // When category changes, reset to page 1
    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    // Error state (có thể hiển thị lỗi cụ thể hơn nếu muốn)
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500">
                    Error: {(catErrorObj as Error)?.message || (prodErrorObj as Error)?.message || 'Something went wrong'}
                </p>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white antialiased">
            <BannerSlider />

            <CategorySection
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={handleCategoryChange}
            />
            {catError && <p className="text-red-400">Could not load categories</p>}
            <ProductGrid
                products={products}
                loading={loading}
                onResetCategory={() => handleCategoryChange('')}
                onCategoryFilter={handleCategoryChange}
            />
            {prodError && <p className="text-red-500">Failed to load products: {(prodErrorObj as Error)?.message}</p>}

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}
        </main>
    );
}

export default Home;