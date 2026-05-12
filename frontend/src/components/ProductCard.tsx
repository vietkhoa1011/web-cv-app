import { Product } from "@/types/index";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <article className="group relative flex flex-col bg-white transition-all duration-300 ease-out rounded-xl overflow-hidden border border-stone-200 hover:border-stone-300 hover:shadow-lg">
            {/* Image Container */}
            <div className="relative aspect-square w-full overflow-hidden bg-stone-100">
                <span className="absolute top-3 left-3 z-10 bg-stone-900 text-white px-2 py-1 rounded text-[10px] font-semibold tracking-wide">
                    New
                </span>

                <img
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                    className="w-full h-full object-contain p-6 transition-transform duration-500 ease-out group-hover:scale-110 bg-gradient-to-br from-stone-50 to-stone-100"
                />

                {/* Quick Add Button */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                    <button className="w-full py-2 bg-stone-900 text-white text-xs font-semibold tracking-wide rounded-lg hover:bg-stone-800 transition-colors duration-200 shadow-md">
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow space-y-3">
                <span className="text-[10px] text-stone-500 font-bold tracking-widest uppercase">
                    {product.category}
                </span>

                <h4 className="text-sm font-semibold text-stone-900 leading-snug line-clamp-2 min-h-[36px] group-hover:text-stone-700 transition-colors duration-200">
                    {product.title}
                </h4>

                <div className="mt-auto pt-3 flex items-end justify-between">
                    <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-stone-900">
                            ${product.price.toFixed(2)}
                        </span>
                        <span className="text-xs text-stone-400 line-through">
                            ${(product.price * 1.2).toFixed(2)}
                        </span>
                    </div>

                    <button className="h-8 w-8 flex items-center justify-center rounded-full border border-stone-300 text-stone-400 hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition-all duration-200">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                    </button>
                </div>
            </div>
        </article>
    );
}