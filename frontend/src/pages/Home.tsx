import { useEffect, useState } from "react";
import type { Product } from "../types/interface";
import { getProducts } from "../services/productService";

function Home() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        let mounted = true;

        getProducts()
            .then((data) => {
                if (mounted) setProducts(data);
            })
            .catch((err) => {
                // Bạn có thể xử lý hiển thị thông báo lỗi cho người dùng ở đây
                console.error("Lỗi lấy dữ liệu:", err.message);
            });

        return () => { mounted = false; };
    }, []);
    return (
        <main className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
            {/* Hero */}
            <section className="bg-gradient-to-r from-indigo-50 to-white">
                <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold">Discover top brands, best deals</h1>
                        <p className="mt-4 text-gray-600">Fast shipping • Easy returns • Secure payment</p>
                        <div className="mt-6 flex gap-3">
                            <a href="#featured" className="bg-black text-white px-4 py-2 rounded-md">Shop Featured</a>
                            <a href="#categories" className="text-gray-700 px-4 py-2 rounded-md border">Browse Categories</a>
                        </div>
                    </div>

                    <div className="hidden lg:flex gap-4">
                        <div className="flex-1 bg-white rounded-lg p-6 shadow-sm">
                            <h4 className="font-semibold">Limited Offer</h4>
                            <p className="mt-2 text-sm text-gray-600">Up to 40% off selected electronics</p>
                        </div>
                        <div className="flex-1 bg-white rounded-lg p-6 shadow-sm">
                            <h4 className="font-semibold">New Arrivals</h4>
                            <p className="mt-2 text-sm text-gray-600">Trending fashion for this season</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section id="categories" className="max-w-7xl mx-auto px-4 py-8">
                <h3 className="text-xl font-bold mb-4">Shop by Category</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
                    {['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports', 'Toys', 'Books', 'Gifts'].map((c) => (
                        <div key={c} className="bg-white border rounded-md p-4 text-center text-sm hover:shadow">
                            {c}
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured header */}
            <section id="featured" className="max-w-7xl mx-auto px-4 py-8">
                <h3 className="text-2xl font-extrabold mb-6">Featured Products</h3>

                {/* Product Grid */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((item) => (
                        <article
                            key={item._id}
                            className="group relative bg-white border rounded-md p-4 transition-shadow duration-200 hover:shadow-lg"
                        >
                            {/* Image Container */}
                            <div className="aspect-square w-full overflow-hidden bg-gray-100 flex items-center justify-center">
                                <img src={item.image} alt={item.title} loading="lazy" className="max-h-44 object-contain" />
                            </div>

                            <div className="mt-4">
                                <h4 className="text-sm font-semibold leading-tight line-clamp-2">{item.title}</h4>
                                <div className="mt-2 flex items-center justify-between">
                                    <span className="text-lg font-bold">${item.price}</span>
                                    <span className="text-xs text-gray-500">{item.category}</span>
                                </div>
                            </div>

                            <div className="mt-4 flex gap-2">
                                <button className="flex-1 bg-black text-white py-2 rounded-md text-sm">Add to Cart</button>
                                <button className="border rounded-md px-3 py-2 text-sm">Wishlist</button>
                            </div>
                        </article>
                    ))}
                </section>
            </section>
        </main>
    );
}

export default Home;