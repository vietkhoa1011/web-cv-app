import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./layouts/header"
import Footer from "./layouts/footer"
import Home from "./pages/Home.tsx"
import About from "./pages/About.tsx"
import Projects from "./pages/Projects.tsx"
import "./App.css"


function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App