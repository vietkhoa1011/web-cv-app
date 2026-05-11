import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer className="w-full bg-gray-50 border-t mt-12">
            <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                    <h4 className="font-bold mb-3">E-Shop</h4>
                    <p className="text-sm text-gray-600">Your one-stop shop for everything. Fast shipping worldwide.</p>
                </div>

                <div>
                    <h5 className="font-semibold mb-2">Company</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/projects">Careers</Link></li>
                        <li><a href="#">Press</a></li>
                    </ul>
                </div>

                <div>
                    <h5 className="font-semibold mb-2">Support</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Returns</a></li>
                        <li><a href="#">Shipping</a></li>
                    </ul>
                </div>

                <div>
                    <h5 className="font-semibold mb-2">Stay updated</h5>
                    <form className="flex gap-2">
                        <input placeholder="Email address" className="border rounded-md px-3 py-2 text-sm flex-1" />
                        <button className="bg-black text-white px-3 rounded-md text-sm">Join</button>
                    </form>
                </div>
            </div>

            <div className="border-t py-4 text-center text-xs text-gray-500">© {new Date().getFullYear()} E-Shop. All rights reserved.</div>
        </footer>
    )
}

export default Footer
