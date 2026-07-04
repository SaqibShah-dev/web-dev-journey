// (TanStack Query)
import { useQuery } from "@tanstack/react-query";

const BASE_URL = "https://fakestoreapi.com";

// Fetch all products
export function useProducts() {
    return useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const response = await fetch(`${BASE_URL}/products`);
            if (!response.ok) throw new Error("Failed to load products");
            return response.json();
        }
    });
}

// Fetch a single product by id
export function useProduct(id) {
    return useQuery({
        queryKey: ["products", id],
        queryFn: async () => {
            const response = await fetch(`${BASE_URL}/products/${id}`);
            if (!response.ok) throw new Error("Product not found");
            return response.json();
        },
        enabled: !!id
    });
}

// Fetch all categories
export function useCategories() {
    return useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const response = await fetch(`${BASE_URL}/products/categories`);
            if (!response.ok) throw new Error("Failed to load categories");
            return response.json();
        }
    });
}