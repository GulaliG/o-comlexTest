import React, { ChangeEvent, useState, useEffect } from 'react';
import { FiTrash2, FiCheck } from 'react-icons/fi';

// +7 (999) 999-99-99 - длина 18 символов
const formatPhone = (raw: string) => {
    const digits = raw.replace(/\D/g, '').slice(0, 11);
    const p = digits.padEnd(11, '_').split('');

    return (
        `+7 (${p.slice(1, 4).join('')}) ` +
        `${p.slice(4, 7).join('')}-` +
        `${p.slice(7, 9).join('')}-` +
        `${p.slice(9, 11).join('')}`
    ).replace(/[_-]+$/g, '');
};

//cartItem props
export interface CartItemSummary {
    id: number;
    title: string;
    price: number;
    image_url: string;
    quantity: number;
}

//cartSummary props
export interface CartSummaryProps {
    cart: {
        [id: number]: CartItemSummary;
    };
    phone: string;
    setPhone: (v: string) => void;
    onOrderSubmit: () => void;
    isSubmitting: boolean;
    errorMsg: string | null;
    removeFromCart: (productId: number) => void;
}

//cartSummart func
export default function CartSummary({
    cart,
    phone,
    setPhone,
    onOrderSubmit,
    isSubmitting,
    errorMsg,
    removeFromCart,
}: CartSummaryProps) {
    const cartItems = Object.values(cart);
    const totalAmount = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    //delete state
    const [justDeleted, setJustDeleted] = useState<Set<number>>(new Set());

    //phone state
    const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPhone(formatPhone(e.target.value));
    };

    //delete func
    const handleDeleteClick = (id: number) => {
        setJustDeleted((prev) => new Set(prev).add(id));
        setTimeout(() => {
            removeFromCart(id);
            setJustDeleted((prev) => {
                const c = new Set(prev);
                c.delete(id);
                return c;
            });
        }, 1000);
    };

    //UI
    return (
        <div className="bg-[#D9D9D9] rounded-[15px] p-6 mb-8 shadow-lg">
            <h2 className="text-3xl font-medium text-[#222] mb-4">Добавленные товары</h2>

            {cartItems.length === 0 && (
                <p className="text-gray-700 mb-4">Корзина пуста.</p>
            )}

            {cartItems.length > 0 && (
                <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="
                                        grid
                                        grid-cols-[minmax(0,1fr)_2rem_6rem_auto]
                                        lg:grid-cols-[minmax(0,1fr)_2rem_13rem_auto]
                                        items-center gap-x-3 text-[#222]
                                    "
                        >
                            <span className="min-w-0 break-words">{item.title}</span>
                            <span className="w-12 text-right text-lg tabular-nums">× {item.quantity}</span>
                            <span className="w-24 text-right text-lg tabular-nums">
                                {item.price * item.quantity}₽
                            </span>
                            <button
                                type="button"
                                onClick={() => handleDeleteClick(item.id)}
                                aria-label="Удалить"
                                className="justify-self-end mr-2"
                            >
                                {justDeleted.has(item.id) ? (
                                    <FiCheck className="w-6 h-6 text-green-500" />
                                ) : (
                                    <FiTrash2 className="w-6 h-6 text-red-500 hover:text-red-600 cursor-pointer" />
                                )}
                            </button>
                        </div>
                    ))}

                    <div className="flex items-center justify-start space-x-4 font-bold text-[#222] text-lg pt-2 border-t border-gray-400">
                        <span>Итого:</span>
                        <span>{totalAmount}₽</span>
                    </div>
                </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                <div className="flex-1 mb-3 sm:mb-0">
                    <input
                        type="tel"
                        inputMode="tel"
                        maxLength={18}
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="+7 (___) ___-__-__"
                        className="
                                    w-full px-3 py-2 rounded-[15px]
                                    bg-[#222] text-white
                                    font-medium
                                    focus:outline-none
                                    "
                    />
                </div>
                <button
                    type="submit"
                    onClick={onOrderSubmit}
                    disabled={isSubmitting}
                    className={`
                                w-full sm:w-auto
                                px-6 py-2
                                cursor-pointer
                                bg-[#222] text-white
                                rounded-[15px]
                                hover:bg-black transition
                                ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}
                                `}
                >
                    {isSubmitting ? 'Отправка...' : 'Заказать'}
                </button>
            </div>

            <p className="text-red-500 mt-2">{errorMsg}</p>
        </div>
    );
}
