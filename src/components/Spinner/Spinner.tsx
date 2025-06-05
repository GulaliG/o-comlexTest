export default function Spinner({ size = 40 }: { size?: number }) {
    return (
        <svg
            viewBox="0 0 24 24"
            width={size}
            height={size}
            className="animate-spin text-[#777]"
            aria-hidden
        >
            <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                className="opacity-25"
                fill="none"
            />
            <path
                d="M22 12a10 10 0 0 1-10 10"
                stroke="currentColor"
                strokeWidth="4"
                className="opacity-75"
                fill="none"
            />
        </svg>
    );
}
