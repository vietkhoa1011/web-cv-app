import { Link } from "react-router-dom"

const categories = [
    "Electronics",
    "Fashion",
    "Home",
    "Beauty",
    "Sports",
    "Toys",
]

const Navbar = () => {
    return (
        <nav className="w-full bg-white border-t border-b">
            <div className="max-w-7xl mx-auto px-4">
                <ul className="flex gap-6 py-3 overflow-x-auto text-sm">
                    <li>
                        <Link to="/" className="font-semibold">Home</Link>
                    </li>
                    {categories.map((c) => (
                        <li key={c}>
                            <Link to={`/category/${c.toLowerCase()}`} className="text-gray-700 hover:text-black">
                                {c}
                            </Link>
                        </li>
                    ))}
                    <li className="ml-auto">
                        <Link to="/projects" className="text-gray-600">Offers</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar