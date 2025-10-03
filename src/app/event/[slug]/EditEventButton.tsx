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
                className="text-sm text-blue-600 hover:text-blue-700"
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
