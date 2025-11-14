'use client';

import { useState } from 'react';
import EditItemModal from './EditItemModal';

interface EditItemButtonProps {
    item: {
        id: string
        name: string
        category: string
        quantity: number
        notes: string | null
        claimed_by: string | null
    }
}

export default function EditItemButton({ item }: EditItemButtonProps) {
    // State for tracking whether modal is open or closed
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {/* Button that opens edit modal */}
            <button
                onClick={() => setIsOpen(true)}
                className="min-h-[44px] min-w-[44px] px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 border border-blue-200 rounded-lg hover:bg-blue-200 active:scale-95 transition-all"
            >
                Edit
            </button>
            <EditItemModal
                item={item}
                isOpen={isOpen}                   // Control modal visibility
                onClose={() => setIsOpen(false)}  // Close modal when user cancels
            />
        </>
    )
}