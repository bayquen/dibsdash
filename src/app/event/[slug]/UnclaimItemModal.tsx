'use client';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';

interface UnclaimItemModalProps {
    itemId: string
    itemName: string
    currentClaimer: string
    isOpen: boolean
    onClose: () => void
}

export default function UnclaimItemModal({ itemId, itemName, currentClaimer, isOpen, onClose }: UnclaimItemModalProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    // TEST - 11/14/25: UI modal mobile bug fix; a State required for Next.js server-side rendering (prevents hydration mismatches)
    const [mounted, setMounted] = useState(false)

    // TEST - 11/14/25: UI modal bug fix
    useEffect(() => {
        setMounted(true)
        return () => setMounted(false)
    }, [])

    // Disable scrolling on main page (scroll-lock) when this modal is open
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

    const handleUnclaim = async () => {
        setLoading(true)
        try {
            const response = await fetch(`/api/items/${itemId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ claimed_by: null })
            })

            if (response.ok) {
                router.refresh()
                onClose()
            } else {
                alert('Failed to unclaim item')
            } 
        } catch (error) {
                console.error('Error unclaiming item:', error)
                alert('Error unclaiming item')
            } finally {
                setLoading(false)
        }  
    }

    // TEST: UI mobile bug fix - 11/14/25
    if (!isOpen || !mounted) return null

    return createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
                <h2 className="text-xl font-bold mb-4 text-900">
                    Set this item as <span className="text-orange-600">unclaimed</span>?
                </h2>

                <p className="text-lg font-semibold text-gray-900 mb-3">
                    "{itemName}"
                </p>
                <p className="text-md text-600 mb-3">
                    Claimed By: <span className="font-semibold break-words">{currentClaimer}</span>
                </p>
                <p className="text-sm text-gray-600 mb-6 break-words">
                    <span className="text-green-600">Note:</span> Make sure to ask permission from the item's current claimer or event host(s)!
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="w-full sm:flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 active:scale-95 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUnclaim}
                        disabled={loading}
                        className="w-full sm:flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-orange-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                       {loading ? 'Unclaiming...' : 'Unclaim'}
                    </button>
                </div>
            </div>
        </div>,
        // TEST - 11/14/25: UI mobile bug fix; wrapping return JSX in `createPortal` function and document.body 
        //                  interface merely changes where the modal itself gets rendered in the DOM.
        document.body
    )
}
