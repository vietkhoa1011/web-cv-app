import { Product } from "@/types/index";
import ProductCard from "./ProductCard";
interface ProductGridProps {
    products: Product[];
    loading: boolean;
}

export default function ProductGrid({
    products,
    loading,
}: ProductGridProps) {
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
                <div className="pb-6 border-b border-stone-200">
                    <h2 className="text-3xl font-bold text-stone-900 tracking-tight">
                        Featured <span className="text-stone-400 font-light">Products</span>
                    </h2>
                </div>
            </div>
            {/* Products Grid */}
            <div className="max-w-7xl mx-auto">
                {products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 bg-stone-50 rounded-xl border border-stone-200">
                        <p className="text-stone-500 text-sm font-medium">No products found</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

