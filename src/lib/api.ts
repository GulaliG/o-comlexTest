//review
export interface Review {
    id: number;
    text: string;
}

//products
export interface Product {
    id: number;
    image_url: string;
    title: string;
    description: string;
    price: number;
}

//productResponse
export interface ProductsResponse {
    page: number;
    amount: number;
    total: number;
    items: Product[];
}

//orderResponse
export interface OrderResponse {
    success: number;
    error?: string;
}

//will be used directly by the server (SSR):
const LIVE_API_BASE = 'http://o-complex.com:1337';

//(client-side) proxy:
const NEXT_API_BASE = '/api';

//reviews fetching:
export async function fetchReviewsFromLive(): Promise<Review[]> {
    const res = await fetch(`${LIVE_API_BASE}/reviews`);
    if (!res.ok) throw new Error('Не удалось загрузить отзывы SSR');
    return res.json();
}
export async function fetchReviews(): Promise<Review[]> {
    const res = await fetch(`${NEXT_API_BASE}/reviews`);
    if (!res.ok) throw new Error('Не удалось загрузить отзывы');
    return res.json();
}

//products fetching:
export async function fetchProductsFromLive(
    page: number = 1,
    page_size: number = 20
): Promise<ProductsResponse> {
    const res = await fetch(
        `${LIVE_API_BASE}/products?page=${page}&page_size=${page_size}`
    );
    if (!res.ok) throw new Error('Не удалось загрузить продукты SSR');
    return res.json();
}

export async function fetchProducts(
    page: number = 1,
    page_size: number = 20
): Promise<ProductsResponse> {
    const res = await fetch(
        `${NEXT_API_BASE}/products?page=${page}&page_size=${page_size}`
    );
    if (!res.ok) throw new Error('Не удалось загрузить продукты');
    return res.json();
}

//orders post request
export async function postOrderToLive(
    phone: string,
    cartItems: { id: number; quantity: number }[]
): Promise<OrderResponse> {
    const res = await fetch(`${LIVE_API_BASE}/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, cart: cartItems }),
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Ошибка сервера: ${text}`);
    }
    return res.json();
}

export async function postOrder(
    phone: string,
    cartItems: { id: number; quantity: number }[]
): Promise<OrderResponse> {
    const res = await fetch(`${NEXT_API_BASE}/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, cart: cartItems }),
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Sunucu hatası: ${text}`);
    }
    return res.json();
}
