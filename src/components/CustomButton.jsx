

import Link from "next/link";
export default function CustomButton({ label, onClick, navigate }) {
    return (
        <>
            {navigate && (
                <>
                    <Link href={navigate}>
                        <button
                            onClick={onClick}
                            className="px-6 py-3  bg-indigo-600 border-white cursor-grab border text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition"
                        >
                            {label}
                        </button>
                    </Link>
                </>)}
            {!navigate && (
                <>
                    <button
                        onClick={onClick}
                        className="px-6 py-3  bg-indigo-600 border-white cursor-grab border text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition"
                    >
                        {label}
                    </button>
                </>)}
        </>
    );
}