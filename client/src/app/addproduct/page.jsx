'use client'

import { API_URL } from '@/lib/constants';
import React, { useState } from 'react'

const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        description: "",
        price: "",
        image: null,
    });

    const categories = [
        "Electronics",
        "Clothing",
        "Books",
        "Home & Garden",
        "Beauty & Personal Care",
        "Sports & Outdoors",
        "Toys & Games",
        "Automotive",
        "Grocery",
        "Health & Nutrition",
    ];

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "image" ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("category", formData.category);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("price", formData.price);
        formDataToSend.append("image", formData.image);

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                body: formDataToSend,
            });

            if (response.ok) {
                console.log("Form data sent successfully");
            } else {
                console.error("Error sending form data");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4">Create New Item</h1>
            <form onSubmit={handleSubmit} className="max-w-md">
                <div className="mb-4">
                    <label htmlFor="name" className="block font-bold mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border border-gray-400 p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="block font-bold mb-2">
                        Category
                    </label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="border border-gray-400 p-2 w-full"
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block font-bold mb-2">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="border border-gray-400 p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block font-bold mb-2">
                        Price
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="border border-gray-400 p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block font-bold mb-2">
                        Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleChange}
                        className="border border-gray-400 p-2 w-full"
                        accept="image/*"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default AddProduct