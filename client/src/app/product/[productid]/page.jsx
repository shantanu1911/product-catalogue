"use client"

import { API_URL } from '@/lib/constants';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const ProductPage = ({ params }) => {

    const id = params.productid
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${API_URL}/product/${id}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const { name, category, description, price, image } = product;

    return (
        <div className="container mx-auto py-8">
            <div className="flex flex-col md:flex-row items-center">
                <img
                    src={`data:image/jpeg;base64,${image}`}
                    alt={name}
                    className="w-full md:w-1/2 rounded-lg shadow-md mb-4 md:mb-0 md:mr-8"
                />
                <div>
                    <h1 className="text-3xl font-bold mb-2">{name}</h1>
                    <p className="text-gray-700 mb-2">{category}</p>
                    <p className="text-gray-600 mb-4">{description}</p>
                    <p className="text-gray-800 font-bold text-xl">(EUR){price}</p>
                    <CryptoTable amount={price} />
                </div>
            </div>
        </div>
    );
};

export default ProductPage;


const CryptoTable = ({ amount }) => {
    const [cryptoPrices, setCryptoPrices] = useState({});

    useEffect(() => {
        const fetchCryptoPrices = async () => {
            const response = await fetch(
                'https://api.coingecko.com/api/v3/simple/price?vs_currencies=eur&ids=ethereum,bitcoin,ripple,litecoin,cardano,polkadot,stellar,chainlink,binancecoin,dogecoin'
            );
            const data = await response.json();
            setCryptoPrices(data);
        };
        fetchCryptoPrices();
    }, []);

    return (
        <div className="flex justify-center">
            <table className="w-full max-w-3xl mt-8 table-auto border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2 font-bold">Coin</th>
                        <th className="px-4 py-2 font-bold">Price (EUR)</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(cryptoPrices).map(([coin, price]) => (
                        <tr
                            key={coin}
                            className="border-b hover:bg-gray-100 transition-colors"
                        >
                            <td className="px-4 py-2">{coin}</td>
                            <td className="px-4 py-2">{amount / price.eur.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
