import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ShoppingCart, User, LogOut, ChevronDown } from "lucide-react";
import { useCallback, useState, useRef, useEffect } from "react";
import HeaderSearch from "@/components/HeaderSearch";
import AuthModal from "@/components/AuthModal";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/contexts/CartContext";

const Header = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const urlKeyword = searchParams.get('q') || '';
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);
    const { user, isAuthenticated, logout } = useAuth();
    const { totalItems } = useCart();

    // Click outside để đóng user menu
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
                setShowUserMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearchChange = useCallback((keyword: string) => {
        if (keyword.trim()) {
            navigate(`/?q=${encodeURIComponent(keyword.trim())}`, { replace: true });
        } else {
            if (searchParams.has('q')) {
                navigate('/', { replace: true });
            }
        }
    }, [navigate, searchParams]);

    const handleLogout = useCallback(() => {
        logout();
        setShowUserMenu(false);
    }, [logout]);

    return (
        <header className="w-full bg-slate-50/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-8">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="relative w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center text-white transition-transform group-hover:rotate-12">
                        <span className="text-xl font-serif">E</span>
                    </div>
                    <span className="font-semibold text-xl tracking-tight text-slate-800">
                        E-Shop<span className="text-sky-500">.</span>
                    </span>
                </Link>

                {/* Search Bar */}
                <HeaderSearch
                    initialKeyword={urlKeyword}
                    onSearchChange={handleSearchChange}
                />

                {/* Actions */}
                <div className="flex items-center gap-6">
                    {/* User / Auth */}
                    {isAuthenticated && user ? (
                        <div className="relative" ref={userMenuRef}>
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                            >
                                <div className="w-7 h-7 bg-stone-200 rounded-full flex items-center justify-center">
                                    <User size={16} strokeWidth={1.5} />
                                </div>
                                <span className="hidden sm:inline max-w-[100px] truncate">
                                    {user.username}
                                </span>
                                <ChevronDown size={14} className={`transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown menu */}
                            {showUserMenu && (
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-stone-200 rounded-xl shadow-lg py-2 z-50">
                                    <div className="px-4 py-2 border-b border-stone-100">
                                        <p className="text-sm font-medium text-stone-900 truncate">{user.username}</p>
                                        <p className="text-xs text-stone-500 truncate">{user.email}</p>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-stone-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        <LogOut size={16} />
                                        Sign out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowAuthModal(true)}
                            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                        >
                            <User size={20} strokeWidth={1.5} />
                            <span className="hidden sm:inline">Sign in</span>
                        </button>
                    )}

                    <Link to="/cart" className="relative group p-2">
                        <ShoppingCart size={22} strokeWidth={1.5} className="text-slate-700 group-hover:text-sky-600 transition-colors" />
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 bg-sky-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center border-2 border-slate-50 px-1">
                                {totalItems > 99 ? '99+' : totalItems}
                            </span>
                        )}
                    </Link>
                </div>
            </div>

            {/* Auth Modal */}
            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
            />
        </header>
    );
};

export default Header;