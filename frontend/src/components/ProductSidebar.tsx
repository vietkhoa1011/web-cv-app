// Components/ProductSidebar.tsx
export default function ProductSidebar() {
    return (
        <aside className="w-full flex flex-col gap-6 bg-white rounded-xl border border-stone-200 overflow-hidden">
            {/* Promo Banner */}
            <div className="relative overflow-hidden bg-stone-900 p-6 text-white group">
                <div className="relative z-10">
                    <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-stone-400">
                        Limited Offer
                    </span>
                    <h3 className="mt-2 text-xl font-bold leading-tight">
                        SEASON SALE
                    </h3>
                    <p className="mt-3 text-xs text-stone-300 leading-relaxed">
                        Khám phá bộ sưu tập mới nhất với ưu đãi đặc biệt
                    </p>
                    <button className="mt-4 text-[10px] font-bold uppercase tracking-wide px-3 py-2 bg-white text-stone-900 rounded hover:bg-stone-100 transition-colors duration-200">
                        Shop Now →
                    </button>
                </div>
                <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-stone-800 opacity-50" />
            </div>

            {/* Shipping Info */}
            <div className="px-6 py-4 border-t border-stone-200 flex items-center gap-3 bg-stone-50">
                <div className="text-xl">🚚</div>
                <div>
                    <p className="text-xs font-bold text-stone-900 uppercase tracking-wide">Free Shipping</p>
                    <p className="text-xs text-stone-600">On orders over $50</p>
                </div>
            </div>
        </aside>
    );
}