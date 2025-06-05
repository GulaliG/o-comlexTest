// src/components/OrderModal.tsx
import React from 'react';
import ReactDOM from 'react-dom';

//orderModal props
export interface OrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    success: boolean;
    message: string;
}

//def func
export default function OrderModal({
    isOpen,
    onClose,
    success,
    message,
}: OrderModalProps) {
    if (!isOpen) return null;

    //UI
    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-[#222] bg-opacity-80 flex items-center justify-center z-50">
            <div className="bg-[#D9D9D9] rounded-[15px] p-6 max-w-sm w-full">
                <h2 className="text-2xl font-semibold mb-4 text-center text-[#222]">
                    {success ? 'Успешно!' : 'Ошибка'}
                </h2>
                <p className="text-center font-semibold text-[#222] mb-6">{message}</p>
                <button
                    type="reset"
                    onClick={onClose}
                    className="block mx-auto bg-[#222] text-[#d9d9d9] px-4 py-2 rounded-[15px] hover:bg-black transition cursor-pointer"
                >
                    Хорошо
                </button>
            </div>
        </div>,
        document.body
    );
}
