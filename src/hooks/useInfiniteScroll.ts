import { useState, useEffect, useCallback } from 'react';
import type { ProductsResponse, Product } from '../lib/api';
import { fetchProducts } from '../lib/api';

//def func
export function useInfiniteScroll(
    initialData: ProductsResponse,
    pageSize: number
) {
    const [products, setProducts] = useState<Product[]>(initialData.items || []);
    const [page, setPage] = useState<number>(initialData.page || 1);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(
        (initialData.page * pageSize) < (initialData.total || 0)
    );

    //callback for more loading
    const loadMore = useCallback(async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        setError(false);
        try {
            const nextPage = page + 1;
            const data = await fetchProducts(nextPage, pageSize);
            setProducts(prev => [...prev, ...data.items]);
            setPage(data.page);
            setHasMore(data.page * pageSize < data.total);
        } catch (e) {
            console.error('useInfiniteScroll ürün yükleme hatası:', e);
            setError(true);
        } finally {
            setLoading(false);
        }
    }, [page, pageSize, loading, hasMore]);

    //trigger loadMore with scroll event
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.innerHeight + window.scrollY;
            const threshold = document.body.offsetHeight - 200;
            if (scrollPosition > threshold) {
                loadMore();
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadMore]);

    return { products, loading, error, hasMore };
}
