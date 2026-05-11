// add at top of src/main.ts (or any .ts entry)
/// <reference types="vite/client" />
import type { Product } from "@/types/interface";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

// Tách riêng hàm xử lý logic
export async function getProducts(): Promise<Product[]> {
    const res = await fetch(`${API_BASE}/product`);

    if (!res.ok) {
        throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

    return res.json();
}
export async function getCategories(): Promise<string[]> {
    const res = await fetch(`${API_BASE}/category`);

    if (!res.ok) {
        throw new Error(`API error: ${res.status} ${res.statusText}`);
    }
    return res.json();
}
// Nếu muốn gom nhiều hàm liên quan đến Product, bạn có thể thêm:
// export async function getProductById(id: string) { ... }