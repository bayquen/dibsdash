'use client';
import { useState } from 'react';
// import { useRouter } from 'next/navigation';
import DeleteItemModal from './DeleteItemModal';

interface DeleteItemButtonProps {
    itemId: string
    itemName: string
}

export default function DeleteItemButton({ itemId, itemName }: DeleteItemButtonProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="w-fit min-h-[44px] min-w-[44px] px-4 py-2 text-sm font-medium text-red-700 bg-red-100 border border-red-200 rounded-lg hover:bg-red-200 active:scale-95 transition-all"
                title="Delete Item"
            >
                Delete
            </button>
            
            <DeleteItemModal
                itemId={itemId}
                itemName={itemName}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    )
}