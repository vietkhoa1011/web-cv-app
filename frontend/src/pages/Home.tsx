import BannerSlider from "@/components/BannerSlider";
import CategorySection from "@/components/CategorySection";
import ProductGrid from "@/components/ProductGrid";
import { useFilteredProducts } from "@/hooks/useFilteredProducts";
function Home() {
    const {
        filteredProducts,
        loading,
        error,
        categories,
        selectedCategory,
        setSelectedCategory,
        resetCategory,
    } = useFilteredProducts();
    // Xử lý loading và error
    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (error) return <div className="min-h-screen flex items-center justify-center">Error: {error}</div>;
    return (
        <main className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white antialiased">
            {/* Hero Banner */}
            <BannerSlider />

            {/* Categories */}
            <CategorySection
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
            />

            {/* Featured Products */}
            <ProductGrid
                products={filteredProducts}
                onResetCategory={resetCategory}
            />
        </main>
    );
}

export default Home;