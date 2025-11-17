'use client';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
    // TEST - 11/14/25: UI modal mobile bug fix; a State required for Next.js server-side rendering (prevents hydration mismatches)
    const [mounted, setMounted] = useState(false)

    // TEST - 11/14/25: UI modal bug fix
    useEffect(() => {
        setMounted(true)
        return () => setMounted(false)
    }, [])

    // Disable scrolling when this modal is open
    // Updated - 11/14/25: Integrated with react-dom portal for cleaner UI on mobile view
    useEffect(() => {
        if (isOpen && mounted) {
            const timer = setTimeout(() => {
            document.body.style.overflow = 'hidden';
            }, 0);

            return () => {
                // Clearing the timeout prevents any memory leak if the modal closes before timeout activates
                clearTimeout(timer);
                document.body.style.overflow = 'unset';
            };
        } else {
            document.body.style.overflow = 'unset';
        }
        // Cleanup function: restores scrolling to main page to prevent it 
        // from staying locked if modal closes unexpectedly
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, mounted]);

    const handleDelete = async () => {
        setLoading(true)
        try {
            const response = await fetch(`/api/items/${itemId}`, {
                method: 'DELETE'
            })

            if (response.ok) {
                router.refresh()    // Refresh to show updated items list if deletion succeeds
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

    if (!isOpen || !mounted) return null

    return createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
                <h2 className="text-xl font-bold mb-4 text-black-900">Are you sure you want to <span className="text-red-500">delete</span> this item?</h2>
                <h3 className="text-xl font-semibold break-words text-gray-900 mb-4 text-center">
                    "{itemName}"
                </h3>

                <p className="text-md text-gray-600 mb-6">
                    <span className="text-blue-600">Note:</span>  Make sure to ask permission from the item's claimer or event host(s)!
                </p>

                <p className="text-md text-red-600 mb-2">
                    This action cannot be undone.
                </p>

                <div className="flex flex-col sm:flex-row gap-5">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="w-full sm:flex-1 px-5 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={loading}
                        className="w-full sm:flex-1 px-5 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Deleting...' : 'Delete Item'}
                    </button>
                </div>
            </div>
        </div>,
        // TEST - 11/14/25: UI mobile bug fix; wrapping return JSX in `createPortal` function and document.body 
        //                  interface merely changes where the modal itself gets rendered in the DOM.
        document.body
    )
}