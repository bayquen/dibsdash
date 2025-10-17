'use client';
import { useState } from 'react';
import EditEventModal from './EditEventModal';

interface EditEventModalProps {
    event: any
}

export default function EditEventButton( { event }: EditEventModalProps) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                className="mt-1 px-4 py-2 relative left-4 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium active:scale-95 transition-all"
            >
                Edit Event 
            </button>
            <EditEventModal
                event={event}
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
        </>
    )
}
