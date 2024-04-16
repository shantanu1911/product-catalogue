"use client"

import Link from 'next/link';
import { useEffect, useState } from 'react';

const Navbar = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        if (isDarkMode) {
            localStorage.setItem('theme', 'light');
            document.documentElement.classList.remove('dark');
        } else {
            localStorage.setItem('theme', 'dark');
            document.documentElement.classList.add('dark');
        }
    };

    return (
        <nav className="bg-white dark:bg-gray-800 py-4 px-6 shadow">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/">
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">
                        Product Catalogue
                    </p>
                </Link>

                <ul className="flex space-x-4">
                    <li>
                        <Link href="/product">
                            <p className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300">
                                All Product
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link href="/addproduct">
                            <p className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300">
                                Add Product
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link href="/couponcodes">
                            <p className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300">
                                Coupon Codes
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact">
                            <p className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300">
                                Contact
                            </p>
                        </Link>
                    </li>
                    <li>
                        <button
                            onClick={toggleTheme}
                            className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
                        >
                            {isDarkMode ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                    />
                                </svg>
                            )}
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;