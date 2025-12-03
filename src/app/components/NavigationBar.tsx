'use client';
import Link from 'next/link';
import { ReactNode } from 'react';

type NavItem = 
    | { type: 'link'; href: string; label: string; className?: string }
    | { type: 'button'; onClick: () => void; label: string; className?: string }
    | { type: 'custom'; node: ReactNode };


type NavigationBarProps = {
    className?: string;     // added `?` means optional prop
    leftItems?: NavItem[];
    rightItems?: NavItem[];
};

// Creates array of default items on right side of nav if no right-side config is provided!
// (Placed no items as base default!)
const defaultRightItems: NavItem[] = [];

function renderItem(item: NavItem, key: string | number) {
    if (item.type === 'custom') return <span key={key}>{item.node}</span>;
    if (item.type === 'button') {
        return (
            <button
                key={key}
                onClick={item.onClick}
                className={`px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition ${item.className || ''}`}
            >
                {item.label}
            </button>
        );
    }

    // Check if '.custom-button' CSS class is being used; 
    // Need this part to use that class for a non-<button> component within nav bar
    const isCustomButton = item.className?.includes('custom-button');

    return (
        <Link
            key={key}
            href={item.href}
            className={
                isCustomButton
                ? `custom-button ${item.className || ''}`.trim()
                : `px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition ${item.className || ''}`
                }
        >
            {isCustomButton ? (
                <span className="custom-button-top px-3 py-1.5 text-sm">{item.label}</span>
                ) : (
                    item.label
                )}
        </Link>
    );
}

export default function NavigationBar({
    className = '',
    leftItems = [],
    rightItems = defaultRightItems,
}: NavigationBarProps) {
    return (
        // <nav className={`w-full bg-[#FDF7E1] overflow-x-auto px-6 py-4 flex items-center justify-between border-b border-gray-300 ${className}`}>
        <nav className={`w-full bg-gradient-to-r from-[#FBF6E3] to-[#FDEEB2] overflow-x-auto px-6 py-4 flex items-center justify-between border-b border-gray-300 ${className}`}>
            <div className="flex items-center gap-3">
                <Link href="/" className="text-gray-700 hover:text-gray-900 font-rubik">
                    {/* <p className="fontdiner-swanky-regular text-blue-700 text-3xl sm:text-4xl [text-shadow:_1px_1px_1px_rgba(20,20,20,2)] hover:[text-shadow:_1.5px_1.5px_2px_rgba(20,20,20,2)]"> */}
                    <p className="fontdiner-swanky-regular text-blue-700 text-3xl sm:text-4xl hover:[text-shadow:_0.5px_0.5px_1px_rgba(20,20,20,2)]">
                        DibsDash
                    </p>
                </Link>
                {leftItems.map((item, idx) => renderItem(item, `left-${idx}`))}
            </div>
            <div className="flex items-center gap-3">
                {rightItems.map((item, idx) => renderItem(item, `right-${idx}`))}
            </div>
        </nav>
    );
}
