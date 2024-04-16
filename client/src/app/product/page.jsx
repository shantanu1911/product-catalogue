"use client";

import { useState, useEffect } from "react";
import { API_URL } from "@/lib/constants";
import Card from "@/components/Card";

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [category, setCategory] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        let filtered = products;

        if (category) {
            filtered = filtered.filter((product) => product.category === category);
        }

        if (sortOrder === "asc") {
            filtered = filtered.sort((a, b) => a.price - b.price);
        } else if (sortOrder === "desc") {
            filtered = filtered.sort((a, b) => b.price - a.price);
        }

        if (searchTerm) {
            filtered = filtered.filter(
                (product) =>
                    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredProducts(filtered);
    }, [category, sortOrder, searchTerm, products]);

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">Products</h1>

            <div className="mb-6">
                <label htmlFor="category" className="mr-2">
                    Filter by Category:
                </label>
                <select
                    id="category"
                    value={category}
                    onChange={handleCategoryChange}
                    className="border border-gray-400 p-2 mr-4"
                >
                    <option value="">All</option>
                    {Array.from(new Set(products.map((product) => product.category))).map(
                        (category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        )
                    )}
                </select>

                <label htmlFor="sort" className="mr-2">
                    Sort by Price:
                </label>
                <select
                    id="sort"
                    value={sortOrder}
                    onChange={handleSortChange}
                    className="border border-gray-400 p-2 mr-4"
                >
                    <option value="">None</option>
                    <option value="asc">High to Low</option>
                    <option value="desc">Low to High</option>
                </select>

                <label htmlFor="search" className="mr-2">
                    Search:
                </label>
                <input
                    type="text"
                    id="search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search by name or description"
                    className="border border-gray-400 p-2"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                    <Card key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default HomePage;
