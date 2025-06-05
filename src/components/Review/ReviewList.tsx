import React from 'react';
import ReviewCard from './ReviewCard';
import type { Review } from '../../lib/api';

//revieList props
export interface ReviewListProps {
    reviews: Review[];
}

//def func
export default function ReviewList({ reviews }: ReviewListProps) {
    //handling
    if (!reviews || reviews.length === 0) {
        return <p className="text-center text-gray-400">Комментариев пока нет.</p>;
    }

    //UI
    return (
        <>
            {reviews.map((r) => (
                <ReviewCard key={r.id} text={r.text} />
            ))}
        </>
    );
}
