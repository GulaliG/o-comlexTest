'use client';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//def func
export default function ToastProvider() {
    return (
        <ToastContainer
            position="bottom-right"
            autoClose={7000}
            newestOnTop
            theme="dark"
            hideProgressBar
            toastClassName={() =>
                'flex items-start gap-3 px-4 py-4 rounded-xl ' +
                'bg-[#222] text-white shadow-lg border border-gray-700/60 ' +
                'w-[400px] text-base leading-snug ' +
                'mb-2 last:mb-0'
            }
        />
    );
}
