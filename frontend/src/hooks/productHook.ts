import { useEffect, useState } from "react"
import type { Product } from "../types/interface"
import { getProducts } from "../services/api"

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let mounted = true
        async function fetchProducts() {
            try {
                setLoading(true)
                const data = await getProducts()
                if (mounted) setProducts(data)
            } catch (err: any) {
                if (mounted) setError(err.message || "Unknown error")
            } finally {
                if (mounted) setLoading(false)
            }
        }
        fetchProducts()
        return () => { mounted = false }
    }, [])

    return { products, loading, error }
}