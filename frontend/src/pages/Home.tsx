import BannerSlider from "../components/BannerSlider";
import { useProducts } from "../hooks/productHook";
import useCategories from "../hooks/categoryHook";
import { useState } from "react";
function Home() {
    const { products, loading, error } = useProducts();
    const { categories } = useCategories();
    const [selectedCategory, setSelectedCategory] = useState("");

    const filteredProducts = selectedCategory
        ? products.filter(
            (p) => p.category === selectedCategory
        )
        : products;
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
        <main className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white antialiased">
            {/* Hero */}
            <section className="bg-neutral-50 border-b border-neutral-100">
                <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">

                    {/* Banner chính - chiếm 2 cột */}
                    <div className="lg:col-span-2">
                        <BannerSlider />
                    </div>

                    {/* Hai banner phụ - chiếm 1 cột */}
                    <div className="flex flex-col gap-6">
                        {/* Thêm hiệu ứng hover và căn chỉnh nội dung */}
                        <div className="group flex-1 bg-white border border-neutral-200 p-8 shadow-sm rounded-2xl flex flex-col justify-center transition-all hover:shadow-md hover:-translate-y-1">
                            <h4 className="font-bold uppercase italic text-lg text-red-600">Limited Offer</h4>
                            <p className="mt-2 text-neutral-600">Up to 40% off selected electronics</p>
                            <button className="mt-4 text-sm font-semibold underline text-left">Shop Now</button>
                        </div>

                        <div className="group flex-1 bg-neutral-900 text-white p-8 shadow-sm rounded-2xl flex flex-col justify-center transition-all hover:shadow-md hover:-translate-y-1">
                            <h4 className="font-bold uppercase italic text-lg text-yellow-400">New Arrivals</h4>
                            <p className="mt-2 text-neutral-400">Trending fashion for this season</p>
                            <button className="mt-4 text-sm font-semibold underline text-left">Explore</button>
                        </div>
                    </div>

                </div>
            </section>


            {/* Categories */}
            <section id="categories" className="max-w-7xl mx-auto px-4 py-8 text-center">
                <h3 className="text-2xl font-bold mb-6">Shop by Category</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 justify-center">
                    {categories.map((c) => (
                        <div
                            key={c}
                            onClick={() => setSelectedCategory(c)}
                            className={`
                    border rounded-lg shadow-sm p-4 text-center text-sm uppercase
                    font-semibold tracking-widest cursor-pointer transition-colors

                    ${selectedCategory === c
                                    ? "bg-black text-white"
                                    : "bg-white hover:bg-black hover:text-white"
                                }
                `}
                        >
                            {c}
                        </div>
                    ))}
                </div>
            </section>


            {/* Featured header */}
            <section id="featured" className="max-w-7xl mx-auto px-4 py-16">
                <div className="flex items-center justify-between mb-10 border-b border-neutral-200 pb-4">
                    <h3 className="text-3xl font-black uppercase tracking-tighter">
                        Featured <span className="text-neutral-400 italic font-light">Products</span>
                    </h3>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault(); // tránh reload trang
                            setSelectedCategory(""); // reset về mặc định
                        }}
                        className="text-sm font-bold uppercase border-b-2 border-black hover:text-neutral-500 hover:border-neutral-500 transition-all"
                    >
                        View All
                    </a>

                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredProducts.map((item) => (
                        <article
                            key={item._id}
                            className="group relative bg-white flex flex-col transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-xl overflow-hidden border border-transparent hover:border-neutral-100"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
                                {/* Badge */}
                                <span className="absolute top-3 left-3 z-10 bg-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
                                    New
                                </span>

                                <img
                                    src={item.image}
                                    alt={item.title}
                                    loading="lazy"
                                    className="w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Quick Add Button Overlay (Hiển thị khi hover) */}
                                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-white/80 to-transparent">
                                    <button className="w-full bg-black text-white py-3 text-xs uppercase font-bold tracking-widest hover:bg-neutral-800 shadow-xl transition-colors">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5 flex flex-col flex-grow">
                                <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-widest mb-1">
                                    {item.category}
                                </span>
                                <h4 className="text-sm font-bold text-neutral-800 leading-snug line-clamp-2 min-h-[40px] group-hover:text-black transition-colors">
                                    {item.title}
                                </h4>

                                <div className="mt-4 flex items-end justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-xl font-black text-black">${item.price}</span>
                                        {/* Giả lập giá cũ nếu có */}
                                        <span className="text-xs text-neutral-400 line-through">${(item.price * 1.2).toFixed(2)}</span>
                                    </div>

                                    <button className="h-10 w-10 flex items-center justify-center border border-neutral-200 rounded-full hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-all">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}

export default Home;