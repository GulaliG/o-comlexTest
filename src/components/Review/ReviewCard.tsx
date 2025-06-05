'use client';
import React from 'react';
import { sanitizeHtml } from '@/lib/sanitizeHtml';


//reviewCard props
export interface ReviewCardProps {
    text: string;
}

//def func
export default function ReviewCard({ text }: ReviewCardProps) {
    const cleanHtml = sanitizeHtml(text);

    //UI
    return (
        <div className="
                        bg-[#D9D9D9]
                        rounded-[15px]
                        p-4
                        shadow-md
                        w-full
                        "
        >
            <div
                className="
                            prose
                            text-black
                            leading-relaxed
                            "
                dangerouslySetInnerHTML={{ __html: cleanHtml }}
            />
        </div>
    );
}
