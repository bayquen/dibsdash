'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ClaimItemButtonProps {
    itemId: string
    itemName: string
    currentClaimer: string | null
}

export default function ClaimItemButton({ itemId, itemName, currentClaimer }: ClaimItemButtonProps) {
    const router = useRouter()
    const [showInput, setShowInput] = useState(false)
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)

    const handleClaim = async () => {
        if (!name.trim()) return

        setLoading(true)
        try {
            const response = await fetch(`/api/items/${itemId}`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json' },
                body: JSON.stringify({ claimed_by: name })
            })

            if (response.ok) {
                router.refresh()
                setShowInput(false)
                setName('')
            }
        } catch (error) {
            console.error('Error claiming item:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleUnclaim = async () => {
        if (!confirm(`Set "${itemName}" as unclaimed?`)) return

        setLoading(true)
        try {
            const response = await fetch(`/api/items/${itemId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ claimed_by: null })
            })

            if (response.ok) {
                router.refresh()
            }
        } catch (error) {
            console.error('Error unclaiming item:', error)
        } finally {
            setLoading(false)
        }
    }

    if (currentClaimer) {
        return (
            <button
                onClick={handleUnclaim}
                disabled={loading}
                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm hover:bg-green-200 disabled:opacity-50"
            >
            ✓ {currentClaimer} 
            </button>
        )
    }

    if (showInput) {
        return (
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleClaim()}
                    placeholder="Your name"
                    autoFocus
                    className="px-2 py-1 text-sm border rounded"
                />
                <button
                    onClick={handleClaim}
                    disabled={loading || !name.trim()}
                    className="px-2 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? '...' : "✓"}
                </button>
                <button
                    onClick={() => {
                        setShowInput(false)
                        setName('')
                    }}
                    className="px-2 py-1 text-gray-600 hover:text-gray-800"
                >
                    ✕
                </button>
            </div>
        )
    }

    return (
        <button
            onClick={() => setShowInput(true)}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200"
        >
            Claim item
        </button>
    )
}
