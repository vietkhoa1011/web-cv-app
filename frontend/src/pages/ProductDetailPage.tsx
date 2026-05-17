import { useParams, Link } from 'react-router-dom';
import { useProduct } from '@/hooks/useProduct';
import { ShoppingCart, Star, ArrowLeft, Heart, ShieldCheck, Truck } from 'lucide-react';

export default function ProductDetailPage() {
    const { id } = useParams<{ id: string }>();
    const { data: product, isLoading, isError, error } = useProduct(id!);

    if (isLoading) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-12 animate-pulse">
                <div className="h-6 w-24 bg-gray-200 rounded mb-8"></div>
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="aspect-square bg-gray-200 rounded-2xl"></div>
                    <div className="space-y-6">
                        <div className="h-4 w-20 bg-gray-200 rounded"></div>
                        <div className="h-10 w-full bg-gray-200 rounded"></div>
                        <div className="h-6 w-32 bg-gray-200 rounded"></div>
                        <div className="h-32 w-full bg-gray-200 rounded"></div>
                        <div className="h-12 w-48 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <div className="bg-red-50 p-6 rounded-full mb-4">
                    <span className="text-red-500 text-3xl">⚠️</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Đã có lỗi xảy ra</h2>
                <p className="text-gray-500 mt-2">{error?.message || "Không thể tải thông tin sản phẩm."}</p>
                <Link to="/" className="mt-6 px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition shadow-lg">
                    Quay lại trang chủ
                </Link>
            </div>
        );
    }

    if (!product) return null;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
            <Link
                to="/"
                className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black transition-colors mb-8 group"
            >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Quay lại cửa hàng
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-start">
                {/* ẢNH: nền trắng, kích thước nhỏ hơn, căn giữa */}
                <div className="flex items-center justify-center">
                    <div className="relative overflow-hidden rounded-3xl bg-white border border-gray-100 p-6 flex items-center justify-center shadow-sm max-w-md w-full">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="max-h-[420px] max-w-full object-contain transition-transform duration-500 hover:scale-105"
                        />
                        <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:text-red-500 transition-colors">
                            <Heart className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* THÔNG TIN: chữ căn giữa, màu đen */}
                <div className="flex flex-col items-center text-center">
                    <div className="mb-6 w-full">
                        <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                            {product.category}
                        </span>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-black leading-tight">
                            {product.title}
                        </h1>
                    </div>

                    {/* Đánh giá & Giá (căn giữa) */}
                    <div className="flex flex-col items-center gap-4 mb-8 pb-8 border-b border-gray-100 w-full">
                        <div className="flex items-center gap-2">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${i < Math.round(product.rating?.rate || 0) ? '' : 'text-gray-200'}`}
                                    />
                                ))}
                            </div>
                            <span className="font-bold text-black">{product.rating?.rate}</span>
                            <span className="text-gray-500 text-sm">({product.rating?.count} nhận xét)</span>
                        </div>
                        <p className="text-3xl font-bold text-black">${product.price}</p>
                    </div>

                    {/* Mô tả (căn giữa, màu đen) */}
                    <div className="mb-8 w-full">
                        <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-3">Mô tả sản phẩm</h3>
                        <p className="text-black leading-relaxed text-lg">
                            {product.description}
                        </p>
                    </div>

                    {/* Tiện ích thêm (2 cột) */}
                    <div className="grid grid-cols-2 gap-4 mb-8 w-full">
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100 justify-center">
                            <Truck className="w-5 h-5 text-gray-600" />
                            <span className="text-sm font-medium text-gray-700">Giao hàng miễn phí</span>
                        </div>
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100 justify-center">
                            <ShieldCheck className="w-5 h-5 text-gray-600" />
                            <span className="text-sm font-medium text-gray-700">Bảo hành 12 tháng</span>
                        </div>
                    </div>

                    {/* Nút hành động (căn giữa) */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                        <button className="flex-1 bg-black text-white flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold hover:bg-zinc-800 transition-all active:scale-[0.98] shadow-xl shadow-gray-200 max-w-sm mx-auto">
                            <ShoppingCart className="w-5 h-5" />
                            Thêm vào giỏ hàng
                        </button>
                        <button className="px-8 py-4 border-2 border-gray-200 rounded-2xl font-bold hover:border-black transition-colors active:scale-[0.98] max-w-sm mx-auto">
                            Mua ngay
                        </button>
                    </div>

                    {/* Chính sách giao hàng & đổi trả */}
                    <div className="mt-10 w-full space-y-4 text-left">
                        <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                            <h4 className="font-bold text-black">Chính sách giao hàng</h4>
                            <p className="text-sm text-gray-700 mt-1">
                                - Miễn phí giao hàng cho đơn hàng trên 500.000₫.{" "}
                                - Thời gian giao: 2–5 ngày làm việc (tùy khu vực).
                            </p>
                        </div>
                        <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                            <h4 className="font-bold text-black">Chính sách đổi trả</h4>
                            <p className="text-sm text-gray-700 mt-1">
                                - Đổi trả trong 14 ngày kể từ ngày nhận hàng nếu lỗi do nhà sản xuất hoặc sai sản phẩm.{" "}
                                - Sản phẩm phải còn nguyên tem, chưa qua sử dụng; khách hàng chịu phí vận chuyển trong trường hợp đổi trả do lý do cá nhân.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
