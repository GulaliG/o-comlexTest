// src/app/page.tsx
import React from 'react';
import ReviewList from '../components/Review/ReviewList';
import ClientShop from '../components/Client/ClientShop';
import type { Review, ProductsResponse } from '../lib/api';
import { fetchReviewsFromLive, fetchProductsFromLive } from '../lib/api';

export default async function Home() {
  let initialReviews: Review[] = [];
  let initialProductsData: ProductsResponse = {
    page: 1,
    amount: 0,
    total: 0,
    items: [],
  };

  try {
    initialReviews = await fetchReviewsFromLive();
  } catch (e) {
    console.error('Reviews SSR hatası:', e);
  }
  try {
    initialProductsData = await fetchProductsFromLive(1, 20);
  } catch (e) {
    console.error('Products SSR hatası:', e);
  }

  return (
    <main className="bg-[#222222] min-h-screen">
      <div className="container mx-auto px-4 py-6 ">
        <h1
          className="
            bg-[#777777]
            rounded-[15px]
            py-3
            text-3xl
            sm:text-4xl
            md:text-5xl
            lg:text-6xl
            text-white
            text-center
            mb-8
            font-light
            tracking-wide
          "
        >
          тестовое задание
        </h1>

        <section className="mb-36 mt-16">
          <div className="flex justify-center">
            <div className="
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-3
              xl:grid-cols-3
              gap-6
              min-w-0
              lg:max-w-screen-lg
              w-full
            ">
              <ReviewList reviews={initialReviews} />
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="mx-auto w-full max-w-screen-lg">
            <ClientShop initialProductsData={initialProductsData} />
          </div>
        </section>
      </div>
    </main>
  );
}
