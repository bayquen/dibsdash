'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface DeleteEventModalProps {
    eventSlug: string
    isOpen: boolean
    onClose: () => void
}
// TODO: Continue Feature Step 2: Create Delete Event Modal Component (see guidance)
export default function DeleteEventModal({ eventSlug, isOpen, onClose }: DeleteEventModalProps) {
    const router = useRouter()
    const [confirmText, setConfirmText] = useState('')    // State to confirm w/ user if they want to actually delete an event
    const [loading, setLoading] = useState(false)

    const canDelete = confirmText === 'DELETE EVENT'    // User must type phrase as is (in uppercase) to delete.

    const handleDelete = async () => {
        if (!canDelete) return

        setLoading(true)
        try {
            const response = await fetch(`/api/events/${eventSlug}`, {
                method: 'DELETE'
            })

            if (response.ok) {
                router.push('/')    // Redirect user back to home page if deletion succeeds
            }
        // // TODO!: Check my dev server if there's a proper error message for the client (user side) in case deletion fails.
        } catch (error) {
            console.error("Error deleting event:", error)
            setLoading(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
                <h2 className="text-xl font-bold mb-4">Delete Event</h2>
                <p className="text-red-600 mb-4">
                    Warning: This will permanently delete the event and all its items!
                </p>

                <p className="text-sm text-gray-600 mb-3">
                    Type <span className="font-bold">DELETE EVENT</span> to confirm:
                </p>

                <input
                    type="text"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    className="w-full px-3 py-2 border rounded mb-4"
                    placeholder="Type here..."
                />

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 border rounded hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={!canDelete || loading}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    )
}