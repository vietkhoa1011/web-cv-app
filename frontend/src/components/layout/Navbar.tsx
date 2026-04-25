import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <nav style={{ display: "flex", gap: "20px" }}>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/projects">Projects</Link>
        </nav>
    )
}

export default Navbar