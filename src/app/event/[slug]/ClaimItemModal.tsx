'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ClaimItemModalProps {
    itemId: string
    itemName: string
    isOpen: boolean
    onClose: () => void
}

export default function ClaimItemModal({ itemId, itemName, isOpen, onClose }: ClaimItemModalProps) {
    const router = useRouter()
    const [name, setName] = useState('')
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

    // Reset user's name input when modal opens
    useEffect(() => {
        if (isOpen) {
            setName('')
        }
    }, [isOpen])

    const handleClaim = async () => {
        if(!name.trim()) return

        setLoading(true)
        try {
            const response = await fetch(`/api/items/${itemId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ claimed_by: name.trim() })
            })

            if (response.ok) {
                router.refresh()
                onClose()
            } else {
                alert('Failed to claim item')
            } 
        } catch (error) {
                console.error('Error claiming item: ', error)
                alert('Error claiming item')
            } finally {
                setLoading(false)
        }  
    }

    if (!isOpen) return null

    return (
        
    )
}
