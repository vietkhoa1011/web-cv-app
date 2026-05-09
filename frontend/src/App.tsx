import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/layour/header.tsx"
import Footer from "./components/layour/footer.tsx"
import Home from "./pages/Home.tsx"
import "./App.css"


function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App