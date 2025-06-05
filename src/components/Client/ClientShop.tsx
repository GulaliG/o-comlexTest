'use client';

import React, { useState, useEffect } from 'react';
import type { ProductsResponse } from '../../lib/api';
import ProductList from '../Product/ProductList';
import CartSummary from '../Cart/CartSummary';
import OrderModal from '../Order/OrderModal';
import { useCart } from '../../hooks/useCart';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { postOrder } from '../../lib/api';
import Spinner from '../Spinner/Spinner';

//clientShop props
export interface ClientShopProps {
    initialProductsData: ProductsResponse;
}

// def func
export default function ClientShop({ initialProductsData }: ClientShopProps) {
    const {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        phone,
        setPhone,
        clearCart,
    } = useCart();
    //scroll
    const { products, loading: prodLoading, error: prodError } =
        useInfiniteScroll(initialProductsData, 20);
    //states
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [modalSuccess, setModalSuccess] = useState<boolean>(false);
    const [modalMessage, setModalMessage] = useState<string>('');
    const [isSubmitting, setSubmitting] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const handleOrderSubmit = async () => {
        /* 1. Telefon doğrulama -------------------------------------------------- */
        const cleanPhone = phone.replace(/[^0-9]/g, '');

        // Hiç numara girilmemiş
        if (!cleanPhone) {
            setErrorMsg('Пожалуйста, введите номер телефона.');
            return;
        }

        // Format/uzunluk hatalı
        if (cleanPhone.length !== 11) {
            setErrorMsg('Пожалуйста, введите корректный номер телефона.');
            return;
        }

        // Hata yok
        setErrorMsg(null);

        /* 2. Sepet boş mu? ------------------------------------------------------ */
        const cartItemsArray = Object.values(cart);
        if (cartItemsArray.length === 0) {
            setModalSuccess(false);
            setModalMessage('Корзина пуста. Добавьте хотя бы один товар.');
            setModalOpen(true);
            return;
        }

        /* 3. Sipariş verisi hazırlanıyor --------------------------------------- */
        const bodyCart = cartItemsArray.map((item) => ({
            id: item.id,
            quantity: item.quantity,
        }));

        /* 4. Sunucuya gönder ---------------------------------------------------- */
        setSubmitting(true);
        try {
            const res = await postOrder(cleanPhone, bodyCart);

            if (res.success === 1) {
                setModalSuccess(true);
                setModalMessage('Заказ успешно отправлен!');
                clearCart();
                setPhone('');
            } else {
                setModalSuccess(false);
                setModalMessage(res.error || 'Сервер вернул ошибку.');
            }
        } catch (err) {
            console.error(err);
            setModalSuccess(false);
            setModalMessage('Ошибка при отправке заказа.');
        } finally {
            setSubmitting(false);
            setModalOpen(true);
        }
    };

    //4 second autoclose modal
    useEffect(() => {
        if (!isModalOpen) return;

        const t = setTimeout(() => setModalOpen(false), 4000);
        return () => clearTimeout(t);
    }, [isModalOpen]);


    //UI
    return (
        <>
            <section className="mx-auto max-w-screen-lg sm:px-0 md-32 lg:px-64">
                <CartSummary
                    cart={cart}
                    phone={phone}
                    setPhone={setPhone}
                    onOrderSubmit={handleOrderSubmit}
                    isSubmitting={isSubmitting}
                    errorMsg={errorMsg}
                    removeFromCart={removeFromCart}
                />
            </section>

            <section className="sm:px-0 md-0 lg:px-12">
                <ProductList
                    products={products}
                    cart={cart}
                    addToCart={addToCart}
                    updateQuantity={updateQuantity}
                    removeFromCart={removeFromCart}
                />
                {prodLoading && (
                    <p className="flex justify-center my-6"><Spinner size={48} /></p>
                )}
                {prodError && (
                    <p className="text-center text-red-500 mt-4">
                        Ошибка при загрузке товаров.
                    </p>
                )}
                {!prodLoading && !prodError && products.length === 0 && (
                    <p className="text-center text-gray-400 mt-4">Товаров нет.</p>
                )}
            </section>

            <OrderModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                success={modalSuccess}
                message={modalMessage}
            />
        </>
    );
}
