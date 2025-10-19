'use client';
import { useState } from 'react';
import DeleteEventModal from './DeleteEventModal'

interface DeleteEventButtonProps {
    eventSlug: string
}

export default function DeleteEventButton({ eventSlug }: DeleteEventButtonProps) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                className="text-lg text-red-600 hover:text-red-700"
            >
                Delete Event
            </button>
            <DeleteEventModal
                eventSlug={eventSlug}
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
        </>
    )
}