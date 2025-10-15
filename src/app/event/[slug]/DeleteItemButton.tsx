'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface DeleteItemButtonProps {
    itemId: string
    itemName: string
}

export default function DeleteItemButton({ itemId, itemName }: DeleteItemButtonProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        if (!confirm(`Delete "${itemName}"?`)) return

        setLoading(true)
        try {
            const response = await fetch (`/api/items/${itemId}`, {
                method: 'DELETE'
            })

            if (response.ok) {
                router.refresh()    // Refresh current page
            }
        } catch (error) {
            console.error('Error deleting item:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className="min-h-[44px] min-w-[44px] px-4 py-2 text-sm font-medium text-red-700 bg-red-100 border border-red-200 rounded-lg hover:bg-red-200 active:scale-95 transition-all"
            title="Delete Item"
        >
            Delete
        </button>
    )
}