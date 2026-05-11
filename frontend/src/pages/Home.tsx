import BannerSlider from "@/components/BannerSlider";
import CategorySection from "@/components/CategorySection";
import Pagination from "@/components/Pagination";
import ProductGrid from "@/components/ProductGrid";
import { useFilteredProducts } from "@/hooks/useFilteredProducts";

function Home() {
    const {
        products,
        loading,
        error,
        categories,
        selectedCategory,
        setSelectedCategory,
        currentPage,
        setCurrentPage,
        totalPages,
    } = useFilteredProducts(12);
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500">Error: {error}</p>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white antialiased">
            <BannerSlider />

            {/* Debug: Hiển thị số lượng categories */}
            <div className="text-center text-sm text-gray-400">
                Categories loaded: {categories.length}
            </div>

            <CategorySection
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />

            <ProductGrid
                products={products}
                loading={loading}
                onResetCategory={() => setSelectedCategory("")}
            />

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