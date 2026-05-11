import { useEffect, useState } from "react";
import Banner1 from "../assets/Banner-1.png";
import Banner2 from "../assets/Banner-2.png";
import Banner3 from "../assets/Banner-3.png";

const BannerSlider = () => {
    const banners = [Banner1, Banner2, Banner3];
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % banners.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [banners.length]);

    return (
        <section className="bg-neutral-50 border-b border-neutral-100">
            <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">

                {/* Banner chính */}
                <div className="lg:col-span-2">
                    {/* BỔ SUNG: Thiết lập chiều cao cố định hoặc tỉ lệ cố định tại đây */}
                    <div className="relative w-full h-[300px] md:h-[400px] lg:h-full overflow-hidden rounded-2xl shadow-lg group bg-neutral-200">

                        {/* Thẻ chứa ảnh phải chiếm toàn bộ không gian của cha */}
                        <div className="absolute inset-0 w-full h-full">
                            <img
                                src={banners[current]}
                                alt={`Banner ${current + 1}`}
                                // QUAN TRỌNG: h-full và object-cover giúp ảnh lấp đầy khung mà không làm biến dạng
                                className="w-full h-full object-cover transition-opacity duration-700 ease-in-out"
                            />
                        </div>

                        {/* Dots điều hướng */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                            {banners.map((_, index) => (
                                <div
                                    key={index}
                                    className={`h-1.5 transition-all duration-300 rounded-full ${current === index ? "w-6 bg-white" : "w-2 bg-white/50"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Banner phụ */}
                <div className="flex flex-col gap-6">
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
    );
};

export default BannerSlider;