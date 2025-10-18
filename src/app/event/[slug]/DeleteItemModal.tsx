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
        <div>
            <div>
                <h2>Delete Item</h2>
                <p>
                    Are you sure you want to <span className="text-red-500">delete</span> this event item?
                </p>
                <p>
                    "{itemName}"
                </p>
                <p>
                    This action cannot be undone.
                </p>

                <div>
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className=""
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={loading}
                        className=""
                    >
                        {loading ? 'Deleting...' : 'Delete Item'}
                    </button>
                </div>
            </div>
        </div>
    )
}