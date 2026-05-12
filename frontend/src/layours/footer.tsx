import { Link } from "react-router-dom";
import { Mail, ShieldCheck } from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter, } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800 mt-20">
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                {/* Brand Section */}
                <div className="space-y-4">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center text-white font-serif font-bold">E</div>
                        <span className="text-white font-bold text-xl tracking-tight">
                            E-Shop<span className="text-sky-400">.</span>
                        </span>
                    </Link>
                    <p className="text-sm leading-relaxed text-slate-400">
                        Elevate your lifestyle with our curated selection of products. We offer premium quality and a minimalist shopping experience.                    </p>
                    <div className="flex gap-4 pt-2">
                        <FaFacebook size={18} className="hover:text-sky-400 cursor-pointer transition-colors" />
                        <FaInstagram size={18} className="hover:text-sky-400 cursor-pointer transition-colors" />
                        <FaTwitter size={18} className="hover:text-sky-400 cursor-pointer transition-colors" />
                    </div>
                </div>

                {/* Company Links */}
                <div>
                    <h5 className="text-white font-semibold mb-6 text-sm uppercase tracking-widest">About</h5>
                    <ul className="space-y-4 text-sm">
                        <li><Link to="/about" className="hover:text-sky-400 transition-colors">Brand story</Link></li>
                        <li><Link to="/careers" className="hover:text-sky-400 transition-colors">Careers</Link></li>
                        <li><Link to="/blog" className="hover:text-sky-400 transition-colors">News & Blog</Link></li>
                        <li><Link to="/stores" className="hover:text-sky-400 transition-colors">Store locations</Link></li>
                    </ul>
                </div>

                {/* Support Links */}
                <div>
                    <h5 className="text-white font-semibold mb-6 text-sm uppercase tracking-widest">Support</h5>
                    <ul className="space-y-4 text-sm">
                        <li><a href="#" className="hover:text-sky-400 transition-colors">Help Center</a></li>
                        <li><a href="#" className="hover:text-sky-400 transition-colors">Return Policy</a></li>
                        <li><a href="#" className="hover:text-sky-400 transition-colors">Track Order</a></li>
                        <li><a href="#" className="hover:text-sky-400 transition-colors">Payment & Refund</a></li>
                    </ul>
                </div>

                {/* Newsletter Section */}
                <div>
                    <h5 className="text-white font-semibold mb-6 text-sm uppercase tracking-widest">Subscribe to Newsletter</h5>
                    <p className="text-sm text-slate-400 mb-4">Stay updated with our latest collection and exclusive offers.</p>
                    <form className="relative">
                        <input
                            type="email"
                            placeholder="Your Email Address"
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all text-white"
                        />
                        <button className="absolute right-2 top-1.5 bg-sky-600 hover:bg-sky-500 text-white p-1.5 rounded-lg transition-all">
                            <Mail size={18} />
                        </button>
                    </form>
                    <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-500">
                        <ShieldCheck size={14} />
                        <span>We respect your privacy 100%</span>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-800 py-8 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] text-slate-500">
                    <p>© {new Date().getFullYear()} E-Shop. All rights reserved.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-slate-300">Terms of Service</a>
                        <a href="#" className="hover:text-slate-300">Privacy Policy</a>
                        <a href="#" className="hover:text-slate-300">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
