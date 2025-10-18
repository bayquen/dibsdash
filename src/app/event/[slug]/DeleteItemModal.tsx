'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface DeleteItemModalProps {
    itemId: string
    itemName: string
    isOpen: boolean
    onClose: () => void
}

export default function DeleteItemModal({ itemId, itemName, isOpen, onClose }: DeleteItemModalProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    // Disable scrolling when this modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        // Cleanup function: restores scrolling to main page to prevent it 
        // from staying locked if modal closes unexpectedly
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleDelete = async () => {
        setLoading(true)
        try {
            const response = await fetch(`api/items/${itemId}`, {
                method: 'DELETE'
            })

            if (response.ok) {
                router.refresh()    // Refresh to show updated items list
                onClose()           // Close modal :)
            } else {
                alert('Failed to delete item')
            }
        } catch (error) {
            console.error('Error deleting item: ', error)
            alert('Error deleting item')
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
                <h2 className="text-xl font-bold mb-4 text-black-900">Delete Item</h2>
                <p className="text-gray-700 mb-2">
                    Are you sure you want to <span className="text-red-500">delete</span> this event item?
                </p>
                <p className="text-lg font-semibold text-gray-900 mb-4">
                    "{itemName}"
                </p>
                <p className="text-sm text-red-600 mb-6">
                    This action cannot be undone.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="w-full sm:flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={loading}
                        className="w-full sm:flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Deleting...' : 'Delete Item'}
                    </button>
                </div>
            </div>
        </div>
    )
}