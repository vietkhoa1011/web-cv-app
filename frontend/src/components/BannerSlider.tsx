// components/BannerSlider.tsx
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
        <div className="relative w-full overflow-hidden rounded-2xl shadow-lg group">
            {/* Cố định tỉ lệ 16:9 (hoặc aspect-[21/9] nếu muốn ảnh dài hơn) */}
            <div className="aspect-video w-full overflow-hidden bg-neutral-200">
                <img
                    src={banners[current]}
                    alt={`Banner ${current + 1}`}
                    className="w-full h-full object-cover transition-opacity duration-700 ease-in-out"
                />
            </div>

            {/* Thêm các chấm nhỏ (dots) chỉ vị trí cho chuyên nghiệp */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {banners.map((_, index) => (
                    <div
                        key={index}
                        className={`h-1.5 transition-all duration-300 rounded-full ${current === index ? "w-6 bg-white" : "w-2 bg-white/50"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default BannerSlider;