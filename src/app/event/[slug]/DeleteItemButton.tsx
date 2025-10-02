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
            className="ml-2 text-red-500 hover:text-red-700 text-sm font-bold disabled:opacity-50"
            title="Delete Item"
        >
            ×
        </button>
    )
}