import React from 'react';
import ProductCard from './ProductCard';
import type { Product } from '../../lib/api';

//productList props
export interface ProductListProps {
    products: Product[];
    cart: {
        [id: number]: {
            id: number;
            title: string;
            price: number;
            image_url: string;
            quantity: number;
        };
    };
    addToCart: (p: {
        id: number;
        title: string;
        price: number;
        image_url: string;
    }) => void;
    updateQuantity: (productId: number, newQuantity: number) => void;
    removeFromCart: (productId: number) => void;
}

//def func
export default function ProductList({
    products,
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
}: ProductListProps) {
    //handling
    if (!products || products.length === 0) {
        return <p className="text-center text-gray-400">В наличии нет товаров.</p>;
    }

    //UI
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p, idx) => (
                <ProductCard
                    key={`${p.id}-${idx}`}
                    product={p}
                    addToCart={addToCart}
                    cartItem={cart[p.id] ?? null}
                    updateQuantity={updateQuantity}
                    removeFromCart={removeFromCart}
                />
            ))}
        </div>
    );
}
