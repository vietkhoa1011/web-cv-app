import { Product } from "@/types/interface";
import ProductCard from "./ProductCard";

interface ProductGridProps {
    products: Product[];
    onResetCategory: () => void;
}

export default function ProductGrid({ products, onResetCategory }: ProductGridProps) {
    return (
        <section id="featured" className="max-w-7xl mx-auto px-4 py-16">
            <div className="flex items-center justify-between mb-10 border-b border-neutral-200 pb-4">
                <h3 className="text-3xl font-black uppercase tracking-tighter">
                    Featured <span className="text-neutral-400 italic font-light">Products</span>
                </h3>
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        onResetCategory();
                    }}
                    className="text-sm font-bold uppercase border-b-2 border-black hover:text-neutral-500 hover:border-neutral-500 transition-all"
                >
                    View All
                </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </section>
    );
}