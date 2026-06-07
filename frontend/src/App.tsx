import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@/layours/header";
import Footer from "@/layours/footer";
import Home from "@/pages/Home";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/hooks/useAuth";
import { CartProvider } from "@/contexts/CartContext";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderHistory from "./pages/OrderHistory";
import OrderDetail from "./pages/OrderDetail";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <CartProvider>
                    <BrowserRouter>
                        <Header />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/product/:id" element={<ProductDetailPage />} />
                            <Route path="/cart" element={<CartPage />} />
                            <Route path="/checkout" element={<CheckoutPage />} />
                            <Route path="/orders" element={<OrderHistory />} />
                            <Route path="/orders/:id" element={<OrderDetail />} />
                        </Routes>
                        <Footer />
                    </BrowserRouter>
                </CartProvider>
            </AuthProvider>
        </QueryClientProvider>
    );
}

export default App;