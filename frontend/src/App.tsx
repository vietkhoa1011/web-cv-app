import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "@/layours/header";
import Footer from "@/layours/footer";
import Home from "@/pages/Home";
// @ts-ignore
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Header />

            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>

            <Footer />
        </BrowserRouter>
    );
}

export default App;