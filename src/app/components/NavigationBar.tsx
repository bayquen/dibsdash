'use client';
import Link from 'next/link';

export default function NavigationBar() {
    return (
        <nav className="bg-white w-full px-6 py-4 flex items-center justify-between border-b border-gray-200">
            <Link href="#" className="text-gray-700 hover:text-gray-900 font-rubik">
                a link
            </Link>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md font-rubik transition-colors">
                button
            </button>
        </nav>
    );
}