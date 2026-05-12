import { useState } from "react";
import { Product } from "@/types/index";
import ProductCard from "./ProductCard";
import ProductSidebar from "./ProductSidebar";

interface ProductGridProps {
    products: Product[];
    loading: boolean;
    onResetCategory: () => void;
    onCategoryFilter?: (category: string) => void;
}

export default function ProductGrid({
    products,
    loading,
    onResetCategory,
    onCategoryFilter
}: ProductGridProps) {
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>();

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
        onCategoryFilter?.(category);
    };

    if (loading) {
        return (
            <section className="w-full px-4 py-16">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-2 border-stone-300 border-t-stone-900"></div>
                </div>
            </section>
        );
    }

    return (
        <section id="featured" className="w-full px-4 py-12">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-10">
                <div className="flex items-center justify-between pb-6 border-b border-stone-200">
                    <div>
                        <h2 className="text-3xl font-bold text-stone-900 tracking-tight">
                            Featured <span className="text-stone-400 font-light">Products</span>
                        </h2>
                    </div>
                    {selectedCategory && (
                        <button
                            onClick={() => {
                                setSelectedCategory(undefined);
                                onResetCategory();
                            }}
                            className="text-sm font-semibold uppercase text-stone-600 border-b-2 border-stone-300 hover:text-stone-900 hover:border-stone-900 transition-all duration-200"
                        >
                            View All ✕
                        </button>
                    )}
                </div>
            </div>

            {/* Main Layout: Sidebar + Grid */}
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar - Hidden on mobile, sticky on desktop */}
                    <div className="lg:sticky lg:top-6 lg:h-fit">
                        <ProductSidebar
                            onCategorySelect={handleCategorySelect}
                            selectedCategory={selectedCategory}
                        />
                    </div>

                    {/* Products Grid */}
                    <div className="lg:col-span-3">
                        {products.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 bg-stone-50 rounded-xl border border-stone-200">
                                <p className="text-stone-500 text-sm font-medium">No products found</p>
                                <button
                                    onClick={() => {
                                        setSelectedCategory(undefined);
                                        onResetCategory();
                                    }}
                                    className="mt-4 text-xs font-semibold text-stone-700 hover:text-stone-900 uppercase tracking-wide"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {products.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}


