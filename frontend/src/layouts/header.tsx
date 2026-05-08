import { Link } from "react-router-dom"
import Navbar from "./Navbar"

const Header = () => {
    return (
        <header className="w-full bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-6">
                <Link to="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-md flex items-center justify-center text-white font-bold">E</div>
                    <span className="font-black text-lg">E-Shop</span>
                </Link>

                <div className="flex-1">
                    <div className="relative">
                        <input placeholder="Search products, brands and categories" className="w-full border rounded-md py-2 px-4 text-sm" />
                        <button className="absolute right-1 top-1.5 bg-black text-white px-3 py-1 rounded-md text-sm">Search</button>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Link to="/login" className="text-sm text-gray-700">Sign in</Link>
                    <Link to="/cart" className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
                        </svg>
                        <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">3</span>
                    </Link>
                </div>
            </div>

            <Navbar />
        </header>
    )
}

export default Header
