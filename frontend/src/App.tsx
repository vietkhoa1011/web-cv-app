import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@/layours/header";
import Footer from "@/layours/footer";
import Home from "@/pages/Home";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductDetailPage from "./pages/ProductDetailPage";
const queryClient = new QueryClient();
function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;