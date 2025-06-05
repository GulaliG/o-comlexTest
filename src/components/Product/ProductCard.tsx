'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import type { Product } from '../../lib/api';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';


//productCard props
export interface ProductCardProps {
    product: Product;
    addToCart: (p: {
        id: number;
        title: string;
        price: number;
        image_url: string;
    }) => void;
    cartItem: {
        id: number;
        title: string;
        price: number;
        image_url: string;
        quantity: number;
    } | null;
    updateQuantity: (productId: number, newQuantity: number) => void;
    removeFromCart: (productId: number) => void;
}

//def func
export default function ProductCard({
    product,
    addToCart,
    cartItem,
    updateQuantity,
    removeFromCart,
}: ProductCardProps) {
    //states & effects
    const [localQuantity, setLocalQuantity] = useState<number>(
        cartItem ? cartItem.quantity : 1
    );

    useEffect(() => {
        if (cartItem) {
            setLocalQuantity(cartItem.quantity);
        }
    }, [cartItem]);

    //handleBuy func
    const handleBuy = () => {
        addToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            image_url: product.image_url,
        });
        toast.success(`${product.title} добавлен в корзину!`);
    };

    //+/- functions
    const handlePlus = () => {
        const noviy = localQuantity + 1;
        setLocalQuantity(noviy);
        updateQuantity(product.id, noviy);
        toast.success(`${product.title} добавлен в корзину!`);
    };

    const handleMinus = () => {
        const stariy = localQuantity - 1;
        if (stariy < 1) {
            removeFromCart(product.id);
            toast.error(`${product.title} удалено из корзины!`);
        } else {
            setLocalQuantity(stariy);
            updateQuantity(product.id, stariy);
            toast.error(`${product.title} количество было уменьшено.`);
        }
    };

    //UI
    return (
        <div className="bg-[#d9d9d9] rounded-[15px] border border-gray-300 overflow-hidden shadow-sm flex flex-col">
            <div className="px-2 pt-2">
                <div
                    className="relative w-full aspect-[281/366] overflow-hidden rounded-[15px]"
                >
                    <Image
                        src={product.image_url}
                        alt={product.title}
                        fill
                        className="object-cover"
                        sizes="(min-width:1024px) 281px, 100vw"
                    />
                </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="text-black text-center text-xl font-medium mb-2 line-clamp-2">
                        {product.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-3">
                        {product.description}
                    </p>
                </div>

                <div className="mt-4">
                    <p className="text-black text-center text-xl font-medium mb-3">Цена: {product.price}₽</p>

                    {!cartItem && (
                        <button
                            type="button"
                            onClick={handleBuy}
                            className="
                                        w-full
                                        h-10
                                        bg-[#222222]
                                        text-white
                                        rounded-[15px]
                                        hover:bg-black
                                        transition
                                        flex items-center justify-center
                                        cursor-pointer
                                    "
                        >
                            Купить
                        </button>
                    )}

                    {cartItem && (
                        <div className="flex w-full gap-[6px] rounded-[15px]">
                            {/* – */}
                            <button
                                type="button"
                                onClick={handleMinus}
                                aria-label="Уменьшить количество"
                                title="Уменьшить количество"
                                className="
                                            flex-1 h-10 bg-[#222] text-white
                                            flex items-center justify-center
                                            rounded-[15px]
                                            hover:bg-black transition
                                            cursor-pointer
                                        "
                            >
                                <FiMinus className="h-5 w-5" />
                            </button>

                            <span
                                className="
                                            flex-1 h-10 bg-[#222] text-white
                                            flex items-center justify-center select-none
                                            rounded-[15px]
                                        "
                            >
                                {localQuantity}
                            </span>

                            <button
                                type="button"
                                onClick={handlePlus}
                                aria-label="Увеличить количество"
                                title="Увеличить количество"
                                className="
                                            flex-1 h-10 bg-[#222] text-white
                                            flex items-center justify-center
                                            rounded-[15px]
                                            hover:bg-black transition
                                            cursor-pointer
                                        "
                            >
                                <FiPlus className="h-5 w-5" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
