// src/hooks/useFilteredProducts.ts
import { useState } from "react";
import { useProducts } from "./productHook";
import useCategories from "./categoryHook";

export function useFilteredProducts() {
    const { products, loading, error } = useProducts();
    const { categories } = useCategories();
    const [selectedCategory, setSelectedCategory] = useState("");
    const filteredProducts = products.filter((p) => {
        return selectedCategory ? p.category === selectedCategory : true;
    });

    const resetCategory = () => setSelectedCategory("");

    return {
        filteredProducts,
        loading,
        error,
        categories,
        selectedCategory,
        setSelectedCategory,
        resetCategory,
    };
}


