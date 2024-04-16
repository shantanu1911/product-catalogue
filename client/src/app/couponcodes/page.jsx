"use client"

import { useState, useEffect } from 'react';

const CouponComponent = () => {
    const [coupons, setCoupons] = useState([]);

    useEffect(() => {
        const fetchCouponData = async () => {
            try {
                const couponsData = [];
                for (let i = 1; i <= 10; i++) {
                    const response = await fetch(`https://w3d1szbsy8.execute-api.us-east-1.amazonaws.com/prod/coupon-api/?coupon_id=Coupon${i}`);
                    const data = await response.json();
                    couponsData.push(data);
                }
                setCoupons(couponsData);
            } catch (error) {
                console.error('Error fetching coupon data:', error);
            }
        };

        fetchCouponData();
    }, []);

    if (coupons.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className='px-6 py-2 bg-slate-100 h-screen'>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {coupons.map((coupon, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="p-4">
                            <h3 className="text-lg font-bold">{coupon.coupon_code}</h3>
                            <p className="text-gray-600">{coupon.description}</p>
                            <p className="text-gray-600">Discount: {coupon.discount_type} - {coupon.discount_amount}</p>
                            <p className="text-gray-600">Validity: {coupon.validity}</p>
                            <a
                                href={`https://w3d1szbsy8.execute-api.us-east-1.amazonaws.com/prod/coupon-api/?coupon_id=${coupon.coupon_id}`}
                                className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                            >
                                View Coupon
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CouponComponent;