import { useEffect, useState } from "react"

function Home() {
    const [message, setMessage] = useState("")

    useEffect(() => {
        fetch("http://localhost:5000/")
            .then((res) => res.text())
            .then((data) => setMessage(data))
            .catch((err) => console.error("API error:", err))
    }, [])

    return (
        <main>
            <h1>Home</h1>
            <p>Backend says: {message}</p>
        </main>
    )
}

export default Home
