import { Link } from "react-router-dom";

import { Search, ShoppingCart, User } from "lucide-react"; // Cần cài đặt lucide-react

const Header = () => {
    return (
        <header className="w-full bg-slate-50/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-8">

                {/* Logo - Minimalist & Elegant */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="relative w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center text-white transition-transform group-hover:rotate-12">
                        <span className="text-xl font-serif">E</span>
                    </div>
                    <span className="font-semibold text-xl tracking-tight text-slate-800">
                        E-Shop<span className="text-sky-500">.</span>
                    </span>
                </Link>

                {/* Search Bar - Refined UX */}
                <div className="flex-1 max-w-2xl hidden md:block">
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm cao cấp..."
                            className="w-full bg-white border border-slate-200 rounded-full py-2.5 pl-5 pr-12 text-sm transition-all 
                         focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-400"
                        />
                        <button className="absolute right-1.5 top-1.5 bg-slate-900 hover:bg-slate-800 text-white p-1.5 rounded-full transition-colors">
                            <Search size={18} />
                        </button>
                    </div>
                </div>

                {/* Actions - Soft Icons */}
                <div className="flex items-center gap-6">
                    <Link to="/login" className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                        <User size={20} strokeWidth={1.5} />
                        <span className="hidden sm:inline">Tài khoản</span>
                    </Link>

                    <Link to="/cart" className="relative group p-2">
                        <ShoppingCart size={22} strokeWidth={1.5} className="text-slate-700 group-hover:text-sky-600 transition-colors" />
                        <span className="absolute top-0 right-0 bg-sky-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-slate-50">
                            3
                        </span>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;