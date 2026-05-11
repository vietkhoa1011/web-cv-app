import { Product } from "@/types/interface";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <article className="group relative bg-white flex flex-col transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-xl overflow-hidden border border-transparent hover:border-neutral-100">
            {/* Image Container */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
                {/* Badge */}
                <span className="absolute top-3 left-3 z-10 bg-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
                    New
                </span>

                <img
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                    className="w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-110"
                />

                {/* Quick Add Button Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-white/80 to-transparent">
                    <button className="w-full bg-black text-white py-3 text-xs uppercase font-bold tracking-widest hover:bg-neutral-800 shadow-xl transition-colors">
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
                <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-widest mb-1">
                    {product.category}
                </span>
                <h4 className="text-sm font-bold text-neutral-800 leading-snug line-clamp-2 min-h-[40px] group-hover:text-black transition-colors">
                    {product.title}
                </h4>

                <div className="mt-4 flex items-end justify-between">
                    <div className="flex flex-col">
                        <span className="text-xl font-black text-black">${product.price}</span>
                        <span className="text-xs text-neutral-400 line-through">
                            ${(product.price * 1.2).toFixed(2)}
                        </span>
                    </div>

                    <button className="h-10 w-10 flex items-center justify-center border border-neutral-200 rounded-full hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                    </button>
                </div>
            </div>
        </article>
    );
}