import { useEffect, useState } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface ToastProps {
    message: string;
    isVisible: boolean;
    onClose: () => void;
    duration?: number;
}

export default function Toast({
    message,
    isVisible,
    onClose,
    duration = 2500,
}: ToastProps) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (!isVisible) return;

        setShow(true);

        const timer = setTimeout(() => {
            setShow(false);

            setTimeout(() => {
                onClose();
            }, 300);
        }, duration);

        return () => clearTimeout(timer);
    }, [isVisible, duration, onClose]);

    if (!show && !isVisible) return null;

    return (
        <div
            className={`fixed bottom-6 right-6 z-[200] flex items-center gap-3 px-5 py-3.5 bg-stone-900 text-white rounded-xl shadow-2xl transition-all duration-300 ${isVisible && show
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
                }`}
        >
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />

            <span className="text-sm font-medium">
                {message}
            </span>

            <button
                onClick={() => {
                    setShow(false);

                    setTimeout(() => {
                        onClose();
                    }, 300);
                }}
                className="ml-2 p-1 hover:bg-stone-700 rounded-full transition-colors"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}