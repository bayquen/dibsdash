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
                className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
                Edit Item
            </button>
            <EditItemModal
                item={item}
                isOpen={isOpen}                   // Control modal visibility
                onClose={() => setIsOpen(false)}  // Close modal when user cancels
            />
        </>
    )
}