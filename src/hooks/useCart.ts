import { useState, useEffect } from 'react';

export interface CartItem {
    id: number;
    title: string;
    price: number;
    image_url: string;
    quantity: number;
}

//cartState type
export type CartState = {
    [id: number]: CartItem;
};

//def func
export function useCart() {

    //states
    const [cart, setCart] = useState<CartState>({});
    const [phone, setPhone] = useState<string>('');

    //when mounted, read the cart and phone from localStorage
    useEffect(() => {
        try {
            const savedCart = localStorage.getItem('my-shop-cart');
            const savedPhone = localStorage.getItem('my-shop-phone');

            if (savedCart) {
                setCart(JSON.parse(savedCart));
            }
            if (savedPhone) {
                setPhone(savedPhone);
            }
        } catch {
            //if something went wrong while reading, just skip it
        }
    }, []);

    //save the cart to localStorage every time it is modified
    useEffect(() => {
        localStorage.setItem('my-shop-cart', JSON.stringify(cart));
    }, [cart]);

    //save the phone to localStorage when changed
    useEffect(() => {
        localStorage.setItem('my-shop-phone', phone);
    }, [phone]);

    //add a product function (if there is already one - increase quantity by 1, otherwise create a record)
    const addToCart = (p: Omit<CartItem, 'quantity'>) => {
        setCart((prev) => {
            const prevItem = prev[p.id];
            const newQty = prevItem ? prevItem.quantity + 1 : 1;
            return {
                ...prev,
                [p.id]: {
                    id: p.id,
                    title: p.title,
                    price: p.price,
                    image_url: p.image_url,
                    quantity: newQty,
                },
            };
        });
    };

    //remove func
    const removeFromCart = (productId: number) => {
        setCart((prev) => {
            const copy = { ...prev };
            delete copy[productId];
            return copy;
        });
    };

    //update func (if quant < 1)
    const updateQuantity = (productId: number, newQuantity: number) => {
        if (newQuantity < 1) {
            removeFromCart(productId);
            return;
        }
        setCart((prev) => ({
            ...prev,
            [productId]: {
                ...prev[productId],
                quantity: newQuantity,
            },
        }));
    };

    //completely cleaning like memories :)))
    const clearCart = () => {
        setCart({});
    };

    return {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        phone,
        setPhone,
    };
}
