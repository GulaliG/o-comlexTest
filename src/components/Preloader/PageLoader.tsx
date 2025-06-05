'use client';
import { useState, useEffect } from 'react';

export default function PageLoader() {
    const [visible, setVisible] = useState(true);

    //hide
    useEffect(() => {
        const t = setTimeout(() => setVisible(false), 200);
        return () => clearTimeout(t);
    }, []);

    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center
                    bg-[#222] transition-opacity duration-300
                    animate-fadeOut">
            <svg className="animate-spin h-12 w-12 text-[#d9d9d9]" viewBox="0 0 24 24">
                <circle className="opacity-20" cx="12" cy="12" r="10"
                    stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-80" fill="none" stroke="currentColor"
                    strokeWidth="4" d="M22 12a10 10 0 0 1-10 10" />
            </svg>
        </div>
    );
}
