'use client';
import { useState } from 'react';
import AddItemModal from './AddItemModal';

interface AddItemButtonProps {
    eventId: string
}

export default function AddItemButton({ eventId }: AddItemButtonProps) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                className="mt-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium active:scale-95 transition-all"
            >
                Add Item
            </button>
            <AddItemModal
                eventId={eventId}
                isOpen={showModal}                   // Control modal visibility
                onClose={() => setShowModal(false)}  // Close modal when user cancels
            />
        </>
    )
}